import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const lead = req.body;

  try {
    // 1. Save to Supabase
    await fetch(process.env.SUPABASE_URL + "/rest/v1/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.SUPABASE_SERVICE_ROLE,
        "Authorization": "Bearer " + process.env.SUPABASE_SERVICE_ROLE
      },
      body: JSON.stringify(lead)
    });

    // 2. Send email
    await resend.emails.send({
      from: "Ryz3n <onboarding@resend.dev>",
      to: ["ryzenoutsourcing@gmail.com"],
      subject: "🔥 New Qualified Lead",
      html: `
        <h2>New Lead</h2>
        <pre>${JSON.stringify(lead, null, 2)}</pre>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
