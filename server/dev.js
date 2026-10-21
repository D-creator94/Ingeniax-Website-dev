// Start the contact API and frontend together for local form testing.
import './index.js';
import { createServer } from 'vite';

const vite = await createServer({ server: { host: 'localhost', port: 5173, strictPort: true } });
await vite.listen();
vite.printUrls();
