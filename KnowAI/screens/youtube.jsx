// YouTube notes — index + player views

function YouTubeIndex({ theme = 'light' }) {
  const t = TOKENS[theme];

  const videos = [
    {
      id: 'attn', channel: '3Blue1Brown', author: 'Grant Sanderson',
      title: 'But what is a GPT? Visual intro to transformers',
      duration: '27:14', watched: 1.0, noteCount: 38, pages: 6,
      tag: 'Transformers', color: 'lavender',
      lastNote: '"the residual stream is a bus, not a tape"',
      updated: '2 days ago',
      thumbBg: '#0d1b2a',
      featured: true,
    },
    {
      id: 'bp', channel: 'Andrej Karpathy', author: 'Andrej Karpathy',
      title: 'The spelled-out intro to neural networks and backpropagation',
      duration: '2:25:52', watched: 0.78, noteCount: 64, pages: 11,
      tag: 'Fundamentals', color: 'butter',
      lastNote: '"micrograd is the whole field in 100 lines"',
      updated: '5 days ago',
      thumbBg: '#1a1a1a',
    },
    {
      id: 'diff', channel: 'Yannic Kilcher',
      title: 'Diffusion Models · Paper Walkthrough',
      duration: '54:08', watched: 1.0, noteCount: 22, pages: 4,
      tag: 'Generative', color: 'peach',
      lastNote: '"forward process: closed-form Gaussian"',
      updated: '1 week ago',
      thumbBg: '#2a1f3d',
    },
    {
      id: 'rope', channel: 'Eleuther AI',
      title: 'Rotary Position Embeddings — derivation from scratch',
      duration: '38:21', watched: 0.42, noteCount: 14, pages: 3,
      tag: 'Transformers', color: 'lilac',
      lastNote: '"complex multiplication = 2D rotation"',
      updated: '1 week ago',
      thumbBg: '#1d2940',
    },
    {
      id: 'rl', channel: 'DeepMind x UCL',
      title: 'Lecture 7: Policy Gradient & Actor-Critic',
      duration: '1:42:11', watched: 1.0, noteCount: 47, pages: 8,
      tag: 'RL', color: 'sage',
      lastNote: '"baseline reduces variance, not bias"',
      updated: '2 weeks ago',
      thumbBg: '#0f1f15',
    },
    {
      id: 'flash', channel: 'Tri Dao',
      title: 'FlashAttention — why IO matters',
      duration: '46:30', watched: 1.0, noteCount: 31, pages: 5,
      tag: 'Systems', color: 'sky',
      lastNote: '"recompute > store; SRAM > HBM, always"',
      updated: '3 weeks ago',
      thumbBg: '#0f1d2e',
    },
    {
      id: 'mamba', channel: 'Albert Gu',
      title: 'Mamba and the Selective State Space',
      duration: '1:08:44', watched: 0.21, noteCount: 9, pages: 2,
      tag: 'Architectures', color: 'rose',
      lastNote: '"think of S4 as a learned LTI system"',
      updated: 'a month ago',
      thumbBg: '#2d1421',
    },
    {
      id: 'bertology', channel: 'Anthropic Interpretability',
      title: 'Mechanistic Interpretability — induction heads',
      duration: '1:14:02', watched: 1.0, noteCount: 53, pages: 9,
      tag: 'Interp', color: 'coral',
      lastNote: '"the same circuit shows up everywhere"',
      updated: 'a month ago',
      thumbBg: '#3a1d12',
    },
    {
      id: 'cnn', channel: 'Stanford CS231n',
      title: 'Lecture 5: Convolutional Neural Networks',
      duration: '1:14:00', watched: 1.0, noteCount: 41, pages: 7,
      tag: 'Vision', color: 'mint',
      lastNote: '"a conv is a matmul wearing a costume"',
      updated: '2 months ago',
      thumbBg: '#0e2114',
    },
  ];

  const featured = videos.find(v => v.featured) || videos[0];
  const rest = videos.filter(v => v.id !== featured.id);

  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} active="writing" />

      {/* hero */}
      <div style={{ padding: '60px 80px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <Mono theme={theme}>§ WATCH-NOTES · 24 VIDEOS · 412 NOTES</Mono>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 64, fontWeight: 400, margin: '14px 0 0', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
              Watch the lecture.<br/>Read <Highlight theme={theme}><em>my</em> notes.</Highlight>
            </h1>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: t.inkSoft, marginTop: 18, fontWeight: 300, maxWidth: 600, lineHeight: 1.5 }}>
              A working library of YouTube lectures I've already taken notes on —
              so you can <em>watch</em> instead of scribble. Pre-written notes
              alongside the video, downloadable as PDF.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            {[
              { k: 'videos', v: '24' },
              { k: 'pages of notes', v: '146' },
              { k: 'pdf downloads', v: '3.2k' },
            ].map(s => (
              <div key={s.k} style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, padding: '14px 18px', borderRadius: 3, minWidth: 100 }}>
                <Mono theme={theme}>{s.k}</Mono>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 26, fontWeight: 500, marginTop: 4 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* filter row */}
      <div style={{ padding: '14px 80px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${t.rule}` }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['All', 'Transformers', 'Fundamentals', 'Generative', 'RL', 'Systems', 'Vision', 'Interp'].map((d, i) => (
            <span key={d} style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              background: i === 0 ? t.ink : 'transparent', color: i === 0 ? t.paper : t.inkSoft,
              border: `1px solid ${i === 0 ? t.ink : t.rule}`,
            }}>{d}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: t.inkSoft, alignItems: 'center' }}>
          <span>sort: <span style={{ color: t.ink, fontWeight: 500 }}>recently noted</span> ▾</span>
          <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center', padding: '4px 10px', border: `1px solid ${t.rule}`, borderRadius: 2 }}>
            <span style={{ color: t.inkMuted }}>⌕</span>
            <span style={{ color: t.inkMuted }}>search transcripts…</span>
          </span>
        </div>
      </div>

      {/* featured */}
      <div style={{ padding: '32px 80px' }}>
        <Mono theme={theme}>§ FEATURED · MOST RE-READ</Mono>
        <div style={{
          marginTop: 12,
          background: TOKENS.pastels[featured.color].bg,
          color: TOKENS.pastels[featured.color].text,
          borderRadius: 6, padding: 32,
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 36, alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* faux player thumbnail */}
          <div style={{
            background: featured.thumbBg, color: '#fff', borderRadius: 4, padding: 0,
            aspectRatio: '16 / 9', position: 'relative', overflow: 'hidden',
            boxShadow: '0 14px 36px -14px rgba(0,0,0,0.45)',
          }}>
            {/* abstract content */}
            <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="featGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#1d3050"/>
                  <stop offset="1" stopColor="#0d1b2a"/>
                </linearGradient>
              </defs>
              <rect width="320" height="180" fill="url(#featGrad)"/>
              {/* attention heads */}
              {Array.from({length: 6}).map((_, i) => (
                <g key={i} transform={`translate(${40 + i*40}, 40)`}>
                  {Array.from({length: 5}).map((_, j) => (
                    <rect key={j} x="0" y={j*5} width="24" height="3" fill={`rgba(244,197,66,${0.2 + (i*j)%5*0.15})`}/>
                  ))}
                </g>
              ))}
              <text x="160" y="138" fontFamily="Newsreader, serif" fontSize="22" fill="#f1efe7" textAnchor="middle">visual intro to transformers</text>
              <text x="160" y="160" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#86857f" textAnchor="middle" letterSpacing="2">3BLUE1BROWN · 27:14</text>
            </svg>
            {/* play button */}
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: 76, height: 76, borderRadius: 999,
                background: 'rgba(244,197,66,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
              }}>
                <div style={{ width: 0, height: 0, borderLeft: '22px solid #0e0e10', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: 5 }}/>
              </div>
            </div>
            {/* yt-style timestamp */}
            <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.85)', color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 11, padding: '2px 6px', borderRadius: 2 }}>
              {featured.duration}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
              <Mono theme="light"><span style={{ color: TOKENS.pastels[featured.color].text, opacity: 0.7 }}>{featured.channel}</span></Mono>
              <span style={{ background: 'rgba(0,0,0,0.15)', padding: '3px 9px', borderRadius: 999, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>{featured.tag}</span>
            </div>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 36, fontWeight: 500, margin: 0, lineHeight: 1.1, letterSpacing: '-0.015em' }}>
              {featured.title}
            </h2>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 16, fontStyle: 'italic', marginTop: 12, opacity: 0.85, maxWidth: 460 }}>
              {featured.lastNote}
            </p>
            <div style={{ display: 'flex', gap: 22, marginTop: 22, fontSize: 12, opacity: 0.85, fontFamily: 'JetBrains Mono' }}>
              <span>▶ {featured.duration}</span>
              <span>✎ {featured.noteCount} notes</span>
              <span>📄 {featured.pages} pages</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, alignItems: 'center' }}>
              <button style={{ background: TOKENS.pastels[featured.color].text, color: TOKENS.pastels[featured.color].bg, border: 'none', padding: '11px 18px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em' }}>OPEN ↗</button>
              <button style={{ background: 'transparent', color: TOKENS.pastels[featured.color].text, border: `1px solid ${TOKENS.pastels[featured.color].text}`, padding: '10px 16px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em' }}>↓ PDF</button>
            </div>
          </div>
        </div>
      </div>

      {/* the library */}
      <div style={{ padding: '0 80px 64px' }}>
        <Mono theme={theme}>§ THE LIBRARY</Mono>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 14 }}>
          {rest.map(v => {
            const pal = TOKENS.pastels[v.color];
            return (
              <div key={v.id} style={{
                background: t.paper, border: `1px solid ${t.rule}`, borderRadius: 4,
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
              }}>
                {/* thumbnail */}
                <div style={{
                  background: v.thumbBg,
                  aspectRatio: '16 / 9', position: 'relative',
                  borderBottom: `1px solid ${t.rule}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* abstract subject motif */}
                  <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0 }}>
                    {v.tag === 'Transformers' && (
                      <>
                        {Array.from({length: 8}).map((_, i) => Array.from({length: 8}).map((_, j) => (
                          <rect key={`${i}-${j}`} x={80 + i*16} y={30 + j*12} width="14" height="10" fill={`rgba(244,197,66,${0.1 + ((i*j)%6)*0.12})`}/>
                        )))}
                      </>
                    )}
                    {v.tag === 'Fundamentals' && (
                      <>
                        <circle cx="80" cy="90" r="6" fill="#f4c542"/>
                        <circle cx="160" cy="60" r="6" fill="#f4c542"/>
                        <circle cx="160" cy="120" r="6" fill="#f4c542"/>
                        <circle cx="240" cy="90" r="6" fill="#f4c542"/>
                        <line x1="80" y1="90" x2="160" y2="60" stroke="#86857f" strokeWidth="1"/>
                        <line x1="80" y1="90" x2="160" y2="120" stroke="#86857f" strokeWidth="1"/>
                        <line x1="160" y1="60" x2="240" y2="90" stroke="#86857f" strokeWidth="1"/>
                        <line x1="160" y1="120" x2="240" y2="90" stroke="#86857f" strokeWidth="1"/>
                      </>
                    )}
                    {v.tag === 'Generative' && (
                      <>
                        {Array.from({length: 5}).map((_, i) => (
                          <circle key={i} cx={50 + i*55} cy="90" r={30 - i*5} stroke="#f4c542" strokeWidth="1.5" fill="none" opacity={1 - i*0.18}/>
                        ))}
                      </>
                    )}
                    {v.tag === 'RL' && (
                      <>
                        <rect x="60" y="60" width="60" height="60" stroke="#f4c542" strokeWidth="1.5" fill="none"/>
                        <rect x="200" y="60" width="60" height="60" stroke="#86857f" strokeWidth="1.5" fill="none"/>
                        <path d="M120 90 L200 90" stroke="#f4c542" strokeWidth="1.5"/>
                        <path d="M195 85 L200 90 L195 95" stroke="#f4c542" strokeWidth="1.5" fill="none"/>
                        <path d="M200 60 Q160 30 120 60" stroke="#86857f" strokeWidth="1" strokeDasharray="3 3" fill="none"/>
                      </>
                    )}
                    {v.tag === 'Systems' && (
                      <>
                        {Array.from({length: 6}).map((_, i) => (
                          <rect key={i} x={50 + i*40} y="50" width="32" height="80" stroke="#f4c542" strokeWidth="1.2" fill="none"/>
                        ))}
                      </>
                    )}
                    {v.tag === 'Vision' && (
                      <>
                        {Array.from({length: 4}).map((_, i) => (
                          <rect key={i} x={70 + i*38} y={50 + i*8} width="80" height="60" stroke="#f4c542" strokeWidth="1.2" fill="none" opacity={1 - i*0.18}/>
                        ))}
                      </>
                    )}
                    {v.tag === 'Interp' && (
                      <>
                        {Array.from({length: 12}).map((_, i) => (
                          <line key={i} x1={50 + i*20} y1={40} x2={50 + i*20} y2={140} stroke="#f4c542" strokeWidth="1" opacity={Math.random() * 0.7 + 0.2}/>
                        ))}
                      </>
                    )}
                    {v.tag === 'Architectures' && (
                      <>
                        <path d="M40 90 Q 80 40, 120 90 T 200 90 T 280 90" stroke="#f4c542" strokeWidth="1.8" fill="none"/>
                        <path d="M40 90 Q 80 140, 120 90 T 200 90 T 280 90" stroke="#86857f" strokeWidth="1" fill="none"/>
                      </>
                    )}
                  </svg>

                  {/* play overlay */}
                  <div style={{
                    width: 48, height: 48, borderRadius: 999,
                    background: 'rgba(244,197,66,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                  }}>
                    <div style={{ width: 0, height: 0, borderLeft: '13px solid #0e0e10', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', marginLeft: 3 }}/>
                  </div>

                  {/* duration badge */}
                  <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)', color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '2px 5px', borderRadius: 2 }}>
                    {v.duration}
                  </div>
                  {/* progress bar */}
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'rgba(255,255,255,0.15)' }}>
                    <div style={{ width: `${v.watched * 100}%`, height: '100%', background: '#f4c542' }}/>
                  </div>
                  {/* note bookmark — corner ribbon */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    background: pal.bg, color: pal.text,
                    padding: '4px 9px', fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
                  }}>
                    ✎ {v.noteCount}
                  </div>
                </div>

                {/* meta */}
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: t.inkMuted, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'JetBrains Mono', letterSpacing: '0.04em' }}>{v.channel.toUpperCase()}</span>
                    <Tag theme={theme}>{v.tag}</Tag>
                  </div>
                  <div style={{ fontFamily: 'Newsreader, serif', fontSize: 18, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.005em' }}>
                    {v.title}
                  </div>
                  <p style={{ fontFamily: 'Newsreader, serif', fontSize: 13, fontStyle: 'italic', color: t.inkSoft, margin: '10px 0 0', lineHeight: 1.5 }}>
                    {v.lastNote}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px dashed ${t.ruleSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: t.inkMuted, fontFamily: 'JetBrains Mono' }}>
                    <span>{v.pages} p · {v.updated}</span>
                    <span style={{ display: 'inline-flex', gap: 8 }}>
                      <span>↓ PDF</span>
                      <span style={{ color: t.ink, fontWeight: 600 }}>OPEN →</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* footer note */}
        <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px dashed ${t.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <Mono theme={theme}>§ ABOUT THESE NOTES</Mono>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 17, fontStyle: 'italic', color: t.inkSoft, marginTop: 8, maxWidth: 580, lineHeight: 1.5 }}>
              Each video has been watched at least three times. The notes are
              what I wrote down on the third pass — when I finally understood what
              the lecturer was actually saying.
            </div>
          </div>
          <span style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: t.inkMuted, transform: 'rotate(-2deg)', display: 'inline-block' }}>
            ✎ — sai
          </span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Single video reader — player on left, prewritten notes on right
// ─────────────────────────────────────────────────────────────
function YouTubeReader({ theme = 'light' }) {
  const t = TOKENS[theme];
  const pal = TOKENS.pastels.lavender;

  // Notes structured as anchored sections — each tied to a video timestamp
  const sections = [
    {
      ts: '0:00', label: '§ 1 · The setup',
      heading: 'A transformer is a function that re-mixes vectors.',
      body: (
        <>
          <p>
            Forget the diagrams. The simplest mental model: you start with a sequence
            of vectors, and at each layer the model produces a <em>new</em> sequence
            of vectors of the same shape — each one a re-mix of the others.
          </p>
          <p>
            That's it. Everything else — attention, MLPs, residual streams — is
            machinery for deciding <em>how</em> the re-mix happens.
          </p>
        </>
      ),
    },
    {
      ts: '4:32', label: '§ 2 · Embeddings',
      heading: 'Tokens get coordinates.',
      body: (
        <>
          <p>
            The first thing the model does is look up each token in a table and turn it
            into a 12,288-dim vector (for GPT-3). The geometry of that space is where the
            model stores meaning.
          </p>
          <div style={{ background: t.paperAlt, border: `1px dashed ${t.rule}`, padding: '12px 14px', borderRadius: 3, margin: '10px 0', fontFamily: 'Newsreader, serif', fontSize: 14 }}>
            <Mono theme={theme}>NOTE · INTUITION</Mono>
            <div style={{ fontStyle: 'italic', marginTop: 4 }}>
              "king − man + woman ≈ queen" works because directions in this space
              encode <em>relationships</em>, not just identities.
            </div>
          </div>
        </>
      ),
    },
    {
      ts: '11:08', label: '§ 3 · Attention',
      heading: 'Each token asks every other token a question.',
      body: (
        <>
          <p>
            Every token produces a query vector (Q), a key vector (K), and a value
            vector (V). The attention score is just <Mono theme={theme} size={13}>Q · K</Mono> —
            "how relevant is your key to my question?"
          </p>
          <p>
            Softmax those scores across the row, weight V by them, sum. The token's
            new representation is "what it asked for, fetched from everyone who had it."
          </p>
        </>
      ),
    },
    {
      ts: '17:42', label: '§ 4 · Residual stream',
      heading: 'The bus, not the tape.',
      body: (
        <>
          <p style={{ background: 'rgba(244,197,66,0.25)', padding: '4px 6px', borderRadius: 2 }}>
            <em>The thing that finally clicked for me on this rewatch:</em> the residual
            stream is not data flowing through layers. It's a <em>shared bus</em> that every
            attention head and MLP reads from and writes to.
          </p>
          <p>
            Each layer's job is to <em>add</em> something useful to the bus, not transform it
            wholesale. This is why ablating individual heads barely hurts: most heads
            are redundant noise on the bus.
          </p>
        </>
      ),
    },
    {
      ts: '22:15', label: '§ 5 · Unembedding',
      heading: 'Read the bus at the last position.',
      body: (
        <>
          <p>
            To predict the next token, the model takes the residual stream at the
            <em> last</em> position, multiplies by the unembedding matrix, and softmaxes
            the result over the vocabulary.
          </p>
          <p>
            Critical detail Grant skips: the unembedding matrix is often <em>tied</em> to
            the embedding matrix (they're the same weights). It's not just "decoder"
            and "encoder" — it's one geometry, used twice.
          </p>
        </>
      ),
    },
  ];

  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} active="writing" />

      {/* header / breadcrumb + title */}
      <div style={{ padding: '32px 80px 24px', borderBottom: `1px solid ${t.rule}` }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, fontSize: 12, color: t.inkSoft }}>
          <Mono theme={theme}>WATCH-NOTES</Mono><span>›</span>
          <span>Transformers</span><span>›</span>
          <span style={{ color: t.ink, fontWeight: 500 }}>3Blue1Brown · Visual intro to GPT</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'end' }}>
          <div>
            <Mono theme={theme}>27:14 · 3BLUE1BROWN · 38 NOTES · 6 PAGES · WATCHED 3×</Mono>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 46, fontWeight: 400, margin: '8px 0 0', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              But what is a GPT? <em>Visual intro to transformers.</em>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <Tag theme={theme}>Transformers</Tag>
            <Tag theme={theme}>Visual</Tag>
            <Tag theme={theme} accent>✓ complete</Tag>
            <button style={{ background: t.ink, color: t.paper, padding: '8px 14px', border: 'none', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.08em' }}>↓ DOWNLOAD PDF</button>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN: sticky player / scrolling notes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: 1500 }}>

        {/* LEFT — player + transcript (sticky) */}
        <div style={{ borderRight: `1px solid ${t.rule}`, background: t.paperAlt, padding: '28px 32px', position: 'relative' }}>
          <div style={{ position: 'sticky', top: 24 }}>
            {/* video player */}
            <div style={{
              background: '#0d1b2a', borderRadius: 4, overflow: 'hidden',
              aspectRatio: '16 / 9', position: 'relative',
              boxShadow: theme === 'dark' ? '0 14px 36px -14px rgba(0,0,0,0.7)' : '0 14px 36px -14px rgba(0,0,0,0.45)',
            }}>
              <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: 'block' }}>
                <defs>
                  <linearGradient id="rGrad" x1="0" x2="1">
                    <stop offset="0" stopColor="#1d3050"/>
                    <stop offset="1" stopColor="#0d1b2a"/>
                  </linearGradient>
                </defs>
                <rect width="320" height="180" fill="url(#rGrad)"/>
                {Array.from({length: 6}).map((_, i) => (
                  <g key={i} transform={`translate(${30 + i*45}, 32)`}>
                    {Array.from({length: 6}).map((_, j) => (
                      <rect key={j} x="0" y={j*5} width="28" height="3" fill={`rgba(244,197,66,${0.15 + (i*j)%5*0.16})`}/>
                    ))}
                  </g>
                ))}
                <text x="160" y="138" fontFamily="Newsreader, serif" fontSize="20" fill="#f1efe7" textAnchor="middle" fontStyle="italic">attention is just a weighted average</text>
              </svg>

              {/* control overlay */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 70, height: 70, borderRadius: 999, background: 'rgba(244,197,66,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.5)' }}>
                  <div style={{ width: 0, height: 0, borderLeft: '20px solid #0e0e10', borderTop: '12px solid transparent', borderBottom: '12px solid transparent', marginLeft: 5 }}/>
                </div>
              </div>

              {/* progress bar */}
              <div style={{ position: 'absolute', left: 14, right: 14, bottom: 28, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                <div style={{ width: '42%', height: '100%', background: '#f4c542', borderRadius: 2, position: 'relative' }}>
                  <div style={{ position: 'absolute', right: -6, top: -3, width: 10, height: 10, borderRadius: 999, background: '#f4c542', boxShadow: '0 0 0 3px rgba(244,197,66,0.3)' }}/>
                </div>
                {/* note pin markers */}
                {[10, 22, 41, 65, 82].map((pct) => (
                  <div key={pct} style={{ position: 'absolute', left: `${pct}%`, top: -4, width: 2, height: 12, background: t.ink, borderRadius: 1, opacity: 0.7 }}/>
                ))}
              </div>

              {/* transport */}
              <div style={{ position: 'absolute', left: 14, right: 14, bottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f1efe7', fontFamily: 'JetBrains Mono', fontSize: 11 }}>
                <span style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
                  <span>▶</span>
                  <span>11:24 / 27:14</span>
                </span>
                <span style={{ display: 'inline-flex', gap: 12, alignItems: 'center', opacity: 0.7 }}>
                  <span>cc</span>
                  <span>1×</span>
                  <span>⛶</span>
                </span>
              </div>
            </div>

            {/* under-player meta */}
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: t.inkMuted, letterSpacing: '0.04em' }}>3BLUE1BROWN · YOUTUBE.COM</div>
                <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 14, color: t.inkSoft, marginTop: 4 }}>
                  Grant Sanderson · uploaded April 1, 2024
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ background: t.paper, color: t.ink, border: `1px solid ${t.rule}`, padding: '7px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>↑ AT 11:24</button>
                <button style={{ background: t.paper, color: t.ink, border: `1px solid ${t.rule}`, padding: '7px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>↗ ON YT</button>
              </div>
            </div>

            {/* chapter list */}
            <div style={{ marginTop: 24 }}>
              <Mono theme={theme}>CHAPTERS · CLICK TO JUMP</Mono>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}>
                {sections.map((s, i) => {
                  const active = i === 2;
                  return (
                    <div key={s.ts} style={{
                      display: 'grid', gridTemplateColumns: '54px 1fr',
                      padding: '8px 12px', borderRadius: 3,
                      background: active ? (theme === 'dark' ? '#22222a' : '#f0ebd9') : 'transparent',
                      borderLeft: `2px solid ${active ? t.accent : 'transparent'}`,
                      fontSize: 13,
                    }}>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: active ? t.ink : t.inkMuted, fontWeight: active ? 600 : 400 }}>
                        {s.ts}
                      </span>
                      <span style={{ color: active ? t.ink : t.inkSoft, fontWeight: active ? 500 : 400 }}>
                        {s.heading.length > 44 ? s.heading.slice(0, 44) + '…' : s.heading}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* footer card with download */}
            <div style={{
              marginTop: 26, padding: 16,
              background: pal.bg, color: pal.text, borderRadius: 4,
            }}>
              <Mono theme="light"><span style={{ color: pal.text, opacity: 0.7 }}>NOTES · 6 PAGES · 38 ANNOTATIONS</span></Mono>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 17, fontWeight: 500, marginTop: 4, lineHeight: 1.25 }}>
                Read offline. Print it. Mark it up.
              </div>
              <button style={{ background: pal.text, color: pal.bg, border: 'none', padding: '9px 14px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', marginTop: 12 }}>
                ↓ DOWNLOAD PDF · 1.2 MB
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — pre-written notes, scrolling */}
        <div style={{ padding: '32px 56px 56px', maxWidth: 720 }}>
          {/* note paper masthead */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${t.ink}`, paddingBottom: 8, marginBottom: 20 }}>
            <Mono theme={theme}>§ NOTES · 3RD VIEWING · MAR 2026</Mono>
            <Mono theme={theme}>p. 1 / 6</Mono>
          </div>

          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 16.5, lineHeight: 1.7, color: t.ink }}>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.015em' }}>
              On watching this <em>three times.</em>
            </h2>
            <p style={{ color: t.inkSoft, fontSize: 15, fontStyle: 'italic', margin: '0 0 24px' }}>
              The first time I watched this, I thought I understood it. I didn't.
              The second time taught me what I'd missed. These are the notes from
              the third pass — when the architecture finally felt simple.
            </p>

            {sections.map((s, i) => (
              <div key={s.ts} style={{ marginBottom: 36, scrollMarginTop: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <Mono theme={theme}>{s.label}</Mono>
                  <span style={{
                    fontFamily: 'JetBrains Mono', fontSize: 11,
                    background: t.accent, color: t.accentInk,
                    padding: '2px 7px', borderRadius: 2, fontWeight: 600,
                  }}>▶ {s.ts}</span>
                </div>
                <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500, margin: '0 0 12px', letterSpacing: '-0.01em', color: t.ink }}>
                  {s.heading}
                </h3>
                <div style={{ color: t.inkSoft }}>{s.body}</div>
              </div>
            ))}

            {/* margin note at the end */}
            <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px dashed ${t.rule}`, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: t.inkSoft, transform: 'rotate(-1deg)', flex: 1 }}>
                if you only remember one thing — the residual stream is the thing
                that matters. heads come and go. the bus stays.
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: t.inkMuted, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                ✎ 27:14 · end
              </div>
            </div>

            {/* paper footer */}
            <div style={{ marginTop: 56, paddingTop: 18, borderTop: `1px solid ${t.rule}`, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.inkMuted, fontFamily: 'JetBrains Mono', letterSpacing: '0.04em' }}>
              <span>KNOWAI · WATCH-NOTES</span>
              <span>3B1B / GPT · MAR 2026</span>
              <span>p. 6 / 6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.YouTubeIndex = YouTubeIndex;
window.YouTubeReader = YouTubeReader;
