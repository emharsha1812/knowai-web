import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse, getLesson, type CourseDetail, type Lesson } from "@/lib/api";
import { PLACEHOLDER_COURSES, PLACEHOLDER_LESSONS } from "@/lib/placeholder-courses";
import { Navbar } from "@/components/navbar";
import { CourseSidebar } from "@/components/course-sidebar";
import { MarkdownRenderer } from "@/components/markdown-renderer";

interface Props {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export default async function LessonPage({ params }: Props) {
  const { slug, lessonSlug } = await params;

  let course: CourseDetail = PLACEHOLDER_COURSES[slug] ?? null;
  let lesson: Lesson = PLACEHOLDER_LESSONS[lessonSlug] ?? null;

  try {
    [course, lesson] = await Promise.all([getCourse(slug), getLesson(lessonSlug)]);
  } catch {
    // keep placeholder fallbacks above
  }

  // If neither placeholder nor API has data, 404
  if (!course || !lesson) notFound();

  // Build a generic lesson stub for slugs not yet written
  if (!lesson) {
    lesson = {
      id: 0, chapter_id: 0, slug: lessonSlug,
      title: lessonSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
      content: "This lesson is coming soon.",
      marimo_cells: [], order: 0, reading_time_minutes: null, is_published: true,
      problem_id: null, created_at: "", updated_at: "",
    };
  }

  // Find prev/next lesson across all chapters
  const allLessons = course.chapters.flatMap((ch) => ch.lessons);
  const currentIdx = allLessons.findIndex((l) => l.slug === lessonSlug);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex">

        {/* Sidebar — desktop only */}
        <div className="hidden lg:block pl-4 xl:pl-8">
          <CourseSidebar courseSlug={slug} chapters={course.chapters} />
        </div>

        {/* Lesson content */}
        <div className="flex-1 min-w-0">
          <div className="max-w-2xl mx-auto px-6 xl:px-10 py-12">

            {/* Breadcrumb */}
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
              <Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link>
              {" / "}
              <Link href={`/courses/${slug}`} className="hover:text-foreground transition-colors">
                {course.title}
              </Link>
            </p>

            {/* Lesson header */}
            <header className="mb-10 pb-8 border-b border-border">
              <h1 className="font-heading text-3xl font-medium leading-tight mb-3">
                {lesson.title}
              </h1>
              {lesson.reading_time_minutes && (
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  {lesson.reading_time_minutes} min read
                </p>
              )}
            </header>

            {/* Content */}
            <MarkdownRenderer
              content={lesson.content}
              className="[&_pre]:border [&_pre]:border-border [&_pre]:bg-muted/30 [&_pre]:rounded-none"
            />

            {/* Prev / Next navigation */}
            <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
              {prevLesson ? (
                <Link
                  href={`/courses/${slug}/lessons/${prevLesson.slug}`}
                  className="flex flex-col items-start gap-1 text-sm hover:underline underline-offset-4 max-w-[45%]"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">← Previous</span>
                  <span className="text-foreground line-clamp-1">{prevLesson.title}</span>
                </Link>
              ) : <div />}

              {nextLesson ? (
                <Link
                  href={`/courses/${slug}/lessons/${nextLesson.slug}`}
                  className="flex flex-col items-end gap-1 text-sm hover:underline underline-offset-4 max-w-[45%]"
                >
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Next →</span>
                  <span className="text-foreground line-clamp-1">{nextLesson.title}</span>
                </Link>
              ) : (
                <Link
                  href={`/courses/${slug}`}
                  className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  ↑ Back to course
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
