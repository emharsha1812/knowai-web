'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const cards = [
  {
    id: "ml",
    year: "2024",
    title: "Machine Learning",
    icon: "/ML.png",
    tags: ["Fundamentals", "Math", "Algorithms"],
    bg: "bg-[#a8e6b0]",      // mint green — matches ML blob
    textColor: "text-[#1a3320]",
    tagBg: "bg-black/10",
  },
  {
    id: "nlp",
    year: "2024",
    title: "Natural Language Processing",
    icon: "/NLP.png",
    tags: ["Transformers", "LLMs", "Tokenization"],
    bg: "bg-[#c9b8f0]",      // soft lavender — matches NLP blob
    textColor: "text-[#1e1535]",
    tagBg: "bg-black/10",
  },
  {
    id: "cv",
    year: "2024",
    title: "Computer Vision",
    icon: "/CV.png",
    tags: ["CNNs", "Diffusion", "ViT"],
    bg: "bg-[#f5a898]",      // warm salmon — matches CV blob
    textColor: "text-[#3a1410]",
    tagBg: "bg-black/10",
  },
  {
    id: "rl",
    year: "2024",
    title: "Reinforcement Learning",
    icon: "/RL.png",
    tags: ["PPO", "Q-Learning", "Robotics"],
    bg: "bg-[#c4aff0]",      // medium purple — matches RL blob
    textColor: "text-[#1e1535]",
    tagBg: "bg-black/10",
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
    <section className="py-12 md:py-20 w-full overflow-hidden">
      <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing pl-4 md:pl-8 pr-8">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }} 
          className="flex gap-6 pb-8"
        >
          {cards.map((c) => (
            <motion.div key={c.id} className="flex-shrink-0 pointer-events-auto">
              <Link
                href="#"
                draggable={false}
                className={`
                  relative flex-shrink-0 block
                  w-[280px] h-[360px] md:w-[320px] md:h-[420px]
                  rounded-[2.5rem] p-8 flex flex-col justify-between
                  transition-transform hover:-translate-y-2
                  ${c.bg} ${c.textColor}
                `}
              >
                {/* Top Row: Year and Arrow */}
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-lg opacity-80">{c.year}</span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                {/* Center PNG icon */}
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

                {/* Bottom: Title + Tags */}
                <div className="relative z-10 flex flex-col gap-3">
                  <h3 className="font-heading text-xl md:text-2xl font-bold">{c.title}</h3>
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
