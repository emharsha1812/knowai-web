'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TOKENS, NavBar, Mono, useTheme } from "@/components/ui/primitives";
import { motion, AnimatePresence } from 'framer-motion';
import { getBlogs, type BlogPost } from '@/lib/api';

const CARD_COLORS = ['lavender', 'butter', 'rose', 'sky', 'sage', 'mint'] as const;

function formatDate(iso: string) {
  return new Date(iso)
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    .toUpperCase();
}

export default function BlogIndex() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [readPosts, setReadPosts] = useState<Record<string, boolean>>({});
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsSignedIn(localStorage.getItem('veridic-auth') === 'true');
    const storedReads = localStorage.getItem('veridic-read-posts');
    if (storedReads) {
      try { setReadPosts(JSON.parse(storedReads)); } catch (e) {}
    }
  }, []);

  useEffect(() => {
    getBlogs()
      .then(data => setPosts(data.filter(p => p.is_published)))
      .catch(() => setError('Failed to load posts.'))
      .finally(() => setLoading(false));
  }, []);

  const toggleRead = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    const newReads = { ...readPosts, [slug]: !readPosts[slug] };
    setReadPosts(newReads);
    localStorage.setItem('veridic-read-posts', JSON.stringify(newReads));
  };

  const visiblePosts = posts.filter(post => !showUnreadOnly || !readPosts[post.slug]);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: t.paper, color: t.ink, fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 1280, position: 'relative' }}>
        <NavBar theme={theme} active="writing" />

        <div style={{ padding: '80px 80px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ maxWidth: 800 }}>
            <Mono theme={theme}>§ WRITING & ESSAYS</Mono>
            <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 64, fontWeight: 400, margin: '24px 0 16px', lineHeight: 1.0, letterSpacing: '-0.025em' }}>
              Notes on building<br/><em>intelligence.</em>
            </h1>
            <p style={{ fontFamily: 'Newsreader, serif', fontSize: 20, color: t.inkSoft, lineHeight: 1.5 }}>
              Derivations, intuitions, and long-form thoughts on machine learning architectures.
            </p>
          </div>

          {isSignedIn && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: t.paperAlt, padding: '12px 20px',
              borderRadius: 30, border: `1px solid ${t.rule}`,
              boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, fontWeight: 500, color: t.inkSoft }}>
                Hide read articles
              </span>
              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                style={{
                  width: 44, height: 24, borderRadius: 12, border: 'none',
                  background: showUnreadOnly ? t.accent : t.rule,
                  position: 'relative', cursor: 'pointer', transition: 'background 0.3s'
                }}
              >
                <motion.div
                  initial={false}
                  animate={{ x: showUnreadOnly ? 20 : 2 }}
                  style={{
                    width: 20, height: 20, borderRadius: 10, background: '#fff',
                    position: 'absolute', top: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              </button>
            </div>
          )}
        </div>

        <div style={{ padding: '20px 80px 100px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
          {loading && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: t.inkMuted }}>
              <Mono theme={theme}>Loading...</Mono>
            </div>
          )}
          {error && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: t.inkMuted }}>
              <Mono theme={theme}>{error}</Mono>
            </div>
          )}
          {!loading && !error && visiblePosts.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0', color: t.inkMuted }}>
              <Mono theme={theme}>No posts yet.</Mono>
            </div>
          )}
          <AnimatePresence mode="popLayout">
            {visiblePosts.map((post, index) => {
              const isRead = readPosts[post.slug];
              const color = CARD_COLORS[index % CARD_COLORS.length];
              const pal = TOKENS.pastels[color as keyof typeof TOKENS.pastels];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, type: 'spring', bounce: 0.2 }}
                  key={post.slug}
                >
                  <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }} className="group">
                    <div style={{
                      height: '100%',
                      background: t.paperAlt,
                      border: `1px solid ${t.rule}`,
                      borderRadius: 12,
                      padding: 40,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      opacity: isRead && !showUnreadOnly ? 0.6 : 1,
                    }}
                    className={`group-hover:-translate-y-1 group-hover:shadow-xl ${theme === 'dark' ? 'group-hover:shadow-white/5' : ''}`}
                    >
                      <div style={{
                        position: 'absolute', top: -50, right: -50, width: 200, height: 200,
                        background: pal.bg, borderRadius: '50%', filter: 'blur(50px)', opacity: theme === 'dark' ? 0.15 : 0.6,
                        zIndex: 0, pointerEvents: 'none', transition: 'opacity 0.3s'
                      }} className="group-hover:opacity-100" />

                      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            {post.tags.map(tag => (
                              <span key={tag} style={{
                                fontSize: 10, fontFamily: 'JetBrains Mono', color: pal.text,
                                background: pal.bg, padding: '4px 8px', borderRadius: 4, textTransform: 'uppercase',
                                fontWeight: 600
                              }}>
                                {tag}
                              </span>
                            ))}
                          </div>

                          {isSignedIn && (
                            <button
                              onClick={(e) => toggleRead(post.slug, e)}
                              style={{
                                background: isRead ? '#7aa86b' : 'transparent',
                                border: `1px solid ${isRead ? '#7aa86b' : t.rule}`,
                                color: isRead ? '#fff' : t.inkMuted,
                                width: 28, height: 28, borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', transition: 'all 0.2s',
                                zIndex: 10
                              }}
                              title={isRead ? "Mark as unread" : "Mark as read"}
                            >
                              {isRead ? '✓' : ''}
                            </button>
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <h2 style={{ fontFamily: 'Newsreader, serif', fontSize: 36, fontWeight: 500, margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.01em', color: t.ink }}>
                            {post.title}
                          </h2>
                          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: t.inkSoft, lineHeight: 1.6, margin: 0 }}>
                            {post.summary}
                          </p>
                        </div>

                        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Mono theme={theme}><span style={{ color: t.inkMuted }}>{formatDate(post.created_at)}</span></Mono>
                          <span style={{ fontSize: 12, fontWeight: 600, color: t.accentInk, letterSpacing: '0.05em', background: t.accent, padding: '8px 16px', borderRadius: 4, opacity: 0, transform: 'translateY(10px)', transition: 'all 0.3s' }} className="group-hover:opacity-100 group-hover:translate-y-0">
                            READ ARTICLE →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
