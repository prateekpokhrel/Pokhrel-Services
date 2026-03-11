import { useReveal } from '../hooks/useReveal'
import { useState } from 'react'

// ── Project logo imports ───────────────────────────────────────────────────
import suisImg      from '../assets/suis.png'
import segaImg      from '../assets/sega.png'
import myrecipesImg from '../assets/myrecipe.png'
import kavoutImg    from '../assets/kavout.png'
import nagarsetuImg  from '../assets/nagarsetu.png'

const services = [
  {
    icon: '🏗️',
    title: 'Full Stack Development',
    desc: 'End-to-end web applications using Java Spring Boot backends with React.js frontends. Scalable, testable, and production-ready from day one.',
    tags: ['Java', 'Spring Boot', 'React.js', 'MySQL'],
  },
  {
    icon: '🤖',
    title: 'AI / ML Integration',
    desc: 'Embedding intelligent models into Java systems — recommendation engines, NLP pipelines, and predictive analytics.',
    tags: ['Python', 'TensorFlow', 'Spring Boot', 'REST API'],
  },
  {
    icon: '⚙️',
    title: 'Backend Engineering',
    desc: 'High-performance Java microservices with Spring Boot.',
    tags: ['Java', 'Spring Security', 'MySQL', 'Docker'],
  },
  {
    icon: '🎨',
    title: 'Frontend Development',
    desc: 'Modern React.js interfaces with exceptional UX.',
    tags: ['React.js', 'JavaScript', 'CSS', 'Tailwind'],
  },
  {
    icon: '🔗',
    title: 'API Development',
    desc: 'RESTful API design with versioning and security.',
    tags: ['REST API', 'Spring Boot', 'Postman', 'JWT'],
  },
  {
    icon: '🛡️',
    title: 'System Architecture',
    desc: 'Designing resilient distributed systems.',
    tags: ['AWS', 'Docker', 'Microservices', 'Redis'],
  },
]

const process = [
  { step: '01', title: 'Discovery',    desc: 'Understanding your requirements.' },
  { step: '02', title: 'Architecture', desc: 'Designing the system.'            },
  { step: '03', title: 'Development',  desc: 'Writing clean, tested code.'      },
  { step: '04', title: 'Delivery',     desc: 'Deployment and handoff.'          },
]

const liveProjects = [
  {
    id: 'suis',
    logo: suisImg,
    title: 'SUIS',
    subtitle: 'Smart University Intelligence System',
    desc: 'AI-enabled university management platform designed to replace legacy SAP-based systems. It integrates academic, administrative, and operational modules into a single scalable platform with centralized data flow and real-time institutional analytics.',
    tags: ['React.js', 'MySQL', 'AI','Supabase'],
    status: 'Live',
    url: 'https://suis-rouge.vercel.app/',
    color: '#4f8ef7',
  },
  {
    id: 'sega',
    logo: segaImg,
    title: 'SEGA',
    subtitle: 'Structured Emergency Governance Architecture',
    desc: 'Centralized emergency-governance infrastructure built within SUIS for incident reporting, hierarchical escalation, real-time monitoring, and safety compliance across institutions.',
    tags: ['React.js', 'Python', 'Supabase', 'Fast API'],
    status: 'Live',
    url: '#',
    color: '#f7874f',
  },
  {
    id: 'myrecipes',
    logo: myrecipesImg,
    title: 'MyRecipe',
    subtitle: 'Personal Recipe Manager',
    desc: 'Discover, save, and share recipes with smart ingredient-based search and personalised meal-plan suggestions.',
    tags: ['React.js', 'Spring Boot', 'MySQL', 'REST API', 'MongoDB'],
    status: 'Live',
    url: 'https://my-recipes-pi.vercel.app/',
    color: '#4fc97f',
  },
  {
    id: 'kavout',
    logo: kavoutImg,
    title: 'Kavout',
    subtitle: 'AI-Driven Investment Insights',
    desc: 'Time-series forecasting platform for NSE stocks generating predictive insights for 1-day, 15-day, and 30-day horizons with a built-in paper trading engine for strategy simulation.',
    tags: ['Python', 'TensorFlow', 'React.js', 'FastAPI'],
    status: 'Live',
    url: 'https://kavout-ltsf.vercel.app/',
    color: '#f7d44f',
  },
  {
    id: 'nagarsetu',
    logo: nagarsetuImg,
    title: 'NagarSetu',
    subtitle: 'AI-Based Smart City Issue Solver',
    desc: 'Citizens report civic issues via photo or text; an AI triage engine classifies, prioritises, and routes complaints to the right municipal department automatically.',
    tags: ['Python', 'NLP', 'Supabase', 'React.js'],
    status: 'Live',
    url: 'https://agentic-city-problem-solver.vercel.app/',
    color: '#b44ff7',
  },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  techStack: '',
  description: '',
  referenceLinks: '',
  hearAbout: '',
}

const projectTypes = [
  'Full Stack Development',
  'Software Development',
  'AI / ML Integration',
  'API Development',
  'UI/UX & Frontend',
  'System Architecture / Consulting',
  'Other',
]

const budgetRanges = [
  'Under ₹10,000',
  '₹10,000 - ₹50,000',
  '₹50,000 - ₹1,00,000',
  '₹1,00,000 - ₹5,00,000',
  '₹5,00,000+',
  "Let's discuss",
]

const timelines = [
  'ASAP (< 2 weeks)',
  '1 month',
  '1-3 months',
  '3-6 months',
  '6+ months',
  'Flexible',
]

// Styles 
const gatewayStyles = `
  .gateway-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    gap: 18px;
  }

  .project-card {
    position: relative;
    border: 1px solid var(--bdr);
    border-radius: 12px;
    padding: 22px;
    background: var(--bg2, #111);
    overflow: hidden;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
    cursor: pointer;
    text-decoration: none;
    display: block;
    color: inherit;
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--accent-clr, #4f8ef7);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .project-card:hover::before { transform: scaleX(1); }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.35);
  }

  .project-logo-wrap {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    overflow: hidden;
    background: var(--bg, #0a0a0a);
    border: 1px solid var(--bdr);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    flex-shrink: 0;
  }

  .project-logo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  .project-logo-fallback {
    font-size: 18px;
    font-weight: 800;
    font-family: 'Syne', sans-serif;
  }

  .project-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 20px;
    background: rgba(79, 201, 127, 0.12);
    color: #4fc97f;
    border: 1px solid rgba(79, 201, 127, 0.3);
    margin-bottom: 14px;
  }

  .project-badge::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #4fc97f;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.4); }
  }

  .project-launch-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 14px;
    font-size: 12px;
    font-weight: 600;
    color: var(--accent-clr, #4f8ef7);
    text-decoration: none;
    letter-spacing: 0.04em;
    transition: gap 0.2s ease;
  }

  .project-card:hover .project-launch-btn { gap: 10px; }

  .hire-form-wrap {
    background: var(--bg2, #111);
    border: 1px solid var(--bdr);
    border-radius: 16px;
    padding: 36px;
  }

  .hire-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 640px) {
    .hire-form-grid { grid-template-columns: 1fr; }
    .hire-form-wrap { padding: 20px; }
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-field.full { grid-column: 1 / -1; }

  .form-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--t2);
  }

  .form-label span { color: #f7874f; }

  .form-input,
  .form-select,
  .form-textarea {
    background: var(--bg, #0a0a0a);
    border: 1px solid var(--bdr);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 13px;
    color: var(--t1, #fff);
    outline: none;
    transition: border-color 0.2s ease;
    font-family: inherit;
    width: 100%;
    box-sizing: border-box;
  }

  .form-input:focus,
  .form-select:focus,
  .form-textarea:focus {
    border-color: var(--accent, #4f8ef7);
  }

  .form-select option { background: #111; }
  .form-textarea { resize: vertical; min-height: 100px; }

  .submit-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
    padding: 12px 28px;
    background: var(--t1, #fff);
    color: var(--bg, #0a0a0a);
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .submit-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .form-success { text-align: center; padding: 40px 20px; }
  .form-success-icon { font-size: 48px; margin-bottom: 16px; }
`

// ── Logo with initials fallback ────────────────────────────────────────────
function ProjectLogo({ src, title, accentColor }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="project-logo-wrap">
      {!failed ? (
        <img src={src} alt={title} onError={() => setFailed(true)} />
      ) : (
        <span className="project-logo-fallback" style={{ color: accentColor }}>
          {title.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  )
}

export default function Services() {
  useReveal()

  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="page-wrapper">

      <style>{gatewayStyles}</style>

      {/* ── SECTION 1 — LIVE PROJECTS GATEWAY ───────────────────────────── */}
      <div className="sec-header">
        <div className="sec-label">03 / SERVICES</div>
        <div className="sec-title">Public Services</div>
      </div>

      <p className="reveal" style={{ fontSize: 15, color: 'var(--t2)', marginBottom: 32 }}>
        These are fully deployed products, open for public use right now.
        Click any card to launch the application.
      </p>

      <div className="gateway-grid">
        {liveProjects.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card reveal"
            style={{ '--accent-clr': p.color }}
          >
            <div className="project-badge">{p.status}</div>

            <ProjectLogo src={p.logo} title={p.title} accentColor={p.color} />

            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 3 }}>
              {p.title}
            </div>

            <div style={{ fontSize: 11, color: p.color, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              {p.subtitle}
            </div>

            <div style={{ fontSize: 13, color: 'var(--t3)', marginBottom: 12 }}>
              {p.desc}
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
              {p.tags.map(tag => (
                <span key={tag} style={{ fontSize: 10, border: '1px solid var(--bdr)', padding: '3px 7px', borderRadius: 5 }}>
                  {tag}
                </span>
              ))}
            </div>
              
            <span className="project-launch-btn">Launch app →</span>
          </a>
        ))}
      </div>

      {/* ── SECTION 2 — HOW I WORK ───────────────────────────────────────── */}
      <div className="divider" />

      <div className="sec-header reveal">
        <div className="sec-label">PROCESS</div>
        <div className="sec-title">How I Work</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
        {process.map((p, i) => (
          <div key={i} className="card-flat reveal">
            <div style={{ fontSize: 28, marginBottom: 10 }}>{p.step}</div>
            <div style={{ fontWeight: 700 }}>{p.title}</div>
            <div style={{ fontSize: 13, color: 'var(--t3)' }}>{p.desc}</div>
          </div>
        ))}
      </div>

      {/* ── SECTION 3 — HIRE ME FORM ─────────────────────────────────────── */}
      <div className="divider" />

      <div className="sec-header reveal">
        <div className="sec-label">CLIENT PROJECT</div>
        <div className="sec-title">Hire Me</div>
      </div>

      <p className="reveal" style={{ fontSize: 15, color: 'var(--t2)', marginBottom: 32 }}>
        Have a specific project in mind? Fill out the form below and I'll get
        back to you within 24 hours with a detailed proposal.
      </p>

      <div className="hire-form-wrap reveal">
        {submitted ? (
          <div className="form-success">
            <div className="form-success-icon">🚀</div>
            <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 10 }}>Request received!</div>
            <div style={{ fontSize: 14, color: 'var(--t3)' }}>
              Thanks for reaching out. I'll review your project details and respond within 24 hours.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="hire-form-grid">

              <div className="form-field">
                <label className="form-label">Full Name <span>*</span></label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" required />
              </div>

              <div className="form-field">
                <label className="form-label">Email <span>*</span></label>
                <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
              </div>

              <div className="form-field">
                <label className="form-label">Phone / WhatsApp</label>
                <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
              </div>

              <div className="form-field">
                <label className="form-label">Company / Organisation</label>
                <input className="form-input" name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc. (optional)" />
              </div>

              <div className="form-field">
                <label className="form-label">Project Type <span>*</span></label>
                <select className="form-select" name="projectType" value={form.projectType} onChange={handleChange} required>
                  <option value="">Select a type…</option>
                  {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Budget Range <span>*</span></label>
                <select className="form-select" name="budget" value={form.budget} onChange={handleChange} required>
                  <option value="">Select range…</option>
                  {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Expected Timeline <span>*</span></label>
                <select className="form-select" name="timeline" value={form.timeline} onChange={handleChange} required>
                  <option value="">Select timeline…</option>
                  {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Preferred Tech Stack</label>
                <input className="form-input" name="techStack" value={form.techStack} onChange={handleChange} placeholder="e.g. React, Spring Boot, MySQL…" />
              </div>

              <div className="form-field full">
                <label className="form-label">Project Description <span>*</span></label>
                <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} placeholder="Describe what you want to build, the problem it solves, key features, target users, and any specific requirements or constraints…" required style={{ minHeight: 130 }} />
              </div>

              <div className="form-field full">
                <label className="form-label">Reference Links / Inspiration</label>
                <input className="form-input" name="referenceLinks" value={form.referenceLinks} onChange={handleChange} placeholder="Figma, Notion doc, competitor sites, GitHub repo… (optional)" />
              </div>

              <div className="form-field full">
                <label className="form-label">How did you find me?</label>
                <input className="form-input" name="hearAbout" value={form.hearAbout} onChange={handleChange} placeholder="LinkedIn, GitHub, referral, Google…" />
              </div>

            </div>

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? (
                <>
                  <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid #0a0a0a', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  Sending…
                </>
              ) : <>Submit Request →</>}
            </button>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>
        )}
      </div>

    </div>
  )
}