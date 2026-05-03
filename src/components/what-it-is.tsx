export function WhatItIs() {
  return (
    <section className="py-24 px-4 container mx-auto border-t border-border/50">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-3xl mb-8">A library, not a course.</h2>
        <div className="flex flex-col gap-6 text-lg text-foreground/80 leading-relaxed font-serif max-w-[68ch]">
          <p>
            Veridic is a single-author technical learning platform for AI and machine learning. It is built around one core belief: you don't understand something in AI until you can read it, question it, and reconstruct it from scratch. Every single format on this platform serves one of those three stages. Nothing exists for decoration.
          </p>
          <p>
            You read a paragraph explaining the tiling strategy in Flash Attention, and the code cell below it runs. You modify it. You see what breaks. Reading mode looks like a typeset essay. Execution mode makes every cell live. This fusion of prose and systems code is the foundation everything else is built upon.
          </p>
        </div>
      </div>
    </section>
  );
}
