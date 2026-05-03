'use client';

import React from 'react';
import Link from 'next/link';
import { TOKENS, NavBar, Mono, Tag, useTheme } from "@/components/ui/primitives";

const LABS = [
  {
    id: '01',
    slug: 'attention-heatmap',
    title: 'Attention Heatmap',
    module: 'attention.heatmap',
    desc: 'Visualize scaled dot-product attention interactively. Adjust sequence length, dimension, and temperature to see how the softmax distribution shifts.',
    chapter: 'Ch. 14 — Attention',
    tags: ['numpy', 'marimo', 'transformers'],
    cells: 4,
    status: 'ready' as const,
    color: 'butter' as const,
    icon: (c: string) => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="4" width="8" height="8" rx="1" fill={c} opacity="0.9"/>
        <rect x="14" y="4" width="8" height="8" rx="1" fill={c} opacity="0.55"/>
        <rect x="24" y="4" width="8" height="8" rx="1" fill={c} opacity="0.25"/>
        <rect x="4" y="14" width="8" height="8" rx="1" fill={c} opacity="0.55"/>
        <rect x="14" y="14" width="8" height="8" rx="1" fill={c} opacity="0.9"/>
        <rect x="24" y="14" width="8" height="8" rx="1" fill={c} opacity="0.45"/>
        <rect x="4" y="24" width="8" height="8" rx="1" fill={c} opacity="0.2"/>
        <rect x="14" y="24" width="8" height="8" rx="1" fill={c} opacity="0.45"/>
        <rect x="24" y="24" width="8" height="8" rx="1" fill={c} opacity="0.9"/>
      </svg>
    ),
  },
  {
    id: '02',
    slug: 'softmax-stability',
    title: 'Softmax Stability',
    module: 'softmax.stability',
    desc: 'A reactive notebook demonstrating the numerical instability of standard softmax, and the log-sum-exp trick used to fix it without changing outputs.',
    chapter: 'Ch. 08 — Numerics',
    tags: ['math', 'marimo', 'optimization'],
    cells: 6,
    status: 'ready' as const,
    color: 'mint' as const,
    icon: (c: string) => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M4 28 C10 28 10 8 18 8 S26 28 32 28" stroke={c} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <circle cx="18" cy="8" r="2.5" fill={c}/>
        <line x1="4" y1="28" x2="32" y2="28" stroke={c} strokeWidth="1.2" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: '03',
    slug: 'rope-embeddings',
    title: 'RoPE Embeddings',
    module: 'rope.embeddings',
    desc: 'Visualize Rotary Position Embeddings as rotations in 2D space. A geometric intuition for how relative positioning is encoded without absolute indices.',
    chapter: 'Ch. 17 — Positional Encoding',
    tags: ['geometry', 'marimo', 'architecture'],
    cells: 7,
    status: 'ready' as const,
    color: 'lavender' as const,
    icon: (c: string) => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="12" stroke={c} strokeWidth="1.6" fill="none"/>
        <line x1="18" y1="18" x2="28" y2="10" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <line x1="18" y1="18" x2="10" y2="28" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <circle cx="18" cy="18" r="2.5" fill={c}/>
      </svg>
    ),
  },
  {
    id: '04',
    slug: 'kv-cache',
    title: 'KV-Cache Memory',
    module: 'kv_cache.memory',
    desc: 'Calculate precise VRAM requirements for KV caching during inference. Drag sliders for batch size, context length, and precision to see memory footprint live.',
    chapter: 'Ch. 22 — Inference Systems',
    tags: ['systems', 'marimo', 'inference'],
    cells: 5,
    status: 'queued' as const,
    color: 'sky' as const,
    icon: (c: string) => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="10" width="24" height="16" rx="2" stroke={c} strokeWidth="1.6" fill="none"/>
        <rect x="10" y="14" width="6" height="8" rx="1" fill={c} opacity="0.8"/>
        <rect x="20" y="14" width="6" height="8" rx="1" fill={c} opacity="0.4"/>
        <line x1="12" y1="10" x2="12" y2="7" stroke={c} strokeWidth="1.4"/>
        <line x1="24" y1="10" x2="24" y2="7" stroke={c} strokeWidth="1.4"/>
      </svg>
    ),
  },
];

export default function LabsIndex() {
  const theme = useTheme();
  const t = theme === 'dark' ? TOKENS.dark : TOKENS.light;

  const readyCount  = LABS.filter(l => l.status === 'ready').length;
  const queuedCount = LABS.filter(l => l.status === 'queued').length;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
        <NavBar theme={theme} active="labs" />

        {/* ── HERO ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, padding: '80px 80px 0', alignItems: 'end' }}>
          <div>
            <Mono theme={theme}>§ INTERACTIVE LABS</Mono>
            <h1 style={{
              fontFamily: 'Newsreader, serif', fontWeight: 400,
              fontSize: 68, lineHeight: 1.0, letterSpacing: '-0.025em',
              margin: '20px 0 20px', color: t.ink,
            }}>
              Code you can<br/>
              <em style={{ fontStyle: 'italic' }}>
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{ position: 'relative', zIndex: 1 }}>touch.</span>
                  <svg viewBox="0 0 200 40" preserveAspectRatio="none"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
                    <path d="M2 36 Q 60 32 130 36 T 198 33" stroke={t.accent} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7"/>
                  </svg>
                </span>
              </em>
            </h1>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: t.inkSoft, lineHeight: 1.6, maxWidth: 440, fontWeight: 300 }}>
              Reactive Marimo notebooks where every formula has a slider. Change
              a variable — watch the math propagate through the graph instantly.
            </p>
          </div>

          {/* Right: editorial explanation block */}
          <div style={{ paddingBottom: 8 }}>
            <div style={{ borderLeft: `3px solid ${t.accent}`, paddingLeft: 20, marginBottom: 28 }}>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 17, fontStyle: 'italic', color: t.inkSoft, lineHeight: 1.6 }}>
                &quot;You don&apos;t understand a formula until you&apos;ve broken it. Labs give you the sliders to break things deliberately.&quot;
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: t.inkMuted, marginTop: 8, letterSpacing: '0.05em' }}>
                — DESIGN PRINCIPLE · §00
              </div>
            </div>
            {/* runtime stack tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['Marimo', 'NumPy', 'PyTorch', 'In-browser'].map(r => (
                <Tag key={r} theme={theme}>{r}</Tag>
              ))}
            </div>
          </div>
        </div>

        {/* ── STAT STRIP ── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid ${t.rule}`, borderBottom: `1px solid ${t.rule}`,
          margin: '40px 80px 0',
        }}>
          {[
            [String(readyCount), 'labs ready to run'],
            [String(LABS.length), 'total notebooks'],
            ['Marimo', 'reactive runtime'],
            ['In-browser', 'zero install'],
          ].map(([n, l], i, arr) => (
            <div key={l} style={{
              padding: '20px 24px',
              borderRight: i < arr.length - 1 ? `1px solid ${t.rule}` : 'none',
            }}>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 26, fontWeight: 500, lineHeight: 1, marginBottom: 6 }}>{n}</div>
              <Mono theme={theme}>{l}</Mono>
            </div>
          ))}
        </div>

        {/* ── LAB CARDS GRID ── */}
        <div style={{ padding: '48px 80px 100px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
            <div>
              <Mono theme={theme}>§ ALL LABS · {LABS.length} NOTEBOOKS</Mono>
              <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, margin: '8px 0 0', letterSpacing: '-0.01em' }}>
                Pick a notebook. Run it. Break it.
              </h2>
            </div>
            {queuedCount > 0 && (
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: t.inkMuted, letterSpacing: '0.04em' }}>
                {queuedCount} queued
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {LABS.map((lab) => {
              const pal = TOKENS.pastels[lab.color];
              const isReady = lab.status === 'ready';
              const href = lab.slug === 'attention-heatmap' ? `/labs/${lab.slug}` : '/labs';
              return (
                <Link
                  key={lab.id}
                  href={href}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  className="group"
                >
                  <div style={{
                    background: t.paperAlt,
                    border: `1px solid ${t.rule}`,
                    borderRadius: 4,
                    overflow: 'hidden',
                    opacity: isReady ? 1 : 0.6,
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                    className={isReady ? 'hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-sm' : ''}
                  >
                    {/* Card header — pastel color band */}
                    <div style={{
                      background: pal.bg,
                      padding: '18px 22px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    }}>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: pal.deep, fontWeight: 600, letterSpacing: '0.06em' }}>
                            [{lab.id}]
                          </span>
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: pal.deep, opacity: 0.6, letterSpacing: '0.04em' }}>
                            {lab.chapter}
                          </span>
                        </div>
                        <div style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500, color: pal.text, lineHeight: 1.1 }}>
                          {lab.title}
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: pal.deep, opacity: 0.7, marginTop: 4, letterSpacing: '0.02em' }}>
                          {lab.module}
                        </div>
                      </div>
                      {/* Icon */}
                      <div style={{
                        width: 56, height: 56, borderRadius: 4,
                        background: 'rgba(255,255,255,0.45)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        {lab.icon(pal.deep)}
                      </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '18px 22px 20px' }}>
                      <p style={{
                        fontFamily: 'Newsreader, serif', fontSize: 14.5, lineHeight: 1.6,
                        color: t.inkSoft, margin: '0 0 16px', fontStyle: 'italic',
                      }}>
                        {lab.desc}
                      </p>

                      {/* Tags + meta row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {lab.tags.map(tag => (
                            <Tag key={tag} theme={theme}>{tag}</Tag>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: t.inkMuted }}>
                          {isReady ? (
                            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7aa86b', display: 'inline-block' }}/>
                              ready
                            </span>
                          ) : (
                            <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                              <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.inkMuted, display: 'inline-block' }}/>
                              queued
                            </span>
                          )}
                          <span style={{ color: t.ruleSoft }}>|</span>
                          <span>{lab.cells} cells</span>
                        </div>
                      </div>

                      {/* CTA */}
                      {isReady && (
                        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                          <div style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                            color: t.paper, background: t.ink,
                            padding: '7px 16px', borderRadius: 2,
                            transition: 'transform 0.15s',
                          }} className="group-hover:-translate-y-0.5">
                            RUN KERNEL →
                          </div>
                        </div>
                      )}
                      {!isReady && (
                        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
                          <div style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: 10.5, fontWeight: 600, letterSpacing: '0.08em',
                            color: t.inkMuted, border: `1px solid ${t.rule}`,
                            padding: '7px 16px', borderRadius: 2,
                          }}>
                            IN QUEUE
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* ── COMING SOON footer note ── */}
          <div style={{
            marginTop: 48,
            padding: '24px 28px',
            background: t.paperAlt,
            borderTop: `1px solid ${t.rule}`,
            borderRight: `1px solid ${t.rule}`,
            borderBottom: `1px solid ${t.rule}`,
            borderLeft: `4px solid ${t.accent}`,
            borderRadius: 4,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
          }}>
            <div>
              <Mono theme={theme}>§ NEXT</Mono>
              <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500, margin: '6px 0 6px', letterSpacing: '-0.01em' }}>
                More labs in the pipeline.
              </h3>
              <p style={{ fontSize: 13, color: t.inkSoft, margin: 0, lineHeight: 1.5 }}>
                Backprop visualizer · Diffusion forward process · Flash Attention tiling · Mixed-precision overflow
              </p>
            </div>
            <div style={{ fontFamily: 'var(--font-caveat), Caveat, cursive', fontSize: 20, color: t.inkMuted, maxWidth: 200, textAlign: 'right', lineHeight: 1.3 }}>
              suggest one in the Discord ↗
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
