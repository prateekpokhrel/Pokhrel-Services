import { useState, useEffect } from 'react'

function useClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  useEffect(() => {
    const tick = () => {
      const n = new Date()
      setTime(n.toLocaleTimeString('en-US', { hour12: false }))
      setDate(n.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return { time, date }
}

function useLocation() {
  const [loc, setLoc] = useState('Locating…')
  useEffect(() => {
    if (!navigator.geolocation) { setLoc('Bhubaneswar, India'); return }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: la, longitude: lo } = pos.coords
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${la.toFixed(2)}&lon=${lo.toFixed(2)}&format=json`)
          .then(r => r.json())
          .then(d => {
            const city = d.address.city || d.address.town || d.address.village || ''
            const cc = d.address.country_code?.toUpperCase() || ''
            setLoc(city ? (cc ? `${city}, ${cc}` : city) : (cc || 'Bhubaneswar, India'))
          })
          .catch(() => setLoc('Bhubaneswar, India'))
      },
      () => setLoc('Bhubaneswar, India')
    )
  }, [])
  return loc
}

// Detect current theme by checking html.light class
function useTheme() {
  const [isLight, setIsLight] = useState(
    () => document.documentElement.classList.contains('light')
  )
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'))
    })
    observer.observe(document.documentElement, { attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  return isLight
}

const mono = { fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }

export default function Topbar() {
  const { time, date } = useClock()
  const loc            = useLocation()
  const isLight        = useTheme()

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      height: 44,

      // ── Theme-aware background ──────────────────────────
      background: isLight
        ? 'rgba(250,247,242,0.88)'   // warm ivory, matches --bg in light
        : 'rgba(8,10,15,0.85)',       // original dark

      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--bdr)',
      padding: '0 48px',
      display: 'flex', alignItems: 'center', gap: 18,
      transition: 'background 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
      ...mono,
      color: 'var(--t3)',
    }}>

      {/* Live dot + time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: isLight ? '#0f9e58' : '#3ddc84',   // richer green in light
          boxShadow: isLight
            ? '0 0 6px rgba(15,158,88,0.5)'
            : '0 0 6px rgba(61,220,132,0.6)',
          transition: 'background 0.35s',
        }} />
        <span style={{ color: 'var(--t2)' }}>{time}</span>
      </div>

      <span style={{ color: 'var(--bdr2)' }}>·</span>
      <span style={{ color: 'var(--t2)' }}>{date}</span>
      <span style={{ color: 'var(--bdr2)' }}>·</span>
      <span style={{ color: 'var(--t3)' }}>{loc}</span>

      {/* Available badge */}
      <div style={{
        marginLeft: 'auto',
        padding: '3px 10px',
        borderRadius: 4,
        background: 'var(--pdim)',
        color: 'var(--p)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 0.5,
        border: '1px solid',
        borderColor: isLight ? 'rgba(42,82,201,0.2)' : 'transparent',
        transition: 'border-color 0.35s, background 0.35s',
      }}>
        Available for Work
      </div>
    </div>
  )
}