export default async function handler(req, res) {
  const { message } = req.body;
const msg = message.toLowerCase();

  let reply;
if (["taxi","uber","fleet","dispatch"].some(k => msg.includes(k))) {
  reply = "Taxi businesses lose up to 30% revenue due to bad dispatch systems.";
} else if (message.includes("ecommerce")) {
  reply = "E-commerce stores lose revenue from poor automation and abandoned carts.";
} else {
  reply = "We detect inefficiencies in most systems. We can fix this in 14 days.";
}
  res.status(200).json({ reply });
}
