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

export default function Topbar() {
  const { time, date } = useClock()
  const loc            = useLocation()
  const isLight        = false

  return (
    <>
      <style>{`
        .topbar-wrapper {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          column-gap: 16px;
          row-gap: 12px;
          
          /* Matches the padding of .page-wrapper for perfect vertical alignment */
          padding: 16px 52px; 
          
          /* Premium glassmorphism effect */
          background: rgba(8, 10, 15, 0.75); 
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--bdr);
          transition: padding 0.3s ease;
        }

        .topbar-primary {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .topbar-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: dotBlink 2.5s infinite ease-in-out;
        }

        @keyframes dotBlink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .topbar-time {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 700;
          color: white;
          letter-spacing: 0.5px;
        }

        .topbar-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .topbar-sep {
          opacity: 0.4;
        }

        .topbar-loc {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }

        .topbar-badge {
          margin-left: auto;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 6px 14px;
          border-radius: 20px;
          background: var(--pdim);
          color: var(--p);
          border: 1px solid rgba(91,141,238,0.2);
          white-space: nowrap;
        }

        /* Responsive Breakpoints syncing with global layout */
        @media (max-width: 1024px) {
          .topbar-wrapper {
            padding: 16px 30px;
          }
        }

        @media (max-width: 600px) {
          .topbar-wrapper {
            padding: 16px 20px;
          }
          .topbar-meta {
            display: none; /* Hides secondary metadata on small screens to prevent clutter */
          }
          .topbar-badge {
            margin-left: 0; /* Allows badge to stack nicely if forced */
          }
        }
      `}</style>

      <div className={`topbar-wrapper${isLight ? ' topbar-light' : ''}`}>

        {/* Group 1 — live dot + time */}
        <div className="topbar-primary">
          <span
            className="topbar-dot"
            aria-hidden="true"
            style={{
              background: isLight ? '#0f9e58' : '#3ddc84',
              boxShadow: isLight
                ? '0 0 8px rgba(15,158,88,0.5)'
                : '0 0 8px rgba(61,220,132,0.6)',
            }}
          />
          <span className="topbar-time">{time}</span>
        </div>

        {/* Group 2 — date + location */}
        <div className="topbar-meta">
          <span className="topbar-sep" aria-hidden="true">·</span>
          <span className="topbar-date">{date}</span>
          <span className="topbar-sep" aria-hidden="true">·</span>
          <span className="topbar-loc" title={loc}>{loc}</span>
        </div>

        {/* Available badge
        <div
          className="topbar-badge"
          style={{ borderColor: isLight ? 'rgba(42,82,201,0.2)' : 'rgba(91,141,238,0.2)' }}
        >
          Available for Work
        </div> */}

      </div>
    </>
  )
}