# The Invite Studio

A static website for selling customized digital invitations. No build step, no dependencies. Plain HTML, CSS and JavaScript.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `styles.css` | All styling (light + dark theme) |
| `script.js` | Site behavior (you normally don't edit this) |
| `config.js` | **Everything you edit:** prices, products, payments, contact info |
| `images/` | Your photos and payment QR codes |

## Put it online with GitHub Pages

1. Create a new repository on GitHub (e.g. `invite-studio`).
2. Upload all files from this folder (keep the `images` folder).
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/invite-studio/`.

## Images to add (in the `images/` folder)

Your old file stored photos inside Claude, so they don't carry over. Re-add them using these names (or change the paths in `config.js`):

- `hero.jpg` – homepage photo
- `cat-wedding.jpg` – Wedding Invitations category photo
- `ivory-romance.jpg` – design photo (add more products in `config.js`)
- `qr-gcash.png`, `qr-maya.png`, `qr-bank.png`, `qr-international.png` – payment QR codes

Any missing image simply shows a soft colored placeholder. Tip: keep photos under ~300 KB for fast loading.

## Common edits (all in `config.js`)

- **Add a product:** copy a line in `products` and change the text. Use `images: ["images/my-photo.jpg"]` (add several for a gallery) and `sample: "https://your-canva-link"` for the live sample button.
- **Set prices:** fill `local` (₱) and `intl` ($) for each category. Blank shows "Inquire".
- **Social links:** paste URLs into `social`. Empty ones are hidden.
- **Reviews:** add real ones to `testimonials`. The section stays hidden until you do.
- **Terms and Privacy:** starter text lives in `legal`. Review it before launch.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit `http://localhost:8000`.
