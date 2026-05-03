export function FormatsStrip() {
  const formats = [
    { num: "01", name: "Writing", desc: "Long-form technical posts that are runnable notebooks." },
    { num: "02", name: "Courses", desc: "Structured learning paths from ground zero." },
    { num: "03", name: "Problems", desc: "Deep implementation challenges and test cases." },
    { num: "04", name: "QnA Labs", desc: "Embedded diagnostic questions inside content." },
    { num: "05", name: "Concepts", desc: "Short standalone precise definitions and examples." },
  ];

  return (
    <section className="border-t border-b border-border">
      <div className="container mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border">
          {formats.map((f, i) => (
            <div key={i} className="p-8 flex flex-col items-start justify-start group hover:bg-muted/30 transition-colors">
              <span className="text-xs font-mono text-muted-foreground mb-4 block group-hover:text-foreground transition-colors">{f.num}</span>
              <h3 className="text-xl font-heading mb-3">{f.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
