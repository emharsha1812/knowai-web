'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const cards = [
  {
    id: "math-foundations-generative-ai",
    title: "Mathematical Foundations of Generative AI",
    icon: "/generative_ai.png",
    tags: ["Math", "Probability", "GenAI"],
    bg: "bg-[#f0d97a]",
    textColor: "text-[#3d2d04]",
    tagBg: "bg-black/10",
    href: "/courses/math-foundations-generative-ai",
    live: true,
  },
  {
    id: "reinforcement-learning",
    title: "Reinforcement Learning",
    icon: "/RL.png",
    tags: ["PPO", "Q-Learning", "RLHF"],
    bg: "bg-[#aac2a7]",
    textColor: "text-[#1a2f18]",
    tagBg: "bg-black/10",
    href: "/courses",
    live: false,
  },
  {
    id: "nlp",
    title: "Natural Language Processing",
    icon: "/NLP.png",
    tags: ["Transformers", "LLMs", "Tokenization"],
    bg: "bg-[#a9c8e8]",
    textColor: "text-[#152d47]",
    tagBg: "bg-black/10",
    href: "/courses",
    live: false,
  },
];

export function CategoryCards() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-4 w-full overflow-hidden">
      <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing pl-4 md:pl-8 pr-8">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex gap-6 pb-8"
        >
          {cards.map((c) => (
            <motion.div key={c.id} className="shrink-0 pointer-events-auto">
              <Link
                href={c.href}
                draggable={false}
                className={`
                  relative shrink-0
                  w-70 h-90 md:w-80 md:h-105
                  rounded-[2.5rem] p-8 flex flex-col justify-between
                  transition-transform
                  ${c.bg} ${c.textColor}
                  ${c.live ? "hover:-translate-y-2" : "opacity-50 grayscale cursor-default pointer-events-none"}
                `}
              >
                {/* Top row */}
                <div className="flex justify-between items-start">
                  {c.live ? (
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70 bg-black/10 px-2 py-1 rounded-full">
                      Live
                    </span>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                      Coming soon
                    </span>
                  )}
                  {c.live && (
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-36 h-36 md:w-44 md:h-44 drop-shadow-lg pointer-events-none">
                    <Image
                      src={c.icon}
                      alt={c.title}
                      fill
                      draggable={false}
                      className="object-contain pointer-events-none"
                      sizes="(max-width: 768px) 144px, 176px"
                    />
                  </div>
                </div>

                {/* Bottom: title + tags */}
                <div className="relative z-10 flex flex-col gap-3">
                  <h3 className="font-heading text-lg md:text-xl font-bold leading-snug">{c.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${c.tagBg} backdrop-blur-sm`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
