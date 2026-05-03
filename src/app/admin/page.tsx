"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, BookOpen, Plus, Loader2 } from "lucide-react";
import { getBlogs, getCourses } from "@/lib/admin-api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const [blogCount, setBlogCount] = useState<number | null>(null);
  const [courseCount, setCourseCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getBlogs()
        .then((b) => setBlogCount(b.length))
        .catch(() => setBlogCount(0)),
      getCourses()
        .then((c) => setCourseCount(c.length))
        .catch(() => setCourseCount(0)),
    ]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your content from one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Blogs Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              Blog Posts
            </CardTitle>
            <CardDescription>
              Write and manage your articles
            </CardDescription>
            <CardAction>
              <Link href="/admin/blogs/new">
                <Button variant="outline" size="sm">
                  <Plus className="h-3.5 w-3.5" data-icon="inline-start" />
                  New Post
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <span className="text-3xl font-semibold tabular-nums">
                    {blogCount}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    total posts
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Courses Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              Mini Courses
            </CardTitle>
            <CardDescription>
              Build structured learning paths
            </CardDescription>
            <CardAction>
              <Link href="/admin/courses/new">
                <Button variant="outline" size="sm">
                  <Plus className="h-3.5 w-3.5" data-icon="inline-start" />
                  New Course
                </Button>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <span className="text-3xl font-semibold tabular-nums">
                    {courseCount}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    total courses
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
