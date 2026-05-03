// Logged-in dashboard — progress, current chapter, queued problems, streak

function Dashboard({ theme = 'light' }) {
  const t = TOKENS[theme];

  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} />

      <div style={{ padding: '36px 80px 24px' }}>
        {/* greeting */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <Mono theme={theme}>WED · NOV 13 · 09:42</Mono>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 40, fontWeight: 500, margin: '6px 0 0', letterSpacing: '-0.02em' }}>
              Welcome back, <em>Sai.</em>
            </h1>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 16, color: t.inkSoft, marginTop: 4, fontStyle: 'italic' }}>
              You left off in the middle of a derivation. Let's <Highlight theme={theme}>finish it.</Highlight>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, padding: '8px 14px', borderRadius: 3, fontSize: 12 }}>
              <Mono theme={theme}>STREAK</Mono>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500 }}>23 <span style={{ fontSize: 12, color: t.inkMuted }}>days</span></div>
            </div>
            <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, padding: '8px 14px', borderRadius: 3, fontSize: 12 }}>
              <Mono theme={theme}>SOLVED</Mono>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500 }}>147 <span style={{ fontSize: 12, color: t.inkMuted }}>problems</span></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 80px 80px', display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 28 }}>
        <div>
          {/* CONTINUE READING — large card */}
          <div style={{
            background: TOKENS.pastels.lavender.bg,
            color: TOKENS.pastels.lavender.text,
            borderRadius: 6, padding: 28, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <Mono theme="light"><span style={{ color: TOKENS.pastels.lavender.text, opacity: 0.7 }}>RESUME · CH. 14 — ATTENTION</span></Mono>
              <Mono theme="light"><span style={{ color: TOKENS.pastels.lavender.text, opacity: 0.7 }}>p. 142 / 178</span></Mono>
            </div>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 38, fontWeight: 500, margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              Why we divide<br/>by <em>√d<sub>k</sub></em>.
            </h2>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 15, fontStyle: 'italic', marginTop: 12, opacity: 0.85, maxWidth: 460 }}>
              You stopped mid-paragraph. The variance argument resolves on the next page.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 32 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{
                    width: 16, height: 4, borderRadius: 1,
                    background: i < 4 ? TOKENS.pastels.lavender.deep : 'rgba(0,0,0,0.15)',
                  }} />
                ))}
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, marginLeft: 8, opacity: 0.7 }}>4 / 12 sections</span>
              </div>
              <button style={{
                background: TOKENS.pastels.lavender.text, color: TOKENS.pastels.lavender.bg,
                border: 'none', padding: '11px 18px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em',
              }}>RESUME ↗</button>
            </div>
          </div>

          {/* PATH PROGRESS */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <Mono theme={theme}>§ YOUR PATH · IMPLEMENTATION</Mono>
              <span style={{ fontSize: 12, color: t.inkSoft }}>est. 9 weeks remaining</span>
            </div>
            {[
              { mod: '05', name: 'Backprop by Hand', frac: 1.0, status: 'complete' },
              { mod: '06', name: 'CNNs from Conv2d up', frac: 1.0, status: 'complete' },
              { mod: '07', name: 'Attention & Transformers', frac: 0.34, status: 'current' },
              { mod: '08', name: 'Diffusion Models', frac: 0.0, status: 'next' },
            ].map(m => (
              <div key={m.mod} style={{
                display: 'grid', gridTemplateColumns: '50px 1fr 80px 32px',
                alignItems: 'center', gap: 16, padding: '12px 0',
                borderBottom: `1px solid ${t.ruleSoft}`,
              }}>
                <Mono theme={theme}>MOD {m.mod}</Mono>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{m.name}</div>
                  <div style={{ height: 3, background: t.ruleSoft, borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                    <div style={{ width: `${m.frac * 100}%`, height: '100%', background: m.status === 'complete' ? '#7aa86b' : t.accent }} />
                  </div>
                </div>
                <span style={{ fontSize: 11, color: t.inkMuted, fontFamily: 'JetBrains Mono', textAlign: 'right' }}>
                  {m.status === 'complete' ? '✓ done' : m.status === 'current' ? `${Math.round(m.frac * 100)}%` : 'queued'}
                </span>
                <span style={{ color: t.inkSoft, textAlign: 'right' }}>→</span>
              </div>
            ))}
          </div>

          {/* RECENT NOTEBOOKS */}
          <div style={{ marginTop: 32 }}>
            <Mono theme={theme}>§ NOTEBOOKS · RECENT</Mono>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
              {[
                { name: 'attention.heatmap', edited: '12 min ago', cells: 8, color: 'butter' },
                { name: 'softmax.stability', edited: '2 hr ago', cells: 5, color: 'sky' },
                { name: 'kv-cache.memory', edited: 'yesterday', cells: 11, color: 'mint' },
              ].map(n => (
                <div key={n.name} style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 3, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ width: 28, height: 28, background: TOKENS.pastels[n.color].bg, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'JetBrains Mono', fontSize: 11, color: TOKENS.pastels[n.color].text, fontWeight: 600 }}>nb</span>
                    <Mono theme={theme}>{n.cells} cells</Mono>
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: t.ink, marginTop: 12 }}>{n.name}</div>
                  <div style={{ fontSize: 11, color: t.inkMuted, marginTop: 4 }}>edited {n.edited}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* PROBLEM QUEUE */}
          <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 4, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Mono theme={theme}>§ PROBLEM QUEUE</Mono>
              <span style={{ fontSize: 11, color: t.inkSoft }}>4 due</span>
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { id: '14.2.A', title: 'Scaled dot-product attention', diff: 'med', status: 'in-progress' },
                { id: '14.2.B', title: 'Implement masked attention', diff: 'med', status: 'queued' },
                { id: '13.4.C', title: 'Layer norm vs batch norm', diff: 'easy', status: 'review' },
                { id: '14.3.A', title: 'Multi-head from scratch', diff: 'hard', status: 'queued' },
              ].map(p => (
                <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '50px 1fr auto', gap: 10, padding: '8px 0', borderBottom: `1px dashed ${t.ruleSoft}` }}>
                  <Mono theme={theme}>{p.id}</Mono>
                  <div>
                    <div style={{ fontSize: 12.5 }}>{p.title}</div>
                    <div style={{ display: 'flex', gap: 5, marginTop: 4 }}>
                      <Tag theme={theme}>{p.diff}</Tag>
                      {p.status === 'in-progress' && <Tag theme={theme} accent>in progress</Tag>}
                      {p.status === 'review' && <Tag theme={theme}>review</Tag>}
                    </div>
                  </div>
                  <span style={{ color: t.inkMuted, fontSize: 14 }}>→</span>
                </div>
              ))}
            </div>
          </div>

          {/* HEATMAP — practice over time */}
          <div style={{ marginTop: 22, background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 4, padding: 20 }}>
            <Mono theme={theme}>§ ACTIVITY · LAST 12 WEEKS</Mono>
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
              {Array.from({ length: 12 * 7 }).map((_, i) => {
                const v = Math.random();
                const a = v < 0.3 ? 0 : v < 0.55 ? 0.25 : v < 0.78 ? 0.55 : 1;
                return <div key={i} style={{
                  aspectRatio: '1', background: a === 0 ? t.ruleSoft : `rgba(244,197,66,${0.25 + a * 0.7})`,
                  borderRadius: 1.5,
                }} />;
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 10, color: t.inkMuted }}>
              <span>less</span>
              <div style={{ display: 'flex', gap: 3 }}>
                {[t.ruleSoft, 'rgba(244,197,66,0.4)', 'rgba(244,197,66,0.65)', 'rgba(244,197,66,0.95)'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, background: c, borderRadius: 1.5 }} />
                ))}
              </div>
              <span>more</span>
            </div>
          </div>

          {/* NEXT MILESTONE */}
          <div style={{ marginTop: 22, padding: 22, background: t.ink, color: t.paper, borderRadius: 4 }}>
            <Mono theme="dark"><span style={{ color: TOKENS.dark.inkMuted }}>NEXT MILESTONE</span></Mono>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500, marginTop: 8, lineHeight: 1.2 }}>
              Finish Module 07 — earn the "Wrote a transformer" badge.
            </div>
            <div style={{ marginTop: 18, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: '34%', height: '100%', background: t.accent }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, opacity: 0.7 }}>
              <span>5 of 16 chapters</span><span>~ 11 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
