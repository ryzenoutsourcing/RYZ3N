export default async function handler(req, res) {
  const { message } = req.body;

  const reply = "⚡ Based on what you said, your system is losing efficiency. We can fix this in 14 days.";

  res.status(200).json({ reply });
}
