import { useEffect, useState } from "react";
import "./App.css";
import ChatAssistant from "./components/ChatAssistant.jsx";

const skills = [
  {
    name: "Machine Learning",
    desc: "Supervised and unsupervised learning, feature engineering, model evaluation, and deployment-oriented workflows.",
    tags: ["Scikit-learn", "XGBoost", "Feature Eng."],
    color: "#7c3aed",
  },
  {
    name: "Deep Learning",
    desc: "Neural network design with CNNs, transformers, and sequence models trained on practical datasets.",
    tags: ["PyTorch", "TensorFlow", "Keras"],
    color: "#db2777",
  },
  {
    name: "NLP",
    desc: "Text classification, embeddings, intent understanding, and language-model based product thinking.",
    tags: ["BERT", "Hugging Face", "NLTK"],
    color: "#0891b2",
  },
  {
    name: "Computer Vision",
    desc: "Image understanding, object detection, and real-time inference pipelines for applied use cases.",
    tags: ["OpenCV", "YOLO", "CNN"],
    color: "#059669",
  },
  {
    name: "Python and Data",
    desc: "Strong hands-on work across data cleaning, analysis, experimentation, visualization, and app building.",
    tags: ["NumPy", "Pandas", "Plotly"],
    color: "#d97706",
  },
  {
    name: "MLOps Basics",
    desc: "Experiment tracking, version control, lightweight deployment, and reproducible AI workflows.",
    tags: ["MLflow", "Streamlit", "Git"],
    color: "#8b5cf6",
  },
];

const projects = [
  {
    num: "01",
    name: "Insurance Cost Predictor",
    badges: ["Machine Learning", "Streamlit"],
    desc: "ML-powered web app that predicts insurance charges based on age, BMI, smoking habits, and region. Built with Scikit-learn and deployed on Render.",
    github: "https://github.com/vikram-101/insurance-predictor",
    demo: "https://insurance-predictor-2-omxp.onrender.com/",
  },
  {
    num: "02",
    name: "Emotion Detector",
    badges: ["Computer Vision", "Deep Learning"],
    desc: "Real-time facial emotion recognition system trained on FER-2013 for live webcam-based emotion prediction.",
    github: "",
    demo: "",
  },
  {
    num: "03",
    name: "Sentiment Analyzer",
    badges: ["NLP", "BERT"],
    desc: "Sentiment classification workflow built on tweet datasets with a simple inference experience for real use.",
    github: "",
    demo: "",
  },
  {
    num: "04",
    name: "Customer Support Chatbot",
    badges: ["NLP", "Streamlit"],
    desc: "AI-powered support chatbot focused on intent recognition and response generation for interactive product support.",
    github: "",
    demo: "",
  },
  {
    num: "05",
    name: "Image Classification App",
    badges: ["Computer Vision", "Flask"],
    desc: "Image classification app using pretrained CNN models with a lightweight web interface and deployment-ready flow.",
    github: "",
    demo: "",
  },
  {
    num: "06",
    name: "Spam Message Detector",
    badges: ["NLP", "Flask"],
    desc: "Spam detection web app that classifies messages into spam or ham using applied machine learning techniques.",
    github: "",
    demo: "https://spam-flask-app-3.onrender.com",
  },
];

const navItems = [
  ["About", "about"],
  ["Resume", "resume"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Contact", "contact"],
];

const stats = [
  ["10+", "Projects built"],
  ["5+", "Frameworks used"],
  ["3+", "AI domains explored"],
];

const contactItems = [
  ["Email", "vt594925@gmail.com", "mailto:vt594925@gmail.com"],
  ["GitHub", "github.com/vikram-101", "https://github.com/vikram-101"],
  ["LinkedIn", "linkedin.com/in/vikram-thakur", "https://linkedin.com/in/vikram-thakur"],
  ["Location", "India", ""],
];

export default function App() {
  const [openChat, setOpenChat] = useState(false);
  const [visible, setVisible] = useState({});
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const key = entry.target.dataset.id || entry.target.id;
          if (key) {
            setVisible((prev) => ({ ...prev, [key]: true }));
          }

          if (entry.target.id) {
            setActiveNav(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    const targets = document.querySelectorAll("[data-id], section[id]");
    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const reveal = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  return (
    <div className="portfolio-shell">
      <div className="page-orb orb-one" />
      <div className="page-orb orb-two" />
      <div className="page-grid" />

      <header className="site-header">
        <div className="site-header__inner">
          <button className="brand-mark" onClick={() => scrollTo("hero")}>
            Vikram<span>.</span>
          </button>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}>
            {navItems.map(([label, id]) => (
              <button
                key={id}
                type="button"
                className={activeNav === id ? "nav-link nav-link--active" : "nav-link"}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          <a className="header-cta" href="mailto:vt594925@gmail.com">
            Hire Me
          </a>
        </div>
      </header>

      <main className="page-content">
        <section id="hero" className="hero section">
          <div className="hero__content">
            <div data-id="hero-badge" className="eyebrow-pill" style={reveal("hero-badge")}>
              <span className="status-dot" />
              Open to internships and collaborations
            </div>

            <div data-id="hero-title" style={reveal("hero-title", 0.08)}>
              <p className="hero-kicker">AI and ML Engineer Portfolio</p>
              <h1 className="hero-title">
                Building intelligent products with
                <span> data, models, and clear product thinking.</span>
              </h1>
            </div>

            <p data-id="hero-copy" className="hero-copy" style={reveal("hero-copy", 0.16)}>
              I am Vikram Thakur, a computer science student focused on practical AI systems,
              machine learning applications, and deployment-ready projects that solve real
              problems.
            </p>

            <div data-id="hero-actions" className="hero-actions" style={reveal("hero-actions", 0.24)}>
              <button type="button" className="btn btn--primary" onClick={() => scrollTo("work")}>
                View Projects
              </button>
              <button type="button" className="btn btn--ghost" onClick={() => scrollTo("contact")}>
                Contact Me
              </button>
            </div>

            <div data-id="hero-stats" className="hero-stats" style={reveal("hero-stats", 0.32)}>
              {stats.map(([value, label]) => (
                <div key={label} className="stat-card">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section section-card">
          <div className="section-heading" data-id="about-heading" style={reveal("about-heading")}>
            <p className="section-label">About</p>
            <h2>Focused on practical AI work, not just theory.</h2>
          </div>

          <div className="about-grid">
            <article className="glass-panel about-copy" data-id="about-copy" style={reveal("about-copy", 0.08)}>
              <p>
                I am a Computer Science student specializing in Artificial Intelligence and
                Machine Learning. My work focuses on building systems that are usable, measurable,
                and aligned with real user problems.
              </p>
              <p>
                I have experience across predictive modeling, computer vision, NLP, and web-based
                deployment. I enjoy taking ideas from raw data all the way to working interfaces
                that can be shared and tested.
              </p>
              <blockquote>
                Innovation through data means turning complex problems into reliable, scalable
                solutions.
              </blockquote>
            </article>

            <aside className="glass-panel profile-card" data-id="about-profile" style={reveal("about-profile", 0.16)}>
              <div className="profile-card__top">
                <div className="profile-avatar">VT</div>
                <h3>Vikram Thakur</h3>
                <p>AI / ML Engineer</p>
                <span>Computer Science Student</span>
              </div>

              <div className="profile-group">
                <h4>Contact</h4>
                {contactItems.map(([label, text, href]) => (
                  href ? (
                    <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      <span>{label}</span>
                      <strong>{text}</strong>
                    </a>
                  ) : (
                    <div key={label} className="profile-row">
                      <span>{label}</span>
                      <strong>{text}</strong>
                    </div>
                  )
                ))}
              </div>

              <div className="profile-group">
                <h4>Core Areas</h4>
                <div className="profile-tags">
                  {["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "Python", "Data Science", "MLOps"].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="resume" className="section section-card section-card--center">
          <div className="section-heading" data-id="resume-heading" style={reveal("resume-heading")}>
            <p className="section-label">Resume</p>
            <h2>Quick access to experience, education, and skills.</h2>
          </div>

          <div className="glass-panel resume-panel" data-id="resume-panel" style={reveal("resume-panel", 0.08)}>
            <p>
              Open the resume in a new tab or download it directly for a complete overview of my
              work, education, and technical profile.
            </p>
            <div className="button-row">
              <a href="/Vikram_Thakur_Resume.pdf" target="_blank" rel="noreferrer" className="btn btn--primary">
                View Resume
              </a>
              <a href="/Vikram_Thakur_Resume.pdf" download className="btn btn--secondary">
                Download Resume
              </a>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-heading" data-id="skills-heading" style={reveal("skills-heading")}>
            <p className="section-label">Skills</p>
            <h2>Technical strengths organized for fast scanning.</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <article
                key={skill.name}
                className="glass-panel skill-card"
                data-id={`skill-${index}`}
                style={{ ...reveal(`skill-${index}`, index * 0.08), "--skill-accent": skill.color }}
              >
                <div className="skill-card__accent" />
                <h3>{skill.name}</h3>
                <p>{skill.desc}</p>
                <div className="tag-row">
                  {skill.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section">
          <div className="section-heading" data-id="work-heading" style={reveal("work-heading")}>
            <p className="section-label">Work</p>
            <h2>Projects presented with clearer hierarchy and actions.</h2>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article
                key={project.num}
                className="glass-panel project-card"
                data-id={`project-${index}`}
                style={reveal(`project-${index}`, index * 0.08)}
              >
                <div className="project-index">{project.num}</div>
                <div className="project-body">
                  <div className="tag-row">
                    {project.badges.map((badge) => (
                      <span key={badge}>{badge}</span>
                    ))}
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.desc}</p>
                  <div className="button-row">
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                        GitHub
                      </a>
                    ) : null}
                    {project.demo ? (
                      <a href={project.demo} target="_blank" rel="noreferrer" className="project-link project-link--primary">
                        Live Demo
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section section-card section-card--center">
          <div className="section-heading" data-id="contact-heading" style={reveal("contact-heading")}>
            <p className="section-label">Contact</p>
            <h2>Available for internships, freelance work, and collaboration.</h2>
          </div>

          <div className="glass-panel contact-panel" data-id="contact-panel" style={reveal("contact-panel", 0.08)}>
            <p>
              If you are building an AI product, exploring machine learning ideas, or hiring for a
              growth-stage engineering role, I would be glad to connect.
            </p>
            <div className="button-row">
              <a href="mailto:vt594925@gmail.com" className="btn btn--primary">
                Send Email
              </a>
              <a href="https://github.com/vikram-101" target="_blank" rel="noreferrer" className="btn btn--ghost">
                View GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <button type="button" className="chat-fab" onClick={() => setOpenChat(true)} aria-label="Open portfolio assistant">
        Chat
      </button>

      {openChat ? <ChatAssistant onClose={() => setOpenChat(false)} /> : null}
    </div>
  );
}
