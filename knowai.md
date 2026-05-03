KnowAI — Comprehensive Build Prompt

What you are building
KnowAI is a single-author technical learning platform for AI and machine learning. It is not a course aggregator, not a newsletter, not a tutorial site. The closest thing to it is if Distill.pub, Neetcode, and a well-curated university library existed as one product — built by one person, for people who want to go genuinely deep on AI.
The platform is built around one core belief: you don't understand something in AI until you can read it, question it, and reconstruct it from scratch. Every format on the platform serves one of those three stages. Nothing exists for decoration.

The formats
Writing — Long-form technical posts that are simultaneously runnable notebooks. The prose and the code are the same document. You read a paragraph explaining the tiling strategy in Flash Attention, and the cell below it runs. You modify it. You see what breaks. Reading mode looks like a typeset essay. Execution mode makes every cell live. This is the foundation everything else is built on.
Courses — Structured learning paths for people who want to go through a topic end to end. Each course has chapters, lessons, and a final implementation project — not a quiz, an actual small build. Lessons are shorter versions of Writing posts, sequenced deliberately. Example courses: Transformers from the Ground Up, GPU Programming with Triton, How Diffusion Models Actually Work, RLHF and Alignment, Building RAG Systems. Educative.io's format with the depth of a serious technical book and none of the corporate shallowness.
Problems — Implementation challenges. Not theory MCQs. Problem statement, spec, hidden test cases, a code editor that runs in browser. On solving, a full solution reveal with line-by-line explanation. Categories: Architecture, Training, GPU/Systems, Paper Implementations, Debugging. Reference: Deep-ML and Neetcode, but exclusively AI/ML and harder.
Playlists — Curated ordered sequences of problems for a specific goal. Crack the ML systems interview — 25 problems in order. Implement a transformer in 10 problems — each builds on the last. GPU programming track — Triton problems by difficulty. People don't want 300 random problems. They want someone to tell them which 25 to do and in what order.
QnA Labs — Embedded question sets that live inside the content. Not a separate quiz page — surfaced after a lesson or Writing post. Two types: Conceptual QnA (short answer, no autograding — "explain why softmax is applied before the value matrix") and Diagnostic QnA (before a course, surfaces what you already know so you know what to skim). Question Playlists work the same way as Problem Playlists — "50 questions to prepare for an ML research interview", "30 questions on transformer internals before your next paper reading."
Concepts — Short precise standalone pages for specific concepts. 300–800 words, one runnable example, links to Writing posts and Course lessons that cover it in depth, links to Problems that test it. The SEO entry point. Someone searches "what is KV cache", lands here, gets a clean explanation with a running cell, discovers the full course exists.
Roadmap — Public, honest, a simple list. What's being written, what's planned, what readers have suggested.

How the formats connect
Finish a Writing post → get a QnA Lab for that post → see related Problems to test implementation. Start a Course → each lesson ends with embedded QnA → course ends with a Problem as the final project. Solve a Problem → solution reveal links to the Writing post that explains the theory behind it. Open a Concept page → links to the Course that teaches it, the Problems that test it, the QnA Lab that quizzes you on it.
Nobody hits a dead end. Every format points toward the other two.

Content areas
Transformers and attention mechanisms — Flash Attention — sparse and linear attention — state space models and Mamba — diffusion models — training at scale — RLHF and alignment — GPU programming with Triton — world models — GenAI systems (RAG, agents, evals) — MoE and routing — tokenization — positional encoding.

The aesthetic
Black and white. Completely. Not as a style choice — as a philosophical one. The content is the product. Color would compete with it. Typography, whitespace, and the writing itself carry everything.
The two references to study and absorb — copy nothing, understand everything:

natural.co — how a serious product uses whitespace and full-bleed imagery with total confidence. Notice how nothing fights for attention.
notion.so — how warmth lives inside minimalism. It is not cold. It is not a dev tool. It is a place someone would want to spend time.

The page should feel like it was designed by a person who reads a lot and also writes GPU kernels. Those two things are not in conflict. That tension is the whole identity of the product.

Landing page structure
Nav — Fixed. Logo left: "KnowAI" in a classical serif. Links: Writing / Courses / Problems / Labs. One CTA: "Early Access". 1px bottom border. No fill. Blur on scroll.
Hero — Full width. No split. Large classical serif headline centered or left-aligned: "AI/ML, understood from within." One sharp subtext line: not tutorials, not summaries — deep technical writing where prose and code are the same document, and everything runs. Two CTAs. Below, a floating card — white background, subtle shadow, dark code block inside showing a Flash Attention snippet with syntax highlighting. Card floats perpetually on a gentle CSS keyframe animation. No images in the hero. Typography and code carry it entirely.
What it is — Prose only. No bullets, no icons. Heading: "A library, not a course." Two paragraphs explaining the format. Maximum 68 characters per line.
Formats strip — Five columns, separated by 1px lines. Writing / Courses / Problems / QnA Labs / Concepts. Each column: a number, a name, one sentence. No cards, no shadows, no icons.
Article previews — Asymmetric grid. One large featured card left (2fr), two smaller right (1fr each). Featured card contains a small dark code block preview inside it. Cards separated by 1px lines, no rounded corners. Hover shifts background from off-white to pure white.
Problem preview — Three problems as a minimal list. Problem name, category tag, difficulty. A "View all problems" link. Should feel closer to terminal output than a card grid.
Topics — Single horizontal strip. Small uppercase label left. Bordered pill tags wrapping right. No fill, just 1px border.
Author — Two columns. Left: one honest paragraph, no LinkedIn energy. Right: plain bordered list — ICLR / NeurIPS / AAAI / EACL, one per row, 1px dividers between them.
CTA — Dark background. Behind all content, the text "Know Deeply" in enormous near-invisible type at 2% white opacity — visible only as a ghost watermark on second look. Headline: "Go deep. Stay there." Email input and submit button.
Footer — Logo left. One line right. Nothing else.
