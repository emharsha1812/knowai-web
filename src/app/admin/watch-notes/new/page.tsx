"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createWatchNote, type WatchNoteCreate } from "@/lib/admin-api";
import { WatchNoteForm } from "@/components/admin/watch-note-form";

export default function NewWatchNotePage() {
  const router = useRouter();

  const handleSubmit = async (data: WatchNoteCreate) => {
    await createWatchNote(data);
    router.push("/admin/watch-notes");
  };

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
          New Watch Note
        </h1>
      </div>

      <WatchNoteForm onSubmit={handleSubmit} submitLabel="Publish" />
    </div>
  );
}
