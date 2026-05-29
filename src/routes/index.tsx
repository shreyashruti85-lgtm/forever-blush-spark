import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/couple-2.jpg";
import j1 from "@/assets/couple-3.jpg";
import j2 from "@/assets/couple-5.jpg";
import j3 from "@/assets/couple-6.jpg";
import j4 from "@/assets/couple-4.jpg";
import closing from "@/assets/couple-1.jpg";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WeddingOS v7.0 — Shruti & Ranjith · #ShruRann" },
      { name: "description", content: "Forever Release. The luxury wedding microsite of Shruti & Ranjith — 27 June 2026." },
      { property: "og:title", content: "WeddingOS v7.0 — Shruti & Ranjith" },
      { property: "og:description", content: "Forever Release · 27 June 2026 · #ShruRann" },
    ],
  }),
  component: Index,
});

const dashboard = [
  { label: "First Encounter", value: "August 2018", note: "A glance exchanged." },
  { label: "Official Release", value: "4 May 2019", note: "Hello, boyfriend." },
  { label: "Best Birthday", value: "3 May 2026", note: "Forever, gift-wrapped." },
  { label: "Wedding Launch", value: "27 June 2026", note: "The main event." },
  { label: "Version", value: "v7.0", note: "Seven years stable." },
  { label: "Compatibility", value: "99.9%", note: "A rounding error away from perfect." },
];

const journey = [
  {
    no: "I",
    date: "August 2018",
    title: "A Glance",
    body: "It was August 2018 when two ambitious people bumped into each other in a very evitable situation. A glance was exchanged. Something clicked. The rest is history.",
    img: j1,
  },
  {
    no: "II",
    date: "4 May 2019",
    title: "Hello, Boyfriend",
    body: "On a quiet night by a lake, he showed up with a ring and a question. The answer was yes. The next morning began with: Hello Boyfriend.",
    img: j2,
  },
  {
    no: "III",
    date: "3 May 2026",
    title: "Forever, Wrapped",
    body: "Birthdays usually come with gifts. This one came with forever. On the best birthday of my life, he asked me if I wanted to be his forever.",
    img: j3,
  },
  {
    no: "IV",
    date: "27 June 2026",
    title: "The Launch",
    body: "Every story has a beginning. Ours started with a glance. On 27 June 2026, it begins again.",
    img: j4,
  },
];

const wrapped = [
  { k: "Top Discovery", v: "Each Other", sub: "Played on repeat since 2018." },
  { k: "Biggest Upgrade", v: "Relationship Status Activated", sub: "4 May 2019." },
  { k: "Best Achievement", v: "7 Years Together", sub: "And counting, slowly." },
  { k: "Best Birthday", v: "3 May 2026", sub: "The one with the ring." },
  { k: "Current Status", v: "Forever Release", sub: "Out 27 June 2026." },
];

const predictions = [
  "Who apologizes first?",
  "Who plans vacations?",
  "Who chooses dinner?",
  "Who steals the blanket?",
  "Who takes longer to get ready?",
];

type Blessing = { name: string; message: string };

function Index() {
  useReveal();
  const [blessings, setBlessings] = useState<Blessing[]>([
    { name: "Aanya", message: "May your forever be as effortless as your glance." },
    { name: "Vikram", message: "Two souls, one beautiful release. Cheers, forever." },
  ]);
  const [votes, setVotes] = useState<Record<string, { s: number; r: number }>>(
    Object.fromEntries(predictions.map((p) => [p, { s: 0, r: 0 }]))
  );
  const [easterOpen, setEasterOpen] = useState(false);
  const [count, setCount] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date("2026-06-27T00:00:00").getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setCount({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  const vote = (q: string, who: "s" | "r") =>
    setVotes((v) => ({ ...v, [q]: { ...v[q], [who]: v[q][who] + 1 } }));

  const submitBlessing = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim().slice(0, 60);
    const message = String(f.get("message") || "").trim().slice(0, 280);
    if (!name || !message) return;
    setBlessings((b) => [{ name, message }, ...b]);
    e.currentTarget.reset();
  };

  return (
    <main className="bg-ivory text-foreground overflow-x-hidden">
      {/* Editorial top bar */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ivory/60">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-16 h-20 flex items-center justify-between">
          <div className="flex items-baseline gap-4">
            <span className="font-serif text-xl italic">WeddingOS</span>
            <span className="text-[10px] tracking-luxury text-muted-foreground uppercase">No. VII · MMXXVI</span>
          </div>
          <nav className="hidden lg:flex items-center gap-12 text-[10px] tracking-luxury uppercase text-muted-foreground">
            <a href="#dashboard" className="hover:text-foreground transition">Atelier</a>
            <a href="#journey" className="hover:text-foreground transition">Journey</a>
            <a href="#wrapped" className="hover:text-foreground transition">Wrapped</a>
            <a href="#blessings" className="hover:text-foreground transition">Blessings</a>
            <a href="#predictions" className="hover:text-foreground transition">Predictions</a>
          </nav>
          <span className="text-[10px] tracking-luxury uppercase text-gold">#ShruRann</span>
        </div>
      </header>

      {/* HERO — full screen, ivory overlay */}
      <section className="relative h-screen w-full flex flex-col">
        <div className="absolute inset-0">
          <img src={hero} alt="Shruti and Ranjith" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-ivory/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-ivory/10 to-ivory" />
        </div>

        {/* corner editorial marks */}
        <div className="relative z-10 flex-1 flex flex-col">
          <div className="flex-1 flex items-center justify-center px-8">
            <div className="text-center max-w-6xl">
              <p className="text-[10px] tracking-luxury uppercase text-gold mb-10">Volume VII · The Forever Release</p>
              <h1 className="font-serif text-[20vw] md:text-[14vw] lg:text-[11vw] leading-[0.88] text-balance">
                Shruti
                <span className="block italic font-light text-shimmer">&amp;</span>
                Ranjith
              </h1>
              <div className="mt-14 max-w-md mx-auto font-serif italic text-xl md:text-2xl text-foreground/70 leading-relaxed">
                <p>August 2018. A glance. A spark.</p>
                <p className="mt-2">A lifetime later, here we are.</p>
              </div>
            </div>
          </div>
          <div className="pb-12 px-10 lg:px-16">
            <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-end md:items-center justify-between gap-6 border-t border-foreground/10 pt-8">
              <div>
                <p className="text-[10px] tracking-luxury uppercase text-muted-foreground">Launching</p>
                <p className="font-serif text-3xl mt-1">27 · June · 2026</p>
              </div>
              <a
                href="#dashboard"
                className="group inline-flex items-center gap-4 text-[10px] tracking-luxury uppercase"
              >
                <span className="h-px w-12 bg-foreground group-hover:w-20 transition-all duration-700" />
                Enter the Issue
              </a>
              <p className="font-serif italic text-lg text-gold">#ShruRann</p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial masthead intro */}
      <section className="py-32 lg:py-48 px-10 lg:px-16">
        <div className="max-w-[1100px] mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="text-[10px] tracking-luxury uppercase text-gold">An Editorial</p>
            <p className="mt-3 text-[10px] tracking-luxury uppercase text-muted-foreground">Issue No. 07</p>
          </div>
          <div className="lg:col-span-9">
            <p className="font-serif text-3xl md:text-5xl leading-[1.15] text-balance">
              A story of two ambitious people, one quiet glance in August, and the seven years
              of small, irreversible yeses that followed.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION CONTROL — luxury atelier dashboard */}
      <section id="dashboard" className="py-32 lg:py-48 px-10 lg:px-16 border-y border-foreground/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal flex items-end justify-between mb-24 flex-wrap gap-8">
            <div>
              <p className="text-[10px] tracking-luxury uppercase text-gold mb-6">Chapter I · The Atelier</p>
              <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl">Mission Control</h2>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              A quiet system check on a love seven years in the making — measured in months, milestones, and one very specific birthday.
            </p>
          </div>

          {/* Countdown — full bleed editorial */}
          <div className="reveal mb-32 grid grid-cols-2 md:grid-cols-4 divide-x divide-foreground/10 border-y border-foreground/10 py-12">
            {[
              ["Days", count.d],
              ["Hours", count.h],
              ["Minutes", count.m],
              ["Seconds", count.s],
            ].map(([l, v]) => (
              <div key={l as string} className="text-center px-4">
                <div className="font-serif text-6xl md:text-8xl tabular-nums">
                  {String(v).padStart(2, "0")}
                </div>
                <div className="mt-4 text-[10px] tracking-luxury uppercase text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>

          {/* Atelier grid — flat, line-only, no cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {dashboard.map((c, i) => (
              <div
                key={c.label}
                className="reveal group relative py-14 px-2 lg:px-10 border-t border-foreground/10 lg:[&:nth-child(-n+3)]:border-t-0 md:[&:nth-child(-n+2)]:border-t-0 lg:[&:not(:nth-child(3n))]:border-r lg:[&:not(:nth-child(3n))]:border-foreground/10 md:[&:not(:nth-child(2n))]:lg:border-r-0"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <p className="text-[10px] tracking-luxury uppercase text-muted-foreground mb-8">{String(i + 1).padStart(2, "0")} · {c.label}</p>
                <p className="font-serif text-5xl md:text-6xl leading-none">{c.value}</p>
                <p className="mt-6 font-serif italic text-base text-foreground/60">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY — cinematic spacing, large images */}
      <section id="journey" className="py-32 lg:py-48">
        <div className="max-w-[1400px] mx-auto px-10 lg:px-16">
          <div className="reveal text-center mb-40">
            <p className="text-[10px] tracking-luxury uppercase text-gold mb-6">Chapter II · The Journey</p>
            <h2 className="font-serif text-6xl md:text-8xl italic">In Four Acts</h2>
          </div>
        </div>

        <div className="space-y-48 lg:space-y-64">
          {journey.map((j, i) => (
            <article key={j.date} className="reveal">
              <div className="max-w-[1500px] mx-auto px-6 lg:px-16">
                <div className={`grid lg:grid-cols-12 gap-10 lg:gap-20 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="lg:col-span-7 relative overflow-hidden aspect-[4/5]">
                    <img
                      src={j.img}
                      alt={j.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[2500ms]"
                    />
                    <div className="absolute inset-0 bg-ivory/15 pointer-events-none" />
                  </div>
                  <div className="lg:col-span-5 lg:px-8">
                    <p className="font-serif italic text-6xl text-gold/70 mb-8">{j.no}</p>
                    <p className="text-[10px] tracking-luxury uppercase text-muted-foreground mb-6">{j.date}</p>
                    <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl italic mb-10 leading-[1.05]">{j.title}</h3>
                    <p className="text-lg md:text-xl text-foreground/70 leading-[1.8] max-w-md font-light">{j.body}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* RELATIONSHIP WRAPPED — Spotify-style elegant cards */}
      <section id="wrapped" className="py-32 lg:py-48 px-10 lg:px-16 bg-foreground text-ivory">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-center mb-24">
            <p className="text-[10px] tracking-luxury uppercase text-gold mb-6">Chapter III · The Wrap</p>
            <h2 className="font-serif text-6xl md:text-8xl">Relationship Wrapped</h2>
            <p className="mt-8 text-ivory/60 max-w-md mx-auto font-light">Seven years, on shuffle. A few highlights from the most-played album of our lives.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {wrapped.map((w, i) => {
              const gradients = [
                "from-[oklch(0.45_0.12_30)] to-[oklch(0.3_0.05_50)]",
                "from-[oklch(0.5_0.1_15)] to-[oklch(0.32_0.06_25)]",
                "from-[oklch(0.55_0.08_70)] to-[oklch(0.35_0.06_50)]",
                "from-[oklch(0.42_0.1_350)] to-[oklch(0.28_0.06_30)]",
                "from-[oklch(0.5_0.09_45)] to-[oklch(0.3_0.05_20)]",
              ];
              const big = i === 0 || i === wrapped.length - 1;
              return (
                <div
                  key={w.k}
                  className={`reveal relative rounded-3xl p-10 lg:p-14 bg-gradient-to-br ${gradients[i % gradients.length]} aspect-[3/4] flex flex-col justify-between overflow-hidden ${big ? "md:col-span-1" : ""}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div>
                    <p className="text-[10px] tracking-luxury uppercase text-ivory/60 mb-3">#{String(i + 1).padStart(2, "0")}</p>
                    <p className="text-[10px] tracking-luxury uppercase text-gold">{w.k}</p>
                  </div>
                  <div>
                    <p className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-balance">{w.v}</p>
                    <p className="mt-6 text-sm text-ivory/60 font-light italic">{w.sub}</p>
                  </div>
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl" />
                </div>
              );
            })}
            <div className="reveal relative rounded-3xl p-10 lg:p-14 bg-ivory text-foreground aspect-[3/4] flex flex-col justify-between md:col-span-1">
              <p className="text-[10px] tracking-luxury uppercase text-gold">2026 · Wrapped</p>
              <div>
                <p className="font-serif text-3xl md:text-4xl italic leading-tight">
                  &ldquo;Your top duet of the decade.&rdquo;
                </p>
                <p className="mt-8 text-xs tracking-luxury uppercase text-muted-foreground">— The Algorithm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLESSINGS WALL */}
      <section id="blessings" className="py-32 lg:py-48 px-10 lg:px-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="reveal text-center mb-24">
            <p className="text-[10px] tracking-luxury uppercase text-gold mb-6">Chapter IV · The Wall</p>
            <h2 className="font-serif text-6xl md:text-8xl italic">Leave A Whisper</h2>
          </div>

          <form onSubmit={submitBlessing} className="reveal mb-24 max-w-2xl mx-auto space-y-10">
            <div>
              <label className="text-[10px] tracking-luxury uppercase text-muted-foreground">Your Name</label>
              <input
                name="name"
                required
                maxLength={60}
                className="w-full bg-transparent border-b border-foreground/20 focus:border-gold outline-none py-3 font-serif text-2xl transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-luxury uppercase text-muted-foreground">A Blessing</label>
              <input
                name="message"
                required
                maxLength={280}
                className="w-full bg-transparent border-b border-foreground/20 focus:border-gold outline-none py-3 font-serif italic text-2xl transition-colors"
              />
            </div>
            <div className="text-center pt-4">
              <button className="inline-flex items-center gap-4 text-[10px] tracking-luxury uppercase group">
                <span className="h-px w-12 bg-foreground group-hover:w-24 transition-all duration-700" />
                Send Blessing
              </button>
            </div>
          </form>

          <div className="columns-1 md:columns-2 gap-10 space-y-10">
            {blessings.map((b, i) => (
              <div key={i} className="reveal break-inside-avoid">
                <p className="font-serif italic text-2xl md:text-3xl leading-[1.4] text-foreground/85">
                  &ldquo;{b.message}&rdquo;
                </p>
                <p className="mt-6 text-[10px] tracking-luxury uppercase text-gold">— {b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREDICTION MARKET — moved to bottom */}
      <section id="predictions" className="py-32 lg:py-48 px-10 lg:px-16 bg-blush-soft/40 border-y border-foreground/10">
        <div className="max-w-[1100px] mx-auto">
          <div className="reveal text-center mb-20">
            <p className="text-[10px] tracking-luxury uppercase text-gold mb-6">Chapter V · The Market</p>
            <h2 className="font-serif text-6xl md:text-7xl italic">Place Your Bets</h2>
            <p className="mt-6 text-muted-foreground font-light">Tap a name. The odds are entirely comedic.</p>
          </div>
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {predictions.map((q) => {
              const v = votes[q];
              const total = v.s + v.r || 1;
              const sp = (v.s / total) * 100;
              return (
                <div key={q} className="reveal py-10 grid md:grid-cols-12 gap-6 items-center">
                  <p className="md:col-span-6 font-serif text-2xl md:text-3xl italic">{q}</p>
                  <div className="md:col-span-6 flex items-center gap-4">
                    <button onClick={() => vote(q, "s")} className="flex-1 py-3 text-xs tracking-luxury uppercase border-b border-foreground/20 hover:border-gold transition">
                      Shruti <span className="text-gold ml-2 tabular-nums font-serif text-base">{v.s}</span>
                    </button>
                    <button onClick={() => vote(q, "r")} className="flex-1 py-3 text-xs tracking-luxury uppercase border-b border-foreground/20 hover:border-gold transition">
                      Ranjith <span className="text-gold ml-2 tabular-nums font-serif text-base">{v.r}</span>
                    </button>
                  </div>
                  <div className="md:col-span-12 h-px bg-foreground/5 relative overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blush to-gold transition-all duration-700" style={{ width: `${v.s + v.r === 0 ? 50 : sp}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img src={closing} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-ivory/70" />
        <div className="relative text-center px-10 max-w-4xl">
          <p className="text-[10px] tracking-luxury uppercase text-gold mb-10">Forever Release</p>
          <h2 className="font-serif text-7xl md:text-9xl italic leading-[0.95]">
            Shruti <br className="md:hidden" /><span className="not-italic font-light">&amp;</span> Ranjith
          </h2>
          <p className="mt-12 font-serif text-3xl">27 · June · 2026</p>
          <button
            onClick={() => setEasterOpen(true)}
            className="mt-20 text-[10px] tracking-luxury uppercase text-muted-foreground hover:text-gold transition"
          >
            · open hidden file ·
          </button>
        </div>
      </section>

      <footer className="py-16 px-10 lg:px-16 border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-luxury uppercase text-muted-foreground">
          <span>WeddingOS · Volume VII</span>
          <span className="font-serif italic text-base text-foreground normal-case tracking-normal">Forever, on repeat.</span>
          <span className="text-gold">#ShruRann</span>
        </div>
      </footer>

      {easterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-in fade-in duration-500" onClick={() => setEasterOpen(false)}>
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" />
          <div
            className="relative max-w-xl w-full bg-ivory border border-gold/60 rounded-2xl p-12 text-center shadow-soft animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] tracking-luxury uppercase text-gold mb-4">Project Forever</p>
            <h3 className="font-serif text-5xl md:text-6xl mb-6">Error 404</h3>
            <p className="font-serif italic text-xl mb-8">Alternate Future Not Found</p>
            <div className="h-px w-16 bg-gold mx-auto mb-8" />
            <p className="text-foreground/80 leading-relaxed font-serif italic text-lg">
              Shruti &amp; Ranjith were always meant to happen.
            </p>
            <button
              onClick={() => setEasterOpen(false)}
              className="mt-10 px-8 py-3 border border-border rounded-full text-[10px] tracking-luxury uppercase hover:border-gold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
