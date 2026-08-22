const Groq = require("groq-sdk");
const { buildSystemGuardrailPrompt } = require("./guardrails");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const MODE_INSTRUCTIONS = {
  beginner:
    "Explain things in simple, plain language. Avoid jargon, or define it immediately in one short phrase when you must use it. Use short sentences and everyday analogies.",
  intermediate:
    "You can use standard investing terminology (diversification, expense ratio, asset allocation, etc.) without over-explaining every term, but still keep explanations clear and structured.",
  advanced:
    "You can use precise financial terminology, discuss trade-offs in more depth, and reference concepts like risk-adjusted return, correlation, or tax efficiency where relevant, without oversimplifying.",
};

/**
 * Builds the full prompt (system + context) and calls Groq's chat completion API.
 * Returns both the reply text and a `reasoning` object capturing WHY the model
 * was told what it was told — this powers the "Why did I say this?" feature.
 */
async function getChatCompletion({ userMessage, mode, profile, retrievedArticles, history }) {
  const modeInstruction = MODE_INSTRUCTIONS[mode] || MODE_INSTRUCTIONS.beginner;

  const profileSummary = profile
    ? `User profile — risk tolerance: ${profile.riskTolerance || "unspecified"}, ` +
      `time horizon: ${profile.timeHorizon || "unspecified"}, ` +
      `primary goal: ${profile.primaryGoal || "unspecified"}, ` +
      `experience level: ${mode}.`
    : "No profile set yet.";

  const contextSnippets = retrievedArticles
    .map((a) => `[Source: ${a.title}] ${a.content}`)
    .join("\n\n");

  const systemPrompt = [
    buildSystemGuardrailPrompt(),
    `Response style for this user: ${modeInstruction}`,
    `${profileSummary}`,
    contextSnippets
      ? `Relevant background knowledge you may draw on (cite the [Source: ...] name when you use one):\n${contextSnippets}`
      : "No specific background knowledge matched this question — answer from general investing education principles.",
  ].join("\n\n");

  const messages = [
    { role: "system", content: systemPrompt },
    ...(history || []).slice(-8), // keep prompt small: last few turns only
    { role: "user", content: userMessage },
  ];

  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages,
    temperature: 0.4,
    max_tokens: 700,
  });

  const replyText = completion.choices[0]?.message?.content || "";

  const reasoning = {
    mode,
    modeInstruction,
    profileUsed: profile || null,
    sourcesConsidered: retrievedArticles.map((a) => ({ id: a.id, title: a.title, source: a.source })),
    note:
      "The reply above was generated using your selected experience mode, your saved profile (if any), " +
      "and any matching articles from the local knowledge base, combined into the instructions sent to the model.",
  };

  return { replyText, reasoning };
}

module.exports = { getChatCompletion };
