// Manual integration check: sends ONE real email to the fixed test inbox.
// Run: node --env-file=.env server/smoke-email.js --send
import nodemailer from 'nodemailer';
import { createApp, recipient } from './app.js';

if (!process.argv.includes('--send')) {
  console.error('Use --send to explicitly send a real test email.');
  process.exit(1);
}
const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'CONTACT_ORIGIN'];
if (required.some(key => !process.env[key])) {
  console.error('Missing SMTP configuration (values hidden).');
  process.exit(1);
}
const port = Number(process.env.SMTP_PORT || 587);
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST, port, secure: port === 465, requireTLS: port !== 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000,
});
let server;
try {
  await transport.verify();
  console.log('SMTP authentication and connection: OK');
  const app = createApp({
    origin: process.env.CONTACT_ORIGIN, from: process.env.SMTP_FROM,
    sendMail: async mail => {
      try {
        const result = await transport.sendMail(mail);
        console.log(JSON.stringify({ accepted: result.accepted, rejected: result.rejected, messageId: result.messageId }));
        return result;
      } catch (error) {
        console.error(JSON.stringify({ smtpCode: error.code, responseCode: error.responseCode }));
        throw error;
      }
    },
  });
  server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/contact`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: process.env.CONTACT_ORIGIN },
    body: JSON.stringify({
      name: 'Prueba técnica del formulario', company: 'INGENIAX — PRUEBA DE ENVÍO',
      email: recipient, service: 'Consultoría / Proyecto integral', website: '',
      message: `Prueba autorizada del formulario «Cuéntanos qué tienes en mente».\nFecha UTC: ${new Date().toISOString()}\nEste mensaje verifica la conexión entre el formulario, la API y mi.com.co. No corresponde a una solicitud de un cliente.`,
    }), signal: AbortSignal.timeout(45000),
  });
  const result = await response.json();
  console.log(JSON.stringify({ httpStatus: response.status, ...result }));
  if (!response.ok || !result.ok) process.exitCode = 1;
} catch (error) {
  // Never print raw SMTP errors, environment values, or credentials.
  console.error(JSON.stringify({ code: error.code || error.cause?.code || error.name, responseCode: error.responseCode }));
  process.exitCode = 1;
} finally {
  transport.close();
  if (server) await new Promise(resolve => server.close(resolve));
}
