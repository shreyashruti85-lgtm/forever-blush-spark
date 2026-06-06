import { useEffect, useRef, useState } from "react";
import song from "@/assets/you-are-the-reason.mp3.asset.json";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(song.url);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;
    setReady(true);

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        // autoplay blocked — wait for first user interaction
        const onInteract = async () => {
          try {
            await audio.play();
            setPlaying(true);
          } catch {}
          window.removeEventListener("pointerdown", onInteract);
          window.removeEventListener("keydown", onInteract);
        };
        window.addEventListener("pointerdown", onInteract, { once: true });
        window.addEventListener("keydown", onInteract, { once: true });
      }
    };
    tryPlay();

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  if (!ready) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 rounded-full border border-[hsl(var(--gold)/0.4)] bg-[hsl(var(--ivory)/0.85)] px-4 py-3 backdrop-blur-md shadow-[0_8px_30px_-10px_hsl(var(--gold)/0.4)] hover:bg-[hsl(var(--ivory))] transition-all"
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        {playing ? (
          <span className="flex items-end gap-[2px] h-4">
            <span className="w-[2px] bg-[hsl(var(--gold))] animate-[eq_1s_ease-in-out_infinite] h-3" />
            <span className="w-[2px] bg-[hsl(var(--gold))] animate-[eq_1s_ease-in-out_infinite_0.2s] h-4" />
            <span className="w-[2px] bg-[hsl(var(--gold))] animate-[eq_1s_ease-in-out_infinite_0.4s] h-2" />
          </span>
        ) : (
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M1 1L11 7L1 13V1Z" fill="hsl(var(--gold))" />
          </svg>
        )}
      </span>
      <span className="font-serif text-xs tracking-[0.2em] uppercase text-[hsl(var(--ink))]">
        {playing ? "Now Playing" : "Play Music"}
      </span>
      <style>{`
        @keyframes eq {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </button>
  );
}
