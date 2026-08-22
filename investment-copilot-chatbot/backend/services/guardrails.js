// Simple, transparent, rule-based guardrails.
// This is not a substitute for compliance/legal review in a real product,
// but it demonstrates the pattern: check input, check output, always disclose.

const RISK_KEYWORDS = ["guaranteed", "guarantee", "sure thing", "can't lose", "risk-free", "100% return"];
const HIGH_RISK_TOPICS = ["margin", "leverage", "options", "futures", "crypto", "cryptocurrency", "penny stock"];

const STANDARD_DISCLAIMER =
  "This is general educational information, not personalized financial, tax, or legal advice. " +
  "Consider talking to a licensed financial advisor before making investment decisions.";

function checkUserMessage(message) {
  const lower = message.toLowerCase();
  const flags = [];

  if (HIGH_RISK_TOPICS.some((t) => lower.includes(t))) {
    flags.push("high_risk_topic");
  }
  if (/\ball[- ]?in\b/.test(lower) || /borrow (money|to invest)/.test(lower)) {
    flags.push("possible_overexposure");
  }

  return flags;
}

function sanitizeModelReply(replyText) {
  let text = replyText;

  // Strip absolute/guarantee-style language a model might slip in.
  for (const phrase of RISK_KEYWORDS) {
    const regex = new RegExp(phrase, "gi");
    text = text.replace(regex, "historically likely (not guaranteed)");
  }

  return text;
}

function buildSystemGuardrailPrompt() {
  return (
    "You are a responsible investing educator, not a licensed financial advisor. Rules you must follow:\n" +
    "1. Never guarantee returns or claim any investment is risk-free.\n" +
    "2. Never tell the user to buy or sell a specific security as personalized financial advice; instead, explain " +
    "concepts, trade-offs, and general considerations so the user can decide for themselves.\n" +
    "3. Always mention relevant risks alongside potential benefits.\n" +
    "4. If the user describes high-risk behavior (e.g. investing money they cannot afford to lose, using heavy leverage, " +
    "putting their entire portfolio into one asset), gently flag the risk before answering.\n" +
    "5. Encourage diversification, long-term thinking, and matching investments to the user's goals, time horizon, and risk tolerance.\n" +
    "6. Keep a neutral, non-hype tone — no urgency language like 'act now' or 'don't miss out'."
  );
}

module.exports = {
  checkUserMessage,
  sanitizeModelReply,
  buildSystemGuardrailPrompt,
  STANDARD_DISCLAIMER,
};
