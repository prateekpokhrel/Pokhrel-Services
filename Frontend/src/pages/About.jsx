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
    { name: 'Java',        pct: 95 },
    { name: 'Spring Boot', pct: 90 },
    { name: 'Node.js',     pct: 80 },
    { name: 'REST APIs',   pct: 92 },
  ],
  frontend: [
    { name: 'React.js',         pct: 88 },
    { name: 'JavaScript',       pct: 88 },
    { name: 'MySQL',            pct: 85 },
    { name: 'AI/ML Integration',pct: 75 },
  ],
}

const tools = [
  "Git",
  "GitHub",
  "AWS",
  "MongoDB Compass",
  "Vite",
  "JUnit",
  "Swagger",
  "Postman",
  "VS Code",
  "Google Colab",
  "ML Models",
  "Windows",
  "Linux"
]

const traits = [
  {
    title: "Systems Thinking",
    desc: "Designing from the ground up data models, API contracts, service boundaries, and how they interact under load."
  },
  {
    title: "Continuous Learning",
    desc: "Currently deepening expertise in AI/ML, cloud-native architectures, and distributed system design."
  },
  {
    title: "Code Quality",
    desc: "Writing for the next developer. Clean, documented, tested. Technical debt is always a deliberate choice."
  },
  {
    title: "Impact-Oriented",
    desc: "Engineering decisions should serve real users. Every feature asks: does this make the product better?"
  }
];

const interests = [
  { icon: <i className="fa-solid fa-robot"          />, label: 'AI Research'  },
  { icon: <i className="fa-solid fa-dumbbell"       />, label: 'Gym'         },
  { icon: <i className="fa-solid fa-person-hiking" />, label: 'Trekking'    },
  { icon: <i className="fa-solid fa-chess"          />, label: 'Chess'       },
  { icon: <i className="fa-solid fa-music"          />, label: 'Music'       },
  { icon: <i className="fa-solid fa-earth-americas"  />, label: 'Open Source' },
]

const socials = [
  { img: github,   label: 'GitHub',   href: 'https://github.com/prateekpokhrel'            },
  { img: linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/pokhrelpratik/'   },
  { img: emailImg, label: 'Email',    href: 'mailto:itspratikpok@email.com'                 },
  { img: resume,   label: 'Resume',   href: 'https://drive.google.com/file/d/1C30h4ajmLIs_ziyLD-Wt5Dp-3p3PUYth/view?usp=sharing'                                   },
]

const stats = [['3rd','Year'],['4+','Projects'],['7.44','CGPA'],['10+','Certs']]

/* ─────────────────────────── HELPERS ─────────────────────────── */

const SectionIcon = ({ children }) => (
  <div style={{
    width: 34, height: 34, borderRadius: 9, flexShrink: 0,
    background: 'var(--pdim)', border: '1px solid rgba(91,141,238,0.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
  }}>{children}</div>
)

const SectionHead = ({ icon, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
    <SectionIcon>{icon}</SectionIcon>
    <span style={{ fontFamily:"'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--t1)' }}>{title}</span>
  </div>
)

const MonoLabel = ({ children }) => (
  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize: 10, color: 'var(--t3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
    {children}
  </div>
)

/* ─────────────────────────── COMPONENT ─────────────────────────── */

export default function About() {
  useReveal()
  const navigate = useNavigate()

  return (
    <div className="page-wrapper">

      {/* ══ PAGE HEADER ══ */}
      <div className="sec-header" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <div className="sec-label">01 / ABOUT</div>
          <div className="sec-title">Who I Am</div>
        </div>
        <button
          className="btn btn-ghost"
          onClick={() => navigate('/education')}
          style={{ fontSize: 12 }}
        >
          Education
          <i
            className="fa-solid fa-arrow-right-long"
            style={{ marginLeft: 6, color: 'var(--t2)' }}
          ></i>
        </button>
      </div>

     {/* ROW 1 — Profile Card */}
<div
  className="reveal"
  style={{
    display: 'grid',
    gridTemplateColumns: '256px 1fr',
    gap: 20,
    marginBottom: 20,
    alignItems: 'stretch'
  }}
>

{/* ── Profile Card ── */}
<div
  style={{
    background: 'var(--surf)',
    border: '1px solid var(--bdr)',
    borderRadius: 14,
    padding: '30px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }}
>

{/* Avatar */}
<div
  style={{
    width: 210,
    height: 210,
    borderRadius: 20,
    overflow: 'hidden',
    flexShrink: 0,
    background: 'linear-gradient(135deg,var(--p),#3a6fd8)',
    marginBottom: 20
  }}
>
<img
  src={pp}
  alt="Pratik Pokhrel"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  }}
  onError={e => {
    e.currentTarget.style.display = 'none'
    e.currentTarget.parentElement.style.display = 'flex'
    e.currentTarget.parentElement.style.alignItems = 'center'
    e.currentTarget.parentElement.style.justifyContent = 'center'
    e.currentTarget.parentElement.innerHTML =
      '<span style="font-family:Syne,sans-serif;font-size:32px;font-weight:800;color:#fff">PP</span>'
  }}
/>
</div>

{/* Name */}
<div
  style={{
    fontFamily: "'Syne',sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: 'var(--t1)',
    marginBottom: 6
  }}
>
Pratik Pokhrel
</div>

{/* Role */}
<div
  style={{
    fontFamily: "'JetBrains Mono',monospace",
    fontSize: 12,
    color: 'var(--p)',
    letterSpacing: 0.7,
    marginBottom: 16
  }}
>
Java Full Stack Developer
</div>

{/* University chip */}
<div
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 12,
    color: 'var(--t3)',
    padding: '6px 14px',
    borderRadius: 8,
    background: 'var(--surf2)',
    border: '1px solid var(--bdr)',
    marginBottom: 20
  }}
>
KIIT Deemed to be University
</div>

{/* Stats */}
<div
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    width: '100%',
    marginBottom: 20
  }}
>
{stats.map(([n,l]) => (
<div
  key={l}
  style={{
    padding: '14px 8px',
    border: '1px solid var(--bdr)',
    borderRadius: 10,
    background: 'var(--bg2)'
  }}
>

<span
  style={{
    fontFamily: "'Syne',sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: 'var(--p)',
    display: 'block'
  }}
>
{n}
</span>

<span
  style={{
    fontSize: 10,
    color: 'var(--t3)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    display: 'block',
    marginTop: 3
  }}
>
{l}
</span>

</div>
))}
</div>

{/* Divider */}
<div
  style={{
    height: 1,
    background: 'var(--bdr)',
    width: '100%',
    marginBottom: 18
  }}
/>

{/* Social icons */}
<div
  style={{
    display: 'flex',
    gap: 12,
    justifyContent: 'center'
  }}
>
{socials.map(s => (
<a
  key={s.label}
  href={s.href}
  target="_blank"
  rel="noreferrer"
  title={s.label}
  style={{ textDecoration: 'none' }}
>
<div
  style={{
    width: 44,
    height: 44,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s ease'
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'translateY(-4px)'
    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.35)'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'none'
    e.currentTarget.style.boxShadow = 'none'
  }}
>
<img
  src={s.img}
  alt={s.label}
  style={{
    width: '55%',
    height: '55%',
    objectFit: 'contain'
  }}
/>
</div>
</a>
))}
</div>

</div>

        {/* ── Introduction ── */}
<div
  style={{
    background: 'var(--surf)',
    border: '1px solid var(--bdr)',
    borderRadius: 12,
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}
>
  <div style={{ maxWidth: 820 }}>

    <div
      style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 24,
        fontWeight: 800,
        color: 'var(--t1)',
        marginBottom: 22
      }}
    >
      Introduction
    </div>

<p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.9, marginBottom: 16 }}>
  I'm <strong style={{ color: 'var(--t1)' }}>Pratik Pokhrel</strong>, a Java Full Stack Developer
  and AI enthusiast pursuing Computer Science and Engineering at
  <strong style={{ color: 'var(--t1)' }}> KIIT Deemed to be University </strong>
  (CGPA 7.44, 5th semester). I believe that
  <strong style={{ color: 'var(--t1)' }}> practical knowledge should lead theoretical learning</strong>.
  For me, real understanding comes from building systems, experimenting with ideas,
  and deploying solutions that work in real-world environments rather than existing
  only as academic concepts.
</p>

    <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.9, marginBottom: 16 }}>
      My flagship work is
      <strong style={{ color: 'var(--t1)' }}> SUIS (Smart University Intelligence System)</strong>,
      an AI-enabled platform designed to replace legacy SAP systems. Within it I built
      <strong style={{ color: 'var(--t1)' }}> SEGA</strong>, a centralized emergency-governance
      architecture covering incident reporting, hierarchical escalation,
      real-time visibility, and safety compliance that copmlies role based access control and data privacy standards.
    </p>

    <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.9, marginBottom: 16 }}>
  I'm currently building <strong style={{ color: 'var(--t1)' }}>Kavout</strong>, an AI-powered
  time-series stock forecasting platform designed specifically for the
  <strong style={{ color: 'var(--t1)' }}> Indian Stock Market</strong>. The system analyzes
  historical and real-time data of companies listed on the
  <strong style={{ color: 'var(--t1)' }}> National Stock Exchange (NSE)</strong> to generate
  predictive insights across multiple horizons - including 1-day, 15-day, and
  30-day forecasts. The platform aims to achieve prediction accuracy within
  a sub-1% error range and integrates a built-in
  <strong style={{ color: 'var(--t1)' }}> paper-trading engine</strong>, allowing users to test
  strategies and simulate trading decisions without real financial risk.
</p>

   <p style={{ fontSize: 14, color: 'var(--t2)', lineHeight: 1.9 }}>
  My core interests lie at the intersection of
  <strong style={{ color: 'var(--t1)' }}>
    {' '}backend engineering, frontend design, system architecture, and AI integration
  </strong>.
  I focus on building scalable backend services, intuitive user interfaces,
  and intelligent systems that transform raw data into meaningful insights.
  I believe impactful products emerge where solid engineering principles,
  efficient architecture, and innovative problem-solving converge.
</p>

  </div>

  {/* Highlight tags */}
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10,
      marginTop: 26,
      paddingTop: 18,
      borderTop: '1px solid var(--bdr)'
    }}
  >
    {[
      'SUIS / SEGA',
      'Kavout (AI Stocks)',
      'MLH Hackathon',
      'Backend Architecture',
      'AI/ML',
      'Spring Boot'
    ].map(tag => (
      <span
        key={tag}
        style={{
          padding: '6px 14px',
          borderRadius: 8,
          fontSize: 12,
          fontFamily: "'JetBrains Mono', monospace",
          color: 'var(--p)',
          background: 'var(--pdim)',
          border: '1px solid rgba(91,141,238,0.25)',
          letterSpacing: 0.3
        }}
      >
        {tag}
      </span>
    ))}
  </div>
</div>
      </div>

      {/* ══ ROW 2 — Skills  |  Tools + Career Goal ══ */}
<div
  className="reveal"
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 340px",
    gap: 20,
    marginBottom: 20,
    alignItems: "stretch",
  }}
>
  {/* ── Technical Skills ── */}
  <div
    style={{
      background: "var(--surf)",
      border: "1px solid var(--bdr)",
      borderRadius: 12,
      padding: "28px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <SectionHead
      icon={<i className="fa-solid fa-laptop-code" style={{ color: "rgb(255,212,59)" }} />}
      title="Technical Skills"
    />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        marginTop: 20,
      }}
    >

      {/* ── Frontend ── */}
      <div>
        <MonoLabel>Frontend</MonoLabel>

        <div className="skillGrid">
          <div className="skillBox">
            <strong>React</strong>
            <span>Component UI</span>
          </div>

          <div className="skillBox">
            <strong>JavaScript</strong>
            <span>Dynamic Logic</span>
          </div>

          <div className="skillBox">
            <strong>HTML5</strong>
            <span>Page Structure</span>
          </div>

          <div className="skillBox">
            <strong>CSS3</strong>
            <span>Responsive Styling</span>
          </div>

          <div className="skillBox">
            <strong>Tailwind</strong>
            <span>Utility-first CSS</span>
          </div>

        </div>
      </div>


      {/* ── Backend ── */}
      <div>
        <MonoLabel>Backend</MonoLabel>

        <div className="skillGrid">
          <div className="skillBox">
            <strong>Java</strong>
            <span>Enterprise Logic</span>
          </div>

          <div className="skillBox">
            <strong>Spring Boot</strong>
            <span>API Framework</span>
          </div>


          <div className="skillBox">
            <strong>REST, Fast APIs</strong>
            <span>Service Communication</span>
          </div>


          <div className="skillBox">
            <strong>MySQL, SQL</strong>
            <span>Data Storage</span>
          </div>

          <div className="skillBox">
            <strong>AI/ML</strong>
            <span>Model Integration</span>
          </div>
        </div>
      </div>

    </div>
  </div>




       {/* ── Tools & Career Goal stacked ── */}
<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

  {/* Tools */}
  <div
    style={{
      background: 'var(--surf)',
      border: '1px solid var(--bdr)',
      borderRadius: 12,
      padding: '24px'
    }}
  >
    <SectionHead
      icon={<i className="fa-solid fa-code" style={{ color: 'rgb(255, 212, 59)' }} />}
      title="Tools I Use"
    />

    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 10
      }}
    >
      {tools.map((t, i) => (
        <span
          key={t}
          className={`chip ${i < 4 ? 'chip-active' : ''}`}
        >
          {t}
        </span>
      ))}
    </div>
  </div>


          {/* Career Goal */}
          <div style={{ background:'rgba(91,141,238,0.04)', border:'1px solid rgba(91,141,238,0.16)', borderRadius:12, padding:'24px', flex:1 }}>
            <SectionHead
              icon={<i className="fa-solid fa-font-awesome" style={{ color: 'rgb(255, 212, 59)' }}/>}
              title="Career Goal"
            />
            <p style={{ fontSize:13, color:'var(--t2)', lineHeight:1.8 }}>
              Targeting a product-focused engineering team where I can architect scalable
              backend systems, ship AI-integrated features, and grow into a senior
              full-stack or systems engineering role.
            </p>
            <div style={{ marginTop:16, display:'flex', flexWrap:'wrap', gap:7 }}>
              {['Full-Time; Remote / On-site'].map(b => (
                <span key={b} className="badge badge-blue">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ ROW 3 — What Drives Me  |  Beyond Code ══ */}
<div
  className="reveal"
  style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    alignItems: 'stretch'
  }}
>

  {/* ── What Drives Me ── */}
  <div
    style={{
      background: 'var(--surf)',
      border: '1px solid var(--bdr)',
      borderRadius: 12,
      padding: '28px',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <SectionHead
      icon={<i className="fa-solid fa-circle-check" style={{ color: 'rgb(255,212,59)' }} />}
      title="What Drives Me"
    />

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        marginTop: 8,
        flex: 1
      }}
    >
      {traits.map(t => (
        <div
          key={t.title}
          style={{
            display: 'flex',
            gap: 14,
            padding: '16px 18px',
            borderRadius: 12,
            border: '1px solid var(--bdr)',
            background: 'rgba(255,255,255,0.02)',
            alignItems: 'flex-start'
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--p)',
              marginTop: 7,
              flexShrink: 0
            }}
          />

          <div style={{ lineHeight: 1.6 }}>
            <span
              style={{
                fontSize: 14,
                color: 'var(--t1)',
                fontWeight: 600
              }}
            >
              {t.title}:
            </span>

            <span
              style={{
                fontSize: 14,
                color: 'var(--t2)',
                marginLeft: 6
              }}
            >
              {t.desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>



        {/* ── Beyond Code ── */}
        <div style={{ background:'var(--surf)', border:'1px solid var(--bdr)', borderRadius:12, padding:'28px', display:'flex', flexDirection:'column' }}>
          <SectionHead
            icon={<i className="fa-solid fa-user-secret" style={{ color: 'rgb(255, 212, 59)' }} />}
            title="Beyond Code"
          />

          {/* 3×2 interests grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:18 }}>
            {interests.map(it => (
              <div key={it.label} style={{
                padding:'16px 10px', borderRadius:10,
                border:'1px solid var(--bdr)', background:'var(--bg2)',
                textAlign:'center',
              }}>
                <span style={{ fontSize:22, display:'block', marginBottom:7 }}>{it.icon}</span>
                <span style={{ fontSize:11, color:'var(--t3)', fontWeight:500, letterSpacing:0.3 }}>{it.label}</span>
              </div>
            ))}
          </div>

          {/* Fun fact strip */}
          <div style={{
            flex:1, padding:'16px 18px', borderRadius:10,
            background:'rgba(255,255,255,0.02)', border:'1px solid var(--bdr)',
            display:'flex', flexDirection:'column', justifyContent:'center', gap:12,
          }}>
            {[
              {
                ico: <i className="fa-solid fa-flag-checkered"  />,
                text: 'MLH Hackathon finalist - AI Smart City Issue Solver (Google Gemini + Unstop @ KIIT)',
              },
              {
                ico: <i className="fa-solid fa-compass-drafting" />,
                text: 'Designed SEGA - a governance system adopted as part of SUIS architecture',
              },
              {
                ico: <i className="fa-solid fa-chart-line" />,
                text: 'Building Kavout - stock AI with sub-1% forecast error on NSE data',
              },
            ].map((f, idx) => (
              <div key={idx} style={{ display:'flex', alignItems:'flex-start', gap:11 }}>
                <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{f.ico}</span>
                <span style={{ fontSize:12, color:'var(--t3)', lineHeight:1.7 }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}