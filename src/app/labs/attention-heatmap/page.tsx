'use client';

import React from 'react';
import { TOKENS, NavBar, Mono, Tag, useTheme } from "@/components/ui/primitives";

export default function Labs() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
        <NavBar theme={theme} active="labs" />

        {/* notebook chrome */}
        <div style={{ padding: '14px 32px', borderBottom: `1px solid ${t.rule}`, background: t.paperAlt, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, background: '#7aa86b', borderRadius: 999 }} />
            <Mono theme={theme}>LAB · attention.heatmap.py</Mono>
            <span style={{ color: t.inkMuted, fontSize: 11 }}>· marimo · reactive</span>
            <span style={{ color: t.inkMuted, fontSize: 11 }}>· kernel: ready (140 ms)</span>
          </div>
          <div style={{ display: 'flex', gap: 10, fontSize: 11, color: t.inkSoft }}>
            <span>↻ run all</span><span>·</span><span>⊕ new cell</span><span>·</span><span>↗ share</span>
            <Tag theme={theme} accent>EDITING</Tag>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr 280px', minHeight: 800 }}>
          {/* left: cell graph */}
          <aside style={{ borderRight: `1px solid ${t.rule}`, padding: '24px 22px' }}>
            <Mono theme={theme}>REACTIVE GRAPH</Mono>
            <svg viewBox="0 0 200 320" style={{ width: '100%', marginTop: 14 }}>
              {[
                { x: 100, y: 26, label: 'imports' },
                { x: 100, y: 76, label: 'seq_len' },
                { x: 60,  y: 126, label: 'd_k' },
                { x: 140, y: 126, label: 'temp' },
                { x: 100, y: 186, label: 'Q,K,V' },
                { x: 100, y: 240, label: 'attn(...)' },
                { x: 100, y: 296, label: 'heatmap' },
              ].map((n, i) => (
                <g key={i}>
                  <rect x={n.x - 38} y={n.y - 12} width="76" height="20" rx="3"
                    fill={i === 5 ? t.accent : t.paperAlt}
                    stroke={t.rule}/>
                  <text x={n.x} y={n.y + 3} fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle"
                    fill={i === 5 ? t.accentInk : t.ink}>{n.label}</text>
                </g>
              ))}
              {/* edges */}
              {[
                [100,38, 100,64], [100,88, 60,114], [100,88, 140,114],
                [60,138, 100,174], [140,138, 100,174],
                [100,198, 100,228], [100,252, 100,284],
              ].map((e, i) => (
                <line key={i} x1={e[0]} y1={e[1]} x2={e[2]} y2={e[3]} stroke={t.inkMuted} strokeWidth="0.8"/>
              ))}
            </svg>
            <div style={{ marginTop: 18, fontSize: 11, color: t.inkMuted, lineHeight: 1.5 }}>
              Cells re-run automatically when their inputs change. No
              hidden state, no out-of-order surprises.
            </div>
          </aside>

          {/* main cells */}
          <main style={{ padding: '24px 36px' }}>
            {/* cell 1 — markdown */}
            <Cell theme={theme} kind="md" n={1}>
              <h2 style={{ fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 26, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                Attention, in motion.
              </h2>
              <p style={{ fontFamily: 'Newsreader, serif', fontSize: 15, lineHeight: 1.6, color: t.inkSoft, margin: 0 }}>
                Drag the sliders. Watch the heatmap. The temperature
                parameter rescales scores before softmax — high temperature
                flattens the attention; low temperature sharpens it into
                a near-hardmax.
              </p>
            </Cell>

            {/* cell 2 — sliders (UI elements rendered by marimo) */}
            <Cell theme={theme} kind="ui" n={2}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
                {[
                  { label: 'sequence length', val: '12', min: 4, max: 64, frac: 0.18 },
                  { label: 'd_k', val: '64', min: 16, max: 512, frac: 0.12 },
                  { label: 'temperature τ', val: '1.0', min: 0.1, max: 4.0, frac: 0.25 },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6 }}>
                      <Mono theme={theme}>{s.label}</Mono>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, fontWeight: 600 }}>{s.val}</span>
                    </div>
                    <div style={{ height: 4, background: t.ruleSoft, borderRadius: 2, position: 'relative' }}>
                      <div style={{ width: `${s.frac * 100}%`, height: '100%', background: t.accent, borderRadius: 2 }} />
                      <div style={{ width: 12, height: 12, borderRadius: 999, background: t.ink, position: 'absolute', top: -4, left: `calc(${s.frac * 100}% - 6px)` }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.inkMuted, marginTop: 4 }}>
                      <span>{s.min}</span><span>{s.max}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Cell>

            {/* cell 3 — code */}
            <Cell theme={theme} kind="py" n={3}>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, lineHeight: 1.65 }}>
                <div><span style={{ color: '#a06bb6' }}>import</span> numpy <span style={{ color: '#a06bb6' }}>as</span> np</div>
                <div><span style={{ color: '#a06bb6' }}>import</span> matplotlib.pyplot <span style={{ color: '#a06bb6' }}>as</span> plt</div>
                <br/>
                <div>np.random.seed(<span style={{ color: '#c14a3e' }}>0</span>)</div>
                <div>Q = np.random.randn(seq_len.value, d_k.value)</div>
                <div>K = np.random.randn(seq_len.value, d_k.value)</div>
                <div>V = np.random.randn(seq_len.value, d_k.value)</div>
                <br/>
                <div>scores = (Q @ K.T) / (np.sqrt(d_k.value) * temp.value)</div>
                <div>weights = softmax(scores, axis=<span style={{ color: '#c14a3e' }}>-1</span>)</div>
                <div>plt.imshow(weights, cmap=<span style={{ color: '#3776a8' }}>"viridis"</span>)</div>
              </div>
            </Cell>

            {/* cell 4 — output (heatmap visualization) */}
            <Cell theme={theme} kind="out" n={4}>
              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div>
                  <Mono theme={theme}>FIG. attention weights · 12 × 12</Mono>
                  <svg viewBox="0 0 240 240" style={{ width: 240, height: 240, marginTop: 8, background: '#0a0420', borderRadius: 2 }}>
                    {Array.from({ length: 12 }, (_, i) => Array.from({ length: 12 }, (_, j) => {
                      // diagonal-biased random weights
                      const dist = Math.abs(i - j);
                      const r = (Math.sin(i * 1.3 + j * 0.7) + 1) / 4;
                      const w = Math.max(0, Math.exp(-dist / 2.5) * 0.7 + r * 0.3);
                      const hue = 220 + w * 80;
                      const l = 12 + w * 70;
                      return <rect key={`${i}-${j}`} x={j * 20} y={i * 20} width={20} height={20} fill={`hsl(${hue}, 70%, ${l}%)`} />;
                    }))}
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <Mono theme={theme}>STATS</Mono>
                  <table style={{ width: '100%', marginTop: 8, fontSize: 12, fontFamily: 'JetBrains Mono', borderCollapse: 'collapse' }}>
                    <tbody>
                      {[
                        ['shape', '(12, 12)'],
                        ['min', '0.012'],
                        ['max', '0.418'],
                        ['mean', '0.083'],
                        ['entropy', '2.31 nats'],
                        ['effective span', '5.7'],
                      ].map(([k, v]) => (
                        <tr key={k}>
                          <td style={{ color: t.inkMuted, padding: '4px 0' }}>{k}</td>
                          <td style={{ color: t.ink, textAlign: 'right' }}>{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop: 18, fontFamily: 'Newsreader, serif', fontSize: 13, fontStyle: 'italic', color: t.inkSoft, lineHeight: 1.5 }}>
                    At <Mono theme={theme} size={12}>τ = 1.0</Mono>, attention is moderately
                    diagonal — each token attends mostly to itself and its
                    nearest neighbors. Lower τ to see the diagonal sharpen.
                  </div>
                </div>
              </div>
            </Cell>
          </main>

          {/* right: variable inspector */}
          <aside style={{ borderLeft: `1px solid ${t.rule}`, padding: '24px 22px' }}>
            <Mono theme={theme}>VARIABLES</Mono>
            <div style={{ marginTop: 12, fontFamily: 'JetBrains Mono', fontSize: 11.5, lineHeight: 1.7 }}>
              {[
                ['Q', 'ndarray', '(12, 64)'],
                ['K', 'ndarray', '(12, 64)'],
                ['V', 'ndarray', '(12, 64)'],
                ['scores', 'ndarray', '(12, 12)'],
                ['weights', 'ndarray', '(12, 12)'],
                ['seq_len', 'slider', '12'],
                ['d_k', 'slider', '64'],
                ['temp', 'slider', '1.0'],
              ].map(([name, type, shape]) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: `1px dashed ${t.ruleSoft}` }}>
                  <span style={{ color: t.ink }}>{name}</span>
                  <span style={{ color: t.inkMuted }}>{type} {shape}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Mono theme={theme}>RUN HISTORY</Mono>
              <div style={{ marginTop: 10, fontSize: 11, color: t.inkSoft, lineHeight: 1.7 }}>
                <div>14:32:09 · cell 4 · 12 ms</div>
                <div>14:32:09 · cell 3 · 4 ms</div>
                <div>14:32:09 · cell 2 · &lt;1 ms</div>
                <div style={{ color: t.inkMuted }}>14:31:58 · full graph · 142 ms</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Cell({ theme, kind, n, children }: any) {
  const t = TOKENS[theme as keyof typeof TOKENS] as any;
  const meta = ({
    md:  { tag: 'MD',   color: t.inkMuted },
    ui:  { tag: 'UI',   color: '#7aa86b' },
    py:  { tag: 'PY',   color: '#3776a8' },
    out: { tag: 'OUT',  color: t.accent },
  } as any)[kind];
  const isCode = kind === 'py';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: 14, marginBottom: 18 }}>
      <div style={{ paddingTop: 6, textAlign: 'right' }}>
        <Mono theme={theme}>[{n}]</Mono>
        <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: meta.color, marginTop: 4, fontWeight: 600 }}>{meta.tag}</div>
      </div>
      <div style={{
        background: isCode ? (theme === 'dark' ? '#0c0c10' : '#f8f5ec') : t.paper,
        border: `1px solid ${t.rule}`,
        borderLeft: `3px solid ${meta.color}`,
        borderRadius: 3, padding: '14px 18px',
      }}>
        {children}
      </div>
    </div>
  );
}
