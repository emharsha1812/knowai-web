"use client";

import React from "react";
import Link from "next/link";
import {
  TOKENS,
  Highlight,
  NavBar,
  Mono,
  Tag,
  Logo,
  Icons,
  useTheme,
} from "@/components/ui/primitives";
import { CategoryCards } from "@/components/category-cards";

export default function Home() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: t.paper,
        color: t.ink,
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1280, position: "relative" }}>
        <NavBar theme={theme} />

        {/* HERO */}
        <div
          style={{
            padding: "90px 80px 60px",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* tiny chapter mark */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              marginBottom: 28,
              alignItems: "center",
            }}
          >
            <div style={{ width: 28, height: 1, background: t.rule }} />
            <Mono theme={theme}>CH. 00 — INTRODUCTION</Mono>
            <div style={{ width: 28, height: 1, background: t.rule }} />
          </div>

          <h1
            style={{
              fontFamily: "Newsreader, serif",
              fontWeight: 400,
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              color: t.ink,
            }}
          >
            AI/ML,{" "}
            <Highlight strike theme={theme}>
              understood
            </Highlight>
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>
              from within.
            </em>
          </h1>

          <p
            style={{
              fontFamily: "Newsreader, serif",
              fontSize: 19,
              lineHeight: 1.5,
              color: t.inkSoft,
              maxWidth: 560,
              margin: "28px auto 0",
              fontWeight: 300,
            }}
          >
            Deep writing technical posts for serious learners.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 14,
              marginTop: 36,
            }}
          >
            <Link
              href="/blog"
              style={{
                background: t.ink,
                color: t.paper,
                border: "none",
                padding: "13px 22px",
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.1em",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              START READING →
            </Link>
            <button
              style={{
                background: "transparent",
                color: t.ink,
                border: `1px solid ${t.ink}`,
                padding: "13px 22px",
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              VIEW SYLLABUS
            </button>
          </div>

          {/* margin handwriting note */}
          <div
            style={{
              position: "absolute",
              right: 110,
              top: 140,
              fontFamily: "Caveat, cursive",
              fontSize: 22,
              color: t.inkMuted,
              transform: "rotate(-6deg)",
              maxWidth: 160,
              textAlign: "left",
              fontStyle: "italic",
            }}
          >
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              style={{ position: "absolute", left: -60, top: 10 }}
            >
              <path
                d="M70 30 Q 40 30 10 10"
                stroke={t.inkMuted}
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              />
              <path
                d="M18 6 L 8 8 L 14 16"
                stroke={t.inkMuted}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            we redacted "understood" because
            <br />
            nobody really has, yet.
          </div>
        </div>

        {/* THIN STAT STRIP — hidden until launch */}
        {false && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: `1px solid ${t.rule}`,
              borderBottom: `1px solid ${t.rule}`,
              margin: "0 80px",
            }}
          >
            {[
              ["142", "chapters published"],
              ["3,400+", "interactive problems"],
              ["11", "reactive notebooks"],
              ["Triton, JAX, PyTorch", "runtimes embedded"],
            ].map(([n, l], i, arr) => (
              <div
                key={l}
                style={{
                  padding: "22px 24px",
                  borderRight:
                    i < arr.length - 1 ? `1px solid ${t.rule}` : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "Newsreader, serif",
                    fontSize: 28,
                    fontWeight: 500,
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {n}
                </div>
                <Mono theme={theme}>{l}</Mono>
              </div>
            ))}
          </div>
        )}

        {/* FEATURED CHAPTERS GRID — hidden until launch */}
        {false && (
          <div style={{ padding: "64px 0 40px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 24,
                padding: "0 80px",
              }}
            >
              <div>
                <Mono theme={theme}>§ FEATURED · 2024</Mono>
                <h2
                  style={{
                    fontFamily: "Newsreader, serif",
                    fontSize: 32,
                    fontWeight: 500,
                    margin: "8px 0 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Chapters in the wild
                </h2>
              </div>
              <span style={{ color: t.inkSoft, fontSize: 13 }}>
                view all 142 →
              </span>
            </div>

            <CategoryCards />
          </div>
        )}

        {/* THE LOOP — hidden until launch */}
        {false && (
          <div style={{ padding: "40px 80px 64px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr",
                gap: 64,
                alignItems: "start",
              }}
            >
              <div>
                <Mono theme={theme}>§ THE LOOP</Mono>
                <h2
                  style={{
                    fontFamily: "Newsreader, serif",
                    fontSize: 38,
                    fontWeight: 500,
                    margin: "10px 0 18px",
                    lineHeight: 1.1,
                    letterSpacing: "-0.015em",
                  }}
                >
                  Read. Implement. <em>Verify.</em>
                </h2>
                <p
                  style={{
                    fontFamily: "Newsreader, serif",
                    fontSize: 17,
                    lineHeight: 1.6,
                    color: t.inkSoft,
                    fontWeight: 300,
                  }}
                >
                  Every chapter ends in a problem set. Every formula has a
                  runnable cell beside it. You don't finish a section by reading
                  it — you finish it by{" "}
                  <Highlight theme={theme}>passing its tests</Highlight>.
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 14,
                }}
              >
                {[
                  {
                    n: "01",
                    t: "Read",
                    d: "Mini-textbook with formulas, diagrams, and intuition built first.",
                    glyph: "✎",
                  },
                  {
                    n: "02",
                    t: "Implement",
                    d: "In-browser editor. Submit. Tests run. Real feedback, not toy data.",
                    glyph: "⌨",
                  },
                  {
                    n: "03",
                    t: "Explore",
                    d: "Marimo notebooks. Pull a slider, watch the network learn.",
                    glyph: "◐",
                  },
                ].map((s) => (
                  <div
                    key={s.n}
                    style={{
                      background: t.paperAlt,
                      padding: 18,
                      borderRadius: 4,
                      border: `1px solid ${t.ruleSoft}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 24,
                      }}
                    >
                      <Mono theme={theme}>{s.n}</Mono>
                      <span style={{ color: t.accent, fontSize: 18 }}>
                        {s.glyph}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "Newsreader, serif",
                        fontSize: 20,
                        fontWeight: 500,
                        marginBottom: 6,
                      }}
                    >
                      {s.t}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        lineHeight: 1.5,
                        color: t.inkSoft,
                      }}
                    >
                      {s.d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PATHS — hidden until launch */}
        {false && (
          <div
            style={{
              background: t.paperAlt,
              padding: "56px 80px",
              borderTop: `1px solid ${t.rule}`,
              borderBottom: `1px solid ${t.rule}`,
            }}
          >
            <Mono theme={theme}>§ LEARNING PATHS</Mono>
            <h2
              style={{
                fontFamily: "Newsreader, serif",
                fontSize: 32,
                fontWeight: 500,
                margin: "8px 0 28px",
                letterSpacing: "-0.01em",
              }}
            >
              From <em>aⱼ = σ(Σwᵢxᵢ)</em> to custom GPU kernels.
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 18,
              }}
            >
              {[
                {
                  tier: "I",
                  name: "Foundations",
                  desc: "The math you skipped. Now with diagrams.",
                  count: "38 chapters · 9 weeks",
                  chapters: [
                    "Linear Algebra",
                    "Probability & Information",
                    "Calculus for Optimization",
                    "Classical ML",
                  ],
                  color: "sage",
                },
                {
                  tier: "II",
                  name: "Implementation",
                  desc: "Build a transformer. From scratch. No PyTorch.",
                  count: "54 chapters · 14 weeks",
                  chapters: [
                    "Backprop by Hand",
                    "CNNs from Conv2d up",
                    "Attention & Transformers",
                    "Diffusion Models",
                  ],
                  color: "butter",
                },
                {
                  tier: "III",
                  name: "Advanced Systems",
                  desc: "When the bottleneck is silicon, not algebra.",
                  count: "50 chapters · ongoing",
                  chapters: [
                    "CUDA Mental Model",
                    "Triton Kernels",
                    "Mixed-Precision Training",
                    "Distributed Training",
                  ],
                  color: "sky",
                },
              ].map((p) => {
                const pal =
                  TOKENS.pastels[p.color as keyof typeof TOKENS.pastels];
                return (
                  <div
                    key={p.tier}
                    style={{
                      background: t.paper,
                      borderRadius: 4,
                      overflow: "hidden",
                      border: `1px solid ${t.rule}`,
                    }}
                  >
                    <div
                      style={{
                        background: pal.bg,
                        padding: "18px 20px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          color: pal.text,
                        }}
                      >
                        <Mono theme={theme}>
                          <span style={{ color: pal.text, opacity: 0.7 }}>
                            TIER {p.tier}
                          </span>
                        </Mono>
                        <Mono theme={theme}>
                          <span style={{ color: pal.text, opacity: 0.7 }}>
                            {p.count}
                          </span>
                        </Mono>
                      </div>
                      <div
                        style={{
                          fontFamily: "Newsreader, serif",
                          fontSize: 26,
                          fontWeight: 600,
                          color: pal.text,
                          marginTop: 8,
                          lineHeight: 1.1,
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Newsreader, serif",
                          fontSize: 15,
                          color: pal.text,
                          opacity: 0.85,
                          marginTop: 4,
                          fontStyle: "italic",
                        }}
                      >
                        {p.desc}
                      </div>
                    </div>
                    <div style={{ padding: "14px 20px" }}>
                      {p.chapters.map((c, i) => (
                        <div
                          key={c}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "8px 0",
                            borderBottom:
                              i < p.chapters.length - 1
                                ? `1px dashed ${t.ruleSoft}`
                                : "none",
                            fontSize: 13,
                          }}
                        >
                          <span style={{ display: "flex", gap: 10 }}>
                            <Mono theme={theme}>
                              {String(i + 1).padStart(2, "0")}
                            </Mono>
                            <span>{c}</span>
                          </span>
                          <span style={{ color: t.inkMuted, fontSize: 11 }}>
                            →
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div
          style={{
            borderTop: `1px solid ${t.rule}`,
            padding: "36px 80px 48px",
          }}
        />
      </div>
    </div>
  );
}
