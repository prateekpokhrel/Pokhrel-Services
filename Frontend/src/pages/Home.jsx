import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const phrases = [
  'Java Full Stack Developer',
  'Spring Boot Engineer',
  'React Developer',
  'AI / ML Integrator',
  'Frontend Specialist',
  'Backend Architect',
]

function useTyping() {
  const [text, setText] = useState('')
  useEffect(() => {
    let pi = 0, ci = 0, del = false, tid
    const tick = () => {
      const cur = phrases[pi]
      if (!del) {
        ci++
        setText(cur.slice(0, ci) + '|')
        if (ci === cur.length) { del = true; tid = setTimeout(tick, 1800); return }
      } else {
        ci--
        setText(cur.slice(0, ci) + '|')
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length }
      }
      tid = setTimeout(tick, del ? 38 : 88)
    }
    tid = setTimeout(tick, 600)
    return () => clearTimeout(tid)
  }, [])
  return text
}

const chips = ['Authentic • Bold • Unapologetically Me']

const highlights = [
  { n: '3+',  l: 'Month Exp'   },
  { n: '10+', l: 'Projects'    },
  { n: '11+',  l: 'Certs'       },
  { n: '20+',  l: 'GitHub Repos' },
  { n: '2+',  l: 'Internships' },
  { n: '7.44',l: 'CGPA'        },
  { n: '2+',  l: 'Awards'   },
]

export default function Home() {
  const navigate = useNavigate()
  const typing = useTyping()

  return (
    <div className="page-wrapper" style={{ padding: '0 52px 80px' }}>

      {/* ── Hero ── */}
      <div style={{
        minHeight: 'calc(100vh - 100px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', maxWidth: 760,
      }}>
        
{/* Label */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 15,
    color: "var(--p)",
    letterSpacing: 2.2,
    marginBottom: 26,
    opacity: 0.95,
  }}
>
  {/* Text */}
  <span
    style={{
      fontWeight: 800,
      textTransform: "uppercase",
      background: "linear-gradient(90deg, var(--p), #8ab4ff)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    Hi, I'm
  </span>
</div>


        {/* Name */}
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(42px, 5.5vw, 70px)', fontWeight: 800, lineHeight: 1.05, color: 'var(--t1)', letterSpacing: -1.5, marginBottom: 20 }}>
          Pratik<br />
          <span style={{ color: 'var(--p)' }}>Pokhrel.</span>
        </h1>

        {/* Typing */}
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'clamp(13px, 1.4vw, 16px)', color: 'var(--t2)', marginBottom: 28, minHeight: 26 }}>
          {typing}
        </div>

        {/* Bio */}
        <p style={{ fontSize: 15, color: 'var(--t2)', lineHeight: 1.85, maxWidth: 700, marginBottom: 40 }}>
          Java Full Stack Developer focused on building scalable systems and integrating AI/ML capabilities into production applications. 
          Clean architecture, thoughtful APIs, and interfaces that work beautifully.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
          <button className="btn btn-fill" onClick={() => navigate('/projects')}>View Projects</button>
          <button className="btn btn-ghost" onClick={() => navigate('/contact')}>Get in Touch</button>
        </div>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {chips.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
      </div>

      {/* ── Highlight stats ── */}
      <div style={{ height: 1, background: 'var(--bdr)', margin: '0 0 52px' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 14, marginBottom: 52 }}>
        {highlights.map(h => (
          <div key={h.l} style={{ padding: '20px 16px', border: '1px solid var(--bdr)', borderRadius: 12, background: 'var(--surf)', textAlign: 'center' }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: 'var(--p)', display: 'block', marginBottom: 4 }}>{h.n}</span>
            <span style={{ fontSize: 10, color: 'var(--t3)', letterSpacing: 0.8, textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>{h.l}</span>
          </div>
        ))}
      </div>

      {/* ── Quick nav cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
        {[
          { icon: 'ⓘ', title: 'About',        sub: 'My background & skills',   path: '/about'        },
          { icon: '🕮', title: 'Education',    sub: 'B.Tech CSE 3rd Year',    path: '/education'    },
          { icon: '</>',  title: 'Services',     sub: 'What I build',              path: '/services'     },
          { icon: '🗐', title: 'Certificates', sub: '10+ verified credentials',    path: '/certificates' },
          { icon: '⚒',  title: 'Projects',     sub: '4+ selected works',          path: '/projects'     },
          { icon: '☎',  title: 'Contact',      sub: 'Open to opportunities',     path: '/contact'      },
        ].map(item => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="card"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px' }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--pdim)', border: '1px solid rgba(91,141,238,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--t1)', marginBottom: 2 }}>{item.title}</div>
              <div style={{ fontSize: 11, color: 'var(--t3)' }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
