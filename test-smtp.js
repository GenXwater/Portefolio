import nodemailer from 'nodemailer';

(async () => {
  const host = process.env.NETLIFY_SMTP_HOST;
  const port = parseInt(process.env.NETLIFY_SMTP_PORT || '587', 10);
  const secure = (process.env.NETLIFY_SMTP_SECURE || 'false') === 'true';
  const user = process.env.NETLIFY_SMTP_USER;
  // don't log pass
  console.log('SMTP test config', { host, port, secure, user });

  const transporter = nodemailer.createTransport({
    host, port, secure,
    auth: { user, pass: process.env.NETLIFY_SMTP_PASS },
    logger: true,
    debug: true,
  });

  try {
    await transporter.verify();
    console.log('✅ SMTP verify OK — credentials accepted.');
  } catch (err) {
    console.error('❌ SMTP verify failed:', err && err.message ? err.message : err);
    process.exitCode = 2;
  }
})();