"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  TOKENS,
  NavBar,
  Mono,
  Highlight,
  useTheme,
} from "@/components/ui/primitives";

export default function Dashboard() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;

  const [lastReadBlog, setLastReadBlog] = useState<{
    titleHtml: string;
    subtitle: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("knowai-last-read");
      if (stored) {
        setLastReadBlog(JSON.parse(stored));
      } else {
        setLastReadBlog({
          titleHtml: "Why we divide<br/>by <em>√d<sub>k</sub></em>.",
          subtitle:
            "You stopped mid-paragraph. The variance argument resolves on the next page.",
          url: "/blog/scaled-dot-product",
        });
      }
    } catch {
      // ignore
    }
  }, []);

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

        <div style={{ padding: "36px 80px 24px" }}>
          {/* greeting */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <div>
              <Mono theme={theme}>
                {new Date()
                  .toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })
                  .toUpperCase()}{" "}
                ·{" "}
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Mono>
              <h1
                style={{
                  fontFamily: "Newsreader, serif",
                  fontSize: 40,
                  fontWeight: 500,
                  margin: "6px 0 0",
                  letterSpacing: "-0.02em",
                }}
              >
                Welcome back, <em>Sai.</em>
              </h1>
              <div
                style={{
                  fontFamily: "Newsreader, serif",
                  fontSize: 16,
                  color: t.inkSoft,
                  marginTop: 4,
                  fontStyle: "italic",
                }}
              >
                You left off in the middle of a derivation. Let's{" "}
                <Highlight theme={theme}>finish it.</Highlight>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Link
                href="/admin"
                style={{
                  background: t.ink,
                  color: t.paper,
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: 3,
                  fontFamily: "JetBrains Mono, monospace",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Mono theme="dark">
                  <span style={{ color: t.paper }}>⌘ ADMIN</span>
                </Mono>
              </Link>
            </div>
          </div>
        </div>

        <div style={{ padding: "0 80px 80px", maxWidth: 800 }}>
          {/* CONTINUE READING — large card */}
          {lastReadBlog && (
            <div
              style={{
                background: TOKENS.pastels.lavender.bg,
                color: TOKENS.pastels.lavender.text,
                borderRadius: 6,
                padding: 28,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <Mono theme="light">
                  <span
                    style={{
                      color: TOKENS.pastels.lavender.text,
                      opacity: 0.7,
                    }}
                  >
                    RESUME READING
                  </span>
                </Mono>
              </div>
              <h2
                style={{
                  fontFamily: "Newsreader, serif",
                  fontSize: 38,
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                }}
                dangerouslySetInnerHTML={{ __html: lastReadBlog.titleHtml }}
              />
              <div
                style={{
                  fontFamily: "Newsreader, serif",
                  fontSize: 15,
                  fontStyle: "italic",
                  marginTop: 12,
                  opacity: 0.85,
                  maxWidth: 460,
                }}
              >
                {lastReadBlog.subtitle}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginTop: 32,
                }}
              >
                <div style={{ display: "flex", gap: 6 }}></div>
                <Link
                  href={lastReadBlog.url}
                  style={{
                    background: TOKENS.pastels.lavender.text,
                    color: TOKENS.pastels.lavender.bg,
                    border: "none",
                    padding: "11px 18px",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  RESUME ↗
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
