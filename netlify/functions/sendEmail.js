import nodemailer from 'nodemailer';

export const handler = async (event) => {
	// Only allow POST
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	let data;
	try {
		data = JSON.parse(event.body || '{}');
	} catch (err) {
		return { statusCode: 400, body: 'Invalid JSON' };
	}

	const { name, email, subject, message } = data;
	if (!name || !email || !message) {
		return { statusCode: 400, body: 'Missing fields' };
	}

	// Read SMTP config from env
	const host = process.env.NETLIFY_SMTP_HOST;
	const port = parseInt(process.env.NETLIFY_SMTP_PORT || '587', 10);
	const secure = (process.env.NETLIFY_SMTP_SECURE || 'false') === 'true';
	const user = process.env.NETLIFY_SMTP_USER;
	const pass = process.env.NETLIFY_SMTP_PASS;
	const to = process.env.EMAIL_TO;

	if (!host || !user || !pass || !to) {
		return { statusCode: 500, body: 'SMTP not configured' };
	}

	try {
		const transporter = nodemailer.createTransport({
			host,
			port,
			secure,
			auth: { user, pass },
		});

		const mailOptions = {
			from: `${name} <${email}>`,
			to,
			subject: subject || `Contact form: ${name}`,
			text: `From: ${name} <${email}>\n\n${message}`,
			html: `<p>From: <strong>${name}</strong> &lt;${email}&gt;</p><p>${message}</p>`,
		};

		await transporter.sendMail(mailOptions);
		return { statusCode: 200, body: 'Email sent' };
	} catch (err) {
		console.error('sendEmail error', err);
		return { statusCode: 500, body: 'Error sending email' };
	}
};
