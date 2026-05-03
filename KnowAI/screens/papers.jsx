// Papers section — index + deep-dive view

function PapersIndex({ theme = 'light' }) {
  const t = TOKENS[theme];

  const papers = [
    {
      year: '2017', tag: 'NeurIPS', cite: 'Vaswani et al.',
      title: 'Attention Is All You Need',
      blurb: 'The architecture that ate the field. We rebuild it from a single matmul up — including the bits the original paper omits.',
      status: 'implemented', difficulty: 'medium',
      progress: 1.0, color: 'lavender', code: '742 LOC', readers: '12.4k',
      domain: 'NLP',
    },
    {
      year: '2020', tag: 'NeurIPS', cite: 'Ho, Jain, Abbeel',
      title: 'Denoising Diffusion Probabilistic Models',
      blurb: 'Forward noise. Reverse a network. Sample. We derive the variational bound by hand before writing the loop.',
      status: 'implemented', difficulty: 'hard',
      progress: 1.0, color: 'peach', code: '1,108 LOC', readers: '8.7k',
      domain: 'CV',
    },
    {
      year: '2022', tag: 'arXiv', cite: 'Dao et al.',
      title: 'FlashAttention: Fast and Memory-Efficient Exact Attention',
      blurb: 'Tiling. Recomputation. The IO-aware view that makes attention go brrr. We ship both a teaching kernel and the real Triton port.',
      status: 'implemented', difficulty: 'hard',
      progress: 0.78, color: 'butter', code: '914 LOC', readers: '4.3k',
      domain: 'Systems',
    },
    {
      year: '2021', tag: 'ICLR', cite: 'Hu et al.',
      title: 'LoRA: Low-Rank Adaptation of Large Language Models',
      blurb: 'Why fine-tune the whole model when a rank-8 update suffices? Twelve lines of code, three pages of theory.',
      status: 'implemented', difficulty: 'easy',
      progress: 1.0, color: 'mint', code: '224 LOC', readers: '6.1k',
      domain: 'NLP',
    },
    {
      year: '2015', tag: 'ICLR', cite: 'Kingma, Ba',
      title: 'Adam: A Method for Stochastic Optimization',
      blurb: 'Read every implementation, then read the paper. They disagree. We mediate.',
      status: 'implemented', difficulty: 'easy',
      progress: 1.0, color: 'sky', code: '186 LOC', readers: '5.5k',
      domain: 'Math',
    },
    {
      year: '2017', tag: 'arXiv', cite: 'Schulman et al.',
      title: 'Proximal Policy Optimization Algorithms',
      blurb: 'The clipped objective in three derivations: the obvious one, the wrong one, and the one the codebase actually uses.',
      status: 'implemented', difficulty: 'hard',
      progress: 1.0, color: 'sage', code: '684 LOC', readers: '3.2k',
      domain: 'RL',
    },
    {
      year: '2023', tag: 'arXiv', cite: 'Su et al.',
      title: 'RoFormer: Enhanced Transformer with Rotary Position Embedding',
      blurb: 'Position as rotation. We connect this to the complex-plane derivation that nobody writes down.',
      status: 'in-progress', difficulty: 'medium',
      progress: 0.42, color: 'lilac', code: '352 LOC', readers: '2.1k',
      domain: 'NLP',
    },
    {
      year: '2024', tag: 'ICML', cite: 'Gu, Dao',
      title: 'Mamba: Linear-Time Sequence Modeling with Selective SSMs',
      blurb: 'State-space models, selective scan, hardware-aware kernels — implemented end-to-end. Annotated in the margins.',
      status: 'in-progress', difficulty: 'hard',
      progress: 0.21, color: 'rose', code: '— LOC', readers: '1.9k',
      domain: 'NLP',
    },
    {
      year: '2014', tag: 'NeurIPS', cite: 'Goodfellow et al.',
      title: 'Generative Adversarial Networks',
      blurb: 'Where the field forked. We train the original tiny GAN, watch it fail, and then explain why.',
      status: 'implemented', difficulty: 'medium',
      progress: 1.0, color: 'coral', code: '298 LOC', readers: '4.8k',
      domain: 'CV',
    },
  ];

  const featured = papers[0];
  const rest = papers.slice(1);

  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} />

      {/* hero */}
      <div style={{ padding: '60px 80px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <Mono theme={theme}>§ PAPERS · 47 IMPLEMENTED · 6 IN PROGRESS</Mono>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 64, fontWeight: 400, margin: '14px 0 0', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
              We read papers <em>by</em><br/><Highlight theme={theme}>rewriting them.</Highlight>
            </h1>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: t.inkSoft, marginTop: 18, fontWeight: 300, maxWidth: 580, lineHeight: 1.5 }}>
              Each entry is a working re-implementation paired with a <em>line-by-line</em> reading
              of the original. The notes are what we wished someone had written
              in the margin the first time we tried.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            {[
              { k: 'tot. papers', v: '53' },
              { k: 'lines of code', v: '34k' },
              { k: 'avg. read time', v: '92m' },
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
          {['All', 'NLP', 'CV', 'RL', 'Systems', 'Math'].map((d, i) => (
            <span key={d} style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              background: i === 0 ? t.ink : 'transparent', color: i === 0 ? t.paper : t.inkSoft,
              border: `1px solid ${i === 0 ? t.ink : t.rule}`,
            }}>{d}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, fontSize: 12, color: t.inkSoft, alignItems: 'center' }}>
          <span>sort: <span style={{ color: t.ink, fontWeight: 500 }}>recently added</span> ▾</span>
          <span>view: <span style={{ color: t.ink, fontWeight: 500 }}>cards</span> ▾</span>
        </div>
      </div>

      {/* featured paper */}
      <div style={{ padding: '32px 80px' }}>
        <Mono theme={theme}>§ FEATURED · 2017</Mono>
        <div style={{
          marginTop: 12,
          background: TOKENS.pastels[featured.color].bg,
          color: TOKENS.pastels[featured.color].text,
          borderRadius: 6, padding: 32,
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 36, alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
              <Mono theme="light"><span style={{ color: TOKENS.pastels[featured.color].text, opacity: 0.7 }}>{featured.year} · {featured.tag} · {featured.cite}</span></Mono>
              <span style={{ background: 'rgba(0,0,0,0.15)', padding: '3px 9px', borderRadius: 999, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>{featured.domain}</span>
            </div>
            <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 42, fontWeight: 500, margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {featured.title}
            </h2>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 17, fontStyle: 'italic', marginTop: 14, opacity: 0.85, maxWidth: 520 }}>
              {featured.blurb}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center' }}>
              <button style={{ background: TOKENS.pastels[featured.color].text, color: TOKENS.pastels[featured.color].bg, border: 'none', padding: '11px 18px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em' }}>OPEN ↗</button>
              <span style={{ fontSize: 12, opacity: 0.7 }}>{featured.code} · ~ 92 min · {featured.readers} readers</span>
            </div>
          </div>
          {/* mock annotated page */}
          <div style={{
            background: t.paper, color: t.ink, borderRadius: 4, padding: 22,
            transform: 'rotate(1.2deg)', boxShadow: '0 12px 30px -12px rgba(0,0,0,0.25)',
            position: 'relative',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <Mono theme={theme}>arXiv:1706.03762</Mono>
              <Mono theme={theme}>p. 4</Mono>
            </div>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 13, lineHeight: 1.5, color: t.ink }}>
              <p style={{ margin: '0 0 8px' }}>
                The dot product attention is identical to our algorithm,
                except <span style={{ background: 'rgba(244,197,66,0.5)' }}>for the scaling factor of</span>{' '}
                <Mono theme={theme} size={12}>1/√d_k</Mono>. Additive attention…
              </p>
              <p style={{ margin: '0 0 8px', color: t.inkSoft }}>
                We suspect that for large values of d<sub>k</sub>, the dot products
                grow large in magnitude, pushing the softmax function into regions
                where it has extremely small gradients.
              </p>
            </div>
            <div style={{
              position: 'absolute', right: -28, top: 64, width: 130,
              fontFamily: 'Caveat, cursive', fontSize: 16, color: TOKENS.pastels[featured.color].text,
              transform: 'rotate(4deg)',
            }}>
              ← derivation in §3.2 ▶
              <svg width="80" height="20" viewBox="0 0 80 20" style={{ display: 'block' }}>
                <path d="M70 10 Q 40 16 6 10" stroke={TOKENS.pastels[featured.color].text} strokeWidth="1" fill="none"/>
                <path d="M12 6 L 6 10 L 12 14" stroke={TOKENS.pastels[featured.color].text} strokeWidth="1" fill="none"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* grid of papers */}
      <div style={{ padding: '0 80px 64px' }}>
        <Mono theme={theme}>§ THE LIBRARY</Mono>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 14 }}>
          {rest.map(p => {
            const pal = TOKENS.pastels[p.color];
            return (
              <div key={p.title} style={{
                background: t.paper, border: `1px solid ${t.rule}`, borderRadius: 4,
                padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden',
              }}>
                <div style={{ background: pal.bg, color: pal.text, padding: '14px 18px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11 }}>
                    <Mono theme="light"><span style={{ color: pal.text, opacity: 0.7 }}>{p.year} · {p.tag}</span></Mono>
                    <span style={{ background: 'rgba(0,0,0,0.15)', padding: '2px 8px', borderRadius: 999, fontSize: 10, fontWeight: 600 }}>{p.domain}</span>
                  </div>
                  <div style={{ fontFamily: 'Newsreader, serif', fontSize: 20, fontWeight: 600, lineHeight: 1.18, marginTop: 10, letterSpacing: '-0.005em' }}>
                    {p.title}
                  </div>
                  <Mono theme="light"><span style={{ color: pal.text, opacity: 0.7, fontStyle: 'italic' }}>{p.cite}</span></Mono>
                </div>
                <div style={{ padding: 18, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <p style={{ fontFamily: 'Newsreader, serif', fontSize: 13.5, lineHeight: 1.55, color: t.inkSoft, margin: 0, fontStyle: 'italic' }}>
                    "{p.blurb}"
                  </p>
                  <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                    <Tag theme={theme}>{p.difficulty}</Tag>
                    {p.status === 'implemented'
                      ? <Tag theme={theme}>✓ implemented</Tag>
                      : <Tag theme={theme} accent>in progress</Tag>}
                  </div>

                  {/* progress + meta */}
                  <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px dashed ${t.ruleSoft}` }}>
                    <div style={{ height: 3, background: t.ruleSoft, borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${p.progress * 100}%`, height: '100%', background: p.progress === 1 ? '#7aa86b' : t.accent }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: t.inkMuted, fontFamily: 'JetBrains Mono' }}>
                      <span>{p.code}</span>
                      <span>{p.readers} readers</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Single paper deep-dive — three columns: paper PDF · our notes · implementation
// ─────────────────────────────────────────────────────────────
function PaperDetail({ theme = 'light' }) {
  const t = TOKENS[theme];
  const pal = TOKENS.pastels.lavender;

  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
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
            <button style={{ background: t.ink, color: t.paper, padding: '8px 14px', border: 'none', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.08em' }}>↻ RUN NOTEBOOK</button>
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
              <div key={o} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 10px', background: t.paper, border: `1px solid ${t.rule}`, borderRadius: 3 }}>
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
                <span style={{ color: '#5a5a5a', width: 24, textAlign: 'right', userSelect: 'none' }}>{n}</span>
                <span style={{ paddingLeft: 14, color: theme === 'dark' ? '#d4d4d4' : t.ink }}>{line}</span>
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
                <div key={a.n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 3, fontSize: 12 }}>
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
  );
}

window.PapersIndex = PapersIndex;
window.PaperDetail = PaperDetail;
