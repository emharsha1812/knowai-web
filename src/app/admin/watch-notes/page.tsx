"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getAdminWatchNotes,
  deleteWatchNote,
  type WatchNote,
} from "@/lib/admin-api";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Loader2, Video } from "lucide-react";

export default function WatchNotesListPage() {
  const [notes, setNotes] = useState<WatchNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await getAdminWatchNotes();
      setNotes(data);
    } catch {
      /* silently fail */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      await deleteWatchNote(slug);
      setNotes((prev) => prev.filter((n) => n.slug !== slug));
    } catch {
      alert("Failed to delete watch note");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Watch Notes
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your video notes library
          </p>
        </div>
        <Link href="/admin/watch-notes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Watch Note
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <Video className="mb-3 h-10 w-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No watch notes yet</p>
          <Link href="/admin/watch-notes/new" className="mt-3">
            <Button variant="outline" size="sm">
              Add your first video
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
                <th className="hidden px-4 py-2.5 font-medium text-muted-foreground sm:table-cell">
                  Channel
                </th>
                <th className="hidden px-4 py-2.5 font-medium text-muted-foreground md:table-cell">
                  Tag
                </th>
                <th className="px-4 py-2.5 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="hidden px-4 py-2.5 font-medium text-muted-foreground sm:table-cell">
                  Sections
                </th>
                <th className="px-4 py-2.5 font-medium text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note) => (
                <tr
                  key={note.slug}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{note.title}</div>
                    <div className="text-xs text-muted-foreground font-mono mt-0.5">
                      {note.duration}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {note.channel}
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                      {note.tag}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium w-fit ${
                          note.is_published
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {note.is_published ? "Published" : "Draft"}
                      </span>
                      {note.is_featured && (
                        <span className="inline-flex items-center rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 text-xs font-medium w-fit">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                    {note.sections?.length ?? 0}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/watch-notes/${note.slug}/edit`}>
                        <Button variant="ghost" size="icon-sm">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(note.slug, note.title)}
                        disabled={deleting === note.slug}
                      >
                        {deleting === note.slug ? (
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
