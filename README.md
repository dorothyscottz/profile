# Muhammad Farhan — Portfolio

A responsive, recruiter-focused React portfolio with two distinct layouts, interactive work stories, and a development-only design editor.

## Run locally

Requires Node.js 20.19+ (or 22.12+).

```sh
npm ci
npm run dev -- --port 3000
```

```sh
npm test       # Profile, persistence, import safety, and résumé tests
npm run build # Production output in dist/
npm run verify:build # Check asset paths and development-editor exclusion
```

The repository-owned `.hoplite/settings.json` configures installation and preview startup. Deploy `dist/` to a static host such as Netlify, Vercel, or GitHub Pages. Set `VITE_BASE_PATH` when building for a subpath; local development defaults to `/`.

## GitHub Pages preview

The checked-in **Portfolio preview on GitHub Pages** workflow tests, builds, and deploys the site on pushes to `main`. Manual runs only deploy when run against `main`. Pull requests run tests and builds without deploying; there are no separate per-PR Pages sites.

One-time repository setup:

1. Open **Settings → Pages → Build and deployment** and select **GitHub Actions** as the source.
2. Keep the `github-pages` environment restricted to `main`. Do not disable required approvals.
3. Open **Actions → Portfolio preview on GitHub Pages** and rerun the deployment if it previously failed before Pages was enabled.

The site is **https://dorothyscottz.github.io/profile/**. The workflow automatically builds assets under `/profile/`, so CSS, JavaScript, and the favicon work on GitHub Pages. It uses GitHub’s built-in Actions token; no personal access token is needed. GitHub Pages must be available for the repository’s visibility and account plan.

To reproduce the Pages build locally:

```sh
VITE_BASE_PATH=/profile/ npm run build
VITE_BASE_PATH=/profile/ npm run verify:build
```

## Features

- Two responsive designs: **Editorial** (split hero, three-column stories, timeline) and **Studio** (centered hero, featured work, experience cards).
- Warm-light and dark themes, four accent palettes, and configurable subtle/off motion. System reduced-motion preferences always win.
- Engineering/research filters, detailed contribution dialogs, and an interactive code illustration.
- Experience timeline, about section, and technical toolkit.
- Recruiter résumé with plain-text download and browser print/save-as-PDF.
- LinkedIn contact and copy-link actions; optional direct email after a valid address is configured.
- Development-only customization drawer for layout, motion, profile, headline, availability, work stories, and experience.
- Local persistence, JSON import/export, and confirmed reset.
- Native dialogs for focus containment, Escape dismissal, and focus restoration.

## Customize and publish

The public site **does not expose Customize or load saved browser drafts**. Adding `?edit=1` to the production site does not enable editing. There is no public admin route, client-side password, or write API.

1. Run `npm run dev -- --port 3000`, or open the development Preview, and visit `/?edit=1` (locally: `http://localhost:3000/?edit=1`).
2. Select **Customize → Appearance** to choose Editorial or Studio, colors, light/dark mode, and motion. Profile and Content edit your copy and professional history.
3. Changes apply immediately and save as a draft in this browser. **View published version** returns to the checked-in settings without deleting the draft. **Reset** restores the checked-in published profile after confirmation.
4. **Export** downloads `published-profile.json`. **Import** restores a backup, including older exports without layout/motion settings.
5. Replace **`src/published-profile.json`** in this repository with your exported file, then commit/merge to `main`. GitHub Actions rebuilds the site for all visitors. You can edit this JSON directly to change design without editing JSX or CSS.

For example, the file can contain only overrides:

```json
{
  "layout": "studio",
  "theme": "dark",
  "accent": "forest",
  "motion": "subtle"
}
```

This is a **development editor, not an authenticated CMS**. `import.meta.env.DEV` gates the editor; production builds remove the controls regardless of query parameters or local storage. Do not expose a development server as the public site: anyone with access to that server can use its local editor, but cannot publish through it. **GitHub repository write permissions protect publication**, not a secret URL or a frontend password. True online admin authentication would require a backend or an authenticated CMS. No API, analytics, credentials, or personal data collection is included. Update the description in `index.html` if the public profile changes.

The email address is intentionally blank; enter your preferred recruiting address to enable the email link. Review all wording and availability before publishing. Résumé PDFs are generated using your browser’s print dialog; select **Save as PDF** and disable browser headers/footers if preferred.

## Content provenance

Profile content is based on the public LinkedIn profile supplied by the owner:
https://www.linkedin.com/in/muhammad-farhan-21a787134/

The professional history includes Qualysoft, PT Nawa Data Solutions, and the co-authored IEEE publication “Detecting Heart Valve Disease Using Support Vector Machine Algorithm based on Phonocardiogram Signal.” Exact prior-employment dates and a contact address were not available and have not been invented. Work cards summarize professional contributions, not independent products. All system visuals are conceptual illustrations and contain no client data. The public availability message and editorial copy should be reviewed by the owner.

Typography uses Google Fonts, with system fallbacks. Icons are provided by Lucide. All illustrations are original CSS/SVG compositions without external photo dependencies.
