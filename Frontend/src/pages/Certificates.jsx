import React, { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const certs = [
  {
    icon: <i className="fa-solid fa-code" style={{ color: "#E6B422" }}></i>,
    title: "Java Full Stack Development With Spring Boot",
    issuer: "ExcelR",
    year: "2026",
    accentColor: "#E6B422",
    bgColor: "rgba(230,180,34,.08)",
    borderColor: "rgba(230,180,34,.20)",
    category: "Full Stack",
    driveLink: "https://drive.google.com/file/d/1TTR9y5VZU6ocgB3zyXUrA9__-d1CGmCT/preview",
  },

  {
    icon: <i className="fa-brands fa-java" style={{ color: "#FF6A3D" }}></i>,
    title: "OOPs in Java Certification",
    issuer: "ELabs · KIIT University",
    year: "2025",
    accentColor: "#FF6A3D",
    bgColor: "rgba(255,106,61,.08)",
    borderColor: "rgba(255,106,61,.20)",
    category: "Language",
    driveLink: "https://drive.google.com/file/d/1rQVEiRbFYWTxa0u9opv_HGWS3-OpA8-B/preview",
  },

  {
    icon: <i className="fa-brands fa-html5" style={{ color: "#F06529" }}></i>,
    title: "Introduction to HTML, CSS & JS",
    issuer: "IBM · Coursera",
    year: "2026",
    accentColor: "#F06529",
    bgColor: "rgba(240,101,41,.08)",
    borderColor: "rgba(240,101,41,.20)",
    category: "Frontend",
    driveLink: "https://drive.google.com/file/d/1GSvWTfCtwxEwaa_r4VKATFPAxWi5cAQF/preview",
  },

  {
    icon: <i className="fa-brands fa-react" style={{ color: "#61DAFB" }}></i>,
    title: "React Developer Certification",
    issuer: "HackerRank",
    year: "2026",
    accentColor: "#61DAFB",
    bgColor: "rgba(97,218,251,.08)",
    borderColor: "rgba(97,218,251,.20)",
    category: "Frontend",
    driveLink: "https://drive.google.com/file/d/18b5ujD9CvWNI4HiRPlzfsFRTS2VaNmvS/preview",
  },

  {
    icon: <i className="fa-brands fa-js" style={{ color: "#F7DF1E" }}></i>,
    title: "JavaScript (Intermediate)",
    issuer: "HackerRank",
    year: "2026",
    accentColor: "#F7DF1E",
    bgColor: "rgba(247,223,30,.08)",
    borderColor: "rgba(247,223,30,.20)",
    category: "Programming",
    driveLink: "https://drive.google.com/file/d/1e4MnQBnRbp7yCEDkK_KJVCRe9TS2OVeR/preview",
  },

  {
    icon: <i className="fa-solid fa-hackerrank" style={{ color: "#8B5CF6" }}></i>,
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    year: "2026",
    accentColor: "#8B5CF6",
    bgColor: "rgba(139,92,246,.08)",
    borderColor: "rgba(139,92,246,.20)",
    category: "Software Engineering",
    driveLink: "https://drive.google.com/file/d/1cQ3iGnN8ZL6dSh0ykuVrh7sCMMhidO8f/preview",
  },

  {
    icon: <i className="fa-solid fa-building-columns" style={{ color: "#2563EB" }}></i>,
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. (Forage)",
    year: "2026",
    accentColor: "#2563EB",
    bgColor: "rgba(37,99,235,.08)",
    borderColor: "rgba(37,99,235,.20)",
    category: "Job Simulation",
    driveLink: "https://drive.google.com/file/d/16kUl6O1D4ZYV3cqQRKBQjBDp6p7Tiaj0/preview",
  },

  {
    icon: <i className="fa-solid fa-robot" style={{ color: "#EC4899" }}></i>,
    title: "Agentic AI Practitioner",
    issuer: "UiPath Academy",
    year: "2025",
    accentColor: "#EC4899",
    bgColor: "rgba(236,72,153,.08)",
    borderColor: "rgba(236,72,153,.20)",
    category: "AI / ML",
    driveLink: "https://drive.google.com/file/d/1lxuQ1qOLjTlQxVKCUL5MIzSjV3sNQCXt/preview",
  },

  {
    icon: <i className="fa-brands fa-google" style={{ color: "#14B8A6" }}></i>,
    title: "MLH Mini Hackathon",
    issuer: "Google Gemini · KITPD25 Society",
    year: "2025",
    accentColor: "#14B8A6",
    bgColor: "rgba(20,184,166,.08)",
    borderColor: "rgba(20,184,166,.20)",
    category: "Hackathon",
    driveLink: "https://drive.google.com/file/d/1jVUVvhRDSq0UnOilW2-028loBK7hz7Du/preview",
  },

  {
    icon: <i className="fa-brands fa-aws" style={{ color: "#FF9900" }}></i>,
    title: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    year: "2025",
    accentColor: "#FF9900",
    bgColor: "rgba(255,153,0,.08)",
    borderColor: "rgba(255,153,0,.20)",
    category: "Cloud",
    driveLink: "https://drive.google.com/file/d/13uIMSvkNFIKfAiDmm4Zq4F9ZnCf-WY92/preview",
  },

  {
    icon: <i className="fa-solid fa-database" style={{ color: "#0EA5E9" }}></i>,
    title: "SQL Skill Certification",
    issuer: "HackerRank",
    year: "2025",
    accentColor: "#0EA5E9",
    bgColor: "rgba(14,165,233,.08)",
    borderColor: "rgba(14,165,233,.20)",
    category: "Database",
    driveLink: "https://drive.google.com/file/d/10Rj9EE7oLMC6X1iZetb_yiWAsro47Iy5/preview",
  },

  {
    icon: <i className="fa-solid fa-medal" style={{ color: "#84CC16" }}></i>,
    title: "AlgoUniversity Stage 2 Candidate",
    issuer: "AlgoUniversity",
    year: "2024",
    accentColor: "#84CC16",
    bgColor: "rgba(132,204,22,.08)",
    borderColor: "rgba(132,204,22,.20)",
    category: "Course - II",
    driveLink: "https://drive.google.com/file/d/1H2Y_L5v8FlZ2-esbazjvxiO7UogDbarm/preview",
  },
];

const categoryColors = {
  "Full Stack": "#E6B422",
  "Language": "#FF6A3D",
  "Frontend": "#F06529",
  "Programming": "#F7DF1E",
  "Software Engineering": "#8B5CF6",
  "Job Simulation": "#2563EB",
  "AI / ML": "#EC4899",
  "Hackathon": "#14B8A6",
  "Cloud": "#FF9900",
  "Database": "#0EA5E9",
  "Course - II": "#84CC16",
};

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