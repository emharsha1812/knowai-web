'use client';

import React from 'react';
import { TOKENS, Highlight, NavBar, Mono, Tag, useTheme } from "@/components/ui/primitives";

export default function PaperDetail() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;
  const pal = TOKENS.pastels.lavender;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
        <NavBar theme={theme} />

        {/* paper header */}
        <div style={{ padding: '36px 80px 28px', borderBottom: `1px solid ${t.rule}`, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, fontSize: 12, color: t.inkSoft }}>
            <Mono theme={theme}>PAPERS</Mono><span>›</span>
            <span>NLP</span><span>›</span>
            <span style={{ color: t.ink, fontWeight: 500 }}>Attention Is All You Need</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 56, alignItems: 'end' }}>
            <div>
              <Mono theme={theme}>2017 · NeurIPS · arXiv:1706.03762</Mono>
              <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 54, fontWeight: 400, margin: '8px 0 0', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
                Attention Is All <em>You</em> Need.
              </h1>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 16, fontStyle: 'italic', color: t.inkSoft, marginTop: 12 }}>
                Vaswani · Shazeer · Parmar · Uszkoreit · Jones · Gomez · Kaiser · Polosukhin
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <Tag theme={theme}>NLP</Tag>
              <Tag theme={theme}>medium</Tag>
              <Tag theme={theme} accent>✓ implemented</Tag>
              <button style={{ background: t.ink, color: t.paper, padding: '8px 14px', border: 'none', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer' }}>↻ RUN NOTEBOOK</button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 22, fontSize: 12, color: t.inkSoft }}>
            <span>📄 12 pages</span><span>·</span>
            <span>🧠 92 min reading</span><span>·</span>
            <span>⌨ 742 LOC implementation</span><span>·</span>
            <span>📓 4 notebooks</span><span>·</span>
            <span>✎ 38 margin notes</span>
          </div>
        </div>

        {/* THREE-COLUMN LAYOUT: paper / notes / impl */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', minHeight: 1100 }}>

          {/* LEFT — original paper, annotated */}
          <div style={{ borderRight: `1px solid ${t.rule}`, padding: '28px 28px', background: t.paperAlt }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <Mono theme={theme}>§ THE PAPER</Mono>
              <Mono theme={theme}>p. 4 / 12</Mono>
            </div>

            <div style={{
              background: t.paper, border: `1px solid ${t.rule}`, padding: '22px 22px',
              fontFamily: 'Newsreader, serif', fontSize: 12.5, lineHeight: 1.55,
              borderRadius: 2,
            }}>
              <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                3.2.1 Scaled Dot-Product Attention
              </div>
              <p style={{ margin: '0 0 10px' }}>
                We call our particular attention "Scaled Dot-Product Attention".
                The input consists of queries and keys of dimension <em>d<sub>k</sub></em>,
                and values of dimension <em>d<sub>v</sub></em>. We compute the dot
                products of the query with all keys, divide each by{' '}
                <span style={{ background: 'rgba(244,197,66,0.55)', padding: '0 2px' }}>√d<sub>k</sub></span>,
                and apply a softmax function to obtain the weights on the values.
              </p>
              <p style={{ margin: '0 0 10px' }}>
                In practice, we compute the attention function on a set of queries
                simultaneously, packed together into a matrix Q. The keys and values
                are also packed together into matrices K and V…
              </p>
              <div style={{ textAlign: 'center', padding: '14px 0', fontStyle: 'italic', fontSize: 14 }}>
                Attention(Q,K,V) = softmax(QKᵀ/√d<sub>k</sub>)V
              </div>
              <p style={{ margin: '0 0 10px', color: t.inkSoft }}>
                The two most commonly used attention functions are additive
                attention, and <span style={{ borderBottom: `1.5px solid ${t.accent}` }}>dot-product (multiplicative) attention</span>.
                Dot-product attention is identical to our algorithm, except for the
                scaling factor of 1/√d<sub>k</sub>…
              </p>
            </div>

            {/* highlights count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, fontSize: 11, color: t.inkMuted }}>
              <span>← p. 3 · §3.1 Encoder–Decoder</span>
              <span>p. 5 · §3.2.2 →</span>
            </div>

            {/* PDF tools */}
            <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Mono theme={theme}>TOOLS</Mono>
              {['Highlight in yellow', 'Add margin note', 'Link to our notes', 'Run a snippet from this paragraph'].map(o => (
                <div key={o} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 10px', background: t.paper, border: `1px solid ${t.rule}`, borderRadius: 3, cursor: 'pointer' }}>
                  <span>{o}</span>
                  <span style={{ color: t.inkMuted }}>→</span>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — our notes (the textbook companion) */}
          <div style={{ borderRight: `1px solid ${t.rule}`, padding: '28px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <Mono theme={theme}>§ OUR NOTES</Mono>
              <span style={{ fontSize: 11, color: t.inkMuted, fontFamily: 'JetBrains Mono' }}>linked to p. 4 ↔</span>
            </div>

            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 14.5, lineHeight: 1.65, color: t.ink }}>
              <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                The √d<sub>k</sub> isn't optional.
              </h3>
              <div style={{ fontStyle: 'italic', color: t.inkSoft, fontSize: 13, marginBottom: 14 }}>
                The paper buries this in a sentence. It's load-bearing.
              </div>
              <p style={{ margin: '0 0 12px' }}>
                The paper claims, almost in passing, that without the scaling
                factor "the softmax function" enters "regions where it has extremely
                small gradients". Read fast, and you'll think this is a footnote.
                It's the reason the architecture trains at all.
              </p>

              {/* called-out aside */}
              <div style={{ background: t.paperAlt, border: `1px dashed ${t.rule}`, padding: '14px 16px', borderRadius: 3, margin: '14px 0' }}>
                <Mono theme={theme}>NOTE 14.2.A · INTUITION</Mono>
                <div style={{ fontStyle: 'italic', marginTop: 6, fontSize: 13.5 }}>
                  Two random unit-vectors in ℝ<sup>d</sup> have an inner product
                  with variance roughly <em>d</em>. As you scale up the model, the
                  magnitude of <Mono theme={theme} size={13}>q·k</Mono> outpaces what softmax
                  can resolve. Dividing by <em>√d</em> keeps the temperature constant.
                </div>
              </div>

              <p style={{ margin: '0 0 12px', color: t.inkSoft }}>
                We derive this in <Mono theme={theme} size={13}>§14.2</Mono> of the
                textbook. The short version: assume each component of <em>q</em>{' '}
                and <em>k</em> is unit-variance. Then <em>Var(q·k) = d</em>. To
                keep softmax in a sane regime, normalize.
              </p>

              <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 19, fontWeight: 500, margin: '24px 0 8px' }}>
                Things the paper doesn't say.
              </h3>
              <ul style={{ paddingLeft: 18, margin: '8px 0', color: t.inkSoft }}>
                <li style={{ marginBottom: 6 }}>The <em>output</em> of attention is also re-projected — usually omitted in the equation.</li>
                <li style={{ marginBottom: 6 }}>The "1/√d<sub>k</sub>" can be folded into the K-projection at no cost.</li>
                <li style={{ marginBottom: 6 }}>Half-precision training breaks this if you scale <em>after</em> exp.</li>
              </ul>

              <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 19, fontWeight: 500, margin: '24px 0 8px' }}>
                Open questions.
              </h3>
              <p style={{ margin: 0, color: t.inkSoft, fontStyle: 'italic' }}>
                Why <em>√d</em> and not, say, <em>d</em><sup>0.6</sup> empirically? The
                variance argument is loose. We address this in
                {' '}<Highlight theme={theme}>Notebook 14.2.B</Highlight>.
              </p>

              {/* margin handwriting */}
              <div style={{ marginTop: 28, fontFamily: 'Caveat, cursive', fontSize: 18, color: t.inkMuted, transform: 'rotate(-1deg)', borderTop: `1px dashed ${t.ruleSoft}`, paddingTop: 14 }}>
                "you can derive the same result from a max-entropy argument — see appendix C."
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: t.inkMuted, marginTop: 4 }}>— margin note, 8 days ago</div>
              </div>
            </div>
          </div>

          {/* RIGHT — implementation */}
          <div style={{ padding: '28px 30px', background: t.paper }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <Mono theme={theme}>§ IMPLEMENTATION</Mono>
              <span style={{ fontSize: 11, color: t.inkMuted, fontFamily: 'JetBrains Mono' }}>transformer.py · 742 LOC</span>
            </div>

            {/* file tabs */}
            <div style={{ display: 'flex', gap: 4, fontFamily: 'JetBrains Mono', fontSize: 11 }}>
              {[{n:'attention.py',a:true},{n:'mha.py',a:false},{n:'tests.py',a:false}].map(f => (
                <span key={f.n} style={{
                  padding: '6px 10px',
                  background: f.a ? (theme === 'dark' ? '#0c0c10' : '#f8f5ec') : 'transparent',
                  border: f.a ? `1px solid ${t.rule}` : '1px solid transparent',
                  borderBottom: f.a ? 'none' : `1px solid ${t.rule}`,
                  color: f.a ? t.ink : t.inkMuted,
                  cursor: 'pointer'
                }}>{f.n}</span>
              ))}
              <span style={{ flex: 1, borderBottom: `1px solid ${t.rule}` }} />
            </div>

            <div style={{
              background: theme === 'dark' ? '#0c0c10' : '#f8f5ec',
              border: `1px solid ${t.rule}`, borderTop: 'none',
              padding: '16px 0',
              fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.65,
            }}>
              {[
                [' 1', <span style={{color: t.inkMuted}}># Scaled dot-product attention (paper §3.2.1)</span>],
                [' 2', <span><span style={{color:'#a06bb6'}}>import</span> torch.nn.functional <span style={{color:'#a06bb6'}}>as</span> F</span>],
                [' 3', ''],
                [' 4', <span><span style={{color:'#a06bb6'}}>def</span> <span style={{color:'#3776a8'}}>attention</span>(Q, K, V, mask=<span style={{color:'#a06bb6'}}>None</span>):</span>],
                [' 5', <span style={{color: t.inkMuted}}>    """Computes Eq. 1 of the paper."""</span>],
                [' 6', <span>    d_k = K.size(<span style={{color:'#c14a3e'}}>-1</span>)</span>],
                [' 7', '', true],  // highlighted
                [' 8', <span>    scores = Q @ K.transpose(<span style={{color:'#c14a3e'}}>-2</span>, <span style={{color:'#c14a3e'}}>-1</span>) / math.sqrt(d_k)</span>, true],
                [' 9', <span>    <span style={{color: t.inkMuted}}># ↑ paper §3.2.1 — the √d_k</span></span>, true],
                ['10', '', true],
                ['11', <span>    <span style={{color:'#a06bb6'}}>if</span> mask <span style={{color:'#a06bb6'}}>is not</span> <span style={{color:'#a06bb6'}}>None</span>:</span>],
                ['12', <span>        scores = scores.masked_fill(mask == <span style={{color:'#c14a3e'}}>0</span>, <span style={{color:'#c14a3e'}}>-1e9</span>)</span>],
                ['13', ''],
                ['14', <span>    weights = F.softmax(scores, dim=<span style={{color:'#c14a3e'}}>-1</span>)</span>],
                ['15', <span>    <span style={{color:'#a06bb6'}}>return</span> weights @ V, weights</span>],
              ].map(([n, line, hl], i) => (
                <div key={i} style={{ display: 'flex', padding: '0 16px', background: hl ? 'rgba(244,197,66,0.10)' : 'transparent' }}>
                  <span style={{ color: '#5a5a5a', width: 24, textAlign: 'right', userSelect: 'none' }}>{n as string}</span>
                  <span style={{ paddingLeft: 14, color: theme === 'dark' ? '#d4d4d4' : t.ink }}>{line as React.ReactNode}</span>
                </div>
              ))}
            </div>

            {/* run output */}
            <div style={{ marginTop: 16 }}>
              <Mono theme={theme}>OUTPUT · last run</Mono>
              <div style={{
                background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 3,
                padding: 14, fontFamily: 'JetBrains Mono', fontSize: 11.5, lineHeight: 1.7, marginTop: 6,
              }}>
                <div><span style={{ color: '#7aa86b' }}>✓</span> matches <span style={{color: t.inkMuted}}>torch.nn.functional.scaled_dot_product_attention</span></div>
                <div><span style={{ color: '#7aa86b' }}>✓</span> max abs diff: 4.2e-7</div>
                <div><span style={{ color: '#7aa86b' }}>✓</span> 12.3× slower (expected — eager, no fusion)</div>
                <div style={{ color: t.inkMuted, marginTop: 4 }}>see <span style={{ color: t.accent }}>Notebook 14.2.B</span> for the FlashAttention follow-up.</div>
              </div>
            </div>

            {/* linked artifacts */}
            <div style={{ marginTop: 22 }}>
              <Mono theme={theme}>LINKED ARTIFACTS</Mono>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { i: '📓', n: 'attention.heatmap.py', d: 'reactive notebook · 8 cells' },
                  { i: '⌨', n: 'Problem 14.2.A', d: 'implement scaled dot-product · 4 tests' },
                  { i: '📖', n: 'Textbook §14.2', d: 'Why we divide by √d_k' },
                  { i: '🧵', n: 'Discussion (38)', d: 'highlights · margin notes · errata' },
                ].map(a => (
                  <div key={a.n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 3, fontSize: 12, cursor: 'pointer' }}>
                    <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontSize: 14 }}>{a.i}</span>
                      <span>
                        <span style={{ fontWeight: 500 }}>{a.n}</span>
                        <span style={{ color: t.inkMuted, marginLeft: 10, fontSize: 11 }}>{a.d}</span>
                      </span>
                    </span>
                    <span style={{ color: t.inkMuted }}>→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
