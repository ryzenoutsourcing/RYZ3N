let step = 0;

const lead = {
  business_type: "",
  revenue: "",
  urgency: "",
  name: "",
  email: "",
  phone: "",
  score: 0,
  estimated_value: 0,
  source: "chatbot"
};

const questions = [
  "What business do you run?",
  "What’s your monthly revenue? (low / mid / high)",
  "Is this urgent? (yes / no)",
  "Your name?",
  "Your email?",
  "Your phone?"
];

export function handleChat(message, sendReply, sendLead) {
  const msg = message.trim().toLowerCase();

  if (step === 0) {
    sendReply("⚡ Let’s see how much revenue you're losing.");
    sendReply(questions[0]);
    step++;
    return;
  }

  if (step === 1) lead.business_type = msg;
  if (step === 2) lead.revenue = msg;
  if (step === 3) lead.urgency = msg;
  if (step === 4) lead.name = msg;
  if (step === 5) lead.email = msg;

  if (step === 6) {
    lead.phone = msg;

    // 🔥 SCORING
    let score = 0;

    if (lead.revenue === "high") score += 50;
    if (lead.revenue === "mid") score += 30;
    if (lead.urgency === "yes") score += 30;
    if (lead.business_type.includes("taxi")) score += 20;

    lead.score = score;
    lead.estimated_value = score * 100;

    sendLead(lead);

    sendReply("🔥 You’re losing revenue every day.");
    sendReply("📞 We’ll contact you within 24h.");

    step = 0;
    return;
  }

  sendReply(questions[step]);
  step++;
}
