import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Fira+Code:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #faf8f4;
    --bg2: #f2ede4;
    --surface: #ffffff;
    --border: #e0d8cc;
    --text: #1a1612;
    --muted: #8a8078;
    --accent: #c0392b;
    --accent2: #e8622a;
    --ink: #2c2420;
    --font-display: 'Playfair Display', serif;
    --font-body: 'Cabinet Grotesk', sans-serif;
    --font-mono: 'Fira Code', monospace;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-body);
    overflow-x: hidden;
    cursor: none;
  }

  /* Cursor */
  .cursor {
    position: fixed; width: 8px; height: 8px;
    background: var(--accent); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    transition: width .15s, height .15s;
    mix-blend-mode: multiply;
  }
  .cursor-ring {
    position: fixed; width: 32px; height: 32px;
    border: 1.5px solid var(--accent);
    border-radius: 50%; pointer-events: none;
    z-index: 9998; transform: translate(-50%,-50%);
    transition: transform .1s ease-out;
    opacity: .4; mix-blend-mode: multiply;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.4rem 4rem;
    background: rgba(250,248,244,0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color .3s;
  }
  nav.scrolled { border-bottom-color: var(--border); }
  .logo {
    font-family: var(--font-display);
    font-weight: 900; font-size: 1.25rem;
    color: var(--text); text-decoration: none;
    letter-spacing: -.02em;
  }
  .logo em { color: var(--accent); font-style: italic; }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-family: var(--font-mono); font-size: .72rem;
    color: var(--muted); text-decoration: none;
    letter-spacing: .06em; text-transform: uppercase;
    transition: color .2s; position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute;
    left: 0; bottom: -3px; width: 0; height: 1px;
    background: var(--accent); transition: width .25s;
  }
  .nav-links a:hover { color: var(--accent); }
  .nav-links a:hover::after { width: 100%; }

  /* Hero */
  .hero {
    min-height: 100vh; display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 8rem 4rem 4rem;
    position: relative; overflow: hidden;
    gap: 4rem;
  }
  .hero-bg-text {
    position: absolute; bottom: -2rem; right: -1rem;
    font-family: var(--font-display);
    font-size: 22vw; font-weight: 900;
    color: var(--border); opacity: .35;
    letter-spacing: -.05em; line-height: 1;
    pointer-events: none; user-select: none;
  }
  .hero-left { position: relative; z-index: 1; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: var(--font-mono); font-size: .7rem;
    color: var(--accent); letter-spacing: .15em;
    text-transform: uppercase; margin-bottom: 1.8rem;
    padding: .4rem .9rem;
    border: 1px solid rgba(192,57,43,.2);
    background: rgba(192,57,43,.06);
  }
  .hero-tag::before { content: '●'; font-size: .5rem; animation: blink 1.4s infinite; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(3.2rem, 6vw, 5.5rem);
    font-weight: 900; line-height: 1;
    letter-spacing: -.03em; margin-bottom: 1rem;
  }
  .hero h1 .line { display: block; overflow: hidden; }
  .hero h1 .line span {
    display: block;
    animation: slideUp .9s cubic-bezier(.16,1,.3,1) forwards;
    opacity: 0; transform: translateY(110%);
  }
  .hero h1 .line:nth-child(2) span { animation-delay: .1s; }
  .hero h1 em { font-style: italic; color: var(--accent); }

  @keyframes slideUp { to { opacity:1; transform: translateY(0); } }

  .hero-role {
    font-family: var(--font-mono); font-size: .85rem;
    color: var(--muted); letter-spacing: .04em;
    margin-bottom: 1.5rem;
    animation: fadeUp .9s .3s forwards; opacity: 0; transform: translateY(16px);
  }
  .hero-desc {
    font-size: 1rem; color: var(--muted);
    line-height: 1.8; max-width: 420px;
    margin-bottom: 2.5rem;
    animation: fadeUp .9s .42s forwards; opacity: 0; transform: translateY(16px);
  }
  @keyframes fadeUp { to { opacity:1; transform: translateY(0); } }

  .hero-cta {
    display: flex; gap: 1rem;
    animation: fadeUp .9s .54s forwards; opacity: 0; transform: translateY(16px);
  }
  .btn-primary {
    padding: .85rem 2rem;
    background: var(--accent); color: #fff;
    font-family: var(--font-body); font-weight: 700; font-size: .85rem;
    border: none; cursor: none; letter-spacing: .02em;
    transition: transform .2s, box-shadow .2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(192,57,43,.3); }
  .btn-secondary {
    padding: .85rem 2rem;
    background: transparent; color: var(--text);
    font-family: var(--font-body); font-weight: 600; font-size: .85rem;
    border: 1.5px solid var(--border); cursor: none;
    transition: border-color .2s, color .2s;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

  /* Hero right — decorative card */
  .hero-right {
    position: relative; z-index: 1;
    animation: fadeUp .9s .2s forwards; opacity: 0; transform: translateY(24px);
  }
  .id-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 2.5rem;
    box-shadow: 8px 8px 0 var(--border);
    position: relative;
  }
  .id-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 100%; height: 4px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
  }
  .id-card-name {
    font-family: var(--font-display);
    font-size: 1.6rem; font-weight: 700;
    letter-spacing: -.02em; margin-bottom: .2rem;
  }
  .id-card-title {
    font-family: var(--font-mono); font-size: .7rem;
    color: var(--accent); letter-spacing: .12em; text-transform: uppercase;
    margin-bottom: 1.5rem;
  }
  .id-card-divider { height: 1px; background: var(--border); margin-bottom: 1.5rem; }
  .id-card-row {
    display: flex; align-items: flex-start; gap: .7rem;
    margin-bottom: .9rem;
  }
  .id-card-row-icon {
    font-size: .75rem; color: var(--accent);
    margin-top: .1rem; width: 14px; text-align: center;
    font-family: var(--font-mono);
  }
  .id-card-row-val {
    font-size: .82rem; color: var(--muted); line-height: 1.5;
    font-family: var(--font-mono);
  }
  .id-card-row-val a { color: var(--accent); text-decoration: none; }
  .id-card-row-val a:hover { text-decoration: underline; }
  .id-exp-badge {
    display: inline-flex; align-items: baseline; gap: .3rem;
    background: var(--bg2); border: 1px solid var(--border);
    padding: .8rem 1.2rem; margin-top: 1rem;
  }
  .id-exp-num {
    font-family: var(--font-display); font-size: 2.2rem;
    font-weight: 900; color: var(--accent); line-height: 1;
  }
  .id-exp-label {
    font-family: var(--font-mono); font-size: .68rem;
    color: var(--muted); letter-spacing: .06em; text-transform: uppercase;
  }

  /* Sections */
  section { padding: 6rem 4rem; }
  .section-label {
    font-family: var(--font-mono); font-size: .68rem;
    color: var(--accent); letter-spacing: .2em; text-transform: uppercase;
    display: flex; align-items: center; gap: .6rem;
    margin-bottom: .7rem;
  }
  .section-label::after { content: ''; flex: 0 0 32px; height: 1px; background: var(--accent); }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 900;
    letter-spacing: -.03em; line-height: 1.05; margin-bottom: 3rem;
  }
  .section-title em { font-style: italic; color: var(--accent); }

  /* Experience */
  #experience { background: var(--bg2); }
  .exp-list { max-width: 800px; }
  .exp-item {
    display: grid; grid-template-columns: 160px 1fr;
    gap: 2rem; padding: 2rem 0;
    border-bottom: 1px solid var(--border);
  }
  .exp-item:first-child { padding-top: 0; }
  .exp-period {
    font-family: var(--font-mono); font-size: .72rem;
    color: var(--muted); letter-spacing: .05em;
    padding-top: .18rem; line-height: 1.6;
  }
  .exp-period strong {
    display: block; font-size: .75rem; color: var(--text);
    font-weight: 500; margin-bottom: .2rem;
  }
  .exp-body h3 {
    font-size: 1.05rem; font-weight: 700;
    letter-spacing: -.01em; margin-bottom: .15rem;
  }
  .exp-company {
    font-family: var(--font-mono); font-size: .72rem;
    color: var(--accent); letter-spacing: .07em;
    text-transform: uppercase; margin-bottom: .9rem;
  }
  .exp-bullets { list-style: none; }
  .exp-bullets li {
    font-size: .85rem; color: var(--muted);
    line-height: 1.75; padding-left: 1rem;
    position: relative; margin-bottom: .35rem;
  }
  .exp-bullets li::before {
    content: '→'; position: absolute; left: 0;
    color: var(--accent); font-size: .75rem; top: .05rem;
  }
  .exp-highlight {
    display: inline-flex; align-items: center; gap: .3rem;
    background: rgba(192,57,43,.07); border: 1px solid rgba(192,57,43,.15);
    padding: .15rem .5rem; font-family: var(--font-mono);
    font-size: .68rem; color: var(--accent); margin-top: .5rem; margin-right: .4rem;
  }

  /* Skills */
  .skills-wrapper { max-width: 1000px; }
  .skills-category { margin-bottom: 2rem; }
  .skills-cat-title {
    font-family: var(--font-mono); font-size: .68rem;
    color: var(--muted); letter-spacing: .15em; text-transform: uppercase;
    margin-bottom: .8rem; display: flex; align-items: center; gap: .5rem;
  }
  .skills-cat-title::before { content: '//'; color: var(--accent); }
  .skills-chips { display: flex; flex-wrap: wrap; gap: .5rem; }
  .chip {
    font-family: var(--font-mono); font-size: .73rem;
    padding: .35rem .85rem;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--ink);
    letter-spacing: .03em;
    transition: border-color .2s, color .2s, background .2s, transform .15s;
  }
  .chip:hover {
    border-color: var(--accent); color: var(--accent);
    background: rgba(192,57,43,.04); transform: translateY(-2px);
  }

  /* Projects */
  #projects { background: var(--bg2); }
  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 2.2rem 2.4rem;
    position: relative; overflow: hidden;
    max-width: 800px;
    transition: transform .3s, box-shadow .3s, border-color .3s;
  }
  .project-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    height: 3px; width: 0;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    transition: width .4s;
  }
  .project-card:hover { transform: translateY(-3px); box-shadow: 6px 6px 0 var(--border); border-color: rgba(192,57,43,.3); }
  .project-card:hover::before { width: 100%; }
  .project-tag {
    font-family: var(--font-mono); font-size: .65rem;
    color: var(--accent); letter-spacing: .12em; text-transform: uppercase;
    margin-bottom: .8rem;
  }
  .project-card h3 {
    font-family: var(--font-display); font-size: 1.5rem; font-weight: 700;
    letter-spacing: -.02em; margin-bottom: .7rem;
  }
  .project-card p {
    font-size: .88rem; color: var(--muted);
    line-height: 1.8; margin-bottom: 1.4rem; max-width: 560px;
  }
  .project-stack-wrap { display: flex; flex-wrap: wrap; gap: .4rem; }
  .proj-chip {
    font-family: var(--font-mono); font-size: .68rem;
    padding: .2rem .6rem;
    background: rgba(192,57,43,.07);
    color: var(--accent);
    border: 1px solid rgba(192,57,43,.15);
    letter-spacing: .04em;
  }

  /* Education */
  .edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; max-width: 900px; }
  .edu-card {
    padding: 2rem; border: 1px solid var(--border); background: var(--surface);
    position: relative; transition: border-color .3s, transform .3s;
  }
  .edu-card:hover { border-color: var(--accent); transform: translateY(-3px); }
  .edu-degree {
    font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;
    letter-spacing: -.01em; margin-bottom: .3rem; line-height: 1.2;
  }
  .edu-school {
    font-family: var(--font-mono); font-size: .7rem;
    color: var(--accent); letter-spacing: .07em;
    text-transform: uppercase; margin-bottom: .5rem;
  }
  .edu-year {
    font-family: var(--font-mono); font-size: .7rem;
    color: var(--muted); letter-spacing: .05em;
  }

  /* Contact */
  #contact { background: var(--ink); color: #f0ebe3; }
  #contact .section-label { color: #e8622a; }
  #contact .section-label::after { background: #e8622a; }
  #contact .section-title { color: #f0ebe3; }
  #contact .section-title em { color: #e8622a; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; max-width: 1000px; }
  .contact-desc { font-family: var(--font-mono); font-size: .85rem; color: #9e9890; line-height: 1.9; }
  .contact-links { display: flex; flex-direction: column; gap: .8rem; }
  .contact-link {
    display: flex; align-items: center; gap: .8rem;
    padding: 1rem 1.4rem;
    border: 1px solid rgba(255,255,255,.08);
    color: #9e9890; font-family: var(--font-mono); font-size: .78rem;
    text-decoration: none; letter-spacing: .05em;
    transition: border-color .2s, color .2s, background .2s;
  }
  .contact-link:hover {
    border-color: #e8622a; color: #e8622a;
    background: rgba(232,98,42,.06);
  }
  .contact-link-icon { font-size: .8rem; width: 18px; text-align: center; }

  /* Footer */
  footer {
    background: #110e0c;
    padding: 1.8rem 4rem;
    display: flex; justify-content: space-between; align-items: center;
    border-top: 1px solid rgba(255,255,255,.06);
  }
  footer p {
    font-family: var(--font-mono); font-size: .68rem;
    color: #5a534e; letter-spacing: .05em;
  }

  /* Reveal */
  .reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 900px) {
    nav { padding: 1.2rem 1.5rem; }
    .nav-links { gap: 1.4rem; }
    .hero { grid-template-columns: 1fr; padding: 7rem 1.5rem 3rem; }
    .hero-right { display: none; }
    section { padding: 4rem 1.5rem; }
    .exp-item { grid-template-columns: 1fr; gap: .5rem; }
    .edu-grid { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    footer { flex-direction: column; gap: 1rem; padding: 1.5rem; }
    .hero-bg-text { display: none; }
  }
`;

const experience = [
  {
    period: "Jun 2021 – Aug 2023",
    location: "Gujarat, India",
    role: "Lead Software Developer",
    company: "Inventyv Software Services Pvt. Ltd.",
    bullets: [
      "Managed and mentored a development team of 5+ engineers throughout the full lifecycle of web application design and delivery.",
      "Architected scalable workflows and streamlined processes to accommodate evolving software development needs.",
      "Championed coding best practices and security protocols, raising quality bar across all web application projects.",
      "Collaborated closely with designers to translate business requirements into polished UI/UX solutions using Figma.",
    ],
    highlights: ["Team Lead", "5+ Engineers", "Figma"],
  },
  {
    period: "May 2018 – Jun 2021",
    location: "Gujarat, India",
    role: "Senior Software Developer",
    company: "I-Link Infosoft Pvt. Ltd.",
    bullets: [
      "Built full-stack features across US tax, healthcare, and CRM platforms using Angular, Node.js, JavaScript, and GCP.",
      "Reduced initial load times by 40% and improved rendering speed by 35% via AOT, Cache-First Serving, and lazy loading.",
      "Broke down large frontend apps into micro frontends using Web Components and Webpack 5 Module Federation.",
      "Integrated Billing Tree payment module enabling seamless payment processing for end users.",
    ],
    highlights: ["40% faster load", "35% render boost", "Micro frontends"],
  },
  {
    period: "May 2016 – May 2018",
    location: "Gujarat, India",
    role: "Software Developer",
    company: "I-Link Infosoft Pvt. Ltd.",
    bullets: [
      "Developed responsive, user-focused web interfaces using modern frontend frameworks and technologies.",
      "Migrated legacy AngularJS projects to Angular/TypeScript, reducing codebase issues by 40% and boosting performance 30%.",
      "Built RESTful APIs in a microservice architecture and collaborated across cross-functional teams.",
    ],
    highlights: ["AngularJS → Angular", "30% perf boost"],
  },
];

const skills = [
  { cat: "Languages", items: ["JavaScript", "TypeScript", "Java", "HTML5", "CSS3"] },
  { cat: "Frameworks & Libraries", items: ["Angular", "React", "Node.js", "Express.js", "Socket.io", "Bootstrap", "Material UI"] },
  { cat: "Architecture", items: ["Microservices", "Micro Frontends", "Web Components", "RESTful APIs", "OAuth 2.0", "Responsive Design"] },
  { cat: "Databases & Storage", items: ["MongoDB", "Couchbase", "Elasticsearch", "Kafka", "PostgreSQL", "IndexedDB", "Redis"] },
  { cat: "Tools & Platforms", items: ["Git", "GitHub", "Docker", "Kubernetes", "CI/CD", "Spinnaker", "Kibana", "Figma", "Postman"] },
  { cat: "Cloud", items: ["Google Cloud Platform (GCP)", "CDN", "Cloud Deployment"] },
];

export default function HeePortfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const ringTarget = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);

    const onMove = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
      ringTarget.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    const animRing = () => {
      setRing(prev => ({
        x: prev.x + (ringTarget.current.x - prev.x) * 0.13,
        y: prev.y + (ringTarget.current.y - prev.y) * 0.13,
      }));
      rafRef.current = requestAnimationFrame(animRing);
    };
    rafRef.current = requestAnimationFrame(animRing);

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    setTimeout(() => document.querySelectorAll(".reveal").forEach(el => obs.observe(el)), 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="cursor" style={{ left: cursor.x, top: cursor.y }} />
      <div className="cursor-ring" style={{ left: ring.x, top: ring.y }} />

      {/* Nav */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="logo">H<em>T</em></a>
        <ul className="nav-links">
          {["about","experience","skills","projects","contact"].map(s => (
            <li key={s}><a href={`#${s}`}>{s}</a></li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" id="about">
        <div className="hero-bg-text">HT</div>
        <div className="hero-left">
          <div className="hero-tag">Open to new opportunities · NYC</div>
          <h1>
            <span className="line"><span>Heena</span></span>
            <span className="line"><span><em>Tibadiya.</em></span></span>
          </h1>
          <p className="hero-role">// Software Engineer · 7+ years</p>
          <p className="hero-desc">
            I build scalable, high-performance web applications with a focus on clean architecture and exceptional user experience. Experienced in leading teams and shipping products that last.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => document.getElementById("experience").scrollIntoView({ behavior: "smooth" })}>
              View Experience
            </button>
            <button className="btn-secondary" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
              Get in touch
            </button>
          </div>
        </div>
        <div className="hero-right">
          <div className="id-card">
            <div className="id-card-name">Heena Tibadiya</div>
            <div className="id-card-title">Software Engineer</div>
            <div className="id-card-divider" />
            <div className="id-card-row">
              <span className="id-card-row-icon">📍</span>
              <span className="id-card-row-val">New York, NY</span>
            </div>
            <div className="id-card-row">
              <span className="id-card-row-icon">✉</span>
              <span className="id-card-row-val">
                <a href="mailto:tibadiyaheena1994@gmail.com">tibadiyaheena1994@gmail.com</a>
              </span>
            </div>
            <div className="id-card-row">
              <span className="id-card-row-icon">in</span>
              <span className="id-card-row-val">
                <a href="https://linkedin.com/in/heena-tibadiya" target="_blank" rel="noreferrer">linkedin.com/in/heena-tibadiya</a>
              </span>
            </div>
            <div className="id-card-row">
              <span className="id-card-row-icon">🎓</span>
              <span className="id-card-row-val">MS Computer Science, CUNY (Dec 2025)</span>
            </div>
            <div className="id-exp-badge">
              <span className="id-exp-num">7+</span>
              <span className="id-exp-label">years of<br />experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <div className="section-label reveal">Career</div>
        <h2 className="section-title reveal" style={{ transitionDelay: ".05s" }}>Work <em>Experience</em></h2>
        <div className="exp-list">
          {experience.map((e, i) => (
            <div className="exp-item reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="exp-period">
                <strong>{e.role.split(" ")[0]}</strong>
                {e.period}<br />
                <span style={{ fontSize: ".65rem", color: "var(--muted)" }}>{e.location}</span>
              </div>
              <div className="exp-body">
                <h3>{e.role}</h3>
                <div className="exp-company">{e.company}</div>
                <ul className="exp-bullets">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <div style={{ marginTop: ".8rem" }}>
                  {e.highlights.map(h => <span className="exp-highlight" key={h}>↑ {h}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" style={{ background: "var(--bg2)" }}>
        <div className="section-label reveal">Tech Stack</div>
        <h2 className="section-title reveal" style={{ transitionDelay: ".05s" }}>Skills &amp; <em>Technologies</em></h2>
        <div className="skills-wrapper">
          {skills.map((s, i) => (
            <div className="skills-category reveal" key={s.cat} style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="skills-cat-title">{s.cat}</div>
              <div className="skills-chips">
                {s.items.map(it => <span className="chip" key={it}>{it}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <div className="section-label reveal">Portfolio</div>
        <h2 className="section-title reveal" style={{ transitionDelay: ".05s" }}>Featured <em>Project</em></h2>
        <div className="project-card reveal" style={{ transitionDelay: ".1s" }}>
          <div className="project-tag">AI · Full Stack</div>
          <h3>Agentic AI Resume Screening & Feedback System</h3>
          <p>
            A full-stack AI web application that evaluates resumes against job descriptions using a three-agent pipeline (Parser → Matching → Feedback). Generates a transparent match score and actionable resume improvement suggestions — helping candidates land the right roles faster.
          </p>
          <div className="project-stack-wrap">
            {["React.js", "Node.js", "LangChain.js", "Llama 3.2"].map(t => (
              <span className="proj-chip" key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" style={{ background: "var(--bg2)" }}>
        <div className="section-label reveal">Academic</div>
        <h2 className="section-title reveal" style={{ transitionDelay: ".05s" }}>Education</h2>
        <div className="edu-grid">
          {[
            {
              degree: "MS in Computer Science",
              school: "City University of New York (CUNY)",
              year: "December 2025 · New York, NY",
            },
            {
              degree: "BSc & MSc in Computer Applications & IT",
              school: "K S School of Business Management, Gujarat University",
              year: "April 2016 · Ahmedabad, India",
            },
          ].map((ed, i) => (
            <div className="edu-card reveal" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="edu-degree">{ed.degree}</div>
              <div className="edu-school">{ed.school}</div>
              <div className="edu-year">{ed.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="contact-grid">
          <div>
            <div className="section-label reveal">Let's connect</div>
            <h2 className="section-title reveal" style={{ transitionDelay: ".05s" }}>Available for<br /><em>new roles.</em></h2>
            <p className="contact-desc reveal" style={{ transitionDelay: ".12s" }}>
              I'm actively seeking new opportunities in software engineering. If you're looking for someone who brings both technical depth and leadership experience, I'd love to hear from you.
            </p>
          </div>
          <div className="contact-links reveal" style={{ transitionDelay: ".18s" }}>
            {[
              { icon: "✉", label: "tibadiyaheena1994@gmail.com", href: "mailto:tibadiyaheena1994@gmail.com" },
              { icon: "📞", label: "(848) 467-6093", href: "tel:8484676093" },
              { icon: "in", label: "linkedin.com/in/heena-tibadiya", href: "https://linkedin.com/in/heena-tibadiya" },
              { icon: "📍", label: "New York, NY", href: "#" },
            ].map(l => (
              <a key={l.label} href={l.href} className="contact-link" target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                <span className="contact-link-icon">{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Heena Tibadiya. All rights reserved.</p>
        <p>Built with React · Designed with care.</p>
      </footer>
    </>
  );
}
