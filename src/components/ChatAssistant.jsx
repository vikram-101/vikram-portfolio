import { useEffect, useRef, useState } from "react";

const QUICK_ASKS = [
  "Give me a quick profile summary",
  "What makes Vikram hireable?",
  "Show the strongest projects",
  "Summarize his core skills",
  "What is his education background?",
  "How can I contact him?",
  "Share resume details",
];

function formatText(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong class='chat-rich-strong'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<span class='chat-rich-code'>$1</span>")
    .replace(
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
      "<a href='mailto:$&' class='chat-rich-link'>$&</a>"
    )
    .replace(
      /(^|[\s>])((\/[A-Za-z0-9._/-]+\.pdf))/g,
      "$1<a href='$2' target='_blank' rel='noopener noreferrer' class='chat-rich-link'>$2</a>"
    )
    .replace(
      /(https?:\/\/[^\s<]+)/g,
      "<a href='$1' target='_blank' rel='noopener noreferrer' class='chat-rich-link'>$1</a>"
    )
    .replace(/\n/g, "<br/>");
}

const INITIAL_CHAT = [
  {
    sender: "bot",
    text: "Welcome. I am **Vikram's portfolio assistant**.\n\nI can help you review his **skills**, **projects**, **education**, **resume**, and overall **hiring fit**.\n\nYou can ask for a quick summary, strongest projects, or the best way to contact him.",
  },
];

const SMART_REPLIES = [
  {
    match: ["quick profile summary", "about vikram", "profile summary", "introduce vikram"],
    reply:
      "**Vikram Thakur** is a Computer Science student focused on **AI and machine learning**.\n\nHis profile is built around practical ML systems, NLP, computer vision, and deployment-ready project work. A strong part of his portfolio is that he not only builds technical projects, but also presents them in a clear and professional way for recruiters and clients.",
  },
  {
    match: ["hireable", "why should we hire", "why hire", "hiring fit"],
    reply:
      "**Why Vikram is a strong hire:**\n\n- He works across **ML, NLP, computer vision, and Python**.\n- He builds projects that are not only technical, but also **usable and presentation-ready**.\n- His portfolio shows a strong focus on **clear delivery, deployment, and professional communication**.",
  },
  {
    match: ["strongest projects", "best projects", "show projects", "projects"],
    reply:
      "**Strongest visible projects:**\n\n- **Insurance Cost Predictor**: a machine-learning web app that predicts insurance charges and shows Vikram's ability to turn tabular ML into a usable product experience.\n- **Emotion Detector**: a real-time facial emotion recognition project that reflects hands-on computer vision work.\n- **Sentiment Analyzer**: an NLP workflow using BERT for text classification.\n- **Spam Message Detector**: a Flask-based classification app showing applied ML delivery.\n\nUseful links:\n- Insurance Predictor Demo: https://insurance-predictor-2-omxp.onrender.com/\n- Insurance Predictor GitHub: https://github.com/vikram-101/insurance-predictor\n- Spam Detector Demo: https://spam-flask-app-3.onrender.com",
  },
  {
    match: ["core skills", "skills", "technical strengths"],
    reply:
      "**Core skills:**\n\nVikram's strengths are centered on **Machine Learning, Deep Learning, NLP, Computer Vision, and Python-based development**.\n\nHe is comfortable with model evaluation, transformer-based text workflows, computer vision pipelines, and deployment-oriented project building. His portfolio also shows an ability to present technical work cleanly, which is valuable in both internships and client-facing environments.",
  },
  {
    match: ["education", "education background", "study"],
    reply:
      "**Education summary:**\n\nVikram is a **Computer Science student** specializing in **Artificial Intelligence and Machine Learning**.\n\nHis academic direction is closely aligned with the kind of work shown in the portfolio, especially across machine learning systems, NLP, computer vision, and practical project development.",
  },
  {
    match: ["contact", "email", "reach", "hire him"],
    reply:
      "**Best ways to contact Vikram:**\n\nFor direct communication, email is the fastest option, and GitHub is useful if you want to review his technical work first.\n\n- Email: vt594925@gmail.com\n- GitHub: https://github.com/vikram-101",
  },
  {
    match: ["resume", "share resume", "resume details"],
    reply:
      "**About Vikram's resume:**\n\nHis resume gives a compact overview of his **education, technical skills, project experience, and AI/ML focus areas**. It is useful when you want a quick hiring summary without browsing the full portfolio.\n\nView Resume: /resume.html\nDownload Resume: /Vikram_Thakur_Resume.pdf",
  },
];

function getSmartReply(input) {
  const normalized = input.toLowerCase();
  const match = SMART_REPLIES.find((item) => item.match.some((term) => normalized.includes(term)));
  return match ? match.reply : null;
}

export default function ChatAssistant({ onClose }) {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isTtsSupported, setIsTtsSupported] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);
  const [ttsError, setTtsError] = useState("");
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechLangRef = useRef("en-IN");
  const listenBaseInputRef = useRef("");
  const transcriptRef = useRef("");
  const latestInputRef = useRef("");

  const resizeTextarea = () => {
    if (!textareaRef.current) {
      return;
    }
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  useEffect(() => {
    latestInputRef.current = chatInput;
  }, [chatInput]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    speechLangRef.current = window.navigator?.language || "en-IN";
    setIsTtsSupported(Boolean(window.speechSynthesis && window.SpeechSynthesisUtterance));
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const speakReply = (text) => {
    if (!isTtsEnabled || !isTtsSupported || typeof window === "undefined") {
      return;
    }

    const cleanedText = text.replace(/[*`#_]/g, "").replace(/\s+/g, " ").trim();
    if (!cleanedText) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(cleanedText);
      const voices = window.speechSynthesis.getVoices?.() || [];
      const preferredVoice =
        voices.find((voice) => voice.lang === speechLangRef.current) ||
        voices.find((voice) => voice.lang?.startsWith("en")) ||
        voices.find((voice) => voice.lang?.startsWith("hi")) ||
        null;
      utterance.lang = preferredVoice?.lang || speechLangRef.current;
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onstart = () => setTtsError("");
      utterance.onerror = () => setTtsError("Voice output failed. Try Chrome/Edge.");
      window.speechSynthesis.speak(utterance);
    } catch {
      setTtsError("Voice output is not available in this browser.");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSpeechSupported(false);
      return undefined;
    }

    setIsSpeechSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = speechLangRef.current;

    recognition.onstart = () => {
      setIsListening(true);
      setMicError("");
      listenBaseInputRef.current = latestInputRef.current.trim();
      transcriptRef.current = "";
    };

    recognition.onresult = (event) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i += 1) {
        fullTranscript += event.results[i][0].transcript;
      }

      transcriptRef.current = fullTranscript.trim();
      const mergedInput = [listenBaseInputRef.current, transcriptRef.current].filter(Boolean).join(" ").trim();
      setChatInput(mergedInput);
      requestAnimationFrame(resizeTextarea);
    };

    recognition.onerror = (event) => {
      const messageMap = {
        "not-allowed": "Microphone permission denied. Allow mic access in browser settings.",
        "service-not-allowed": "Speech service is blocked by the browser.",
        "audio-capture": "No microphone detected. Check your audio input device.",
        network: "Speech recognition network error. Please try again.",
      };
      setMicError(messageMap[event.error] || "Unable to capture voice. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onstart = null;
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const requestMicrophonePermission = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicError("This browser does not support microphone permissions.");
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      setMicError("Mic access blocked. Please allow microphone access and try again.");
      return false;
    }
  };

  const toggleVoiceInput = async () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      const permissionGranted = await requestMicrophonePermission();
      if (!permissionGranted) {
        return;
      }
      setMicError("Mic access granted, but live speech-to-text works in Chrome/Edge.");
      return;
    }

    if (isListening) {
      recognition.stop();
      return;
    }

    setMicError("");
    const permissionGranted = await requestMicrophonePermission();
    if (!permissionGranted) {
      return;
    }

    try {
      recognition.start();
    } catch {
      setMicError("Mic is already active. Please wait and try again.");
    }
  };

  const sendMessage = async (message) => {
    const text = (message || chatInput).trim();
    if (!text || isTyping) {
      return;
    }

    setChatInput("");
    resizeTextarea();

    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);
    setChatMessages((prev) => [...prev, { sender: "user", text }]);

    const smartReply = getSmartReply(text);
    if (smartReply) {
      setIsTyping(true);
      window.setTimeout(() => {
        setHistory((prev) => [...prev, { role: "assistant", content: smartReply }]);
        setChatMessages((prev) => [...prev, { sender: "bot", text: smartReply }]);
        speakReply(smartReply);
        setIsTyping(false);
      }, 350);
      return;
    }

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
        if (response.status === 404) {
          throw new Error("API route not found. Run with `vercel dev` for local /api/chat support.");
        }
        throw new Error(errorPayload?.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || "Sorry, I could not generate a response right now.";

      setHistory((prev) => [...prev, { role: "assistant", content: reply }]);
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
      speakReply(reply);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            error instanceof Error
              ? `Chat error: ${error.message}`
              : "The assistant is temporarily unavailable. Please try again in a moment.",
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

        <header className="chat-header">
          <div className="chat-header__main">
            <div className="chat-avatar">VT</div>
            <div className="chat-header__copy">
              <h3>Vikram Portfolio Assistant</h3>
              <p>Professional guide for recruiters, clients, and collaborators</p>
            </div>
          </div>

          <div className="chat-header__actions">
            <div className="chat-status">
              <span />
              Available
            </div>
            <button type="button" onClick={onClose} className="chat-close">
              Close
            </button>
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
          <div className="chat-intro-card">
            <span className="chat-intro-card__label">Portfolio Concierge</span>
            <p>
              Ask for a summary, strongest projects, resume details, skills, education, or hiring fit.
            </p>
          </div>

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
              placeholder="Ask about projects, technical strengths, resume, education, or hiring fit..."
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
              onClick={toggleVoiceInput}
              className={`chat-mic ${isListening ? "chat-mic--active" : ""}`}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
              title={isSpeechSupported ? "Use microphone" : "Mic permission only. Speech-to-text works best in Chrome or Edge."}
            >
              {isListening ? "Stop Mic" : isSpeechSupported ? "Voice Input" : "Enable Mic"}
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isTtsSupported) {
                  setTtsError("Voice output works best in Chrome/Edge.");
                  return;
                }
                if (isTtsEnabled) {
                  window.speechSynthesis?.cancel();
                }
                setTtsError("");
                setIsTtsEnabled((prev) => !prev);
              }}
              className={`chat-tts ${isTtsEnabled ? "chat-tts--active" : ""}`}
              aria-label={isTtsEnabled ? "Disable voice output" : "Enable voice output"}
              title={isTtsEnabled ? "Voice output on" : "Voice output off"}
            >
              {isTtsEnabled ? "Voice On" : "Voice Off"}
            </button>

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={isTyping}
              className="chat-send"
            >
              Send
            </button>
          </div>

          <p className="chat-input-note">
            Press Enter to send. Use Shift + Enter for a new line.
            {isListening ? " Voice capture is active." : ""}
            {isTtsEnabled ? " Assistant voice reply is enabled." : ""}
            {!isSpeechSupported ? " Live speech-to-text depends on browser support." : ""}
          </p>
          {micError ? <p className="chat-input-error">{micError}</p> : null}
          {ttsError ? <p className="chat-input-error">{ttsError}</p> : null}
        </div>
      </div>
    </div>
  );
}
