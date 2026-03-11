import { useReveal } from '../hooks/useReveal'

const certs = [
  {
    icon: <i className="fa-solid fa-code" style={{ color: "#c9a84c" }}></i>, // Spring
    title: 'Java Full Stack Development With Spring Boot',
    issuer: 'ExcelR',
    year: '2026',
    accentColor: '#c9a84c',
    bgColor: 'rgba(201,168,76,0.08)',
    borderColor: 'rgba(201,168,76,0.16)',
    category: 'Full Stack',
  },
  {
    icon: <i className="fa-brands fa-java" style={{ color: "#ff503b" }}></i>, // Java
    title: 'OOPs in Java Certification',
    issuer: 'Elabs · KIIT University',
    year: '2025',
    accentColor: '#ff6b35',
    bgColor: 'rgba(255,107,53,0.07)',
    borderColor: 'rgba(255,107,53,0.14)',
    category: 'Language',
  },
  {
    icon: <i className="fa-brands fa-react" style={{ color: "#5b8dee" }}></i>, // React
    title: 'React Developer Certification',
    issuer: 'IBM · Coursera',
    year: '2026',
    accentColor: '#5b8dee',
    bgColor: 'rgba(91,141,238,0.08)',
    borderColor: 'rgba(91,141,238,0.18)',
    category: 'Frontend',
  },
  {
    // icon:  // MLH (Google icon as given)
    icon: <i className="fa-solid fa-robot" style={{ color: "#7eb3f7" }}></i>,
    title: 'Agentic AI Practitioner',
    issuer: 'UIPath Academy',
    year: '2025',
    accentColor: '#7eb3f7',
    bgColor: 'rgba(126,179,247,0.08)',
    borderColor: 'rgba(126,179,247,0.15)',
    category: 'AI / ML',
  },
  {
    icon: <i className="fa-brands fa-google" style={{ color: "#7eb3f7" }}></i>, 
    title: 'MLH mini Hackathon',
    issuer: 'Google Gemini · KITPD25 Society',
    year: '2025',
    accentColor: '#7eb3f7',
    bgColor: 'rgba(126,179,247,0.08)',
    borderColor: 'rgba(126,179,247,0.15)',
    category: 'Hackathon',
  },
  {
    icon: <i className="fa-brands fa-aws" style={{ color: "#3ddc84" }}></i>, // AWS
    title: 'AWS Cloud Foundations',
    issuer: 'Amazon Web Services',
    year: '2025',
    accentColor: '#3ddc84',
    bgColor: 'rgba(61,220,132,0.07)',
    borderColor: 'rgba(61,220,132,0.15)',
    category: 'Cloud',
  },
  {
    icon: <i className="fa-solid fa-database" style={{ color: "#5b8dee" }}></i>, // SQL
    title: 'SQL Skill Certification',
    issuer: 'HackerRank',
    year: '2025',
    accentColor: '#5b8dee',
    bgColor: 'rgba(91,141,238,0.07)',
    borderColor: 'rgba(91,141,238,0.14)',
    category: 'Database',
  },
  {
    icon: <i className="fa-brands fa-youtube" style={{ color: "#ff6b35" }}></i>, // Imperial
    title: 'Health Systems Development',
    issuer: 'Imperial College London · Coursera',
    year: '2026',
    accentColor: '#ff6b35',
    bgColor: 'rgba(255,107,53,0.07)',
    borderColor: 'rgba(255,107,53,0.14)',
    category: 'Course - I',
  },
  {
    icon: <i className="fa-solid fa-building-columns" style={{ color: "#c9a84c" }}></i>, // AlgoUniversity
    title: 'AlgoUniversity Stage 2 candidate',
    issuer: 'AlgoUniversity',
    year: '2024',
    accentColor: '#c9a84c',
    bgColor: 'rgba(201,168,76,0.07)',
    borderColor: 'rgba(201,168,76,0.14)',
    category: 'Course - II',
  }
]

const categoryColors = {
  'Full Stack': '#c9a84c',
  'Frontend':   '#5b8dee',
  'AI / ML':    '#7eb3f7',
  'Cloud':      '#3ddc84',
  'Language':   '#ff6b35',
  'Database':   '#5b8dee',
  'Course - I':     '#ff6b35',
  'Course - II':    '#c9a84c',
  'Hackathon':      '#7eb3f7',
}

export default function Certificates() {
  useReveal()

  return (
    <div className="page-wrapper">

      <div className="sec-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="sec-label">05 / CERTIFICATES</div>
          <div className="sec-title">Credentials</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, background: 'var(--pdim)', border: '1px solid rgba(91,141,238,0.18)' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: 'var(--p)' }}>8</span>
          <span style={{ fontSize: 12, color: 'var(--t2)', fontWeight: 500 }}>Verified Credentials</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {certs.map((c, i) => (
          <div key={c.title} className="card reveal" style={{ borderColor: c.borderColor, animationDelay: `${i * 0.09}s` }}>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: c.bgColor,
                border: `1px solid ${c.borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0
              }}>
                {c.icon}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--t1)', lineHeight: 1.3, marginBottom: 4 }}>
                  {c.title}
                </div>

                <div style={{ fontSize: 12, color: 'var(--t3)', marginBottom: 6 }}>
                  {c.issuer}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--t3)', letterSpacing: 0.8 }}>
                    {c.year}
                  </span>

                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: categoryColors[c.category],
                    background: `${categoryColors[c.category]}15`,
                    border: `1px solid ${categoryColors[c.category]}30`
                  }}>
                    {c.category}
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              padding: '9px 13px',
              borderRadius: 8,
              background: c.bgColor,
              border: `1px solid ${c.borderColor}`,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <span style={{ color: c.accentColor, fontSize: 14, fontWeight: 700 }}>✓</span>
              <span style={{
                fontSize: 11,
                color: c.accentColor,
                fontWeight: 600,
                letterSpacing: 0.5,
                fontFamily: "'JetBrains Mono', monospace"
              }}>
                Credential Verified
              </span>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                {[...Array(5)].map((_, j) => (
                  <div key={j} style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: c.accentColor,
                    opacity: 0.4 + j * 0.12
                  }} />
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
      <div className="divider" />

      <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
        {[
          { n: '10+', label: 'Total Certificates', color: 'var(--p)' },
          { n: '3+', label: 'Completed in 2025', color: 'var(--green)' },
          { n: '5+', label: 'Technical Domains', color: 'var(--gold)' },
          { n: '2', label: 'Non-Technical', color: 'var(--blue)' },
          { n: '100%', label: 'Credential Verified', color: '#7eb3f7' },
          { n: '0', label: 'Expired / Invalid', color: '#ff6b35'}
        ].map(s => (
          <div key={s.label} className="card-flat" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.n}</div>
            <div style={{ fontSize: 11, color: 'var(--t3)', letterSpacing: 0.8, textTransform: 'uppercase', fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}