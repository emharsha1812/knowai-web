'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { TOKENS, NavBar, Mono, Tag, useTheme } from '@/components/ui/primitives';
import { getWatchNote, type WatchNoteDetail, type WatchNoteSection } from '@/lib/api';
import { useRequireAuth } from '@/lib/use-require-auth';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

function NoteSection({ section, index, isActive, theme }: {
  section: WatchNoteSection;
  index: number;
  isActive: boolean;
  theme: string;
}) {
  const t = TOKENS[theme as keyof typeof TOKENS] as any;
  return (
    <div style={{ marginBottom: 36, scrollMarginTop: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <Mono theme={theme}>{section.label}</Mono>
        <span style={{
          fontFamily: 'JetBrains Mono', fontSize: 11,
          background: t.accent, color: t.accentInk,
          padding: '2px 7px', borderRadius: 2, fontWeight: 600,
        }}>▶ {section.ts}</span>
      </div>
      <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500, margin: '0 0 12px', letterSpacing: '-0.01em', color: t.ink }}>
        {section.heading}
      </h3>
      <div style={{ color: t.inkSoft, fontFamily: 'Newsreader, serif', fontSize: 16.5, lineHeight: 1.7 }}>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({ children }) => <p style={{ margin: '0 0 12px' }}>{children}</p>,
            em: ({ children }) => <em>{children}</em>,
            strong: ({ children }) => <strong style={{ color: t.ink }}>{children}</strong>,
            blockquote: ({ children }) => (
              <div style={{ background: t.paperAlt, border: `1px dashed ${t.rule}`, padding: '12px 14px', borderRadius: 3, margin: '10px 0', fontSize: 14 }}>
                {children}
              </div>
            ),
            code: ({ children }) => (
              <code style={{ fontFamily: 'JetBrains Mono', fontSize: 13, background: t.paperAlt, padding: '2px 5px', borderRadius: 2 }}>{children}</code>
            ),
            img: ({ src, alt }) => (
              <img src={src} alt={alt} style={{ maxWidth: '100%', borderRadius: 4, margin: '12px 0', display: 'block' }} />
            ),
          }}
        >
          {section.body_md}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default function WatchNoteReader() {
  useRequireAuth();
  const { slug } = useParams<{ slug: string }>();
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;
  const [note, setNote] = useState<WatchNoteDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [videoStartSec, setVideoStartSec] = useState<number | null>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  async function downloadPdf() {
    if (!slug || generatingPdf) return;
    setGeneratingPdf(true);
    try {
      const res = await fetch(`/api/pdf/${slug}`);
      if (!res.ok) throw new Error('generation failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `watch-notes-${slug}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert('PDF generation failed. Please try again.');
    } finally {
      setGeneratingPdf(false);
    }
  }

  useEffect(() => {
    if (!slug) return;
    getWatchNote(slug)
      .then(setNote)
      .catch(() => setNote(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Mono theme={theme}>Loading…</Mono>
      </div>
    );
  }

  if (!note) {
    return (
      <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', padding: '80px', textAlign: 'center' }}>
        <Mono theme={theme}>Note not found.</Mono>
        <div style={{ marginTop: 16 }}>
          <Link href="/watch-notes" style={{ color: t.inkSoft, fontFamily: 'JetBrains Mono', fontSize: 12 }}>← Back to Watch Notes</Link>
        </div>
      </div>
    );
  }

  const pal = (TOKENS.pastels as any)[note.color] ?? TOKENS.pastels.lavender;
  const sections = note.sections ?? [];

  function tsToSeconds(ts: string): number {
    const parts = ts.split(':').map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return parts[0] * 60 + (parts[1] ?? 0);
  }

  const iframeSrc = videoStartSec === null
    ? `https://www.youtube.com/embed/${note.youtube_video_id}`
    : `https://www.youtube.com/embed/${note.youtube_video_id}?start=${videoStartSec}&autoplay=1`;

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280 }}>
        <NavBar theme={theme} active="watch-notes" />

        {/* header / breadcrumb + title */}
        <div style={{ padding: '32px 80px 24px', borderBottom: `1px solid ${t.rule}` }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12, fontSize: 12, color: t.inkSoft }}>
            <Link href="/watch-notes" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Mono theme={theme}>WATCH-NOTES</Mono>
            </Link>
            <span>›</span>
            <span>{note.tag}</span>
            <span>›</span>
            <span style={{ color: t.ink, fontWeight: 500 }}>{note.channel} · {note.title.slice(0, 40)}{note.title.length > 40 ? '…' : ''}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'end' }}>
            <div>
              <Mono theme={theme}>{note.duration} · {note.channel.toUpperCase()} · {note.note_count} NOTES · {note.page_count} PAGES</Mono>
              <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 46, fontWeight: 400, margin: '8px 0 0', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
                <em>{note.title}</em>
              </h1>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap', alignItems: 'center' }}>
              <Tag theme={theme}>{note.tag}</Tag>
              {note.watched_ratio >= 1 && <Tag theme={theme} accent>✓ complete</Tag>}
              <button
                onClick={downloadPdf}
                disabled={generatingPdf}
                style={{ background: t.ink, color: t.paper, padding: '8px 14px', border: 'none', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', cursor: generatingPdf ? 'wait' : 'pointer', opacity: generatingPdf ? 0.6 : 1 }}
              >
                {generatingPdf ? '⏳ GENERATING…' : '↓ DOWNLOAD PDF'}
              </button>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN: sticky player / scrolling notes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', minHeight: 900 }}>

          {/* LEFT — player + chapter list (sticky) */}
          <div style={{ borderRight: `1px solid ${t.rule}`, background: t.paperAlt, padding: '28px 32px', position: 'relative' }}>
            <div style={{ position: 'sticky', top: 24 }}>
              {/* YouTube embed */}
              <div style={{
                background: '#0d1b2a', borderRadius: 4, overflow: 'hidden',
                aspectRatio: '16 / 9', position: 'relative',
                boxShadow: theme === 'dark' ? '0 14px 36px -14px rgba(0,0,0,0.7)' : '0 14px 36px -14px rgba(0,0,0,0.45)',
              }}>
                <iframe
                  key={iframeSrc}
                  src={iframeSrc}
                  title={note.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>

              {/* under-player meta */}
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: t.inkMuted, letterSpacing: '0.04em' }}>{note.channel.toUpperCase()} · YOUTUBE.COM</div>
                  {note.author && (
                    <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 14, color: t.inkSoft, marginTop: 4 }}>
                      {note.author}
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <a href={`https://youtube.com/watch?v=${note.youtube_video_id}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <button style={{ background: t.paper, color: t.ink, border: `1px solid ${t.rule}`, padding: '7px 12px', borderRadius: 2, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', cursor: 'pointer' }}>
                      ↗ ON YT
                    </button>
                  </a>
                </div>
              </div>

              {/* chapter list */}
              {sections.length > 0 && (
                <div style={{ marginTop: 24 }}>
                  <Mono theme={theme}>CHAPTERS · CLICK TO JUMP</Mono>
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column' }}>
                    {sections.map((s, i) => {
                      const isActive = i === activeSection;
                      return (
                        <button key={s.ts} onClick={() => { setActiveSection(i); setVideoStartSec(tsToSeconds(s.ts)); }} style={{
                          display: 'grid', gridTemplateColumns: '54px 1fr',
                          padding: '8px 12px', borderRadius: 3, cursor: 'pointer',
                          background: isActive ? (theme === 'dark' ? '#22222a' : '#f0ebd9') : 'transparent',
                          borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                          borderLeft: `2px solid ${isActive ? t.accent : 'transparent'}`,
                          textAlign: 'left', width: '100%',
                          fontSize: 13,
                        }}>
                          <span style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: isActive ? t.ink : t.inkMuted, fontWeight: isActive ? 600 : 400 }}>
                            {s.ts}
                          </span>
                          <span style={{ color: isActive ? t.ink : t.inkSoft, fontWeight: isActive ? 500 : 400 }}>
                            {s.heading.length > 44 ? s.heading.slice(0, 44) + '…' : s.heading}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* download card */}
              <div style={{ marginTop: 26, padding: 16, background: pal.bg, color: pal.text, borderRadius: 4 }}>
                <Mono theme="light"><span style={{ color: pal.text, opacity: 0.7 }}>NOTES · {note.page_count} PAGES · {note.note_count} ANNOTATIONS</span></Mono>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 17, fontWeight: 500, marginTop: 4, lineHeight: 1.25 }}>
                  Read offline. Print it. Mark it up.
                </div>
                <button
                  onClick={downloadPdf}
                  disabled={generatingPdf}
                  style={{ background: pal.text, color: pal.bg, border: 'none', padding: '9px 14px', borderRadius: 2, fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', marginTop: 12, cursor: generatingPdf ? 'wait' : 'pointer', opacity: generatingPdf ? 0.6 : 1 }}
                >
                  {generatingPdf ? '⏳ GENERATING…' : '↓ DOWNLOAD PDF'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — pre-written notes, scrolling */}
          <div style={{ padding: '32px 56px 56px', maxWidth: 720 }}>
            {/* masthead */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${t.ink}`, paddingBottom: 8, marginBottom: 20 }}>
              <Mono theme={theme}>§ NOTES · {note.channel.toUpperCase()}</Mono>
              <Mono theme={theme}>p. 1 / {note.page_count}</Mono>
            </div>

            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 16.5, lineHeight: 1.7, color: t.ink }}>
              <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.015em' }}>
                On watching this <em>three times.</em>
              </h2>
              <p style={{ color: t.inkSoft, fontSize: 15, fontStyle: 'italic', margin: '0 0 24px' }}>
                The first time I watched this, I thought I understood it. I didn&apos;t.
                The second time taught me what I&apos;d missed. These are the notes from
                the third pass — when the ideas finally felt simple.
              </p>

              {sections.map((s, i) => (
                <NoteSection key={s.ts} section={s} index={i} isActive={i === activeSection} theme={theme} />
              ))}

              {sections.length === 0 && (
                <div style={{ color: t.inkMuted, fontStyle: 'italic', fontSize: 15, textAlign: 'center', padding: '40px 0' }}>
                  Notes coming soon — check back after the third viewing.
                </div>
              )}

              {/* margin note at the end */}
              {sections.length > 0 && (
                <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px dashed ${t.rule}`, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, color: t.inkSoft, transform: 'rotate(-1deg)', flex: 1 }}>
                    {note.last_note ?? 'the thing that matters is the thing you wrote down on the third pass.'}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: t.inkMuted, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                    ✎ {note.duration} · end
                  </div>
                </div>
              )}

              {/* paper footer */}
              <div style={{ marginTop: 56, paddingTop: 18, borderTop: `1px solid ${t.rule}`, display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.inkMuted, fontFamily: 'JetBrains Mono', letterSpacing: '0.04em' }}>
                <span>KNOWAI · WATCH-NOTES</span>
                <span>{note.channel.toUpperCase().slice(0, 12)}</span>
                <span>p. {note.page_count} / {note.page_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
