import { useState, useRef, useEffect } from "react";

const VIKRAM_SYSTEM_PROMPT = `You are Vikram Thakur's personal AI portfolio assistant. Your job is to represent Vikram professionally to recruiters, companies, and visitors.

ABOUT VIKRAM:
- Full Name: Vikram Thakur
- Role: B.Tech CSE Student specializing in AI/ML & Data Science
- College: Swami Vivekananda Institute of Science and Technology, Kolkata, India
- Year: 2nd Year (Batch 2024–2028)
- CGPA: 7.89
- Passionate about building intelligent real-world applications

SKILLS:
- Languages: Python, C, HTML & CSS
- AI/ML & Data Science: Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, NLP, TF-IDF, Naive Bayes, Data Science
- Frameworks: Flask
- Tools: Git & GitHub, VS Code, Vercel, Render

PROJECTS:
1. Spam Detection Web App
   - Tech: Python, Flask, Scikit-learn, Render
   - Built a full-stack Flask web app with real-time ML spam detection
   - Uses Naive Bayes classifier & TF-IDF vectorization
   - Live: https://spam-flask-app-3.onrender.com

2. Insurance Cost Predictor
   - Tech: Python, Scikit-learn, Linear Regression, Render
   - Predicts medical insurance charges from user data
   - Applied feature engineering and regression techniques
   - Live: https://insurance-predictor-2-omxp.onrender.com

3. Personal Portfolio Website
   - Tech: HTML, CSS, Vercel
   - Designed and developed with modern UI
   - Deployed on Vercel with CI/CD via GitHub
   - Live: https://vikram-portfolio-teal.vercel.app

RESUME:
- View/Download: https://vikram-portfolio-teal.vercel.app/Vikram_Thakur_Resume.pdf
- Always provide this link when someone asks for resume or CV.

CONTACT:
- Email: vt594925@gmail.com
- Phone: +91 9748293212
- GitHub: https://github.com/vikram-101
- LinkedIn: https://linkedin.com/in/vikram-thakur
- Portfolio: https://vikram-portfolio-teal.vercel.app
- Location: Kolkata, India

RESPONSE STYLE:
- Be professional, concise, and enthusiastic about Vikram's work
- Highlight strengths: young talent, hands-on ML projects, deployed real apps
- For hiring questions, emphasize practical experience and eagerness to learn
- Keep answers focused and impressive — this is for companies/recruiters
- If asked something outside this data, suggest contacting Vikram directly`;

const INITIAL_CHAT = [
  { sender: "bot", text: "Hey there! 👋 I'm Vikram's AI assistant.\n\nI can tell you all about **Vikram Thakur** — his skills, projects, education, and why he'd be a great fit for your team.\n\nFeel free to ask me anything!" },
];

const QUICK_ASKS = [
  "Tell me about Vikram",
  "What are his skills?",
  "Show me his projects",
  "What is his education?",
  "How can I contact Vikram?",
  "Why should we hire Vikram?",
  "Share his resume",
];

function formatText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong style='color:#00e5ff'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<span style='background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.2);padding:1px 6px;border-radius:4px;font-family:monospace;font-size:0.82rem;color:#00e5ff'>$1</span>")
    .replace(/(https?:\/\/[^\s<]+)/g, "<a href='$1' target='_blank' rel='noopener noreferrer' style='color:#00e5ff;text-decoration:underline'>$1</a>")
    .replace(/\n/g, "<br/>");
}

export default function ChatAssistant({ onClose }) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const sendMessage = async (message) => {
    const text = (message || chatInput).trim();
    if (!text || isTyping) return;

    setChatInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const userMsg = { sender: "user", text };
    setChatMessages((prev) => [...prev, userMsg]);

    const newHistory = [...conversationHistory, { role: "user", content: text }];
    setConversationHistory(newHistory);
    setIsTyping(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          max_tokens: 1000,
          messages: [
            { role: "system", content: VIKRAM_SYSTEM_PROMPT },
            ...newHistory,
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response right now. Please try again!";

      setConversationHistory((prev) => [...prev, { role: "assistant", content: reply }]);
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      setChatMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Something went wrong. Please try again." }]);
    }

    setIsTyping(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 210, display: "flex", justifyContent: "center", alignItems: "center", backdropFilter: "blur(4px)" }}>
      <div style={{ width: "min(980px, 96vw)", height: "min(760px, 90vh)", background: "#080b10", borderRadius: "20px", boxShadow: "0 0 80px rgba(0,229,255,0.1), 0 0 40px rgba(0,0,0,0.6)", position: "relative", overflow: "hidden", border: "1px solid rgba(0,229,255,0.12)", display: "flex", flexDirection: "column" }}>

        {/* Close button */}
        <button onClick={onClose} style={{ position: "absolute", top: "12px", right: "12px", zIndex: 220, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.08)", color: "#fff", padding: "6px 14px", borderRadius: "8px", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem", transition: "background 0.2s" }}
          onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.15)"}
          onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}>
          ✕ Close
        </button>

        {/* Header */}
        <header style={{ padding: "14px 18px", borderBottom: "1px solid rgba(30,39,48,0.85)", background: "rgba(8,11,16,0.9)", display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "linear-gradient(135deg, #00e5ff, #7b61ff)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Mono, monospace", fontWeight: 700, color: "#000", fontSize: "14px", boxShadow: "0 0 16px rgba(0,229,255,0.3)", flexShrink: 0 }}>VT</div>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#e8edf2" }}>Vikram AI Assistant</div>
            <div style={{ fontSize: "0.72rem", color: "#00e5ff", fontFamily: "Space Mono, monospace", letterSpacing: "0.5px" }}>Powered by Claude AI · Ask anything</div>
          </div>
          <div style={{ marginLeft: "auto", width: "8px", height: "8px", background: "#00ff9d", borderRadius: "50%", boxShadow: "0 0 8px #00ff9d", animation: "pulse 2s ease-in-out infinite", marginRight: "48px" }} />
        </header>

        {/* Quick asks */}
        <div style={{ padding: "10px 14px", display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none", borderBottom: "1px solid rgba(30,39,48,0.5)", flexShrink: 0 }}>
          {QUICK_ASKS.map((q) => (
            <button key={q} onClick={() => sendMessage(q)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(30,39,48,0.9)", background: "#141920", color: "#8aa8c5", fontSize: "0.75rem", cursor: "pointer", fontFamily: "Space Mono, monospace", whiteSpace: "nowrap", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.borderColor = "#00e5ff"; e.target.style.color = "#00e5ff"; e.target.style.background = "rgba(0,229,255,0.05)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(30,39,48,0.9)"; e.target.style.color = "#8aa8c5"; e.target.style.background = "#141920"; }}>
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 16px", display: "flex", flexDirection: "column", gap: "14px", scrollbarWidth: "thin", scrollbarColor: "#1e2730 transparent" }}>
          {chatMessages.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignSelf: m.sender === "user" ? "flex-end" : "flex-start", flexDirection: m.sender === "user" ? "row-reverse" : "row", maxWidth: "82%", animation: "msgIn 0.3s ease" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: m.sender === "bot" ? "linear-gradient(135deg,#00e5ff,#7b61ff)" : "linear-gradient(135deg,#7b61ff,#ff61d8)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "11px", fontWeight: 700, color: m.sender === "bot" ? "#000" : "#fff", flexShrink: 0, marginTop: "2px", fontFamily: "Space Mono, monospace" }}>
                {m.sender === "bot" ? "VT" : "U"}
              </div>
              <div style={{ background: m.sender === "bot" ? "#0f1a14" : "#151d2a", border: `1px solid ${m.sender === "bot" ? "rgba(0,229,255,0.12)" : "rgba(123,97,255,0.2)"}`, borderRadius: "16px", padding: "11px 15px", color: "#e8edf2", fontSize: "0.88rem", lineHeight: 1.65, borderTopLeftRadius: m.sender === "bot" ? "4px" : "16px", borderTopRightRadius: m.sender === "user" ? "4px" : "16px" }}
                dangerouslySetInnerHTML={{ __html: formatText(m.text) }} />
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: "flex", gap: "10px", alignSelf: "flex-start", maxWidth: "82%" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#00e5ff,#7b61ff)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "11px", fontWeight: 700, color: "#000", flexShrink: 0, fontFamily: "Space Mono, monospace" }}>VT</div>
              <div style={{ background: "#0f1a14", border: "1px solid rgba(0,229,255,0.12)", borderRadius: "16px", borderTopLeftRadius: "4px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "5px" }}>
                {[0, 0.2, 0.4].map((delay, i) => (
                  <span key={i} style={{ width: "6px", height: "6px", background: "#00e5ff", borderRadius: "50%", display: "inline-block", animation: `typingDot 1.2s ease-in-out ${delay}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <div style={{ padding: "12px 14px", background: "rgba(8,11,16,0.95)", borderTop: "1px solid rgba(30,39,48,0.8)", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "flex-end", background: "#141920", border: "1px solid rgba(30,39,48,0.9)", borderRadius: "14px", padding: "10px 14px", transition: "border-color 0.2s" }}
            onFocus={e => e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)"}
            onBlur={e => e.currentTarget.style.borderColor = "rgba(30,39,48,0.9)"}>
            <textarea
              ref={textareaRef}
              value={chatInput}
              onChange={(e) => {
                setChatInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 110) + "px";
              }}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              rows={1}
              placeholder="Ask me anything about Vikram..."
              style={{ flex: 1, minHeight: "22px", maxHeight: "110px", resize: "none", background: "transparent", border: "none", color: "#e8edf2", outline: "none", fontSize: "0.9rem", fontFamily: "Syne, sans-serif", lineHeight: 1.5 }}
            />
            <button onClick={() => sendMessage()} disabled={isTyping}
              style={{ width: "36px", height: "36px", borderRadius: "10px", border: "none", background: isTyping ? "rgba(0,229,255,0.3)" : "linear-gradient(135deg,#00e5ff,#7b61ff)", cursor: isTyping ? "not-allowed" : "pointer", boxShadow: "0 0 16px rgba(0,229,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "16px", transition: "all 0.2s" }}>
              <span style={{ color: "#000", fontWeight: 900 }}>→</span>
            </button>
          </div>
          <div style={{ fontSize: "10px", color: "#5a6a7a", textAlign: "center", marginTop: "7px", fontFamily: "Space Mono, monospace" }}>
            Press Enter to send · Shift+Enter for newline
          </div>
        </div>

        <style>{`
          @keyframes typingDot { 0%,60%,100%{transform:translateY(0);opacity:0.4;} 30%{transform:translateY(-5px);opacity:1;} }
          @keyframes msgIn { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }
          @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(0.8);} }
        `}</style>
      </div>
    </div>
  );
}
