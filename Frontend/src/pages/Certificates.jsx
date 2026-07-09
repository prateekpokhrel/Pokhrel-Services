import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const certs = [
  {
    icon: <i className="fa-solid fa-code" style={{ color: "#c9a84c" }}></i>,
    title: 'Java Full Stack Development With Spring Boot',
    issuer: 'ExcelR',
    year: '2026',
    accentColor: '#c9a84c',
    bgColor: 'rgba(201,168,76,0.08)',
    borderColor: 'rgba(201,168,76,0.16)',
    category: 'Full Stack',
    driveLink: 'https://drive.google.com/file/d/1TTR9y5VZU6ocgB3zyXUrA9__-d1CGmCT/preview'
  },
  {
    icon: <i className="fa-brands fa-java" style={{ color: "#ff503b" }}></i>,
    title: 'OOPs in Java Certification',
    issuer: 'Elabs · KIIT University',
    year: '2025',
    accentColor: '#ff6b35',
    bgColor: 'rgba(255,107,53,0.07)',
    borderColor: 'rgba(255,107,53,0.14)',
    category: 'Language',
    driveLink: 'https://drive.google.com/file/d/1rQVEiRbFYWTxa0u9opv_HGWS3-OpA8-B/preview'
  },
  {
    icon: <i className="fa-brands fa-html5" style={{ color: "#ff6b35" }}></i>,
    title: 'Introduction to HTML, CSS & JS',
    issuer: 'IBM · Coursera',
    year: '2026',
    accentColor: '#ff6b35',
    bgColor: 'rgba(255,107,53,0.07)',
    borderColor: 'rgba(255,107,53,0.14)',
    category: 'Frontend',
    driveLink: 'https://drive.google.com/file/d/1GSvWTfCtwxEwaa_r4VKATFPAxWi5cAQF/preview'
  },
  {
    icon: <i className="fa-brands fa-react" style={{ color: "#5b8dee" }}></i>,
    title: 'React Developer Certification',
    issuer: 'Hacker Rank',
    year: '2026',
    accentColor: '#5b8dee',
    bgColor: 'rgba(91,141,238,0.08)',
    borderColor: 'rgba(91,141,238,0.18)',
    category: 'Frontend',
    driveLink: 'https://drive.google.com/file/d/18b5ujD9CvWNI4HiRPlzfsFRTS2VaNmvS/preview'
  },
  {
    icon: <i className="fa-solid fa-robot" style={{ color: "#7eb3f7" }}></i>,
    title: 'Agentic AI Practitioner',
    issuer: 'UIPath Academy',
    year: '2025',
    accentColor: '#7eb3f7',
    bgColor: 'rgba(126,179,247,0.08)',
    borderColor: 'rgba(126,179,247,0.15)',
    category: 'AI / ML',
    driveLink: 'https://drive.google.com/file/d/1lxuQ1qOLjTlQxVKCUL5MIzSjV3sNQCXt/preview'
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
    driveLink: 'https://drive.google.com/file/d/1jVUVvhRDSq0UnOilW2-028loBK7hz7Du/preview'
  },
  {
    icon: <i className="fa-brands fa-aws" style={{ color: "#3ddc84" }}></i>,
    title: 'AWS Cloud Foundations',
    issuer: 'Amazon Web Services',
    year: '2025',
    accentColor: '#3ddc84',
    bgColor: 'rgba(61,220,132,0.07)',
    borderColor: 'rgba(61,220,132,0.15)',
    category: 'Cloud',
    driveLink: 'https://drive.google.com/file/d/13uIMSvkNFIKfAiDmm4Zq4F9ZnCf-WY92/preview'
  },
  {
    icon: <i className="fa-solid fa-database" style={{ color: "#5b8dee" }}></i>,
    title: 'SQL Skill Certification',
    issuer: 'HackerRank',
    year: '2025',
    accentColor: '#5b8dee',
    bgColor: 'rgba(91,141,238,0.07)',
    borderColor: 'rgba(91,141,238,0.14)',
    category: 'Database',
    driveLink: 'https://drive.google.com/file/d/10Rj9EE7oLMC6X1iZetb_yiWAsro47Iy5/preview'
  },
  {
    icon: <i className="fa-solid fa-building-columns" style={{ color: "#c9a84c" }}></i>,
    title: 'AlgoUniversity Stage 2 candidate',
    issuer: 'AlgoUniversity',
    year: '2024',
    accentColor: '#c9a84c',
    bgColor: 'rgba(201,168,76,0.07)',
    borderColor: 'rgba(201,168,76,0.14)',
    category: 'Course - II',
    driveLink: 'https://drive.google.com/file/d/1H2Y_L5v8FlZ2-esbazjvxiO7UogDbarm/preview'
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
  const [activePreview, setActivePreview] = useState(null)

  return (
    <div className="page-wrapper">

      <div className="sec-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="sec-label">05 / CERTIFICATES</div>
          <div className="sec-title">Credentials</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, background: 'var(--pdim)', border: '1px solid rgba(91,141,238,0.18)' }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: 'var(--p)' }}>{certs.length}</span>
          <span style={{ fontSize: 12, color: 'var(--t2)', fontWeight: 500 }}>Verified Credentials</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {certs.map((c, i) => (
          <div 
            key={c.title} 
            className="card reveal" 
            style={{ 
              borderColor: c.borderColor, 
              animationDelay: `${i * 0.09}s`,
              cursor: 'pointer', 
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onClick={() => setActivePreview(c.driveLink)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = `0 8px 24px ${c.bgColor}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
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
                View Document
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

{/* DOCUMENT PREVIEW MODAL */}
{activePreview && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255,255,255,0.35)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    onClick={() => setActivePreview(null)}
  >

    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1050px',
        height: '80vh',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,.5)',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}
      <div
        style={{
          height: '58px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          borderBottom: '1px solid rgba(0,0,0,.08)',
          background: '#f8fafc',
          backdropFilter: 'blur(12px)',
          flexShrink: 0
        }}
      >
        <div
          style={{
            color: '#111827',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '.5px'
          }}
        >
        Certificate Preview
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActivePreview(null);
          }}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '1px solid #d1d5db',
            background: '#ffffff',
            color: '#374151',
            boxShadow: '0 2px 8px rgba(0,0,0,.08)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: '.2s'
          }}
          onMouseEnter={(e) => {
          e.currentTarget.style.background = '#ef4444';
          e.currentTarget.style.borderColor = '#ef4444';
          e.currentTarget.style.color = '#ffffff';
          }}
         onMouseLeave={(e) => {
         e.currentTarget.style.background = '#ffffff';
         e.currentTarget.style.borderColor = '#d1d5db';
         e.currentTarget.style.color = '#374151';
          }}
        >
          ✕
        </button>
      </div>

      {/* IFRAME */}
      <iframe
        src={
          activePreview.includes('/preview')
            ? activePreview
            : activePreview.replace(/\/view.*$/, '/preview')
        }
        title="Certificate Preview"
        style={{
          width: '100%',
          flex: 1,
          border: 'none',
          background: 'transparent'
        }}
        allow="autoplay"
        loading="lazy"
      />
    </div>
  </div>
)}
    </div>
  )
}