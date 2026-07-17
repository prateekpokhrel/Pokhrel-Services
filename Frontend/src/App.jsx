import { Routes, Route } from 'react-router-dom'

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
import Review       from './pages/Review'

export default function App() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative' }}>

      {/* 🔵 Background Layer */}
      <ParticleCanvas />

      {/* 🔵 Glow Effect Layer */}
      <CursorGlow />

      {/* 🔵 Sidebar (Now purely CSS Responsive!) */}
      <Sidebar />

      {/* 🔵 Main Content (Uses global CSS for perfect alignment) */}
      <main className="main-content" id="main-scroll">
        <Topbar />

        <Routes>
          <Route path="/"             element={<Home />}         />
          <Route path="/about"        element={<About />}        />
          <Route path="/education"    element={<Education />}    />
          <Route path="/services"     element={<Services />}     />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/projects"     element={<Projects />}     />
          <Route path="/contact"      element={<Contact />}      />
          <Route path="/review"       element={<Review />}       />
        </Routes>
      </main>

      {/* 🔵 Floating AI Assistant */}
      <AIOrb />

    </div>
  )
}