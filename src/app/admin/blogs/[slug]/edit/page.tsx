"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBlog, updateBlog, type BlogPost, type BlogPostCreate } from "@/lib/admin-api";
import { BlogForm } from "@/components/admin/blog-form";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBlog(slug)
      .then(setBlog)
      .catch(() => setError("Failed to load blog post"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (data: BlogPostCreate) => {
    await updateBlog(slug, data);
    router.push("/admin/blogs");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-destructive">{error || "Post not found"}</p>
      </div>
    );
  }

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
          Edit: {blog.title}
        </h1>
      </div>

      <BlogForm
        initial={blog}
        onSubmit={handleSubmit}
        submitLabel="Update & Publish"
      />
    </div>
  );
}
