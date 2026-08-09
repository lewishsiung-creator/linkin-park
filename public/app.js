/* Linkin Park — English through six songs.
   Teacher-led: nothing is scored, nothing about a lesson survives a reload.
   Only the "larger text" setting persists, because that belongs to the screen. */

const $ = (id) => document.getElementById(id);

const el = {
  tabs: $('tabs'),
  title: $('song-title'),
  meta: $('song-meta'),
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

// Rough inflections, enough to catch a target word as it actually appears in a
// verse: matter/matters/mattered, slip/slipping, heal/healing, care/cared.
function formsOf(word) {
  const w = word.toLowerCase();
  const out = new Set([w]);
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
    const b = document.createElement('button');
    b.className = 'tab';
    b.type = 'button';
    b.role = 'tab';
    b.setAttribute('aria-selected', String(song.id === current.id));
    b.innerHTML = `${escapeHtml(song.title)}<span class="yr">${song.year}</span>`;
    b.addEventListener('click', () => selectSong(song));
    el.tabs.appendChild(b);
  });
}

function renderSong(song) {
  el.title.textContent = song.title;
  el.meta.innerHTML =
    `${escapeHtml(song.album)}<span class="dot">·</span>${song.year}` +
    `<span class="dot">·</span>${escapeHtml(song.era)}`;
  el.about.textContent = song.about;
  el.aboutZh.textContent = song.aboutZh;

  // Vocabulary
  el.vocab.innerHTML = '';
  song.vocab.forEach((v) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="v-top">
        <span class="v-word">${escapeHtml(v.word)}</span>
        <span class="v-pos">${escapeHtml(v.pos)}</span>
        <button class="zh-chip" type="button" aria-expanded="false"
                aria-label="Chinese for ${escapeHtml(v.word)}">中</button>
      </div>
      <p class="v-gloss">${escapeHtml(v.gloss)}</p>
      <p class="v-ex">${highlightWord(v.example, v.word)}</p>
      <p class="v-zh" hidden>${escapeHtml(v.zh)}</p>`;
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

function toggleZh(btn, node) {
  const open = node.hidden;
  node.hidden = !open;
  btn.setAttribute('aria-expanded', String(open));
}

function selectSong(song) {
  current = song;
  [...el.tabs.children].forEach((b, i) =>
    b.setAttribute('aria-selected', String(SONGS[i].id === song.id)));
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
    `<br><span class="zh">${escapeHtml(v.zh)}</span>`;
  holder.appendChild(pop);
}

$('render-btn').addEventListener('click', renderLyrics);

$('clear-btn').addEventListener('click', () => {
  el.lyricsIn.value = '';
  el.lyricsOut.innerHTML = '';
  el.lineCount.textContent = '';
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
  el.lyricsIn.value = '';
  $('all-zh').checked = false;
  selectSong(SONGS[0]);
  el.lyricsOut.innerHTML = '';
  el.lineCount.textContent = '';
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

try {
  if (localStorage.getItem('lp-big') === '1') {
    $('big-text').checked = true;
    document.body.classList.add('big');
  }
} catch (_) { /* ignore */ }

renderTabs();
renderSong(current);
