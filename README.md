# Muhammad Farhan — Portfolio

A responsive, recruiter-focused React portfolio with an editorial visual system, interactive work stories, and browser-local customization.

## Run locally

Requires Node.js 20.19+ (or 22.12+).

```sh
npm ci
npm run dev -- --port 3000
```

```sh
npm test       # Profile, persistence, import safety, and résumé tests
npm run build # Production output in dist/
```

The repository-owned `.hoplite/settings.json` configures installation and preview startup. Deploy `dist/` to a static host such as Netlify, Vercel, or GitHub Pages. For a GitHub Pages project subpath, set Vite’s `base` to the repository path before building.

## Features

- Responsive layout with warm-light and dark themes, four accent palettes, and reduced-motion support.
- Engineering/research filters, detailed contribution dialogs, and an interactive code illustration.
- Experience timeline, about section, and technical toolkit.
- Recruiter résumé with plain-text download and browser print/save-as-PDF.
- LinkedIn contact and copy-link actions; optional direct email after a valid address is configured.
- Customization drawer for profile, headline, availability, work stories, and experience.
- Local persistence, JSON import/export, and confirmed reset.
- Native dialogs for focus containment, Escape dismissal, and focus restoration.

## Customize and publish

Use **Customize** in the header. Changes apply immediately and are saved in this browser’s local storage. **Export** downloads a JSON backup; **Import** restores it in another browser. **Reset** restores the original profile after confirmation.

These are **local previews**, not an authenticated CMS. They do not modify the server, and other visitors do not see your local changes. To publish your profile, update the `defaultProfile` values in `src/profile.js` with your exported settings, then rebuild and deploy. Update the description in `index.html` if the public profile changes. No API, analytics, credentials, or personal data collection is included.

The email address is intentionally blank; enter your preferred recruiting address to enable the email link. Review all wording and availability before publishing. Résumé PDFs are generated using your browser’s print dialog; select **Save as PDF** and disable browser headers/footers if preferred.

## Content provenance

Profile content is based on the public LinkedIn profile supplied by the owner:
https://www.linkedin.com/in/muhammad-farhan-21a787134/

The professional history includes Qualysoft, PT Nawa Data Solutions, and the co-authored IEEE publication “Detecting Heart Valve Disease Using Support Vector Machine Algorithm based on Phonocardiogram Signal.” Exact prior-employment dates and a contact address were not available and have not been invented. Work cards summarize professional contributions, not independent products. All system visuals are conceptual illustrations and contain no client data. The public availability message and editorial copy should be reviewed by the owner.

Typography uses Google Fonts, with system fallbacks. Icons are provided by Lucide. All illustrations are original CSS/SVG compositions without external photo dependencies.
