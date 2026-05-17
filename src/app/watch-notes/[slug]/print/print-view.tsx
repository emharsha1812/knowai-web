'use client';

import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import type { WatchNoteDetail, WatchNoteSection } from '@/lib/api';

function PrintSection({ section, index }: { section: WatchNoteSection; index: number }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
        paddingTop: index > 0 ? 20 : 0,
        borderTop: index > 0 ? '1px solid #e2dfd6' : 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", monospace',
          fontSize: 10,
          background: '#f2efe8',
          color: '#666',
          padding: '2px 8px',
          borderRadius: 2,
          letterSpacing: '0.04em',
        }}>▶ {section.ts}</span>
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono), "JetBrains Mono", monospace',
          fontSize: 10,
          color: '#aaa',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>{section.label}</span>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-lora), Georgia, serif',
        fontSize: 20,
        fontWeight: 500,
        margin: '0 0 10px',
        letterSpacing: '-0.01em',
        color: '#111',
        lineHeight: 1.3,
        pageBreakAfter: 'avoid',
      }}>
        {section.heading}
      </h2>

      <div style={{
        fontFamily: 'var(--font-lora), Georgia, serif',
        fontSize: 15.5,
        lineHeight: 1.78,
        color: '#333',
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            p: ({ children }) => <p style={{ margin: '0 0 8px' }}>{children}</p>,
            strong: ({ children }) => <strong style={{ color: '#111' }}>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            code: ({ children }) => (
              <code style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 13,
                background: '#f2efe8',
                padding: '2px 5px',
                borderRadius: 2,
              }}>{children}</code>
            ),
            pre: ({ children }) => (
              <pre style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace',
                fontSize: 13,
                background: '#f2efe8',
                padding: '14px 18px',
                borderRadius: 4,
                overflowX: 'auto',
                margin: '14px 0',
              }}>{children}</pre>
            ),
            blockquote: ({ children }) => (
              <div style={{
                borderLeft: '3px solid #ccc',
                paddingLeft: 16,
                margin: '14px 0',
                color: '#666',
                fontStyle: 'italic',
              }}>{children}</div>
            ),
            ul: ({ children }) => <ul style={{ paddingLeft: 22, margin: '8px 0' }}>{children}</ul>,
            ol: ({ children }) => <ol style={{ paddingLeft: 22, margin: '8px 0' }}>{children}</ol>,
            li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
            img: ({ src, alt }) => (
              <img src={src} alt={alt} style={{ maxWidth: '100%', borderRadius: 4, margin: '10px 0', display: 'block', pageBreakInside: 'avoid' }} />
            ),
          }}
        >
          {section.body_md}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default function PrintView({ note }: { note: WatchNoteDetail }) {
  const sections = note.sections ?? [];

  return (
    <>
    <style>{`
      .katex-display { margin: 0.5em 0 !important; }
      .katex-display > .katex { padding: 0 !important; }
      p { orphans: 3; widows: 3; }
    `}</style>
    <div style={{ background: '#fff', minHeight: '100vh', color: '#111' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '48px 24px 72px' }}>

        {/* Header */}
        <div style={{ marginBottom: 24, paddingBottom: 18, borderBottom: '2px solid #111' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
            <span style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 10,
              color: '#999',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>KNOWAI · WATCH-NOTES</span>
            <span style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace',
              fontSize: 10,
              color: '#888',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: '1px solid #ccc',
              padding: '2px 8px',
              borderRadius: 2,
            }}>{note.tag}</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontSize: 40,
            fontWeight: 400,
            margin: '0 0 16px',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontStyle: 'italic',
            color: '#111',
          }}>{note.title}</h1>

          <div style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 11,
            color: '#777',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {note.channel}
            {note.author ? ` · ${note.author}` : ''}
            {` · ${note.duration}`}
            {` · ${note.note_count} notes · ${sections.length} sections`}
          </div>
        </div>

        {/* Sections */}
        {sections.map((section, i) => (
          <PrintSection key={section.ts + i} section={section} index={i} />
        ))}

        {sections.length === 0 && (
          <p style={{ color: '#999', fontStyle: 'italic', textAlign: 'center', padding: '40px 0' }}>
            No notes yet.
          </p>
        )}

        {/* Footer */}
        {sections.length > 0 && (
          <div style={{
            marginTop: 60,
            paddingTop: 16,
            borderTop: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: 10,
            color: '#bbb',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            <span>KNOWAI · WATCH-NOTES</span>
            <span>{note.channel}</span>
            <span>{note.duration} · {note.page_count} pages</span>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
