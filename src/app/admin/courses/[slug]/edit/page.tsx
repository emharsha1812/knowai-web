"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getCourse,
  updateCourse,
  createChapter,
  updateChapter,
  deleteChapter,
  createLesson,
  getLesson,
  updateLesson,
  deleteLesson,
  type CourseDetail,
  type CourseCreate,
  type Chapter,
  type LessonSummary,
  type LessonCreate,
  type Lesson,
} from "@/lib/admin-api";
import { CourseForm } from "@/components/admin/course-form";
import { LessonEditor } from "@/components/admin/lesson-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  FileText,
  Pencil,
  GripVertical,
} from "lucide-react";

interface LessonEditorState {
  chapterId: number;
  /** undefined = new lesson, string = editing existing lesson by slug */
  lessonSlug?: string;
  lessonData?: Lesson;
  nextOrder: number;
}

export default function EditCoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Chapter state
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [addingChapter, setAddingChapter] = useState(false);
  const [deletingChapter, setDeletingChapter] = useState<number | null>(null);

  // Lesson editor state
  const [lessonEditor, setLessonEditor] = useState<LessonEditorState | null>(
    null
  );
  const [loadingLesson, setLoadingLesson] = useState(false);
  const [deletingLesson, setDeletingLesson] = useState<string | null>(null);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const data = await getCourse(slug);
      setCourse(data);
    } catch {
      setError("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [slug]);

  // ── Course details save ──────────────────────────────────────────────────

  const handleCourseUpdate = async (data: CourseCreate) => {
    await updateCourse(slug, data);
    // If slug changed, redirect
    if (data.slug !== slug) {
      router.replace(`/admin/courses/${data.slug}/edit`);
    } else {
      await fetchCourse();
    }
  };

  // ── Chapter operations ───────────────────────────────────────────────────

  const handleAddChapter = async () => {
    if (!newChapterTitle.trim() || !course) return;
    setAddingChapter(true);
    try {
      await createChapter(slug, {
        title: newChapterTitle.trim(),
        order: (course.chapters?.length ?? 0) + 1,
      });
      setNewChapterTitle("");
      await fetchCourse();
    } catch {
      alert("Failed to add chapter");
    } finally {
      setAddingChapter(false);
    }
  };

  const handleDeleteChapter = async (chapterId: number) => {
    if (!confirm("Delete this chapter and all its lessons?")) return;
    setDeletingChapter(chapterId);
    try {
      await deleteChapter(slug, chapterId);
      await fetchCourse();
    } catch {
      alert("Failed to delete chapter");
    } finally {
      setDeletingChapter(null);
    }
  };

  const handleReorderChapter = async (
    chapter: Chapter,
    direction: "up" | "down"
  ) => {
    if (!course) return;
    const chapters = [...course.chapters].sort((a, b) => a.order - b.order);
    const idx = chapters.findIndex((c) => c.id === chapter.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= chapters.length) return;

    // Swap orders
    try {
      await Promise.all([
        updateChapter(slug, chapter.id, { order: chapters[swapIdx].order }),
        updateChapter(slug, chapters[swapIdx].id, { order: chapter.order }),
      ]);
      await fetchCourse();
    } catch {
      alert("Failed to reorder");
    }
  };

  const handleUpdateChapterTitle = async (
    chapterId: number,
    title: string
  ) => {
    try {
      await updateChapter(slug, chapterId, { title });
    } catch {
      alert("Failed to update chapter title");
    }
  };

  // ── Lesson operations ────────────────────────────────────────────────────

  const openNewLesson = (chapterId: number, existingLessons: number) => {
    setLessonEditor({
      chapterId,
      nextOrder: existingLessons + 1,
    });
  };

  const openEditLesson = async (
    chapterId: number,
    lessonSlug: string
  ) => {
    setLoadingLesson(true);
    try {
      const lesson = await getLesson(lessonSlug);
      setLessonEditor({
        chapterId,
        lessonSlug,
        lessonData: lesson,
        nextOrder: lesson.order,
      });
    } catch {
      alert("Failed to load lesson");
    } finally {
      setLoadingLesson(false);
    }
  };

  const handleSaveLesson = async (data: LessonCreate) => {
    if (!lessonEditor) return;

    if (lessonEditor.lessonSlug) {
      // Update existing
      await updateLesson(lessonEditor.lessonSlug, data);
    } else {
      // Create new
      await createLesson(lessonEditor.chapterId, data);
    }

    setLessonEditor(null);
    await fetchCourse();
  };

  const handleDeleteLesson = async (lessonSlug: string) => {
    if (!confirm("Delete this lesson?")) return;
    setDeletingLesson(lessonSlug);
    try {
      await deleteLesson(lessonSlug);
      await fetchCourse();
    } catch {
      alert("Failed to delete lesson");
    } finally {
      setDeletingLesson(null);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-destructive">
          {error || "Course not found"}
        </p>
      </div>
    );
  }

  const sortedChapters = [...(course.chapters ?? [])].sort(
    (a, b) => a.order - b.order
  );

  return (
    <div className="mx-auto max-w-[1600px]">
      {/* Back link + title */}
      <div className="mb-6">
        <Link
          href="/admin/courses"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to courses
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Edit: {course.title}
        </h1>
      </div>

      {/* ── Section A: Course Details ──────────────────────────────────────── */}
      <section className="mb-8">
        <h2 className="mb-4 font-heading text-lg font-semibold border-b border-border pb-2">
          Course Details
        </h2>
        <CourseForm
          initial={course}
          onSubmit={handleCourseUpdate}
          submitLabel="Update & Publish"
        />
      </section>

      {/* ── Section B: Chapters ────────────────────────────────────────────── */}
      <section className="mb-8">
        <h2 className="mb-4 font-heading text-lg font-semibold border-b border-border pb-2">
          Chapters
        </h2>

        {sortedChapters.length === 0 ? (
          <p className="mb-4 text-sm text-muted-foreground">
            No chapters yet. Add one below.
          </p>
        ) : (
          <div className="mb-4 flex flex-col gap-3">
            {sortedChapters.map((chapter, idx) => (
              <div
                key={chapter.id}
                className="rounded-xl border border-border bg-card"
              >
                {/* Chapter header */}
                <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground/50 shrink-0" />

                  {/* Reorder arrows */}
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleReorderChapter(chapter, "up")}
                      disabled={idx === 0}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleReorderChapter(chapter, "down")}
                      disabled={idx === sortedChapters.length - 1}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Chapter title — editable */}
                  <input
                    defaultValue={chapter.title}
                    onBlur={(e) =>
                      handleUpdateChapterTitle(chapter.id, e.target.value)
                    }
                    className="flex-1 bg-transparent text-sm font-medium focus:outline-none focus:ring-1 focus:ring-ring rounded px-1"
                    placeholder="Chapter title"
                  />

                  <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                    Ch. {chapter.order}
                  </span>

                  {/* Add Lesson */}
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() =>
                      openNewLesson(
                        chapter.id,
                        chapter.lessons?.length ?? 0
                      )
                    }
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Lesson
                  </Button>

                  {/* Delete chapter */}
                  <Button
                    variant="destructive"
                    size="icon-xs"
                    onClick={() => handleDeleteChapter(chapter.id)}
                    disabled={deletingChapter === chapter.id}
                  >
                    {deletingChapter === chapter.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <Trash2 className="h-3 w-3" />
                    )}
                  </Button>
                </div>

                {/* Lessons list */}
                {chapter.lessons && chapter.lessons.length > 0 && (
                  <div className="divide-y divide-border">
                    {[...chapter.lessons]
                      .sort((a, b) => a.order - b.order)
                      .map((lesson: LessonSummary) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 px-4 py-2.5 pl-12 hover:bg-muted/20 transition-colors"
                        >
                          <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                          <span className="flex-1 text-sm">
                            {lesson.title}
                          </span>
                          <span
                            className={`text-xs px-1.5 py-0.5 rounded ${
                              lesson.is_published
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            }`}
                          >
                            {lesson.is_published ? "Pub" : "Draft"}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() =>
                              openEditLesson(chapter.id, lesson.slug)
                            }
                            disabled={loadingLesson}
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon-xs"
                            onClick={() => handleDeleteLesson(lesson.slug)}
                            disabled={deletingLesson === lesson.slug}
                          >
                            {deletingLesson === lesson.slug ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Add chapter */}
        <div className="flex items-center gap-2">
          <Input
            value={newChapterTitle}
            onChange={(e) => setNewChapterTitle(e.target.value)}
            placeholder="New chapter title…"
            className="max-w-xs"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddChapter();
            }}
          />
          <Button
            variant="outline"
            onClick={handleAddChapter}
            disabled={addingChapter || !newChapterTitle.trim()}
          >
            {addingChapter ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Add Chapter
          </Button>
        </div>
      </section>

      {/* ── Section C: Lesson Editor ───────────────────────────────────────── */}
      {lessonEditor && (
        <section className="mb-8">
          <h2 className="mb-4 font-heading text-lg font-semibold border-b border-border pb-2">
            Lesson Editor
          </h2>
          <LessonEditor
            initial={
              lessonEditor.lessonData
                ? {
                    title: lessonEditor.lessonData.title,
                    slug: lessonEditor.lessonData.slug,
                    content: lessonEditor.lessonData.content,
                    order: lessonEditor.lessonData.order,
                    reading_time_minutes:
                      lessonEditor.lessonData.reading_time_minutes,
                    is_published: lessonEditor.lessonData.is_published,
                  }
                : { order: lessonEditor.nextOrder }
            }
            onSave={handleSaveLesson}
            onClose={() => setLessonEditor(null)}
            lessonTitle={lessonEditor.lessonData?.title}
          />
        </section>
      )}
    </div>
  );
}
