import express from 'express';
import rateLimit from 'express-rate-limit';

export const recipient = 'proyectos@ingeniax.com.co';
const services = ['', 'Soluciones Eléctricas Industriales', 'Automatización y Control', 'Desarrollo de Plataformas IIoT', 'Consultoría / Proyecto integral'];

export function createApp({ sendMail, from, origin }) {
  const app = express();
  app.disable('x-powered-by');
  app.use('/api/contact', (req, res, next) => {
    res.set('Cache-Control', 'no-store');
    res.vary('Origin');
    if (req.headers.origin && req.headers.origin !== origin) return res.status(403).json({ ok: false });
    if (req.headers.origin) res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });
  app.use('/api/contact', rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false, message: { ok: false } }));
  app.use(express.json({ limit: '24kb' }));
  app.post('/api/contact', async (req, res) => {
    const data = req.body;
    if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ ok: false });
    if (data.website) return res.status(400).json({ ok: false });
    const limits = { name: 120, company: 150, email: 180, service: 100, message: 4000 };
    const fields = {};
    for (const [key, limit] of Object.entries(limits)) {
      const value = data[key] ?? '';
      if (typeof value !== 'string' || value.length > limit) return res.status(400).json({ ok: false });
      fields[key] = value.trim();
    }
    const { name, company, email, service, message } = fields;
    if (!name || !message || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(name + company) || !services.includes(service)) {
      return res.status(400).json({ ok: false });
    }
    if (!sendMail || !from) return res.status(503).json({ ok: false });
    try {
      const result = await sendMail({
        from, to: recipient, replyTo: email,
        subject: `Consulta de ingeniería — ${company || name}`,
        text: `Nombre: ${name}\nEmpresa: ${company || 'No especificada'}\nCorreo: ${email}\nServicio: ${service || 'No especificado'}\n\nProyecto:\n${message}`,
      });
      if (!result.accepted?.some(address => address.toLowerCase() === recipient)) throw new Error('Recipient rejected');
      res.json({ ok: true });
    } catch {
      res.status(502).json({ ok: false });
    }
  });
  app.use((err, req, res, next) => {
    res.status(err.status === 413 ? 413 : 400).json({ ok: false });
  });
  return app;
}
