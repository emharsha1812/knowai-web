import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/api";
import { PLACEHOLDER_COURSES } from "@/lib/placeholder-courses";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const DIFFICULTY_LABEL: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;

  let course = PLACEHOLDER_COURSES[slug] ?? null;
  try {
    course = await getCourse(slug);
  } catch {
    // keep placeholder
  }

  if (!course) notFound();

  const totalLessons = course.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 max-w-4xl py-16">

          {/* Breadcrumb */}
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">
            <Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link>
            {" / "}
            <span>{course.title}</span>
          </p>

          {/* Course header */}
          <div className="border-b border-border pb-12 mb-12">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {DIFFICULTY_LABEL[course.difficulty]}
              </span>
              {course.estimated_hours && (
                <>
                  <span className="text-muted-foreground/40">·</span>
                  <span className="text-xs text-muted-foreground">{course.estimated_hours} hours</span>
                </>
              )}
              <span className="text-muted-foreground/40">·</span>
              <span className="text-xs text-muted-foreground">{totalLessons} lessons</span>
            </div>

            <h1 className="font-heading text-4xl font-medium leading-tight mb-4">{course.title}</h1>

            {course.subtitle && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{course.subtitle}</p>
            )}

            <p className="text-muted-foreground leading-relaxed max-w-2xl">{course.description}</p>

            {course.prerequisites && course.prerequisites.length > 0 && (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Prerequisites</p>
                <ul className="space-y-1">
                  {course.prerequisites.map((p) => (
                    <li key={p} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>—</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {course.tags.map((tag) => (
                  <span key={tag} className="text-xs border border-border px-2 py-0.5 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Course outline */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8">Course Outline</p>
            <div className="space-y-10">
              {course.chapters.map((chapter, chIdx) => (
                <div key={chapter.id}>
                  <div className="flex items-baseline gap-4 mb-4 pb-2 border-b border-border">
                    <span className="text-xs text-muted-foreground font-mono">
                      {String(chIdx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading text-lg font-medium">{chapter.title}</h2>
                  </div>
                  <ul className="divide-y divide-border/50">
                    {chapter.lessons.map((lesson, lIdx) => (
                      <li key={lesson.id}>
                        <Link
                          href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                          className="group flex items-center justify-between py-3 hover:bg-muted/20 -mx-2 px-2 transition-colors"
                        >
                          <div className="flex items-baseline gap-4">
                            <span className="text-xs text-muted-foreground/50 font-mono w-5 shrink-0">
                              {lIdx + 1}
                            </span>
                            <span className="text-sm group-hover:underline underline-offset-4 decoration-1">
                              {lesson.title}
                            </span>
                            {lesson.problem_id && (
                              <span className="text-xs text-muted-foreground border border-border px-1.5 py-0.5 uppercase tracking-wide">
                                +problem
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0 ml-4">
                            {lesson.reading_time_minutes ? `${lesson.reading_time_minutes}m` : ""}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Start CTA */}
          {course.chapters[0]?.lessons[0] && (
            <div className="mt-16 pt-10 border-t border-border">
              <Link
                href={`/courses/${course.slug}/lessons/${course.chapters[0].lessons[0].slug}`}
                className="inline-flex items-center gap-3 border border-foreground px-8 py-3 text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
              >
                Start Course →
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
