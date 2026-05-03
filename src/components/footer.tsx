import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-12 px-4 container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <Link href="/" className="font-heading text-xl font-medium tracking-tight text-foreground hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--font-lora), Newsreader, serif', fontWeight: 500, letterSpacing: '-0.015em', display: 'inline-flex', alignItems: 'baseline', gap: 0 }}>
          <span>Verid</span><span style={{ position: 'relative', display: 'inline-block' }}>ı<span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '-0.1em', width: '0.18em', height: '0.18em', borderRadius: '50%', background: '#f4c542', display: 'block' }} /></span><span>c</span>
        </Link>
        <p>Built for those who rebuild from scratch.</p>
      </div>
    </footer>
  );
}
