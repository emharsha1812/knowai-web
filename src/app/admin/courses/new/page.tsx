"use client";

import { useRouter } from "next/navigation";
import { createCourse, type CourseCreate } from "@/lib/admin-api";
import { CourseForm } from "@/components/admin/course-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewCoursePage() {
  const router = useRouter();

  const handleSubmit = async (data: CourseCreate) => {
    await createCourse(data);
    router.push("/admin/courses");
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-6">
        <Link
          href="/admin/courses"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to courses
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          New Course
        </h1>
      </div>

      <CourseForm onSubmit={handleSubmit} submitLabel="Publish" />
    </div>
  );
}
