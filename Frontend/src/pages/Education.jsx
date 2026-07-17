import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Cleaned up data structure to separate logic from presentation
const education = [
  {
    id: 'kiit',
    institution: 'Kalinga Institute of Industrial Technology',
    subtitle: 'Deemed to be University · Bhubaneswar, India',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    period: '2023 to 2027 (Expected)',
    status: 'current',
    gpa: '7.73',
    gpaMax: '10',
    gpaLabel: 'CGPA',
    gpaSub: 'Up to 6th Semester · Believed in learning over grades',
    meta: [
      { icon: 'fa-graduation-cap', label: 'Degree', value: 'B.Tech CSE' },
      { icon: 'fa-calendar-days', label: 'Duration', value: '4 Years' },
      { icon: 'fa-map-location-dot', label: 'Campus', value: 'Bhubaneswar, Odisha' },
    ],
    courses: [
      'Data Structures & Algorithms',
      'Java Spring Boot Full Stack Development',
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
      { icon: 'fa-flask', label: 'Stream', value: 'Science' },
      { icon: 'fa-clock', label: 'Duration', value: '2 Years' },
      { icon: 'fa-building-columns', label: 'Campus', value: 'Biratnagar, Nepal' },
    ],
    courses: [
      'Physics - A+',
      'Chemistry - A+',
      'Mathematics - A+',
      'Biology - A+',
      'English',
      'Nepali',
    ],
  },
  {
    id: 'sagarmatha-10',
    institution: 'Sagarmatha Higher Secondary Boarding School',
    subtitle: 'Nepal',
    degree: 'Secondary Education - Upto 10th Standard',
    period: '2006 to 2019',
    status: 'completed',
    gpa: '3.45',
    gpaMax: '4.00',
    gpaLabel: 'GPA',
    gpaSub: 'Strong foundational academic record',
    meta: [
      { icon: 'fa-school', label: 'Level', value: 'Secondary (Grade 10)' },
      { icon: 'fa-timeline', label: 'Duration', value: '13 Years' },
      { icon: 'fa-building-columns', label: 'Campus', value: 'Biratnagar, Nepal' },
    ],
    courses: [
      'Mathematics',
      'Science',
      'English',
      'Computer Science',
      'Optional Mathematics',
      'Social Studies',
      'Nepali',
    ],
  },
];

const gpaData = [
  { label: 'B.Tech SGPA', value: '9.08/10', pct: 88.6, color: '#5B8DEE' }, // Primary Blue
  { label: '+2 Science GPA', value: '3.59/4.00', pct: 89.75, color: '#10B981' }, // Emerald
  { label: 'Secondary GPA', value: '3.45/4.00', pct: 86.25, color: '#8B5CF6' }, // Violet
];

const currentlyStudying = [
  'Spring Boot Microservices Architecture',
  'Applied Machine Learning with PyTorch',
  'Data Engineering with Spark & Kafka',
  'Distributed System Design',
];

const EduStyles = () => (
  <style>{`
    :root {
      --edu-p: var(--p, #5B8DEE);
      --edu-p-rgb: 91, 141, 238;
      --edu-bg: var(--bg, #050505);
      --edu-card-bg: rgba(25, 25, 25, 0.4);
      --edu-card-border: rgba(255, 255, 255, 0.08);
      --edu-text-main: #ffffff;
      --edu-text-muted: #a3a3a3;
      --edu-text-faint: #737373;
    }

    /* Container & Grid Setup - Fully Responsive */
    .edu-wrapper {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: clamp(1rem, 4vw, 2.5rem);
      font-family: 'Inter', sans-serif;
      color: var(--edu-text-main);
      overflow-x: hidden;
    }

    /* Mobile First Grid */
    .edu-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-top: 2.5rem;
      align-items: start;
    }

    /* Tablet Breakpoint */
    @media (min-width: 768px) {
      .edu-layout {
        gap: 3rem;
      }
    }
    
    /* Laptop/Desktop Breakpoint */
    @media (min-width: 1024px) {
      .edu-layout {
        grid-template-columns: 1fr 340px;
      }
    }
    
    /* Ultrawide Breakpoint */
    @media (min-width: 1280px) {
      .edu-layout {
        grid-template-columns: 1fr 380px;
        gap: 4rem;
      }
    }

    /* Premium Animations */
    @keyframes magicReveal {
      0% { 
        opacity: 0; 
        transform: translateY(60px) scale(0.96) rotateX(-8deg); 
        filter: blur(8px); 
      }
      100% { 
        opacity: 1; 
        transform: translateY(0) scale(1) rotateX(0); 
        filter: blur(0); 
      }
    }
    
    @keyframes pulseGlow {
      0% { box-shadow: 0 0 0 0 rgba(var(--edu-p-rgb), 0.5); }
      70% { box-shadow: 0 0 0 15px rgba(var(--edu-p-rgb), 0); }
      100% { box-shadow: 0 0 0 0 rgba(var(--edu-p-rgb), 0); }
    }
    
    @keyframes fillWidth {
      from { width: 0; }
    }

    @keyframes floatUp {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    .magic-item {
      opacity: 0;
      visibility: hidden;
      will-change: transform, opacity, filter;
    }
    
    .magic-item.is-visible {
      animation: magicReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      visibility: visible;
    }

    /* Timeline Core setup for mobile and desktop */
    .edu-timeline {
      position: relative;
      padding-left: clamp(2rem, 6vw, 4rem);
    }

    .edu-timeline::before {
      content: '';
      position: absolute;
      left: clamp(0.5rem, 3vw, 1rem);
      top: 1rem;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, var(--edu-p) 0%, rgba(var(--edu-p-rgb), 0.1) 60%, transparent 100%);
      border-radius: 2px;
    }

    .timeline-node {
  position: absolute;
  left: calc(clamp(0.5rem, 2vw, 1rem) - 73px);
  top: 43px; /* Adjusted down to align with the visual center of the heading */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--edu-bg);
  border: 2px solid var(--edu-card-border);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: all 0.4s ease;
}

    .timeline-node.active {
      border-color: var(--edu-p);
      animation: pulseGlow 2.5s infinite;
    }

    .timeline-node::after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--edu-text-muted);
      transition: all 0.4s ease;
    }

    .timeline-node.active::after {
      background: var(--edu-p);
      box-shadow: 0 0 10px var(--edu-p);
    }

    /* Glassmorphism Product Cards */
    .edu-card {
      position: relative;
      background: var(--edu-card-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--edu-card-border);
      border-radius: 20px;
      padding: clamp(1.25rem, 4vw, 2.25rem);
      margin-bottom: clamp(2rem, 5vw, 3rem);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
    }

    .edu-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 1;
    }

    .edu-card:hover {
      transform: translateY(-5px);
      border-color: rgba(var(--edu-p-rgb), 0.3);
      box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(var(--edu-p-rgb), 0.1);
    }

    .edu-card:hover::before {
      opacity: 1;
    }

    .edu-card > * {
      position: relative;
      z-index: 3;
    }

    .edu-card.active-card {
      background: linear-gradient(145deg, rgba(30,30,30,0.6), rgba(var(--edu-p-rgb), 0.05));
      border-color: rgba(var(--edu-p-rgb), 0.25);
    }

    /* Badges & Micro-UI */
    .status-badge {
      padding: 0.4rem 1rem;
      border-radius: 100px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      white-space: nowrap;
    }
    
    .status-badge.current {
      background: rgba(var(--edu-p-rgb), 0.15);
      color: var(--edu-p);
      border: 1px solid rgba(var(--edu-p-rgb), 0.3);
    }
    
    .status-badge.completed {
      background: rgba(255,255,255,0.05);
      color: var(--edu-text-muted);
      border: 1px solid var(--edu-card-border);
    }

    /* Expandable Accordion */
    .courses-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .courses-wrapper.open {
      grid-template-rows: 1fr;
    }
    .courses-inner {
      overflow: hidden;
    }

    .toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: transparent;
      border: none;
      color: var(--edu-p);
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      padding: 1.5rem 0 0 0;
      transition: color 0.3s;
    }
    .toggle-btn i {
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .toggle-btn.open i {
      transform: rotate(180deg);
    }

    /* Sidebar Widgets */
    .sidebar-widget {
      background: var(--edu-card-bg);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid var(--edu-card-border);
      border-radius: 16px;
      padding: clamp(1.25rem, 3vw, 1.75rem);
      margin-bottom: 1.5rem;
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .sidebar-widget:hover {
      border-color: rgba(255,255,255,0.15);
      transform: translateY(-2px);
    }

    /* Progress Bars */
    .progress-track {
      width: 100%;
      height: 6px;
      background: rgba(255,255,255,0.05);
      border-radius: 4px;
      overflow: hidden;
      margin-top: 10px;
    }
    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transform-origin: left;
    }
    .is-visible .progress-fill {
      animation: fillWidth 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    /* Typography Utilities */
    .font-syne { font-family: 'Syne', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
    
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 0.75rem;
    }
  `}</style>
);

// Custom Intersection Observer Hook for smooth, staggered reveals on scroll
const useScrollReveal = (options = {}) => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px', ...options });

    const currentElements = elementsRef.current;
    currentElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      currentElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [options]);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return addToRefs;
};

const EduTimelineCard = ({ edu, index, revealRef }) => {
  const [isOpen, setIsOpen] = useState(edu.status === 'current');
  const cardRef = useRef(null);

  // Mouse hover glow spotlight effect (Brand Showcase specific feature)
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      className="magic-item"
      ref={revealRef}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className={`timeline-node ${edu.status === 'current' ? 'active' : ''}`} />
      
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`edu-card ${edu.status === 'current' ? 'active-card' : ''}`}
      >
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ flex: '1 1 200px' }}>
            <h3 className="font-syne" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, margin: '0 0 0.35rem 0', lineHeight: 1.2 }}>
              {edu.institution}
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--edu-text-muted)' }}>{edu.subtitle}</div>
          </div>
          <span className={`status-badge ${edu.status === 'current' ? 'current' : 'completed'}`}>
            {edu.status === 'current' ? 'Current' : 'Completed'}
          </span>
        </div>

        {/* Degree & Timeline */}
        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--edu-p)', marginBottom: '0.6rem', lineHeight: 1.4 }}>
          {edu.degree}
        </div>
        <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--edu-text-faint)', letterSpacing: '0.05em' }}>
          {edu.period}
        </div>

        <hr style={{ border: 'none', height: '1px', background: 'var(--edu-card-border)', margin: '1.5rem 0' }} />

        {/* Premium GPA Feature Block */}
        <div style={{ 
          padding: 'clamp(1rem, 3vw, 1.25rem)', 
          borderRadius: '12px', 
          background: edu.status === 'current' ? 'rgba(var(--edu-p-rgb), 0.08)' : 'rgba(255,255,255,0.03)', 
          border: `1px solid ${edu.status === 'current' ? 'rgba(var(--edu-p-rgb), 0.2)' : 'var(--edu-card-border)'}`, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.25rem', 
          marginBottom: '1.5rem' 
        }}>
          <div className="font-syne" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: edu.status === 'current' ? 'var(--edu-p)' : 'var(--edu-text-main)', lineHeight: 1 }}>
            {edu.gpa}
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: edu.status === 'current' ? 'var(--edu-text-main)' : 'var(--edu-text-muted)', fontWeight: 600, marginBottom: '0.2rem' }}>
              {edu.gpaLabel} out of {edu.gpaMax}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--edu-text-faint)' }}>{edu.gpaSub}</div>
          </div>
        </div>

        {/* Meta Data Chips Grid */}
        <div className="meta-grid">
          {edu.meta.map(m => (
            <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <i className={`fa-solid ${m.icon}`} style={{ color: 'var(--edu-text-faint)', fontSize: '1rem' }}></i>
              <div>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--edu-text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>
                  {m.label}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--edu-text-main)', fontWeight: 600, display: 'block', marginTop: '0.1rem' }}>
                  {m.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Expandable Accordion for Courses */}
        {edu.courses && (
          <div style={{ marginTop: '0.5rem' }}>
            <button 
              className={`toggle-btn ${isOpen ? 'open' : ''}`} 
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
            >
              <i className="fa-solid fa-chevron-down"></i>
              {isOpen ? 'Hide Core Coursework' : 'View Core Coursework'}
            </button>
            
            <div className={`courses-wrapper ${isOpen ? 'open' : ''}`}>
              <div className="courses-inner">
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                  gap: '0.75rem', 
                  marginTop: '1rem',
                  paddingTop: '0.5rem'
                }}>
                  {edu.courses.map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
                      <i className="fa-solid fa-check" style={{ fontSize: '0.7rem', color: 'var(--edu-p)', marginTop: '0.25rem' }}></i>
                      <span style={{ fontSize: '0.8rem', color: 'var(--edu-text-muted)', lineHeight: 1.4 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Education() {
  const navigate = useNavigate();
  // We use our robust, native scroll reveal hook instead of the broken import
  const revealRef = useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="edu-wrapper">
      <EduStyles />

      {/* ── Header Area ── */}
      <div 
        className="magic-item is-visible" 
        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', borderBottom: '1px solid var(--edu-card-border)', paddingBottom: '1.5rem' }}
      >
        <div>
          <div className="font-mono" style={{ fontSize: '0.85rem', color: 'var(--edu-p)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            04 / Education
          </div>
          <h1 className="font-syne" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, margin: 0, color: 'var(--edu-text-main)', lineHeight: 1.1 }}>
            Academic Journey
          </h1>
        </div>
        
        <button
          onClick={() => navigate('/about')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.5rem', borderRadius: '100px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--edu-card-border)',
            color: 'var(--edu-text-main)', fontSize: '0.9rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--edu-text-main)'; e.currentTarget.style.color = 'var(--edu-bg)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'var(--edu-text-main)'; }}
        >
          <i className="fa-solid fa-arrow-left-long"></i>
          Back to About
        </button>
      </div>

      {/* ── Responsive Layout Grid ── */}
      <div className="edu-layout">
        
        {/* ── Left Column: Interactive Timeline ── */}
        <div className="edu-timeline">
          {education.map((edu, i) => (
            <EduTimelineCard key={edu.id} edu={edu} index={i} revealRef={revealRef} />
          ))}
        </div>

        {/* ── Right Column: Sticky Sidebar Widgets ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '2rem' }}>
          
          {/* Snapshot Widget */}
          <div className="sidebar-widget magic-item" ref={revealRef} style={{ animationDelay: '0.2s' }}>
            <h4 className="font-syne" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--edu-p)', margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-chart-pie"></i> Academic Snapshot
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                { icon: 'fa-graduation-cap', label: 'Current Degree', value: 'B.Tech CSE' },
                { icon: 'fa-award', label: 'Current CGPA', value: '7.73 / 10' },
                { icon: 'fa-building-columns', label: 'University', value: 'KIIT, Bhubaneswar' },
                { icon: 'fa-user-graduate', label: 'Graduating', value: '2027 (Expected)' },
                { icon: 'fa-map-pin', label: 'Origin', value: 'Nepal' },
              ].map((item, i, arr) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0', borderBottom: i < arr.length - 1 ? '1px dashed var(--edu-card-border)' : 'none' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(var(--edu-p-rgb), 0.1)', color: 'var(--edu-p)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div>
                    <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--edu-text-faint)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.15rem' }}>{item.label}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--edu-text-main)', fontWeight: 600 }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GPA Progression Automated Bars */}
          <div className="sidebar-widget magic-item" ref={revealRef} style={{ animationDelay: '0.3s' }}>
            <h4 className="font-syne" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--edu-text-main)', margin: '0 0 1.25rem 0' }}>
              GPA Progression
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {gpaData.map((g) => (
                <div key={g.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--edu-text-muted)', fontWeight: 500 }}>{g.label}</span>
                    <span className="font-mono" style={{ color: g.color, fontWeight: 700 }}>{g.value}</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${g.pct}%`, 
                        background: `linear-gradient(90deg, ${g.color}66, ${g.color})`,
                        boxShadow: `0 0 10px ${g.color}44`
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currently Studying List */}
          <div className="sidebar-widget magic-item" ref={revealRef} style={{ animationDelay: '0.4s' }}>
            <h4 className="font-syne" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--edu-text-main)', margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <i className="fa-solid fa-laptop-code" style={{ color: 'var(--edu-p)' }}></i> Currently Studying
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentlyStudying.map((c) => (
                <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--edu-p)', boxShadow: '0 0 8px var(--edu-p)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: 'var(--edu-text-muted)', lineHeight: 1.4, fontWeight: 500 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Glowing Career Vision Box */}
          <div className="sidebar-widget magic-item" ref={revealRef} style={{ animationDelay: '0.5s', background: 'linear-gradient(145deg, rgba(var(--edu-p-rgb), 0.1), rgba(var(--edu-p-rgb), 0.02))', borderColor: 'rgba(var(--edu-p-rgb), 0.25)' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--edu-p)', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <i className="fa-solid fa-rocket" style={{ animation: 'floatUp 3s ease-in-out infinite' }}></i> Career Vision
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--edu-text-muted)', lineHeight: 1.7, margin: 0 }}>
              Aiming to build scalable digital systems and AI-driven solutions that solve meaningful societal problems. 
              I aim to create impactful products, contribute to technological progress, 
              and grow into a builder who drives innovation rather than just following it.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}