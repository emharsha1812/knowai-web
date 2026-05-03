'use client';

import React from 'react';
import Link from 'next/link';
import { TOKENS, Highlight, NavBar, Mono, Tag, useTheme } from "@/components/ui/primitives";

export default function PapersIndex() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;

  const papers = [
    {
      year: '2017', tag: 'NeurIPS', cite: 'Vaswani et al.',
      title: 'Attention Is All You Need',
      blurb: 'The architecture that ate the field. We rebuild it from a single matmul up — including the bits the original paper omits.',
      status: 'implemented', difficulty: 'medium',
      progress: 1.0, color: 'lavender', code: '742 LOC', readers: '12.4k',
      domain: 'NLP',
      slug: 'attention',
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
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
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
            background: TOKENS.pastels[featured.color as keyof typeof TOKENS.pastels].bg,
            color: TOKENS.pastels[featured.color as keyof typeof TOKENS.pastels].text,
            borderRadius: 6, padding: 32,
            display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 36, alignItems: 'center',
            position: 'relative', overflow: 'hidden',
          }}>
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                <Mono theme="light"><span style={{ color: TOKENS.pastels[featured.color as keyof typeof TOKENS.pastels].text, opacity: 0.7 }}>{featured.year} · {featured.tag} · {featured.cite}</span></Mono>
                <span style={{ background: 'rgba(0,0,0,0.15)', padding: '3px 9px', borderRadius: 999, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>{featured.domain}</span>
              </div>
              <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 42, fontWeight: 500, margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                {featured.title}
              </h2>
              <p style={{ fontFamily: 'Newsreader, serif', fontSize: 17, fontStyle: 'italic', marginTop: 14, opacity: 0.85, maxWidth: 520 }}>
                {featured.blurb}
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center' }}>
                <Link href={`/papers/${featured.slug}`} style={{ textDecoration: 'none' }}>
                  <button style={{ background: TOKENS.pastels[featured.color as keyof typeof TOKENS.pastels].text, color: TOKENS.pastels[featured.color as keyof typeof TOKENS.pastels].bg, border: 'none', padding: '11px 18px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer' }}>OPEN ↗</button>
                </Link>
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
                fontFamily: 'Caveat, cursive', fontSize: 16, color: TOKENS.pastels[featured.color as keyof typeof TOKENS.pastels].text,
                transform: 'rotate(4deg)',
              }}>
                ← derivation in §3.2 ▶
                <svg width="80" height="20" viewBox="0 0 80 20" style={{ display: 'block' }}>
                  <path d="M70 10 Q 40 16 6 10" stroke={TOKENS.pastels[featured.color as keyof typeof TOKENS.pastels].text} strokeWidth="1" fill="none"/>
                  <path d="M12 6 L 6 10 L 12 14" stroke={TOKENS.pastels[featured.color as keyof typeof TOKENS.pastels].text} strokeWidth="1" fill="none"/>
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
              const pal = TOKENS.pastels[p.color as keyof typeof TOKENS.pastels];
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
    </div>
  );
}
