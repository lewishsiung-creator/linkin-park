/* Linkin Park — English through six songs.
   Teacher-led: nothing is scored, nothing about a lesson survives a reload.
   Only the "larger text" setting persists, because that belongs to the screen. */

const $ = (id) => document.getElementById(id);

const el = {
  tabs: $('tabs'),
  title: $('song-title'),
  meta: $('song-meta'),
  yt: $('song-yt'),
  ytPlay: $('yt-play'),
  songLinks: $('song-links'),
  player: $('player'),
  about: $('song-about'),
  aboutZh: $('song-about-zh'),
  aboutZhBtn: $('about-zh-btn'),
  vocab: $('vocab-list'),
  focus: $('focus-box'),
  questions: $('questions'),
  lyricsIn: $('lyrics-input'),
  lyricsOut: $('lyrics-out'),
  lineCount: $('line-count'),
};

let current = SONGS[0];

/* ---------- helpers ---------- */

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Irregular past forms for the heads that actually occur in this data set —
// not a general English table. Add to it when the vocabulary gains a new
// irregular verb, or "fallen apart" and "went out" go unhighlighted.
const IRREGULAR = {
  fall: ['fell', 'fallen'],
  go: ['went', 'gone'],
  take: ['took', 'taken'],
  hold: ['held'],
};

// Rough inflections, enough to catch a target word as it actually appears in a
// verse: matter/matters/mattered, slip/slipping, heal/healing, care/cared.
function formsOf(word) {
  const w = word.toLowerCase();
  const out = new Set([w]);
  (IRREGULAR[w] || []).forEach((f) => out.add(f));
  if (/[^aeiou]y$/.test(w)) {
    out.add(w.slice(0, -1) + 'ies');
    out.add(w.slice(0, -1) + 'ied');
  }
  out.add(w + 's');
  out.add(w + 'es');
  out.add(w + 'ed');
  out.add(w + 'ing');
  if (w.endsWith('e')) {
    out.add(w + 'd');
    out.add(w.slice(0, -1) + 'ing');
  }
  if (/[aeiou][bdgklmnprt]$/.test(w)) {
    const doubled = w + w.slice(-1);
    out.add(doubled + 'ed');
    out.add(doubled + 'ing');
  }
  return [...out];
}

// One regex per song, matching any target word (or phrase) in any of its forms.
function buildMatcher(vocab) {
  const parts = [];
  vocab.forEach((v, i) => {
    const words = v.word.split(/\s+/);
    const head = formsOf(words[0]).map(escapeRe).sort((a, b) => b.length - a.length);
    const tail = words.slice(1).map(escapeRe).join('\\s+');
    const body = `(?:${head.join('|')})` + (tail ? `\\s+${tail}` : '');
    parts.push({ i, len: v.word.length, src: body });
  });
  // Longest target first, so "let go" wins over a bare "go".
  parts.sort((a, b) => b.len - a.len);
  const src = parts.map((p) => `(${p.src})`).join('|');
  return { re: new RegExp(`\\b(?:${src})\\b`, 'gi'), order: parts.map((p) => p.i) };
}

/* ---------- rendering ---------- */

function renderTabs() {
  el.tabs.innerHTML = '';
  SONGS.forEach((song) => {
    const selected = song.id === current.id;
    const b = document.createElement('button');
    b.className = 'tab';
    b.type = 'button';
    b.id = `tab-${song.id}`;
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'main');
    b.setAttribute('aria-selected', String(selected));
    // Roving tabindex: one stop for the whole strip, arrows move within it.
    b.tabIndex = selected ? 0 : -1;
    b.innerHTML = `${escapeHtml(song.title)}<span class="yr">${song.year}</span>`;
    b.addEventListener('click', () => selectSong(song));
    el.tabs.appendChild(b);
  });
}

el.tabs.addEventListener('keydown', (e) => {
  const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
  if (!keys.includes(e.key)) return;
  e.preventDefault();
  const i = SONGS.findIndex((s) => s.id === current.id);
  const next =
    e.key === 'Home' ? 0
    : e.key === 'End' ? SONGS.length - 1
    : e.key === 'ArrowRight' ? (i + 1) % SONGS.length
    : (i - 1 + SONGS.length) % SONGS.length;
  selectSong(SONGS[next]);
  document.getElementById(`tab-${SONGS[next].id}`).focus();
});

function renderSong(song) {
  el.title.textContent = song.title;
  el.meta.innerHTML =
    `${escapeHtml(song.album)}<span class="dot">·</span>${song.year}` +
    `<span class="dot">·</span>${escapeHtml(song.era)}`;
  el.about.textContent = song.about;
  el.aboutZh.textContent = song.aboutZh;

  // Switching songs must not leave the previous one playing underneath.
  closePlayer();

  // A song with no verified official upload simply shows no link. The label
  // says which it is: Heavy Is the Crown's music video sits on Riot's channel,
  // so the band's own upload is audio only.
  if (song.youtube) {
    const audio = song.youtubeKind === 'audio';
    const label = audio ? 'Official audio on YouTube' : 'Official video on YouTube';
    el.yt.href = `https://www.youtube.com/watch?v=${song.youtube}`;
    el.yt.querySelector('.yt-label').textContent = label;
    el.yt.setAttribute(
      'aria-label', `${song.title} — ${label}, opens in a new tab`);
    el.ytPlay.querySelector('.yt-play-label').textContent =
      audio ? 'Listen here' : 'Play here';
    el.ytPlay.setAttribute(
      'aria-label',
      `${audio ? 'Listen to' : 'Play'} ${song.title} in this page`);
    el.songLinks.hidden = false;
  } else {
    el.songLinks.hidden = true;
    el.yt.removeAttribute('href');
  }

  // Vocabulary
  el.vocab.innerHTML = '';
  song.vocab.forEach((v) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="v-top">
        <span class="v-word">${escapeHtml(v.word)}</span>
        <span class="v-pos">${escapeHtml(v.pos)}</span>
        <button class="zh-chip" type="button" aria-expanded="false" lang="zh-Hant"
                aria-label="Chinese for ${escapeHtml(v.word)}">中</button>
      </div>
      <p class="v-gloss">${escapeHtml(v.gloss)}</p>
      <p class="v-ex">${highlightWord(v.example, v.word)}</p>
      <p class="v-zh" lang="zh-Hant" hidden>${escapeHtml(v.zh)}</p>`;
    const btn = li.querySelector('.zh-chip');
    const zh = li.querySelector('.v-zh');
    btn.addEventListener('click', () => toggleZh(btn, zh));
    el.vocab.appendChild(li);
  });

  // Language focus
  el.focus.innerHTML =
    `<h4>${escapeHtml(song.focus.title)}</h4><p>${song.focus.body}</p>` +
    `<ul>${song.focus.examples.map((e) => `<li>${e}</li>`).join('')}</ul>`;

  // Discussion
  el.questions.innerHTML = song.questions
    .map((q) => `<li>${escapeHtml(q)}</li>`)
    .join('');

  // A new song means a new set of target words — old output no longer applies.
  el.lyricsOut.innerHTML = '';
  el.lineCount.textContent = '';
  if (el.lyricsIn.value.trim()) renderLyrics();
}

// Bold the target word inside its own example sentence.
function highlightWord(sentence, word) {
  const { re } = buildMatcher([{ word }]);
  return escapeHtml(sentence).replace(re, (m) => `<b>${m}</b>`);
}

/* ---------- the player ---------- */

// Nothing is fetched from YouTube until this runs, and youtube-nocookie.com
// is the domain that holds off on the tracking cookie until playback starts.
function openPlayer(song) {
  const frame = document.createElement('iframe');
  frame.src =
    `https://www.youtube-nocookie.com/embed/${song.youtube}?rel=0&autoplay=1`;
  frame.title = `${song.title} — Linkin Park`;
  frame.allow =
    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.allowFullscreen = true;
  el.player.replaceChildren(frame);
  el.player.hidden = false;
  el.ytPlay.setAttribute('aria-expanded', 'true');
  el.ytPlay.querySelector('.yt-play-label').textContent = 'Close player';
}

// Removing the iframe is what actually stops the audio and ends the
// connection — hiding it would leave it playing.
function closePlayer() {
  el.player.replaceChildren();
  el.player.hidden = true;
  el.ytPlay.setAttribute('aria-expanded', 'false');
}

el.ytPlay.addEventListener('click', () => {
  if (el.ytPlay.getAttribute('aria-expanded') === 'true') {
    closePlayer();
    const audio = current.youtubeKind === 'audio';
    el.ytPlay.querySelector('.yt-play-label').textContent =
      audio ? 'Listen here' : 'Play here';
  } else {
    openPlayer(current);
  }
});

function toggleZh(btn, node) {
  const open = node.hidden;
  node.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
}

function selectSong(song) {
  current = song;
  [...el.tabs.children].forEach((b, i) => {
    const selected = SONGS[i].id === song.id;
    b.setAttribute('aria-selected', String(selected));
    b.tabIndex = selected ? 0 : -1;
  });
  $('main').setAttribute('aria-labelledby', `tab-${song.id}`);
  renderSong(song);
  el.aboutZh.hidden = true;
  el.aboutZhBtn.setAttribute('aria-expanded', 'false');
  if ($('all-zh').checked) applyAllZh(true);
}

/* ---------- lyrics workspace ---------- */

function renderLyrics() {
  const raw = el.lyricsIn.value;
  el.lyricsOut.innerHTML = '';
  if (!raw.trim()) {
    el.lineCount.textContent = '';
    return;
  }

  const { re, order } = buildMatcher(current.vocab);
  const lines = raw.replace(/\r/g, '').split('\n');
  let n = 0;
  let hits = 0;

  lines.forEach((line) => {
    const div = document.createElement('div');
    if (!line.trim()) {
      div.className = 'lline blank';
      el.lyricsOut.appendChild(div);
      return;
    }
    n += 1;
    div.className = 'lline';

    re.lastIndex = 0;
    const html = escapeHtml(line).replace(re, (...args) => {
      // args: match, g1..gN, offset, string
      const groups = args.slice(1, -2);
      const which = groups.findIndex((g) => g !== undefined);
      const idx = order[which];
      hits += 1;
      return `<span class="hit" data-v="${idx}" tabindex="0" role="button">${args[0]}</span>`;
    });

    div.innerHTML = `<span class="lnum">${n}</span><span class="ltext">${html}</span>`;
    el.lyricsOut.appendChild(div);
  });

  el.lineCount.textContent =
    `${n} line${n === 1 ? '' : 's'} · ${hits} target word${hits === 1 ? '' : 's'} found`;
}

// One delegated listener; the lines are rebuilt often.
el.lyricsOut.addEventListener('click', (e) => {
  const hit = e.target.closest('.hit');
  if (hit) openHit(hit);
});

el.lyricsOut.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('hit')) {
    e.preventDefault();
    openHit(e.target);
  }
});

function openHit(hit) {
  const holder = hit.closest('.ltext');
  const existing = holder.querySelector('.hit-pop');
  const same = existing && existing.dataset.v === hit.dataset.v;
  if (existing) existing.remove();
  if (same) return;

  const v = current.vocab[Number(hit.dataset.v)];
  const pop = document.createElement('span');
  pop.className = 'hit-pop';
  pop.dataset.v = hit.dataset.v;
  pop.innerHTML =
    `<b>${escapeHtml(v.word)}</b> <i>${escapeHtml(v.pos)}</i> — ${escapeHtml(v.gloss)}` +
    `<br><span class="zh" lang="zh-Hant">${escapeHtml(v.zh)}</span>`;
  holder.appendChild(pop);
}

function clearWorkspace() {
  el.lyricsIn.value = '';
  el.lyricsOut.innerHTML = '';
  el.lineCount.textContent = '';
}

$('render-btn').addEventListener('click', renderLyrics);

$('clear-btn').addEventListener('click', () => {
  clearWorkspace();
  el.lyricsIn.focus();
});

// Cmd/Ctrl+Enter from the textarea lays the lines out.
el.lyricsIn.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') renderLyrics();
});

/* ---------- Chinese, teacher panel ---------- */

el.aboutZhBtn.addEventListener('click', () =>
  toggleZh(el.aboutZhBtn, el.aboutZh));

function applyAllZh(show) {
  document.querySelectorAll('.zh-chip').forEach((btn) => {
    const target = btn.id === 'about-zh-btn'
      ? el.aboutZh
      : btn.closest('li').querySelector('.v-zh');
    target.hidden = !show;
    btn.setAttribute('aria-expanded', String(show));
  });
}

$('all-zh').addEventListener('change', (e) => applyAllZh(e.target.checked));

$('big-text').addEventListener('change', (e) => {
  document.body.classList.toggle('big', e.target.checked);
  try {
    localStorage.setItem('lp-big', e.target.checked ? '1' : '0');
  } catch (_) { /* private window — the setting just won't stick */ }
});

$('teacher-toggle').addEventListener('click', () => {
  const panel = $('teacher');
  const btn = $('teacher-toggle');
  const open = panel.hidden;
  panel.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
});

$('reset-btn').addEventListener('click', () => {
  clearWorkspace();
  $('all-zh').checked = false;
  selectSong(SONGS[0]);
  $('teacher').hidden = true;
  $('teacher-toggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !$('teacher').hidden) {
    $('teacher').hidden = true;
    $('teacher-toggle').setAttribute('aria-expanded', 'false');
  }
});

/* ---------- start ---------- */

// A browser will restore form state on reload and on back/forward, which would
// bring the pasted words back after the page has promised they are gone. Clear
// the workspace on every entry path: now (Blink restores before this runs),
// again on load (Gecko restores after it), and on pageshow (bfcache).
clearWorkspace();
window.addEventListener('load', clearWorkspace);
window.addEventListener('pageshow', () => {
  clearWorkspace();
  $('all-zh').checked = false;
});

let big = false;
try {
  big = localStorage.getItem('lp-big') === '1';
} catch (_) { /* private window — the setting just won't stick */ }

// Assigned in both directions: a restored checkbox must not disagree with the
// class on <body>. Only this setting persists; the Chinese switch never does.
$('big-text').checked = big;
document.body.classList.toggle('big', big);
$('all-zh').checked = false;

renderTabs();
renderSong(current);
$('main').setAttribute('aria-labelledby', `tab-${current.id}`);
