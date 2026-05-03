'use client';

import React from 'react';
import { TOKENS, NavBar, Mono, Highlight, useTheme } from "@/components/ui/primitives";

export default function AnnotatedMachineBook() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif' }}>
      <NavBar theme={theme} active="minibook" />

      {/* SECTION 1: COVER */}
      <section style={{ 
        position: 'relative', 
        minHeight: 'calc(100vh - 65px)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        padding: '32px 64px 48px'
      }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Mono theme={theme} size={11}>VOLUME 01 · ESTABLISHED 2024</Mono>
          <Mono theme={theme} size={11}>ISSN 2937-0044</Mono>
        </div>

        {/* Center Title */}
        <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Newsreader, serif', letterSpacing: '0.4em', fontSize: 13, fontWeight: 500, marginBottom: 16, color: t.inkSoft }}>
            T H E &nbsp; A N N O T A T E D &nbsp; M A C H I N E
          </div>
          
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 140, lineHeight: 0.85, letterSpacing: '-0.04em', color: t.ink }}>
            <div style={{ fontStyle: 'italic', paddingRight: 40 }}>How</div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              networks
              <svg viewBox="0 0 200 40" preserveAspectRatio="none" style={{ position: 'absolute', bottom: -12, left: -20, right: -20, width: '110%', height: 32, zIndex: 0, pointerEvents: 'none' }}>
                <path d="M2 20 Q 100 16 198 22" stroke={t.accent} strokeWidth="18" fill="none" strokeLinecap="round" opacity="0.9"/>
              </svg>
            </div>
            <div style={{ fontStyle: 'italic', paddingLeft: 40, position: 'relative', zIndex: 1 }}>think.</div>
          </div>

          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: t.inkSoft, marginTop: 40, fontStyle: 'italic' }}>
            A book that <span style={{ textDecoration: 'underline', textUnderlineOffset: 4, textDecorationThickness: 1 }}>runs.</span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 48 }}>
            {['Math', 'Code', 'Notebooks', 'Kernels'].map(item => (
              <div key={item} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 3, height: 3, background: t.ink, borderRadius: '50%' }}></div>
                <Mono theme={theme} size={10}>{item}</Mono>
              </div>
            ))}
          </div>
          
          <button style={{ 
            background: t.accent, color: t.accentInk, 
            padding: '16px 28px', border: 'none', borderRadius: 2, 
            fontWeight: 700, fontSize: 12, letterSpacing: '0.08em',
            cursor: 'pointer', fontFamily: 'Inter, sans-serif'
          }}>
            OPEN THE BOOK →
          </button>
        </div>
      </section>

      {/* SECTION 2: SPECIMEN (PAGE-PROOF) */}
      <section style={{ background: t.paperAlt, padding: '100px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', borderTop: `1px solid ${t.rule}` }}>
        <div>
          <Mono theme={theme} size={11}>NO. 01 · A WORKING LIBRARY</Mono>
          <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 80, lineHeight: 0.9, letterSpacing: '-0.04em', margin: '24px 0 32px', color: t.ink }}>
            Read<br/>
            <span style={{ fontStyle: 'italic' }}>the</span><br/>
            machines.
          </h2>
          <p style={{ fontFamily: 'Newsreader, serif', fontSize: 20, lineHeight: 1.5, color: t.inkSoft, maxWidth: 420, marginBottom: 48 }}>
            A monthly journal of computation. Long-form chapters with embedded code, math that compiles, and notebooks you can <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ position: 'relative', zIndex: 1 }}>actually break.</span>
              <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: -2, right: -2, width: '100%', height: 10, zIndex: 0, pointerEvents: 'none' }}>
                <path d="M2 10 Q 50 14 98 8" stroke={t.accent} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8"/>
              </svg>
            </span>
          </p>

          <div style={{ display: 'flex', gap: 16 }}>
            <button style={{ background: t.ink, color: t.paper, padding: '16px 24px', border: 'none', borderRadius: 2, fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer' }}>
              BEGIN VOL. 01 →
            </button>
            <button style={{ background: 'transparent', color: t.ink, padding: '16px 24px', border: `1px solid ${t.ink}`, borderRadius: 2, fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', cursor: 'pointer' }}>
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Mock Specimen Card */}
        <div style={{ 
          background: t.panel, 
          padding: '40px 48px', 
          borderRadius: 4, 
          boxShadow: theme === 'dark' ? '0 20px 40px -10px rgba(0,0,0,0.5)' : '0 20px 40px -10px rgba(0,0,0,0.1)', 
          position: 'relative',
          transform: 'rotate(1deg)'
        }}>
          {/* Paperclip */}
          <svg width="24" height="48" viewBox="0 0 24 48" fill="none" style={{ position: 'absolute', top: -16, right: 32 }}>
            <path d="M12 40V12c0-3.3 2.7-6 6-6s6 2.7 6 6v24c0 5.5-4.5 10-10 10S4 35.5 4 30V10C4 5.6 7.6 2 12 2s8 3.6 8 8v22" stroke={t.inkMuted} strokeWidth="2" strokeLinecap="round"/>
          </svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <Mono theme={theme} size={10}>CH. 14 · ATTENTION</Mono>
            <Mono theme={theme} size={10}>p. 142</Mono>
          </div>

          <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, margin: '0 0 24px', letterSpacing: '-0.01em', color: t.ink }}>
            What the model is <span style={{ fontStyle: 'italic' }}>actually</span> looking at.
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontFamily: 'Newsreader, serif', fontSize: 14, lineHeight: 1.6, color: t.inkSoft }}>
            <p style={{ margin: 0 }}>
              Attention reframes a sequence as a graph. Every token sends a query to every other token, asks "how relevant are you?", and listens for the answer. The softmax ensures
            </p>
            <p style={{ margin: 0 }}>
              the listening is normalized — you cannot pay more attention than 100%, even if the input begs you to. What follows is a derivation that will fit on a napkin.
            </p>
          </div>

          <div style={{ 
            marginTop: 32, 
            background: theme === 'dark' ? '#0c0c10' : '#f8f5ec', 
            padding: '16px 20px', 
            borderRadius: 4, 
            fontFamily: 'JetBrains Mono, monospace', 
            fontSize: 12, 
            color: t.ink,
            border: `1px solid ${t.rule}`
          }}>
            <span style={{ color: t.inkMuted, marginRight: 8 }}>›</span>
            attention(q, k, v).heatmap() <span style={{ color: t.accent, marginLeft: 8 }}>↻ live</span>
          </div>
        </div>
      </section>
    </div>
  );
}
