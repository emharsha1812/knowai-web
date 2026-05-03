// Two alternative landing-hero treatments to live alongside the main landing.

function LandingHeroVariantB({ theme = 'light' }) {
  // "specimen sheet" — heavy editorial, oversized type
  const t = TOKENS[theme];
  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} />
      <div style={{ padding: '64px 80px', display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 64, alignItems: 'start' }}>
        <div>
          <Mono theme={theme}>NO. 01 · A WORKING LIBRARY</Mono>
          <h1 style={{
            fontFamily: 'Newsreader, serif',
            fontSize: 110, fontWeight: 300, lineHeight: 0.92,
            letterSpacing: '-0.04em', margin: '32px 0 28px',
          }}>
            <span style={{ display: 'block' }}>Read</span>
            <span style={{ display: 'block', fontStyle: 'italic' }}>the</span>
            <span style={{ display: 'block' }}>machines.</span>
          </h1>
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 18, lineHeight: 1.55, color: t.inkSoft, fontWeight: 300, maxWidth: 360 }}>
            A monthly journal of computation. Long-form chapters with
            embedded code, math that compiles, and notebooks you can
            <Highlight theme={theme}>actually break</Highlight>.
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
            <button style={{ background: t.ink, color: t.paper, border: 'none', padding: '12px 18px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em' }}>BEGIN VOL. 01 →</button>
            <button style={{ background: 'transparent', color: t.ink, border: `1px solid ${t.ink}`, padding: '12px 18px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em' }}>SUBSCRIBE</button>
          </div>
        </div>
        {/* "page proof" preview */}
        <div style={{
          background: t.panel, border: `1px solid ${t.rule}`,
          padding: 28, position: 'relative', borderRadius: 2,
          boxShadow: theme === 'dark' ? 'none' : '0 12px 24px -16px rgba(0,0,0,0.18)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
            <Mono theme={theme}>CH. 14 · ATTENTION</Mono>
            <Mono theme={theme}>p. 142</Mono>
          </div>
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, lineHeight: 1.15, marginBottom: 14, letterSpacing: '-0.01em' }}>
            What the model is <em>actually</em> looking at.
          </div>
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 14.5, lineHeight: 1.65, color: t.inkSoft, columnCount: 2, columnGap: 20 }}>
            Attention reframes a sequence as a graph. Every token
            sends a query to every other token, asks "how relevant
            are you?", and listens for the answer. The softmax
            ensures the listening is normalized — you cannot pay
            more attention than 100%, even if the input begs you to.
            What follows is a derivation that will fit on a napkin.
          </div>
          <div style={{
            background: t.paperAlt, padding: 14, borderRadius: 4, border: `1px dashed ${t.rule}`,
            marginTop: 18, fontFamily: 'JetBrains Mono', fontSize: 12, color: t.ink,
          }}>
            <span style={{ color: t.inkMuted }}>›</span> attention(q, k, v).heatmap()  
            <span style={{ color: t.accent, marginLeft: 8 }}>↻ live</span>
          </div>
          {/* paperclip */}
          <div style={{ position: 'absolute', top: -14, right: 28, transform: 'rotate(8deg)', color: t.inkMuted }}>
            <svg width="22" height="38" viewBox="0 0 22 38" fill="none">
              <path d="M11 4 a6 6 0 0 1 6 6 v18 a4 4 0 0 1 -8 0 v-14 a2 2 0 0 1 4 0 v12" stroke={t.inkMuted} strokeWidth="1.4"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingHeroVariantC({ theme = 'light' }) {
  // "vol. 01 cover" — lightweight cover-style hero
  const t = TOKENS[theme];
  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} />
      <div style={{
        padding: '40px 80px 80px', minHeight: 700,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Mono theme={theme}>VOLUME 01 · ESTABLISHED 2024</Mono>
          <Mono theme={theme}>ISSN 2937-0044</Mono>
        </div>

        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 14, letterSpacing: '0.4em', color: t.inkSoft, marginBottom: 18 }}>
            T H E &nbsp; A N N O T A T E D &nbsp; M A C H I N E
          </div>
          <h1 style={{
            fontFamily: 'Newsreader, serif',
            fontWeight: 300, fontSize: 156, margin: 0, lineHeight: 0.94,
            letterSpacing: '-0.05em',
          }}>
            <em>How</em><br/>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <Highlight theme={theme}>networks</Highlight>
            </span><br/>
            <em>think.</em>
          </h1>
          <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: t.inkSoft, marginTop: 28, fontSize: 17 }}>
            A book that <span style={{ borderBottom: `1px solid ${t.ink}`, paddingBottom: 1 }}>runs.</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 36 }}>
            {['Math', 'Code', 'Notebooks', 'Kernels'].map(x => (
              <div key={x} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500 }}>·</div>
                <Mono theme={theme}>{x}</Mono>
              </div>
            ))}
          </div>
          <button style={{
            background: t.accent, color: t.accentInk, border: 'none',
            padding: '14px 24px', borderRadius: 2, fontWeight: 700, fontSize: 12,
            letterSpacing: '0.1em',
          }}>OPEN THE BOOK →</button>
        </div>
      </div>
    </div>
  );
}

window.LandingHeroVariantB = LandingHeroVariantB;
window.LandingHeroVariantC = LandingHeroVariantC;
