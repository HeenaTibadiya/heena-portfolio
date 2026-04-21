const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy:   #0f172a;
    --dark:   #1e293b;
    --mid:    #334155;
    --teal:   #0ea5e9;
    --teal2:  #06b6d4;
    --green:  #34d399;
    --text:   #e2e8f0;
    --muted:  #94a3b8;
    --card:   #1e293b;
    --border: rgba(255,255,255,0.07);
    --radius: 14px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background: var(--navy);
    color: var(--text);
    line-height: 1.6;
  }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem;
    height: 60px;
    background: rgba(15,23,42,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-weight: 700; font-size: 1.1rem;
    background: linear-gradient(90deg, var(--teal), var(--green));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .nav-links { display: flex; gap: 1.8rem; list-style: none; }
  .nav-links a {
    color: var(--muted); text-decoration: none; font-size: 0.9rem;
    transition: color .2s;
  }
  .nav-links a:hover { color: var(--teal); }

  section { padding: 5rem 0; }
  .container { max-width: 1080px; margin: 0 auto; padding: 0 1.5rem; }

  .section-label {
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em;
    color: var(--teal); text-transform: uppercase; margin-bottom: 0.5rem;
  }
  .section-title {
    font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 800;
    color: #f1f5f9; margin-bottom: 2.5rem;
  }
  .section-title span {
    background: linear-gradient(90deg, var(--teal), var(--green));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }

  #hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding-top: 60px;
    background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(14,165,233,0.15), transparent);
  }
  .hero-inner {
    display: grid; grid-template-columns: 1fr auto; gap: 3rem; align-items: center;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.85rem; color: var(--teal); font-weight: 600;
    margin-bottom: 1rem;
  }
  .hero-eyebrow::before {
    content: ''; display: block; width: 28px; height: 2px;
    background: var(--teal);
  }
  h1 {
    font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 900;
    line-height: 1.1; color: #f8fafc; margin-bottom: 0.5rem;
  }
  h1 span {
    background: linear-gradient(90deg, var(--teal), var(--green));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .hero-role {
    font-size: 1.25rem; color: var(--muted); margin-bottom: 1.2rem;
  }
  .hero-summary {
    color: var(--muted); font-size: 1rem; max-width: 560px;
    margin-bottom: 2rem; line-height: 1.75;
  }
  .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.65rem 1.4rem; border-radius: 8px;
    font-size: 0.9rem; font-weight: 600; text-decoration: none;
    transition: all .2s; cursor: pointer; border: none;
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--teal), var(--teal2));
    color: #fff;
  }
  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
  .btn-outline {
    background: transparent;
    border: 1px solid rgba(14,165,233,0.4);
    color: var(--teal);
  }
  .btn-outline:hover { background: rgba(14,165,233,0.1); transform: translateY(-1px); }

  .hero-avatar {
    width: 200px; height: 200px; border-radius: 50%;
    background: linear-gradient(135deg, #0f3460, #147b8d);
    display: flex; align-items: center; justify-content: center;
    font-size: 4.5rem; font-weight: 900; color: #fff;
    flex-shrink: 0;
    box-shadow: 0 0 0 4px rgba(14,165,233,0.2), 0 0 60px rgba(14,165,233,0.15);
  }

  .hero-contact {
    display: flex; gap: 1.4rem; flex-wrap: wrap;
    margin-top: 2rem;
  }
  .hero-contact a {
    display: flex; align-items: center; gap: 0.4rem;
    color: var(--muted); text-decoration: none; font-size: 0.85rem;
    transition: color .2s;
  }
  .hero-contact a:hover { color: var(--teal); }

  #skills { background: var(--dark); }
  .skills-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.2rem;
  }
  .skill-card {
    background: var(--navy); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 1.3rem 1.5rem;
  }
  .skill-card-title {
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--teal); margin-bottom: 0.9rem;
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .tag {
    background: rgba(14,165,233,0.1); border: 1px solid rgba(14,165,233,0.2);
    color: var(--text); font-size: 0.8rem; padding: 0.3rem 0.75rem;
    border-radius: 999px;
  }
  .tag.green {
    background: rgba(52,211,153,0.1); border-color: rgba(52,211,153,0.25);
    color: var(--green);
  }
  .tag.purple {
    background: rgba(167,139,250,0.1); border-color: rgba(167,139,250,0.25);
    color: #a78bfa;
  }

  .timeline { display: flex; flex-direction: column; gap: 1.5rem; }
  .tl-item {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 1.6rem 1.8rem;
    position: relative; overflow: hidden;
    transition: border-color .2s, transform .2s;
  }
  .tl-item:hover { border-color: rgba(14,165,233,0.35); transform: translateY(-2px); }
  .tl-item::before {
    content: ''; position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: linear-gradient(180deg, var(--teal), var(--green));
    border-radius: 3px 0 0 3px;
  }
  .tl-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.4rem; }
  .tl-role { font-size: 1.05rem; font-weight: 700; color: #f1f5f9; }
  .tl-period {
    font-size: 0.78rem; font-weight: 600; color: var(--teal);
    background: rgba(14,165,233,0.1); padding: 0.2rem 0.7rem;
    border-radius: 999px; white-space: nowrap;
  }
  .tl-company { font-size: 0.88rem; color: var(--muted); margin-bottom: 1rem; }
  .tl-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
  .tl-bullets li { display: flex; gap: 0.7rem; font-size: 0.9rem; color: var(--muted); }
  .tl-bullets li::before {
    content: '▸'; color: var(--teal); flex-shrink: 0; margin-top: 1px;
  }

  #project { background: var(--dark); }
  .project-card {
    background: var(--navy); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 2rem 2.2rem;
    display: grid; grid-template-columns: 1fr auto; gap: 1.5rem; align-items: start;
  }
  .project-title { font-size: 1.2rem; font-weight: 800; color: #f1f5f9; margin-bottom: 0.4rem; }
  .project-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
  .project-desc { color: var(--muted); font-size: 0.92rem; line-height: 1.75; }
  .project-badge {
    background: linear-gradient(135deg, rgba(14,165,233,0.2), rgba(52,211,153,0.15));
    border: 1px solid rgba(14,165,233,0.3);
    border-radius: 12px; padding: 1rem 1.2rem;
    text-align: center; min-width: 110px;
  }
  .project-badge-label { font-size: 0.7rem; color: var(--muted); margin-bottom: 0.3rem; }
  .project-badge-value { font-size: 1.8rem; font-weight: 900; color: var(--teal); }

  .edu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem; }
  .edu-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 1.5rem;
  }
  .edu-degree { font-size: 1rem; font-weight: 700; color: #f1f5f9; margin-bottom: 0.3rem; }
  .edu-school { font-size: 0.88rem; color: var(--teal); margin-bottom: 0.3rem; }
  .edu-date { font-size: 0.82rem; color: var(--muted); }

  #contact {
    background: radial-gradient(ellipse 70% 50% at 50% 100%, rgba(14,165,233,0.1), transparent);
    text-align: center;
  }
  .contact-links { display: flex; justify-content: center; gap: 1.2rem; flex-wrap: wrap; margin-top: 2rem; }
  .contact-chip {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: var(--card); border: 1px solid var(--border);
    border-radius: 999px; padding: 0.55rem 1.2rem;
    color: var(--text); text-decoration: none; font-size: 0.88rem;
    transition: all .2s;
  }
  .contact-chip:hover { border-color: rgba(14,165,233,0.4); color: var(--teal); transform: translateY(-2px); }

  footer {
    text-align: center; padding: 1.5rem;
    color: var(--muted); font-size: 0.82rem;
    border-top: 1px solid var(--border);
  }

  @media (max-width: 700px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-avatar { width: 120px; height: 120px; font-size: 2.8rem; order: -1; }
    .project-card { grid-template-columns: 1fr; }
    .nav-links { display: none; }
  }
`;

const markup = `
<!-- NAV -->
<nav>
  <span class="nav-logo">HT</span>
  <ul class="nav-links">
    <li><a href="#skills">Skills</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#project">Project</a></li>
    <li><a href="#education">Education</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<!-- HERO -->
<section id="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <span class="hero-eyebrow">Available for opportunities</span>
        <h1>Heena<br /><span>Tibadiya</span></h1>
        <p class="hero-role">Software Developer &amp; Engineering Lead</p>
        <p class="hero-summary">
          7+ years building scalable, high-performance web applications across healthcare,
          finance, and CRM domains. Deep expertise in React, Angular, Node.js, and Python -
          with hands-on experience in AI/LLM agentic systems.
        </p>
        <div class="hero-cta">
          <a href="#contact" class="btn btn-primary">Get in touch</a>
          <a href="#experience" class="btn btn-outline">View experience</a>
          <a href="/Heena_Tibadiya_Resume.pdf" class="btn btn-outline" download>Download Resume</a>
        </div>
        <div class="hero-contact">
          <a href="mailto:tibadiyaheena1994@gmail.com">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 7l10 7 10-7"></path></svg>
            tibadiyaheena1994@gmail.com
          </a>
          <a href="tel:8484676093">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.08 2.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
            (848) 467-6093
          </a>
          <a href="https://linkedin.com/in/heena-tibadiya" target="_blank" rel="noopener">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            linkedin.com/in/heena-tibadiya
          </a>
          <a href="#">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            New York, NY
          </a>
        </div>
      </div>
      <div class="hero-avatar">HT</div>
    </div>
  </div>
</section>

<!-- SKILLS -->
<section id="skills">
  <div class="container">
    <p class="section-label">What I work with</p>
    <h2 class="section-title">Technical <span>Skills</span></h2>
    <div class="skills-grid">
      <div class="skill-card">
        <div class="skill-card-title">Languages</div>
        <div class="skill-tags">
          <span class="tag">JavaScript (ES6+)</span>
          <span class="tag">TypeScript</span>
          <span class="tag">Python</span>
          <span class="tag">Java</span>
          <span class="tag">HTML5</span>
          <span class="tag">CSS3</span>
        </div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Frameworks &amp; Libraries</div>
        <div class="skill-tags">
          <span class="tag">React</span>
          <span class="tag">Angular</span>
          <span class="tag">Node.js</span>
          <span class="tag">Express.js</span>
          <span class="tag">FastAPI</span>
          <span class="tag">Socket.io</span>
          <span class="tag">Bootstrap</span>
          <span class="tag">Material UI</span>
          <span class="tag">LangChain.js</span>
        </div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Architecture</div>
        <div class="skill-tags">
          <span class="tag purple">Micro-frontends</span>
          <span class="tag purple">Microservices</span>
          <span class="tag purple">Web Components</span>
          <span class="tag purple">Module Federation</span>
          <span class="tag purple">RESTful APIs</span>
          <span class="tag purple">OAuth 2.0</span>
          <span class="tag purple">Responsive Design</span>
        </div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Databases &amp; Messaging</div>
        <div class="skill-tags">
          <span class="tag">MongoDB</span>
          <span class="tag">Couchbase</span>
          <span class="tag">SQL</span>
          <span class="tag">Elasticsearch</span>
          <span class="tag">Kafka</span>
          <span class="tag">IndexedDB</span>
          <span class="tag">Minio</span>
        </div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">Cloud &amp; DevOps</div>
        <div class="skill-tags">
          <span class="tag green">GCP</span>
          <span class="tag green">AWS</span>
          <span class="tag green">Docker</span>
          <span class="tag green">Kubernetes</span>
          <span class="tag green">CI/CD</span>
          <span class="tag green">Spinnaker</span>
          <span class="tag green">Kibana</span>
          <span class="tag green">CDN</span>
        </div>
      </div>
      <div class="skill-card">
        <div class="skill-card-title">AI / ML</div>
        <div class="skill-tags">
          <span class="tag green">LLMs</span>
          <span class="tag green">Agentic Workflows</span>
          <span class="tag green">LangChain.js</span>
          <span class="tag green">Llama 3.2</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- EXPERIENCE -->
<section id="experience">
  <div class="container">
    <p class="section-label">Career history</p>
    <h2 class="section-title">Professional <span>Experience</span></h2>
    <div class="timeline">
      <div class="tl-item">
        <div class="tl-header">
          <span class="tl-role">Lead Software Developer</span>
          <span class="tl-period">Jun 2021 - Aug 2023</span>
        </div>
        <div class="tl-company">Inventyv Software Services Pvt. Ltd. - Gujarat, India</div>
        <ul class="tl-bullets">
          <li>Led and mentored a team of 5+ engineers across the full development lifecycle - from architecture planning through production delivery - ensuring on-time, high-quality releases.</li>
          <li>Designed and implemented scalable frontend architectures and workflows to support evolving product requirements and growing engineering teams.</li>
          <li>Established and enforced coding standards, security protocols, and code review practices, measurably raising quality and reducing defect rates.</li>
          <li>Evaluated and integrated emerging technologies into project roadmaps, fostering a culture of continuous learning and innovation.</li>
          <li>Partnered with product and design teams to translate complex business requirements into intuitive UI/UX solutions using Figma and modern frontend frameworks.</li>
        </ul>
      </div>

      <div class="tl-item">
        <div class="tl-header">
          <span class="tl-role">Senior Software Developer</span>
          <span class="tl-period">May 2018 - Jun 2021</span>
        </div>
        <div class="tl-company">I-Link Infosoft Pvt. Ltd. - Gujarat, India</div>
        <ul class="tl-bullets">
          <li>Architected and delivered full-stack features across US tax, healthcare, and CRM platforms using Angular, React, Node.js, Python (FastAPI), TypeScript, Couchbase, SQL, GCP, and AWS.</li>
          <li>Achieved 40% reduction in load times and 35% improvement in rendering speed via AOT Compilation, Cache-First Serving, and lazy loading.</li>
          <li>Decomposed large monolithic frontends into micro-frontends using Web Components and Webpack 5 Module Federation, enabling parallel team development.</li>
          <li>Integrated a Billing Tree payment module enabling reliable end-to-end payment processing for thousands of users.</li>
          <li>Collaborated with DevOps to deploy and monitor applications on GCP and AWS, leveraging Kibana for real-time observability.</li>
        </ul>
      </div>

      <div class="tl-item">
        <div class="tl-header">
          <span class="tl-role">Software Developer</span>
          <span class="tl-period">May 2016 - May 2018</span>
        </div>
        <div class="tl-company">I-Link Infosoft Pvt. Ltd. - Gujarat, India</div>
        <ul class="tl-bullets">
          <li>Developed responsive, accessible web interfaces using modern frontend frameworks within a microservice architecture.</li>
          <li>Led migration of legacy AngularJS to latest Angular with TypeScript, reducing codebase issues by 40% and improving performance by 30%.</li>
          <li>Built and maintained RESTful APIs using Node.js and Python (FastAPI) in collaboration with cross-functional backend teams.</li>
          <li>Participated across the full SDLC - requirements gathering, UI design, development, QA, and deployment.</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- FEATURED PROJECT -->
<section id="project">
  <div class="container">
    <p class="section-label">Featured work</p>
    <h2 class="section-title">AI <span>Project</span></h2>
    <div class="project-card">
      <div>
        <div class="project-title">Agentic AI Resume Screening &amp; Feedback System</div>
        <div class="project-stack">
          <span class="tag">React.js</span>
          <span class="tag">Node.js</span>
          <span class="tag green">LangChain.js</span>
          <span class="tag green">Llama 3.2</span>
          <span class="tag purple">Agentic Pipeline</span>
        </div>
        <p class="project-desc">
          Designed and built a full-stack AI web application that evaluates resumes against job
          descriptions using a three-agent pipeline - <strong style="color:#e2e8f0">Parser -&gt; Matching -&gt; Feedback</strong>.
          The system generates a transparent match score with actionable improvement suggestions,
          showcasing applied expertise in LLMs, agentic workflows, and modern full-stack development.
          Features real-time SSE agent status updates, PDF &amp; Word export, and a responsive two-column UI.
        </p>
      </div>
      <div class="project-badge">
        <div class="project-badge-label">Pipeline Agents</div>
        <div class="project-badge-value">3</div>
        <div style="font-size:0.7rem;color:var(--muted);margin-top:0.4rem">Parser - Matching - Feedback</div>
      </div>
    </div>
  </div>
</section>

<!-- EDUCATION -->
<section id="education">
  <div class="container">
    <p class="section-label">Academic background</p>
    <h2 class="section-title">Education</h2>
    <div class="edu-grid">
      <div class="edu-card">
        <div class="edu-degree">MS in Computer Science</div>
        <div class="edu-school">City University of New York (CUNY)</div>
        <div class="edu-date">New York, NY &nbsp;·&nbsp; Expected May 2026</div>
      </div>
      <div class="edu-card">
        <div class="edu-degree">BSc &amp; MSc in Computer Applications &amp; IT</div>
        <div class="edu-school">K S School of Business Management, Gujarat University</div>
        <div class="edu-date">Ahmedabad, India &nbsp;·&nbsp; April 2016</div>
      </div>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="container">
    <p class="section-label">Let's connect</p>
    <h2 class="section-title">Get in <span>Touch</span></h2>
    <p style="color:var(--muted);max-width:480px;margin:0 auto;">
      Open to full-stack engineering roles in New York / hybrid. Feel free to reach out via email or LinkedIn.
    </p>
    <div class="contact-links">
      <a class="contact-chip" href="mailto:tibadiyaheena1994@gmail.com">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M2 7l10 7 10-7"></path></svg>
        tibadiyaheena1994@gmail.com
      </a>
      <a class="contact-chip" href="tel:8484676093">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.08 2.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"></path></svg>
        (848) 467-6093
      </a>
      <a class="contact-chip" href="https://linkedin.com/in/heena-tibadiya" target="_blank" rel="noopener">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        LinkedIn
      </a>
      <a class="contact-chip" href="/Heena_Tibadiya_Resume.pdf" download>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="12" y2="18"></line><line x1="15" y1="15" x2="12" y2="18"></line></svg>
        Download Resume
      </a>
    </div>
  </div>
</section>

<footer>
  <p>© 2026 Heena Tibadiya &nbsp;·&nbsp; Built with HTML, CSS &amp; care</p>
</footer>
`;

export default function App() {
  return (
    <>
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </>
  );
}
