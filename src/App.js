import { useState, useEffect } from "react";

const skills = [
  { icon: "🧠", name: "Machine Learning", desc: "Supervised & unsupervised learning, ensemble methods, model evaluation.", tags: ["Scikit-learn", "XGBoost", "Feature Eng."], color: "#9333ea" },
  { icon: "🔥", name: "Deep Learning", desc: "CNNs, RNNs, Transformers. Trained on real datasets.", tags: ["PyTorch", "TensorFlow", "Keras"], color: "#ec4899" },
  { icon: "💬", name: "NLP", desc: "Text embeddings, sentiment analysis, fine-tuned language models.", tags: ["BERT", "HuggingFace", "NLTK"], color: "#06b6d4" },
  { icon: "👁️", name: "Computer Vision", desc: "Image classification, object detection, real-time inference.", tags: ["OpenCV", "YOLO", "CNN"], color: "#10b981" },
  { icon: "🐍", name: "Python & Data", desc: "NumPy, Pandas, Matplotlib — full data science stack.", tags: ["NumPy", "Pandas", "Plotly"], color: "#f59e0b" },
  { icon: "📊", name: "MLOps Basics", desc: "Experiment tracking, model versioning, Streamlit apps.", tags: ["MLflow", "Streamlit", "Git"], color: "#f43f5e" },
];

const projects = [
  { num: "01", name: "Insurance Cost Predictor", badges: ["Machine Learning", "Streamlit"], desc: "ML-powered web app that predicts insurance charges based on age, BMI, smoking habits & region. Built with Scikit-learn & deployed via Streamlit.", colors: ["#9333ea", "#ec4899"], github: "https://github.com/vikram-101/insurance-predictor", demo: "https://insurance-predictor-2-omxp.onrender.com/" },
  { num: "02", name: "Emotion Detector", badges: ["Computer Vision", "Deep Learning"], desc: "Real-time facial emotion recognition using CNN on FER-2013. Detects 7 emotions live via webcam with 85%+ accuracy.", colors: ["#06b6d4", "#9333ea"], github: "", demo: "" },
  { num: "03", name: "Sentiment Analyzer", badges: ["NLP", "BERT"], desc: "Fine-tuned BERT on 50K tweets to classify sentiment. Clean Streamlit dashboard for live inference.", colors: ["#10b981", "#06b6d4"], github: "", demo: "" },
];

export default function Portfolio() {
  const [visible, setVisible] = useState({});

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };



  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }));
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-id]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const fadeUp = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  return (
    <div style={{ background: "#04040a", color: "#f1f5f9", fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Aurora blobs */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {[
          { w: 500, h: 500, bg: "rgba(147,51,234,0.12)", top: "-100px", left: "-100px" },
          { w: 400, h: 400, bg: "rgba(236,72,153,0.08)", top: "35%", right: "-100px" },
          { w: 350, h: 350, bg: "rgba(6,182,212,0.07)", bottom: "0", left: "30%" },
        ].map((b, i) => (
          <div key={i} style={{ position: "absolute", width: b.w, height: b.h, background: b.bg, borderRadius: "50%", filter: "blur(100px)", top: b.top, left: b.left, right: b.right, bottom: b.bottom }} />
        ))}
      </div>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "1.2rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(4,4,10,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "3px", textTransform: "uppercase", background: "linear-gradient(90deg,#fff,rgba(255,255,255,0.5))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          VIKRAM
        </div>
        <div style={{ display: "flex", gap: "0.3rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "100px", padding: "0.35rem" }}>
          {[["About","hero"],["Skills","skills"],["Work","work"],["Contact","contact"]].map(([label,id]) => (
            <button key={label} onClick={() => scrollTo(id)} style={{ fontSize: "0.65rem", letterSpacing: "1px", textTransform: "uppercase", color: "rgba(241,245,249,0.4)", background: "transparent", border: "none", padding: "0.4rem 0.9rem", borderRadius: "100px", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.color = "#f1f5f9"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "rgba(241,245,249,0.4)"; }}>
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8rem 2rem 4rem", textAlign: "center" }}>

        {/* Status pill */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "100px", padding: "0.5rem 1.2rem", fontSize: "0.65rem", letterSpacing: "2px", color: "rgba(241,245,249,0.5)", marginBottom: "2.5rem", opacity: 1 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981", display: "inline-block" }} />
          Available for internships &amp; collabs
        </div>

        {/* Big heading */}
        <h1 style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-3px", marginBottom: "1.5rem" }}>
          <span style={{ display: "block", color: "#f1f5f9" }}>Building</span>
          <span style={{ display: "block", background: "linear-gradient(90deg, #9333ea, #ec4899, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Intelligent</span>
          <span style={{ display: "block", color: "#f1f5f9" }}>Systems.</span>
        </h1>

        <p style={{ maxWidth: 500, color: "rgba(241,245,249,0.5)", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem", fontStyle: "italic" }}>
          I turn raw data into thinking machines — exploring AI, ML, and the algorithms that make computers learn.
        </p>

        {/* Chips */}
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.5rem" }}>
          {["Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Python"].map(s => (
            <span key={s} style={{ fontSize: "0.65rem", letterSpacing: "1px", textTransform: "uppercase", padding: "0.35rem 0.9rem", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "rgba(241,245,249,0.45)" }}>{s}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => scrollTo("work")} style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.9rem 2.2rem", borderRadius: "6px", color: "#fff", background: "linear-gradient(135deg, #9333ea, #ec4899)", boxShadow: "0 0 30px rgba(147,51,234,0.3)", border: "none", cursor: "pointer" }}>See My Work</button>
          <button onClick={() => scrollTo("contact")} style={{ fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", padding: "0.9rem 2.2rem", borderRadius: "6px", color: "rgba(241,245,249,0.6)", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", cursor: "pointer" }}>Contact Me</button>
        </div>

        {/* Scroll arrow */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "rgba(241,245,249,0.2)", fontSize: "0.6rem", letterSpacing: "2px" }}>
          <span>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, rgba(147,51,234,0.6), transparent)" }} />
        </div>
      </section>

      {/* ABOUT STATS */}
      <section style={{ position: "relative", zIndex: 1, padding: "5rem 2rem", display: "flex", justifyContent: "center" }}>
        <div data-id="stats" style={{ maxWidth: 900, width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", ...fadeUp("stats") }}>
          {[["10+", "ML Projects built"], ["5+", "Frameworks used"], ["3+", "AI Domains"], ["∞", "Curiosity level"]].map(([num, label]) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "2rem 1.5rem", textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", fontWeight: 900, background: "linear-gradient(135deg, #9333ea, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(241,245,249,0.35)", marginTop: "0.5rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position: "relative", zIndex: 1, padding: "5rem 2rem", display: "flex", justifyContent: "center" }}>
        <div style={{ maxWidth: 1000, width: "100%" }}>
          <div data-id="skills-head" style={{ marginBottom: "3rem", ...fadeUp("skills-head") }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", color: "#9333ea", marginBottom: "0.8rem" }}>{/* Skills */}</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-1px" }}>
              My <span style={{ background: "linear-gradient(90deg,#9333ea,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Toolkit</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {skills.map((sk, i) => (
              <div key={sk.name} data-id={`sk-${i}`} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1.8rem", cursor: "default", transition: "border-color 0.3s, transform 0.3s", ...fadeUp(`sk-${i}`, i * 0.08) }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${sk.color}55`; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `${sk.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "1rem" }}>{sk.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.5px", marginBottom: "0.5rem", color: "#f1f5f9" }}>{sk.name}</div>
                <div style={{ fontSize: "0.8rem", color: "rgba(241,245,249,0.45)", lineHeight: 1.7, marginBottom: "1rem" }}>{sk.desc}</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {sk.tags.map(t => (
                    <span key={t} style={{ fontSize: "0.58rem", letterSpacing: "1px", textTransform: "uppercase", padding: "0.2rem 0.6rem", borderRadius: "100px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(241,245,249,0.4)" }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="work" style={{ position: "relative", zIndex: 1, padding: "5rem 2rem", display: "flex", justifyContent: "center", background: "rgba(147,51,234,0.02)" }}>
        <div style={{ maxWidth: 900, width: "100%" }}>
          <div data-id="proj-head" style={{ marginBottom: "3rem", ...fadeUp("proj-head") }}>
            <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", color: "#9333ea", marginBottom: "0.8rem" }}>{/* Work */}</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 900, letterSpacing: "-1px" }}>
              Things I've <span style={{ background: "linear-gradient(90deg,#06b6d4,#9333ea)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Shipped</span>
            </h2>
          </div>

          {projects.map((p, i) => (
            <div key={p.num} data-id={`pr-${i}`} style={{ display: "grid", gridTemplateColumns: "50px 1fr 30px", gap: "1.5rem", alignItems: "flex-start", padding: "2rem 0", borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "default", transition: "opacity 0.3s", ...fadeUp(`pr-${i}`, i * 0.1) }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              <span style={{ fontSize: "0.65rem", letterSpacing: "2px", color: "rgba(241,245,249,0.25)", paddingTop: "0.3rem" }}>{p.num}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "rgba(241,245,249,0.85)", marginBottom: "0.5rem" }}>{p.name}</div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                  {p.badges.map((b, bi) => (
                    <span key={b} style={{ fontSize: "0.6rem", letterSpacing: "1px", textTransform: "uppercase", padding: "0.2rem 0.7rem", borderRadius: "4px", background: `${p.colors[bi % 2]}18`, color: p.colors[bi % 2], border: `1px solid ${p.colors[bi % 2]}30` }}>{b}</span>
                  ))}
                </div>
                <div style={{ fontSize: "0.85rem", color: "rgba(241,245,249,0.4)", lineHeight: 1.7, marginBottom: "0.8rem" }}>{p.desc}</div>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.6rem", letterSpacing: "1.5px", textTransform: "uppercase", padding: "0.35rem 0.9rem", borderRadius: "4px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(241,245,249,0.6)", textDecoration: "none" }}>🐙 GitHub</a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.6rem", letterSpacing: "1.5px", textTransform: "uppercase", padding: "0.35rem 0.9rem", borderRadius: "4px", background: "rgba(147,51,234,0.15)", border: "1px solid rgba(147,51,234,0.3)", color: "#c084fc", textDecoration: "none" }}>🚀 Live Demo</a>}
                </div>
              </div>
              <span style={{ fontSize: "1.2rem", color: "rgba(241,245,249,0.2)", paddingTop: "0.2rem" }}>↗</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1, padding: "6rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div data-id="contact" style={{ maxWidth: 650, ...fadeUp("contact") }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "4px", textTransform: "uppercase", color: "#9333ea", marginBottom: "1.5rem" }}>{/* Contact */}</div>
          <h2 style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 0.95, marginBottom: "1.5rem" }}>
            Let's build<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, background: "linear-gradient(90deg,#9333ea,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>something great.</em>
          </h2>
          <p style={{ color: "rgba(241,245,249,0.4)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "3rem" }}>
            Interesting AI project? Want to collaborate? Just wanna geek out about ML? Hit me up.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            {[{ icon: "✉️", label: "Email", href: "mailto:vt594925@gmail.com" }, { icon: "🐙", label: "GitHub", href: "https://github.com/vikram-101" }, { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/vikram-thakur-852379376" }, { icon: "🐦", label: "Twitter", href: "#" }].map(c => (
              <a key={c.label} href={c.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", padding: "1.5rem 2rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", textDecoration: "none", color: "rgba(241,245,249,0.45)", minWidth: 120, transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(147,51,234,0.4)"; e.currentTarget.style.color = "#f1f5f9"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(241,245,249,0.45)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                <span style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase" }}>{c.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(241,245,249,0.2)" }}>
        <span>© 2024 Vikram</span>
        <span style={{ color: "#9333ea" }}>AI / ML Engineer</span>
        <span>Built with 💜</span>
      </footer>
    </div>
  );
}