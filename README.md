# Linkin Park — English through six songs

A personal side project, separate from *English Exercises*. Six songs, one per
era, used as material for adult English lessons:

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
song's own grammar, and three discussion questions.

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

- **GitHub Pages** — via `.github/workflows/pages.yml`, roughly two minutes.
- **Cloudflare Pages** — connected to the same repo, build output directory
  `public`, no build command. Deploys in seconds; this is the URL to hand to
  students.

Same arrangement as *English Exercises*. Note that a git-connected Cloudflare
Pages project can only be created in the Cloudflare dashboard — creating one
from the CLI would lock that project name to direct-upload forever.
