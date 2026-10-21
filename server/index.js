import nodemailer from 'nodemailer';
import { createApp } from './app.js';

const { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_ORIGIN } = process.env;
const port = Number(process.env.SMTP_PORT || 587);
const configured = SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_FROM && CONTACT_ORIGIN;
const transport = configured ? nodemailer.createTransport({
  host: SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
}) : null;
if (!configured) console.warn('Correo sin configurar: completa las variables SMTP y CONTACT_ORIGIN. El formulario responderá 503.');
createApp({ sendMail: transport?.sendMail.bind(transport), from: SMTP_FROM, origin: CONTACT_ORIGIN })
  .listen(Number(process.env.PORT || 3001), () => console.log('API de contacto iniciada.'));
