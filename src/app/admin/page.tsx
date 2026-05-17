"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { FileText, BookOpen, Video, Plus, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { getBlogs, getCourses, getAdminWatchNotes } from "@/lib/admin-api";
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
  const [watchNoteCount, setWatchNoteCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  const loadCounts = useCallback(() => {
    setLoading(true);
    setApiError(false);
    let failed = false;

    Promise.all([
      getBlogs()
        .then((b) => setBlogCount(b.length))
        .catch(() => { failed = true; setBlogCount(null); }),
      getCourses()
        .then((c) => setCourseCount(c.length))
        .catch(() => { failed = true; setCourseCount(null); }),
      getAdminWatchNotes()
        .then((w) => setWatchNoteCount(w.length))
        .catch(() => { failed = true; setWatchNoteCount(null); }),
    ]).finally(() => {
      setLoading(false);
      if (failed) setApiError(true);
    });
  }, []);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

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

      {apiError && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
          <div className="flex items-center gap-2.5 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Cannot reach the backend API. Counts may be unavailable.</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadCounts}
            className="h-7 gap-1.5 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
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
                    {blogCount ?? "—"}
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
                    {courseCount ?? "—"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    total courses
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Watch Notes Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-muted-foreground" />
              Watch Notes
            </CardTitle>
            <CardDescription>
              Videos with your pre-written notes
            </CardDescription>
            <CardAction>
              <Link href="/admin/watch-notes/new">
                <Button variant="outline" size="sm">
                  <Plus className="h-3.5 w-3.5" data-icon="inline-start" />
                  New Note
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
                    {watchNoteCount ?? "—"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    total videos
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
