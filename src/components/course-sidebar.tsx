"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Chapter } from "@/lib/api";

interface CourseSidebarProps {
  courseSlug: string;
  chapters: Chapter[];
}

export function CourseSidebar({ courseSlug, chapters }: CourseSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-border py-8 pr-6">
      <Link
        href={`/courses/${courseSlug}`}
        className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-6 block"
      >
        ← Back to course
      </Link>

      <div className="space-y-6">
        {chapters.map((chapter) => (
          <div key={chapter.id}>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
              {chapter.title}
            </p>
            <ul className="space-y-1">
              {chapter.lessons
                .filter((l) => l.is_published)
                .map((lesson) => {
                  const href = `/courses/${courseSlug}/lessons/${lesson.slug}`;
                  const isActive = pathname === href;
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={href}
                        className={`block text-sm py-1 px-2 -mx-2 transition-colors leading-snug ${
                          isActive
                            ? "text-foreground font-medium border-l-2 border-foreground pl-[6px]"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {lesson.title}
                        {lesson.reading_time_minutes && (
                          <span className="text-xs text-muted-foreground/50 ml-2">
                            {lesson.reading_time_minutes}m
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
