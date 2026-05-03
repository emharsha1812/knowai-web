"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/slugify";
import { Loader2, Save, Send } from "lucide-react";
import type { CourseCreate } from "@/lib/admin-api";

interface CourseFormProps {
  initial?: Partial<CourseCreate>;
  onSubmit: (data: CourseCreate) => Promise<void>;
  submitLabel?: string;
}

export function CourseForm({
  initial,
  onSubmit,
  submitLabel = "Save",
}: CourseFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [difficulty, setDifficulty] = useState<CourseCreate["difficulty"]>(
    initial?.difficulty ?? "beginner"
  );
  const [estimatedHours, setEstimatedHours] = useState(
    initial?.estimated_hours ?? 3
  );
  const [tags, setTags] = useState(initial?.tags?.join(", ") ?? "");
  const [isPublished, setIsPublished] = useState(
    initial?.is_published ?? false
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slugManual) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  const buildData = (published: boolean): CourseCreate => ({
    title: title.trim(),
    slug: slug.trim(),
    description: description.trim(),
    difficulty,
    estimated_hours: estimatedHours,
    tags: tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    is_published: published,
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
    <div className="flex flex-col gap-5">
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Title + Slug */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="course-title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="course-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Intro to Neural Networks"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="course-slug" className="text-sm font-medium">
            Slug
          </label>
          <Input
            id="course-slug"
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugManual(true);
            }}
            placeholder="intro-to-neural-networks"
            className="font-mono text-xs"
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="course-description" className="text-sm font-medium">
          Description
        </label>
        <textarea
          id="course-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A brief overview of the course…"
          rows={3}
          className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus:outline-none dark:bg-input/30"
        />
      </div>

      {/* Difficulty + Hours + Tags */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="course-difficulty" className="text-sm font-medium">
            Difficulty
          </label>
          <select
            id="course-difficulty"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value as CourseCreate["difficulty"])
            }
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus:outline-none dark:bg-input/30"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="course-hours" className="text-sm font-medium">
            Estimated hours
          </label>
          <Input
            id="course-hours"
            type="number"
            min={1}
            value={estimatedHours}
            onChange={(e) => setEstimatedHours(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="course-tags" className="text-sm font-medium">
            Tags{" "}
            <span className="text-muted-foreground font-normal">
              (comma-sep)
            </span>
          </label>
          <Input
            id="course-tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="ml, deep-learning"
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
