import { useState } from 'react'
import { TRAININGS, KW_DATES, TEAM_COLORS, PHASE_COLORS } from './data.js'

const KWS = Object.keys(KW_DATES).map(Number).sort((a, b) => a - b)

const MONTH_MAP = {
  '06': 'Juni', '07': 'Juli', '08': 'August', '09': 'September',
}

function kwMonth(kw) {
  const d = KW_DATES[kw]
  return d ? MONTH_MAP[d.slice(5, 7)] || '' : ''
}

function kwDateLabel(kw) {
  const d = KW_DATES[kw]
  if (!d) return ''
  const [y, m, day] = d.split('-')
  return `${parseInt(day)}.${parseInt(m)}.${y}`
}

export default function TrainingsSection() {
  const [activeTeam, setActiveTeam] = useState(null)
  const [activePhase, setActivePhase] = useState(null)

  const teams = [...new Set(TRAININGS.map(t => t.team))].sort()
  const phases = ['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5']

  function matches(t) {
    if (activeTeam && t.team !== activeTeam) return false
    if (activePhase && t.phase !== activePhase) return false
    return true
  }

  const totalSessions = TRAININGS.length
  const uniqueTeams = teams.length
  const completedKWs = KWS.length

  return (
    <section style={{
      background: '#F8FAFC',
      borderTop: '1px solid #E2E8F0',
      padding: '32px 40px 40px',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 24,
      }}>
        <div>
          <div style={{
            fontSize: 9.5, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#94A3B8', marginBottom: 4,
          }}>
            Schulungsplan 2026
          </div>
          <h2 style={{
            fontSize: 20, fontWeight: 700, color: '#0F172A',
            margin: 0, lineHeight: 1.2,
          }}>
            Zoho Trainingsplan
          </h2>
          <p style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
            KW 23–37 · Florian Gräf · Christian Irrgang · Safat Majumder
          </p>
        </div>

        {/* Stats pills */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { label: 'Sitzungen', value: totalSessions },
            { label: 'Module', value: 18 },
            { label: 'Teams', value: uniqueTeams },
            { label: 'Kalenderwochen', value: completedKWs },
          ].map(s => (
            <div key={s.label} style={{
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              padding: '6px 14px',
              textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1F3864', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: 9.5, color: '#94A3B8', marginTop: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        marginBottom: 20,
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 10.5, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>Filter:</span>

        {/* Team filter */}
        {teams.map(team => {
          const tc = TEAM_COLORS[team] || { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB', label: team }
          const active = activeTeam === team
          return (
            <button
              key={team}
              onClick={() => setActiveTeam(active ? null : team)}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                border: `1.5px solid ${active ? tc.text : tc.border}`,
                background: active ? tc.text : tc.bg,
                color: active ? 'white' : tc.text,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {team}
              {tc.label ? <span style={{ opacity: 0.7, marginLeft: 4, fontSize: 10 }}>· {tc.label}</span> : null}
            </button>
          )
        })}

        <div style={{ width: 1, height: 20, background: '#E2E8F0', margin: '0 4px' }} />

        {/* Phase filter */}
        {phases.map(ph => {
          const color = PHASE_COLORS[ph]
          const active = activePhase === ph
          return (
            <button
              key={ph}
              onClick={() => setActivePhase(active ? null : ph)}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                border: `1.5px solid ${color}`,
                background: active ? color : color + '14',
                color: active ? 'white' : color,
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {ph}
            </button>
          )
        })}

        {(activeTeam || activePhase) && (
          <button
            onClick={() => { setActiveTeam(null); setActivePhase(null) }}
            style={{
              padding: '4px 10px', borderRadius: 20,
              border: '1px solid #CBD5E1', background: 'white',
              color: '#64748B', fontSize: 11, cursor: 'pointer', marginLeft: 4,
            }}
          >
            ✕ Zurücksetzen
          </button>
        )}
      </div>

      {/* KW week columns */}
      <div style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}>
        <div style={{
          display: 'flex',
          gap: 10,
          minWidth: 'max-content',
          paddingBottom: 8,
          alignItems: 'flex-start',
        }}>
          {KWS.map(kw => {
            const sessions = TRAININGS.filter(t => t.kw === kw && matches(t))
            const allSessions = TRAININGS.filter(t => t.kw === kw)
            const dimmed = (activeTeam || activePhase) && sessions.length === 0

            return (
              <div
                key={kw}
                style={{
                  width: 190,
                  flexShrink: 0,
                  opacity: dimmed ? 0.3 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {/* KW header */}
                <div style={{
                  background: '#1F3864',
                  borderRadius: '8px 8px 0 0',
                  padding: '8px 12px',
                  marginBottom: 1,
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 800, color: 'white',
                    letterSpacing: '-0.2px',
                  }}>
                    KW {kw}
                  </div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 1 }}>
                    {kwMonth(kw)} · {kwDateLabel(kw)}
                  </div>
                  <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>
                    {allSessions.length} Sitzung{allSessions.length !== 1 ? 'en' : ''}
                  </div>
                </div>

                {/* Sessions */}
                <div style={{
                  background: 'white',
                  border: '1px solid #E2E8F0',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  overflow: 'hidden',
                  minHeight: 40,
                }}>
                  {(sessions.length > 0 ? sessions : allSessions).map((t, i) => {
                    const tc = TEAM_COLORS[t.team] || { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' }
                    const phColor = PHASE_COLORS[t.phase] || '#94A3B8'
                    const visible = sessions.includes(t)

                    return (
                      <div
                        key={i}
                        style={{
                          padding: '9px 11px',
                          borderBottom: i < (sessions.length > 0 ? sessions : allSessions).length - 1 ? '1px solid #F1F5F9' : 'none',
                          opacity: (activeTeam || activePhase) && !visible ? 0.25 : 1,
                          transition: 'opacity 0.15s',
                        }}
                      >
                        {/* Team + phase badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '2px 7px',
                            borderRadius: 10,
                            background: tc.bg,
                            color: tc.text,
                            border: `1px solid ${tc.border}`,
                            fontSize: 9.5,
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                          }}>
                            {t.team}
                          </span>
                          <span style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: phColor,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            flexShrink: 0,
                          }}>
                            {t.phase}
                          </span>
                        </div>

                        {/* Module + title */}
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 3 }}>
                          <span style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: 'white',
                            background: phColor,
                            borderRadius: 4,
                            padding: '1px 5px',
                            flexShrink: 0,
                          }}>
                            M{t.modul}
                          </span>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#0F172A',
                            lineHeight: 1.3,
                          }}>
                            {t.title}
                          </span>
                        </div>

                        {/* Trainer */}
                        <div style={{ fontSize: 10, color: '#94A3B8' }}>
                          {t.trainer.split(' ').pop()}
                          {t.optional && <span style={{ marginLeft: 4, color: '#CBD5E1', fontSize: 9 }}>(opt.)</span>}
                        </div>

                        {/* Note */}
                        {t.note && t.note !== '—' && (
                          <div style={{
                            marginTop: 4,
                            fontSize: 9.5,
                            color: '#94A3B8',
                            fontStyle: 'italic',
                            lineHeight: 1.4,
                            borderLeft: `2px solid ${phColor}40`,
                            paddingLeft: 6,
                          }}>
                            {t.note}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Team legend */}
      <div style={{
        marginTop: 20,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 9.5, color: '#CBD5E1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>Teams:</span>
        {teams.map(team => {
          const tc = TEAM_COLORS[team] || { bg: '#F3F4F6', text: '#374151', label: team }
          return (
            <div key={team} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, color: tc.text,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: 2,
                background: tc.text, flexShrink: 0,
                display: 'inline-block', opacity: 0.8,
              }} />
              <span style={{ fontWeight: 600 }}>{team}</span>
              <span style={{ color: '#94A3B8' }}>– {tc.label}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
