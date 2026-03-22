import { useState, useEffect } from "react";

const skills = [
  { icon: "🧠", name: "Machine Learning", desc: "Supervised & unsupervised learning, ensemble methods, feature engineering.", tags: ["Scikit-learn", "XGBoost", "Feature Eng."], color: "#9333ea" },
  { icon: "🔥", name: "Deep Learning", desc: "CNNs, RNNs, Transformers — trained on real-world datasets.", tags: ["PyTorch", "TensorFlow", "Keras"], color: "#ec4899" },
  { icon: "💬", name: "NLP", desc: "Text embeddings, sentiment analysis, fine-tuned language models.", tags: ["BERT", "HuggingFace", "NLTK"], color: "#06b6d4" },
  { icon: "👁️", name: "Computer Vision", desc: "Image classification, object detection, real-time inference.", tags: ["OpenCV", "YOLO", "CNN"], color: "#10b981" },
  { icon: "🐍", name: "Python & Data", desc: "NumPy, Pandas, Matplotlib — the full data science stack.", tags: ["NumPy", "Pandas", "Plotly"], color: "#f59e0b" },
  { icon: "📊", name: "MLOps Basics", desc: "Experiment tracking, model versioning, Streamlit deployments.", tags: ["MLflow", "Streamlit", "Git"], color: "#a855f7" },
];

const projects = [
  { num: "01", name: "Insurance Cost Predictor", badges: ["Machine Learning", "Streamlit"], desc: "ML-powered web app that predicts insurance charges based on age, BMI, smoking habits & region. Built with Scikit-learn & deployed on Render.", colors: ["#9333ea", "#ec4899"], github: "https://github.com/vikram-101/insurance-predictor", demo: "https://insurance-predictor-2-omxp.onrender.com/" },
  { num: "02", name: "Emotion Detector", badges: ["Computer Vision", "Deep Learning"], desc: "Real-time facial emotion recognition using CNN trained on FER-2013. Detects 7 emotions live via webcam with 85%+ accuracy.", colors: ["#06b6d4", "#9333ea"], github: "", demo: "" },
  { num: "03", name: "Sentiment Analyzer", badges: ["NLP", "BERT"], desc: "Fine-tuned BERT on 50K tweets to classify sentiment. Clean Streamlit dashboard for live inference.", colors: ["#10b981", "#06b6d4"], github: "", demo: "" },
  { num: "04", name: "Chatbot for Customer Support", badges: ["NLP", "Streamlit"], desc: "AI-powered chatbot using BERT for intent recognition and response generation. Deployed on Streamlit for real-time interactions.", colors: ["#10b981", "#06b6d4"], github: "", demo: "" },
  { num: "05", name: "Image Classification App", badges: ["Computer Vision", "Flask"], desc: "Web app for classifying images using pre-trained CNN models. Built with Flask and deployed on Heroku.", colors: ["#f59e0b", "#ec4899"], github: "", demo: "" },
  { num: "06", name: "Spam Message Detector", badges: ["NLP", "Flask"], desc: "AI-powered spam detection web app built with Flask. Classifies messages as spam or ham using machine learning models.", colors: ["#06b6d4", "#10b981"], github: "", demo: "https://spam-flask-app-3.onrender.com" },
];

export default function Portfolio() {
  const [visible, setVisible] = useState({});
  const [activeNav, setActiveNav] = useState("hero");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(v => ({ ...v, [e.target.dataset.id]: true }));
          if (e.target.id) setActiveNav(e.target.id);
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-id]").forEach(el => obs.observe(el));
    document.querySelectorAll("section[id]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const fade = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0px)" : "translateY(24px)",
    transition: `opacity 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1), transform 0.8s ${delay}s cubic-bezier(0.16,1,0.3,1)`,
  });

  return (
    <div style={{ background: "#060609", color: "#e8eaf0", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>
        {`
          @media (max-width: 768px) {
            nav {
              padding: 0 1rem !important;
              height: 50px !important;
            }
            nav > div:first-child {
              font-size: 0.9rem !important;
            }
            nav > div:nth-child(2) {
              display: none !important;
            }
            nav > a {
              font-size: 0.7rem !important;
              padding: 0.35rem 0.9rem !important;
            }
          }
          @media (max-width: 480px) {
            nav > a {
              font-size: 0.65rem !important;
              padding: 0.3rem 0.7rem !important;
            }
          }
          @media (max-width: 1024px) {
            #about > div {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
            #about > div > div:first-child {
              text-align: center !important;
            }
            #about > div > div:first-child h2 {
              font-size: 2rem !important;
            }
          }
        `}
      </style>

      {/* BG glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(147,51,234,0.07) 0%, transparent 70%)", top: -200, left: -150 }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)", bottom: 100, right: -100 }} />
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "58px", padding: "0 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(6,6,9,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", letterSpacing: "0.3px" }}>
          Vikram<span style={{ color: "#9333ea" }}>.</span>
        </div>
        <div style={{ display: "flex", gap: "0.2rem" }}>
          {[["About","about"],["Resume","resume"],["Skills","skills"],["Work","work"],["Contact","contact"]].map(([l,id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ fontSize: "0.8rem", fontWeight: 500, color: activeNav === id ? "#fff" : "rgba(232,234,240,0.4)", background: "transparent", border: "none", padding: "0.45rem 0.9rem", borderRadius: "7px", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color="#fff"}
              onMouseLeave={e => e.target.style.color = activeNav===id ? "#fff" : "rgba(232,234,240,0.4)"}>
              {l}
            </button>
          ))}
        </div>
        <a href="mailto:vt594925@gmail.com" style={{ fontSize: "0.78rem", fontWeight: 600, color: "#fff", background: "#7c3aed", padding: "0.45rem 1.1rem", borderRadius: "8px", textDecoration: "none" }}>
          Hire Me
        </a>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "7rem 2rem 4rem", textAlign: "center" }}>
        <div data-id="h1" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(147,51,234,0.1)", border: "1px solid rgba(147,51,234,0.2)", borderRadius: "100px", padding: "0.38rem 1rem", fontSize: "0.72rem", color: "rgba(232,234,240,0.55)", marginBottom: "2.5rem", ...fade("h1") }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", display: "inline-block" }} />
          Open to Internships &amp; Collaborations
        </div>

        <div data-id="h2" style={{ ...fade("h2", 0.1) }}>
          <h1 style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-3px", color: "#fff", marginBottom: "1.2rem" }}>
            Hi, I'm{" "}
            <span style={{ background: "linear-gradient(135deg, #9333ea, #ec4899, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Vikram</span>
          </h1>
        </div>

        <div data-id="h3" style={{ ...fade("h3", 0.2) }}>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: "rgba(232,234,240,0.45)", marginBottom: "1.5rem" }}>
            AI / ML Engineer &nbsp;·&nbsp; Building Intelligent Systems
          </p>
        </div>

        <div data-id="h4" style={{ ...fade("h4", 0.3) }}>
          <p style={{ maxWidth: 500, fontSize: "1rem", color: "rgba(232,234,240,0.38)", lineHeight: 1.8, marginBottom: "2.8rem" }}>
            I transform raw data into intelligent systems. Passionate about machine learning, deep neural networks, and building products that actually work.
          </p>
        </div>

        <div data-id="h5" style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "5rem", ...fade("h5", 0.4) }}>
          <button onClick={() => scrollTo("work")} style={{ fontSize: "0.88rem", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #9333ea, #7c3aed)", border: "none", padding: "0.85rem 2.2rem", borderRadius: "10px", cursor: "pointer", boxShadow: "0 8px 30px rgba(147,51,234,0.3)" }}>
            View Projects →
          </button>
          <button onClick={() => scrollTo("contact")} style={{ fontSize: "0.88rem", fontWeight: 500, color: "rgba(232,234,240,0.65)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.85rem 2.2rem", borderRadius: "10px", cursor: "pointer" }}>
            Contact Me
          </button>
        </div>

        <div data-id="h6" style={{ display: "flex", gap: "4rem", flexWrap: "wrap", justifyContent: "center", paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", ...fade("h6", 0.5) }}>
          {[["10+","Projects"],["5+","Frameworks"],["3+","AI Domains"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#fff" }}>{n}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(232,234,240,0.3)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "0.3rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", maxWidth: 880, margin: "0 auto" }} />

      {/* ABOUT */}
      <section id="about" style={{ position: "relative", zIndex: 1, padding: "6rem 2rem", display: "flex", justifyContent: "center", background: "linear-gradient(135deg, rgba(6,6,9,0.98) 0%, rgba(10,10,15,0.98) 100%)" }}>
        <div style={{ maxWidth: 1200, width: "100%", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "5rem", alignItems: "start" }}>
          <div data-id="ab1" style={{ ...fade("ab1") }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#9333ea", marginBottom: "1rem", fontWeight: 600 }}>About Me</div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-1px", color: "#fff", marginBottom: "2rem", lineHeight: 1.1 }}>
              Turning Data into<br />
              <span style={{ background: "linear-gradient(135deg,#9333ea,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Intelligence</span>
            </h2>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "2rem", marginBottom: "2rem" }}>
              <p style={{ color: "rgba(232,234,240,0.7)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "1.5rem" }}>
                I am Vikram Thakur, a dedicated Computer Science student specializing in Artificial Intelligence and Machine Learning. With a strong foundation in data-driven technologies, I focus on developing practical solutions through hands-on projects and continuous learning.
              </p>
              <p style={{ color: "rgba(232,234,240,0.7)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "2rem" }}>
                My expertise spans machine learning algorithms, deep learning architectures, and real-world applications including predictive modeling, computer vision, and natural language processing. I have successfully deployed multiple AI-powered applications, demonstrating proficiency in modern frameworks and deployment strategies.
              </p>
            </div>
            <div style={{ padding: "1.5rem 2rem", borderLeft: "3px solid #7c3aed", background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(147,51,234,0.05))", borderRadius: "0 12px 12px 0", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(232,234,240,0.6)", fontWeight: 500 }}>
              "Innovation through data: Transforming complex problems into intelligent, scalable solutions."
            </div>
          </div>

          <div data-id="ab2" style={{ ...fade("ab2", 0.15) }}>
            <div style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "24px", overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" }}>
              <div style={{ padding: "2.5rem 2.5rem 2rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#9333ea,#ec4899,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", margin: "0 auto 1.5rem", boxShadow: "0 8px 24px rgba(147,51,234,0.3)" }}>👨‍💻</div>
                <div style={{ fontWeight: 700, fontSize: "1.3rem", color: "#fff", marginBottom: "0.5rem" }}>Vikram Thakur</div>
                <div style={{ fontSize: "0.9rem", color: "rgba(232,234,240,0.6)", fontWeight: 500 }}>AI / ML Engineer</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(232,234,240,0.4)", marginTop: "0.5rem" }}>Computer Science Student</div>
              </div>
              
              <div style={{ padding: "0" }}>
                <div style={{ padding: "1.5rem 2.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#9333ea", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Contact</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      ["📧","vt594925@gmail.com"],
                      ["🐙","github.com/vikram-101"],
                      ["💼","linkedin.com/in/vikram-thakur"],
                      ["📍","India"]
                    ].map(([icon,text]) => (
                      <div key={text} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontSize: "1.2rem", opacity: 0.8 }}>{icon}</span>
                        <span style={{ fontSize: "0.85rem", color: "rgba(232,234,240,0.7)", fontWeight: 400 }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{ padding: "1.5rem 2.5rem" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#9333ea", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>Expertise</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                    {["Machine Learning","Deep Learning","Computer Vision","NLP","Python","Data Science","MLOps"].map(skill => (
                      <div key={skill} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#9333ea,#ec4899)" }}></div>
                        <span style={{ fontSize: "0.8rem", color: "rgba(232,234,240,0.7)", fontWeight: 400 }}>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", maxWidth: 880, margin: "0 auto" }} />

      {/* RESUME */}
      <section id="resume" style={{ position: "relative", zIndex: 1, padding: "6rem 2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 880, width: "100%", textAlign: "center" }}>
          <div data-id="res0" style={{ marginBottom: "2.5rem" }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#9333ea", marginBottom: "0.7rem", fontWeight: 600 }}>Resume</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>My Experience</h2>
          </div>
          <div data-id="res1" style={{}}>
            <p style={{ color: "rgba(232,234,240,0.48)", lineHeight: 1.9, fontSize: "0.93rem", marginBottom: "2rem" }}>
              View or download my resume to see my full experience, education, and skills.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/Vikram_Thakur_Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", fontSize: "0.88rem", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#9333ea,#7c3aed)", padding: "0.88rem 2.5rem", borderRadius: "12px", textDecoration: "none", boxShadow: "0 8px 30px rgba(147,51,234,0.28)" }}>
                View Resume
              </a>
              <a href="/Vikram_Thakur_Resume.pdf" download style={{ display: "inline-block", fontSize: "0.88rem", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#06b6d4,#10b981)", padding: "0.88rem 2.5rem", borderRadius: "12px", textDecoration: "none", boxShadow: "0 8px 30px rgba(6,182,212,0.28)" }}>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", maxWidth: 880, margin: "0 auto" }} />

      {/* SKILLS */}
      <section id="skills" style={{ position: "relative", zIndex: 1, padding: "6rem 2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 880, width: "100%" }}>
          <div data-id="sk0" style={{ marginBottom: "2.5rem", ...fade("sk0") }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#9333ea", marginBottom: "0.7rem", fontWeight: 600 }}>Skills</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>My Toolkit</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))", gap: "0.9rem" }}>
            {skills.map((sk, i) => (
              <div key={sk.name} data-id={`sk${i+1}`} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1.4rem", transition: "border-color 0.2s, transform 0.2s", cursor: "default", ...fade(`sk${i+1}`, i*0.07) }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=`${sk.color}45`; e.currentTarget.style.transform="translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; }}>
                <div style={{ width: 36, height: 36, borderRadius: "9px", background: `${sk.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: "0.9rem" }}>{sk.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#fff", marginBottom: "0.45rem" }}>{sk.name}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(232,234,240,0.38)", lineHeight: 1.7, marginBottom: "0.9rem" }}>{sk.desc}</div>
                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                  {sk.tags.map(t => (
                    <span key={t} style={{ fontSize: "0.58rem", padding: "0.18rem 0.55rem", borderRadius: "6px", background: `${sk.color}12`, border: `1px solid ${sk.color}22`, color: sk.color }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", maxWidth: 880, margin: "0 auto" }} />

      {/* PROJECTS */}
      <section id="work" style={{ position: "relative", zIndex: 1, padding: "6rem 2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 880, width: "100%" }}>
          <div data-id="pr0" style={{ marginBottom: "2.5rem", ...fade("pr0") }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#9333ea", marginBottom: "0.7rem", fontWeight: 600 }}>Work</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>Selected Projects</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {projects.map((p, i) => (
              <div key={p.num} data-id={`pr${i+1}`} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.8rem", display: "grid", gridTemplateColumns: "36px 1fr 24px", gap: "1.2rem", alignItems: "flex-start", transition: "border-color 0.2s, transform 0.2s", cursor: "default", ...fade(`pr${i+1}`, i*0.1) }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(147,51,234,0.28)"; e.currentTarget.style.transform="translateX(3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateX(0)"; }}>
                <div style={{ fontSize: "0.65rem", color: "rgba(232,234,240,0.18)", fontWeight: 600, letterSpacing: "1px", paddingTop: "0.2rem" }}>{p.num}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: "0.45rem" }}>{p.name}</div>
                  <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "0.65rem" }}>
                    {p.badges.map((b,bi) => (
                      <span key={b} style={{ fontSize: "0.62rem", padding: "0.18rem 0.65rem", borderRadius: "6px", background: `${p.colors[bi%2]}14`, border: `1px solid ${p.colors[bi%2]}28`, color: p.colors[bi%2], fontWeight: 500 }}>{b}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "rgba(232,234,240,0.38)", lineHeight: 1.7, marginBottom: "0.9rem" }}>{p.desc}</div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(232,234,240,0.48)", textDecoration: "none", padding: "0.3rem 0.85rem", borderRadius: "7px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}>GitHub ↗</a>}
                    {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.72rem", fontWeight: 600, color: "#c084fc", textDecoration: "none", padding: "0.3rem 0.85rem", borderRadius: "7px", border: "1px solid rgba(147,51,234,0.28)", background: "rgba(147,51,234,0.1)" }}>Live Demo ↗</a>}
                  </div>
                </div>
                <div style={{ fontSize: "1rem", color: "rgba(232,234,240,0.12)", paddingTop: "0.2rem" }}>↗</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: "rgba(255,255,255,0.05)", maxWidth: 880, margin: "0 auto" }} />

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "6rem 2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
          <div data-id="ct1" style={{ ...fade("ct1") }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#9333ea", marginBottom: "1rem", fontWeight: 600 }}>Contact</div>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-2px", color: "#fff", lineHeight: 1.05, marginBottom: "1rem" }}>
              Let's Work<br />
              <span style={{ background: "linear-gradient(135deg,#9333ea,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Together</span>
            </h2>
            <p style={{ color: "rgba(232,234,240,0.38)", fontSize: "0.92rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Have an interesting AI project or want to collaborate? My inbox is always open.
            </p>
            <a href="mailto:vt594925@gmail.com" style={{ display: "inline-block", fontSize: "0.88rem", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg,#9333ea,#7c3aed)", padding: "0.88rem 2.5rem", borderRadius: "12px", textDecoration: "none", boxShadow: "0 8px 30px rgba(147,51,234,0.28)", marginBottom: "2.5rem" }}>
              Say Hello
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}