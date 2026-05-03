// Landing page — expanded from the reference

function Landing({ theme = 'light' }) {
  const t = TOKENS[theme];

  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} />

      {/* HERO */}
      <div style={{ padding: '90px 80px 60px', textAlign: 'center', position: 'relative' }}>
        {/* tiny chapter mark */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 28, alignItems: 'center' }}>
          <div style={{ width: 28, height: 1, background: t.rule }} />
          <Mono theme={theme}>CH. 00 — INTRODUCTION</Mono>
          <div style={{ width: 28, height: 1, background: t.rule }} />
        </div>

        <h1 style={{
          fontFamily: 'Newsreader, serif',
          fontWeight: 400,
          fontSize: 76,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          margin: 0,
          color: t.ink,
        }}>
          AI/ML, <Highlight strike theme={theme}>understood</Highlight><br/>
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>from within.</em>
        </h1>

        <p style={{
          fontFamily: 'Newsreader, serif',
          fontSize: 19, lineHeight: 1.5, color: t.inkSoft,
          maxWidth: 560, margin: '28px auto 0', fontWeight: 300,
        }}>
          Not tutorials. Not summaries. Deep technical writing where prose and code
          are the same document, and <em>everything runs</em>.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 36 }}>
          <button style={{
            background: t.ink, color: t.paper, border: 'none',
            padding: '13px 22px', borderRadius: 2, fontWeight: 600, fontSize: 12,
            letterSpacing: '0.1em', cursor: 'pointer'
          }}>START READING →</button>
          <button style={{
            background: 'transparent', color: t.ink, border: `1px solid ${t.ink}`,
            padding: '13px 22px', borderRadius: 2, fontWeight: 600, fontSize: 12,
            letterSpacing: '0.1em', cursor: 'pointer'
          }}>VIEW SYLLABUS</button>
        </div>

        {/* margin handwriting note */}
        <div style={{
          position: 'absolute', right: 110, top: 180,
          fontFamily: 'Caveat, cursive', fontSize: 22, color: t.inkMuted,
          transform: 'rotate(-6deg)', maxWidth: 160, textAlign: 'left',
        }}>
          ← we redacted "understood" because<br/>nobody really has, yet.
          <svg width="80" height="40" viewBox="0 0 80 40" style={{ display: 'block', marginTop: 4 }}>
            <path d="M70 8 Q 30 18 6 32" stroke={t.inkMuted} strokeWidth="1" fill="none"/>
            <path d="M12 28 L 6 32 L 12 36" stroke={t.inkMuted} strokeWidth="1" fill="none"/>
          </svg>
        </div>
      </div>

      {/* THIN STAT STRIP */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: `1px solid ${t.rule}`, borderBottom: `1px solid ${t.rule}`,
        margin: '0 80px',
      }}>
        {[
          ['142', 'chapters published'],
          ['3,400+', 'interactive problems'],
          ['11', 'reactive notebooks'],
          ['Triton, JAX, PyTorch', 'runtimes embedded'],
        ].map(([n, l], i, arr) => (
          <div key={l} style={{
            padding: '22px 24px',
            borderRight: i < arr.length - 1 ? `1px solid ${t.rule}` : 'none',
          }}>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, lineHeight: 1, marginBottom: 6 }}>{n}</div>
            <Mono theme={theme}>{l}</Mono>
          </div>
        ))}
      </div>

      {/* FEATURED CHAPTERS GRID */}
      <div style={{ padding: '64px 80px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
          <div>
            <Mono theme={theme}>§ FEATURED · 2024</Mono>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 32, fontWeight: 500, margin: '8px 0 0', letterSpacing: '-0.01em' }}>
              Chapters in the wild
            </h2>
          </div>
          <span style={{ color: t.inkSoft, fontSize: 13 }}>view all 142 →</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
          <CategoryCard theme={theme} year="2024" title="Machine Learning" tags={['Fundamentals', 'Math', 'Algorithms']} color="mint" icon={Icons.brain(TOKENS.pastels.mint.text)} size="lg" />
          <CategoryCard theme={theme} year="2024" title="Natural Language Processing" tags={['Transformers', 'LLMs', 'Tokenization']} color="lavender" icon={Icons.chat(TOKENS.pastels.lavender.text)} size="lg" />
          <CategoryCard theme={theme} year="2024" title="Computer Vision" tags={['CNNs', 'Diffusion', 'ViT']} color="peach" icon={Icons.eye(TOKENS.pastels.peach.text)} size="lg" />
          <CategoryCard theme={theme} year="2024" title="Reinforcement Learning" tags={['PPO', 'Q-Learning', 'Robotics']} color="lilac" icon={Icons.flow(TOKENS.pastels.lilac.text)} size="lg" />
        </div>
      </div>

      {/* THE LOOP — the platform's pedagogical philosophy */}
      <div style={{ padding: '40px 80px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 64, alignItems: 'start' }}>
          <div>
            <Mono theme={theme}>§ THE LOOP</Mono>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 38, fontWeight: 500, margin: '10px 0 18px', lineHeight: 1.1, letterSpacing: '-0.015em' }}>
              Read. Implement. <em>Verify.</em>
            </h2>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 17, lineHeight: 1.6, color: t.inkSoft, fontWeight: 300 }}>
              Every chapter ends in a problem set. Every formula has a runnable
              cell beside it. You don't finish a section by reading it — you
              finish it by <Highlight theme={theme}>passing its tests</Highlight>.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { n: '01', t: 'Read', d: 'Mini-textbook with formulas, diagrams, and intuition built first.', glyph: '✎' },
              { n: '02', t: 'Implement', d: 'In-browser editor. Submit. Tests run. Real feedback, not toy data.', glyph: '⌨' },
              { n: '03', t: 'Explore', d: 'Marimo notebooks. Pull a slider, watch the network learn.', glyph: '◐' },
            ].map(s => (
              <div key={s.n} style={{ background: t.paperAlt, padding: 18, borderRadius: 4, border: `1px solid ${t.ruleSoft}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                  <Mono theme={theme}>{s.n}</Mono>
                  <span style={{ color: t.accent, fontSize: 18 }}>{s.glyph}</span>
                </div>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 20, fontWeight: 500, marginBottom: 6 }}>{s.t}</div>
                <div style={{ fontSize: 12.5, lineHeight: 1.5, color: t.inkSoft }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PATHS — Foundations / Implementation / Advanced */}
      <div style={{ background: t.paperAlt, padding: '56px 80px', borderTop: `1px solid ${t.rule}`, borderBottom: `1px solid ${t.rule}` }}>
        <Mono theme={theme}>§ LEARNING PATHS</Mono>
        <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 32, fontWeight: 500, margin: '8px 0 28px', letterSpacing: '-0.01em' }}>
          From <em>aⱼ = σ(Σwᵢxᵢ)</em> to custom GPU kernels.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {[
            { tier: 'I', name: 'Foundations', desc: 'The math you skipped. Now with diagrams.', count: '38 chapters · 9 weeks',
              chapters: ['Linear Algebra', 'Probability & Information', 'Calculus for Optimization', 'Classical ML'], color: 'sage' },
            { tier: 'II', name: 'Implementation', desc: 'Build a transformer. From scratch. No PyTorch.', count: '54 chapters · 14 weeks',
              chapters: ['Backprop by Hand', 'CNNs from Conv2d up', 'Attention & Transformers', 'Diffusion Models'], color: 'butter' },
            { tier: 'III', name: 'Advanced Systems', desc: 'When the bottleneck is silicon, not algebra.', count: '50 chapters · ongoing',
              chapters: ['CUDA Mental Model', 'Triton Kernels', 'Mixed-Precision Training', 'Distributed Training'], color: 'sky' },
          ].map(p => {
            const pal = TOKENS.pastels[p.color];
            return (
              <div key={p.tier} style={{
                background: t.paper, borderRadius: 4, overflow: 'hidden',
                border: `1px solid ${t.rule}`,
              }}>
                <div style={{ background: pal.bg, padding: '18px 20px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: pal.text }}>
                    <Mono theme={theme}><span style={{ color: pal.text, opacity: 0.7 }}>TIER {p.tier}</span></Mono>
                    <Mono theme={theme}><span style={{ color: pal.text, opacity: 0.7 }}>{p.count}</span></Mono>
                  </div>
                  <div style={{ fontFamily: 'Newsreader, serif', fontSize: 26, fontWeight: 600, color: pal.text, marginTop: 8, lineHeight: 1.1 }}>
                    {p.name}
                  </div>
                  <div style={{ fontFamily: 'Newsreader, serif', fontSize: 15, color: pal.text, opacity: 0.85, marginTop: 4, fontStyle: 'italic' }}>
                    {p.desc}
                  </div>
                </div>
                <div style={{ padding: '14px 20px' }}>
                  {p.chapters.map((c, i) => (
                    <div key={c} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '8px 0', borderBottom: i < p.chapters.length - 1 ? `1px dashed ${t.ruleSoft}` : 'none',
                      fontSize: 13,
                    }}>
                      <span style={{ display: 'flex', gap: 10 }}>
                        <Mono theme={theme}>{String(i+1).padStart(2,'0')}</Mono>
                        <span>{c}</span>
                      </span>
                      <span style={{ color: t.inkMuted, fontSize: 11 }}>→</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SAMPLE PROSE — show what reading actually looks like */}
      <div style={{ padding: '64px 80px' }}>
        <Mono theme={theme}>§ A PAGE FROM CH. 14 — ATTENTION</Mono>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, marginTop: 18, alignItems: 'start' }}>
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 17, lineHeight: 1.7, color: t.ink }}>
            <p style={{ margin: '0 0 16px' }}>
              Attention is a <em>soft dictionary lookup</em>. Given a query <Mono theme={theme} size={14}>q</Mono>,
              we ask: <em>which keys</em> in our memory does it most resemble? We score
              every key, normalize, and return a weighted blend of the corresponding values.
            </p>
            <p style={{ margin: '0 0 16px', color: t.inkSoft }}>
              The scoring function is the dot product <Mono theme={theme} size={14}>q·kᵢ</Mono>,
              scaled by <Mono theme={theme} size={14}>√dₖ</Mono> to keep gradients
              well-conditioned at high dimensions — a detail that, ignored, will
              quietly ruin your training run.
            </p>
            <div style={{
              borderLeft: `3px solid ${t.accent}`,
              padding: '6px 0 6px 18px',
              fontFamily: 'Newsreader, serif', fontStyle: 'italic',
              color: t.inkSoft, fontSize: 16,
            }}>
              "If you cannot derive the gradient of softmax on a napkin,
              you do not yet understand the transformer."
              <div style={{ fontStyle: 'normal', fontSize: 12, marginTop: 6, color: t.inkMuted }}>— Margin note, §14.3</div>
            </div>
          </div>

          {/* equation card */}
          <div style={{
            background: t.paperAlt, border: `1px solid ${t.rule}`, padding: 24, borderRadius: 4,
            position: 'relative',
          }}>
            <Mono theme={theme}>EQ. 14.2 · SCALED DOT-PRODUCT ATTENTION</Mono>
            <div style={{
              fontFamily: 'Newsreader, serif', fontSize: 28, textAlign: 'center',
              padding: '28px 8px 20px', fontStyle: 'italic',
            }}>
              Attention(Q,K,V) = softmax<span style={{ fontStyle: 'normal' }}>(</span>
              <span style={{ display: 'inline-block', verticalAlign: 'middle', textAlign: 'center', margin: '0 4px' }}>
                <span style={{ display: 'block', borderBottom: `1px solid ${t.ink}`, padding: '0 6px' }}>QKᵀ</span>
                <span style={{ display: 'block', padding: '0 6px' }}>√d<sub>k</sub></span>
              </span>
              <span style={{ fontStyle: 'normal' }}>)</span>V
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
              <Tag theme={theme}>Q ∈ ℝⁿˣᵈ</Tag>
              <Tag theme={theme}>K ∈ ℝⁿˣᵈ</Tag>
              <Tag theme={theme}>V ∈ ℝⁿˣᵈ</Tag>
              <Tag theme={theme} accent>runs in cell ↓</Tag>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIAL / SOCIAL */}
      <div style={{ padding: '0 80px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {[
            { who: 'L. Chen', role: 'PhD candidate, MIT CSAIL', q: 'Replaces three textbooks and two GitHub repos. The notebooks alone are worth the subscription.' },
            { who: 'A. Okafor', role: 'ML Engineer, Recursion', q: 'I finally understand what KV-cache actually does. The interactive memory diagram is criminal.' },
            { who: 'S. Müller', role: 'Self-taught, Berlin', q: 'I started with linear algebra and four months later I was writing Triton kernels. KnowAI made that path legible.' },
          ].map(c => (
            <div key={c.who} style={{
              background: t.paper, padding: 22,
              border: `1px solid ${t.rule}`, borderRadius: 4,
            }}>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 16, lineHeight: 1.5, fontStyle: 'italic', color: t.ink, marginBottom: 16 }}>
                "{c.q}"
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>{c.who}</span>
                <Mono theme={theme}>{c.role}</Mono>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{
        borderTop: `1px solid ${t.rule}`, padding: '36px 80px 48px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      }}>
        <div>
          <Logo theme={theme} size={20} />
          <div style={{ marginTop: 12, fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: t.inkSoft, fontSize: 14, maxWidth: 320 }}>
            A working library for people learning the math, the code,
            and the silicon underneath.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 64, fontSize: 12.5, color: t.inkSoft }}>
          {[
            ['Library', ['Writing', 'Courses', 'Problems', 'Labs']],
            ['Paths', ['Foundations', 'Implementation', 'Advanced']],
            ['About', ['Authors', 'Methodology', 'Pricing', 'Press']],
          ].map(([h, items]) => (
            <div key={h}>
              <Mono theme={theme}>{h.toUpperCase()}</Mono>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.map(i => <span key={i}>{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Landing = Landing;
