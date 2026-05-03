export const MOCK_USER = {
  name: "Harshwardhan Fartale",
  username: "harshwardhan",
  avatar_initials: "HF",
  bio: "Building Veridic. Interested in RL, diffusion, and GPU programming.",
  joined: "January 2026",
  provider: "github" as const,
};

export const MOCK_STATS = {
  problems_solved: 14,
  problems_attempted: 21,
  courses_completed: 1,
  courses_in_progress: 2,
  streak_days: 7,
  total_lessons_read: 23,
};

export const MOCK_COURSE_PROGRESS = [
  {
    slug: "rlhf",
    title: "RLHF: Reinforcement Learning from Human Feedback",
    difficulty: "advanced",
    total_lessons: 6,
    completed_lessons: 6,
    progress_pct: 100,
    is_completed: true,
  },
  {
    slug: "rlvr",
    title: "RLVR: Reinforcement Learning from Verifiable Rewards",
    difficulty: "advanced",
    total_lessons: 6,
    completed_lessons: 4,
    progress_pct: 67,
    is_completed: false,
  },
  {
    slug: "math-foundations-genai",
    title: "Mathematical Foundations of Generative AI",
    difficulty: "intermediate",
    total_lessons: 6,
    completed_lessons: 2,
    progress_pct: 33,
    is_completed: false,
  },
];

export const MOCK_SUBMISSIONS = [
  {
    id: 1,
    problem_slug: "softmax-impl",
    problem_title: "Implement Softmax",
    category: "Architecture",
    difficulty: "intermediate",
    status: "accepted" as const,
    submitted_at: "2026-04-30T18:22:00Z",
  },
  {
    id: 2,
    problem_slug: "cross-entropy-loss",
    problem_title: "Cross-Entropy Loss from Scratch",
    category: "Training",
    difficulty: "beginner",
    status: "accepted" as const,
    submitted_at: "2026-04-29T14:10:00Z",
  },
  {
    id: 3,
    problem_slug: "scaled-dot-product-attention",
    problem_title: "Scaled Dot-Product Attention",
    category: "Architecture",
    difficulty: "advanced",
    status: "wrong_answer" as const,
    submitted_at: "2026-04-28T21:05:00Z",
  },
  {
    id: 4,
    problem_slug: "layer-norm",
    problem_title: "Layer Normalization",
    category: "Architecture",
    difficulty: "intermediate",
    status: "accepted" as const,
    submitted_at: "2026-04-27T11:44:00Z",
  },
  {
    id: 5,
    problem_slug: "adam-optimizer",
    problem_title: "Adam Optimizer",
    category: "Training",
    difficulty: "intermediate",
    status: "accepted" as const,
    submitted_at: "2026-04-26T09:30:00Z",
  },
];

// 12 weeks × 7 days activity heatmap data
// value 0-4: 0=none, 1=light, 2=medium, 3=heavy, 4=max
export const MOCK_ACTIVITY: number[][] = [
  [0, 0, 1, 2, 0, 0, 1],
  [0, 1, 0, 3, 2, 1, 0],
  [2, 0, 0, 1, 0, 2, 1],
  [0, 0, 2, 2, 1, 0, 0],
  [1, 2, 0, 0, 3, 2, 1],
  [0, 0, 1, 2, 0, 1, 2],
  [3, 2, 1, 0, 0, 2, 3],
  [0, 1, 2, 3, 2, 0, 0],
  [2, 0, 0, 1, 3, 2, 1],
  [0, 2, 3, 2, 1, 0, 1],
  [1, 2, 3, 4, 2, 1, 0],
  [3, 4, 2, 3, 1, 2, 0], // most recent week
];
