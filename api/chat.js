export default async function handler(req, res) {
  const { message } = req.body;

  const reply = `You said: ${message}. Our team will contact you.`;

  res.status(200).json({ reply });
}
