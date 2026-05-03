import type { CourseDetail, Lesson } from "@/lib/api";

export const PLACEHOLDER_COURSES: Record<string, CourseDetail> = {
  "reinforcement-learning-101": {
    id: 1,
    slug: "reinforcement-learning-101",
    title: "Reinforcement Learning 101",
    subtitle: "From Markov decisions to policy gradients — the complete beginner's path.",
    description:
      "A ground-up introduction to reinforcement learning. No prior RL experience needed. You'll build intuition for MDPs, Q-learning, and policy gradient methods before connecting them to modern LLM training techniques like RLHF and RLVR.",
    difficulty: "beginner",
    tags: ["rl", "foundations", "policy-gradients"],
    estimated_hours: 10,
    is_published: false,
    cover_image_url: null,
    prerequisites: ["Basic Python", "Linear algebra basics"],
    final_project_problem_id: null,
    created_at: "2026-05-03T00:00:00Z",
    updated_at: "2026-05-03T00:00:00Z",
    chapters: [],
  },
};

export const LESSON_TO_COURSE: Record<string, string> = {};
export const PLACEHOLDER_LESSONS: Record<string, Lesson> = {};
