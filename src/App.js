import { useEffect, useState } from "react";
import "./App.css";
import ChatAssistant from "./components/ChatAssistant.jsx";

const navItems = [
  ["About", "about"],
  ["Resume", "resume"],
  ["Skills", "skills"],
  ["Work", "work"],
  ["Contact", "contact"],
];

const stats = [
  ["10+", "Projects built"],
  ["5+", "Frameworks and tools"],
  ["3+", "AI domains explored"],
  ["24/7", "Learning and shipping"],
];

const heroSignals = [
  "Machine learning systems with usable frontend delivery",
  "Portfolio-ready projects built for demos and hiring conversations",
  "Focused on AI, NLP, computer vision, and deployment workflows",
];

const strengths = [
  {
    title: "Product Mindset",
    copy: "I design projects so they are understandable to recruiters, clients, and real users, not just technically correct.",
  },
  {
    title: "Applied AI Focus",
    copy: "Work centers on practical machine learning, computer vision, NLP, and deployment-ready solutions instead of isolated experiments.",
  },
  {
    title: "Delivery Discipline",
    copy: "From model logic to interface polish, I care about clean presentation, measurable outcomes, and production-style thinking.",
  },
];

const timeline = [
  {
    year: "2026",
    title: "AI/ML Portfolio and deployment-focused work",
    body: "Built portfolio-grade projects, improved deployment readiness, and strengthened frontend presentation for technical work.",
  },
  {
    year: "2025",
    title: "Expanded into NLP and computer vision",
    body: "Worked across sentiment analysis, chatbot ideas, emotion detection, and image classification using practical datasets and models.",
  },
  {
    year: "2024",
    title: "Core machine learning foundation",
    body: "Built confidence across Python, data analysis, supervised learning, model evaluation, and experimentation workflows.",
  },
];

const skills = [
  {
    name: "Machine Learning",
    desc: "Model training, feature engineering, evaluation, and deployment-oriented workflows for practical use cases.",
    tags: ["Scikit-learn", "XGBoost", "Pipelines"],
  },
  {
    name: "Deep Learning",
    desc: "Neural networks for vision and text tasks, with hands-on experimentation using modern frameworks.",
    tags: ["PyTorch", "TensorFlow", "Keras"],
  },
  {
    name: "NLP",
    desc: "Intent understanding, sentiment analysis, embeddings, and language-model aligned product thinking.",
    tags: ["BERT", "Transformers", "NLTK"],
  },
  {
    name: "Computer Vision",
    desc: "Image classification, emotion recognition, object-aware workflows, and inference-oriented pipelines.",
    tags: ["OpenCV", "YOLO", "CNN"],
  },
  {
    name: "Data and Python",
    desc: "Data cleaning, analysis, experimentation, dashboarding, and supporting utility app development.",
    tags: ["Pandas", "NumPy", "Plotly"],
  },
  {
    name: "Deployment Basics",
    desc: "Version control, app hosting, experiment iteration, and building project experiences that are shareable online.",
    tags: ["Git", "Streamlit", "Render"],
  },
];

const featuredProject = {
  num: "01",
  name: "Insurance Cost Predictor",
  category: "Featured Case Study",
  summary:
    "A machine-learning web app that predicts insurance charges using personal and health-related features. Built to turn tabular modeling into a clean interactive experience for users.",
  metrics: [
    ["Type", "Regression App"],
    ["Stack", "Scikit-learn + Streamlit"],
    ["Focus", "Prediction + Usable UI"],
  ],
  highlights: [
    "Designed around real input variables like age, BMI, smoking habits, and region.",
    "Turned a prediction workflow into an interface that is fast to demo and easy to explain.",
    "Deployed online for practical access instead of keeping the work local-only.",
  ],
  github: "https://github.com/vikram-101/insurance-predictor",
  demo: "https://insurance-predictor-2-omxp.onrender.com/",
};

const projects = [
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

const serviceCards = [
  "AI/ML internship-ready project delivery",
  "Portfolio websites for technical profiles",
  "Frontend polish for data and AI demos",
  "Deployment-focused presentation upgrades",
];

const contactItems = [
  ["Email", "vt594925@gmail.com", "mailto:vt594925@gmail.com"],
  ["GitHub", "github.com/vikram-101", "https://github.com/vikram-101"],
  ["Location", "India", ""],
];

const initialForm = {
  name: "",
  email: "",
  projectType: "",
  message: "",
};

export default function App() {
  const [openChat, setOpenChat] = useState(false);
  const [visible, setVisible] = useState({});
  const [activeNav, setActiveNav] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [formState, setFormState] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

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
        threshold: 0.18,
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
    transition: `opacity 0.75s ${delay}s ease, transform 0.75s ${delay}s ease`,
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    const { name, email, projectType, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormState("Please fill in your name, email, and message.");
      return;
    }

    setIsSubmittingForm(true);
    setFormState("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType: projectType.trim(),
          message: message.trim(),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || "Unable to send message right now.");
      }

      setFormState("Message sent successfully. Vikram will receive it directly by email.");
      setFormData(initialForm);
    } catch (error) {
      setFormState(
        error instanceof Error
          ? `Message could not be sent: ${error.message}`
          : "Message could not be sent right now. Please try again."
      );
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="portfolio-shell">
      <div className="page-orb orb-one" />
      <div className="page-orb orb-two" />
      <div className="page-orb orb-three" />
      <div className="page-grid" />

      <header className="site-header">
        <div className="site-header__inner">
          <button className="brand-mark" onClick={() => scrollTo("hero")}>
            <span className="brand-mark__logo" aria-hidden="true">
              <img src="/vikram-mark.svg" alt="" />
            </span>
            <span className="brand-mark__text">
              Vikram
              <span>AI/ML Portfolio</span>
            </span>
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

          <button type="button" className="header-cta" onClick={() => scrollTo("contact")}>
            Start a Project
          </button>
        </div>
      </header>

      <main className="page-content">
        <section id="hero" className="hero section">
          <div className="hero-layout">
            <div className="hero__content">
              <div className="hero-watermark" aria-hidden="true">
                <img src="/vikram-mark.svg" alt="" />
              </div>

              <div data-id="hero-badge" className="eyebrow-pill" style={reveal("hero-badge")}>
                <span className="status-dot" />
                Open to internships, freelance work, and AI collaborations
              </div>

              <div data-id="hero-title" style={reveal("hero-title", 0.08)}>
                <p className="hero-kicker">Premium AI and ML Portfolio</p>
                <h1 className="hero-title">
                  Turning machine learning work into
                  <span> clean, visible, and credible product experiences.</span>
                </h1>
              </div>

              <p data-id="hero-copy" className="hero-copy" style={reveal("hero-copy", 0.16)}>
                I am Vikram Thakur, a computer science student focused on AI systems, machine
                learning applications, and polished deployment-ready demos that communicate value
                clearly.
              </p>

              <div data-id="hero-actions" className="hero-actions" style={reveal("hero-actions", 0.24)}>
                <button type="button" className="btn btn--primary" onClick={() => scrollTo("work")}>
                  Explore Projects
                </button>
                <a href="/resume.html" target="_blank" rel="noreferrer" className="btn btn--ghost">
                  View Resume
                </a>
              </div>

              <div data-id="hero-signals" className="hero-signals" style={reveal("hero-signals", 0.28)}>
                {heroSignals.map((item) => (
                  <div key={item} className="hero-signal">
                    <span className="hero-signal__dot" />
                    <p>{item}</p>
                  </div>
                ))}
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

            <aside className="glass-panel hero-panel" data-id="hero-panel" style={reveal("hero-panel", 0.18)}>
              <div className="hero-panel__topline">
                <span>Current Focus</span>
                <strong>2026</strong>
              </div>

              <div className="hero-panel__showcase">
                <div className="hero-panel__pulse" />
                <div className="hero-panel__card hero-panel__card--primary">
                  <span>AI Product Thinking</span>
                  <strong>Models + UI + Delivery</strong>
                </div>
                <div className="hero-panel__card hero-panel__card--secondary">
                  <span>Presentation Quality</span>
                  <strong>Portfolio-grade execution</strong>
                </div>
              </div>

              <h3>Building work that can be explained in one minute and still impress technically.</h3>
              <p>
                The goal is not only model accuracy. It is also clarity, usability, deployment,
                and strong first impressions during hiring or client review.
              </p>

              <div className="hero-panel__metrics">
                <div>
                  <span>Primary Role</span>
                  <strong>AI / ML Engineer</strong>
                </div>
                <div>
                  <span>Specialties</span>
                  <strong>NLP, CV, ML Apps</strong>
                </div>
                <div>
                  <span>Availability</span>
                  <strong>Open to Opportunities</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-heading" data-id="about-heading" style={reveal("about-heading")}>
            <p className="section-label">About</p>
            <h2>Built around practical AI work, crisp presentation, and career-ready execution.</h2>
          </div>

          <div className="about-grid">
            <article className="glass-panel about-story" data-id="about-story" style={reveal("about-story", 0.08)}>
              <p>
                I am a Computer Science student specializing in Artificial Intelligence and Machine
                Learning. My work focuses on moving ideas from data and models into interfaces that
                are visible, usable, and easy to present professionally.
              </p>
              <p>
                I enjoy building projects across predictive modeling, computer vision, NLP, and web
                deployment. I care about making technical work feel trustworthy, structured, and
                polished enough for real-world review.
              </p>
              <blockquote>
                Strong AI work should not only function well. It should also communicate clearly.
              </blockquote>
            </article>

            <aside className="glass-panel profile-card" data-id="about-profile" style={reveal("about-profile", 0.16)}>
              <div className="profile-card__top">
                <div className="profile-avatar">
                  <img src="/vikram-mark.svg" alt="" />
                </div>
                <h3>Vikram Thakur</h3>
                <p>AI / ML Engineer</p>
                <span>Computer Science Student</span>
              </div>

              <div className="profile-group">
                <h4>Contact</h4>
                {contactItems.map(([label, text, href]) =>
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
                )}
              </div>
            </aside>
          </div>

          <div className="strength-grid">
            {strengths.map((item, index) => (
              <article
                key={item.title}
                className="glass-panel strength-card"
                data-id={`strength-${index}`}
                style={reveal(`strength-${index}`, index * 0.08)}
              >
                <div className="strength-card__line" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="resume" className="section">
          <div className="section-heading" data-id="resume-heading" style={reveal("resume-heading")}>
            <p className="section-label">Resume</p>
            <h2>A clearer timeline of growth, learning, and project maturity.</h2>
          </div>

          <div className="resume-layout">
            <div className="glass-panel resume-panel" data-id="resume-panel" style={reveal("resume-panel", 0.08)}>
              <p>
                Open the resume in a new tab or download it directly for a complete overview of my
                work, education, and technical profile.
              </p>
              <div className="button-row">
                <a href="/resume.html" target="_blank" rel="noreferrer" className="btn btn--primary">
                  View Resume
                </a>
                <a href="/Vikram_Thakur_Resume.pdf" download className="btn btn--secondary">
                  Download Resume
                </a>
              </div>
            </div>

            <div className="timeline">
              {timeline.map((item, index) => (
                <article
                  key={item.year + item.title}
                  className="glass-panel timeline-card"
                  data-id={`timeline-${index}`}
                  style={reveal(`timeline-${index}`, index * 0.08)}
                >
                  <span className="timeline-card__year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-heading" data-id="skills-heading" style={reveal("skills-heading")}>
            <p className="section-label">Skills</p>
            <h2>Technical strengths grouped for faster scanning and better hiring clarity.</h2>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <article
                key={skill.name}
                className="glass-panel skill-card"
                data-id={`skill-${index}`}
                style={reveal(`skill-${index}`, index * 0.08)}
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
            <h2>Projects presented like product showcases instead of simple list items.</h2>
          </div>

          <article className="glass-panel featured-project" data-id="featured-project" style={reveal("featured-project", 0.08)}>
            <div className="featured-project__visual">
              <div className="featured-project__screen">
                <div className="featured-project__screen-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="featured-project__screen-header">
                  <div>
                    <p>Insurance Cost Predictor</p>
                    <strong>Estimated premium dashboard</strong>
                  </div>
                  <div className="featured-project__screen-badge">Live ML App</div>
                </div>

                <div className="featured-project__screen-grid">
                  <div>
                    <span>Age</span>
                    <strong>28</strong>
                  </div>
                  <div>
                    <span>BMI</span>
                    <strong>24.7</strong>
                  </div>
                  <div>
                    <span>Smoker</span>
                    <strong>No</strong>
                  </div>
                  <div>
                    <span>Region</span>
                    <strong>Southwest</strong>
                  </div>
                </div>

                <div className="featured-project__screen-card featured-project__screen-card--large">
                  <div className="featured-project__chart-head">
                    <span>Prediction Output</span>
                    <strong>$12,480</strong>
                  </div>
                  <div className="featured-project__chart-bars">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="featured-project__screen-lower">
                  <div className="featured-project__screen-card">
                    <span>Model Confidence</span>
                    <strong>92.4%</strong>
                  </div>
                  <div className="featured-project__screen-card featured-project__screen-card--accent">
                    <span>Top Driver</span>
                    <strong>Smoking status</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-project__body">
              <p className="section-label">{featuredProject.category}</p>
              <div className="featured-project__title-row">
                <span className="featured-project__index">{featuredProject.num}</span>
                <h3>{featuredProject.name}</h3>
              </div>
              <p>{featuredProject.summary}</p>

              <div className="featured-project__metrics">
                {featuredProject.metrics.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>

              <div className="featured-project__highlights">
                {featuredProject.highlights.map((item) => (
                  <div key={item} className="feature-pill">
                    <span />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className="button-row">
                <a href={featuredProject.github} target="_blank" rel="noreferrer" className="project-link">
                  GitHub
                </a>
                <a href={featuredProject.demo} target="_blank" rel="noreferrer" className="project-link project-link--primary">
                  Live Demo
                </a>
              </div>
            </div>
          </article>

          <div className="project-list">
            {projects.map((project, index) => (
              <article
                key={project.num}
                className="glass-panel project-card"
                data-id={`project-${index}`}
                style={reveal(`project-${index}`, index * 0.08)}
              >
                <div className="project-card__glow" />
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
                    ) : (
                      <span className="project-status">Demo coming soon</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading" data-id="services-heading" style={reveal("services-heading")}>
            <p className="section-label">Focus Areas</p>
            <h2>Where I can add value beyond just building one more model.</h2>
          </div>

          <div className="service-grid">
            {serviceCards.map((item, index) => (
              <article
                key={item}
                className="glass-panel service-card"
                data-id={`service-${index}`}
                style={reveal(`service-${index}`, index * 0.08)}
              >
                <span className="service-card__count">{`0${index + 1}`}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-heading" data-id="contact-heading" style={reveal("contact-heading")}>
            <p className="section-label">Contact</p>
            <h2>Ready for internships, freelance discussions, and AI-focused collaborations.</h2>
          </div>

          <div className="contact-layout">
            <article className="glass-panel contact-panel" data-id="contact-panel" style={reveal("contact-panel", 0.08)}>
              <p>
                If you are building an AI product, hiring for an internship, or want help
                presenting machine learning work professionally, send a message here.
              </p>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="contact-form__grid">
                  <label>
                    <span>Name</span>
                    <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Your name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" value={formData.email} onChange={handleFormChange} placeholder="you@example.com" />
                  </label>
                </div>

                <label>
                  <span>Project Type</span>
                  <input
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleFormChange}
                    placeholder="Internship, portfolio work, freelance AI project..."
                  />
                </label>

                <label>
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell me what you want to build or discuss."
                  />
                </label>

                <div className="contact-form__actions">
                  <button type="submit" className="btn btn--primary" disabled={isSubmittingForm}>
                    {isSubmittingForm ? "Sending..." : "Send Enquiry"}
                  </button>
                  <a href="https://github.com/vikram-101" target="_blank" rel="noreferrer" className="btn btn--ghost">
                    View GitHub
                  </a>
                </div>

                {formState ? <p className="contact-form__note">{formState}</p> : null}
              </form>
            </article>

            <aside className="glass-panel contact-side" data-id="contact-side" style={reveal("contact-side", 0.16)}>
              <div className="contact-side__badge">Direct Reach</div>
              <div className="contact-side__list">
                {contactItems.map(([label, text, href]) =>
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
                )}
              </div>

              <div className="contact-side__availability">
                <h3>Best fit for</h3>
                <div className="tag-row">
                  <span>Internships</span>
                  <span>AI Projects</span>
                  <span>Portfolio Upgrades</span>
                  <span>ML Demos</span>
                </div>
              </div>
            </aside>
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
