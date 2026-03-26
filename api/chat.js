const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are Vikram Thakur's portfolio assistant.

Your job:
- Answer only questions about Vikram Thakur's profile, projects, skills, education, resume, contact details, and hiring fit.
- Be concise, helpful, and recruiter-friendly.
- If the question is unrelated, politely redirect the user back to Vikram's portfolio.
- If a detail is unknown, say so clearly instead of inventing it.

Portfolio facts:
- Name: Vikram Thakur
- Role: AI / ML Engineer, Computer Science student
- Focus: practical AI systems, machine learning applications, deployment-ready products
- Core areas: Machine Learning, Deep Learning, NLP, Computer Vision, Python, Data Science, MLOps basics
- Contact email: vt594925@gmail.com
- GitHub: https://github.com/vikram-101
- LinkedIn: https://linkedin.com/in/vikram-thakur
- Location: India

Projects:
1. Insurance Cost Predictor: ML + Streamlit app predicting insurance charges.
2. Emotion Detector: real-time facial emotion recognition using FER-2013.
3. Sentiment Analyzer: tweet sentiment classification workflow with BERT.
4. Customer Support Chatbot: AI chatbot for intent recognition and response generation.
5. Image Classification App: pretrained CNN-based image classifier with web UI.
6. Spam Message Detector: Flask-based spam/ham classifier.

Behavior:
- Prefer short paragraphs or bullets.
- Mention links only when relevant.
- If asked to contact or hire Vikram, point to the email and LinkedIn.
- You may answer in Hindi or English, matching the user's language.`;

function getAllowedOrigin(req) {
  return req.headers.origin || "http://localhost:3000";
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", getAllowedOrigin(req));
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.OPENROUTER_MODEL || "stepfun/step-3.5-flash:free";

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing OPENROUTER_API_KEY on the server.",
    });
  }

  const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const sanitizedMessages = messages
    .filter((message) => {
      const role = message?.role;
      const content = message?.content;
      return ["user", "assistant"].includes(role) && typeof content === "string" && content.trim();
    })
    .slice(-12);

  if (!sanitizedMessages.length) {
    return res.status(400).json({ error: "At least one user message is required." });
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vikram-portfolio.local",
        "X-Title": "Vikram Portfolio Assistant",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitizedMessages],
        temperature: 0.7,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const upstreamError =
        data?.error?.message || data?.error || `Upstream API error: ${response.status}`;
      return res.status(response.status).json({ error: upstreamError });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return res.status(502).json({ error: "Model returned an empty response." });
    }

    return res.status(200).json({ reply, model });
  } catch (error) {
    return res.status(500).json({
      error: error instanceof Error ? error.message : "Unexpected server error.",
    });
  }
};
