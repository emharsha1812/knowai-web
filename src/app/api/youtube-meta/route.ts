import { NextRequest, NextResponse } from "next/server";

function extractVideoId(input: string): string | null {
  try {
    const url = new URL(input);
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("?")[0];
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2];
    if (url.pathname.startsWith("/embed/")) return url.pathname.split("/")[2];
    return url.searchParams.get("v");
  } catch {
    // bare video ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(input.trim())) return input.trim();
    return null;
  }
}

export async function GET(req: NextRequest) {
  const raw = req.nextUrl.searchParams.get("url") ?? "";
  const videoId = extractVideoId(raw);
  if (!videoId) {
    return NextResponse.json({ error: "Could not parse a YouTube video ID from that URL" }, { status: 400 });
  }

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;

  let data: { title: string; author_name: string; thumbnail_url: string };
  try {
    const res = await fetch(oembedUrl, { next: { revalidate: 0 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Video not found or not embeddable" }, { status: 404 });
    }
    data = await res.json();
  } catch {
    return NextResponse.json({ error: "Failed to reach YouTube" }, { status: 502 });
  }

  return NextResponse.json({
    video_id: videoId,
    title: data.title,
    channel: data.author_name,
    thumbnail_url: data.thumbnail_url,
  });
}
