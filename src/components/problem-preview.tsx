import Link from "next/link";

export function ProblemPreview() {
  const problems = [
    { id: "P042", name: "Implement Multi-Head Attention", category: "Architecture", difficulty: "Medium" },
    { id: "P076", name: "Triton Softmax Kernel", category: "GPU/Systems", difficulty: "Hard" },
    { id: "P019", name: "Rotary Positional Embedding", category: "Training", difficulty: "Medium" },
  ];

  return (
    <section className="py-24 px-4 container mx-auto border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-heading text-3xl">Implementation Problems</h2>
          <Link href="#" className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground">
            View all [25]
          </Link>
        </div>
        
        <div className="border border-border font-mono text-sm bg-background">
          <div className="grid grid-cols-12 gap-4 border-b border-border px-6 py-4 text-muted-foreground uppercase text-xs tracking-wider">
            <div className="col-span-2 hidden md:block">ID</div>
            <div className="col-span-12 md:col-span-6">Spec</div>
            <div className="col-span-4 md:col-span-2">Category</div>
            <div className="col-span-4 md:col-span-2 text-right">Difficulty</div>
          </div>
          
          <div className="flex flex-col divide-y divide-border">
            {problems.map(p => (
              <Link key={p.id} href="#" className="grid grid-cols-12 gap-4 px-6 py-5 group hover:bg-muted/30 transition-colors">
                <div className="col-span-2 hidden md:block text-muted-foreground">{p.id}</div>
                <div className="col-span-12 md:col-span-6 font-medium group-hover:underline underline-offset-4">{p.name}</div>
                <div className="col-span-4 md:col-span-2 text-muted-foreground">{p.category}</div>
                <div className="col-span-4 md:col-span-2 text-right">
                  <span className={`
                    ${p.difficulty === 'Hard' ? 'text-destructive/80' : 'text-foreground/70'}
                  `}>
                    {p.difficulty}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
