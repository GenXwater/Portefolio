import nodemailer from 'nodemailer';

export const handler = async (event) => {
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Content-Type': 'application/json'
	};

	// Handle preflight
	if (event.httpMethod === 'OPTIONS') {
		return { statusCode: 200, headers, body: '' };
	}

	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
	}

	let data = {};
	try {
		data = JSON.parse(event.body || '{}');
	} catch (err) {
		return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON' }) };
	}

	// Accept both field shapes for compatibility
	const name = data.name || data.from_name || '';
	const email = data.email || data.from_email || '';
	const subject = data.subject || data.title || `Nouveau message de ${name}`;
	const message = data.message || data.body || '';

	// basic validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!name || !email || !message) {
		return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing fields' }) };
	}
	if (!emailRegex.test(email)) {
		return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid email' }) };
	}
	if (message.length > 10000) {
		return { statusCode: 400, headers, body: JSON.stringify({ error: 'Message too long' }) };
	}

	// Read SMTP config from env (compatible names)
	const host = process.env.NETLIFY_SMTP_HOST || process.env.SMTP_HOST;
	const port = parseInt(process.env.NETLIFY_SMTP_PORT || process.env.SMTP_PORT || '587', 10);
	const secure = (process.env.NETLIFY_SMTP_SECURE || process.env.SMTP_SECURE || 'false') === 'true';
	const user = process.env.NETLIFY_SMTP_USER || process.env.SMTP_USER;
	const pass = process.env.NETLIFY_SMTP_PASS || process.env.SMTP_PASS;
	const to = process.env.EMAIL_TO || process.env.RECEIVER_EMAIL;

	if (!host || !user || !pass || !to) {
		console.error('SMTP not configured');
		return { statusCode: 500, headers, body: JSON.stringify({ error: 'SMTP not configured' }) };
	}

	try {
		const transporter = nodemailer.createTransport({
			host,
			port,
			secure,
			auth: { user, pass },
			connectionTimeout: 10000,
			greetingTimeout: 10000,
			socketTimeout: 10000,
		});

		// Build HTML like sendEmail2.js
		const html = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<div style="background: linear-gradient(135deg, #5dbdc1 0%, #4da8ac 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
					<h1 style="color: white; margin: 0;">📧 Nouveau message</h1>
					<p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Depuis votre portfolio</p>
				</div>
				<div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
					<div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
						<p style="margin: 0 0 10px 0;"> <strong style="color: #5dbdc1;">Nom :</strong> ${name}</p>
						<p style="margin: 0;"><strong style="color: #5dbdc1;">Email :</strong> <a href="mailto:${email}" style="color: #4da8ac; text-decoration: none;">${email}</a></p>
					</div>
					<div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #5dbdc1; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
						<h3 style="margin: 0 0 15px 0; color: #333;">Message :</h3>
						<p style="white-space: pre-wrap; color: #555; line-height: 1.6;">${message}</p>
					</div>
					<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
						<p style="color: #999; font-size: 12px; margin: 0;">✉️ Envoyé depuis le formulaire de contact de votre portfolio</p>
					</div>
				</div>
			</div>
		`;

		const mailOptions = {
			from: `"Portfolio Contact" <${user}>`,
			to,
			// replyTo: email,
			subject,
			text: `From: ${name} <${email}>\n\n${message}`,
			html,
		};

		await transporter.sendMail(mailOptions);

		return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: 'Email envoyé avec succès' }) };
	} catch (err) {
		console.error('sendEmail error', err);
		return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur lors de l\'envoi', details: err && err.message }) };
	}
};
