import { getWatchNote } from '@/lib/api';
import PrintView from './print-view';

export default async function PrintPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let note;
  try {
    note = await getWatchNote(slug);
  } catch {
    return (
      <div style={{ padding: 80, fontFamily: 'monospace', fontSize: 14 }}>
        Note not found: {slug}
      </div>
    );
  }

  return <PrintView note={note} />;
}
