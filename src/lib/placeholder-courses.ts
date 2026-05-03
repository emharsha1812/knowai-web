import type { CourseDetail, Lesson } from "@/lib/api";

export const PLACEHOLDER_COURSES: Record<string, CourseDetail> = {
  rlvr: {
    id: 1,
    slug: "rlvr",
    title: "RLVR: Reinforcement Learning from Verifiable Rewards",
    subtitle: "How models learn to reason through trial and error with verifiable feedback.",
    description:
      "RLVR is the training technique behind DeepSeek-R1 and reasoning-capable LLMs. Unlike RLHF, it uses rewards that can be verified programmatically — math answers, code correctness, logic puzzles. This course builds RLVR from scratch: policy gradient methods, reward modeling, and the full training loop.",
    difficulty: "advanced",
    tags: ["rl", "reasoning", "llm"],
    estimated_hours: 8,
    is_published: true,
    cover_image_url: null,
    prerequisites: ["Transformers fundamentals", "Basic policy gradient methods"],
    final_project_problem_id: null,
    created_at: "2026-05-01T00:00:00Z",
    updated_at: "2026-05-01T00:00:00Z",
    chapters: [
      {
        id: 1, course_id: 1, title: "Foundations", description: null, order: 1,
        created_at: "2026-05-01T00:00:00Z",
        lessons: [
          { id: 1, slug: "what-is-rlvr", title: "What is RLVR?", order: 1, reading_time_minutes: 12, is_published: true, problem_id: null },
          { id: 2, slug: "policy-gradient-primer", title: "Policy Gradient Primer", order: 2, reading_time_minutes: 20, is_published: true, problem_id: null },
          { id: 3, slug: "verifiable-rewards", title: "Verifiable Rewards vs. Human Feedback", order: 3, reading_time_minutes: 15, is_published: true, problem_id: null },
        ],
      },
      {
        id: 2, course_id: 1, title: "The Training Loop", description: null, order: 2,
        created_at: "2026-05-01T00:00:00Z",
        lessons: [
          { id: 4, slug: "grpo-algorithm", title: "GRPO: Group Relative Policy Optimization", order: 1, reading_time_minutes: 25, is_published: true, problem_id: null },
          { id: 5, slug: "reward-shaping", title: "Reward Shaping and Sparse Rewards", order: 2, reading_time_minutes: 18, is_published: true, problem_id: null },
          { id: 6, slug: "rlvr-implementation", title: "Implementing a Minimal RLVR Loop", order: 3, reading_time_minutes: 30, is_published: true, problem_id: 1 },
        ],
      },
    ],
  },
  rlhf: {
    id: 2,
    slug: "rlhf",
    title: "RLHF: Reinforcement Learning from Human Feedback",
    subtitle: "The alignment technique behind ChatGPT — built from scratch.",
    description:
      "RLHF is how InstructGPT and ChatGPT were trained to follow instructions and be helpful. This course covers the full pipeline: supervised fine-tuning, reward model training from human preference data, and PPO-based policy optimization. You will implement each stage.",
    difficulty: "advanced",
    tags: ["rl", "alignment", "llm"],
    estimated_hours: 10,
    is_published: true,
    cover_image_url: null,
    prerequisites: ["Transformers fundamentals", "Supervised fine-tuning basics"],
    final_project_problem_id: null,
    created_at: "2026-05-01T00:00:00Z",
    updated_at: "2026-05-01T00:00:00Z",
    chapters: [
      {
        id: 3, course_id: 2, title: "The Three-Stage Pipeline", description: null, order: 1,
        created_at: "2026-05-01T00:00:00Z",
        lessons: [
          { id: 7, slug: "rlhf-overview", title: "RLHF: The Full Picture", order: 1, reading_time_minutes: 10, is_published: true, problem_id: null },
          { id: 8, slug: "supervised-finetuning", title: "Stage 1: Supervised Fine-Tuning", order: 2, reading_time_minutes: 20, is_published: true, problem_id: null },
          { id: 9, slug: "reward-model-training", title: "Stage 2: Reward Model from Preferences", order: 3, reading_time_minutes: 25, is_published: true, problem_id: null },
        ],
      },
      {
        id: 4, course_id: 2, title: "PPO and Policy Optimization", description: null, order: 2,
        created_at: "2026-05-01T00:00:00Z",
        lessons: [
          { id: 10, slug: "ppo-for-llms", title: "PPO for Language Models", order: 1, reading_time_minutes: 30, is_published: true, problem_id: null },
          { id: 11, slug: "kl-divergence-penalty", title: "KL Penalty and Reward Hacking", order: 2, reading_time_minutes: 18, is_published: true, problem_id: null },
          { id: 12, slug: "rlhf-full-loop", title: "Putting It Together: Full RLHF Loop", order: 3, reading_time_minutes: 35, is_published: true, problem_id: 2 },
        ],
      },
    ],
  },
  "math-foundations-genai": {
    id: 3,
    slug: "math-foundations-genai",
    title: "Mathematical Foundations of Generative AI",
    subtitle: "Probability, information theory, and optimization — the math that underpins every model.",
    description:
      "You cannot deeply understand diffusion, transformers, or VAEs without the math. This course builds the foundations: probability distributions, KL divergence, variational inference, gradient descent, and matrix calculus. Every concept is linked to a real model component.",
    difficulty: "intermediate",
    tags: ["math", "probability", "optimization"],
    estimated_hours: 12,
    is_published: true,
    cover_image_url: null,
    prerequisites: ["Linear algebra basics", "Calculus"],
    final_project_problem_id: null,
    created_at: "2026-05-01T00:00:00Z",
    updated_at: "2026-05-01T00:00:00Z",
    chapters: [
      {
        id: 5, course_id: 3, title: "Probability and Distributions", description: null, order: 1,
        created_at: "2026-05-01T00:00:00Z",
        lessons: [
          { id: 13, slug: "probability-review", title: "Probability: What You Actually Need to Know", order: 1, reading_time_minutes: 15, is_published: true, problem_id: null },
          { id: 14, slug: "gaussian-distribution", title: "The Gaussian Distribution in Depth", order: 2, reading_time_minutes: 20, is_published: true, problem_id: null },
          { id: 15, slug: "kl-divergence", title: "KL Divergence and Why It Matters", order: 3, reading_time_minutes: 18, is_published: true, problem_id: null },
        ],
      },
      {
        id: 6, course_id: 3, title: "Optimization", description: null, order: 2,
        created_at: "2026-05-01T00:00:00Z",
        lessons: [
          { id: 16, slug: "gradient-descent", title: "Gradient Descent: From Calculus to Code", order: 1, reading_time_minutes: 22, is_published: true, problem_id: null },
          { id: 17, slug: "adam-optimizer", title: "Adam and Adaptive Learning Rates", order: 2, reading_time_minutes: 20, is_published: true, problem_id: null },
          { id: 18, slug: "variational-inference", title: "Variational Inference and the ELBO", order: 3, reading_time_minutes: 28, is_published: true, problem_id: null },
        ],
      },
    ],
  },
};

// Map lesson slug → course slug for fallback lookups
export const LESSON_TO_COURSE: Record<string, string> = Object.fromEntries(
  Object.values(PLACEHOLDER_COURSES).flatMap((course) =>
    course.chapters.flatMap((ch) =>
      ch.lessons.map((l) => [l.slug, course.slug])
    )
  )
);

export const PLACEHOLDER_LESSONS: Record<string, Lesson> = {
  "what-is-rlvr": {
    id: 1, chapter_id: 1, slug: "what-is-rlvr",
    title: "What is RLVR?",
    content: `## What is RLVR?

Reinforcement Learning from Verifiable Rewards (RLVR) is a training paradigm where a language model learns by receiving rewards that can be verified automatically — without human labelers.

The key insight: for certain tasks, correctness is binary and checkable. A math problem has a right answer. A piece of code either passes the test suite or doesn't.

### Why This Matters

Classical RLHF requires humans to compare model outputs and express preferences. This is slow, noisy, and hard to scale. RLVR sidesteps this entirely for tasks where a verifier exists.

### The Core Loop

\`\`\`python
for step in range(training_steps):
    problem = sample_problem()
    response = policy.generate(problem)
    reward = verifier.check(response, problem.answer)
    policy.update(reward)
\`\`\`

The verifier is the critical component. It must be reliable: a flawed verifier leads to reward hacking.
`,
    marimo_cells: [], order: 1, reading_time_minutes: 12, is_published: true, problem_id: null,
    created_at: "2026-05-01T00:00:00Z", updated_at: "2026-05-01T00:00:00Z",
  },
  "rlhf-overview": {
    id: 7, chapter_id: 3, slug: "rlhf-overview",
    title: "RLHF: The Full Picture",
    content: `## RLHF: The Full Picture

Reinforcement Learning from Human Feedback (RLHF) is the technique that turned base language models into assistants. It is the difference between GPT-3 and InstructGPT.

### The Three Stages

**Stage 1 — Supervised Fine-Tuning (SFT)**

Start with a pretrained base model. Fine-tune it on a curated dataset of prompt-response pairs written by humans.

**Stage 2 — Reward Model Training**

Collect comparisons: show human raters two model outputs for the same prompt, and ask which is better. Train a separate model to predict these preferences.

**Stage 3 — RL with PPO**

Use the reward model as the environment. Run PPO to fine-tune the SFT model to maximize the reward model's score, with a KL penalty to prevent reward hacking.
`,
    marimo_cells: [], order: 1, reading_time_minutes: 10, is_published: true, problem_id: null,
    created_at: "2026-05-01T00:00:00Z", updated_at: "2026-05-01T00:00:00Z",
  },
  "probability-review": {
    id: 13, chapter_id: 5, slug: "probability-review",
    title: "Probability: What You Actually Need to Know",
    content: `## Probability: What You Actually Need to Know

Most probability courses teach you far more than you need for ML. This lesson covers exactly what matters.

### Random Variables and Distributions

For a continuous variable, we work with a probability density function:

$$p(x) \\geq 0 \\quad \\text{and} \\quad \\int_{-\\infty}^{\\infty} p(x)\\, dx = 1$$

### Expectation

The expected value of $f(X)$ under distribution $p$:

$$\\mathbb{E}_{x \\sim p}[f(x)] = \\int f(x)\\, p(x)\\, dx$$

This is the single most important operation in probabilistic ML.

### Bayes' Theorem

$$p(A \\mid B) = \\frac{p(B \\mid A)\\, p(A)}{p(B)}$$
`,
    marimo_cells: [], order: 1, reading_time_minutes: 15, is_published: true, problem_id: null,
    created_at: "2026-05-01T00:00:00Z", updated_at: "2026-05-01T00:00:00Z",
  },
};
