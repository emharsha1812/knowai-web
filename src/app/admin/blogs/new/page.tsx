"use client";

import { useRouter } from "next/navigation";
import { createBlog, type BlogPostCreate } from "@/lib/admin-api";
import { BlogForm } from "@/components/admin/blog-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  const router = useRouter();

  const handleSubmit = async (data: BlogPostCreate) => {
    await createBlog(data);
    router.push("/admin/blogs");
  };

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-6">
        <Link
          href="/admin/blogs"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to posts
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          New Blog Post
        </h1>
      </div>

      <BlogForm onSubmit={handleSubmit} submitLabel="Publish" />
    </div>
  );
}
