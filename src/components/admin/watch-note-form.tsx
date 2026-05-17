"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { slugify } from "@/lib/slugify";
import {
  Loader2,
  Save,
  Send,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Upload,
  Eye,
  Code2,
  GripVertical,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { WatchNoteCreate, WatchNoteSection } from "@/lib/admin-api";

const TAGS = [
  "Transformers",
  "Fundamentals",
  "Generative",
  "RL",
  "Systems",
  "Vision",
  "Interp",
  "Architectures",
];

const COLORS = [
  "lavender",
  "butter",
  "sage",
  "sky",
  "rose",
  "mint",
  "peach",
  "lilac",
  "coral",
  "ice",
];

function emptySection(): WatchNoteSection {
  return { ts: "", label: "", heading: "", body_md: "" };
}

function parseObsidianToSections(md: string): WatchNoteSection[] {
  // Strip YAML frontmatter
  const stripped = md.replace(/^---[\s\S]*?---\n?/, "").trim();
  const lines = stripped.split("\n");
  const sections: WatchNoteSection[] = [];
  let current: { heading: string; body: string[] } | null = null;

  for (const line of lines) {
    // Match ## headings but not ### or deeper
    if (/^## /.test(line)) {
      if (current) {
        sections.push({
          ts: "",
          label: current.heading
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
          heading: current.heading,
          body_md: current.body.join("\n").trim(),
        });
      }
      current = { heading: line.slice(3).trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }

  if (current) {
    sections.push({
      ts: "",
      label: current.heading
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
      heading: current.heading,
      body_md: current.body.join("\n").trim(),
    });
  }

  return sections;
}

interface SectionEditorProps {
  section: WatchNoteSection;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updated: WatchNoteSection) => void;
  onDelete: () => void;
}

function SectionEditor({
  section,
  index,
  isExpanded,
  onToggle,
  onChange,
  onDelete,
}: SectionEditorProps) {
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Collapsed header */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" />
        <span className="text-xs font-mono text-muted-foreground w-5 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        {section.ts && (
          <span className="text-xs font-mono bg-background border border-border px-1.5 py-0.5 rounded shrink-0">
            {section.ts}
          </span>
        )}
        <span className="text-xs text-muted-foreground truncate shrink-0 max-w-[100px]">
          {section.label || "no label"}
        </span>
        <span className="text-sm font-medium truncate flex-1">
          {section.heading || (
            <span className="text-muted-foreground italic">untitled section</span>
          )}
        </span>
        <span className="text-xs text-muted-foreground shrink-0">
          {section.body_md.length > 0
            ? `${section.body_md.split("\n").length} lines`
            : "empty"}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="shrink-0 p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="p-4 flex flex-col gap-3 border-t border-border">
          {/* Row: ts + label + heading */}
          <div className="grid grid-cols-[100px_1fr_2fr] gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Timestamp
              </label>
              <Input
                value={section.ts}
                onChange={(e) => onChange({ ...section, ts: e.target.value })}
                placeholder="00:03:12"
                className="font-mono text-xs h-8"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Label (short)
              </label>
              <Input
                value={section.label}
                onChange={(e) =>
                  onChange({ ...section, label: e.target.value })
                }
                placeholder="motivation"
                className="text-xs h-8"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Heading
              </label>
              <Input
                value={section.heading}
                onChange={(e) =>
                  onChange({ ...section, heading: e.target.value })
                }
                placeholder="Why does this matter?"
                className="text-sm h-8"
              />
            </div>
          </div>

          {/* Body md editor */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">
                Notes (markdown)
              </label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setPreviewMode(false)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors",
                    !previewMode
                      ? "bg-background text-foreground shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Code2 className="h-3 w-3" />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode(true)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium transition-colors",
                    previewMode
                      ? "bg-background text-foreground shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Eye className="h-3 w-3" />
                  Preview
                </button>
              </div>
            </div>

            {previewMode ? (
              <div className="min-h-[240px] rounded-lg border border-border bg-background px-6 py-4 overflow-y-auto">
                {section.body_md.trim() ? (
                  <MarkdownRenderer content={section.body_md} />
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Nothing to preview
                  </p>
                )}
              </div>
            ) : (
              <textarea
                value={section.body_md}
                onChange={(e) =>
                  onChange({ ...section, body_md: e.target.value })
                }
                placeholder="Write your notes in markdown. Use **bold**, *italic*, `code`, > blockquotes, and ``` code blocks."
                rows={12}
                className="w-full rounded-lg border border-border bg-[#1e1e1e] px-4 py-3 font-mono text-sm leading-relaxed text-[#d4d4d4] placeholder:text-muted-foreground focus:outline-none focus-visible:border-ring resize-y"
                spellCheck={false}
              />
            )}
            <p className="text-xs text-muted-foreground">
              {section.body_md.length.toLocaleString()} chars ·{" "}
              {section.body_md.split("\n").length} lines
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface WatchNoteFormProps {
  initial?: Partial<WatchNoteCreate>;
  onSubmit: (data: WatchNoteCreate) => Promise<void>;
  submitLabel?: string;
}

export function WatchNoteForm({
  initial,
  onSubmit,
  submitLabel = "Save",
}: WatchNoteFormProps) {
  // Video metadata
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugManual, setSlugManual] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState(
    initial?.youtube_video_id ?? ""
  );
  const [channel, setChannel] = useState(initial?.channel ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [duration, setDuration] = useState(initial?.duration ?? "");
  const [tag, setTag] = useState(initial?.tag ?? "Transformers");
  const [color, setColor] = useState(initial?.color ?? "lavender");
  const [thumbBg, setThumbBg] = useState(initial?.thumb_bg ?? "#1a1a1a");
  const [noteCount, setNoteCount] = useState(initial?.note_count ?? 0);
  const [pageCount, setPageCount] = useState(initial?.page_count ?? 0);
  const [lastNote, setLastNote] = useState(initial?.last_note ?? "");
  const [pdfUrl, setPdfUrl] = useState(initial?.pdf_url ?? "");
  const [isPublished, setIsPublished] = useState(
    initial?.is_published ?? false
  );
  const [isFeatured, setIsFeatured] = useState(initial?.is_featured ?? false);

  // Sections
  const [sections, setSections] = useState<WatchNoteSection[]>(
    initial?.sections ?? []
  );
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Auto-fill state
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  // Form state
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const mdFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!slugManual) setSlug(slugify(title));
  }, [title, slugManual]);

  async function handleAutofill() {
    if (!youtubeUrl.trim()) return;
    setFetching(true);
    setFetchError("");
    try {
      const res = await fetch(`/api/youtube-meta?url=${encodeURIComponent(youtubeUrl.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        setFetchError(json.error ?? "Could not fetch video metadata");
        return;
      }
      setYoutubeVideoId(json.video_id);
      setTitle(json.title);
      setChannel(json.channel);
      setSlugManual(false); // let slug auto-update from title
    } catch {
      setFetchError("Network error — could not reach YouTube");
    } finally {
      setFetching(false);
    }
  }

  function handleAddSection() {
    const next = [...sections, emptySection()];
    setSections(next);
    setExpandedIndex(next.length - 1);
  }

  function handleDeleteSection(i: number) {
    setSections((prev) => prev.filter((_, idx) => idx !== i));
    setExpandedIndex(null);
  }

  function handleSectionChange(i: number, updated: WatchNoteSection) {
    setSections((prev) => prev.map((s, idx) => (idx === i ? updated : s)));
  }

  function handleObsidianImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text !== "string") return;
      const parsed = parseObsidianToSections(text);
      if (parsed.length === 0) {
        setError(
          "No ## headings found. Make sure your Obsidian file uses ## for section headings."
        );
        return;
      }
      setSections(parsed);
      setExpandedIndex(null);
      setError("");
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function buildData(published: boolean): WatchNoteCreate {
    return {
      slug: slug.trim(),
      youtube_video_id: youtubeVideoId.trim(),
      channel: channel.trim(),
      author: author.trim() || null,
      title: title.trim(),
      duration: duration.trim(),
      tag,
      color,
      thumb_bg: thumbBg,
      note_count: noteCount,
      page_count: pageCount,
      last_note: lastNote.trim() || null,
      pdf_url: pdfUrl.trim() || null,
      is_published: published,
      is_featured: isFeatured,
      sections,
    };
  }

  async function handleSave(published: boolean) {
    setError("");
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!youtubeVideoId.trim()) {
      setError("YouTube Video ID is required");
      return;
    }
    if (!channel.trim()) {
      setError("Channel is required");
      return;
    }
    setSaving(true);
    try {
      await onSubmit(buildData(published));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* ── Video Metadata ── */}
      <div className="rounded-xl border border-border p-5 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Video Metadata
        </h2>

        {/* YouTube URL auto-fill */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            Auto-fill from YouTube URL
          </label>
          <div className="flex gap-2">
            <Input
              value={youtubeUrl}
              onChange={(e) => { setYoutubeUrl(e.target.value); setFetchError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleAutofill()}
              placeholder="https://www.youtube.com/watch?v=rBCqOTEfxvg"
              className="font-mono text-xs flex-1"
              disabled={fetching}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAutofill}
              disabled={fetching || !youtubeUrl.trim()}
              className="shrink-0"
            >
              {fetching ? (
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              )}
              Fetch
            </Button>
          </div>
          {fetchError && (
            <p className="text-xs text-destructive">{fetchError}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Paste any YouTube URL to auto-fill title, channel, and video ID. Duration is still set manually.
          </p>
        </div>

        {/* Title + Slug */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Attention Is All You Need"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Slug</label>
            <Input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManual(true);
              }}
              placeholder="attention-is-all-you-need"
              className="font-mono text-xs"
            />
          </div>
        </div>

        {/* YouTube + Channel + Author + Duration */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">YouTube Video ID</label>
            <Input
              value={youtubeVideoId}
              onChange={(e) => setYoutubeVideoId(e.target.value)}
              placeholder="rBCqOTEfxvg"
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              The <code>v=</code> part of the URL
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Channel</label>
            <Input
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="Yannic Kilcher"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Author{" "}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Grant Sanderson"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Duration</label>
            <Input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="1:25:00"
              className="font-mono text-xs"
            />
          </div>
        </div>

        {/* Tag + Color + Thumb BG */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus-visible:border-ring"
            >
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Card Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus-visible:border-ring capitalize"
            >
              {COLORS.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Thumbnail BG</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={thumbBg}
                onChange={(e) => setThumbBg(e.target.value)}
                className="h-9 w-9 cursor-pointer rounded border border-input p-0.5"
              />
              <Input
                value={thumbBg}
                onChange={(e) => setThumbBg(e.target.value)}
                placeholder="#1a1a1a"
                className="font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Note count + Page count + Last note */}
        <div className="grid gap-4 sm:grid-cols-[80px_80px_1fr]">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Notes</label>
            <Input
              type="number"
              min={0}
              value={noteCount}
              onChange={(e) => setNoteCount(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Pages</label>
            <Input
              type="number"
              min={0}
              value={pageCount}
              onChange={(e) => setPageCount(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Last Note{" "}
              <span className="text-muted-foreground font-normal">
                — one-liner shown on the card
              </span>
            </label>
            <Input
              value={lastNote}
              onChange={(e) => setLastNote(e.target.value)}
              placeholder="the residual stream is a bus. every block just writes to it."
            />
          </div>
        </div>

        {/* PDF URL */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">
            PDF URL{" "}
            <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            placeholder="/notes/my-video.pdf"
            className="font-mono text-xs"
          />
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium">Published</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span className="text-sm font-medium">Featured</span>
            <span className="text-xs text-muted-foreground">
              (shows as hero card)
            </span>
          </label>
        </div>
      </div>

      {/* ── Sections / Notes ── */}
      <div className="rounded-xl border border-border p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Note Sections
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {sections.length === 0
                ? "No sections yet — add one or import from an Obsidian file."
                : `${sections.length} section${sections.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              ref={mdFileRef}
              type="file"
              accept=".md,.txt"
              className="hidden"
              onChange={handleObsidianImport}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => mdFileRef.current?.click()}
            >
              <Upload className="h-3.5 w-3.5 mr-1.5" />
              Import .md
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddSection}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Add Section
            </Button>
          </div>
        </div>

        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-10 text-center gap-3">
            <p className="text-sm text-muted-foreground">
              Your Obsidian notes go here.
            </p>
            <p className="text-xs text-muted-foreground max-w-sm">
              Click <strong>Import .md</strong> to split your Obsidian file into
              sections by <code>##</code> headings, or add sections manually.
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => mdFileRef.current?.click()}
              >
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                Import from Obsidian
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAddSection}
              >
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Add manually
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {sections.map((section, i) => (
              <SectionEditor
                key={i}
                section={section}
                index={i}
                isExpanded={expandedIndex === i}
                onToggle={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
                onChange={(updated) => handleSectionChange(i, updated)}
                onDelete={() => handleDeleteSection(i)}
              />
            ))}
            <button
              type="button"
              onClick={handleAddSection}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              Add another section
            </button>
          </div>
        )}
      </div>

      {/* ── Actions ── */}
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSave(false)}
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save as Draft
        </Button>
        <Button
          type="button"
          onClick={() => handleSave(true)}
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          {submitLabel}
        </Button>
      </div>
    </div>
  );
}
