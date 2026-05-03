import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="bg-[#050505] text-white py-32 px-4 relative overflow-hidden flex items-center justify-center border-t border-white/10">
      {/* Ghost Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[12rem] md:text-[20rem] lg:text-[28rem] font-heading font-bold text-white opacity-[0.02] tracking-tighter whitespace-nowrap leading-none mt-12 md:mt-0">
          Know Deeply
        </span>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-xl text-center w-full">
        <h2 className="font-heading text-5xl md:text-6xl tracking-tight mb-4">
          Go deep. <br/> Stay there.
        </h2>
        <p className="text-white/60 mb-10 text-lg">
          Join the early access list to get updates on new courses, implementation problems, and deep dives.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
          <Input 
            type="email" 
            placeholder="johndoe@example.com" 
            className="rounded-none bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 h-12 flex-1"
            required 
          />
          <Button 
            type="submit" 
            className="rounded-none bg-white text-black hover:bg-white/90 h-12 uppercase tracking-wider text-xs font-semibold px-8"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
