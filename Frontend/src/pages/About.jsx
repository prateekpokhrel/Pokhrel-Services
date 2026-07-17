import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import github  from '../assets/github.webp'
import linkedin from '../assets/linkedin.png'
import emailImg from '../assets/email.png'
import resume  from '../assets/resume.png'
import pp from '../assets/about.jpeg'

/* ─────────────────────────── DATA ─────────────────────────── */

const skills = {
  backend: [
    { name: 'Java',        pct: 95, color: '#f89820' }, // Java Orange
    { name: 'Spring Boot', pct: 90, color: '#6db33f' }, // Spring Green
    { name: 'PostgreSQL',  pct: 85, color: '#336791' }, // PostgreSQL Blue
    { name: 'MySQL',     pct: 80, color: '#47a248' }, // MySQL Green
    { name: 'REST APIs',   pct: 92, color: '#00a8e8' }, // API Blue
  ],
  frontend: [
    { name: 'React.js',          pct: 88, color: '#61dafb' }, // React Blue
    { name: 'JavaScript',        pct: 88, color: '#f7df1e' }, // JS Yellow
    { name: 'HTML5',             pct: 80, color: '#e34c26' }, // HTML5 Orange
    { name: 'CSS3',              pct: 78, color: '#264de4' }, // CSS3 Blue
    { name: 'Tailwind CSS',       pct: 75, color: '#38bdf8' }, // Tailwind Blue
  ],
  AI:[
    { name: 'Python',        pct: 85, color: '#306998' }, // Python Blue
    { name: 'Time Series Forecasting',    pct: 75, color: '#ff6f00' }, // TensorFlow Orange
    { name: 'Machine Learning',    pct: 80, color: '#f89820' }, // ML Orange

    
  ]
}

const tools = [
  "Git", "GitHub", "AWS", "MongoDB Compass", "Vite", "JUnit",
  "Swagger", "Postman", "VS Code", "Google Colab", "ML Models",
  "Windows", "Linux"
]

const traits = [
  { title: "Systems Thinking",    desc: "Designing from the ground up data models, API contracts, service boundaries, and how they interact under load." },
  { title: "Continuous Learning", desc: "Currently deepening expertise in AI/ML, cloud-native architectures, and distributed system design." },
  { title: "Code Quality",        desc: "Writing for the next developer. Clean, documented, tested. Technical debt is always a deliberate choice." },
  { title: "Impact-Oriented",     desc: "Engineering decisions should serve real users. Every feature asks: does this make the product better?" },
]

const interests = [
  { icon: <i className="fa-solid fa-robot" />,          label: 'AI Research'  },
  { icon: <i className="fa-solid fa-dumbbell" />,       label: 'Gym'          },
  { icon: <i className="fa-solid fa-person-hiking" />,  label: 'Trekking'     },
  { icon: <i className="fa-solid fa-chess" />,          label: 'Chess'        },
  { icon: <i className="fa-solid fa-music" />,          label: 'Music'        },
  { icon: <i className="fa-solid fa-earth-americas" />, label: 'Open Source'  },
]

const socials = [
  { img: github,   label: 'GitHub',   href: 'https://github.com/prateekpokhrel' },
  { img: linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/pokhrelpratik/' },
  { img: emailImg, label: 'Email',    href: 'mailto:itspratikpok@email.com' },
  { img: resume,   label: 'Resume',   href: 'https://drive.google.com/file/d/10ol7vDDbs-SS9X07O-WaRghbCdB1vu4C/view?usp=sharing' },
]

const funFacts = [
  { ico: <i className="fa-solid fa-flag-checkered" />,    text: 'MLH Hackathon finalist - AI Smart City Issue Solver (Google Gemini + Unstop @ KIIT)' },
  { ico: <i className="fa-solid fa-compass-drafting" />,  text: 'Designed SEGA - a governance system adopted as part of SUIS architecture' },
  { ico: <i className="fa-solid fa-chart-line" />,        text: 'Building Kavout - stock AI with sub-1% forecast error on NSE data' },
]

const stats = [['4th','Year'],['4+','Projects'],['7.73','CGPA'],['16+','Certs']]

const highlightTags = ['SUIS / SEGA','Kavout (AI Stocks)','MLH Hackathon','Backend Architecture','AI/ML','Spring Boot']

/* ─────────────────────────── SCROLL REVEAL ─────────────────────────── */

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setInView(true); return }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.unobserve(el)
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return [ref, inView]
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`reveal-item${inView ? ' is-in' : ''}${className ? ' ' + className : ''}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

function SkillMeter({ name, pct, color, delay = 0 }) {
  const [ref, inView] = useInView(0.4)
  return (
    <div className="meter" ref={ref}>
      <div className="meter-head">
        <span className="meter-name">{name}</span>
        <span className="meter-pct" style={{ color: inView ? color : 'var(--t3)', transition: 'color 0.5s ease' }}>
          {inView ? pct : 0}%
        </span>
      </div>
      <div className="meter-track">
        <div
          className="meter-fill"
          style={{ 
            width: inView ? `${pct}%` : '0%', 
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg, ${color}66, ${color})`,
            boxShadow: inView ? `0 0 12px ${color}40` : 'none'
          }}
        />
      </div>
    </div>
  )
}

function useTilt() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (prefersReduced || isCoarse) return

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width - 0.5
      const py = (e.clientY - r.top) / r.height - 0.5
      el.style.transform = `perspective(600px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) scale(1.02)`
    }
    const onLeave = () => { el.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)' }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  return ref
}

/* ─────────────────────────── HELPERS ─────────────────────────── */

const SectionIcon = ({ children }) => (
  <div className="section-icon">{children}</div>
)

const SectionHead = ({ icon, title }) => (
  <div className="section-head">
    <SectionIcon>{icon}</SectionIcon>
    <span className="section-head-title">{title}</span>
  </div>
)

const MonoLabel = ({ children }) => (
  <div className="mono-label">{children}</div>
)

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function About() {
  useReveal()
  const navigate = useNavigate()
  const tiltRef = useTilt()

  return (
    <div className="page-wrapper about-page">
      <style>{aboutStyles}</style>

      {/* ══ PAGE HEADER ══ */}
      <Reveal as="div" className="sec-header about-page-header">
        <div>
          <div className="sec-label">01 / ABOUT</div>
          <div className="sec-title">Who I Am</div>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/education')}>
          Education
          <i className="fa-solid fa-arrow-right-long about-btn-arrow"></i>
        </button>
      </Reveal>

      {/* ROW 1 — Profile Card + Introduction */}
      <div className="about-hero-grid">

        {/* ── Profile Card ── */}
        <Reveal className="card profile-card" delay={0}>
          <div className="avatar-shell" ref={tiltRef}>
            <div className="avatar-ring" />
            <img
              src={pp}
              alt="Pratik Pokhrel"
              className="avatar-img"
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.classList.add('avatar-fallback')
                e.currentTarget.parentElement.innerHTML += '<span class="avatar-fallback-text">PP</span>'
              }}
            />
          </div>

          <div className="profile-name">Pratik Pokhrel</div>
          <div className="profile-role">Java Full Stack Developer</div>

          <div className="uni-chip">
            <span className="uni-dot" />
            KIIT Deemed to be University
          </div>

          <div className="stats-grid">
            {stats.map(([n, l], i) => (
              <div key={l} className="stat-box" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>

          <div className="divider-line" />

          <div className="socials-row">
            {socials.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                title={s.label}
                className="social-btn"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img src={s.img} alt={s.label} className="social-img" />
              </a>
            ))}
          </div>
        </Reveal>

        {/* ── Introduction ── */}
        <Reveal className="card intro-card" delay={90}>
          <div className="intro-inner">
            <div className="intro-title">Introduction</div>

            <p className="intro-p">
              I'm <strong>Pratik Pokhrel</strong>, a Java Full Stack Developer
              and AI enthusiast pursuing Computer Science and Engineering at
              <strong> KIIT Deemed to be University </strong>
              (CGPA 7.73, 6th semester (SCGPA 9.08)). I believe that
              <strong> practical knowledge should lead theoretical learning</strong>.
              For me, real understanding comes from building systems, experimenting
              with ideas, and deploying solutions that work in real-world environments
              rather than existing only as academic concepts.
            </p>

            <p className="intro-p">
              My flagship work is
              <strong> SUIS (Smart University Intelligence System)</strong>,
              an AI-enabled platform designed to replace legacy SAP systems. Within it I
              built <strong>SEGA</strong>, a centralized emergency-governance architecture
              covering incident reporting, hierarchical escalation, real-time visibility,
              and safety compliance that complies with role-based access control and data
              privacy standards.
            </p>

            <p className="intro-p">
              I'm currently building <strong>Kavout</strong>, an AI-powered time-series
              stock forecasting platform designed specifically for the
              <strong> Indian Stock Market</strong>. The system analyzes historical and
              real-time data of companies listed on the
              <strong> National Stock Exchange (NSE)</strong> to generate predictive
              insights across multiple horizons — including 1-day, 15-day, and 30-day
              forecasts. The platform aims to achieve prediction accuracy within a sub-1%
              error range and integrates a built-in <strong>paper-trading engine</strong>,
              allowing users to test strategies and simulate trading decisions without
              real financial risk.
            </p>

            <p className="intro-p">
              My core interests lie at the intersection of
              <strong> backend engineering, frontend design, system architecture, and AI
              integration</strong>. I focus on building scalable backend services,
              intuitive user interfaces, and intelligent systems that transform raw data
              into meaningful insights. I believe impactful products emerge where solid
              engineering principles, efficient architecture, and innovative
              problem-solving converge.
            </p>
          </div>

          <div className="highlight-tags">
            {highlightTags.map((tag, i) => (
              <span key={tag} className="tag-chip" style={{ transitionDelay: `${i * 50}ms` }}>
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ══ ROW 2 — Skills  |  Tools + Career Goal ══ */}
      <div className="about-skills-grid">

        {/* ── Technical Skills ── */}
        <Reveal className="card skills-card" delay={0}>
          <SectionHead
            icon={<i className="fa-solid fa-laptop-code" style={{ color: 'rgb(255,212,59)' }} />}
            title="Technical Skills"
          />

          {/* Animated proficiency meters */}
          <div className="meters-wrap">
            <div>
              <MonoLabel>Frontend Proficiency</MonoLabel>
              {skills.frontend.map((s, i) => (
                <SkillMeter key={s.name} name={s.name} pct={s.pct} color={s.color} delay={i * 90} />
              ))}
            </div>
            <div>
              <MonoLabel>Backend Proficiency</MonoLabel>
              {skills.backend.map((s, i) => (
                <SkillMeter key={s.name} name={s.name} pct={s.pct} color={s.color} delay={i * 90} />
              ))}
            </div>
            <div>
              <MonoLabel>AI Proficiency</MonoLabel>
              {skills.AI.map((s, i) => (
                <SkillMeter key={s.name} name={s.name} pct={s.pct} color={s.color} delay={i * 90} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Tools & Career Goal stacked ── */}
        <div className="tools-goal-col">

          <Reveal className="card tools-card" delay={80}>
            <SectionHead
              icon={<i className="fa-solid fa-code" style={{ color: 'rgb(255,212,59)' }} />}
              title="Tools I Use"
            />
            <div className="tools-wrap">
              {tools.map((t, i) => (
                <span
                  key={t}
                  className={`chip ${i < 4 ? 'chip-active' : ''}`}
                  style={{ transitionDelay: `${i * 35}ms` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="card goal-card" delay={140}>
            <SectionHead
              icon={<i className="fa-solid fa-font-awesome" style={{ color: 'rgb(255,212,59)' }} />}
              title="Career Goal"
            />
            <p className="goal-text">
              Targeting a product-focused engineering team where I can architect scalable
              backend systems, ship AI-integrated features, and grow into a senior
              full-stack or systems engineering role.
            </p>
            <div className="goal-badges">
              <span className="badge badge-blue">
                <span className="pulse-dot" />
                Full-Time; Remote / On-site
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══ ROW 3 — What Drives Me  |  Beyond Code ══ */}
      <div className="about-bottom-grid">

        {/* ── What Drives Me ── */}
        <Reveal className="card drives-card" delay={0}>
          <SectionHead
            icon={<i className="fa-solid fa-circle-check" style={{ color: 'rgb(255,212,59)' }} />}
            title="What Drives Me"
          />
          <div className="traits-list">
            {traits.map((t, i) => (
              <div key={t.title} className="trait-row" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="trait-dot" />
                <div className="trait-copy">
                  <span className="trait-title">{t.title}:</span>
                  <span className="trait-desc">{t.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ── Beyond Code ── */}
        <Reveal className="card beyond-card" delay={80}>
          <SectionHead
            icon={<i className="fa-solid fa-user-secret" style={{ color: 'rgb(255,212,59)' }} />}
            title="Beyond Code"
          />

          <div className="interests-grid">
            {interests.map((it, i) => (
              <div key={it.label} className="interest-box" style={{ transitionDelay: `${i * 55}ms` }}>
                <span className="interest-icon">{it.icon}</span>
                <span className="interest-label">{it.label}</span>
              </div>
            ))}
          </div>

          <div className="facts-strip">
            {funFacts.map((f, idx) => (
              <div key={idx} className="fact-row" style={{ transitionDelay: `${idx * 90}ms` }}>
                <span className="fact-icon">{f.ico}</span>
                <span className="fact-text">{f.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

    </div>
  )
}

/* ─────────────────────────── STYLES ─────────────────────────── */

const aboutStyles = `
.about-page { --gap: clamp(14px, 2.4vw, 20px); }

/* ---- generic reusable pieces ---- */
.about-page .card {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: 14px;
  padding: clamp(18px, 3vw, 28px);
}

.about-page .section-icon {
  width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
  background: var(--pdim); border: 1px solid rgba(91,141,238,0.15);
  display: flex; align-items: center; justify-content: center; font-size: 16px;
}
.about-page .section-head { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.about-page .section-head-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; color: var(--t1); }
.about-page .mono-label {
  font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--t3);
  letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px;
}

/* ---- scroll reveal ---- */
.about-page .reveal-item {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity .7s cubic-bezier(.22,.68,0,1.01), transform .7s cubic-bezier(.22,.68,0,1.01);
  will-change: opacity, transform;
}
.about-page .reveal-item.is-in { opacity: 1; transform: translateY(0); }

.about-page .stat-box,
.about-page .social-btn,
.about-page .tag-chip,
.about-page .chip,
.about-page .trait-row,
.about-page .interest-box,
.about-page .fact-row {
  opacity: 0; transform: translateY(14px);
  transition: opacity .55s ease, transform .55s ease, background .25s ease, box-shadow .25s ease, border-color .25s ease;
}
.about-page .reveal-item.is-in .stat-box,
.about-page .reveal-item.is-in .social-btn,
.about-page .reveal-item.is-in .tag-chip,
.about-page .reveal-item.is-in .chip,
.about-page .reveal-item.is-in .trait-row,
.about-page .reveal-item.is-in .interest-box,
.about-page .reveal-item.is-in .fact-row {
  opacity: 1; transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .about-page .reveal-item,
  .about-page .stat-box, .about-page .social-btn, .about-page .tag-chip,
  .about-page .chip, .about-page .trait-row, .about-page .interest-box,
  .about-page .fact-row, .about-page .meter-fill {
    transition: none !important; opacity: 1 !important; transform: none !important;
  }
}

/* ---- header ---- */
.about-page-header {
  display: flex; align-items: flex-end; justify-content: space-between;
  flex-wrap: wrap; gap: 12px; margin-bottom: var(--gap);
}
.about-btn-arrow { margin-left: 6px; color: var(--t2); transition: transform .25s ease; }
.about-page-header .btn:hover .about-btn-arrow { transform: translateX(4px); }

/* ---- row 1: profile + intro ---- */
.about-hero-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--gap);
  margin-bottom: var(--gap);
  align-items: stretch;
}
@media (max-width: 900px) {
  .about-hero-grid { grid-template-columns: 1fr; }
}

.profile-card {
  display: flex; flex-direction: column; align-items: center; text-align: center;
}

.avatar-shell {
  width: min(210px, 46vw); height: min(210px, 46vw);
  border-radius: 20px; overflow: hidden; flex-shrink: 0;
  background: linear-gradient(135deg, var(--p), #3a6fd8);
  margin-bottom: 20px; position: relative;
  transition: transform .25s ease;
  transform-style: preserve-3d;
}
.avatar-ring {
  position: absolute; inset: -3px; border-radius: 22px; z-index: 0;
  background: conic-gradient(from 0deg, var(--p), #3a6fd8, #ffd43b, var(--p));
  opacity: .55; filter: blur(10px);
  animation: spinGlow 7s linear infinite;
}
@keyframes spinGlow { to { transform: rotate(360deg); } }
.avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; position: relative; z-index: 1; border-radius: 20px; }
.avatar-fallback { display: flex; align-items: center; justify-content: center; }
.avatar-fallback-text { font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #fff; position: relative; z-index: 1; }

.profile-name { font-family: 'Syne', sans-serif; font-size: clamp(19px, 4vw, 22px); font-weight: 800; color: var(--t1); margin-bottom: 6px; }
.profile-role { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--p); letter-spacing: .7px; margin-bottom: 16px; }

.uni-chip {
  display: inline-flex; align-items: center; gap: 7px; font-size: 12px; color: var(--t3);
  padding: 6px 14px; border-radius: 8px; background: var(--bg2); border: 1px solid var(--bdr);
  margin-bottom: 20px;
}
.uni-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--p); box-shadow: 0 0 0 3px var(--pdim); flex-shrink: 0; }

.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%; margin-bottom: 20px; }
.stat-box {
  padding: 14px 8px; border: 1px solid var(--bdr); border-radius: 10px; background: var(--bg2);
  transition: transform .25s ease, border-color .25s ease, opacity .55s ease;
}
.stat-box:hover { transform: translateY(-3px); border-color: rgba(91,141,238,0.35); }
.stat-num { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--p); display: block; }
.stat-label { font-size: 10px; color: var(--t3); letter-spacing: 1px; text-transform: uppercase; display: block; margin-top: 3px; }

.divider-line { height: 1px; background: var(--bdr); width: 100%; margin-bottom: 18px; }

.socials-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.social-btn {
  width: 44px; height: 44px; border-radius: 12px;
  border: 1px solid var(--bdr); background: var(--bg2);
  display: flex; align-items: center; justify-content: center;
  text-decoration: none;
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, opacity .55s ease;
}
.social-btn:hover { transform: translateY(-4px) scale(1.06); box-shadow: 0 10px 28px rgba(0,0,0,0.35); border-color: var(--p); }
.social-img { width: 55%; height: 55%; object-fit: contain; }

/* ---- intro card ---- */
.intro-card { display: flex; flex-direction: column; justify-content: space-between; }
.intro-inner { max-width: 820px; }
.intro-title { font-family: 'Syne', sans-serif; font-size: clamp(20px, 3.4vw, 24px); font-weight: 800; color: var(--t1); margin-bottom: 22px; }
.intro-p { font-size: 14px; color: var(--t2); line-height: 1.9; margin-bottom: 16px; }
.intro-p strong { color: var(--t1); }
.intro-p:last-child { margin-bottom: 0; }

.highlight-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; padding-top: 18px; border-top: 1px solid var(--bdr); }
.tag-chip {
  padding: 6px 14px; border-radius: 8px; font-size: 12px; font-family: 'JetBrains Mono', monospace;
  color: var(--p); background: var(--pdim); border: 1px solid rgba(91,141,238,0.25); letter-spacing: .3px;
  transition: transform .2s ease, background .2s ease, opacity .55s ease;
}
.tag-chip:hover { transform: translateY(-2px); background: rgba(91,141,238,0.16); }

/* ---- row 2: skills / tools+goal ---- */
.about-skills-grid { 
  display: grid; 
  grid-template-columns: 1fr 340px; 
  gap: var(--gap); 
  margin-bottom: var(--gap); 
  align-items: start; /* <--- Changed from stretch to start */
}

@media (max-width: 900px) { 
  .about-skills-grid { 
    grid-template-columns: 1fr; 
  } 
}

.skills-card { display: flex; flex-direction: column; }

/* Simplified meters wrap - removed top padding/borders */
.meters-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 10px; }
@media (max-width: 560px) { .meters-wrap { grid-template-columns: 1fr; gap: 24px; } }

.meter { margin-bottom: 18px; }
.meter:last-child { margin-bottom: 0; }
.meter-head { display: flex; justify-content: space-between; margin-bottom: 8px; }
.meter-name { font-size: 13px; font-weight: 500; color: var(--t1); }
.meter-pct { font-size: 11px; font-family: 'JetBrains Mono', monospace; }
.meter-track { height: 6px; border-radius: 6px; background: var(--bg2); border: 1px solid var(--bdr); overflow: hidden; }
.meter-fill {
  height: 100%; border-radius: 6px;
  transition: width 1.1s cubic-bezier(.16,.84,.3,1);
}

.tools-goal-col { display: flex; flex-direction: column; gap: var(--gap); }
.tools-wrap { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
.goal-card { background: var(--bg2); border: 1px solid var(--bdr); flex: 1; }
.goal-text { font-size: 13px; color: var(--t2); line-height: 1.8; }
.goal-badges { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 7px; }
.pulse-dot {
  display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #4ade80;
  margin-right: 6px; box-shadow: 0 0 0 0 rgba(74,222,128,0.6); animation: pulseDot 1.8s infinite;
}
@keyframes pulseDot {
  0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.55); }
  70%  { box-shadow: 0 0 0 7px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}

/* ---- row 3: drives / beyond ---- */
.about-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--gap); align-items: stretch; }
@media (max-width: 800px) { .about-bottom-grid { grid-template-columns: 1fr; } }

.drives-card, .beyond-card { display: flex; flex-direction: column; }

.traits-list { display: flex; flex-direction: column; gap: 14px; margin-top: 8px; flex: 1; }
.trait-row {
  display: flex; gap: 14px; padding: 16px 18px; border-radius: 12px;
  border: 1px solid var(--bdr); background: var(--bg2); align-items: flex-start;
  transition: transform .2s ease, border-color .2s ease, opacity .55s ease;
}
.trait-row:hover { transform: translateX(4px); border-color: rgba(91,141,238,0.3); }
.trait-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--p); margin-top: 6px; flex-shrink: 0; }
.trait-copy { line-height: 1.6; }
.trait-title { font-size: 14px; color: var(--t1); font-weight: 600; }
.trait-desc { font-size: 14px; color: var(--t2); margin-left: 6px; }

.interests-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 18px; }
@media (max-width: 480px) { .interests-grid { grid-template-columns: repeat(2, 1fr); } }
.interest-box {
  padding: 16px 10px; border-radius: 10px; border: 1px solid var(--bdr); background: var(--bg2);
  text-align: center; transition: transform .2s ease, border-color .2s ease, opacity .55s ease;
}
.interest-box:hover { transform: translateY(-3px); border-color: rgba(91,141,238,0.35); }
.interest-icon { font-size: 22px; display: block; margin-bottom: 7px; }
.interest-label { font-size: 11px; color: var(--t3); font-weight: 500; letter-spacing: .3px; }

.facts-strip {
  flex: 1; padding: 16px 18px; border-radius: 10px; background: var(--bg2);
  border: 1px solid var(--bdr); display: flex; flex-direction: column; justify-content: center; gap: 12px;
}
.fact-row { display: flex; align-items: flex-start; gap: 11px; }
.fact-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; color: var(--p); }
.fact-text { font-size: 12px; color: var(--t3); line-height: 1.7; }

/* ---- small screens: tighten card padding & type scale ---- */
@media (max-width: 560px) {
  .about-page .card { border-radius: 12px; }
  .profile-role { letter-spacing: .4px; }
  .intro-p { font-size: 13.5px; line-height: 1.8; }
}
`