"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { TOKENS, Highlight, Mono, useTheme } from "@/components/ui/primitives";
import { Plus, PanelRightClose, PanelRightOpen, Pencil, Trash2, ChevronRight } from "lucide-react";
import { getToken, isLoggedIn } from "@/lib/auth";
import {
  fetchMarginalia, createMarginaliaNote, updateMarginaliaNote,
  deleteMarginaliaNote, type MarginaliaNote, type NoteType,
} from "@/lib/api";

// ── Constants ────────────────────────────────────────────────────────────────

const ARTICLE_SLUG = "scaled-dot-product";

const NOTE_COLORS: Record<NoteType, string> = {
  intuition:  "#f4c542",
  definition: "#9b8ec4",
  note:       "#6b9fc4",
  question:   "#7aa86b",
};

const NOTE_LABELS: Record<NoteType, string> = {
  intuition:  "my intuition",
  definition: "definition",
  note:       "note to self",
  question:   "question",
};

const SECTIONS = [
  { id: "why-we-divide",   label: "Why we divide by √dk" },
  { id: "intuition-first", label: "Intuition first" },
  { id: "variance-sketch", label: "A quick variance sketch" },
  { id: "what-changes",    label: "What this changes" },
];

const OTHER_SECTIONS = [
  { n: "14.3", label: "Multi-head geometry" },
  { n: "14.4", label: "KV-cache in memory" },
  { n: "14.5", label: "Masking & causality" },
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface DraftNote {
  note_type: NoteType;
  label: string;
  content: string;
  section_id: string;
}

const BLANK_DRAFT: DraftNote = {
  note_type: "note",
  label: "",
  content: "",
  section_id: "",
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Blog() {
  const theme = useTheme();
  const t = TOKENS[theme as keyof typeof TOKENS] as any;

  const [activeSection, setActiveSection] = useState("why-we-divide");
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<MarginaliaNote[]>([]);
  const [draft, setDraft] = useState<DraftNote | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [marginaliaOpen, setMarginaliaOpen] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ── Auth + load notes ──────────────────────────────────────────────────────

  useEffect(() => {
    const li = isLoggedIn();
    setLoggedIn(li);

    localStorage.setItem("knowai-last-read", JSON.stringify({
      titleHtml: "Why we divide<br/>by <em>√d<sub>k</sub></em>.",
      subtitle: "You stopped mid-paragraph.",
      url: `/blog/${ARTICLE_SLUG}`,
    }));

    // Load completed sections from localStorage
    const stored = localStorage.getItem(`knowai-completed-${ARTICLE_SLUG}`);
    if (stored) setCompletedSections(new Set(JSON.parse(stored)));

    if (li) {
      const token = getToken()!;
      fetchMarginalia(ARTICLE_SLUG, token)
        .then(setNotes)
        .catch(() => {
          // fall back to localStorage notes
          const local = localStorage.getItem(`knowai-notes-${ARTICLE_SLUG}`);
          if (local) setNotes(JSON.parse(local));
        });
    } else {
      const local = localStorage.getItem(`knowai-notes-${ARTICLE_SLUG}`);
      if (local) setNotes(JSON.parse(local));
    }
  }, []);

  // ── IntersectionObserver for active section ────────────────────────────────

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleComplete = (id: string) => {
    setCompletedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem(`knowai-completed-${ARTICLE_SLUG}`, JSON.stringify([...next]));
      return next;
    });
  };

  const saveLocalNotes = (updated: MarginaliaNote[]) => {
    if (!loggedIn) localStorage.setItem(`knowai-notes-${ARTICLE_SLUG}`, JSON.stringify(updated));
  };

  const handleAddNote = useCallback(async () => {
    if (!draft || !draft.content.trim()) return;
    setSaving(true);
    try {
      if (loggedIn) {
        const token = getToken()!;
        const note = await createMarginaliaNote(token, {
          article_slug: ARTICLE_SLUG,
          section_id: draft.section_id || undefined,
          note_type: draft.note_type,
          label: draft.label.trim() || NOTE_LABELS[draft.note_type],
          content: draft.content.trim(),
          color: NOTE_COLORS[draft.note_type],
        });
        const updated = [...notes, note];
        setNotes(updated);
      } else {
        // Offline note with fake id
        const fake: MarginaliaNote = {
          id: Date.now(),
          article_slug: ARTICLE_SLUG,
          section_id: draft.section_id || null,
          note_type: draft.note_type,
          label: draft.label.trim() || NOTE_LABELS[draft.note_type],
          content: draft.content.trim(),
          color: NOTE_COLORS[draft.note_type],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        const updated = [...notes, fake];
        setNotes(updated);
        saveLocalNotes(updated);
      }
      setDraft(null);
    } finally {
      setSaving(false);
    }
  }, [draft, notes, loggedIn]);

  const handleDeleteNote = async (id: number) => {
    if (loggedIn) {
      try { await deleteMarginaliaNote(getToken()!, id); } catch {}
    }
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveLocalNotes(updated);
  };

  const handleSaveEdit = async (id: number) => {
    if (!editContent.trim()) return;
    setSaving(true);
    try {
      if (loggedIn) {
        const note = await updateMarginaliaNote(getToken()!, id, { content: editContent.trim() });
        setNotes(notes.map((n) => (n.id === id ? note : n)));
      } else {
        const updated = notes.map((n) => n.id === id ? { ...n, content: editContent.trim() } : n);
        setNotes(updated);
        saveLocalNotes(updated);
      }
    } finally {
      setSaving(false);
      setEditingId(null);
    }
  };

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("veridic-theme", isDark ? "dark" : "light");
  };

  // ── Derived ────────────────────────────────────────────────────────────────

  const completedCount = SECTIONS.filter((s) => completedSections.has(s.id)).length;
  const progress = completedCount / SECTIONS.length;

  const mono: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains-mono), monospace",
    fontSize: 10,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  };
  const caveat: React.CSSProperties = { fontFamily: "var(--font-caveat), cursive" };
  const code: React.CSSProperties = {
    fontFamily: "var(--font-jetbrains-mono), monospace",
    fontSize: 13.5,
    background: t.paperAlt,
    padding: "1px 5px",
    borderRadius: 3,
    color: t.ink,
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: t.paper, color: t.ink }}>

      {/* ── Header ── */}
      <div data-print-hide style={{
        position: "sticky", top: 0, zIndex: 50,
        background: t.paperAlt, borderBottom: `1px solid ${t.rule}`,
        display: "grid", gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center", padding: "0 24px", height: 44,
      }}>
        <a href="/blog" style={{ color: t.inkSoft, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 13 }}>←</span>
          <span style={{ ...mono, color: t.inkSoft }}>Writing</span>
        </a>
        <span style={{ fontFamily: "Newsreader, serif", fontSize: 13, color: t.inkSoft }}>
          § 14.2 · <span style={{ color: t.ink }}>Scaled Dot-Product</span>
        </span>
        <div style={{ display: "flex", gap: 14, alignItems: "center", justifyContent: "flex-end" }}>
          <button onClick={toggleTheme} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: t.inkSoft, padding: 0 }}>
            {theme === "dark" ? "☀" : "☽"}
          </button>
          <span style={{ fontSize: 12, color: t.inkMuted }}>~ 6 min read</span>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: t.ink, color: t.paper, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>N</div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div data-print-grid style={{
        width: "100%", display: "grid",
        gridTemplateColumns: `220px 1fr ${marginaliaOpen ? "260px" : "36px"}`,
        minHeight: "calc(100vh - 44px)",
        transition: "grid-template-columns 0.25s ease",
      }}>

        {/* ── TOC ── */}
        <aside data-print-hide style={{
          position: "sticky", top: 44, height: "calc(100vh - 44px)",
          overflowY: "auto", borderRight: `1px solid ${t.rule}`,
          display: "flex", flexDirection: "column", padding: "24px 0",
        }}>
          <div style={{ padding: "0 16px 10px", ...mono, color: t.inkMuted }}>CONTENTS</div>

          {/* Active section with subsections */}
          <div style={{ borderLeft: `3px solid ${t.accent}` }}>
            <div style={{ padding: "6px 16px 6px 13px", display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ ...mono, color: t.inkMuted, width: 32, flexShrink: 0 }}>§ 14.2</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: t.ink, flex: 1 }}>Scaled Dot-Product</span>
            </div>
            {SECTIONS.map((s) => {
              const isActive = activeSection === s.id;
              const isDone = completedSections.has(s.id);
              return (
                <div
                  key={s.id}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 8,
                    padding: "6px 14px 6px 16px", cursor: "pointer",
                    color: isActive ? t.ink : t.inkSoft,
                    background: isActive ? `${t.accent}18` : "transparent",
                  }}
                >
                  <span style={{ width: 32, flexShrink: 0 }} />
                  <span
                    onClick={() => scrollTo(s.id)}
                    style={{ flex: 1, fontSize: 12.5, lineHeight: 1.35 }}
                  >{s.label}</span>
                  <button
                    onClick={() => toggleComplete(s.id)}
                    title={isDone ? "Mark unread" : "Mark read"}
                    style={{
                      width: 17, height: 17, borderRadius: "50%", flexShrink: 0,
                      border: `1.5px solid ${isDone ? "#7aa86b" : (t.ruleSoft ?? "#ccc")}`,
                      background: isDone ? "#7aa86b" : "transparent",
                      color: isDone ? "#fff" : "transparent",
                      fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", transition: "all 0.15s", lineHeight: 1, marginTop: 1,
                    }}
                  >✓</button>
                </div>
              );
            })}
          </div>

          {/* Other sections */}
          <div style={{ flex: 1, marginTop: 4 }}>
            {OTHER_SECTIONS.map((s) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", color: t.inkSoft, cursor: "default", opacity: 0.6 }}>
                <span style={{ ...mono, color: t.inkMuted, width: 32, flexShrink: 0 }}>§ {s.n}</span>
                <span style={{ flex: 1, fontSize: 12.5 }}>{s.label}</span>
                <span style={{ fontSize: 8, color: t.ruleSoft ?? "#ccc" }}>○</span>
              </div>
            ))}
          </div>

          {/* Progress + PDF */}
          <div style={{ padding: "16px 16px 0", borderTop: `1px solid ${t.rule}` }}>
            <div style={{ ...mono, color: t.inkMuted, marginBottom: 8 }}>PROGRESS</div>
            <div style={{ height: 3, background: t.ruleSoft ?? "#ddd", borderRadius: 2 }}>
              <div style={{ width: `${progress * 100}%`, height: "100%", background: t.accent, borderRadius: 2, transition: "width 0.3s" }} />
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: t.inkMuted }}>{completedCount} of {SECTIONS.length} sections complete</div>
            <button
              onClick={() => window.print()}
              style={{
                marginTop: 14, width: "100%",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "9px 0", background: t.paperAlt, border: `1px solid ${t.rule}`,
                borderRadius: 4, cursor: "pointer", fontSize: 12, color: t.inkSoft,
                fontWeight: 500, fontFamily: "inherit",
              }}
            >↓ Download PDF</button>
          </div>
        </aside>

        {/* ── Article ── */}
        <main style={{ padding: "44px 72px 80px", maxWidth: 720, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
          <div style={{ marginBottom: 22 }}>
            <span style={{ ...mono, color: t.inkMuted }}>§ 14.2 · SCALED DOT-PRODUCT</span>
          </div>

          <h1 style={{ fontFamily: "Newsreader, serif", fontSize: 46, fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 10px" }}>
            Why we divide by <em>√d<sub>k</sub></em>.
          </h1>
          <p style={{ fontFamily: "Newsreader, serif", fontStyle: "italic", color: t.inkSoft, fontSize: 17, margin: "0 0 18px", lineHeight: 1.5 }}>
            A short detour through variance, before we earn the right to softmax.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 28, borderBottom: `1px solid ${t.rule}`, marginBottom: 36 }}>
            <span style={{ fontSize: 12, color: t.inkMuted }}>⏱ ~ 6 min read</span>
            <span style={{ color: t.ruleSoft ?? "#ccc" }}>·</span>
            <span style={{ fontSize: 12, color: t.inkMuted }}>Oct 3, 2025</span>
            <span style={{ color: t.ruleSoft ?? "#ccc" }}>·</span>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", fontFamily: "var(--font-jetbrains-mono), monospace", background: "#ede8f5", color: "#6b5b95", padding: "3px 10px", borderRadius: 999 }}>TRANSFORMERS</span>
          </div>

          {/* Section 1 */}
          <section id="why-we-divide" style={{ scrollMarginTop: 64, marginBottom: 40 }}>
            <div style={{ fontFamily: "Newsreader, serif", fontSize: 18, lineHeight: 1.78 }}>
              <p style={{ margin: "0 0 22px" }}>
                <span style={{ float: "left", fontFamily: "Newsreader, serif", fontSize: 70, lineHeight: 0.82, paddingRight: 10, paddingTop: 6, fontWeight: 500 }}>T</span>
                he dot product of two random vectors is, on average, larger when the vectors are larger. That sentence is obvious and also <em>important</em>. If our queries and keys live in ℝ⁵¹², then on average <code style={code}>q · k</code> grows with the dimension — and softmax, reading those numbers, will collapse into a one-hot distribution before the network has had time to learn anything.
              </p>
              <p style={{ margin: "0 0 28px", color: t.inkSoft }}>
                The fix is small and clarifying. We assume each component of <code style={code}>q</code> and <code style={code}>k</code> is roughly unit-variance. Then their inner product has variance <em>d<sub>k</sub></em>, and dividing by <em>√d<sub>k</sub></em> restores unit variance — softmax operates in a regime where it can still see gradients.
              </p>
              <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 4, padding: "22px 28px", margin: "8px 0 32px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ ...mono, color: t.inkMuted }}>Eq. 14.2</span>
                  <span style={{ ...mono, color: t.inkMuted }}>runs in §14.2-nb ↗</span>
                </div>
                <div style={{ fontFamily: "Newsreader, serif", fontSize: 28, textAlign: "center", fontStyle: "italic", padding: "8px 0" }}>
                  Var(q·k) = d<sub>k</sub>&nbsp; ⟹ &nbsp;Var<span style={{ fontStyle: "normal" }}>(</span>q·k / √d<sub>k</sub><span style={{ fontStyle: "normal" }}>)</span> = 1
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="intuition-first" style={{ scrollMarginTop: 64, marginBottom: 40 }}>
            <h2 style={{ fontFamily: "Newsreader, serif", fontSize: 28, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.01em" }}>Intuition first.</h2>
            <div style={{ fontFamily: "Newsreader, serif", fontSize: 18, lineHeight: 1.78 }}>
              <p style={{ margin: "0 0 22px" }}>
                Think of it geometrically. As we add dimensions, two random unit-vectors become, in expectation, <Highlight theme={theme}>nearly orthogonal</Highlight>. Their dot product should be near zero — but its <em>variance</em> grows with d<sub>k</sub> because we're summing d<sub>k</sub> independent random variables. We're not making the mean bigger; we're making the spread bigger.
              </p>
              <p style={{ margin: "0 0 22px", color: t.inkSoft }}>
                Dividing by √d<sub>k</sub> is the classic trick for normalising the variance of a sum of independent unit-variance terms. Nothing more. It's the same reason you divide by √n when computing a sample mean.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="variance-sketch" style={{ scrollMarginTop: 64, marginBottom: 40 }}>
            <h2 style={{ fontFamily: "Newsreader, serif", fontSize: 28, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.01em" }}>A quick variance sketch.</h2>
            <div style={{ fontFamily: "Newsreader, serif", fontSize: 18, lineHeight: 1.78, color: t.inkSoft }}>
              <p style={{ margin: "0 0 22px" }}>
                Let <em>q<sub>i</sub></em>, <em>k<sub>i</sub></em> ~ N(0,1) independently. Then <em>q·k = Σ q<sub>i</sub>k<sub>i</sub></em>. Each term has mean 0 and variance 1, so Var(q·k) = d<sub>k</sub>. Scaling by 1/√d<sub>k</sub> gives variance 1. Softmax now operates over values that don't explode with model width.
              </p>
            </div>
            <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 4, padding: "18px 22px", borderLeft: `3px solid ${t.accent}`, fontFamily: "Newsreader, serif", fontSize: 15, color: t.inkSoft, fontStyle: "italic" }}>
              <span style={{ fontStyle: "normal", ...mono, color: t.ink, display: "block", marginBottom: 6 }}>ASIDE</span>
              You'll sometimes see 1/√d<sub>k</sub> baked into the key projection instead of applied at attention time. Same math, different where the constant lives.
            </div>
          </section>

          {/* Section 4 */}
          <section id="what-changes" style={{ scrollMarginTop: 64, marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Newsreader, serif", fontSize: 28, fontWeight: 500, margin: "0 0 16px", letterSpacing: "-0.01em" }}>What this changes (and what it doesn't).</h2>
            <div style={{ fontFamily: "Newsreader, serif", fontSize: 18, lineHeight: 1.78 }}>
              <p style={{ margin: "0 0 22px" }}>
                It changes gradient flow early in training. Without scaling, softmax saturates — gradients vanish, and the attention heads learn slowly. With scaling, the attention distribution stays diffuse enough to update.
              </p>
              <p style={{ margin: "0 0 22px", color: t.inkSoft }}>
                It doesn't change the expressiveness of the model. The scaled and unscaled versions can represent the same functions — scaling just makes optimisation tractable.
              </p>
              <p style={{ margin: 0, fontWeight: 500 }}>It's not magic. It's variance.</p>
            </div>
          </section>

          {/* Prev / next */}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: `1px solid ${t.rule}`, fontSize: 13 }}>
            <a href="#" style={{ color: t.inkSoft, textDecoration: "none" }}>← 14.1 Dot products</a>
            <a href="#" style={{ color: t.ink, fontWeight: 600, textDecoration: "none" }}>14.3 Multi-head geometry →</a>
          </div>
        </main>

        {/* ── Marginalia ── */}
        <aside data-print-hide style={{
          borderLeft: `1px solid ${t.rule}`,
          position: "sticky", top: 44, height: "calc(100vh - 44px)",
          overflowY: "auto",
          padding: marginaliaOpen ? "24px 16px" : "24px 6px",
          transition: "padding 0.25s ease",
          display: "flex", flexDirection: "column", gap: 0,
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 8 }}>
            {marginaliaOpen ? (
              <>
                <span style={{ ...mono, color: t.inkMuted }}>MARGINALIA</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}>
                  <button
                    onClick={() => setDraft(BLANK_DRAFT)}
                    title="Add a note"
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "5px 10px", borderRadius: 5,
                      background: t.paperAlt, border: `1px solid ${t.rule}`,
                      cursor: "pointer", color: t.ink,
                    }}
                  >
                    <Plus size={13} strokeWidth={2.2} />
                    <span style={{ ...mono, fontSize: 9 }}>Add note</span>
                  </button>
                  <button
                    onClick={() => setMarginaliaOpen(false)}
                    title="Collapse"
                    style={{ background: "none", border: "none", cursor: "pointer", color: t.inkMuted, display: "flex", padding: 4, borderRadius: 4 }}
                  >
                    <PanelRightClose size={16} strokeWidth={1.6} />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setMarginaliaOpen(true)}
                title="Open marginalia"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: t.inkMuted }}
              >
                <PanelRightOpen size={16} strokeWidth={1.6} />
              </button>
            )}
          </div>

          {marginaliaOpen && (
            <>
              {/* Auth notice for guests */}
              {!loggedIn && (
                <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 6, padding: "10px 12px", marginBottom: 16, fontSize: 12, color: t.inkSoft, lineHeight: 1.5 }}>
                  <a href="/sign-in" style={{ color: t.ink, fontWeight: 600 }}>Sign in</a> to sync notes across devices. Your current notes are saved locally.
                </div>
              )}

              {/* Add note form */}
              {draft !== null && (
                <div style={{ background: t.paperAlt, border: `1px solid ${t.rule}`, borderRadius: 6, padding: "12px", marginBottom: 16 }}>
                  {/* Note type selector */}
                  <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" as const }}>
                    {(["intuition", "definition", "note", "question"] as NoteType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setDraft((d) => d ? { ...d, note_type: type } : d)}
                        style={{
                          padding: "3px 8px", borderRadius: 999, fontSize: 10, cursor: "pointer",
                          fontFamily: "var(--font-jetbrains-mono), monospace", letterSpacing: "0.05em",
                          border: `1.5px solid ${draft.note_type === type ? NOTE_COLORS[type] : (t.rule)}`,
                          background: draft.note_type === type ? `${NOTE_COLORS[type]}22` : "transparent",
                          color: draft.note_type === type ? NOTE_COLORS[type] : t.inkMuted,
                          fontWeight: draft.note_type === type ? 700 : 400,
                          textTransform: "uppercase" as const,
                        }}
                      >{type}</button>
                    ))}
                  </div>
                  {/* Label */}
                  <input
                    placeholder={`Label (e.g. "${NOTE_LABELS[draft.note_type]}")`}
                    value={draft.label}
                    onChange={(e) => setDraft((d) => d ? { ...d, label: e.target.value } : d)}
                    style={{
                      width: "100%", padding: "6px 8px", marginBottom: 8,
                      border: `1px solid ${t.rule}`, borderRadius: 4,
                      background: t.paper, color: t.ink,
                      fontSize: 12, fontFamily: "var(--font-caveat), cursive",
                      boxSizing: "border-box" as const, outline: "none",
                    }}
                  />
                  {/* Content */}
                  <textarea
                    autoFocus
                    placeholder="Write your note…"
                    value={draft.content}
                    onChange={(e) => setDraft((d) => d ? { ...d, content: e.target.value } : d)}
                    rows={4}
                    style={{
                      width: "100%", padding: "8px", resize: "vertical" as const,
                      border: `1px solid ${t.rule}`, borderRadius: 4,
                      background: t.paper, color: t.ink,
                      fontSize: 14, fontFamily: "var(--font-caveat), cursive", lineHeight: 1.5,
                      boxSizing: "border-box" as const, outline: "none",
                    }}
                  />
                  {/* Section anchor */}
                  <select
                    value={draft.section_id}
                    onChange={(e) => setDraft((d) => d ? { ...d, section_id: e.target.value } : d)}
                    style={{
                      width: "100%", marginTop: 6, padding: "5px 8px",
                      border: `1px solid ${t.rule}`, borderRadius: 4,
                      background: t.paper, color: t.inkSoft,
                      fontSize: 11, fontFamily: "var(--font-jetbrains-mono), monospace",
                      boxSizing: "border-box" as const, outline: "none",
                    }}
                  >
                    <option value="">Anchor to section (optional)</option>
                    {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      onClick={handleAddNote}
                      disabled={saving || !draft.content.trim()}
                      style={{
                        flex: 1, padding: "7px 0", borderRadius: 4,
                        background: draft.content.trim() ? t.ink : (t.ruleSoft ?? "#ccc"),
                        color: draft.content.trim() ? t.paper : t.inkMuted,
                        border: "none", cursor: draft.content.trim() ? "pointer" : "not-allowed",
                        fontSize: 11, fontWeight: 600, fontFamily: "inherit",
                        letterSpacing: "0.05em",
                      }}
                    >{saving ? "Saving…" : "SAVE NOTE"}</button>
                    <button
                      onClick={() => setDraft(null)}
                      style={{ padding: "7px 14px", borderRadius: 4, background: "none", border: `1px solid ${t.rule}`, cursor: "pointer", fontSize: 11, color: t.inkMuted, fontFamily: "inherit" }}
                    >Cancel</button>
                  </div>
                </div>
              )}

              {/* Notes list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {notes.length === 0 && draft === null && (
                  <div style={{ textAlign: "center", padding: "32px 0", color: t.inkMuted, fontSize: 13 }}>
                    <div style={{ fontSize: 24, marginBottom: 8, opacity: 0.4 }}>✦</div>
                    <div>No notes yet.</div>
                    <div style={{ fontSize: 11, marginTop: 4 }}>Click + to add your first annotation.</div>
                  </div>
                )}

                {notes.map((note) => {
                  const color = note.color ?? NOTE_COLORS[note.note_type];
                  const isEditing = editingId === note.id;
                  return (
                    <div key={note.id} style={{ position: "relative" as const }}>
                      {/* Label with colored underline */}
                      <div style={{ display: "inline-block", ...caveat, fontSize: 17, fontWeight: 600, color: t.ink, borderBottom: `2.5px solid ${color}`, paddingBottom: 1, marginBottom: 8 }}>
                        {note.label || NOTE_LABELS[note.note_type]}
                      </div>
                      {note.section_id && (
                        <span
                          onClick={() => scrollTo(note.section_id!)}
                          style={{ ...mono, fontSize: 9, color: t.inkMuted, marginLeft: 8, cursor: "pointer", opacity: 0.6 }}
                        >↳ {SECTIONS.find(s => s.id === note.section_id)?.label}</span>
                      )}

                      {isEditing ? (
                        <div>
                          <textarea
                            autoFocus
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={4}
                            style={{ width: "100%", padding: 8, border: `1px solid ${t.rule}`, borderRadius: 4, background: t.paper, color: t.ink, fontSize: 14, ...caveat, lineHeight: 1.5, resize: "vertical" as const, boxSizing: "border-box" as const, outline: "none" }}
                          />
                          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                            <button onClick={() => handleSaveEdit(note.id)} disabled={saving} style={{ flex: 1, padding: "6px 0", borderRadius: 3, background: t.ink, color: t.paper, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}>
                              {saving ? "…" : "Save"}
                            </button>
                            <button onClick={() => setEditingId(null)} style={{ padding: "6px 12px", borderRadius: 3, background: "none", border: `1px solid ${t.rule}`, cursor: "pointer", fontSize: 11, color: t.inkMuted, fontFamily: "inherit" }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p style={{ ...caveat, fontSize: 15, color: t.inkSoft, lineHeight: 1.55, margin: 0 }}>
                          {note.content}
                        </p>
                      )}

                      {/* Actions */}
                      {!isEditing && (
                        <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                          <button
                            onClick={() => { setEditingId(note.id); setEditContent(note.content); }}
                            title="Edit"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 3, color: t.inkMuted, display: "flex", borderRadius: 3 }}
                          ><Pencil size={12} strokeWidth={1.8} /></button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            title="Delete"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 3, color: "#c14a3e", display: "flex", borderRadius: 3 }}
                          ><Trash2 size={12} strokeWidth={1.8} /></button>
                        </div>
                      )}

                      <div style={{ marginTop: 14, height: 1, background: t.rule }} />
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </aside>
      </div>

      <style>{`
        @media print {
          [data-print-hide] { display: none !important; }
          [data-print-grid] { display: block !important; }
          main {
            max-width: 680px !important;
            padding: 32px 48px !important;
            margin: 0 auto !important;
            width: 100% !important;
          }
          * { position: static !important; box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
