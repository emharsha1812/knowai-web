'use client';

import React from 'react';
import Link from 'next/link';
import { TOKENS, NavBar, Mono, useTheme } from "@/components/ui/primitives";

export default function MinibookIndex() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;

  const books = [
    {
      vol: '01',
      title: 'The Annotated Machine',
      subtitle: 'How networks think.',
      desc: 'A line-by-line reading of modern neural architectures, with code that actually runs in the margin.',
      slug: 'annotated-machine',
      color: 'butter',
    },
    {
      vol: '02',
      title: 'Calculus for the Curious',
      subtitle: 'Optimization from the ground up.',
      desc: 'The math you skipped, visualized. We rebuild backprop without leaving the browser.',
      slug: 'calculus',
      color: 'sage',
    },
    {
      vol: '03',
      title: 'Probability & Entropy',
      subtitle: 'Information theory from scratch.',
      desc: 'KL divergence, cross-entropy, and the thermodynamic origins of machine learning.',
      slug: 'probability',
      color: 'rose',
    },
    {
      vol: '04',
      title: 'The GPU Handbook',
      subtitle: 'Silicon and speed.',
      desc: 'Why matrix multiplication is fast, and how to write kernels that do not waste memory bandwidth.',
      slug: 'gpu-handbook',
      color: 'sky',
    }
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
        <NavBar theme={theme} active="minibook" />

        {/* Hero */}
        <div style={{ padding: '80px 80px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Mono theme={theme}>§ THE MINIBOOK LIBRARY</Mono>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 64, fontWeight: 400, margin: '24px 0 16px', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
            Volumes of <em>knowledge.</em>
          </h1>
          <p style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: t.inkSoft, maxWidth: 580, lineHeight: 1.5 }}>
            Long-form interactive books on computation and intelligence. 
            Code that runs, math that compiles, and explanations that don't skip steps.
          </p>
        </div>

        {/* Bookshelf */}
        <div style={{ padding: '40px 80px 80px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 48 }}>
          {books.map((book) => {
            const pal = TOKENS.pastels[book.color as keyof typeof TOKENS.pastels];
            return (
              <Link href={`/minibook/${book.slug}`} key={book.slug} style={{ textDecoration: 'none', color: 'inherit' }} className="group">
                <div style={{
                  display: 'flex',
                  background: t.paperAlt,
                  border: `1px solid ${t.rule}`,
                  borderRadius: 6,
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                className={`group-hover:-translate-y-1 group-hover:shadow-lg ${theme === 'dark' ? 'group-hover:shadow-white/5' : ''}`}
                >
                  {/* Book Spine */}
                  <div style={{ 
                    width: 60, 
                    background: pal.bg, 
                    borderRight: `1px solid ${t.rule}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '24px 0',
                    color: pal.text
                  }}>
                    <Mono theme="light"><span style={{ color: pal.text }}>VOL</span></Mono>
                    <div style={{ fontFamily: 'Newsreader, serif', fontSize: 24, fontWeight: 600, marginTop: 4 }}>{book.vol}</div>
                  </div>

                  {/* Book Cover/Details */}
                  <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontFamily: 'Newsreader, serif', letterSpacing: '0.1em', fontSize: 11, fontWeight: 600, color: t.inkMuted, marginBottom: 12, textTransform: 'uppercase' }}>
                      {book.title}
                    </div>
                    <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 32, fontWeight: 400, margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontStyle: 'italic', color: t.ink }}>
                      {book.subtitle}
                    </h2>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, color: t.inkSoft, margin: 0 }}>
                      {book.desc}
                    </p>
                    <div style={{ marginTop: 24 }}>
                      <span style={{ 
                        fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', color: t.accentInk,
                        background: t.accent, padding: '6px 12px', borderRadius: 2
                      }}>
                        OPEN BOOK →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
