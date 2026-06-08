import { useEffect, useRef } from "react";

export function useAutoScroll(pixelsPerSecond = 90) {
  const rafRef = useRef<number>(0);
  const pausedUntilRef = useRef(0);

  useEffect(() => {
    // Only pause on real scroll gestures, not clicks/taps (the music player
    // needs a click to start, which shouldn't kill auto-scroll forever).
    const pauseFor = (ms: number) => {
      pausedUntilRef.current = performance.now() + ms;
    };
    const onWheel = () => pauseFor(4000);
    const onTouchMove = () => pauseFor(4000);
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(e.key)) {
        pauseFor(4000);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey, { passive: true });

    let last = performance.now();
    let restartTimer: ReturnType<typeof setTimeout> | null = null;

    const step = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      if (now >= pausedUntilRef.current && !restartTimer) {
        const scrollingElement = document.scrollingElement ?? document.documentElement;
        const maxScroll = scrollingElement.scrollHeight - window.innerHeight;
        const delta = (pixelsPerSecond * dt) / 1000;

        if (window.scrollY < maxScroll - 1) {
          window.scrollBy({ top: delta, behavior: "auto" });
        } else {
          restartTimer = setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            pausedUntilRef.current = performance.now() + 2500;
            restartTimer = null;
          }, 2500);
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const delay = setTimeout(() => {
      last = performance.now();
      rafRef.current = requestAnimationFrame(step);
    }, 1200);

    return () => {
      clearTimeout(delay);
      if (restartTimer) clearTimeout(restartTimer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [pixelsPerSecond]);
}
