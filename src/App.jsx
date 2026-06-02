import Timeline from './Timeline.jsx'
import TrainingsSection from './TrainingsSection.jsx'
import { PHASES } from './data.js'

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── Header ─────────────────────────────────────────────── */}
      <header style={{
        background: '#1F3864',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: 76,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
        boxShadow: '0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.25)',
        borderBottom: '3px solid rgba(59, 130, 246, 0.38)',
      }}>
        {/* Subtle sheen overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <img
          src="/logo.png"
          alt="aboutwater"
          style={{ height: 36, objectFit: 'contain', filter: 'brightness(0) invert(1)', position: 'relative' }}
        />

        {/* Title */}
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.2px' }}>
            Zoho Implementierung &amp; Roadmap
          </div>
          <div style={{ fontSize: 10.5, opacity: 0.5, marginTop: 3, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            April 2026 – Juni 2027
          </div>
        </div>

        {/* Spacer to balance logo */}
        <div style={{ width: 120 }} />
      </header>

      {/* ── Phase legend ───────────────────────────────────────── */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #E2E8F0',
        padding: '8px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        flexWrap: 'wrap',
        flexShrink: 0,
      }}>
        <span style={{
          fontSize: 9.5,
          fontWeight: 700,
          color: '#94a3b8',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginRight: 4,
        }}>
          Phasen
        </span>

        {PHASES.map(ph => (
          <div key={ph.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 11px 3px 8px',
            borderRadius: 20,
            border: `1px solid ${ph.color}30`,
            background: ph.light + '55',
            fontSize: 11,
            fontWeight: 600,
            color: ph.textColor,
            whiteSpace: 'nowrap',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: 2,
              background: ph.color, flexShrink: 0,
              display: 'inline-block',
            }} />
            {ph.name}
          </div>
        ))}

        {/* Right-side legend */}
        <div style={{
          marginLeft: 'auto',
          display: 'flex',
          gap: 16,
          alignItems: 'center',
          fontSize: 11,
          color: '#94a3b8',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width={11} height={11} viewBox="0 0 11 11">
              <polygon points="5.5,0 11,5.5 5.5,11 0,5.5" fill="#1F3864" />
            </svg>
            Meilenstein
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{
              width: 9, height: 9, borderRadius: '50%',
              background: '#94a3b8', display: 'inline-block',
            }} />
            Aufgabe
          </span>
        </div>
      </div>

      {/* ── Timeline ───────────────────────────────────────────── */}
      <main style={{ flex: 1, padding: '16px 0 0', overflow: 'hidden', minHeight: 0, position: 'relative' }}>
        {/* Background photo — real product, pinned bottom-right */}
        <img
          src="/cooler.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: '88%',
            objectFit: 'contain',
            objectPosition: 'bottom right',
            opacity: 0.10,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Timeline />
        </div>
      </main>

      {/* ── Schulungsplan ──────────────────────────────────────── */}
      <TrainingsSection />

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer style={{
        background: '#1F3864',
        color: 'rgba(255,255,255,0.38)',
        fontSize: 10.5,
        textAlign: 'center',
        padding: '10px 16px',
        letterSpacing: '0.06em',
        flexShrink: 0,
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        aboutwater GmbH · Zoho Implementierungsroadmap & Schulungsplan · Stand Juni 2026 · Vertraulich
      </footer>
    </div>
  )
}
