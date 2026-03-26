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
              onClick={toggleVoiceInput}
              className={`chat-mic ${isListening ? "chat-mic--active" : ""}`}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
              title={isSpeechSupported ? "Use microphone" : "Mic permission only. Speech-to-text works best in Chrome or Edge."}
            >
              {isListening ? "Stop Mic" : isSpeechSupported ? "Mic" : "Enable Mic"}
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
            {isListening ? " Listening... speak now." : ""}
            {isTtsEnabled ? " Assistant voice is on." : ""}
            {!isSpeechSupported ? " Live speech-to-text depends on browser support." : ""}
          </p>
          {micError ? <p className="chat-input-error">{micError}</p> : null}
          {ttsError ? <p className="chat-input-error">{ttsError}</p> : null}
        </div>
      </div>
    </div>
  );
}
