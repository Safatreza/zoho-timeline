import { useRef, useState } from 'react'
import { MONTHS, PHASES, EVENTS, dateToPos } from './data.js'

/* ── Layout ──────────────────────────────────────────────────── */
const MONTH_W   = 220
const PAD_L     = 80
const TOTAL_W   = PAD_L + MONTH_W * MONTHS.length + 80
const LINE_Y    = 400
const CANVAS_H  = 820
const CARD_W    = 180          // wider cards
const CARD_H    = 88           // taller cards
const CONN_R    = 6            // larger connector dots
const MILE_HALF = 14           // slightly bigger diamonds
const CARD_GAP  = 10

/* ── Y-slots for regular cards ───────────────────────────────── */
const ABOVE_SLOTS = [
  LINE_Y - CARD_H - 28,    // 284
  LINE_Y - CARD_H - 132,   // 180
  LINE_Y - CARD_H - 236,   // 76
  LINE_Y - CARD_H - 340,   // -28
]
const BELOW_SLOTS = [
  LINE_Y + 28,              // 428
  LINE_Y + 132,             // 532
  LINE_Y + 236,             // 636
]

/* ── Phase lookup ─────────────────────────────────────────────── */
const phaseMap = Object.fromEntries(PHASES.map(p => [p.id, p]))
phaseMap['golive'] = { color: '#B91C1C', light: '#FEE2E2', textColor: '#B91C1C', name: 'Go-Live' }

/* ── px x-position from date string ──────────────────────────── */
function xOf(dateStr) {
  return PAD_L + dateToPos(dateStr) * MONTH_W
}

/* ── Today as YYYY-MM-DD ──────────────────────────────────────── */
function todayStr() {
  const n = new Date()
  return `${n.getFullYear()}-${String(n.getMonth()+1).padStart(2,'0')}-${String(n.getDate()).padStart(2,'0')}`
}
const TODAY_X = PAD_L + dateToPos(todayStr()) * MONTH_W

/* ── Collision-aware card placement ──────────────────────────── */
function computeCardPositions(events) {
  const placed = []
  const positions = {}

  const normal = events
    .filter(e => !e.milestone)
    .map(e => ({ ...e, cx: xOf(e.date) }))
    .sort((a, b) => a.cx - b.cx)

  for (const ev of normal) {
    const cx  = ev.cx
    const bx1 = cx - CARD_W / 2
    const bx2 = cx + CARD_W / 2
    const slots = ev.above ? ABOVE_SLOTS : BELOW_SLOTS
    let chosen = slots[slots.length - 1]

    for (const slotY of slots) {
      const by1 = slotY - CARD_GAP
      const by2 = slotY + CARD_H + CARD_GAP

      const collision = placed.some(p =>
        bx1 < p.x2 + CARD_GAP &&
        bx2 > p.x1 - CARD_GAP &&
        by1 < p.y2 &&
        by2 > p.y1
      )

      if (!collision) {
        chosen = slotY
        break
      }
    }

    positions[ev.id] = chosen
    placed.push({
      x1: bx1 - CARD_GAP,
      x2: bx2 + CARD_GAP,
      y1: chosen - CARD_GAP,
      y2: chosen + CARD_H + CARD_GAP,
    })
  }

  return positions
}

const CARD_POSITIONS = computeCardPositions(EVENTS)

/* ─────────────────────────────────────────────────────────────── */
export default function Timeline() {
  const scrollRef = useRef(null)
  const [drag, setDrag] = useState({ active: false, startX: 0, scrollLeft: 0 })

  function onMouseDown(e) {
    setDrag({ active: true, startX: e.pageX - scrollRef.current.offsetLeft, scrollLeft: scrollRef.current.scrollLeft })
  }
  function onMouseMove(e) {
    if (!drag.active) return
    e.preventDefault()
    const dx = e.pageX - scrollRef.current.offsetLeft - drag.startX
    scrollRef.current.scrollLeft = drag.scrollLeft - dx
  }
  function stopDrag() { setDrag(d => ({ ...d, active: false })) }

  const milestones = EVENTS.filter(e => e.milestone)

  return (
    <div>
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          cursor: drag.active ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Canvas */}
        <div style={{ position: 'relative', width: TOTAL_W, height: CANVAS_H }}>

          {/* ── SVG layer ───────────────────────────────────────── */}
          <svg
            width={TOTAL_W}
            height={CANVAS_H}
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            <defs>
              {/* Gradient for the timeline spine */}
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#1F3864" stopOpacity="0.5" />
                <stop offset="12%"  stopColor="#94a3b8" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.55" />
              </linearGradient>
            </defs>

            {/* Phase background bands */}
            {PHASES.map(ph => {
              const x1 = PAD_L + ph.startIdx * MONTH_W
              const x2 = PAD_L + ph.endIdx   * MONTH_W
              return (
                <rect key={`band-${ph.id}`}
                  x={x1} y={0} width={x2 - x1} height={CANVAS_H}
                  fill={ph.color} opacity={0.055}
                />
              )
            })}

            {/* Phase top label pills */}
            {PHASES.map(ph => {
              const x1 = PAD_L + ph.startIdx * MONTH_W
              const x2 = PAD_L + ph.endIdx   * MONTH_W
              const mx = (x1 + x2) / 2
              return (
                <g key={`plbl-${ph.id}`}>
                  <rect x={x1 + 2} y={5} width={x2 - x1 - 4} height={21} rx={3}
                    fill={ph.color} opacity={0.14} />
                  <text x={mx} y={19} textAnchor="middle"
                    fill={ph.color} fontSize={9.5} fontWeight={700}
                    fontFamily="Inter, sans-serif" letterSpacing="0.08em">
                    {ph.name.toUpperCase()}
                  </text>
                </g>
              )
            })}

            {/* Timeline spine — gradient */}
            <line
              x1={PAD_L / 2} y1={LINE_Y}
              x2={TOTAL_W - 20} y2={LINE_Y}
              stroke="url(#lineGrad)" strokeWidth={2}
            />

            {/* Month ticks + labels — January boundary is emphasised */}
            {MONTHS.map((label, i) => {
              const x = PAD_L + i * MONTH_W
              const isJan = label.startsWith('Jan')
              return (
                <g key={`tick-${i}`}>
                  <line
                    x1={x} y1={LINE_Y - (isJan ? 10 : 5)}
                    x2={x} y2={LINE_Y + (isJan ? 10 : 5)}
                    stroke={isJan ? '#64748b' : '#CBD5E1'}
                    strokeWidth={isJan ? 2 : 1}
                  />
                  <text x={x} y={LINE_Y + 22} textAnchor="middle"
                    fill={isJan ? '#475569' : '#94a3b8'}
                    fontSize={isJan ? 11 : 10.5}
                    fontWeight={isJan ? 700 : 500}
                    fontFamily="Inter, sans-serif">
                    {label}
                  </text>
                </g>
              )
            })}

            {/* Today marker */}
            <line x1={TODAY_X} y1={32} x2={TODAY_X} y2={CANVAS_H - 66}
              stroke="#3B82F6" strokeWidth={1.5} strokeDasharray="6 4" opacity={0.6} />
            <rect x={TODAY_X - 20} y={CANVAS_H - 66} width={40} height={18} rx={9}
              fill="#3B82F6" opacity={0.92} />
            <text x={TODAY_X} y={CANVAS_H - 54} textAnchor="middle"
              fill="white" fontSize={9} fontWeight={700}
              fontFamily="Inter, sans-serif" letterSpacing="0.07em">
              HEUTE
            </text>

            {/* Connector lines + dots for regular events */}
            {EVENTS.filter(e => !e.milestone).map(ev => {
              const cx    = xOf(ev.date)
              const cardY = CARD_POSITIONS[ev.id]
              if (cardY === undefined) return null
              const ph    = phaseMap[ev.phase]
              const color = ph?.color || '#94a3b8'
              const lineY1 = ev.above ? cardY + CARD_H : LINE_Y + CONN_R + 1
              const lineY2 = ev.above ? LINE_Y - CONN_R - 1 : cardY

              return (
                <g key={`conn-${ev.id}`}>
                  <line x1={cx} y1={lineY1} x2={cx} y2={lineY2}
                    stroke={color} strokeWidth={1.5} strokeDasharray="4 3" opacity={0.55} />
                  {/* outer ring */}
                  <circle cx={cx} cy={LINE_Y} r={CONN_R}
                    fill="white" stroke={color} strokeWidth={2} />
                  {/* inner fill */}
                  <circle cx={cx} cy={LINE_Y} r={CONN_R - 3}
                    fill={color} opacity={0.65} />
                </g>
              )
            })}

            {/* Milestone diamonds — double glow ring */}
            {milestones.map(ev => {
              const cx = xOf(ev.date)
              const ph = phaseMap[ev.phase]
              const c  = ph?.color || '#B91C1C'
              const r  = MILE_HALF
              return (
                <g key={`diamond-${ev.id}`}>
                  <circle cx={cx} cy={LINE_Y} r={r + 14} fill={c} opacity={0.05} />
                  <circle cx={cx} cy={LINE_Y} r={r + 7}  fill={c} opacity={0.10} />
                  <polygon
                    points={`${cx},${LINE_Y-r} ${cx+r},${LINE_Y} ${cx},${LINE_Y+r} ${cx-r},${LINE_Y}`}
                    fill={c} stroke="white" strokeWidth={2.5}
                  />
                </g>
              )
            })}
          </svg>

          {/* ── Regular event cards (HTML) ──────────────────────── */}
          {EVENTS.filter(e => !e.milestone).map(ev => {
            const cx    = xOf(ev.date)
            const cardY = CARD_POSITIONS[ev.id]
            if (cardY === undefined) return null
            const ph    = phaseMap[ev.phase]
            const color = ph?.color || '#475569'

            return (
              <div
                key={`card-${ev.id}`}
                style={{
                  position: 'absolute',
                  left: cx - CARD_W / 2,
                  top: cardY,
                  width: CARD_W,
                  height: CARD_H,
                  background: `linear-gradient(145deg, #ffffff 58%, ${color}09 100%)`,
                  border: `1px solid ${color}28`,
                  borderLeft: `3px solid ${color}`,
                  borderRadius: '0 7px 7px 0',
                  padding: '7px 10px 7px 11px',
                  boxShadow: `0 2px 10px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)`,
                  overflow: 'hidden',
                  zIndex: 10,
                }}
              >
                {/* Phase indicator */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  marginBottom: 4,
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: 2,
                    background: color, flexShrink: 0,
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontSize: 8.5, fontWeight: 800, color: color,
                    textTransform: 'uppercase', letterSpacing: '0.07em',
                    lineHeight: 1,
                  }}>
                    {ph?.name || ev.phase}
                  </span>
                </div>

                {/* Title */}
                <div style={{
                  fontSize: 12, fontWeight: 700,
                  color: '#0F172A', lineHeight: 1.25,
                  marginBottom: 4,
                }}>
                  {ev.title}
                </div>

                {/* Body */}
                <div style={{
                  fontSize: 10, color: '#64748b', lineHeight: 1.45,
                }}>
                  {ev.body}
                </div>
              </div>
            )
          })}

          {/* ── Milestone cards ─────────────────────────────────── */}
          {milestones.map((ev, i) => {
            const cx    = xOf(ev.date)
            const ph    = phaseMap[ev.phase]
            const color = ph?.color || '#B91C1C'
            const above = i % 2 === 0
            const cardTop = above ? LINE_Y - 194 : LINE_Y + 52
            const connY1  = above ? cardTop + 106 : cardTop
            const connY2  = above ? LINE_Y - MILE_HALF - 2 : LINE_Y + MILE_HALF + 2

            return (
              <div key={`mcrd-${ev.id}`}
                style={{
                  position: 'absolute',
                  left: cx - 110,
                  top: cardTop,
                  width: 220,
                  zIndex: 20,
                }}
              >
                {/* Connector */}
                <svg style={{
                  position: 'absolute',
                  left: '50%', transform: 'translateX(-50%)',
                  ...(above ? { top: '100%' } : { bottom: '100%' }),
                  overflow: 'visible', pointerEvents: 'none',
                  width: 2, height: Math.abs(connY2 - connY1),
                }}>
                  <line x1={1} y1={0} x2={1} y2="100%"
                    stroke={color} strokeWidth={1.5}
                    strokeDasharray="5 3" opacity={0.6} />
                </svg>

                {/* Card */}
                <div style={{
                  background: `linear-gradient(160deg, #ffffff 62%, ${color}08 100%)`,
                  border: `1.5px solid ${color}`,
                  borderTop: `3px solid ${color}`,
                  borderRadius: 8,
                  padding: '11px 16px 12px',
                  boxShadow: `0 4px 20px ${color}1E, 0 1px 6px rgba(0,0,0,0.07)`,
                  textAlign: 'center',
                }}>
                  {/* Title with flanking diamonds */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 7,
                    marginBottom: 6,
                  }}>
                    <svg width={8} height={8} viewBox="0 0 8 8" style={{ flexShrink: 0, marginTop: 1 }}>
                      <polygon points="4,0 8,4 4,8 0,4" fill={color} opacity={0.75} />
                    </svg>
                    <div style={{
                      fontSize: 14, fontWeight: 800,
                      color: color, lineHeight: 1.2,
                    }}>
                      {ev.title}
                    </div>
                    <svg width={8} height={8} viewBox="0 0 8 8" style={{ flexShrink: 0, marginTop: 1 }}>
                      <polygon points="4,0 8,4 4,8 0,4" fill={color} opacity={0.75} />
                    </svg>
                  </div>

                  {/* Body */}
                  <div style={{
                    fontSize: 10, color: '#64748b',
                    lineHeight: 1.5, marginBottom: 8,
                  }}>
                    {ev.body}
                  </div>

                  {/* Date pill */}
                  <div style={{
                    display: 'inline-block',
                    background: color + '14',
                    color: color,
                    borderRadius: 20,
                    padding: '2px 12px',
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                  }}>
                    {ev.date.split('-').reverse().join('.')}
                  </div>
                </div>
              </div>
            )
          })}

        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        padding: '7px 0 2px',
        fontSize: 10.5,
        color: '#CBD5E1',
        letterSpacing: '0.04em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}>
        <svg width={14} height={14} viewBox="0 0 14 14">
          <path d="M9 2L4 7l5 5" stroke="#CBD5E1" strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>Ziehen oder scrollen zum Navigieren</span>
        <svg width={14} height={14} viewBox="0 0 14 14">
          <path d="M5 2l5 5-5 5" stroke="#CBD5E1" strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
