const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

// ── Token helpers ─────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("knowai-admin-token");
}

export function setToken(token: string): void {
  localStorage.setItem("knowai-admin-token", token);
}

export function clearToken(): void {
  localStorage.removeItem("knowai-admin-token");
}

// ── Authenticated fetch ───────────────────────────────────────────────────────

export async function adminFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as Record<string, string> ?? {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers,
    });
  } catch (error) {
    throw new Error("Backend connection failed. Is the API server running?");
  }

  if (!res.ok) {
    let body = await res.text().catch(() => "");
    try {
      const json = JSON.parse(body);
      if (json.detail) {
        body = typeof json.detail === "string" ? json.detail : JSON.stringify(json.detail);
      }
    } catch {}
    throw new Error(body || `API error ${res.status}: ${path}`);
  }

  // Handle 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface User {
  id: number;
  email: string;
  role: string;
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

export interface BlogPostCreate {
  title: string;
  slug: string;
  summary: string;
  content: string;
  tags: string[];
  is_published: boolean;
  reading_time_minutes: number;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  tags: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseCreate {
  title: string;
  slug: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimated_hours: number;
  tags: string[];
  is_published: boolean;
}

export interface Chapter {
  id: number;
  course_id: number;
  title: string;
  order: number;
  lessons: LessonSummary[];
  created_at: string;
}

export interface ChapterCreate {
  title: string;
  order: number;
}

export interface LessonSummary {
  id: number;
  slug: string;
  title: string;
  order: number;
  reading_time_minutes: number | null;
  is_published: boolean;
}

export interface Lesson {
  id: number;
  chapter_id: number;
  slug: string;
  title: string;
  content: string;
  order: number;
  reading_time_minutes: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonCreate {
  title: string;
  slug: string;
  content: string;
  order: number;
  reading_time_minutes: number;
  is_published: boolean;
}

export interface CourseDetail extends Course {
  chapters: Chapter[];
}

// ── Auth API ──────────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<AuthTokens> {
  return adminFetch<AuthTokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function getMe(): Promise<User> {
  return adminFetch<User>("/auth/me");
}

// ── Blog API ──────────────────────────────────────────────────────────────────

export async function getBlogs(): Promise<BlogPost[]> {
  return adminFetch<BlogPost[]>("/writing/");
}

export async function getBlog(slug: string): Promise<BlogPost> {
  return adminFetch<BlogPost>(`/writing/${slug}`);
}

export async function createBlog(data: BlogPostCreate): Promise<BlogPost> {
  return adminFetch<BlogPost>("/writing/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateBlog(slug: string, data: Partial<BlogPostCreate>): Promise<BlogPost> {
  return adminFetch<BlogPost>(`/writing/${slug}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteBlog(slug: string): Promise<void> {
  return adminFetch<void>(`/writing/${slug}`, {
    method: "DELETE",
  });
}

// ── Course API ────────────────────────────────────────────────────────────────

export async function getCourses(): Promise<Course[]> {
  return adminFetch<Course[]>("/courses/");
}

export async function getCourse(slug: string): Promise<CourseDetail> {
  return adminFetch<CourseDetail>(`/courses/${slug}`);
}

export async function createCourse(data: CourseCreate): Promise<Course> {
  return adminFetch<Course>("/courses/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCourse(slug: string, data: Partial<CourseCreate>): Promise<Course> {
  return adminFetch<Course>(`/courses/${slug}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteCourse(slug: string): Promise<void> {
  return adminFetch<void>(`/courses/${slug}`, {
    method: "DELETE",
  });
}

// ── Chapter API ───────────────────────────────────────────────────────────────

export async function createChapter(courseSlug: string, data: ChapterCreate): Promise<Chapter> {
  return adminFetch<Chapter>(`/courses/${courseSlug}/chapters/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateChapter(
  courseSlug: string,
  chapterId: number,
  data: Partial<ChapterCreate>
): Promise<Chapter> {
  return adminFetch<Chapter>(`/chapters/${chapterId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteChapter(courseSlug: string, chapterId: number): Promise<void> {
  return adminFetch<void>(`/chapters/${chapterId}`, {
    method: "DELETE",
  });
}

// ── Lesson API ────────────────────────────────────────────────────────────────

export async function createLesson(chapterId: number, data: LessonCreate): Promise<Lesson> {
  return adminFetch<Lesson>(`/chapters/${chapterId}/lessons/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getLesson(slug: string): Promise<Lesson> {
  return adminFetch<Lesson>(`/courses/lessons/${slug}`);
}

export async function updateLesson(slug: string, data: Partial<LessonCreate>): Promise<Lesson> {
  return adminFetch<Lesson>(`/courses/lessons/${slug}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteLesson(slug: string): Promise<void> {
  return adminFetch<void>(`/courses/lessons/${slug}`, {
    method: "DELETE",
  });
}
