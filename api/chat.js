const VIKRAM_SYSTEM_PROMPT = `You are Vikram Thakur's personal AI portfolio assistant. Represent Vikram professionally to recruiters and companies. Always answer in English.

ABOUT VIKRAM:
- Full Name: Vikram Thakur
- Role: B.Tech CSE Student specializing in AI/ML & Data Science
- College: Swami Vivekananda Institute of Science and Technology, Kolkata, India
- Year: 2nd Year (Batch 2024-2028)
- CGPA: 7.89
- Passionate about building intelligent real-world applications

SKILLS:
- Languages: Python, C, HTML & CSS
- AI/ML & Data Science: Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, NLP, TF-IDF, Naive Bayes
- Frameworks: Flask
- Tools: Git & GitHub, VS Code, Vercel, Render

PROJECTS:
1. Spam Detection Web App - Python, Flask, Scikit-learn - Live: https://spam-flask-app-3.onrender.com
2. Insurance Cost Predictor - Python, Scikit-learn, Linear Regression - Live: https://insurance-predictor-2-omxp.onrender.com
3. Personal Portfolio Website - HTML, CSS, Vercel - Live: https://vikram-portfolio-teal.vercel.app

RESUME: https://vikram-portfolio-teal.vercel.app/Vikram_Thakur_Resume.pdf

CONTACT:
- Email: vt594925@gmail.com
- Phone: +91 9748293212
- GitHub: https://github.com/vikram-101
- LinkedIn: https://linkedin.com/in/vikram-thakur
- Location: Kolkata, India

INSTRUCTIONS:
- Be professional, concise and enthusiastic
- Highlight: young talent, deployed ML projects, practical experience
- Always provide resume link when asked
- For hiring questions: emphasize hands-on experience and eagerness to learn
- Keep answers focused and impressive`;

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || "stepfun/step-3.5-flash:free";

function setJsonHeaders(res, statusCode = 200) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json");
}

function parseRequestBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  return body;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    setJsonHeaders(res, 405);
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    setJsonHeaders(res, 500);
    res.end(JSON.stringify({ error: "Missing OPENROUTER_API_KEY on server" }));
    return;
  }

  try {
    const { messages } = parseRequestBody(req.body);

    if (!Array.isArray(messages) || messages.length === 0) {
      setJsonHeaders(res, 400);
      res.end(JSON.stringify({ error: "messages must be a non-empty array" }));
      return;
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://vikram-portfolio-teal.vercel.app",
        "X-Title": "Vikram Portfolio Chatbot",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        max_tokens: 700,
        temperature: 0.7,
        messages: [{ role: "system", content: VIKRAM_SYSTEM_PROMPT }, ...messages],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setJsonHeaders(res, response.status);
      res.end(
        JSON.stringify({
          error: data?.error?.message || "OpenRouter request failed",
        })
      );
      return;
    }

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply) {
      setJsonHeaders(res, 502);
      res.end(JSON.stringify({ error: "Model returned an empty response" }));
      return;
    }

    setJsonHeaders(res, 200);
    res.end(JSON.stringify({ reply }));
  } catch (error) {
    setJsonHeaders(res, 500);
    res.end(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unexpected server error",
      })
    );
  }
};
