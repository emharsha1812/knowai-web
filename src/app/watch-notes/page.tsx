'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TOKENS, NavBar, Mono, Highlight, Tag, useTheme } from '@/components/ui/primitives';
import { getWatchNotes, type WatchNoteSummary } from '@/lib/api';
import { useRequireAuth } from '@/lib/use-require-auth';

const ALL_TAGS = ['All', 'Transformers', 'Fundamentals', 'Generative', 'RL', 'Systems', 'Vision', 'Interp', 'Architectures'];

function ThumbnailSVG({ tag }: { tag: string }) {
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: 'block', position: 'absolute', inset: 0 }}>
      {tag === 'Transformers' && (
        <>
          {Array.from({ length: 8 }).map((_, i) =>
            Array.from({ length: 8 }).map((_, j) => (
              <rect key={`${i}-${j}`} x={80 + i * 16} y={30 + j * 12} width="14" height="10"
                fill={`rgba(244,197,66,${0.1 + ((i * j) % 6) * 0.12})`} />
            ))
          )}
        </>
      )}
      {tag === 'Fundamentals' && (
        <>
          <circle cx="80" cy="90" r="6" fill="#f4c542" />
          <circle cx="160" cy="60" r="6" fill="#f4c542" />
          <circle cx="160" cy="120" r="6" fill="#f4c542" />
          <circle cx="240" cy="90" r="6" fill="#f4c542" />
          <line x1="80" y1="90" x2="160" y2="60" stroke="#86857f" strokeWidth="1" />
          <line x1="80" y1="90" x2="160" y2="120" stroke="#86857f" strokeWidth="1" />
          <line x1="160" y1="60" x2="240" y2="90" stroke="#86857f" strokeWidth="1" />
          <line x1="160" y1="120" x2="240" y2="90" stroke="#86857f" strokeWidth="1" />
        </>
      )}
      {tag === 'Generative' && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx={50 + i * 55} cy="90" r={30 - i * 5}
              stroke="#f4c542" strokeWidth="1.5" fill="none" opacity={1 - i * 0.18} />
          ))}
        </>
      )}
      {tag === 'RL' && (
        <>
          <rect x="60" y="60" width="60" height="60" stroke="#f4c542" strokeWidth="1.5" fill="none" />
          <rect x="200" y="60" width="60" height="60" stroke="#86857f" strokeWidth="1.5" fill="none" />
          <path d="M120 90 L200 90" stroke="#f4c542" strokeWidth="1.5" />
          <path d="M195 85 L200 90 L195 95" stroke="#f4c542" strokeWidth="1.5" fill="none" />
          <path d="M200 60 Q160 30 120 60" stroke="#86857f" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        </>
      )}
      {tag === 'Systems' && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={i} x={50 + i * 40} y="50" width="32" height="80" stroke="#f4c542" strokeWidth="1.2" fill="none" />
          ))}
        </>
      )}
      {tag === 'Vision' && (
        <>
          {Array.from({ length: 4 }).map((_, i) => (
            <rect key={i} x={70 + i * 38} y={50 + i * 8} width="80" height="60"
              stroke="#f4c542" strokeWidth="1.2" fill="none" opacity={1 - i * 0.18} />
          ))}
        </>
      )}
      {tag === 'Interp' && (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={50 + i * 20} y1={40} x2={50 + i * 20} y2={140}
              stroke="#f4c542" strokeWidth="1" opacity={0.3 + (i % 3) * 0.25} />
          ))}
        </>
      )}
      {tag === 'Architectures' && (
        <>
          <path d="M40 90 Q 80 40, 120 90 T 200 90 T 280 90" stroke="#f4c542" strokeWidth="1.8" fill="none" />
          <path d="M40 90 Q 80 140, 120 90 T 200 90 T 280 90" stroke="#86857f" strokeWidth="1" fill="none" />
        </>
      )}
    </svg>
  );
}

export default function WatchNotesIndex() {
  useRequireAuth();
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;
  const [videos, setVideos] = useState<WatchNoteSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    getWatchNotes()
      .then(setVideos)
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = videos.find(v => v.is_featured) ?? videos[0];
  const filtered = activeTag === 'All'
    ? videos.filter(v => v.id !== featured?.id)
    : videos.filter(v => v.tag === activeTag && v.id !== featured?.id);

  const totalNotes = videos.reduce((s, v) => s + v.note_count, 0);
  const totalPages = videos.reduce((s, v) => s + v.page_count, 0);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
        <NavBar theme={theme} active="watch-notes" />

        {/* hero */}
        <div style={{ padding: '60px 80px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 64, alignItems: 'end' }}>
            <div>
              <Mono theme={theme}>§ WATCH-NOTES · {videos.length} VIDEOS · {totalNotes} NOTES</Mono>
              <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 64, fontWeight: 400, margin: '14px 0 0', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
                Watch the lecture.<br />Read <Highlight theme={theme}><em>my</em> notes.</Highlight>
              </h1>
              <p style={{ fontFamily: 'Newsreader, serif', fontSize: 18, color: t.inkSoft, marginTop: 18, fontWeight: 300, maxWidth: 600, lineHeight: 1.5 }}>
                A working library of YouTube lectures I&apos;ve already taken notes on —
                so you can <em>watch</em> instead of scribble. Pre-written notes
                alongside the video, downloadable as PDF.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              {[
                { k: 'videos', v: String(videos.length) },
                { k: 'pages of notes', v: String(totalPages) },
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
            {ALL_TAGS.map((d) => (
              <button key={d} onClick={() => setActiveTag(d)} style={{
                padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                background: activeTag === d ? t.ink : 'transparent',
                color: activeTag === d ? t.paper : t.inkSoft,
                border: `1px solid ${activeTag === d ? t.ink : t.rule}`,
              }}>{d}</button>
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

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: t.inkMuted }}>
            <Mono theme={theme}>Loading…</Mono>
          </div>
        )}

        {!loading && featured && (
          <>
            {/* featured */}
            <div style={{ padding: '32px 80px' }}>
              <Mono theme={theme}>§ FEATURED · MOST RE-READ</Mono>
              <Link href={`/watch-notes/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', marginTop: 12 }}>
                <div style={{
                  background: (TOKENS.pastels as any)[featured.color]?.bg ?? TOKENS.pastels.lavender.bg,
                  color: (TOKENS.pastels as any)[featured.color]?.text ?? TOKENS.pastels.lavender.text,
                  borderRadius: 6, padding: 32,
                  display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 36, alignItems: 'center',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {/* faux player thumbnail */}
                  <div style={{
                    background: featured.thumb_bg, color: '#fff', borderRadius: 4,
                    aspectRatio: '16 / 9', position: 'relative', overflow: 'hidden',
                    boxShadow: '0 14px 36px -14px rgba(0,0,0,0.45)',
                  }}>
                    <svg viewBox="0 0 320 180" width="100%" height="100%" style={{ display: 'block' }}>
                      <defs>
                        <linearGradient id="featGrad" x1="0" x2="1">
                          <stop offset="0" stopColor="#1d3050" />
                          <stop offset="1" stopColor="#0d1b2a" />
                        </linearGradient>
                      </defs>
                      <rect width="320" height="180" fill="url(#featGrad)" />
                      {Array.from({ length: 6 }).map((_, i) => (
                        <g key={i} transform={`translate(${40 + i * 40}, 40)`}>
                          {Array.from({ length: 5 }).map((_, j) => (
                            <rect key={j} x="0" y={j * 5} width="24" height="3"
                              fill={`rgba(244,197,66,${0.2 + (i * j) % 5 * 0.15})`} />
                          ))}
                        </g>
                      ))}
                      <text x="160" y="138" fontFamily="Newsreader, serif" fontSize="22" fill="#f1efe7" textAnchor="middle">
                        {featured.title.toLowerCase()}
                      </text>
                      <text x="160" y="160" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#86857f" textAnchor="middle" letterSpacing="2">
                        {featured.channel.toUpperCase()} · {featured.duration}
                      </text>
                    </svg>
                    {/* play button */}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 76, height: 76, borderRadius: 999, background: 'rgba(244,197,66,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.4)' }}>
                        <div style={{ width: 0, height: 0, borderLeft: '22px solid #0e0e10', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: 5 }} />
                      </div>
                    </div>
                    <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.85)', color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 11, padding: '2px 6px', borderRadius: 2 }}>
                      {featured.duration}
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                      <Mono theme="light"><span style={{ opacity: 0.7 }}>{featured.channel}</span></Mono>
                      <span style={{ background: 'rgba(0,0,0,0.15)', padding: '3px 9px', borderRadius: 999, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>{featured.tag}</span>
                    </div>
                    <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 36, fontWeight: 500, margin: 0, lineHeight: 1.1, letterSpacing: '-0.015em' }}>
                      {featured.title}
                    </h2>
                    <p style={{ fontFamily: 'Newsreader, serif', fontSize: 16, fontStyle: 'italic', marginTop: 12, opacity: 0.85, maxWidth: 460 }}>
                      {featured.last_note}
                    </p>
                    <div style={{ display: 'flex', gap: 22, marginTop: 22, fontSize: 12, opacity: 0.85, fontFamily: 'JetBrains Mono' }}>
                      <span>▶ {featured.duration}</span>
                      <span>✎ {featured.note_count} notes</span>
                      <span>📄 {featured.page_count} pages</span>
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 28, alignItems: 'center' }}>
                      <button style={{
                        background: (TOKENS.pastels as any)[featured.color]?.text ?? '#1a1a1a',
                        color: (TOKENS.pastels as any)[featured.color]?.bg ?? '#fff',
                        border: 'none', padding: '11px 18px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
                      }}>OPEN ↗</button>
                      <button style={{
                        background: 'transparent',
                        color: (TOKENS.pastels as any)[featured.color]?.text ?? '#1a1a1a',
                        border: `1px solid ${(TOKENS.pastels as any)[featured.color]?.text ?? '#1a1a1a'}`,
                        padding: '10px 16px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', cursor: 'pointer',
                      }}>↓ PDF</button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* the library */}
            <div style={{ padding: '0 80px 64px' }}>
              <Mono theme={theme}>§ THE LIBRARY</Mono>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 14 }}>
                {filtered.map(v => {
                  const pal = (TOKENS.pastels as any)[v.color] ?? TOKENS.pastels.lavender;
                  return (
                    <Link key={v.id} href={`/watch-notes/${v.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{
                        background: t.paper, border: `1px solid ${t.rule}`, borderRadius: 4,
                        display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%',
                      }}>
                        {/* thumbnail */}
                        <div style={{
                          background: v.thumb_bg,
                          aspectRatio: '16 / 9', position: 'relative',
                          borderBottom: `1px solid ${t.rule}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <ThumbnailSVG tag={v.tag} />

                          {/* play overlay */}
                          <div style={{
                            width: 48, height: 48, borderRadius: 999,
                            background: 'rgba(244,197,66,0.92)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative', zIndex: 1,
                            boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                          }}>
                            <div style={{ width: 0, height: 0, borderLeft: '13px solid #0e0e10', borderTop: '8px solid transparent', borderBottom: '8px solid transparent', marginLeft: 3 }} />
                          </div>

                          {/* duration badge */}
                          <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)', color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '2px 5px', borderRadius: 2 }}>
                            {v.duration}
                          </div>
                          {/* progress bar */}
                          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'rgba(255,255,255,0.15)' }}>
                            <div style={{ width: `${v.watched_ratio * 100}%`, height: '100%', background: '#f4c542' }} />
                          </div>
                          {/* note count bookmark */}
                          <div style={{
                            position: 'absolute', top: 0, left: 0,
                            background: pal.bg, color: pal.text,
                            padding: '4px 9px', fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em',
                          }}>
                            ✎ {v.note_count}
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
                            {v.last_note}
                          </p>
                          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: `1px dashed ${t.ruleSoft}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: t.inkMuted, fontFamily: 'JetBrains Mono' }}>
                            <span>{v.page_count} p</span>
                            <span style={{ display: 'inline-flex', gap: 8 }}>
                              <span>↓ PDF</span>
                              <span style={{ color: t.ink, fontWeight: 600 }}>OPEN →</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
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
          </>
        )}
      </div>
    </div>
  );
}
