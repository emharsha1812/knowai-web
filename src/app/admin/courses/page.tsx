"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCourses,
  deleteCourse,
  type Course,
} from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  BookOpen,
} from "lucide-react";

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  intermediate:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  advanced:
    "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function CourseListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch {
      /* silent */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete course "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await deleteCourse(slug);
      setCourses((prev) => prev.filter((c) => c.slug !== slug));
    } catch {
      alert("Failed to delete course");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Mini Courses
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage structured learning paths
          </p>
        </div>
        <Link href="/admin/courses/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Course
          </Button>
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <BookOpen className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No courses yet</p>
          <Link href="/admin/courses/new" className="mt-3">
            <Button variant="outline" size="sm">
              Create your first course
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left">
                <th className="px-4 py-2.5 font-medium text-muted-foreground">
                  Title
                </th>
                <th className="px-4 py-2.5 font-medium text-muted-foreground">
                  Difficulty
                </th>
                <th className="px-4 py-2.5 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-2.5 font-medium text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.slug}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{course.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ${
                        DIFFICULTY_COLORS[course.difficulty] ?? ""
                      }`}
                    >
                      {course.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                        course.is_published
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {course.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/courses/${course.slug}/edit`}>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(course.slug)}
                        disabled={deleting === course.slug}
                      >
                        {deleting === course.slug ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
