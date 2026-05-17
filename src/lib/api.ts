import { PLACEHOLDER_COURSES } from "@/lib/placeholder-courses";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    throw new Error("Backend unreachable. Is the API server running?");
  }
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

// ── Types ──────────────────────────────────────────────────────────────────

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export interface CourseSummary {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  difficulty: DifficultyLevel;
  tags: string[] | null;
  estimated_hours: number | null;
  is_published: boolean;
  created_at: string;
}

export interface LessonSummary {
  id: number;
  slug: string;
  title: string;
  order: number;
  reading_time_minutes: number | null;
  is_published: boolean;
  problem_id: number | null;
}

export interface Chapter {
  id: number;
  course_id: number;
  title: string;
  description: string | null;
  order: number;
  lessons: LessonSummary[];
  created_at: string;
}

export interface CourseDetail extends CourseSummary {
  description: string;
  cover_image_url: string | null;
  prerequisites: string[] | null;
  final_project_problem_id: number | null;
  chapters: Chapter[];
  updated_at: string;
}

export interface MarimoCell {
  id: string;
  code: string;
  cell_type: string;
}

export interface Lesson {
  id: number;
  chapter_id: number;
  slug: string;
  title: string;
  content: string;
  marimo_cells: MarimoCell[] | null;
  order: number;
  reading_time_minutes: number | null;
  is_published: boolean;
  problem_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  is_published: boolean;
  reading_time_minutes: number;
  created_at: string;
  updated_at: string;
}

// ── API calls ──────────────────────────────────────────────────────────────

const PLACEHOLDER_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Scaled Dot-Product Attention: A visual breakdown",
    slug: "scaled-dot-product",
    summary:
      "An interactive, visual explanation of how Transformers pay attention to data, starting from basic dot products to multi-head setups.",
    content: "",
    tags: ["Machine Learning", "Transformers", "Visual Guide"],
    is_published: true,
    reading_time_minutes: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const posts = await apiFetch<BlogPost[]>("/writing/");
    return posts.length > 0 ? posts : PLACEHOLDER_BLOGS;
  } catch {
    return PLACEHOLDER_BLOGS;
  }
}

const RL101_SUMMARY: CourseSummary = {
  id: 1,
  slug: "reinforcement-learning-101",
  title: "Reinforcement Learning 101",
  subtitle: "From Markov decisions to policy gradients — the complete beginner's path.",
  difficulty: "beginner",
  tags: ["rl", "foundations", "policy-gradients"],
  estimated_hours: 10,
  is_published: false,
  created_at: "2026-05-03T00:00:00Z",
};

export async function getCourses(page = 1): Promise<CourseSummary[]> {
  try {
    const courses = await apiFetch<CourseSummary[]>(`/courses?page=${page}&page_size=30`);
    // Always surface RL 101 as the pinned coming-soon entry
    const withoutRL101 = courses.filter((c) => c.slug !== "reinforcement-learning-101");
    return [...withoutRL101, RL101_SUMMARY];
  } catch {
    return [RL101_SUMMARY];
  }
}

export async function getCourse(slug: string): Promise<CourseDetail> {
  return apiFetch<CourseDetail>(`/courses/${slug}`);
}

export async function getLesson(slug: string): Promise<Lesson> {
  return apiFetch<Lesson>(`/courses/lessons/${slug}`);
}

// ── Marginalia ─────────────────────────────────────────────────────────────

export type NoteType = "intuition" | "definition" | "note" | "question";

export interface MarginaliaNote {
  id: number;
  article_slug: string;
  section_id: string | null;
  note_type: NoteType;
  label: string | null;
  content: string;
  color: string | null;
  created_at: string;
  updated_at: string;
}

function authHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

export async function fetchMarginalia(articleSlug: string, token: string): Promise<MarginaliaNote[]> {
  return apiFetch<MarginaliaNote[]>(`/marginalia/${articleSlug}`, {
    headers: authHeader(token),
  });
}

export async function createMarginaliaNote(
  token: string,
  data: { article_slug: string; section_id?: string; note_type: NoteType; label?: string; content: string; color?: string }
): Promise<MarginaliaNote> {
  return apiFetch<MarginaliaNote>("/marginalia", {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify(data),
  });
}

export async function updateMarginaliaNote(
  token: string,
  noteId: number,
  data: { label?: string; content?: string; note_type?: NoteType; color?: string }
): Promise<MarginaliaNote> {
  return apiFetch<MarginaliaNote>(`/marginalia/${noteId}`, {
    method: "PATCH",
    headers: authHeader(token),
    body: JSON.stringify(data),
  });
}

export async function deleteMarginaliaNote(token: string, noteId: number): Promise<void> {
  await apiFetch<void>(`/marginalia/${noteId}`, {
    method: "DELETE",
    headers: authHeader(token),
  });
}

// ── Watch Notes ────────────────────────────────────────────────────────────

export interface WatchNoteSection {
  ts: string;
  label: string;
  heading: string;
  body_md: string;
}

export interface WatchNoteSummary {
  id: number;
  slug: string;
  youtube_video_id: string;
  channel: string;
  author: string | null;
  title: string;
  duration: string;
  watched_ratio: number;
  note_count: number;
  page_count: number;
  tag: string;
  color: string;
  last_note: string | null;
  thumb_bg: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

export interface WatchNoteDetail extends WatchNoteSummary {
  sections: WatchNoteSection[] | null;
  pdf_url: string | null;
  view_count: number;
  updated_at: string;
}

export async function getWatchNotes(tag?: string): Promise<WatchNoteSummary[]> {
  const url = tag ? `/watch-notes?tag=${encodeURIComponent(tag)}` : "/watch-notes";
  return apiFetch<WatchNoteSummary[]>(url);
}

export async function getWatchNote(slug: string): Promise<WatchNoteDetail> {
  return apiFetch<WatchNoteDetail>(`/watch-notes/${slug}`);
}
