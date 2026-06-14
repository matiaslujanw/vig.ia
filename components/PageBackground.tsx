export function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-ink-950" aria-hidden="true">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-full w-full object-cover object-center opacity-75"
      >
        <source src="/drone-security-footage.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-ink-950/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/48 via-ink-950/15 to-ink-950/58" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/45 via-transparent to-ink-950/35" />
      <div className="absolute inset-0 hero-vignette opacity-55" />
    </div>
  );
}
