export function Topics() {
  const topics = [
    "Transformers", "Flash Attention", "SSMs", "Mamba", "Diffusion",
    "RLHF", "Triton", "World Models", "Agents", "MoE", "Tokenization"
  ];

  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 pl-4">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground shrink-0 mt-1 md:mt-0">
          Explored Concepts
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {topics.map(t => (
            <span key={t} className="px-4 py-1.5 border border-border text-sm rounded-full bg-background hover:bg-foreground hover:text-background transition-colors cursor-pointer select-none">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
