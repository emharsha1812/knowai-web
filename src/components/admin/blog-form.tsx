"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { slugify } from "@/lib/slugify";
import { Loader2, Save, Send } from "lucide-react";
import type { BlogPostCreate } from "@/lib/admin-api";

interface BlogFormProps {
  initial?: Partial<BlogPostCreate>;
  onSubmit: (data: BlogPostCreate) => Promise<void>;
  submitLabel?: string;
}

export function BlogForm({
  initial,
  onSubmit,
  submitLabel = "Save",
}: BlogFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugManual, setSlugManual] = useState(false);
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [readingTime, setReadingTime] = useState(
    initial?.reading_time_minutes ?? 5
  );
  const [content, setContent] = useState(initial?.content ?? "");
  const [isPublished, setIsPublished] = useState(
    initial?.is_published ?? false
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  const buildData = (published: boolean): BlogPostCreate => ({
    title: title.trim(),
    slug: slug.trim(),
    summary: summary.trim(),
    content,
    tags: tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    is_published: published,
    reading_time_minutes: readingTime,
  });

  const handleSave = async (published: boolean) => {
    setError("");
    setSaving(true);
    try {
      await onSubmit(buildData(published));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Title + Slug */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="blog-title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="blog-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My awesome post"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="blog-slug" className="text-sm font-medium">
            Slug
          </label>
          <Input
            id="blog-slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManual(true);
            }}
            placeholder="my-awesome-post"
            className="font-mono text-xs"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="blog-summary" className="text-sm font-medium">
          Summary
        </label>
        <textarea
          id="blog-summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="A brief description of the post…"
          rows={2}
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus:outline-none dark:bg-input/30"
        />
      </div>

      {/* Tags + Reading Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="blog-tags" className="text-sm font-medium">
            Tags{" "}
            <span className="text-muted-foreground font-normal">
              (comma-separated)
            </span>
          </label>
          <Input
            id="blog-tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="python, machine-learning, tutorial"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="blog-reading-time" className="text-sm font-medium">
            Reading time (minutes)
          </label>
          <Input
            id="blog-reading-time"
            type="number"
            min={1}
            value={readingTime}
            onChange={(e) => setReadingTime(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Published toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-primary"
        />
        <span className="text-sm font-medium">Published</span>
      </label>

      {/* Markdown editor */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Content</label>
        <MarkdownEditor value={content} onChange={setContent} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSave(false)}
          disabled={saving || !title.trim()}
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
          disabled={saving || !title.trim()}
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
