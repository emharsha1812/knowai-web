// Problem-set view — Monaco-styled editor + tests + prompt

function Problem({ theme = 'light' }) {
  const t = TOKENS[theme];
  const codeBg = theme === 'dark' ? '#0d0d12' : '#1e1e1e';
  const codeText = '#d4d4d4';

  return (
    <div style={{ width: 1280, background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} active="problems" />

      {/* problem header */}
      <div style={{ padding: '20px 32px', borderBottom: `1px solid ${t.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Mono theme={theme}>PROBLEM 14.2.A · CH. 14 ATTENTION</Mono>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 26, fontWeight: 500, margin: '4px 0 0', letterSpacing: '-0.01em' }}>
            Implement scaled dot-product attention.
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: t.inkSoft }}>
          <Tag theme={theme}>numpy</Tag>
          <Tag theme={theme}>medium</Tag>
          <Tag theme={theme}>est. 18m</Tag>
          <span style={{ width: 1, height: 18, background: t.rule }} />
          <span>3 / 4 tests passing</span>
          <button style={{ background: t.ink, color: t.paper, padding: '8px 14px', border: 'none', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.08em' }}>SUBMIT</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '430px 1fr' }}>
        {/* prompt panel */}
        <aside style={{ borderRight: `1px solid ${t.rule}`, padding: '28px 28px', minHeight: 760 }}>
          {/* tabs */}
          <div style={{ display: 'flex', gap: 18, borderBottom: `1px solid ${t.rule}`, paddingBottom: 8, marginBottom: 18 }}>
            {['Description', 'Hints (2)', 'Solutions', 'Discussion'].map((tab, i) => (
              <span key={tab} style={{
                fontSize: 12, fontWeight: 500,
                color: i === 0 ? t.ink : t.inkMuted,
                borderBottom: i === 0 ? `2px solid ${t.accent}` : '2px solid transparent',
                paddingBottom: 8, marginBottom: -9,
              }}>{tab}</span>
            ))}
          </div>

          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 15, lineHeight: 1.65, color: t.ink }}>
            <p style={{ margin: '0 0 12px' }}>
              Given query, key, and value matrices <Mono theme={theme} size={13}>Q, K, V</Mono>,
              implement scaled dot-product attention as defined in §14.2.
            </p>
            <p style={{ margin: '0 0 12px', color: t.inkSoft }}>
              Your function should accept three numpy arrays of shape <Mono theme={theme} size={13}>(seq, d_k)</Mono>
              and return both the attended output and the attention weights.
            </p>

            <div style={{
              background: t.paperAlt, border: `1px solid ${t.rule}`, padding: 14, borderRadius: 3,
              fontSize: 13.5, marginTop: 16, marginBottom: 16,
            }}>
              <Mono theme={theme}>SIGNATURE</Mono>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, marginTop: 8, color: t.ink }}>
                attention(Q, K, V) → (output, weights)
              </div>
            </div>

            <Mono theme={theme}>CONSTRAINTS</Mono>
            <ul style={{ paddingLeft: 18, margin: '8px 0 16px', fontSize: 13.5, color: t.inkSoft, lineHeight: 1.6 }}>
              <li>1 ≤ seq ≤ 256</li>
              <li>d_k ∈ {'{'}32, 64, 128, 256{'}'}</li>
              <li>numpy only — no torch, no scipy</li>
              <li>Numerically stable softmax</li>
            </ul>

            <Mono theme={theme}>EXAMPLE</Mono>
            <div style={{
              background: t.paperAlt, fontFamily: 'JetBrains Mono', fontSize: 11.5,
              padding: 12, marginTop: 6, borderRadius: 3, color: t.ink,
              border: `1px solid ${t.rule}`, lineHeight: 1.6,
            }}>
              <span style={{ color: t.inkMuted }}># Q.shape = (3, 64) · K.shape = (3, 64)</span><br/>
              <span style={{ color: t.inkMuted }}># V.shape = (3, 64)</span><br/>
              out, w = attention(Q, K, V)<br/>
              <span style={{ color: t.inkMuted }}># out.shape == (3, 64)</span><br/>
              <span style={{ color: t.inkMuted }}># w.sum(axis=-1) ≈ 1</span>
            </div>
          </div>
        </aside>

        {/* editor + tests */}
        <section>
          {/* file tabs */}
          <div style={{ background: codeBg, padding: '8px 14px 0', display: 'flex', gap: 6, borderBottom: `1px solid #303030` }}>
            {[{ n: 'attention.py', active: true }, { n: 'tests.py', active: false }, { n: 'utils.py', active: false }].map(f => (
              <span key={f.n} style={{
                padding: '7px 14px',
                background: f.active ? '#1e1e1e' : 'transparent',
                color: f.active ? '#fff' : '#9a9a9a',
                fontSize: 12, fontFamily: 'JetBrains Mono',
                borderTop: f.active ? `2px solid ${t.accent}` : '2px solid transparent',
              }}>{f.n}</span>
            ))}
          </div>

          {/* monaco-style editor */}
          <div style={{ background: codeBg, color: codeText, fontFamily: 'JetBrains Mono', fontSize: 13, lineHeight: 1.55, padding: '14px 0' }}>
            {[
              [' 1', <span><span style={{color:'#569cd6'}}>import</span> numpy <span style={{color:'#569cd6'}}>as</span> np</span>],
              [' 2', ''],
              [' 3', <span><span style={{color:'#569cd6'}}>def</span> <span style={{color:'#dcdcaa'}}>attention</span>(Q, K, V):</span>],
              [' 4', <span style={{color:'#6a9955'}}>    """Scaled dot-product attention."""</span>],
              [' 5', <span>    d_k = Q.shape[<span style={{color:'#b5cea8'}}>-1</span>]</span>],
              [' 6', <span>    scores = Q <span style={{color:'#d4d4d4'}}>@</span> K.T</span>],
              [' 7', <span>    scores = scores / np.sqrt(d_k)</span>],
              [' 8', ''],
              [' 9', <span style={{color:'#6a9955'}}>    # numerically stable softmax</span>],
              ['10', <span>    scores = scores - scores.max(axis=<span style={{color:'#b5cea8'}}>-1</span>, keepdims=<span style={{color:'#569cd6'}}>True</span>)</span>],
              ['11', <span>    weights = np.exp(scores)</span>],
              ['12', <span>    weights = weights / weights.sum(axis=<span style={{color:'#b5cea8'}}>-1</span>, keepdims=<span style={{color:'#569cd6'}}>True</span>)</span>],
              ['13', ''],
              ['14', <span>    out = weights <span style={{color:'#d4d4d4'}}>@</span> V</span>],
              ['15', <span>    <span style={{color:'#569cd6'}}>return</span> out, weights</span>],
            ].map(([n, line], i) => (
              <div key={i} style={{ display: 'flex', padding: '0 16px', background: i === 14 ? 'rgba(244,197,66,0.06)' : 'transparent' }}>
                <span style={{ color: '#5a5a5a', width: 28, textAlign: 'right', userSelect: 'none' }}>{n}</span>
                <span style={{ paddingLeft: 16 }}>{line}</span>
              </div>
            ))}
            {/* cursor */}
            <div style={{ paddingLeft: 60, marginTop: 6 }}>
              <span style={{ display: 'inline-block', width: 1.5, height: 14, background: '#fff', verticalAlign: 'middle' }} />
            </div>
          </div>

          {/* status bar */}
          <div style={{ background: '#007acc', color: '#fff', fontSize: 11, padding: '4px 14px', display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono' }}>
            <span>↻ python 3.11 · numpy 1.26</span>
            <span>Ln 15, Col 22 · UTF-8 · LF · 3/4 tests pass</span>
          </div>

          {/* test runner panel */}
          <div style={{ background: theme === 'dark' ? '#0a0a0e' : '#181820', color: '#e0e0e0', fontFamily: 'JetBrains Mono', fontSize: 12, padding: '16px 18px', minHeight: 280 }}>
            <div style={{ display: 'flex', gap: 18, marginBottom: 12, color: '#9a9a9a', fontSize: 11 }}>
              <span style={{ color: '#fff', borderBottom: `2px solid ${t.accent}`, paddingBottom: 4 }}>OUTPUT</span>
              <span>TESTS (3/4)</span>
              <span>TERMINAL</span>
            </div>

            <div style={{ lineHeight: 1.7 }}>
              <div><span style={{ color: '#7aa86b' }}>✓</span> test_basic_shape <span style={{ color: '#5a5a5a' }}>· 0.4ms</span></div>
              <div><span style={{ color: '#7aa86b' }}>✓</span> test_weights_sum_to_one <span style={{ color: '#5a5a5a' }}>· 0.3ms</span></div>
              <div><span style={{ color: '#7aa86b' }}>✓</span> test_attention_against_torch <span style={{ color: '#5a5a5a' }}>· 1.8ms</span></div>
              <div style={{ background: 'rgba(232,90,63,0.12)', padding: '4px 8px', margin: '4px -8px', borderRadius: 2 }}>
                <span style={{ color: '#e85a3f' }}>✗</span> test_extreme_values_no_overflow <span style={{ color: '#5a5a5a' }}>· failed</span>
                <div style={{ paddingLeft: 18, color: '#cfcfcf', fontSize: 11.5, marginTop: 4 }}>
                  AssertionError: nan in output for d_k=256, seq=128<br/>
                  <span style={{ color: '#9a9a9a' }}>  → values reach exp(scores) ≈ inf before normalization</span><br/>
                  <span style={{ color: t.accent }}>  hint: check the order of stabilization vs scaling</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

window.Problem = Problem;
