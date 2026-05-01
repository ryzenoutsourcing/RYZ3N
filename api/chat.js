let step = 0;

const lead = {
  business_type: "",
  revenue: "",
  bottleneck: "",
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
  "What’s your monthly revenue? (low / medium / high)",
  "What’s your biggest bottleneck right now?",
  "Is this urgent? (yes / no)",
  "Your name?",
  "Your email?",
  "Your phone number?"
];

export function handleChat(message, sendReply, sendLead) {
  const msg = message.trim();

  // STEP LOGIC
  if (step === 0) {
    sendReply("Let’s see how much revenue you're losing.");
    sendReply(questions[0]);
    step++;
    return;
  }

  if (step === 1) {
    lead.business_type = msg;
  }

  if (step === 2) {
    lead.revenue = msg.toLowerCase();
  }

  if (step === 3) {
    lead.bottleneck = msg;
  }

  if (step === 4) {
    lead.urgency = msg.toLowerCase();
  }

  if (step === 5) {
    lead.name = msg;
  }

  if (step === 6) {
    lead.email = msg;
  }

  if (step === 7) {
    lead.phone = msg;

    // 🔥 SCORING
    let score = 0;

    if (lead.revenue === "high") score += 50;
    if (lead.revenue === "medium") score += 30;

    if (lead.urgency === "yes") score += 30;

    lead.score = score;
    lead.estimated_value = score * 100;

    // 🚀 SEND TO BACKEND
    sendLead(lead);

    sendReply("🔥 You're losing serious revenue.");
    sendReply("We’ll contact you within 24h.");

    step = 0;
    return;
  }

  sendReply(questions[step]);
  step++;
}
