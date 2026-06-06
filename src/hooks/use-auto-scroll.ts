import { useEffect, useRef } from "react";

export function useAutoScroll(speed = 0.5) {
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const pause = () => (pausedRef.current = true);
    const resume = () => (pausedRef.current = false);

    window.addEventListener("pointerdown", pause, { passive: true });
    window.addEventListener("wheel", pause, { passive: true });
    window.addEventListener("touchstart", pause, { passive: true });
    window.addEventListener("keydown", pause, { passive: true });

    const resumeTimer = setTimeout(resume, 3000);

    let last = performance.now();
    const step = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY < maxScroll - 2) {
          window.scrollBy(0, (speed * dt) / 16);
        } else {
          // At bottom: pause briefly then smooth-scroll back to top
          pausedRef.current = true;
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              pausedRef.current = false;
              last = performance.now();
            }, 1200);
          }, 2000);
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const delay = setTimeout(() => {
      last = performance.now();
      rafRef.current = requestAnimationFrame(step);
    }, 4000);

    return () => {
      clearTimeout(delay);
      clearTimeout(resumeTimer);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointerdown", pause);
      window.removeEventListener("wheel", pause);
      window.removeEventListener("touchstart", pause);
      window.removeEventListener("keydown", pause);
    };
  }, [speed]);
}
