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
  { n: '7.73',l: 'CGPA'        },
  { n: '2+',  l: 'Awards'   },
]

export default function Home() {
  const navigate = useNavigate()
  const typing = useTyping()

  return (
    <div className="page-wrapper home-wrapper">
      <style>{`
        /* Forces content to align left, just after the sidebar */
        .home-wrapper {
          padding: clamp(20px, 4vw, 60px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        /* Hero Section */
        .home-hero {
          min-height: calc(100vh - 140px);
          width: 100%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start; /* Secures left alignment */
          padding-top: 40px;
          padding-bottom: 40px;
        }

        .hero-label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(13px, 1.5vw, 15px);
          letter-spacing: 2.2px;
          margin-bottom: 24px;
        }

        .hero-label span {
          font-weight: 800;
          text-transform: uppercase;
          background: linear-gradient(90deg, var(--p), #8ab4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(48px, 6.5vw, 80px);
          font-weight: 800;
          line-height: 1.05;
          color: var(--t1);
          letter-spacing: -1.5px;
          margin: 0 0 16px 0;
        }

        .hero-typing {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(14px, 1.8vw, 18px);
          color: var(--t2);
          margin-bottom: 28px;
          min-height: 28px; /* Prevents layout jumping */
        }

        .hero-bio {
          font-size: clamp(14px, 1.5vw, 16px);
          color: var(--t2);
          line-height: 1.85;
          max-width: 700px;
          margin: 0 0 40px 0;
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        /* Divider */
        .home-divider {
          height: 1px;
          width: 100%;
          background: var(--bdr);
          margin: 0 0 52px 0;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
          width: 100%;
          margin-bottom: 52px;
        }

        .stat-card {
          padding: 24px 16px;
          border: 1px solid var(--bdr);
          border-radius: 14px;
          background: var(--bg2);
          text-align: center;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--p);
        }

        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--p);
          display: block;
          margin-bottom: 6px;
        }

        .stat-label {
          font-size: 11px;
          color: var(--t3);
          letter-spacing: 0.8px;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Nav Cards Grid */
        .nav-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
          width: 100%;
        }

        .nav-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border-radius: 14px;
          background: var(--surf);
          border: 1px solid var(--bdr);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-card:hover {
          transform: translateY(-4px);
          background: var(--bg2);
          border-color: var(--p);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .nav-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--pdim);
          border: 1px solid rgba(91,141,238,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
          color: var(--p);
          transition: all 0.3s ease;
        }

        .nav-card:hover .nav-card-icon {
          background: var(--p);
          color: #fff;
        }

        .nav-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--t1);
          margin-bottom: 4px;
        }

        .nav-card-sub {
          font-size: 12px;
          color: var(--t3);
        }
      `}</style>

      {/* ── HERO SECTION ── */}
      <div className="home-hero">
        
        <div className="hero-label">
          <span>Hi, I'm</span>
        </div>

        <h1 className="hero-title">
          Pratik<br />
          <span style={{ color: 'var(--p)' }}>Pokhrel.</span>
        </h1>

        <div className="hero-typing">
          {typing}
        </div>

        <p className="hero-bio">
          Java Full Stack Developer focused on building scalable systems and integrating AI/ML capabilities into production applications. 
          Clean architecture, thoughtful APIs, and interfaces that work beautifully.
        </p>

        <div className="hero-ctas">
          <button className="btn btn-fill" onClick={() => navigate('/projects')}>View Projects</button>
          <button className="btn btn-ghost" onClick={() => navigate('/contact')}>Get in Touch</button>
        </div>

        <div className="hero-chips">
          {chips.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="home-divider" />

      {/* ── HIGHLIGHT STATS ── */}
      <div className="stats-grid">
        {highlights.map(h => (
          <div key={h.l} className="stat-card">
            <span className="stat-num">{h.n}</span>
            <span className="stat-label">{h.l}</span>
          </div>
        ))}
      </div>

      {/* ── QUICK NAV CARDS ── */}
      <div className="nav-cards-grid">
        {[
          { icon: 'ⓘ', title: 'About',        sub: 'My background & skills',   path: '/about'        },
          { icon: '🕮', title: 'Education',    sub: 'B.Tech CSE 3rd Year',      path: '/education'    },
          { icon: '</>',  title: 'Services',     sub: 'What I build',              path: '/services'     },
          { icon: '🗐', title: 'Certificates', sub: '10+ verified credentials',    path: '/certificates' },
          { icon: '⚒',  title: 'Projects',     sub: '4+ selected works',          path: '/projects'     },
          { icon: '☎',  title: 'Contact',      sub: 'Open to opportunities',     path: '/contact'      },
        ].map(item => (
          <div
            key={item.title}
            onClick={() => navigate(item.path)}
            className="nav-card"
          >
            <div className="nav-card-icon">
              {item.icon}
            </div>
            <div>
              <div className="nav-card-title">{item.title}</div>
              <div className="nav-card-sub">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}