// Timeline spans Apr 2026 (idx 0) → Jun 2027 (idx 14)
// position = (year-2026)*12 + (month-4) + (day-1)/30

export function dateToPos(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return (y - 2026) * 12 + (m - 4) + (d - 1) / 30
}

export const MONTHS = [
  'Apr 2026', 'Mai 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026',
  'Sep 2026', 'Okt 2026', 'Nov 2026', 'Dez 2026',
  'Jan 2027', 'Feb 2027', 'Mär 2027', 'Apr 2027', 'Mai 2027', 'Jun 2027',
]

export const PHASES = [
  {
    id: 'pre',
    name: 'Go-Live Vorbereitung',
    startIdx: 0,
    endIdx: 5,
    color: '#1F3864',
    light: '#D6DCEA',
    textColor: '#1F3864',
  },
  {
    id: 'stab',
    name: 'Stabilisierung',
    startIdx: 5,
    endIdx: 8,
    color: '#1565C0',
    light: '#BBDEFB',
    textColor: '#1565C0',
  },
  {
    id: 'opti',
    name: 'Optimierung',
    startIdx: 6,
    endIdx: 10.5,
    color: '#00695C',
    light: '#B2DFDB',
    textColor: '#00695C',
  },
  {
    id: 'portal',
    name: 'Portale',
    startIdx: 7,
    endIdx: 11.9,
    color: '#6A1B9A',
    light: '#E1BEE7',
    textColor: '#6A1B9A',
  },
  {
    id: 'comm',
    name: 'Zoho Commerce',
    startIdx: 9,
    endIdx: 13.5,
    color: '#BF360C',
    light: '#FFCCBC',
    textColor: '#BF360C',
  },
  {
    id: 'shop',
    name: 'Shop-Launch',
    startIdx: 13,
    endIdx: 15,
    color: '#1B5E20',
    light: '#C8E6C9',
    textColor: '#1B5E20',
  },
]

// above: true = card above the line | false = below | milestone = true = diamond on line
export const EVENTS = [
  // ── Pre Go-live ─────────────────────────────────────────────
  {
    id: 1, date: '2026-04-21', phase: 'pre', above: true,
    title: 'Projektstart',
    body: 'Scope, Verantwortliche & kritischer Pfad festgelegt',
  },
  {
    id: 27, date: '2026-06-02', phase: 'pre', above: false,
    title: 'Schulungsprogramm startet',
    body: '18 Module · 5 Phasen · KW 23–37 · Florian Gräf | Christian Irrgang | Safat Majumder',
  },
  {
    id: 28, date: '2026-09-07', phase: 'stab', above: true,
    title: 'Schulungsabschluss',
    body: 'Alle 44 Schulungssitzungen abgeschlossen – Teams 1, 2, 4, 5, 6, 7 zertifiziert',
  },
  {
    id: 2, date: '2026-04-21', phase: 'pre', above: false,
    title: 'Datenmigration startet',
    body: 'Kunden, Lieferanten & Artikel aus Markos importiert',
  },
  {
    id: 3, date: '2026-05-19', phase: 'pre', above: true,
    title: 'Stammdaten validiert',
    body: 'CRM & Inventory: Dubletten, Preislisten & Konditionen bereinigt',
  },
  {
    id: 4, date: '2026-05-19', phase: 'pre', above: false,
    title: 'Finanzen & Einkauf',
    body: 'SKR03/04 Kontenplan, Steuercodes & Freigabematrix konfiguriert',
  },
  {
    id: 5, date: '2026-06-16', phase: 'pre', above: true,
    title: 'Prozesse konfiguriert',
    body: 'Aufträge, Pfand-Logik, Rental-Zyklus, Lager & FSM eingerichtet',
  },
  {
    id: 6, date: '2026-07-14', phase: 'pre', above: false,
    title: 'UAT-Vorbereitung',
    body: 'Testfälle je Bereich, Teststrategie & Abnahme-Kriterien definiert',
  },
  {
    id: 7, date: '2026-08-04', phase: 'pre', above: true,
    title: 'User Acceptance Test',
    body: '04.–22.08.2026 – alle Kernprozesse end-to-end getestet & abgenommen',
  },
  {
    id: 8, date: '2026-08-25', phase: 'pre', above: false,
    title: 'Go-Live Freigabe',
    body: 'Finance Sign-off, alle Bereiche schriftlich freigegeben, GF-Freigabe erteilt',
  },

  // ── MAJOR MILESTONE ──────────────────────────────────────────
  {
    id: 9, date: '2026-09-01', phase: 'golive', milestone: true,
    title: 'Zoho Go-Live',
    body: 'CRM · Books · Inventory · FSM – alle Bereiche produktiv',
  },

  // ── Stabilisierung ───────────────────────────────────────────
  {
    id: 10, date: '2026-09-07', phase: 'stab', above: true,
    title: 'Hypercare',
    body: 'Tägliche Standups, Fehler-Triage P1/P2/P3, Bugfixing',
  },
  {
    id: 11, date: '2026-09-30', phase: 'stab', above: false,
    title: 'Erster Monatsabschluss',
    body: 'September-Abschluss in Zoho Books & DATEV-Export verifiziert',
  },
  {
    id: 12, date: '2026-10-15', phase: 'stab', above: true,
    title: 'Lessons Learned',
    body: 'Workshop, SOPs für alle Kernbereiche, Markos-Abschaltplanung',
  },

  // ── Optimierung ──────────────────────────────────────────────
  {
    id: 13, date: '2026-10-01', phase: 'opti', above: false,
    title: 'Zoho Analytics',
    body: 'GF-, Vertriebs-, Lager- & Finance-Dashboards live',
  },
  {
    id: 14, date: '2026-11-01', phase: 'opti', above: false,
    title: 'Mietgeräte-Automation',
    body: 'Recurring Invoices für alle Mietkunden automatisch aktiv',
  },
  {
    id: 15, date: '2026-11-15', phase: 'opti', above: true,
    title: 'E-Mail-Marketing',
    body: 'Zoho Campaigns: Newsletter, Upselling-Kampagnen, DSGVO-Opt-in',
  },
  {
    id: 16, date: '2026-12-15', phase: 'opti', above: false,
    title: 'CRM-Automatisierungen',
    body: 'Blueprints, Follow-up-Reminder & Renewal-Automatisierung aktiv',
  },

  // ── Portale ──────────────────────────────────────────────────
  {
    id: 17, date: '2026-12-01', phase: 'portal', above: true,
    title: 'Portal Design & UAT',
    body: 'Kunden- & Vendorportal im aboutwater-Branding, UAT mit Pilotkunden',
  },
  {
    id: 18, date: '2027-01-15', phase: 'portal', milestone: true,
    title: 'Portal Launch',
    body: 'Kunden- & Vendorportal live – Selbstbedienung für Kunden & Lieferanten',
  },

  // ── Zoho Commerce ────────────────────────────────────────────
  {
    id: 19, date: '2027-01-15', phase: 'comm', above: true,
    title: 'Shop-Konzept & Wahl',
    body: 'Zoho Commerce ausgewählt, Sortiment & B2B-Konzept definiert',
  },
  {
    id: 20, date: '2027-02-15', phase: 'comm', above: false,
    title: 'Produktkatalog-Sync',
    body: 'Inventory → Commerce: Bilder, Preise, Kategorien synchronisiert',
  },
  {
    id: 21, date: '2027-03-15', phase: 'comm', above: true,
    title: 'B2B-Logik & Abo',
    body: 'Kundengruppen, Staffelpreise, Gallonen-Abo, Zahlungsarten eingerichtet',
  },
  {
    id: 22, date: '2027-04-15', phase: 'comm', above: false,
    title: 'Shop UAT & Integration',
    body: 'E2E-Test: Bestellung → Zahlung → Rechnung → Lagerabgang',
  },

  // ── Shop-Launch ──────────────────────────────────────────────
  {
    id: 23, date: '2027-05-05', phase: 'shop', milestone: true,
    title: 'Soft-Launch',
    body: '30 ausgewählte Stammkunden – Monitoring, Feedback, Feinschliff',
  },
  {
    id: 24, date: '2027-05-15', phase: 'shop', above: true,
    title: 'aboutwater24.com ↩',
    body: '301-Redirects, SEO-Wert gesichert, Bestandskunden migriert',
  },
  {
    id: 25, date: '2027-05-26', phase: 'shop', milestone: true,
    title: 'Shop Go-Live',
    body: 'Öffentlicher Start – aboutwater Online-Shop live für alle Kunden',
  },
  {
    id: 26, date: '2027-06-20', phase: 'shop', above: false,
    title: 'Roadmap Q3 2027+',
    body: 'SEO-Optimierung, Abo-Vermarktung, Ausblick Zoho Zia & Mobile App',
  },
]

// ── Training schedule (KW 23–37) ──────────────────────────────
// KW n → Monday date: KW23=2026-06-01, each +7 days
export const KW_DATES = {
  23: '2026-06-01', 24: '2026-06-08', 25: '2026-06-15',
  26: '2026-06-22', 27: '2026-06-29', 28: '2026-07-06',
  29: '2026-07-13', 30: '2026-07-20', 31: '2026-07-27',
  32: '2026-08-03', 33: '2026-08-10', 34: '2026-08-17',
  35: '2026-08-24', 37: '2026-09-07',
}

export const TEAM_COLORS = {
  'Team 1': { bg: '#DBEAFE', text: '#1D4ED8', border: '#93C5FD', label: 'Innendienst' },
  'Team 2': { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB', label: 'Management' },
  'Team 4': { bg: '#CCFBF1', text: '#0F766E', border: '#5EEAD4', label: 'Außendienst' },
  'Team 5': { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D', label: 'Innentechniker' },
  'Team 6': { bg: '#EDE9FE', text: '#6D28D9', border: '#C4B5FD', label: 'Marketing' },
  'Team 7': { bg: '#FFE4E6', text: '#BE123C', border: '#FCA5A5', label: 'Lager/Einkauf' },
}

export const PHASE_COLORS = {
  'Phase 1': '#2563EB',
  'Phase 2': '#16A34A',
  'Phase 3': '#D97706',
  'Phase 4': '#7C3AED',
  'Phase 5': '#DC2626',
}

export const TRAININGS = [
  // KW 23
  { kw: 23, team: 'Team 1', phase: 'Phase 1', modul: 1, title: 'CRM Grundlagen', trainer: 'Safat Majumder', note: 'Auftaktsitzung empfohlen' },
  { kw: 23, team: 'Team 5', phase: 'Phase 1', modul: 2, title: 'Kundenstamm & Kundenhistorie', trainer: 'Christian Irrgang', note: 'Servicerelevante Inhalte im Fokus' },
  { kw: 23, team: 'Team 7', phase: 'Phase 3', modul: 7, title: 'Artikel, Produkte & Pfand', trainer: 'Florian Gräf', note: 'Artikelstruktur & zPfand' },
  // KW 24
  { kw: 24, team: 'Team 4', phase: 'Phase 1', modul: 1, title: 'CRM Grundlagen', trainer: 'Safat Majumder', note: 'Fokus: mobile Nutzung' },
  { kw: 24, team: 'Team 6', phase: 'Phase 1', modul: 1, title: 'CRM Grundlagen', trainer: 'Christian Irrgang', note: 'Fokus: Kundensegmente & Kampagnen' },
  { kw: 24, team: 'Team 2', phase: 'Phase 1', modul: 1, title: 'CRM Grundlagen (optional)', trainer: 'Florian Gräf', note: 'Supervisor-Begleitung möglich', optional: true },
  // KW 25
  { kw: 25, team: 'Team 1', phase: 'Phase 1', modul: 2, title: 'Kundenstamm & Kundenhistorie', trainer: 'Safat Majumder', note: '' },
  { kw: 25, team: 'Team 5', phase: 'Phase 1', modul: 3, title: 'Aufgaben, Notizen & Wiedervorlagen', trainer: 'Florian Gräf', note: '' },
  { kw: 25, team: 'Team 7', phase: 'Phase 3', modul: 8, title: 'Lagerorte & Lagerbewegungen', trainer: 'Christian Irrgang', note: 'Lagerorte Planegg im Fokus' },
  // KW 26
  { kw: 26, team: 'Team 4', phase: 'Phase 1', modul: 2, title: 'Kundenstamm & Kundenhistorie', trainer: 'Safat Majumder', note: '' },
  { kw: 26, team: 'Team 6', phase: 'Phase 1', modul: 2, title: 'Kundenstamm & Kundenhistorie', trainer: 'Christian Irrgang', note: '' },
  { kw: 26, team: 'Team 2', phase: 'Phase 1', modul: 2, title: 'Kundenstamm & Kundenhistorie (optional)', trainer: 'Florian Gräf', note: 'Supervisor-Begleitung', optional: true },
  // KW 27
  { kw: 27, team: 'Team 1', phase: 'Phase 1', modul: 3, title: 'Aufgaben, Notizen & Wiedervorlagen', trainer: 'Safat Majumder', note: '' },
  { kw: 27, team: 'Team 5', phase: 'Phase 3', modul: 7, title: 'Artikel, Produkte & Pfand', trainer: 'Florian Gräf', note: 'Ersatzteile & Pfand-Prozess' },
  { kw: 27, team: 'Team 7', phase: 'Phase 3', modul: 9, title: 'Seriennummern', trainer: 'Christian Irrgang', note: 'Import-Strategie besprechen' },
  // KW 28
  { kw: 28, team: 'Team 4', phase: 'Phase 1', modul: 3, title: 'Aufgaben, Notizen & Wiedervorlagen', trainer: 'Safat Majumder', note: '' },
  { kw: 28, team: 'Team 6', phase: 'Phase 1', modul: 3, title: 'Aufgaben, Notizen & Wiedervorlagen', trainer: 'Christian Irrgang', note: '' },
  { kw: 28, team: 'Team 2', phase: 'Phase 1', modul: 3, title: 'Aufgaben, Notizen & Wiedervorlagen (optional)', trainer: 'Florian Gräf', note: 'Supervisor-Begleitung', optional: true },
  // KW 29
  { kw: 29, team: 'Team 1', phase: 'Phase 2', modul: 4, title: 'Angebot → Auftrag', trainer: 'Safat Majumder', note: 'Sonderpreise beachten' },
  { kw: 29, team: 'Team 5', phase: 'Phase 3', modul: 8, title: 'Lagerorte & Lagerbewegungen', trainer: 'Florian Gräf', note: 'Technikerlager & Reparaturlager' },
  { kw: 29, team: 'Team 7', phase: 'Phase 3', modul: 10, title: 'Einkauf, Lieferanten & Wareneingang', trainer: 'Christian Irrgang', note: 'Beispiel: Bluphora (LZ 5–6 Wochen)' },
  // KW 30
  { kw: 30, team: 'Team 4', phase: 'Phase 4', modul: 11, title: 'FSM: Serviceauftrag', trainer: 'Safat Majumder', note: 'Außendienst-Workflow, mobile App' },
  { kw: 30, team: 'Team 6', phase: 'Phase 5', modul: 16, title: 'Kundenportal', trainer: 'Christian Irrgang', note: 'Vision & Zukunftsplanung' },
  { kw: 30, team: 'Team 2', phase: 'Phase 5', modul: 18, title: 'Reporting, Controlling & Management', trainer: 'Florian Gräf', note: 'Pflichtschulung Team 2' },
  // KW 31
  { kw: 31, team: 'Team 1', phase: 'Phase 2', modul: 5, title: 'Auftrag → Lieferschein → Rechnung', trainer: 'Safat Majumder', note: 'Eigene Sitzung – nicht kombinieren!' },
  { kw: 31, team: 'Team 5', phase: 'Phase 3', modul: 9, title: 'Seriennummern', trainer: 'Florian Gräf', note: 'Serviceprozess mit Seriennummern' },
  { kw: 31, team: 'Team 7', phase: 'Phase 2', modul: 6, title: 'Teillieferung, Rückgabe & Korrektur', trainer: 'Christian Irrgang', note: 'Lagerbewegung bei Rückgabe' },
  // KW 32
  { kw: 32, team: 'Team 4', phase: 'Phase 4', modul: 12, title: 'FSM: Terminplanung & Technikerprozess', trainer: 'Safat Majumder', note: 'Mobile Ansicht, Fotos & Unterschrift' },
  { kw: 32, team: 'Team 6', phase: 'Phase 5', modul: 17, title: 'Website & Zoho-Integration', trainer: 'Christian Irrgang', note: 'Kontaktformular & Platzhalter' },
  { kw: 32, team: 'Team 2', phase: 'Phase 5', modul: 15, title: 'Zoho Contracts', trainer: 'Florian Gräf', note: 'Pflichtschulung Team 2' },
  // KW 33
  { kw: 33, team: 'Team 1', phase: 'Phase 2', modul: 6, title: 'Teillieferung, Rückgabe & Korrektur', trainer: 'Safat Majumder', note: '' },
  { kw: 33, team: 'Team 5', phase: 'Phase 4', modul: 11, title: 'FSM: Serviceauftrag', trainer: 'Florian Gräf', note: 'Innentechniker-Perspektive' },
  // KW 34
  { kw: 34, team: 'Team 2', phase: 'Phase 5', modul: 14, title: 'Zoho Sign', trainer: 'Christian Irrgang', note: '' },
  // KW 35
  { kw: 35, team: 'Team 1', phase: 'Phase 5', modul: 14, title: 'Zoho Sign', trainer: 'Safat Majumder', note: '' },
  { kw: 35, team: 'Team 5', phase: 'Phase 4', modul: 12, title: 'FSM: Terminplanung & Technikerprozess', trainer: 'Florian Gräf', note: '' },
  // KW 37
  { kw: 37, team: 'Team 1', phase: 'Phase 5', modul: 16, title: 'Kundenportal', trainer: 'Safat Majumder', note: '' },
  { kw: 37, team: 'Team 5', phase: 'Phase 4', modul: 13, title: 'FSM → Rechnung', trainer: 'Florian Gräf', note: 'Übergang zu Zoho Books' },
]
