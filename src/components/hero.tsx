import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-40 pb-24 px-4 container mx-auto flex flex-col items-center justify-center relative overflow-hidden">
      {/* Centered Content */}
      <div className="w-full mx-auto max-w-3xl relative z-10 flex flex-col items-center text-center">
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 mt-12 md:mt-0">
          AI/ML, <span className="relative inline-block">
            <span className="relative z-10">understood</span>
            <svg 
              className="absolute left-[-5%] top-[35%] w-[110%] h-[45%] text-[#f2b94a] opacity-80 mix-blend-multiply z-0" 
              viewBox="0 0 200 40" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M 5 25 Q 50 15 100 28 T 195 18" 
                stroke="currentColor" 
                strokeWidth="18" 
                strokeLinecap="round" 
                fill="none" 
              />
            </svg>
          </span> <br className="hidden md:block"/> from within.
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed mx-auto">
          Not tutorials. Not summaries. Deep technical writing where prose and code are the same document, and everything runs.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button className="rounded-none bg-foreground text-background hover:bg-foreground/90 text-sm uppercase tracking-wider px-8 py-6">
            Start Reading
          </Button>
          <Button variant="outline" className="rounded-none border-foreground hover:bg-muted text-sm uppercase tracking-wider px-8 py-6">
            View Syllabus
          </Button>
        </div>
      </div>
    </section>
  );
}
