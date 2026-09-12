# INGENIAX — Ingeniería Evolutiva

First-version Spanish-language brochure website built with React, Vite, and Lucide icons.

## Run locally

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static hosting provider.

## Included

- Responsive, sticky navigation and accessible mobile menu.
- Industrial hero, company overview, three expandable services, and industry categories.
- Six original interface-based project concepts with category filters, hover depth, and accessible native-dialog detail views.
- Siemens, Schneider Electric, and Rockwell Automation technology section.
- Contact details transcribed from the supplied company brochure.
- Validated contact form that prepares an email in the visitor's email application. It does not send or store submissions on a server.
- Reduced-motion support, keyboard focus styles, and a skip-to-content link.

## Content and assets

Edit copy, projects, services, and contact details in `src/main.jsx`. Styling and responsive breakpoints are in `src/styles.css`.

The project cards are explicitly illustrative application concepts, not claims of completed client work. Replace their mock interfaces and descriptions with approved case studies when available. Technology names indicate the technical ecosystem, not partnership or certification.

The hero photograph loads from Pexels; typography loads from Google Fonts. For an entirely self-hosted deployment, download approved assets and reference local copies. The brand mark is an SVG interpretation of the supplied brochure identity.

Before publishing, confirm the brochure's phone number and street address are current, and add a city if appropriate. A server-side email provider can replace the mailto workflow if direct form delivery is desired.
