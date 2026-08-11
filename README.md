# Linkin Park — English through six songs

A personal side project, separate from *English Exercises*. Six songs spanning
four periods of the band's career, used as material for adult English lessons:

| Song | Album | Year |
| --- | --- | --- |
| In the End | Hybrid Theory | 2000 |
| Numb | Meteora | 2003 |
| Somewhere I Belong | Meteora | 2003 |
| Waiting for the End | A Thousand Suns | 2010 |
| One More Light | One More Light | 2017 |
| Heavy Is the Crown | From Zero | 2024 |

Each song carries a short piece about what it is actually about, six vocabulary
items with a Chinese gloss behind a tap, one language focus point drawn from the
song's own grammar, three discussion questions, and a link to the band's own
YouTube upload.

All six point at the band's official channel and were checked against YouTube's
own metadata. Five are music videos; *Heavy Is the Crown* is the official audio,
because its music video was released on Riot's League of Legends channel rather
than the band's.

**The player is click-to-load.** Opening the page fetches nothing from YouTube —
no iframe, no script, no thumbnail. The embed is built only when *Play here* is
pressed, and it uses `youtube-nocookie.com`. So a lesson that never plays a
video tells YouTube nothing, and the page keeps making zero outbound requests
until the teacher decides otherwise. Closing the player removes the iframe
outright rather than hiding it, which is what actually stops the audio; changing
song does the same.

## No lyrics are stored here

Linkin Park's lyrics are copyrighted, so none of them appear in this repository.
Instead there is a **lyrics workspace**: paste the words in at lesson time and
the page numbers the lines and highlights that song's target vocabulary inside
them. Clicking a highlight shows the definition and the Chinese.

Everything happens in the browser. Nothing is uploaded, nothing is written to
disk, and closing the tab clears it. That keeps the copyrighted text out of the
repo and off any server while still letting the lesson work on the real words.

## Design

Follows the same house rules as the adult material in *English Exercises*:

- **Teacher-led.** A surface to drive on a shared screen, not self-study.
- **Chinese one tap away.** A 中 chip per item, plus *Show all Chinese* in the
  teacher panel. Adults should try the English gloss first.
- **Nothing scored, nothing saved.** Several clients, one laptop — a reload is a
  clean lesson. Only *Larger text* persists, because that belongs to the screen.
- The teacher panel (⌘, bottom right) also has **Reset for next student**.

## Running it

```bash
python3 -m http.server 8080 --directory linkin-park/public
```

Then open <http://localhost:8080>. There is no build step — four static files.

## Files

- `public/index.html` — page structure
- `public/style.css` — dark theme
- `public/data.js` — the six songs: notes, vocabulary, language focus, questions
- `public/app.js` — tabs, Chinese reveals, the lyrics workspace, teacher panel
- `.github/workflows/pages.yml` — publishes `public/` to GitHub Pages on push

## Deployment

The site lives in `public/`, which both hosts build from. A push to `main`
deploys to both:

- **Cloudflare Pages** — <https://linkin-park-9h4.pages.dev>. Git-connected to
  this repo, build output directory `public`, no build command. Deploys in
  seconds; this is the URL to hand to students.
- **GitHub Pages** — <https://lewishsiung-creator.github.io/linkin-park/>, via
  `.github/workflows/pages.yml`. Roughly two minutes.

Same arrangement as *English Exercises*. The Pages project was created
git-connected through the Cloudflare API rather than the dashboard, which works
as long as the account's GitHub App installation already covers the repo. Do
not create it with `wrangler pages project create` — that makes a direct-upload
project, and a project cannot change its source type afterwards, so the name
would be spent.
