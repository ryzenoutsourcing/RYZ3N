// ================================
// 🌍 TRANSLATIONS
// ================================
const translations = {
  en: {
    welcome: "⚡ Most businesses lose 20–40% revenue due to bad systems. Let’s check yours.",
    business: "What business do you have?",
    build: "What do you want to build?",
    clients: "Do you already get clients?",
    revenue: "What is your monthly revenue?",
    problem: "What is your biggest problem?",
    urgency: "Do you want to start fast?",
    name: "Your name?",
    phone: "Your phone number?",
    email: "Your email?",
    qualify: "🚀 You qualify for a priority pilot.",
    contact: "✅ We'll contact you shortly.",
    processing: "⚡ Processing...",
    fallback1: "You’re leaving money on the table every day.",
    fallback2: "We’ll analyze your system and send you a breakdown within 24h.",
    estimate: {
      low: "€1k–€3k/month",
      mid: "€3k–€10k/month",
      high: "€10k+/month"
    },
    buttons: {
      business: [
        { label: "Taxi / Transport", value: "taxi" },
        { label: "E-commerce", value: "ecommerce" },
        { label: "Service business", value: "service" }
      ],
      build: [
        { label: "Website", value: "website" },
        { label: "Automation", value: "automation" },
        { label: "Full system", value: "system" }
      ],
      yesno: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" }
      ],
      revenue: [
        { label: "< €5k", value: "low" },
        { label: "€5k - €20k", value: "mid" },
        { label: "€20k+", value: "high" }
      ]
    }
  },

  fr: {
    welcome: "⚡ La plupart des entreprises perdent 20 à 40 % de revenus à cause de systèmes inefficaces.",
    business: "Quel est votre type d'activité ?",
    build: "Que voulez-vous créer ?",
    clients: "Avez-vous déjà des clients ?",
    revenue: "Quel est votre chiffre d'affaires mensuel ?",
    problem: "Quel est votre principal problème ?",
    urgency: "Voulez-vous démarrer rapidement ?",
    name: "Votre nom ?",
    phone: "Votre numéro de téléphone ?",
    email: "Votre email ?",
    qualify: "🚀 Vous êtes éligible pour un projet prioritaire.",
    contact: "✅ Nous vous contacterons bientôt.",
    processing: "⚡ Traitement en cours...",
    fallback1: "Vous perdez de l’argent chaque jour.",
    fallback2: "Nous analyserons votre système et vous enverrons un diagnostic sous 24h.",
    estimate: {
      low: "1k€–3k€/mois",
      mid: "3k€–10k€/mois",
      high: "10k€+/mois"
    },
    buttons: {
      business: [
        { label: "Taxi / Transport", value: "taxi" },
        { label: "E-commerce", value: "ecommerce" },
        { label: "Service", value: "service" }
      ],
      build: [
        { label: "Site web", value: "website" },
        { label: "Automatisation", value: "automation" },
        { label: "Système complet", value: "system" }
      ],
      yesno: [
        { label: "Oui", value: "yes" },
        { label: "Non", value: "no" }
      ],
      revenue: [
        { label: "< 5k€", value: "low" },
        { label: "5k€ - 20k€", value: "mid" },
        { label: "20k€+", value: "high" }
      ]
    }
  },

  nl: {
    welcome: "⚡ De meeste bedrijven verliezen 20–40% omzet door slechte systemen.",
    business: "Wat voor bedrijf heb je?",
    build: "Wat wil je bouwen?",
    clients: "Heb je al klanten?",
    revenue: "Wat is je maandelijkse omzet?",
    problem: "Wat is je grootste probleem?",
    urgency: "Wil je snel starten?",
    name: "Je naam?",
    phone: "Je telefoonnummer?",
    email: "Je e-mail?",
    qualify: "🚀 Jij komt in aanmerking voor een prioritaire pilot.",
    contact: "✅ We nemen binnenkort contact op.",
    processing: "⚡ Bezig met verwerken...",
    fallback1: "Je laat elke dag geld liggen.",
    fallback2: "We analyseren je systeem en sturen je binnen 24 uur een breakdown.",
    estimate: {
      low: "€1k–€3k/maand",
      mid: "€3k–€10k/maand",
      high: "€10k+/maand"
    },
    buttons: {
      business: [
        { label: "Taxi / Transport", value: "taxi" },
        { label: "E-commerce", value: "ecommerce" },
        { label: "Dienstverlening", value: "service" }
      ],
      build: [
        { label: "Website", value: "website" },
        { label: "Automatisering", value: "automation" },
        { label: "Volledig systeem", value: "system" }
      ],
      yesno: [
        { label: "Ja", value: "yes" },
        { label: "Nee", value: "no" }
      ],
      revenue: [
        { label: "< €5k", value: "low" },
        { label: "€5k - €20k", value: "mid" },
        { label: "€20k+", value: "high" }
      ]
    }
  }
};

// ================================
// 🧠 STATE
// ================================
let step = 0;
let data = {};
let score = 0;
let lang = "en";

// ================================
// 🚀 MAIN HANDLER
// ================================
export function handleChat(message, addMessage, sendLead) {

  if (message === "start") {
    step = 0;
    data = {};
    score = 0;
    addMessage(translations[lang].welcome);
    nextStep(addMessage);
    return;
  }

  data[step] = message;

  if (step === 1 && message === "automation") score += 2;
  if (step === 2 && message === "yes") score += 2;

  if (step === 3) {
    addMessage("📊 " + translations[lang].estimate[message]);
  }

  step++;
  nextStep(addMessage, sendLead);
}

// ================================
// 🔁 FLOW
// ================================
window.addButtons(...)
window.enableInput(...)
export function handleChat(message, addMessage, sendLead, ui) {
  ui.addButtons(...)
  ui.enableInput()
}
function nextStep(addMessage, sendLead) {

  const t = translations[lang];

  switch(step) {
    case 0:
      addMessage(t.business);
      addButtons(t.buttons.business);
      break;

    case 1:
      addMessage(t.build);
      addButtons(t.buttons.build);
      break;

    case 2:
      addMessage(t.clients);
      addButtons(t.buttons.yesno);
      break;

    case 3:
      addMessage(t.revenue);
      addButtons(t.buttons.revenue);
      break;

    case 4:
      addMessage(t.problem);
      enableInput();
      break;

    case 5:
      addMessage(t.urgency);
      addButtons(t.buttons.yesno);
      break;

    case 6:
      addMessage(t.name);
      enableInput();
      break;

    case 7:
      addMessage(t.phone);
      enableInput();
      break;

    case 8:
      addMessage(t.email);
      enableInput();
      break;

    default:
      finish(addMessage, sendLead);
  }
}

// ================================
// 🏁 FINISH
// ================================
function finish(addMessage, sendLead) {
  const t = translations[lang];

  addMessage(t.processing);

  if (score >= 4) {
    addMessage(t.qualify);
  } else {
    addMessage(t.fallback1);
    addMessage(t.fallback2);
  }

  sendLead({
    ...data,
    score,
    lang,
    created_at: new Date().toISOString()
  });
}

// ================================
// 🌐 LANGUAGE SWITCH
// ================================
export function setLanguage(newLang) {
  lang = newLang;
}
