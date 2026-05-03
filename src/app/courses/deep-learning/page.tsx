'use client';

import React from 'react';
import { TOKENS, Highlight, NavBar, Mono, Tag, Icons, useTheme } from "@/components/ui/primitives";

export default function Courses() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;

  const tiers = [
    {
      tier: 'I', name: 'Foundations', color: 'sage',
      desc: 'The math you skipped. Now with diagrams.',
      modules: [
        { n: '01', title: 'Linear Algebra', icon: 'matrix', tags: ['Vectors', 'Matrices', 'Eigen'], chapters: 12, weeks: '2 wk' },
        { n: '02', title: 'Calculus for Optimization', icon: 'curve', tags: ['Gradients', 'Chain rule'], chapters: 8, weeks: '2 wk' },
        { n: '03', title: 'Probability & Information', icon: 'dice', tags: ['Bayes', 'Entropy'], chapters: 10, weeks: '2 wk' },
        { n: '04', title: 'Classical ML', icon: 'sigma', tags: ['Regression', 'SVM', 'Trees'], chapters: 8, weeks: '3 wk' },
      ],
    },
    {
      tier: 'II', name: 'Implementation', color: 'butter',
      desc: 'Build a transformer. From scratch. No PyTorch.',
      modules: [
        { n: '05', title: 'Backprop by Hand', icon: 'flow', tags: ['Autograd'], chapters: 10, weeks: '3 wk' },
        { n: '06', title: 'CNNs from Conv2d up', icon: 'eye', tags: ['Conv', 'Pooling', 'ResNet'], chapters: 12, weeks: '3 wk' },
        { n: '07', title: 'Attention & Transformers', icon: 'chat', tags: ['MHA', 'KV-cache'], chapters: 16, weeks: '4 wk' },
        { n: '08', title: 'Diffusion Models', icon: 'graph', tags: ['DDPM', 'DDIM'], chapters: 10, weeks: '3 wk' },
      ],
    },
    {
      tier: 'III', name: 'Advanced Systems', color: 'sky',
      desc: 'When the bottleneck is silicon, not algebra.',
      modules: [
        { n: '09', title: 'CUDA Mental Model', icon: 'chip', tags: ['Threads', 'Warps'], chapters: 8, weeks: '2 wk' },
        { n: '10', title: 'Triton Kernels', icon: 'chip', tags: ['Fused ops'], chapters: 12, weeks: '4 wk' },
        { n: '11', title: 'Mixed-Precision Training', icon: 'sigma', tags: ['fp16', 'bf16'], chapters: 6, weeks: '1 wk' },
        { n: '12', title: 'Distributed Training', icon: 'graph', tags: ['DP', 'TP', 'PP'], chapters: 10, weeks: '3 wk' },
      ],
    },
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
        <NavBar theme={theme} active="courses" />

        {/* sub-bar with breadcrumb */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 32px', borderBottom: `1px solid ${t.rule}`, background: t.paperAlt,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: t.inkSoft }}>
            <Mono theme={theme}>COURSES</Mono>
            <span>›</span>
            <span style={{ color: t.ink, fontWeight: 500 }}>Deep Learning Architecture</span>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: t.inkSoft }}>
            <span style={{ background: t.ink, color: t.paper, padding: '4px 10px', borderRadius: 2, fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>ENROLL IN COURSE</span>
          </div>
        </div>

        {/* hero */}
        <div style={{ padding: '52px 80px 36px', display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: 48, alignItems: 'end' }}>
          <div>
            <Mono theme={theme}>SYLLABUS · 2024 EDITION · 142 CHAPTERS</Mono>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 64, fontWeight: 400, margin: '14px 0 0', lineHeight: 1.02, letterSpacing: '-0.025em' }}>
              The whole map, <em>at once.</em>
            </h1>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: t.inkSoft, marginTop: 16, maxWidth: 540, lineHeight: 1.5, fontWeight: 300 }}>
              Three tiers. Twelve modules. One <Highlight theme={theme}>continuous path</Highlight> from
              counting on your fingers to writing CUDA kernels that beat the vendor library.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            {[
              { k: 'tot. weeks', v: '32' },
              { k: 'problems',   v: '3.4k' },
              { k: 'notebooks',  v: '11' },
            ].map(s => (
              <div key={s.k} style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, padding: '14px 18px', borderRadius: 3, minWidth: 100 }}>
                <Mono theme={theme}>{s.k}</Mono>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, marginTop: 4 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* dependency map (decorative) */}
        <div style={{ padding: '20px 80px 32px' }}>
          <Mono theme={theme}>§ DEPENDENCY GRAPH</Mono>
          <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 4, padding: '20px 24px', marginTop: 8, position: 'relative' }}>
            <svg viewBox="0 0 1100 160" style={{ width: '100%', height: 160 }}>
              {/* tier dividers */}
              <line x1="370" y1="20" x2="370" y2="140" stroke={t.rule} strokeDasharray="4 4"/>
              <line x1="730" y1="20" x2="730" y2="140" stroke={t.rule} strokeDasharray="4 4"/>
              <text x="185" y="16" fontFamily="JetBrains Mono" fontSize="9" fill={t.inkMuted} textAnchor="middle">FOUNDATIONS</text>
              <text x="550" y="16" fontFamily="JetBrains Mono" fontSize="9" fill={t.inkMuted} textAnchor="middle">IMPLEMENTATION</text>
              <text x="915" y="16" fontFamily="JetBrains Mono" fontSize="9" fill={t.inkMuted} textAnchor="middle">ADVANCED</text>

              {(() => {
                const nodes = [
                  { id: '01', x: 60,   y: 50, label: 'Linear Alg' },
                  { id: '02', x: 60,   y: 110, label: 'Calculus' },
                  { id: '03', x: 200,  y: 50, label: 'Probability' },
                  { id: '04', x: 200,  y: 110, label: 'Classical ML' },
                  { id: '05', x: 410,  y: 50, label: 'Backprop' },
                  { id: '06', x: 410,  y: 110, label: 'CNNs' },
                  { id: '07', x: 570,  y: 50, label: 'Attention' },
                  { id: '08', x: 570,  y: 110, label: 'Diffusion' },
                  { id: '09', x: 770,  y: 50, label: 'CUDA' },
                  { id: '10', x: 920,  y: 50, label: 'Triton' },
                  { id: '11', x: 770,  y: 110, label: 'Mixed-precision' },
                  { id: '12', x: 1020, y: 110, label: 'Distributed' },
                ];
                const edges = [
                  ['01','03'], ['02','04'], ['01','05'], ['02','05'], ['05','06'], ['05','07'], ['06','07'], ['07','08'],
                  ['07','10'], ['09','10'], ['10','11'], ['10','12'], ['07','12'],
                ];
                const byId = Object.fromEntries(nodes.map(n => [n.id, n]));
                return (
                  <g>
                    {edges.map(([a, b], i) => {
                      const A = byId[a], B = byId[b];
                      return <path key={i} d={`M ${A.x + 40} ${A.y} C ${(A.x + B.x) / 2 + 40} ${A.y}, ${(A.x + B.x) / 2 - 40} ${B.y}, ${B.x - 40} ${B.y}`} stroke={t.inkMuted} strokeWidth="0.8" fill="none" opacity="0.5"/>;
                    })}
                    {nodes.map(n => {
                      const isAttention = n.id === '07';
                      return (
                        <g key={n.id}>
                          <rect x={n.x - 40} y={n.y - 12} width="80" height="22" rx="3"
                            fill={isAttention ? t.accent : t.paper}
                            stroke={t.ink} strokeWidth="0.9"/>
                          <text x={n.x} y={n.y + 4} fontFamily="Inter, sans-serif" fontSize="10" textAnchor="middle"
                            fill={isAttention ? t.accentInk : t.ink} fontWeight="500">{n.label}</text>
                        </g>
                      );
                    })}
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* tiers + modules */}
        <div style={{ padding: '12px 80px 80px' }}>
          {tiers.map((tier) => {
            const pal = TOKENS.pastels[tier.color as keyof typeof TOKENS.pastels];
            return (
              <div key={tier.tier} style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
                    <span style={{
                      fontFamily: 'Newsreader, serif', fontWeight: 500, fontSize: 50,
                      fontStyle: 'italic', color: t.ink, lineHeight: 1,
                    }}>{tier.tier}.</span>
                    <div>
                      <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 30, fontWeight: 500, margin: 0, letterSpacing: '-0.01em' }}>{tier.name}</h2>
                      <div style={{ fontFamily: 'Newsreader, serif', fontSize: 15, fontStyle: 'italic', color: t.inkSoft, marginTop: 2 }}>{tier.desc}</div>
                    </div>
                  </div>
                  <Mono theme={theme}>{tier.modules.length} modules · {tier.modules.reduce((a, m) => a + m.chapters, 0)} chapters</Mono>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                  {tier.modules.map(m => (
                    <div key={m.n} style={{
                      background: t.paper, border: `1px solid ${t.rule}`, borderRadius: 4,
                      padding: 18, display: 'flex', flexDirection: 'column', minHeight: 200,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Mono theme={theme}>MOD. {m.n}</Mono>
                        <div style={{
                          width: 38, height: 38, background: pal.bg, borderRadius: 999,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ transform: 'scale(0.55)' }}>{(Icons as any)[m.icon](pal.text)}</span>
                        </div>
                      </div>
                      <div style={{ fontFamily: 'Newsreader, serif', fontSize: 19, fontWeight: 500, lineHeight: 1.2, marginTop: 14 }}>{m.title}</div>
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
                        {m.tags.map(tag => <Tag key={tag} theme={theme}>{tag}</Tag>)}
                      </div>
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: `1px dashed ${t.ruleSoft}` }}>
                        <Mono theme={theme}>{m.chapters} ch · {m.weeks}</Mono>
                        <span style={{ color: t.ink, fontSize: 13 }}>→</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
