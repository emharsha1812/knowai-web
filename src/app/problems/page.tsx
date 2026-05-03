"use client";

import React from "react";
import Link from "next/link";
import { TOKENS, NavBar, Mono, useTheme } from "@/components/ui/primitives";

export default function ProblemsIndex() {
  const theme = useTheme();
  const t = theme === "dark" ? TOKENS.dark : TOKENS.light;

  // Mock data for problems
  const problems = [
    {
      id: "1",
      title: "Implement Scaled Dot-Product Attention",
      diff: "Medium",
      status: "unsolved",
      slug: "scaled-dot-product",
      cat: "Implementation",
    },
    {
      id: "2",
      title: "Layer Normalization from Scratch",
      diff: "Easy",
      status: "solved",
      slug: "#",
      cat: "Implementation",
    },
    {
      id: "3",
      title: "Multi-Head Attention Geometry",
      diff: "Hard",
      status: "unsolved",
      slug: "#",
      cat: "Implementation",
    },
    {
      id: "4",
      title: "Backpropagation through Softmax",
      diff: "Hard",
      status: "unsolved",
      slug: "#",
      cat: "Foundations",
    },
    {
      id: "5",
      title: "KV-Cache Memory Calculation",
      diff: "Easy",
      status: "solved",
      slug: "#",
      cat: "Implementation",
    },
    {
      id: "6",
      title: "Write a Fused Softmax Kernel in Triton",
      diff: "Hard",
      status: "unsolved",
      slug: "#",
      cat: "Advanced",
    },
    {
      id: "7",
      title: "Rotary Position Embeddings (RoPE)",
      diff: "Medium",
      status: "unsolved",
      slug: "#",
      cat: "Implementation",
    },
    {
      id: "8",
      title: "Derive the ELBO for VAEs",
      diff: "Medium",
      status: "solved",
      slug: "#",
      cat: "Foundations",
    },
  ];

  const diffColor = (diff: string) => {
    if (diff === "Easy") return "#7aa86b";
    if (diff === "Medium") return "#d9a05b";
    return "#c14a3e";
  };

  const getCalendarDays = () => {
    return Array.from({ length: 31 }).map((_, i) => ({
      day: i + 1,
      active: [2, 5, 12, 14, 15, 18, 22].includes(i + 1),
    }));
  };

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
      <div style={{ width: "100%", maxWidth: 1440, position: "relative" }}>
        <NavBar theme={theme} active="problems" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "220px 1fr 280px",
            gap: 32,
            padding: "32px 40px",
            minHeight: "calc(100vh - 80px)",
          }}
        >
          {/* LEFT SIDEBAR */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <Mono theme={theme}>
                <span style={{ color: t.inkSoft, fontSize: 11 }}>MENU</span>
              </Mono>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {["All Problems", "Company Tagged", "Mock Interviews"].map(
                  (item, i) => (
                    <div
                      key={item}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 4,
                        fontSize: 13,
                        fontWeight: i === 0 ? 500 : 400,
                        background: i === 0 ? t.paperAlt : "transparent",
                        color: i === 0 ? t.ink : t.inkSoft,
                        cursor: "pointer",
                      }}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <Mono theme={theme}>
                <span style={{ color: t.inkSoft, fontSize: 11 }}>
                  CATEGORIES
                </span>
              </Mono>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                {[
                  { name: "Foundations", count: 24 },
                  { name: "Implementation", count: 42 },
                  { name: "Advanced Systems", count: 18 },
                  { name: "Mathematics", count: 35 },
                ].map((item, i) => (
                  <div
                    key={item.name}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 4,
                      fontSize: 13,
                      display: "flex",
                      justifyContent: "space-between",
                      color: i === 1 ? t.ink : t.inkSoft,
                      fontWeight: i === 1 ? 500 : 400,
                      cursor: "pointer",
                      background: i === 1 ? t.paperAlt : "transparent",
                    }}
                  >
                    <span>{item.name}</span>
                    <Mono theme={theme}>
                      <span style={{ opacity: 0.6 }}>{item.count}</span>
                    </Mono>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main>
            {/* Top Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginBottom: 32,
              }}
            >
              {[
                {
                  title: "Foundations & Math",
                  desc: "Linear algebra and probability for ML.",
                  color: "sage",
                },
                {
                  title: "Neural Architectures",
                  desc: "Build transformers and CNNs from scratch.",
                  color: "butter",
                },
                {
                  title: "Systems & CUDA",
                  desc: "Optimize inference and write custom kernels.",
                  color: "sky",
                },
              ].map((card, i) => {
                const pal =
                  TOKENS.pastels[card.color as keyof typeof TOKENS.pastels];
                return (
                  <div
                    key={i}
                    style={{
                      background: t.paperAlt,
                      border: `1px solid ${t.rule}`,
                      borderRadius: 4,
                      padding: 20,
                      display: "flex",
                      gap: 16,
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    className="hover:border-gray-400 dark:hover:border-gray-600"
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 4,
                        background: pal.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          background: pal.text,
                          opacity: 0.8,
                        }}
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Newsreader, serif",
                          color: t.ink,
                          marginBottom: 4,
                        }}
                      >
                        {card.title}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: t.inkSoft,
                          lineHeight: 1.4,
                        }}
                      >
                        {card.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
                borderBottom: `1px solid ${t.ruleSoft}`,
                paddingBottom: 24,
              }}
            >
              <div>
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 500,
                      fontFamily: "Newsreader, serif",
                      color: t.ink,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Core Skills
                  </span>
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 400,
                      fontFamily: "Newsreader, serif",
                      color: t.inkSoft,
                      fontStyle: "italic",
                    }}
                  >
                    Veridic 150
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: t.inkSoft,
                    maxWidth: 400,
                    lineHeight: 1.5,
                    fontFamily: "Newsreader, serif",
                    fontStyle: "italic",
                  }}
                >
                  Implement common architectures and derivations for machine
                  learning interviews and research.
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    fontSize: 12,
                    fontFamily: "JetBrains Mono",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 24,
                    }}
                  >
                    <span style={{ color: diffColor("Easy") }}>Easy</span>{" "}
                    <span style={{ color: t.ink }}>2/40</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 24,
                    }}
                  >
                    <span style={{ color: diffColor("Medium") }}>Med</span>{" "}
                    <span style={{ color: t.ink }}>1/80</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 24,
                    }}
                  >
                    <span style={{ color: diffColor("Hard") }}>Hard</span>{" "}
                    <span style={{ color: t.ink }}>0/30</span>
                  </div>
                </div>

                {/* Minimalist Progress Circle */}
                <div
                  style={{
                    position: "relative",
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    border: `1px solid ${t.rule}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    style={{
                      position: "absolute",
                      top: -1,
                      left: -1,
                      width: 92,
                      height: 92,
                      transform: "rotate(-90deg)",
                    }}
                  >
                    <circle
                      cx="46"
                      cy="46"
                      r="45"
                      fill="none"
                      stroke={t.accent}
                      strokeWidth="2"
                      strokeDasharray="282.7"
                      strokeDashoffset="277"
                    />
                  </svg>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "Newsreader, serif",
                        fontSize: 24,
                        fontWeight: 500,
                        color: t.ink,
                        lineHeight: 1,
                      }}
                    >
                      3
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: t.inkMuted,
                        fontFamily: "JetBrains Mono",
                        marginTop: 4,
                      }}
                    >
                      / 150
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Search problems..."
                  suppressHydrationWarning
                  style={{
                    background: t.paperAlt,
                    border: `1px solid ${t.rule}`,
                    padding: "8px 14px",
                    borderRadius: 4,
                    fontSize: 13,
                    color: t.ink,
                    outline: "none",
                    width: 240,
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  suppressHydrationWarning
                  style={{
                    background: t.ink,
                    color: t.paper,
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: 2,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                  }}
                >
                  ARCHITECTURE
                </button>
                <button
                  suppressHydrationWarning
                  style={{
                    background: t.paperAlt,
                    color: t.inkSoft,
                    border: `1px solid ${t.rule}`,
                    padding: "6px 14px",
                    borderRadius: 2,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                  }}
                >
                  MATHEMATICS
                </button>
              </div>
            </div>

            {/* Problem Table */}
            <div
              style={{
                background: t.paperAlt,
                border: `1px solid ${t.rule}`,
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 100px",
                  padding: "14px 20px",
                  borderBottom: `1px solid ${t.rule}`,
                  fontSize: 11,
                  fontWeight: 600,
                  color: t.inkMuted,
                  letterSpacing: "0.05em",
                }}
              >
                <div>STATUS</div>
                <div>PROBLEM</div>
                <div>DIFFICULTY</div>
              </div>

              {problems.map((p, i) => (
                <Link
                  key={p.id}
                  href={p.slug === "#" ? "/problems" : `/problems/${p.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "60px 1fr 100px",
                      padding: "14px 20px",
                      borderBottom:
                        i < problems.length - 1
                          ? `1px solid ${t.ruleSoft}`
                          : "none",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    className="hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <div>
                      {p.status === "solved" ? (
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 2,
                            background: t.ink,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <path
                              d="M1 5L4 8L9 2"
                              stroke={t.paper}
                              strokeWidth="1.5"
                              strokeLinecap="square"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: 2,
                            border: `1px solid ${t.rule}`,
                            background: t.paper,
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        color: t.ink,
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {p.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: "JetBrains Mono",
                        color: diffColor(p.diff),
                      }}
                    >
                      {p.diff}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>

          {/* RIGHT SIDEBAR */}
          <aside style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Minimalist Calendar */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    fontFamily: "Newsreader, serif",
                    color: t.ink,
                    fontStyle: "italic",
                  }}
                >
                  Activity · May 2026
                </span>
              </div>
              <div
                style={{
                  background: t.paperAlt,
                  border: `1px solid ${t.rule}`,
                  borderRadius: 4,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 4,
                    textAlign: "center",
                    fontSize: 10,
                    color: t.inkMuted,
                    marginBottom: 12,
                    fontFamily: "JetBrains Mono",
                  }}
                >
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div key={`${d}-${i}`}>{d}</div>
                  ))}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 4,
                    textAlign: "center",
                    fontSize: 11,
                    color: t.ink,
                    fontFamily: "JetBrains Mono",
                  }}
                >
                  {/* Empty slots for start of month */}
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  {getCalendarDays().map((d) => (
                    <div
                      key={d.day}
                      style={{
                        width: 24,
                        height: 24,
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        background: d.active ? t.ink : "transparent",
                        color: d.active ? t.paper : t.inkSoft,
                        fontWeight: d.active ? 500 : 400,
                      }}
                    >
                      {d.day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
