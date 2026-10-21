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
- Six original interface-based project concepts with animated category filters, subtle pointer depth, and accessible native-dialog detail views with entrance/exit transitions.
- Siemens, Schneider Electric, and Rockwell Automation technology section using locally hosted, sourced SVG logos.
- Contact details transcribed from the supplied company brochure.
- Validated contact form that prepares an email in the visitor's email application. It does not send or store submissions on a server.
- Reduced-motion support, keyboard focus styles, and a skip-to-content link.
- Staggered scroll reveals, a coordinated hero entrance, animated service accordions and mobile navigation. Scroll progress is progressively enhanced in browsers supporting CSS scroll timelines.

## Content and assets

La sección **Clientes**, situada después de la portada, muestra siete logos originales en una banda de desplazamiento lateral continuo, sin botón de pausa. Se pausa al pasar el cursor sobre los logos. Con movimiento reducido, presenta una cuadrícula estática con todos los clientes. El SVG blanco original de Cotecmar se muestra sobre un fondo azul para asegurar su visibilidad. El componente y sus estilos están en `src/Clients.jsx` y `src/clients.css`; las fuentes de los recursos locales se documentan en `public/logos/clients/README.md`.

Edit copy, projects, services, and contact details in `src/main.jsx`. Base styling and responsive breakpoints are in `src/styles.css`; motion and image-logo sizing are in `src/motion.css`. Scroll reveals are managed by `src/usePageMotion.js`, with no animation-library dependency. They run once per element and respect live changes to the reduced-motion preference.

The project cards are explicitly illustrative application concepts, not claims of completed client work. Replace their mock interfaces and descriptions with approved case studies when available. Technology names indicate the technical ecosystem, not partnership or certification.

The hero photograph loads from Pexels; typography loads from Google Fonts. For an entirely self-hosted deployment, download approved assets and reference local copies. Technology logos are stored in `public/logos/`; their original sources are documented in `public/logos/README.md`.

### Logo original de INGENIAX

El logo original proporcionado se conserva en **`public/logos/ingeniax.png`**, con su transparencia y colores. Se utiliza tanto en la cabecera como en el pie de página; en este último se coloca sobre un fondo blanco para mantener su contraste.

Las rutas se configuran en `src/brands.js` y respetan el subdirectorio de despliegue de Vite. Si el archivo no carga, se muestra el nombre de la empresa en texto. La navegación superior incluye **Clientes**, que enlaza a `#clientes` y también está disponible en el menú móvil.

El favicon recreado se retiró: cuando tengas el original, colócalo en `public/favicon.svg` y añade `<link rel="icon" type="image/svg+xml" href="%BASE_URL%favicon.svg" />` en `index.html`.

Before publishing, confirm the brochure's phone number and street address are current, and add a city if appropriate. A server-side email provider can replace the mailto workflow if direct form delivery is desired.
