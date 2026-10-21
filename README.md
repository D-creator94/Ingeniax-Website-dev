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
- Contact form connected to a Node.js SMTP API, with validation, sending state, error handling and a fixed test recipient: proyectos@ingeniax.com.co.
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

Before publishing, confirm the brochure's phone number and street address are current, and add a city if appropriate. Direct form delivery requires the SMTP API described below.


## Envío del formulario (pruebas)

Destinatario fijo: **proyectos@ingeniax.com.co** (`server/app.js`). No se envía a info@ingeniax.com.co. El correo del visitante se usa como Reply-To para responderle, nunca como remitente SMTP.

1. Usa Node.js 22.9 o posterior y ejecuta `npm install`.
2. Copia `.env.example` a `.env` y completa los datos SMTP proporcionados por tu administrador de correo. No subas `.env` al repositorio ni uses prefijos `VITE_` para contraseñas.
3. `SMTP_FROM` debe ser un remitente autorizado por el proveedor. El puerto 465 usa TLS directo; 587 requiere STARTTLS. Referencia: https://nodemailer.com/smtp
4. Ejecuta `npm run dev` para iniciar la web y la API de correo juntas. Abre la web desde `http://localhost:5173/Ingeniax-Website-dev/`; Vite redirige `/api` al servidor local. `npm run server` inicia únicamente la API para un despliegue separado.
5. Diligencia el formulario y confirma la recepción en proyectos@ingeniax.com.co, incluida la carpeta de spam. Una respuesta exitosa indica aceptación del servidor SMTP, no garantiza entrega a bandeja de entrada.

### Hosting

La publicación actual usa GitHub Pages, que solo aloja el frontend. Para el envío, despliega `server/` con sus dependencias en un servicio que ejecute Node.js, configura las variables privadas y una URL HTTPS. Si eliges Hostinger, confirma que el plan seleccionado permita ejecutar Node.js; un plan que solo sirva archivos estáticos/PHP necesita otra implementación o una API externa.

Configura `CONTACT_ORIGIN` con el origen exacto del sitio (por ejemplo `https://usuario.github.io`, sin la ruta del repositorio). Configura la variable de compilación `VITE_CONTACT_ENDPOINT` con `https://tu-api.example/api/contact` y vuelve a compilar. En GitHub Actions puedes definir esta variable de repositorio; el workflow la pasa a Vite. Nunca pongas claves SMTP en variables del frontend.

El servidor limita a cinco solicitudes cada quince minutos por dirección IP y valida tamaño, campos, origen y un campo trampa. El límite está en memoria y es por instancia; detrás de un proxy, la configuración actual agrupa los visitantes bajo la IP del proxy. Antes de producción configura la confianza en el proxy según la infraestructura y usa límites compartidos si hay varias instancias.

Pruebas automatizadas: `npm test` (SMTP simulado, sin enviar correos reales). Compilación: `npm run build`. Las credenciales y la entrega real deben verificarse al disponer de la cuenta y el hosting.
