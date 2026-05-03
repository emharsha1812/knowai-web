"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogs, deleteBlog, type BlogPost } from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  FileText,
} from "lucide-react";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch {
      /* silently fail — could add error state */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await deleteBlog(slug);
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    } catch {
      alert("Failed to delete post");
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
            Blog Posts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage all your articles
          </p>
        </div>
        <Link href="/admin/blogs/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <FileText className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No blog posts yet</p>
          <Link href="/admin/blogs/new" className="mt-3">
            <Button variant="outline" size="sm">
              Create your first post
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
                  Status
                </th>
                <th className="hidden px-4 py-2.5 font-medium text-muted-foreground sm:table-cell">
                  Created
                </th>
                <th className="px-4 py-2.5 font-medium text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog.slug}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{blog.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                        blog.is_published
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {blog.created_at
                      ? new Date(blog.created_at).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/blogs/${blog.slug}/edit`}>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(blog.slug)}
                        disabled={deleting === blog.slug}
                      >
                        {deleting === blog.slug ? (
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
