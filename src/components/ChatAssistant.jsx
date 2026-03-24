import { useEffect, useRef, useState } from "react";

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
    .replace(/\*\*(.*?)\*\*/g, "<strong class='chat-rich-strong'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<span class='chat-rich-code'>$1</span>")
    .replace(
      /(https?:\/\/[^\s<]+)/g,
      "<a href='$1' target='_blank' rel='noopener noreferrer' class='chat-rich-link'>$1</a>"
    )
    .replace(/\n/g, "<br/>");
}

const INITIAL_CHAT = [
  {
    sender: "bot",
    text: "Hello. I am Vikram's AI assistant.\n\nI can help with **skills**, **projects**, **education**, **resume**, and hiring-related questions.\n\nAsk anything about Vikram's profile.",
  },
];

export default function ChatAssistant({ onClose }) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const sendMessage = async (message) => {
    const text = (message || chatInput).trim();
    if (!text || isTyping) {
      return;
    }

    setChatInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);
    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newHistory,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        throw new Error(errorPayload?.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || "Sorry, I could not generate a response right now.";

      setHistory((prev) => [...prev, { role: "assistant", content: reply }]);
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "The assistant is temporarily unavailable. Please try again in a moment.",
        },
      ]);
    }

    setIsTyping(false);
  };

  return (
    <div className="chat-modal" role="dialog" aria-modal="true" aria-label="Vikram AI assistant">
      <div className="chat-window">
        <div className="chat-window__glow chat-window__glow--one" />
        <div className="chat-window__glow chat-window__glow--two" />

        <button type="button" onClick={onClose} className="chat-close">
          Close
        </button>

        <header className="chat-header">
          <div className="chat-avatar">VT</div>
          <div className="chat-header__copy">
            <h3>Vikram AI Assistant</h3>
            <p>Portfolio guide for recruiters, clients, and collaborators</p>
          </div>
          <div className="chat-status">
            <span />
            Online
          </div>
        </header>

        <div className="chat-quick-asks">
          {QUICK_ASKS.map((question) => (
            <button
              key={question}
              type="button"
              className="chat-chip"
              onClick={() => sendMessage(question)}
            >
              {question}
            </button>
          ))}
        </div>

        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div
              key={`${message.sender}-${index}`}
              className={
                message.sender === "user"
                  ? "chat-message-row chat-message-row--user"
                  : "chat-message-row"
              }
            >
              <div className={message.sender === "user" ? "chat-badge chat-badge--user" : "chat-badge"}>
                {message.sender === "user" ? "You" : "VT"}
              </div>

              <div
                className={
                  message.sender === "user"
                    ? "chat-bubble chat-bubble--user"
                    : "chat-bubble"
                }
                dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
              />
            </div>
          ))}

          {isTyping ? (
            <div className="chat-message-row">
              <div className="chat-badge">VT</div>
              <div className="chat-bubble chat-bubble--typing">
                <span className="chat-dot" />
                <span className="chat-dot" />
                <span className="chat-dot" />
              </div>
            </div>
          ) : null}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input-wrap">
          <div className="chat-input-shell">
            <textarea
              ref={textareaRef}
              value={chatInput}
              rows={1}
              placeholder="Ask about Vikram's work, skills, resume, or contact details..."
              onChange={(event) => {
                setChatInput(event.target.value);
                event.target.style.height = "auto";
                event.target.style.height = `${Math.min(event.target.scrollHeight, 120)}px`;
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              className="chat-textarea"
            />

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isTyping}
              className="chat-send"
            >
              Send
            </button>
          </div>

          <p className="chat-input-note">Press Enter to send. Use Shift + Enter for a new line.</p>
        </div>
      </div>
    </div>
  );
}
