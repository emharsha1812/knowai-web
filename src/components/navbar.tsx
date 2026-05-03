import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavAuth } from "@/components/nav-auth";
import { Shield } from "lucide-react";

const ACTIVE_LINKS = [
  { href: "/blog",    label: "Writing", icon: "/writing.png" },
  { href: "/courses", label: "Courses", icon: "/GPUs.png"    },
];

const COMING_SOON_LINKS = [
  { label: "Problems", icon: "/problems.png" },
  { label: "Labs",     icon: "/qnalabs.png"  },
];

function CurvedArrow() {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 20 Q9 13 20 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />
      <path
        d="M14 2 L20 4 L18 10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container mx-auto px-5 h-20 flex items-center justify-between">

        {/* Left: Logo + nav links */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="font-heading text-2xl font-semibold tracking-tight flex items-center gap-2 shrink-0"
          >
            <span style={{ fontFamily: 'var(--font-lora), Newsreader, serif', fontWeight: 500, letterSpacing: '-0.015em', display: 'inline-flex', alignItems: 'baseline' }}>
              <span>Verid</span>
              <span style={{ position: 'relative', display: 'inline-block' }}>
                ı
                <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '-0.1em', width: '0.18em', height: '0.18em', borderRadius: '50%', background: '#f4c542', display: 'block', pointerEvents: 'none' }} />
              </span>
              <span>c</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {/* Active links */}
            {ACTIVE_LINKS.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-2.5 px-4 py-2 rounded-md text-base text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
              >
                <div className="w-7 h-7 relative shrink-0 overflow-hidden rounded-md opacity-90 group-hover:opacity-100 transition-opacity">
                  <Image
                    src={icon}
                    alt={label}
                    fill
                    className="object-contain"
                    sizes="24px"
                  />
                </div>
                {label}
              </Link>
            ))}

            {/* Coming soon links */}
            {COMING_SOON_LINKS.map(({ label, icon }) => (
              <div key={label} className="relative">
                <div className="flex items-center gap-2.5 px-4 py-2 rounded-md text-base text-muted-foreground/40 cursor-not-allowed select-none">
                  <div className="w-7 h-7 relative shrink-0 overflow-hidden rounded-md opacity-40">
                    <Image
                      src={icon}
                      alt={label}
                      fill
                      className="object-contain grayscale"
                      sizes="24px"
                    />
                  </div>
                  {label}
                </div>

                {/* Coming soon annotation — peeks below the navbar border */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 flex flex-col items-center pointer-events-none text-muted-foreground/50">
                  <CurvedArrow />
                  <span
                    style={{ fontFamily: 'var(--font-caveat)', fontSize: '15px' }}
                    className="-mt-0.5 whitespace-nowrap"
                  >
                    coming soon
                  </span>
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Profile + theme toggle + CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/60 transition-colors bg-muted/50"
            aria-label="Admin Panel"
            title="Admin Panel"
          >
            <Shield className="h-4 w-4" />
          </Link>
          <ThemeToggle />

          <Link
            href="/profile"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full border border-border text-sm font-semibold hover:border-foreground/60 transition-colors bg-muted/50"
            aria-label="Profile"
          >
            HF
          </Link>

          <NavAuth />
        </div>
      </div>
    </header>
  );
}
