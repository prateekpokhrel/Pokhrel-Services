import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Sidebar        from './components/Sidebar'
import Topbar         from './components/Topbar'
import ParticleCanvas from './components/ParticleCanvas'
import CursorGlow     from './components/CursorGlow'
import AIOrb          from './components/AIOrb'   

import Home         from './pages/Home'
import About        from './pages/About'
import Education    from './pages/Education'
import Services     from './pages/Services'
import Certificates from './pages/Certificates'
import Projects     from './pages/Projects'
import Contact      from './pages/Contact'

export default function App() {

  const [collapsed, setCollapsed] = useState(false)
  const [isNight, setIsNight]     = useState(true)
  const [isMobile, setIsMobile]   = useState(false)

  // ── Detect mobile screen ──────────────────────────
  useEffect(() => {

    const checkScreen = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)

      // auto collapse sidebar on mobile
      if (mobile) {
        setCollapsed(true)
      }
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)

    return () => window.removeEventListener('resize', checkScreen)

  }, [])

  // ── Restore saved theme preference on mount ──────
  useEffect(() => {
    const saved = localStorage.getItem('theme')

    if (saved === 'light') {
      setIsNight(false)
    } 
    else if (saved === 'dark') {
      setIsNight(true)
    } 
    else {
      const h = new Date().getHours()
      setIsNight(h < 6 || h >= 18)
    }

  }, [])

  // ── Sync isNight → html class + localStorage ─────
  useEffect(() => {

    const root = document.documentElement

    if (isNight) {
      root.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } 
    else {
      root.classList.add('light')
      localStorage.setItem('theme', 'light')
    }

  }, [isNight])

  // Sidebar width
  const sw = collapsed ? 'var(--swc)' : 'var(--sw)'

  // On mobile we disable sidebar offset
  const leftOffset = isMobile ? 0 : sw

  return (

    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        overflow: 'hidden'
      }}
    >

      {/* 🔵 Background Layer */}
      <ParticleCanvas isNight={isNight} />

      {/* 🔵 Glow Effect Layer */}
      <CursorGlow />

      {/* 🔵 Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(v => !v)}
        isNight={isNight}
        onModeToggle={() => setIsNight(v => !v)}
      />

      {/* 🔵 Main Content */}
      <div
        id="main-scroll"
        style={{
          position: 'fixed',
          left: leftOffset,
          top: 0,
          right: 0,
          bottom: 0,

          overflowY: 'auto',
          overflowX: 'hidden',

          transition: 'left 0.45s var(--ease)',

          zIndex: 10,
          WebkitOverflowScrolling: 'touch'
        }}
      >

        <Topbar />

        <Routes>
          <Route path="/"             element={<Home />}         />
          <Route path="/about"        element={<About />}        />
          <Route path="/education"    element={<Education />}    />
          <Route path="/services"     element={<Services />}     />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/projects"     element={<Projects />}     />
          <Route path="/contact"      element={<Contact />}      />
        </Routes>

      </div>

      {/* 🔵 Floating AI Assistant */}
      <AIOrb />

    </div>
  )
}