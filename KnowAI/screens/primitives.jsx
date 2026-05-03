// Shared primitives + tokens for KnowAI screens
// Loaded as a global script — exports go on window.

const TOKENS = {
  // Light theme
  light: {
    paper: '#faf8f3',
    paperAlt: '#f3efe5',
    ink: '#0e0e10',
    inkSoft: '#3a3a3e',
    inkMuted: '#86857f',
    rule: '#d9d4c5',
    ruleSoft: '#e8e3d4',
    accent: '#f4c542',     // highlighter yellow
    accentInk: '#0e0e10',
    panel: '#ffffff',
  },
  dark: {
    paper: '#14141a',
    paperAlt: '#1c1c22',
    ink: '#f1efe7',
    inkSoft: '#cfcdc4',
    inkMuted: '#7d7c75',
    rule: '#2c2c34',
    ruleSoft: '#22222a',
    accent: '#f4c542',
    accentInk: '#0e0e10',
    panel: '#1a1a20',
  },
  // Pastel card palette — refined from reference
  pastels: {
    mint:    { bg: '#bfe3bd', deep: '#3d6c3a', text: '#1d3a1c' },
    lavender:{ bg: '#cdb8e6', deep: '#5a3f7e', text: '#2c1f47' },
    peach:   { bg: '#f3a48a', deep: '#a14a32', text: '#4a1d10' },
    lilac:   { bg: '#b9a8d9', deep: '#4e3878', text: '#28173f' },
    sky:     { bg: '#a9c8e8', deep: '#2f5a87', text: '#152d47' },
    butter:  { bg: '#f0d97a', deep: '#876613', text: '#3d2d04' },
    rose:    { bg: '#e8a8b8', deep: '#8a3a52', text: '#3a1220' },
    sage:    { bg: '#aac2a7', deep: '#3f5e3c', text: '#1a2f18' },
    coral:   { bg: '#e8957d', deep: '#9a3d22', text: '#3f1605' },
    ice:     { bg: '#bfdce0', deep: '#3a6770', text: '#152b30' },
  }
};

// Highlighter mark — diagonal yellow line behind/over text
function Highlight({ children, strike = false, color, theme = 'light' }) {
  const t = TOKENS[theme];
  const c = color || t.accent;
  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      <svg viewBox="0 0 200 40" preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        {strike ? (
          <path d="M2 22 Q 60 18 130 24 T 198 21" stroke={c} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.95"/>
        ) : (
          <path d="M2 36 Q 60 32 130 36 T 198 33" stroke={c} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7"/>
        )}
      </svg>
    </span>
  );
}

// KnowAI logo mark — a small "knowing eye" / underlined K
function Logo({ theme = 'light', size = 18 }) {
  const t = TOKENS[theme];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Newsreader, serif', fontWeight: 600, fontSize: size, color: t.ink, letterSpacing: '-0.01em' }}>
      <svg width={size + 4} height={size + 4} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke={t.ink} strokeWidth="1.4"/>
        <circle cx="12" cy="12" r="3.5" fill={t.accent} stroke={t.ink} strokeWidth="1.2"/>
        <path d="M2 12 Q 12 4 22 12" stroke={t.ink} strokeWidth="1.4" fill="none"/>
      </svg>
      <span>KnowAI</span>
    </span>
  );
}

// Top navigation bar shared across every product screen
function NavBar({ theme = 'light', active = '' }) {
  const t = TOKENS[theme];
  const items = [
    { id: 'writing', label: 'Writing', glyph: '✦' },
    { id: 'courses', label: 'Courses', glyph: '◐' },
    { id: 'problems', label: 'Problems', glyph: '◇' },
    { id: 'labs', label: 'Labs', glyph: '⌬' },
  ];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', borderBottom: `1px solid ${t.rule}`,
      background: t.paper, fontFamily: 'Inter, sans-serif', fontSize: 13
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <Logo theme={theme} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {items.map(it => (
            <span key={it.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: active === it.id ? t.ink : t.inkSoft,
              fontWeight: active === it.id ? 600 : 500,
              borderBottom: active === it.id ? `2px solid ${t.accent}` : '2px solid transparent',
              paddingBottom: 3,
            }}>
              <span style={{ color: t.accent, fontSize: 14 }}>{it.glyph}</span>
              {it.label}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, color: t.inkSoft }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, opacity: 0.7 }}>⌘K</span>
        <span style={{ fontSize: 14 }}>{theme === 'dark' ? '☾' : '☼'}</span>
        <span>Sign in</span>
        <span style={{
          background: t.ink, color: t.paper, padding: '7px 14px', borderRadius: 2,
          fontWeight: 600, fontSize: 11, letterSpacing: '0.08em'
        }}>EARLY ACCESS</span>
      </div>
    </div>
  );
}

// Pastel category card — refined
function CategoryCard({ year = '2024', title, subtitle, tags = [], color = 'mint', icon, theme = 'light', size = 'md' }) {
  const p = TOKENS.pastels[color];
  const t = TOKENS[theme];
  const isLg = size === 'lg';
  return (
    <div style={{
      width: isLg ? 240 : 210, height: isLg ? 300 : 270,
      background: p.bg, borderRadius: 6,
      padding: isLg ? 18 : 16,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      position: 'relative', overflow: 'hidden',
      boxShadow: theme === 'dark' ? '0 1px 0 rgba(255,255,255,0.04)' : '0 1px 0 rgba(0,0,0,0.05)',
      color: p.text, fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: 11, fontWeight: 500, opacity: 0.7 }}>
        <span>{year}</span>
        <span style={{
          width: 22, height: 22, borderRadius: 999, background: 'rgba(0,0,0,0.08)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11
        }}>↗</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 90, height: 90, background: 'rgba(255,255,255,0.45)',
          borderRadius: '46% 54% 60% 40% / 50% 42% 58% 50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'Newsreader, serif', fontWeight: 600, fontSize: isLg ? 19 : 17, lineHeight: 1.15, marginBottom: 8 }}>
          {title}
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              background: 'rgba(0,0,0,0.13)', padding: '3px 9px', borderRadius: 999,
              fontSize: 10, fontWeight: 500
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// SVG icons for the categories — minimal, hand-drawn-feeling line icons
const Icons = {
  brain: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path d="M16 12c-3 0-6 2.5-6 6 0 1.5.5 3 1.5 4-1.5 1-2.5 2.5-2.5 4.5 0 2 1 3.5 2.5 4.5-.5 1-1 2-1 3 0 3 2.5 5 5.5 5 1.5 0 3-.5 4-1.5V13.5c-1-1-2.5-1.5-4-1.5z" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M32 12c3 0 6 2.5 6 6 0 1.5-.5 3-1.5 4 1.5 1 2.5 2.5 2.5 4.5 0 2-1 3.5-2.5 4.5.5 1 1 2 1 3 0 3-2.5 5-5.5 5-1.5 0-3-.5-4-1.5V13.5c1-1 2.5-1.5 4-1.5z" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="20" cy="22" r="1.6" fill={c}/>
      <circle cx="28" cy="20" r="1.6" fill={c}/>
      <circle cx="24" cy="30" r="1.6" fill={c}/>
      <path d="M20 22 L28 20 M28 20 L24 30 M24 30 L20 22" stroke={c} strokeWidth="0.8"/>
    </svg>
  ),
  chat: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path d="M10 14a4 4 0 014-4h20a4 4 0 014 4v16a4 4 0 01-4 4H22l-8 6v-6h-0a4 4 0 01-4-4V14z" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M16 20h16M16 26h10" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  eye: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path d="M6 12h6M36 12h6M6 36h6M36 36h6M6 12v6M42 12v6M6 36v-6M42 36v-6" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M10 24c4-7 9-10 14-10s10 3 14 10c-4 7-9 10-14 10s-10-3-14-10z" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="24" cy="24" r="4" stroke={c} strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  flow: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="6" width="12" height="10" stroke={c} strokeWidth="1.4" fill="none"/>
      <rect x="30" y="6" width="12" height="10" stroke={c} strokeWidth="1.4" fill="none"/>
      <rect x="18" y="32" width="12" height="10" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M12 16v8h12M36 16v8H24M24 24v8" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M22 30l2 2 2-2" stroke={c} strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  matrix: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path d="M10 8v32M14 8h-4M14 40h-4" stroke={c} strokeWidth="1.4"/>
      <path d="M38 8v32M34 8h4M34 40h4" stroke={c} strokeWidth="1.4"/>
      <text x="16" y="20" fontFamily="serif" fontSize="8" fill={c}>a₁₁</text>
      <text x="26" y="20" fontFamily="serif" fontSize="8" fill={c}>a₁₂</text>
      <text x="16" y="32" fontFamily="serif" fontSize="8" fill={c}>a₂₁</text>
      <text x="26" y="32" fontFamily="serif" fontSize="8" fill={c}>a₂₂</text>
    </svg>
  ),
  sigma: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path d="M14 10h20l-12 14 12 14H14" stroke={c} strokeWidth="1.6" fill="none" strokeLinejoin="round"/>
    </svg>
  ),
  curve: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <path d="M6 38h36M6 38V10" stroke={c} strokeWidth="1.4"/>
      <path d="M6 34c8 0 8-22 18-22s10 22 18 22" stroke={c} strokeWidth="1.6" fill="none"/>
      <circle cx="24" cy="12" r="2" fill={c}/>
    </svg>
  ),
  chip: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect x="12" y="12" width="24" height="24" stroke={c} strokeWidth="1.4" fill="none"/>
      <rect x="18" y="18" width="12" height="12" stroke={c} strokeWidth="1.2" fill="none"/>
      <path d="M16 6v6M24 6v6M32 6v6M16 36v6M24 36v6M32 36v6M6 16h6M6 24h6M6 32h6M36 16h6M36 24h6M36 32h6" stroke={c} strokeWidth="1.4"/>
    </svg>
  ),
  dice: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <rect x="10" y="10" width="28" height="28" rx="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="18" cy="18" r="1.6" fill={c}/>
      <circle cx="30" cy="18" r="1.6" fill={c}/>
      <circle cx="24" cy="24" r="1.6" fill={c}/>
      <circle cx="18" cy="30" r="1.6" fill={c}/>
      <circle cx="30" cy="30" r="1.6" fill={c}/>
    </svg>
  ),
  graph: (c='#111') => (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
      <circle cx="12" cy="14" r="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="36" cy="14" r="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="24" cy="28" r="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="12" cy="38" r="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="36" cy="38" r="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M14 16l8 10M34 16l-8 10M22 30l-8 6M26 30l8 6" stroke={c} strokeWidth="1.2"/>
    </svg>
  ),
};

// Tag chip used throughout
function Tag({ children, theme = 'light', accent = false }) {
  const t = TOKENS[theme];
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 9px', borderRadius: 999,
      fontSize: 10.5, fontWeight: 500,
      fontFamily: 'Inter, sans-serif',
      background: accent ? t.accent : (theme === 'dark' ? '#2a2a32' : '#ebe6d6'),
      color: accent ? t.accentInk : t.inkSoft,
      letterSpacing: '0.01em',
    }}>{children}</span>
  );
}

// Mono caption (used for chapter numbers, file names)
function Mono({ children, theme = 'light', size = 11 }) {
  const t = TOKENS[theme];
  return (
    <span style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: size,
      color: t.inkMuted,
      letterSpacing: '0.02em',
    }}>{children}</span>
  );
}

Object.assign(window, { TOKENS, Highlight, Logo, NavBar, CategoryCard, Icons, Tag, Mono });
