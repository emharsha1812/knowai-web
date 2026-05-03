// Mini-textbook reading view

function Reading({ theme = 'light' }) {
  const t = TOKENS[theme];
  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} active="writing" />

      {/* sub-bar with breadcrumb + reading meta */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 32px', borderBottom: `1px solid ${t.rule}`, background: t.paperAlt,
      }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: t.inkSoft }}>
          <Mono theme={theme}>VOL. II · IMPLEMENTATION</Mono>
          <span>›</span>
          <span>Transformers</span>
          <span>›</span>
          <span style={{ color: t.ink, fontWeight: 500 }}>Ch. 14 — Attention</span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: t.inkSoft }}>
          <span>~ 22 min read</span>
          <span>·</span>
          <span>4 problems · 2 notebooks</span>
          <span style={{ background: t.ink, color: t.paper, padding: '4px 10px', borderRadius: 2, fontSize: 11, fontWeight: 600 }}>SAVE</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr 240px', gap: 0 }}>
        {/* TOC */}
        <aside style={{ borderRight: `1px solid ${t.rule}`, padding: '32px 24px', minHeight: 1200 }}>
          <Mono theme={theme}>CONTENTS</Mono>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 1.5, fontSize: 13 }}>
            {[
              ['14.1', 'A soft dictionary lookup', false, true],
              ['14.2', 'Scaled dot-product', true, true],
              ['14.3', 'Multi-head, geometrically', false, false],
              ['14.4', 'KV-cache, in memory', false, false],
              ['14.5', 'Masking & causality', false, false],
              ['§', 'Problem set (4)', false, false],
              ['§', 'Notebook · attention.heatmap', false, false],
            ].map(([n, label, active, done]) => (
              <div key={label} style={{
                display: 'flex', gap: 10, padding: '7px 8px', borderRadius: 3,
                background: active ? t.accent : 'transparent',
                color: active ? t.accentInk : t.inkSoft,
                fontWeight: active ? 600 : 400,
              }}>
                <span style={{ width: 22, fontFamily: 'JetBrains Mono', fontSize: 11, opacity: 0.7 }}>{n}</span>
                <span style={{ flex: 1, lineHeight: 1.3 }}>{label}</span>
                {done && <span style={{ color: active ? t.accentInk : '#7aa86b' }}>✓</span>}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <Mono theme={theme}>PROGRESS</Mono>
            <div style={{ marginTop: 10, height: 4, background: t.ruleSoft, borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: '38%', height: '100%', background: t.accent }} />
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: t.inkMuted }}>2 of 5 sections complete</div>
          </div>
        </aside>

        {/* main column */}
        <main style={{ padding: '48px 64px', maxWidth: 720 }}>
          <Mono theme={theme}>§ 14.2 · SCALED DOT-PRODUCT</Mono>
          <h1 style={{
            fontFamily: 'Newsreader, serif', fontSize: 44, fontWeight: 500,
            lineHeight: 1.1, letterSpacing: '-0.02em', margin: '12px 0 8px',
          }}>
            Why we divide by <em>√d<sub>k</sub></em>.
          </h1>
          <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: t.inkSoft, fontSize: 16, marginBottom: 28 }}>
            A short detour through variance, before we earn the right to softmax.
          </div>

          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 17.5, lineHeight: 1.7 }}>
            <p style={{ margin: '0 0 18px' }}>
              <span style={{ float: 'left', fontFamily: 'Newsreader, serif', fontSize: 64, lineHeight: 0.9, paddingRight: 8, paddingTop: 4, fontWeight: 500 }}>T</span>
              he dot product of two random vectors is, on average, larger
              when the vectors are larger. That sentence is obvious and
              also <em>important</em>. If our queries and keys live in
              ℝ⁵¹², then on average <Mono theme={theme} size={15}>q·k</Mono> grows with the dimension —
              and softmax, reading those numbers, will collapse into a
              one-hot distribution before the network has had time to learn anything.
            </p>

            <p style={{ margin: '0 0 18px', color: t.inkSoft }}>
              The fix is small and clarifying. We assume each component
              of <Mono theme={theme} size={15}>q</Mono> and <Mono theme={theme} size={15}>k</Mono> is
              roughly unit-variance. Then their inner product has variance <Mono theme={theme} size={15}>d<sub>k</sub></Mono>,
              and dividing by <Mono theme={theme} size={15}>√d<sub>k</sub></Mono> restores
              unit variance — softmax operates in a regime where it can still see gradients.
            </p>

            {/* equation box */}
            <div style={{
              background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 4,
              padding: '22px 24px', margin: '28px 0',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Mono theme={theme}>EQ. 14.2</Mono>
                <Mono theme={theme}>↻ runs in §14.2-nb</Mono>
              </div>
              <div style={{
                fontFamily: 'Newsreader, serif', fontSize: 30, textAlign: 'center',
                fontStyle: 'italic', padding: '12px 0',
              }}>
                Var(q·k) = d<sub>k</sub> &nbsp;⟹&nbsp; Var<span style={{fontStyle:'normal'}}>(</span>q·k / √d<sub>k</sub><span style={{fontStyle:'normal'}}>)</span> = 1
              </div>
            </div>

            <p style={{ margin: '0 0 18px' }}>
              The intuition is geometric. As we add dimensions, two random
              unit-vectors become, in expectation, <Highlight theme={theme}>nearly orthogonal</Highlight>.
              The variance of their inner product, however, grows. We are
              keeping the <em>shape</em> of attention stable as the model gets wider.
            </p>

            {/* margin-aside note */}
            <div style={{
              background: t.paperAlt, padding: '18px 22px', borderLeft: `3px solid ${t.accent}`,
              fontFamily: 'Newsreader, serif', fontSize: 15, fontStyle: 'italic',
              color: t.inkSoft, margin: '28px 0',
            }}>
              <span style={{ fontStyle: 'normal', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', color: t.ink, display: 'block', marginBottom: 6 }}>ASIDE</span>
              You will sometimes see this written as <Mono theme={theme} size={14}>1/√d<sub>k</sub></Mono> outside
              the softmax. It is the same operation. Implementations differ
              in whether they fuse the scale into the linear projection of <Mono theme={theme} size={14}>k</Mono> —
              a worthwhile micro-optimization, less worthwhile pedagogy.
            </div>

            {/* embedded diagram */}
            <div style={{ background: t.panel, border: `1px solid ${t.rule}`, padding: 24, margin: '24px 0', borderRadius: 4 }}>
              <Mono theme={theme}>FIG. 14.2 · DOT-PRODUCT VARIANCE GROWS WITH d<sub>k</sub></Mono>
              <svg viewBox="0 0 560 200" style={{ width: '100%', marginTop: 14 }}>
                {/* axes */}
                <line x1="40" y1="170" x2="540" y2="170" stroke={t.ink} strokeWidth="1"/>
                <line x1="40" y1="20" x2="40" y2="170" stroke={t.ink} strokeWidth="1"/>
                <text x="280" y="192" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" fill={t.inkMuted}>d_k (model dimension)</text>
                <text x="20" y="95" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" fill={t.inkMuted} transform="rotate(-90 20 95)">Var(q·k)</text>
                {/* unscaled curve — quickly explodes */}
                <path d="M 40 168 Q 200 140 320 80 T 540 22" stroke={t.ink} strokeWidth="1.6" fill="none"/>
                {/* scaled — flat */}
                <path d="M 40 130 L 540 128" stroke={t.accent} strokeWidth="3" fill="none"/>
                {/* dots */}
                {[64, 128, 256, 512].map((d, i) => (
                  <g key={d}>
                    <circle cx={40 + (i+1)*120} cy={130} r="3.5" fill={t.accent} stroke={t.ink} strokeWidth="0.8"/>
                  </g>
                ))}
                <text x="500" y="20" fontFamily="JetBrains Mono" fontSize="9" fill={t.inkSoft}>unscaled →</text>
                <text x="500" y="120" fontFamily="JetBrains Mono" fontSize="9" fill={t.inkSoft}>÷ √d_k →</text>
              </svg>
            </div>

            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 26, fontWeight: 500, margin: '36px 0 12px', letterSpacing: '-0.01em' }}>
              In code.
            </h2>
            <div style={{
              background: theme === 'dark' ? '#0c0c10' : '#f8f5ec',
              border: `1px solid ${t.rule}`, borderRadius: 4,
              fontFamily: 'JetBrains Mono', fontSize: 12.5, lineHeight: 1.65,
              padding: '18px 22px', margin: '12px 0 24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, color: t.inkMuted, fontSize: 11 }}>
                <span>attention.py</span><span>↻ live cell · §14.2-nb</span>
              </div>
              <div><span style={{ color: '#a06bb6' }}>def</span> <span style={{ color: '#3776a8' }}>scaled_dot_attention</span>(q, k, v):</div>
              <div style={{ paddingLeft: 16 }}><span style={{ color: t.inkMuted }}># q,k,v: (batch, heads, seq, d_k)</span></div>
              <div style={{ paddingLeft: 16 }}>scores = q @ k.transpose(<span style={{ color: '#c14a3e' }}>-2</span>, <span style={{ color: '#c14a3e' }}>-1</span>)</div>
              <div style={{ paddingLeft: 16, background: theme === 'dark' ? 'rgba(244,197,66,0.12)' : 'rgba(244,197,66,0.32)', margin: '0 -22px', padding: '0 22px 0 38px' }}>scores = scores / math.sqrt(k.size(<span style={{ color: '#c14a3e' }}>-1</span>))  <span style={{ color: t.inkMuted }}># ← the line</span></div>
              <div style={{ paddingLeft: 16 }}>weights = scores.softmax(dim=<span style={{ color: '#c14a3e' }}>-1</span>)</div>
              <div style={{ paddingLeft: 16 }}><span style={{ color: '#a06bb6' }}>return</span> weights @ v, weights</div>
            </div>

            <p style={{ margin: '0 0 18px', color: t.inkSoft }}>
              We mark this line because it will, eventually, fail you.
              Half-precision training, very long contexts, and certain
              fused-attention kernels all interact with it. We will return
              to this footnote in <Mono theme={theme} size={14}>§16.4</Mono>.
            </p>

            {/* problem hand-off */}
            <div style={{
              border: `2px dashed ${t.accent}`, padding: 22, borderRadius: 4, marginTop: 32,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <Mono theme={theme}>NEXT · PROBLEM 14.2.A</Mono>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500, marginTop: 4 }}>
                  Implement scaled dot-product attention.
                </div>
                <div style={{ fontSize: 13, color: t.inkSoft, marginTop: 4 }}>4 test cases · est. 18 min · numpy only, no torch</div>
              </div>
              <button style={{ background: t.ink, color: t.paper, padding: '12px 18px', border: 'none', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', borderRadius: 2 }}>OPEN EDITOR →</button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 64, paddingTop: 24, borderTop: `1px solid ${t.rule}`, fontSize: 13 }}>
            <span style={{ color: t.inkSoft }}>← 14.1 · A soft dictionary lookup</span>
            <span style={{ color: t.ink, fontWeight: 600 }}>14.3 · Multi-head, geometrically →</span>
          </div>
        </main>

        {/* margin column — annotations */}
        <aside style={{ borderLeft: `1px solid ${t.rule}`, padding: '48px 24px' }}>
          <Mono theme={theme}>MARGINALIA</Mono>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ background: t.paperAlt, padding: 12, borderRadius: 3, fontSize: 12, lineHeight: 1.5 }}>
              <Mono theme={theme}>YOU · 3 days ago</Mono>
              <div style={{ marginTop: 6, fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 13 }}>
                Why <em>square root</em> specifically — does the variance argument
                generalize to other norms?
              </div>
            </div>
            <div style={{ background: t.paperAlt, padding: 12, borderRadius: 3, fontSize: 12, lineHeight: 1.5, borderLeft: `3px solid ${t.accent}` }}>
              <Mono theme={theme}>AUTHOR · pinned</Mono>
              <div style={{ marginTop: 6, fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 13 }}>
                Yes — see Vaswani §3.2.1, footnote 4. Any monotone re-scaling
                that returns Var → 1 works; √d<sub>k</sub> is just the cleanest.
              </div>
            </div>

            <Mono theme={theme}>HIGHLIGHTS · 412</Mono>
            <div style={{ fontSize: 12, color: t.inkSoft, lineHeight: 1.5, fontStyle: 'italic', fontFamily: 'Newsreader, serif' }}>
              "softmax, reading those numbers, will collapse into a one-hot distribution"
              <div style={{ fontStyle: 'normal', marginTop: 4, color: t.inkMuted, fontSize: 11 }}>highlighted by 84 readers</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

window.Reading = Reading;
