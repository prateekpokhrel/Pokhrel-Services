import { useState, useMemo } from 'react'
import { useReveal } from '../hooks/useReveal'

const projects = [
 [
 [
  {
    num: '01',
    category: 'E-commerce',
    title: 'DokoXpress - Multi-Vendor E-commerce Platform',
    desc: 'Comprehensive multi-vendor e-commerce platform built with a Java Spring Boot backend and React frontend. Features include product management, order processing, user authentication with JWT, and AWS deployment for scalability.',
    tags: ['Java', 'Spring Boot', 'React','Tailwind CSS', 'MySQL','JWT', 'AWS'],
    status: 'Active Development',
    year: '2026',
    link: 'https://github.com/prateekpokhrel/DokoXpress'
  },
  {
    num: '02',
    category: 'Library Management System',
    title: 'LMS Portal',
    desc: 'A full-stack Library Management System designed to manage books, users, borrowing records, and admin operations. It provides a structured dashboard for librarians and users with features like book search, issue/return tracking, and role-based access control.',
    tags: ['Java', 'Spring Boot', 'React', 'SQL', 'JWT'],
    status: 'Completed',
    year: '2026',
    link: 'https://github.com/prateekpokhrel/Library-Management-System'
  },
  {
    num: '03',
    category: 'FinTech / AI',
    title: 'Kavout - AI Stock Forecasting Platform',
    desc: 'AI-powered time-series forecasting platform for the Indian stock market analyzing companies listed on NSE. Generates predictive insights for 1-day, 15-day, and 30-day horizons with a built-in paper trading engine for strategy simulation.',
    tags: ['Python', 'AI/ML', 'Linear Regression Models', 'React', 'Fast API'],
    status: 'Active Development',
    year: '2026',
    link: 'https://kavout-ltsf.vercel.app/' 
  },

  {
    num: '04',
    category: 'EduTech',
    title: 'SUIS - Smart University Intelligence System',
    desc: 'AI-enabled university management platform designed to replace legacy SAP-based systems. It integrates academic, administrative, and operational modules into a single scalable platform with centralized data flow and real-time institutional analytics.',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL', 'AI'],
    status: 'Developed & Deployed',
    year: '2025',
    link:'https://suis-rouge.vercel.app/'
  },
  {
    num: '05',
    category: 'AI Logistics Platform',
    title: 'DeliverAI Guard',
    desc: 'AI-powered delivery failure prediction and real-time logistics monitoring platform. It uses XGBoost-based machine learning, FastAPI inference engine, and WebSocket-based real-time tracking to predict delivery risks and monitor logistics operations for large-scale delivery systems.',
    tags: ['React', 'Spring Boot', 'FastAPI', 'XGBoost', 'PostgreSQL', 'Docker'],
    status: 'Completed',
    year: '2025',
    link: 'https://github.com/prateekpokhrel/DeliverAI-Guard'
  },
  {
    num: '06',
    category: 'AI Navigation & Intelligence System',
    title: 'NaviQ',
    desc: 'An AI-powered intelligent navigation and query system designed to provide smart contextual assistance, optimized search responses, and structured information retrieval using modern AI techniques. The system focuses on improving user interaction efficiency through intelligent ranking, response optimization, and scalable backend architecture.',
    tags: ['Python', 'FastAPI', 'Machine Learning', 'NLP', 'React'],
    status: 'Completed',
    year: '2025',
    link: 'https://github.com/prateekpokhrel/NaviQ'
  },
  {
    num: '07',
    category: 'Civic Tech',
    title: 'AI Smart City Issue Solver',
    desc: 'AI-driven civic issue reporting platform where citizens can submit problems such as road damage, waste management, or electricity issues. The system categorizes issues using AI and routes them to the appropriate municipal department.',
    tags: ['React', 'Python', 'ML Model', 'Fast API'],
    status: 'Completed',
    year: '2025',
    link: 'https://agentic-city-problem-solver.vercel.app/'
  },
  {
    num: '08',
    category: 'Enterprise Backend System',
    title: 'aICE - AI Interaction Control Engine',
    desc: 'Enterprise-grade Spring Boot microservice backend system designed for scalable AI-driven social platform architecture. It includes Redis-powered concurrency control, virality scoring, notification batching, nested threaded comments, real-time analytics, WebSocket updates, and JWT-based security.',
    tags: ['Java', 'Spring Boot', 'Redis', 'PostgreSQL', 'WebSocket', 'Docker', 'React'],
    status: 'Completed',
    year: '2025',
    link: 'https://github.com/prateekpokhrel/aICE'
  },
  {
    num: '09',
    category: 'Weather Forecasting Platform',
    title: 'Atoms Weather Forecasting App',
    desc: 'A modern weather forecasting application that provides real-time weather updates, location-based forecasts, and clean UI-based weather visualization. Built with API integration for live weather data and responsive frontend design.',
    tags: ['React', 'JavaScript', 'Weather API', 'CSS', 'OpenWeather API'],
    status: 'Completed',
    year: '2025',
    link: 'https://github.com/prateekpokhrel/atoms--Weather-Forecasting-App'
  },

  {
    num: '10',
    category: 'Web Platform',
    title: 'MyRecipes - Recipe Recommender Platform',
    desc: 'Interactive recipe discovery platform allowing users to explore, save, and share cooking recipes. Features search filtering, personalized recipe collections, and a clean responsive UI.',
    tags: ['React', 'JavaScript','MongoDB'],
    status: 'Completed',
    year: '2024',
    link: 'https://my-recipes-pi.vercel.app/'
  }
]
]
]

export default function Projects() {

  useReveal()

  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    if (active === 'All') return projects
    return projects.filter(p => p.tags.includes(active))
  }, [active])

  return (
    <div className="page-wrapper">

      {/* ── Header ── */}
      <div
        className="sec-header reveal"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div>
          <div className="sec-label">02 / PROJECTS</div>
          <div className="sec-title">Selected Work</div>
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--t3)'
          }}
        >
          {filtered.length} of {projects.length} projects
        </div>
      </div>

      {/* ── Filter chips ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
        {['All', 'Java', 'React', 'Spring Boot', 'AI/ML', 'Python', 'MongoDB'].map(tag => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`chip ${active === tag ? 'chip-active' : ''}`}
            style={{
              cursor: 'pointer',
              border: 'none',
              padding: '6px 14px'
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ── Project grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: 16
        }}
      >
        {filtered.map((p) => (
          <div
            key={p.num}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >

            {/* Card top meta */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: 'rgba(91,141,238,0.4)'
                  }}
                >
                  {p.num}
                </span>

                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: 'var(--t3)',
                    background: 'var(--bg2)',
                    border: '1px solid var(--bdr)'
                  }}
                >
                  {p.category}
                </span>
              </div>

              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: 'var(--t3)'
                }}
              >
                {p.year}
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--t1)',
                lineHeight: 1.3,
                marginBottom: 10
              }}
            >
              {p.title}
            </div>

            {/* Desc */}
            <p
              style={{
                fontSize: 13,
                color: 'var(--t3)',
                lineHeight: 1.75,
                marginBottom: 18,
                flexGrow: 1
              }}
            >
              {p.desc}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
              {p.tags.map(t => (
                <span
                  key={t}
                  style={{
                    padding: '3px 9px',
                    borderRadius: 4,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: 'var(--t3)',
                    background: 'var(--bg2)',
                    border: '1px solid var(--bdr)'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 16,
                borderTop: '1px solid var(--bdr)',
                marginTop: 'auto'
              }}
            >

                      <button
          style={{
            fontSize: 12,
            color: 'var(--p)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            transition: 'gap 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.gap = '9px'}
          onMouseLeave={e => e.currentTarget.style.gap = '5px'}
          onClick={() => {
            if (p.link) {
              window.location.href = p.link   
            }
          }}
          >
            View Project <span>→</span>
          </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'var(--green)'
                  }}
                />

                <span
                  style={{
                    fontSize: 10,
                    color: 'var(--t3)',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}
                >
                  {p.status}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 0',
            color: 'var(--t3)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13
          }}
        >
          No projects match this filter.
        </div>
      )}

    </div>
  )
}