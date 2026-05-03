'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TOKENS, NavBar, Mono, useTheme } from "@/components/ui/primitives";
import { motion } from 'framer-motion';
import { getCourses, type CourseSummary } from '@/lib/api';
import { useRequireAuth } from '@/lib/use-require-auth';

const CARD_COLORS = ['butter', 'sage', 'sky', 'lavender', 'rose', 'mint'] as const;

export default function CoursesIndex() {
  useRequireAuth();
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourses()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
        <NavBar theme={theme} active="courses" />

        <div style={{ padding: '80px 80px 40px', maxWidth: 800 }}>
          <Mono theme={theme}>§ COURSES & CURRICULA</Mono>
          <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 64, fontWeight: 400, margin: '24px 0 16px', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
            Structured paths to<br /><em>mastery.</em>
          </h1>
          <p style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: t.inkSoft, lineHeight: 1.5 }}>
            Comprehensive, multi-week programs designed to build intuition from the ground up.
          </p>
        </div>

        <div style={{ padding: '20px 80px 100px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: t.inkMuted }}>
              <Mono theme={theme}>Loading...</Mono>
            </div>
          )}

          {!loading && courses.map((course, index) => {
            const isComingSoon = !course.is_published;
            const color = CARD_COLORS[index % CARD_COLORS.length];
            const pal = TOKENS.pastels[color as keyof typeof TOKENS.pastels];
            const id = String(index + 1).padStart(2, '0');

            const cardContent = (
              <div style={{
                background: t.paperAlt,
                border: `1px solid ${t.rule}`,
                borderRadius: 12,
                padding: 48,
                display: 'grid',
                gridTemplateColumns: '1fr 240px',
                gap: 64,
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s',
                opacity: isComingSoon ? 0.75 : 1,
                cursor: isComingSoon ? 'default' : 'pointer',
              }}
              className={isComingSoon ? '' : `group-hover:-translate-y-1 group-hover:shadow-xl ${theme === 'dark' ? 'group-hover:shadow-white/5' : ''}`}
              >
                <div style={{
                  position: 'absolute', top: -100, right: -100, width: 300, height: 300,
                  background: pal.bg, borderRadius: '50%', filter: 'blur(60px)',
                  opacity: theme === 'dark' ? 0.1 : 0.4,
                  zIndex: 0, pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 18, background: pal.bg, color: pal.text,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'Newsreader, serif', fontSize: 18, fontStyle: 'italic', fontWeight: 600,
                    }}>{id}</span>
                    <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', color: t.inkMuted, textTransform: 'uppercase', margin: 0 }}>
                      {course.title}
                    </h2>
                  </div>

                  <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 42, fontWeight: 400, margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', fontStyle: 'italic', color: t.ink }}>
                    {course.subtitle ?? course.title}
                  </h3>

                  {course.tags && course.tags.length > 0 && (
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {course.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: 10, fontFamily: 'JetBrains Mono', color: pal.text,
                          background: pal.bg, padding: '4px 8px', borderRadius: 4,
                          textTransform: 'uppercase', fontWeight: 600,
                        }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stats box */}
                <div style={{
                  position: 'relative', zIndex: 1,
                  display: 'flex', flexDirection: 'column', gap: 16,
                  borderLeft: `1px dashed ${t.ruleSoft}`, paddingLeft: 48,
                }}>
                  {course.estimated_hours != null && (
                    <div>
                      <Mono theme={theme}>DURATION</Mono>
                      <div style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, color: t.ink, marginTop: 4 }}>
                        {course.estimated_hours} <span style={{ fontSize: 16, color: t.inkSoft, fontStyle: 'italic' }}>hrs</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <Mono theme={theme}>LEVEL</Mono>
                    <div style={{ fontFamily: 'Newsreader, serif', fontSize: 20, fontWeight: 500, color: t.ink, marginTop: 4, textTransform: 'capitalize' }}>
                      {course.difficulty}
                    </div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    {isComingSoon ? (
                      <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
                        fontFamily: 'JetBrains Mono, monospace',
                        color: t.inkMuted, border: `1.5px dashed ${t.rule}`,
                        padding: '10px 20px', borderRadius: 4, display: 'inline-block',
                      }}>COMING SOON</span>
                    ) : (
                      <span style={{
                        fontSize: 12, fontWeight: 600, color: t.accentInk, letterSpacing: '0.05em',
                        background: t.accent, padding: '10px 20px', borderRadius: 4, display: 'inline-block',
                      }}>VIEW SYLLABUS →</span>
                    )}
                  </div>
                </div>
              </div>
            );

            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
              >
                {isComingSoon ? (
                  cardContent
                ) : (
                  <Link href={`/courses/${course.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} className="group">
                    {cardContent}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
