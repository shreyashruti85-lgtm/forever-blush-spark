import { useEffect, useRef } from "react";

export function useAutoScroll(speed = 0.5) {
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
    let direction: 1 | -1 = 1;
    let restTimer: ReturnType<typeof setTimeout> | null = null;

    const step = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;

      if (now >= pausedUntilRef.current && !restTimer) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const delta = (speed * dt) / 16;

        if (direction === 1) {
          if (window.scrollY < maxScroll - 1) {
            window.scrollBy(0, delta);
          } else {
            restTimer = setTimeout(() => {
              direction = -1;
              restTimer = null;
            }, 2000);
          }
        } else {
          if (window.scrollY > 1) {
            window.scrollBy(0, -delta);
          } else {
            restTimer = setTimeout(() => {
              direction = 1;
              restTimer = null;
            }, 2000);
          }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const delay = setTimeout(() => {
      last = performance.now();
      rafRef.current = requestAnimationFrame(step);
    }, 3500);

    return () => {
      clearTimeout(delay);
      if (restTimer) clearTimeout(restTimer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [speed]);
}
