const MAX_LENGTHS = { name: 100, phone: 40, email: 254, interest: 120, message: 3_000 };

// Vercel provides process.env at runtime. Reading it through globalThis keeps
// this route independent from TypeScript's Node ambient declarations.
const environment = globalThis.process?.env;
const recipient = environment?.INQUIRY_TO_EMAIL || "ibrahimawafarms@gmail.com";

function getText(value, field) {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length > 0 && text.length <= MAX_LENGTHS[field] ? text : null;
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

module.exports = async function handler(req, res) {
  res.setHeader("Allow", "POST");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed." });

  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({ message: "Invalid enquiry data." });
  }

  const { name, phone, email, interest, message } = body;
  const validName = getText(name, "name");
  const validPhone = getText(phone, "phone");
  const validEmail = getText(email, "email");
  const validInterest = getText(interest, "interest");
  const validMessage = getText(message, "message");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+().\-\s]{7,40}$/;

  if (!validName || !validPhone || !validEmail || !validInterest || !validMessage || !emailPattern.test(validEmail) || !phonePattern.test(validPhone)) {
    return res.status(400).json({ message: "Please provide a valid name, phone number, email address, machine interest, and message." });
  }

  const apiKey = environment?.RESEND_API_KEY;
  const from = environment?.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("Resend email configuration is missing.");
    return res.status(503).json({ message: "Enquiries are temporarily unavailable. Please call or email our team." });
  }

  const text = `New IGAF website enquiry\n\nName: ${validName}\nPhone: ${validPhone}\nEmail: ${validEmail}\nInterested in: ${validInterest}\n\nMessage:\n${validMessage}`;
  const html = `<h2>New IGAF website enquiry</h2><p><strong>Name:</strong> ${escapeHtml(validName)}<br><strong>Phone:</strong> ${escapeHtml(validPhone)}<br><strong>Email:</strong> ${escapeHtml(validEmail)}<br><strong>Interested in:</strong> ${escapeHtml(validInterest)}</p><p><strong>Message:</strong><br>${escapeHtml(validMessage).replace(/\n/g, "<br>")}</p>`;

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [recipient], reply_to: validEmail, subject: "New IGAF website enquiry", text, html }),
    });

    if (!resendResponse.ok) {
      console.error("Resend email request failed.", resendResponse.status);
      return res.status(502).json({ message: "We could not send your enquiry. Please try again or contact us directly." });
    }
  } catch (error) {
    console.error("Resend email request failed.", error);
    return res.status(502).json({ message: "We could not send your enquiry. Please try again or contact us directly." });
  }

  return res.status(200).json({ message: "Enquiry sent." });
};
