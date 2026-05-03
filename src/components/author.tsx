export function Author() {
  return (
    <section className="py-24 px-4 container mx-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div>
          <h2 className="font-heading text-3xl mb-6">Built by one person.</h2>
          <p className="text-muted-foreground leading-relaxed">
            I got tired of waiting for the perfect AI learning platform, so I built it. This is not a content farm, nor a venture-backed startup trying to monetize tutorials. It is an honest, single-author attempt to explain complex machine learning systems exactly how I wish they were explained to me. The code is raw, the prose is dense, and nothing is abstracted away.
          </p>
        </div>
        
        <div className="flex flex-col border border-border">
          <div className="px-6 py-4 border-b border-border bg-muted/20 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Research & Publications Reference
          </div>
          <div className="flex flex-col divide-y divide-border text-sm font-mono bg-background">
            <div className="px-6 py-5 hover:bg-muted/10 transition-colors">ICLR — International Conference on Learning Representations</div>
            <div className="px-6 py-5 hover:bg-muted/10 transition-colors">NeurIPS — Neural Information Processing Systems</div>
            <div className="px-6 py-5 hover:bg-muted/10 transition-colors">AAAI — Association for the Advancement of AI</div>
            <div className="px-6 py-5 hover:bg-muted/10 transition-colors">EACL — European Chapter of the ACL</div>
          </div>
        </div>
      </div>
    </section>
  );
}
