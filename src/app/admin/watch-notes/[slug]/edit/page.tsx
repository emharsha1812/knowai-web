"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  getAdminWatchNote,
  updateWatchNote,
  type WatchNote,
  type WatchNoteCreate,
} from "@/lib/admin-api";
import { WatchNoteForm } from "@/components/admin/watch-note-form";

export default function EditWatchNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [note, setNote] = useState<WatchNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminWatchNote(slug)
      .then(setNote)
      .catch(() => setError("Failed to load watch note"))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (data: WatchNoteCreate) => {
    await updateWatchNote(slug, data);
    router.push("/admin/watch-notes");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="mx-auto max-w-5xl">
        <p className="text-sm text-destructive">
          {error || "Watch note not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <Link
          href="/admin/watch-notes"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to watch notes
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Edit: {note.title}
        </h1>
      </div>

      <WatchNoteForm
        initial={{
          slug: note.slug,
          youtube_video_id: note.youtube_video_id,
          channel: note.channel,
          author: note.author,
          title: note.title,
          duration: note.duration,
          tag: note.tag,
          color: note.color,
          thumb_bg: note.thumb_bg,
          note_count: note.note_count,
          page_count: note.page_count,
          last_note: note.last_note,
          pdf_url: note.pdf_url,
          is_published: note.is_published,
          is_featured: note.is_featured,
          sections: note.sections ?? [],
        }}
        onSubmit={handleSubmit}
        submitLabel="Update & Publish"
      />
    </div>
  );
}
