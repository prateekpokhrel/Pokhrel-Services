import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const education = [
  {
    id: 'kiit',
    institution: 'Kalinga Institute of Industrial Technology',
    subtitle: 'Deemed to be University · Bhubaneswar, India',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    period: '2023 to 2027 (Expected)',
    status: 'current',
    gpa: '7.44',
    gpaMax: '10',
    gpaLabel: 'CGPA',
    gpaSub: 'Up to 5th Semester · Believed in learning over grades',
    meta: [
      { icon: <i className="fa-solid fa-graduation-cap"></i>, label: 'Degree', value: 'B.Tech CSE' },
      { icon: <i className="fa-solid fa-calendar"></i>, label: 'Duration', value: '4 Years' },
      { icon: <i className="fa-solid fa-building-columns"></i>, label: 'Campus', value: 'Bhubaneswar, Odisha' },
    ],
    courses: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (Java)',
      'Database Management Systems',
      'Computer Networks',
      'Operating Systems',
      'Software Engineering',
      'Machine Learning Fundamentals',
      'Web Technologies',
    ],
  },
  {
    id: 'sagarmatha-plus2',
    institution: 'Sagarmatha Higher Secondary Boarding School',
    subtitle: 'Nepal',
    degree: '+2 Science (Higher Secondary Education)',
    period: '2019 to 2021',
    status: 'completed',
    gpa: '3.59',
    gpaMax: '4.00',
    gpaLabel: 'GPA',
    gpaSub: 'Science Stream · Strong Academic Record',
   meta: [
      { icon: <i className="fa-solid fa-graduation-cap"></i>, label: 'Stream', value: 'Science' },
      { icon: <i className="fa-solid fa-calendar"></i>, label: 'Duration', value: '2 Years' },
      { icon: <i className="fa-solid fa-building-columns"></i>, label: 'Campus', value: 'Biratnagar, Nepal' },
    ],
    courses: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Biology',
      'English',
      'Nepali',
    ],
  },
  {
    id: 'sagarmatha-10',
    institution: 'Sagarmatha Higher Secondary Boarding School',
    subtitle: 'Nepal',
    degree: 'Secondary Education - Upto 10th Standard',
    period: '2006 — 2019',
    status: 'completed',
    gpa: '3.45',
    gpaMax: '4.00',
    gpaLabel: 'GPA',
    gpaSub: 'Strong foundational academic record',
    meta: [
      { icon: <i className="fa-solid fa-graduation-cap"></i>, label: 'Level', value: 'Secondary (Grade 10)' },
      { icon: <i className="fa-solid fa-calendar"></i>, label: 'Duration', value: '13 Years' },
      { icon: <i className="fa-solid fa-building-columns"></i>, label: 'Campus', value: 'Biratnagar, Nepal' },
    ],
    courses: [
      'Mathematics',
      'Science',
      'English',
      'Social Studies',
      'Nepali',
    ]
    ,
  },
]

const gpaData = [
  { label: 'B.Tech CGPA', value: '7.44/10', pct: 88.6, color: 'var(--p)' },
  { label: '+2 Science GPA', value: '3.59/4.00', pct: 89.75, color: 'var(--t2)' },
  { label: 'Secondary GPA', value: '3.45/4.00', pct: 86.25, color: 'var(--t3)' },
]

const currentlyStudying = [
  'Spring Boot Microservices Architecture',
  'Applied Machine Learning with PyTorch',
  'Data Engineering with Spark & Kafka',
  'Distributed System Design',
];

export default function Education() {
  useReveal()
  const navigate = useNavigate()

  return (
    <div className="page-wrapper">
      {/* ── Header ── */}
      <div className="sec-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="sec-label">04 / EDUCATION</div>
          <div className="sec-title">Academic Journey</div>
        </div>
              <button
        className="btn btn-ghost"
        onClick={() => navigate('/about')}
        style={{ fontSize: 12 }}
      >
        <i
          className="fa-solid fa-arrow-left-long"
          style={{ marginRight: 6, color: 'var(--t2)' }}
        ></i>
        About
      </button>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 28, alignItems: 'start' }}>

        {/* ── Left: Timeline ── */}
        <div style={{ position: 'relative', paddingLeft: 36 }}>
  
  {/* Timeline spine */}
  <div
    style={{
      position: 'absolute',
      left: 2, 
      top: 16,   
      bottom: 0,
      width: 2,
      background:
        'linear-gradient(180deg, var(--p), rgba(91,141,238,0.08))',
    }}
  />

  {education.map((edu, i) => (
    <div
      key={edu.id}
      className="reveal"
      style={{
        position: 'relative',
        marginBottom: 28,
        animationDelay: `${i * 0.6}s`,
      }}
    >
      
      {/* Timeline dot */}
      <div style={{ position: 'absolute', left: -43, top: 25 }}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: `2px solid ${
              edu.status === 'current'
                ? 'var(--p)'
                : 'var(--bdr2)'
            }`,
            background: 'var(--bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background:
                edu.status === 'current'
                  ? 'var(--p)'
                  : 'var(--t3)',
            }}
          />
        </div>
      </div>

              {/* Card */}
              <div className="card" style={{ borderColor: edu.status === 'current' ? 'rgba(91,141,238,0.22)' : 'var(--bdr)', boxShadow: edu.status === 'current' ? '0 0 0 1px rgba(91,141,238,0.07)' : 'none' }}>
                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: 'var(--t1)', lineHeight: 1.2, marginBottom: 3 }}>
                      {edu.institution}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--t3)' }}>{edu.subtitle}</div>
                  </div>
                  <span className={`badge ${edu.status === 'current' ? 'badge-green' : 'badge-blue'}`}>
                    {edu.status === 'current' ? 'Current' : 'Completed'}
                  </span>
                </div>

                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--p)', marginBottom: 4 }}>
                  {edu.degree}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--t3)', letterSpacing: 0.8 }}>
                  {edu.period}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--bdr)', margin: '16px 0' }} />

                {/* GPA highlight */}
                <div style={{ padding: '13px 16px', borderRadius: 10, background: edu.status === 'current' ? 'rgba(91,141,238,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${edu.status === 'current' ? 'rgba(91,141,238,0.14)' : 'var(--bdr)'}`, display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: edu.status === 'current' ? 28 : 22, fontWeight: 800, color: edu.status === 'current' ? 'var(--p)' : 'var(--t2)', lineHeight: 1, flexShrink: 0 }}>
                    {edu.gpa}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: edu.status === 'current' ? 'var(--t2)' : 'var(--t3)', fontWeight: 500, marginBottom: 2 }}>
                      {edu.gpaLabel} out of {edu.gpaMax}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--t3)' }}>{edu.gpaSub}</div>
                  </div>
                </div>

                {/* Meta chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {edu.meta.map(m => (
                    <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 7, background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
                      <span style={{ fontSize: 14 }}>{m.icon}</span>
                      <div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: 0.8, display: 'block' }}>{m.label}</span>
                        <span style={{ fontSize: 12, color: 'var(--t1)', fontWeight: 600, display: 'block' }}>{m.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coursework (KIIT only) */}
                {edu.courses && (
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'var(--t3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Core Coursework</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {edu.courses.map(c => (
                        <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 7, background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--p)', flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: 'var(--t2)' }}>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: Sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 60 }}>

          {/* Academic summary */}
          <div className="card-flat reveal">
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--p)', marginBottom: 16 }}>
              Academic Summary
            </div>

            {[
              { icon: <i className="fa-solid fa-graduation-cap"></i>, label: 'Current Degree', value: 'B.Tech CSE' },
              { icon: <i className="fa-solid fa-award"></i>, label: 'Current CGPA', value: '7.44 / 10' },
              { icon: <i className="fa-solid fa-building-columns"></i>, label: 'University', value: 'KIIT, Bhubaneswar' },
              { icon: <i className="fa-solid fa-user-graduate"></i>, label: 'Graduating', value: '2027 (Expected)' },
              { icon: <i className="fa-solid fa-location-dot"></i>, label: 'Origin', value: 'Nepal' },
            ].map((item, i, arr) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--bdr)' : 'none' }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--pdim)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <span style={{ fontSize: 10, color: 'var(--t3)', display: 'block', textTransform: 'uppercase', letterSpacing: 0.8, fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--t1)', fontWeight: 600, display: 'block' }}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* GPA chart */}
          <div className="card-flat reveal">
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--p)', marginBottom: 16 }}>GPA Progression</div>
            {gpaData.map(g => (
              <div key={g.label} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                  <span style={{ color: 'var(--t2)' }}>{g.label}</span>
                  <span style={{ color: g.color, fontFamily: "'JetBrains Mono', monospace" }}>{g.value}</span>
                </div>
                <div className="sk-track">
                  <div className="sk-fill" style={{ width: `${g.pct}%`, background: `linear-gradient(90deg, ${g.color}, ${g.color}88)` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Currently studying */}
          <div className="card-flat reveal">
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: 'var(--p)', marginBottom: 14 }}>Currently Studying</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {currentlyStudying.map(c => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 7, background: 'var(--bg2)', border: '1px solid var(--bdr)' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--p)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--t2)' }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career goal */}
          <div className="card-flat reveal" style={{ background: 'rgba(91,141,238,0.05)', borderColor: 'rgba(91,141,238,0.18)' }}>
            <div style={{ fontSize: 13, color: 'var(--p)', fontWeight: 600, marginBottom: 8 }}>
              Career Goal
            </div>
            <p style={{ fontSize: 12, color: 'var(--t2)', lineHeight: 1.75 }}>
            Aiming to build scalable digital systems and AI-driven solutions that solve meaningful societal problems. 
            I aim to create impactful products, contribute to technological progress, 
            and grow into a builder who drives innovation rather than just following it.

            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
