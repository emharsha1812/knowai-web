'use client';

import React from 'react';
import { FileText, FolderOpen, History, Lightbulb, Play, Plus, RotateCcw, Send, Settings } from 'lucide-react';
import { TOKENS, NavBar, Mono, Tag, useTheme } from "@/components/ui/primitives";

type PromptTab = 'question' | 'solution' | 'submissions';
type FileTab = 'solution' | 'tests' | 'utils';
type ConsoleTab = 'console' | 'tests';
type RunState = 'idle' | 'running' | 'ran' | 'submitted';

const initialCode = `import numpy as np

def attention(Q, K, V):
    """Scaled dot-product attention."""
    d_k = Q.shape[-1]
    scores = Q @ K.T
    scores = scores / np.sqrt(d_k)

    # numerically stable softmax
    scores = scores - scores.max(axis=-1, keepdims=True)
    weights = np.exp(scores)
    weights = weights / weights.sum(axis=-1, keepdims=True)

    out = weights @ V
    return out, weights`;

const fileContents: Record<Exclude<FileTab, 'solution'>, string> = {
  tests: `def test_basic_shape():
    out, weights = attention(Q, K, V)
    assert out.shape == (3, 64)
    assert weights.shape == (3, 3)

def test_weights_sum_to_one():
    assert np.allclose(weights.sum(axis=-1), 1)

def test_extreme_values_no_overflow:
    assert not np.isnan(out).any()`,
  utils: `def stable_softmax(scores):
    scores = scores - scores.max(axis=-1, keepdims=True)
    weights = np.exp(scores)
    return weights / weights.sum(axis=-1, keepdims=True)`,
};

const promptTabs: Array<{ id: PromptTab; label: string; Icon: typeof FileText }> = [
  { id: 'question', label: 'Question', Icon: FileText },
  { id: 'solution', label: 'Solution', Icon: Lightbulb },
  { id: 'submissions', label: 'Submissions', Icon: History },
];

const fileTabs: Array<{ id: FileTab; label: string }> = [
  { id: 'solution', label: 'Solution 1' },
  { id: 'tests', label: 'tests.py' },
  { id: 'utils', label: 'utils.py' },
];

export default function Problems() {
  const theme = useTheme();
  const t = theme === 'dark' ? TOKENS.dark : TOKENS.light;
  const [activePromptTab, setActivePromptTab] = React.useState<PromptTab>('question');
  const [solutionUnlocked, setSolutionUnlocked] = React.useState(false);
  const [showSolutionWarning, setShowSolutionWarning] = React.useState(false);
  const [activeFileTab, setActiveFileTab] = React.useState<FileTab>('solution');
  const [activeConsoleTab, setActiveConsoleTab] = React.useState<ConsoleTab>('console');
  const [consoleOpen, setConsoleOpen] = React.useState(true);
  const [code, setCode] = React.useState(initialCode);
  const [activeLine, setActiveLine] = React.useState(15);
  const [runState, setRunState] = React.useState<RunState>('idle');
  const codeBg = theme === 'dark' ? '#0f0f14' : '#1e1e1e';
  const editorBg = theme === 'dark' ? '#111118' : '#202020';
  const chromeBg = theme === 'dark' ? '#18181f' : '#242424';
  const codeText = '#d4d4d4';
  const visibleCode = activeFileTab === 'solution' ? code : fileContents[activeFileTab];
  const codeLines = visibleCode.split('\n');
  const testsPassing = runState === 'submitted' ? '4 / 4 tests passing' : '3 / 4 tests passing';
  const lineHeight = 21;

  function updateActiveLine(text: string, caretPosition: number) {
    setActiveLine(text.slice(0, caretPosition).split('\n').length);
  }

  function runCode() {
    setRunState('running');
    setActiveConsoleTab('console');
    setConsoleOpen(true);
    window.setTimeout(() => setRunState('ran'), 450);
  }

  function submitCode() {
    setRunState('submitted');
    setActiveConsoleTab('tests');
    setConsoleOpen(true);
  }

  function resetCode() {
    setCode(initialCode);
    setActiveFileTab('solution');
    setActiveLine(15);
    setRunState('idle');
  }

  const activeLineStart = (activeLine - 1) * lineHeight;
  const activeLineEnd = activeLine * lineHeight;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1760, position: 'relative' }}>
        <NavBar theme={theme} active="problems" />

        <div style={{ padding: '18px 14px', borderBottom: `1px solid ${t.rule}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 18 }}>
          <div>
            <Mono theme={theme}>PROBLEM 14.2.A - CH. 14 ATTENTION</Mono>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 26, fontWeight: 500, margin: '4px 0 0', letterSpacing: '-0.01em' }}>
              Implement scaled dot-product attention.
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: t.inkSoft, flexShrink: 0 }}>
            <Tag theme={theme}>numpy</Tag>
            <Tag theme={theme}>medium</Tag>
            <Tag theme={theme}>est. 18m</Tag>
            <span style={{ width: 1, height: 18, background: t.rule }} />
            <span>{testsPassing}</span>
            <button onClick={submitCode} style={{ background: t.ink, color: t.paper, padding: '8px 14px', border: 'none', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer' }}>SUBMIT</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(380px, 0.85fr) minmax(560px, 1.65fr)', gap: 8, padding: '8px 10px 24px' }}>
          <aside style={{ border: `1px solid ${t.rule}`, background: t.paper, minHeight: 760, overflow: 'hidden', borderRadius: 4 }}>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 2, borderBottom: `1px solid ${t.rule}`, padding: '0 10px', background: theme === 'dark' ? '#1b1b22' : t.paperAlt }}>
              {promptTabs.map(({ id, label, Icon }, index) => {
                const active = activePromptTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      if (id === 'solution' && !solutionUnlocked) {
                        setShowSolutionWarning(true);
                        return;
                      }
                      setActivePromptTab(id);
                    }}
                    style={{
                      height: 30,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      border: 'none',
                      borderRight: index === promptTabs.length - 1 ? 'none' : `1px solid ${theme === 'dark' ? '#33333a' : t.rule}`,
                      background: active ? 'rgba(244,197,66,0.12)' : 'transparent',
                      color: active ? t.ink : t.inkSoft,
                      padding: '0 11px',
                      fontSize: 12,
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: active ? 700 : 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Icon size={14} strokeWidth={2} />
                    {label}
                  </button>
                );
              })}
              <div style={{ flex: 1 }} />
              <FolderOpen size={15} color={t.inkMuted} />
            </div>

            <div style={{ padding: '26px 26px 30px', fontFamily: 'Newsreader, serif', fontSize: 15.5, lineHeight: 1.68, color: t.ink, maxHeight: 718, overflow: 'auto' }}>
              {activePromptTab === 'question' && (
                <>
                  <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 30, lineHeight: 1.12, margin: '0 0 12px', fontWeight: 500, letterSpacing: '-0.015em' }}>
                    Scaled Dot-Product Attention
                  </h2>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 22, fontFamily: 'Inter, sans-serif' }}>
                    <Tag theme={theme}>medium</Tag>
                    <Tag theme={theme}>math foundations</Tag>
                    <Tag theme={theme}>numpy</Tag>
                  </div>
                  <p style={{ margin: '0 0 14px' }}>
                    Given query, key, and value matrices <Mono theme={theme} size={13}>Q, K, V</Mono>,
                    implement scaled dot-product attention as defined in section 14.2.
                  </p>
                  <p style={{ margin: '0 0 18px', color: t.inkSoft }}>
                    Your function should accept three numpy arrays of shape <Mono theme={theme} size={13}>(seq, d_k)</Mono>
                    and return both the attended output and the attention weights.
                  </p>
                  <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, padding: 14, borderRadius: 4, fontSize: 13.5, marginTop: 16, marginBottom: 18 }}>
                    <Mono theme={theme}>SIGNATURE</Mono>
                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12.5, marginTop: 8, color: t.ink }}>
                      attention(Q, K, V) -&gt; (output, weights)
                    </div>
                  </div>
                  <Mono theme={theme}>CONSTRAINTS</Mono>
                  <ul style={{ paddingLeft: 18, margin: '8px 0 18px', fontSize: 13.5, color: t.inkSoft, lineHeight: 1.6 }}>
                    <li>1 &lt;= seq &lt;= 256</li>
                    <li>d_k in {'{'}32, 64, 128, 256{'}'}</li>
                    <li>numpy only - no torch, no scipy</li>
                    <li>Numerically stable softmax</li>
                  </ul>
                  <Mono theme={theme}>EXAMPLE</Mono>
                  <div style={{ background: t.paperAlt, fontFamily: 'JetBrains Mono', fontSize: 11.5, padding: 12, marginTop: 6, borderRadius: 4, color: t.ink, border: `1px solid ${t.rule}`, lineHeight: 1.6 }}>
                    <span style={{ color: t.inkMuted }}># Q.shape = (3, 64) - K.shape = (3, 64)</span><br/>
                    <span style={{ color: t.inkMuted }}># V.shape = (3, 64)</span><br/>
                    out, w = attention(Q, K, V)<br/>
                    <span style={{ color: t.inkMuted }}># out.shape == (3, 64)</span><br/>
                    <span style={{ color: t.inkMuted }}># w.sum(axis=-1) ~= 1</span>
                  </div>
                </>
              )}

              {activePromptTab === 'solution' && (
                <>
                  <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 30, margin: '0 0 12px', fontWeight: 500, letterSpacing: '-0.015em' }}>Solution Notes</h2>
                  <p style={{ margin: '0 0 14px', color: t.inkSoft }}>
                    Scale the scores before the softmax, then subtract the row maximum before exponentiating. This keeps large scores from overflowing.
                  </p>
                  <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, padding: 14, borderRadius: 4, fontFamily: 'JetBrains Mono', fontSize: 12, lineHeight: 1.65 }}>
                    scores = (Q @ K.T) / np.sqrt(d_k)<br/>
                    scores = scores - scores.max(axis=-1, keepdims=True)<br/>
                    weights = np.exp(scores)<br/>
                    weights = weights / weights.sum(axis=-1, keepdims=True)
                  </div>
                </>
              )}

              {activePromptTab === 'submissions' && (
                <>
                  <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 30, margin: '0 0 12px', fontWeight: 500, letterSpacing: '-0.015em' }}>Submissions</h2>
                  {[
                    ['Latest draft', testsPassing, runState === 'submitted' ? 'Accepted' : 'Needs work'],
                    ['Previous run', '3 / 4 tests passing', 'Runtime warning'],
                  ].map(([name, tests, status]) => (
                    <div key={name} style={{ borderBottom: `1px solid ${t.rule}`, padding: '12px 0', fontFamily: 'Inter, sans-serif', fontSize: 13 }}>
                      <strong>{name}</strong>
                      <div style={{ color: t.inkSoft, marginTop: 4 }}>{tests} - {status}</div>
                    </div>
                  ))}
                </>
              )}

            </div>
          </aside>

          <section style={{ minWidth: 0, border: '1px solid #343434', background: codeBg, overflow: 'hidden', borderRadius: 4 }}>
            <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px 0 20px', borderBottom: '1px solid #343434', background: chromeBg, color: '#f3f3f3', fontFamily: 'Inter, sans-serif' }}>
              <button style={{ border: 'none', background: 'transparent', color: '#ffffff', fontWeight: 700, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                Python
                <span style={{ color: '#aaa' }}>v</span>
              </button>
              <span style={{ width: 1, height: 18, background: '#3a3a3a' }} />
              <span style={{ fontSize: 13, color: '#aaa' }}>Auto</span>
              <div style={{ flex: 1 }} />
              <button title="Reset code" onClick={resetCode} style={iconButtonStyle}><RotateCcw size={15} /></button>
              <button title="Settings" style={iconButtonStyle}><Settings size={15} /></button>
            </div>

            <div style={{ height: 34, display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px', borderBottom: '1px solid #2f2f2f', background: chromeBg }}>
              {fileTabs.map((tab) => {
                const active = activeFileTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFileTab(tab.id)}
                    style={{
                      height: 25,
                      border: `1px solid ${active ? '#3a3f48' : 'transparent'}`,
                      background: active ? '#262a32' : 'transparent',
                      color: active ? '#ffffff' : '#9a9a9a',
                      padding: '0 11px',
                      borderRadius: 4,
                      fontSize: 12,
                      fontFamily: 'JetBrains Mono, monospace',
                      cursor: 'pointer',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
              <button title="Add solution" style={{ ...iconButtonStyle, width: 25, height: 25 }}><Plus size={14} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '58px minmax(0, 1fr)', background: editorBg, color: codeText, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: `${lineHeight}px`, minHeight: consoleOpen ? 522 : 708 }}>
              <pre aria-hidden="true" style={{ margin: 0, padding: '12px 12px 12px 0', color: '#858585', textAlign: 'right', userSelect: 'none', borderRight: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.12)', overflow: 'hidden' }}>
                {codeLines.map((_, i) => i + 1).join('\n')}
              </pre>
              <textarea
                aria-label={`${activeFileTab} code editor`}
                value={visibleCode}
                readOnly={activeFileTab !== 'solution'}
                onChange={(event) => {
                  if (activeFileTab === 'solution') {
                    setCode(event.target.value);
                    updateActiveLine(event.target.value, event.target.selectionStart);
                  }
                }}
                onClick={(event) => updateActiveLine(event.currentTarget.value, event.currentTarget.selectionStart)}
                onKeyUp={(event) => updateActiveLine(event.currentTarget.value, event.currentTarget.selectionStart)}
                spellCheck={false}
                style={{
                  width: '100%',
                  minHeight: consoleOpen ? 522 : 708,
                  resize: 'none',
                  border: 0,
                  outline: 'none',
                  background: activeFileTab === 'solution'
                    ? `linear-gradient(to bottom, transparent ${activeLineStart}px, rgba(244,197,66,0.07) ${activeLineStart}px, rgba(244,197,66,0.07) ${activeLineEnd}px, transparent ${activeLineEnd}px), ${editorBg}`
                    : editorBg,
                  color: codeText,
                  caretColor: '#ffffff',
                  font: 'inherit',
                  lineHeight: 'inherit',
                  padding: '12px 16px',
                  whiteSpace: 'pre',
                  overflow: 'auto',
                  tabSize: 4,
                }}
              />
            </div>

            <div style={{ borderTop: '1px solid #343434', background: '#202020', color: '#e5e5e5', fontFamily: 'JetBrains Mono, monospace' }}>
              <div style={{ height: 54, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
                <button
                  onClick={() => setConsoleOpen(!consoleOpen)}
                  style={{ border: 'none', background: 'transparent', color: '#ffffff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                >
                  Console {consoleOpen ? '^' : 'v'}
                </button>
                {consoleOpen && (
                  <>
                    <button onClick={() => setActiveConsoleTab('console')} style={consoleTabStyle(activeConsoleTab === 'console')}>Output</button>
                    <button onClick={() => setActiveConsoleTab('tests')} style={consoleTabStyle(activeConsoleTab === 'tests')}>Tests</button>
                  </>
                )}
                <div style={{ flex: 1 }} />
                <button onClick={runCode} style={{ ...actionButtonStyle, background: '#343842', color: '#ffffff' }}>
                  <Play size={14} fill="currentColor" />
                  Run
                </button>
                <button onClick={submitCode} style={{ ...actionButtonStyle, background: '#f4c542', color: '#0e0e10' }}>
                  <Send size={14} />
                  Submit
                </button>
              </div>

              {consoleOpen && (
                <div style={{ minHeight: 132, borderTop: '1px solid #303030', padding: '14px 18px', fontSize: 12, lineHeight: 1.75, background: '#17171d' }}>
                  {activeConsoleTab === 'console' ? (
                    <ConsoleOutput runState={runState} accent={t.accent} />
                  ) : (
                    <TestOutput runState={runState} accent={t.accent} />
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        {showSolutionWarning && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="solution-warning-title"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.42)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 40,
              padding: 18,
            }}
          >
            <div style={{
              width: 'min(420px, 100%)',
              background: theme === 'dark' ? '#202026' : t.paper,
              border: `1px solid ${theme === 'dark' ? '#373741' : t.rule}`,
              borderRadius: 4,
              boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
              padding: 22,
            }}>
              <h2 id="solution-warning-title" style={{ fontFamily: 'Newsreader, serif', fontSize: 26, lineHeight: 1.15, margin: '0 0 8px', fontWeight: 500, letterSpacing: '-0.015em' }}>
                View solution?
              </h2>
              <p style={{ margin: '0 0 18px', color: t.inkSoft, fontFamily: 'Newsreader, serif', fontSize: 15.5, lineHeight: 1.6 }}>
                Opening the solution will reveal the intended approach. Try running your current code first if you want to preserve the challenge.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button
                  onClick={() => setShowSolutionWarning(false)}
                  style={{
                    height: 34,
                    border: `1px solid ${t.rule}`,
                    background: 'transparent',
                    color: t.ink,
                    borderRadius: 4,
                    padding: '0 14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSolutionUnlocked(true);
                    setActivePromptTab('solution');
                    setShowSolutionWarning(false);
                  }}
                  style={{
                    height: 34,
                    border: 'none',
                    background: t.ink,
                    color: t.paper,
                    borderRadius: 4,
                    padding: '0 14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  Yes, show solution
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConsoleOutput({ runState, accent }: { runState: RunState; accent: string }) {
  if (runState === 'idle') {
    return <div style={{ color: '#9a9a9a' }}>Run your code to see stdout and test feedback.</div>;
  }

  if (runState === 'running') {
    return <div style={{ color: '#9a9a9a' }}>Running hidden tests...</div>;
  }

  if (runState === 'submitted') {
    return (
      <>
        <div><span style={{ color: '#7aa86b' }}>PASS</span> all visible tests completed</div>
        <div><span style={{ color: '#7aa86b' }}>PASS</span> submitted solution accepted</div>
        <div style={{ color: accent, marginTop: 8 }}>Runtime: 31ms - Memory: 42.6MB</div>
      </>
    );
  }

  return (
    <>
      <div><span style={{ color: '#7aa86b' }}>PASS</span> test_basic_shape - 0.4ms</div>
      <div><span style={{ color: '#7aa86b' }}>PASS</span> test_weights_sum_to_one - 0.3ms</div>
      <div><span style={{ color: '#7aa86b' }}>PASS</span> test_attention_against_torch - 1.8ms</div>
      <div style={{ color: '#e85a3f', marginTop: 8 }}>FAIL test_extreme_values_no_overflow - nan in output for d_k=256, seq=128</div>
      <div style={{ color: accent }}>hint: check the order of stabilization vs scaling</div>
    </>
  );
}

function TestOutput({ runState, accent }: { runState: RunState; accent: string }) {
  const passed = runState === 'submitted';
  return (
    <>
      <div><span style={{ color: '#7aa86b' }}>PASS</span> test_basic_shape</div>
      <div><span style={{ color: '#7aa86b' }}>PASS</span> test_weights_sum_to_one</div>
      <div><span style={{ color: '#7aa86b' }}>PASS</span> test_attention_against_torch</div>
      <div><span style={{ color: passed ? '#7aa86b' : '#e85a3f' }}>{passed ? 'PASS' : 'FAIL'}</span> test_extreme_values_no_overflow</div>
      <div style={{ color: passed ? accent : '#9a9a9a', marginTop: 8 }}>
        {passed ? 'Accepted: 4 / 4 tests passing.' : 'Current run: 3 / 4 tests passing.'}
      </div>
    </>
  );
}

const iconButtonStyle: React.CSSProperties = {
  width: 28,
  height: 28,
  border: 'none',
  background: 'transparent',
  color: '#bdbdbd',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
};

const actionButtonStyle: React.CSSProperties = {
  height: 32,
  border: 'none',
  borderRadius: 5,
  padding: '0 16px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  fontWeight: 700,
  fontSize: 13,
  cursor: 'pointer',
};

function consoleTabStyle(active: boolean): React.CSSProperties {
  return {
    height: 28,
    border: 'none',
    background: active ? '#303038' : 'transparent',
    color: active ? '#ffffff' : '#9a9a9a',
    borderRadius: 4,
    padding: '0 10px',
    fontSize: 12,
    cursor: 'pointer',
  };
}
