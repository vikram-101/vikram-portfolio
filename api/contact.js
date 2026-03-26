const RESEND_URL = "https://api.resend.com/emails";

function getAllowedOrigin(req) {
  return req.headers.origin || "http://localhost:3000";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", getAllowedOrigin(req));
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || "vt594925@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing RESEND_API_KEY on the server.",
    });
  }

  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const projectType = typeof req.body?.projectType === "string" ? req.body.projectType.trim() : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Name, email, and message are required.",
    });
  }

  const subject = `Portfolio enquiry from ${name}${projectType ? ` - ${projectType}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Project Type: ${projectType || "Not specified"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">New Portfolio Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Project Type:</strong> ${projectType || "Not specified"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>
  `;

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject,
        text,
        html,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const upstreamError =
        data?.message || data?.error?.message || data?.error || `Email API error: ${response.status}`;
      return res.status(response.status).json({ error: upstreamError });
    }

    return res.status(200).json({ success: true, id: data?.id || null });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error.",
    });
  }
};
