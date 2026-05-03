/**
 * Veridic wordmark — identical to the main navbar logo.
 * "Veridıc" with a yellow dot tittle above the dotless-i.
 */
export function VeridicWordmark({ className }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-lora), Newsreader, serif",
        fontWeight: 500,
        letterSpacing: "-0.015em",
        display: "inline-flex",
        alignItems: "baseline",
      }}
    >
      <span>Verid</span>
      <span style={{ position: "relative", display: "inline-block" }}>
        ı
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "-0.1em",
            width: "0.18em",
            height: "0.18em",
            borderRadius: "50%",
            background: "#f4c542",
            display: "block",
            pointerEvents: "none",
          }}
        />
      </span>
      <span>c</span>
    </span>
  );
}
