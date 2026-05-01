import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const lead = req.body;

  // 🔒 BASIC VALIDATION
  if (!lead.email || !lead.email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  if (!lead.name || lead.name.length < 2) {
    return res.status(400).json({ error: "Invalid name" });
  }

  if (!lead.phone || lead.phone.length < 6) {
    return res.status(400).json({ error: "Invalid phone" });
  }

  // 🔥 PRIORITY SYSTEM
  const priority =
    lead.revenue === "high" && lead.urgency === "yes"
      ? "🔥 HOT"
      : "NORMAL";

  try {
    // ✅ SAVE TO SUPABASE
    const response = await fetch(
      process.env.SUPABASE_URL + "/rest/v1/leads",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.SUPABASE_SERVICE_ROLE,
          Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE,
        },
        body: JSON.stringify(lead),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error("Supabase error: " + text);
    }

    // 📩 INTERNAL EMAIL
    await resend.emails.send({
      from: "Ryz3n <onboarding@resend.dev>",
      to: ["ryzenoutsourcing@gmail.com"],
      subject: `${priority} Lead (€${lead.estimated_value})`,
      html: `
        <h2>New Lead</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Business:</strong> ${lead.business_type}</p>
        <p><strong>Revenue:</strong> ${lead.revenue}</p>
        <p><strong>Urgency:</strong> ${lead.urgency}</p>
        <hr>
        <p><strong>Score:</strong> ${lead.score}</p>
        <p><strong>Value:</strong> €${lead.estimated_value}</p>
      `,
    });

    // 📩 CLIENT EMAIL
    await resend.emails.send({
      to: [lead.email],
      subject: "We received your request",
      html: `
        <p>We received your request.</p>
        <p>We’ll contact you within 24h.</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
