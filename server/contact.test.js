import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp, recipient } from './app.js';

const valid = { name: 'Prueba', company: 'Empresa', email: 'visitante@example.com', service: '', message: 'Consulta de prueba' };
async function withServer(options, run) {
  const server = createApp({ from: 'web@example.com', origin: 'http://localhost:5173', ...options }).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  try {
    await run((data, origin = 'http://localhost:5173') => fetch(`http://127.0.0.1:${server.address().port}/api/contact`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(data),
    }));
  } finally { await new Promise(resolve => server.close(resolve)); }
}
test('sends only to test inbox, sets reply-to, and includes project details', async () => {
  let mail;
  await withServer({ sendMail: async value => { mail = value; return { accepted: [recipient] }; } }, async post => {
    const response = await post({ ...valid, to: 'injected@example.com' });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true });
    assert.equal(mail.to, 'proyectos@ingeniax.com.co');
    assert.equal(mail.replyTo, valid.email);
    assert.ok(mail.text.includes(valid.message));
  });
});
test('rejects invalid fields, spam trap, and unapproved origin before sending', async () => {
  let calls = 0;
  await withServer({ sendMail: async () => { calls++; } }, async post => {
    assert.equal((await post({ ...valid, email: 'invalid' })).status, 400);
    assert.equal((await post({ ...valid, message: ' ' })).status, 400);
    assert.equal((await post({ ...valid, website: 'spam' })).status, 400);
    assert.equal((await post({ ...valid, name: 'name\r\nBcc: injected' })).status, 400);
    assert.equal((await post(valid, 'https://other.example')).status, 403);
    assert.equal(calls, 0);
  });
});
test('does not claim success on SMTP failure or missing configuration', async () => {
  for (const options of [{}, { sendMail: async () => { throw new Error('private SMTP error'); } }, { sendMail: async () => ({ accepted: [] }) }]) {
    await withServer(options, async post => {
      const response = await post(valid);
      assert.ok([502, 503].includes(response.status));
      assert.deepEqual(await response.json(), { ok: false });
    });
  }
});
test('limits repeated submissions', async () => {
  await withServer({}, async post => {
    for (let i = 0; i < 5; i++) await post(valid);
    assert.equal((await post(valid)).status, 429);
  });
});
