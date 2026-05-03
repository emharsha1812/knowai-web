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

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    return await apiFetch<BlogPost[]>("/writing/");
  } catch {
    return [
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
  }
}

export async function getCourses(page = 1): Promise<CourseSummary[]> {
  try {
    return await apiFetch<CourseSummary[]>(
      `/courses?page=${page}&page_size=30`,
    );
  } catch {
    return Object.values(PLACEHOLDER_COURSES).map((course) => ({
      id: course.id,
      slug: course.slug,
      title: course.title,
      subtitle: course.subtitle,
      difficulty: course.difficulty,
      tags: course.tags,
      estimated_hours: course.estimated_hours,
      is_published: course.is_published,
      created_at: course.created_at,
    }));
  }
}

export async function getCourse(slug: string): Promise<CourseDetail> {
  return apiFetch<CourseDetail>(`/courses/${slug}`);
}

export async function getLesson(slug: string): Promise<Lesson> {
  return apiFetch<Lesson>(`/courses/lessons/${slug}`);
}
