"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { slugify } from "@/lib/slugify";
import { Loader2, Save, X } from "lucide-react";
import type { LessonCreate } from "@/lib/admin-api";

interface LessonEditorProps {
  initial?: Partial<LessonCreate>;
  onSave: (data: LessonCreate) => Promise<void>;
  onClose: () => void;
  lessonTitle?: string;
}

export function LessonEditor({
  initial,
  onSave,
  onClose,
  lessonTitle,
}: LessonEditorProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugManual, setSlugManual] = useState(false);
  const [content, setContent] = useState(initial?.content ?? "");
  const [readingTime, setReadingTime] = useState(
    initial?.reading_time_minutes ?? 10
  );
  const [order, setOrder] = useState(initial?.order ?? 1);
  const [isPublished, setIsPublished] = useState(
    initial?.is_published ?? false
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug
  if (!slugManual && title) {
    const newSlug = slugify(title);
    if (newSlug !== slug) {
      setSlug(newSlug);
    }
  }

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        slug: slug.trim(),
        content,
        order,
        reading_time_minutes: readingTime,
        is_published: isPublished,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h3 className="font-heading text-sm font-semibold">
          {lessonTitle ? `Edit: ${lessonTitle}` : "New Lesson"}
        </h3>
        <Button variant="ghost" size="icon-sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-4 p-4">
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Title + Slug */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lesson-title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="lesson-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Introduction to…"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lesson-slug" className="text-sm font-medium">
              Slug
            </label>
            <Input
              id="lesson-slug"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManual(true);
              }}
              className="font-mono text-xs"
            />
          </div>
        </div>

        {/* Order + Reading time + Published */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="lesson-order" className="text-sm font-medium">
              Order
            </label>
            <Input
              id="lesson-order"
              type="number"
              min={1}
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="lesson-reading-time"
              className="text-sm font-medium"
            >
              Reading time (min)
            </label>
            <Input
              id="lesson-reading-time"
              type="number"
              min={1}
              value={readingTime}
              onChange={(e) => setReadingTime(Number(e.target.value))}
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <span className="text-sm font-medium">Published</span>
            </label>
          </div>
        </div>

        {/* Markdown editor */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Content</label>
          <MarkdownEditor
            value={content}
            onChange={setContent}
            minHeight={400}
          />
        </div>

        {/* Save */}
        <div className="flex justify-end gap-2 border-t border-border pt-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving || !title.trim()}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Lesson
          </Button>
        </div>
      </div>
    </div>
  );
}
