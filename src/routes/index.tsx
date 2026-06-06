import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/couple-2.jpg";
import j1 from "@/assets/couple-3.jpg";
import j2 from "@/assets/couple-5.jpg";
import j3 from "@/assets/couple-6.jpg";
import j4 from "@/assets/couple-4.jpg";
import closing from "@/assets/couple-1.jpg";
import { useReveal } from "@/hooks/use-reveal";
import { useAutoScroll } from "@/hooks/use-auto-scroll";

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
  { label: "First Encounter", value: "August 2018" },
  { label: "Official Release", value: "4 May 2019" },
  { label: "Best Birthday Ever", value: "3 May 2026" },
  { label: "Wedding Launch", value: "27 June 2026" },
  { label: "Relationship Version", value: "v7.0" },
  { label: "Compatibility", value: "99.9%" },
];

const journey = [
  {
    date: "August 2018",
    title: "A Glance",
    body: "It was August 2018 when two ambitious people bumped into each other in a very evitable situation. A glance was exchanged. Something clicked. The rest is history.",
    img: j1,
  },
  {
    date: "4 May 2019",
    title: "Hello Boyfriend",
    body: "On a quiet night by a lake, he showed up with a ring and a question. The answer was yes. The next morning began with: Hello Boyfriend.",
    img: j2,
  },
  {
    date: "3 May 2026",
    title: "Forever, Wrapped",
    body: "Birthdays usually come with gifts. This one came with forever. On the best birthday of my life, he asked me if I wanted to be his forever.",
    img: j3,
  },
  {
    date: "27 June 2026",
    title: "The Launch",
    body: "Every story has a beginning. Ours started with a glance. On 27 June 2026, it begins again.",
    img: j4,
  },
];

const wrapped = [
  { k: "Top Discovery", v: "Each Other" },
  { k: "Biggest Upgrade", v: "Relationship Status Activated" },
  { k: "Best Achievement", v: "7 Years Together" },
  { k: "Best Birthday", v: "3 May 2026" },
  { k: "Current Status", v: "Forever Release" },
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
    <main className="bg-gradient-luxury text-foreground overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-ivory/70 border-b border-border/60">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gold float-slow" />
            <span className="font-serif text-lg">WeddingOS</span>
            <span className="text-xs tracking-luxury text-muted-foreground uppercase">v7.0</span>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-luxury uppercase text-muted-foreground">
            <a href="#dashboard" className="hover:text-foreground transition">Dashboard</a>
            <a href="#journey" className="hover:text-foreground transition">Journey</a>
            <a href="#wrapped" className="hover:text-foreground transition">Wrapped</a>
            <a href="#predictions" className="hover:text-foreground transition">Predictions</a>
            <a href="#blessings" className="hover:text-foreground transition">Blessings</a>
          </nav>
          <span className="text-xs tracking-luxury uppercase text-gold">#ShruRann</span>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0">
          <img src={hero} alt="Shruti and Ranjith" className="w-full h-full object-cover object-center opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/40 to-ivory" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          <p className="text-xs tracking-luxury uppercase text-gold mb-8">Forever Release · WeddingOS v7.0</p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-balance">
            Shruti <span className="italic text-shimmer">&amp;</span> Ranjith
          </h1>
          <div className="mt-12 space-y-2 font-serif italic text-xl md:text-2xl text-foreground/80">
            <p>August 2018.</p>
            <p>A glance. A spark.</p>
            <p className="pt-4">A lifetime later,</p>
            <p>here we are.</p>
          </div>
          <div className="mt-12 flex flex-col items-center gap-2">
            <span className="text-xs tracking-luxury uppercase text-muted-foreground">Launching</span>
            <p className="font-serif text-3xl md:text-4xl">27 June 2026</p>
            <p className="text-xs tracking-luxury uppercase text-gold mt-2">#ShruRann</p>
          </div>
          <a
            href="#dashboard"
            className="inline-flex items-center gap-3 mt-14 px-10 py-4 border border-gold rounded-full text-xs tracking-luxury uppercase text-foreground hover:bg-gold hover:text-ivory transition-all duration-500 shadow-soft"
          >
            Enter WeddingOS
            <span className="w-1 h-1 rounded-full bg-current" />
          </a>
        </div>
      </section>

      <section className="border-y border-border/60 bg-ivory">
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-4 gap-6 text-center">
          {[
            ["Days", count.d],
            ["Hours", count.h],
            ["Minutes", count.m],
            ["Seconds", count.s],
          ].map(([l, v]) => (
            <div key={l as string}>
              <div className="font-serif text-4xl md:text-6xl text-foreground tabular-nums">
                {String(v).padStart(2, "0")}
              </div>
              <div className="mt-2 text-[10px] tracking-luxury uppercase text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="dashboard" className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-20">
            <p className="text-xs tracking-luxury uppercase text-gold mb-4">01 · Mission Control</p>
            <h2 className="font-serif text-5xl md:text-6xl">The Dashboard</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">A quiet system check on a love seven years in the making.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboard.map((c, i) => (
              <div
                key={c.label}
                className="reveal group relative bg-card border border-border/60 rounded-2xl p-10 shadow-card hover:shadow-soft transition-all duration-700 hover:-translate-y-1"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-gold opacity-60 group-hover:opacity-100 transition" />
                <p className="text-[10px] tracking-luxury uppercase text-muted-foreground mb-6">{c.label}</p>
                <p className="font-serif text-3xl md:text-4xl">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journey" className="py-32 px-8 bg-blush-soft/40">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-24">
            <p className="text-xs tracking-luxury uppercase text-gold mb-4">02 · The Journey</p>
            <h2 className="font-serif text-5xl md:text-6xl">A Timeline of Us</h2>
          </div>
          <div className="space-y-32">
            {journey.map((j, i) => (
              <div
                key={j.date}
                className={`reveal grid md:grid-cols-2 gap-16 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-soft aspect-[4/5]">
                  <img src={j.img} alt={j.title} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
                </div>
                <div>
                  <p className="text-xs tracking-luxury uppercase text-gold mb-4">{j.date}</p>
                  <h3 className="font-serif text-4xl md:text-5xl mb-6 italic">{j.title}</h3>
                  <p className="text-lg text-foreground/75 leading-relaxed max-w-md">{j.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="wrapped" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center mb-20">
            <p className="text-xs tracking-luxury uppercase text-gold mb-4">03 · Relationship Wrapped</p>
            <h2 className="font-serif text-5xl md:text-6xl">The Year In Review</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-border/60 rounded-2xl overflow-hidden shadow-card">
            {wrapped.map((w, i) => (
              <div
                key={w.k}
                className={`reveal bg-card p-12 ${i === wrapped.length - 1 ? "md:col-span-2" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-[10px] tracking-luxury uppercase text-muted-foreground mb-4">{w.k}</p>
                <p className="font-serif text-3xl md:text-4xl text-balance">{w.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="predictions" className="py-32 px-8 bg-blush-soft/40">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-20">
            <p className="text-xs tracking-luxury uppercase text-gold mb-4">04 · Prediction Market</p>
            <h2 className="font-serif text-5xl md:text-6xl">Place Your Bets</h2>
            <p className="mt-4 text-muted-foreground">Tap a name. The odds are mostly comedic.</p>
          </div>
          <div className="space-y-4">
            {predictions.map((q) => {
              const v = votes[q];
              const total = v.s + v.r || 1;
              const sp = (v.s / total) * 100;
              return (
                <div key={q} className="reveal bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-card">
                  <p className="font-serif text-xl md:text-2xl mb-5">{q}</p>
                  <div className="flex gap-3 mb-4">
                    <button onClick={() => vote(q, "s")} className="flex-1 py-3 rounded-full border border-border hover:border-gold hover:bg-gold/10 transition text-sm tracking-wider uppercase">
                      Shruti <span className="text-gold ml-2 tabular-nums">{v.s}</span>
                    </button>
                    <button onClick={() => vote(q, "r")} className="flex-1 py-3 rounded-full border border-border hover:border-gold hover:bg-gold/10 transition text-sm tracking-wider uppercase">
                      Ranjith <span className="text-gold ml-2 tabular-nums">{v.r}</span>
                    </button>
                  </div>
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blush to-gold transition-all duration-700" style={{ width: `${v.s + v.r === 0 ? 50 : sp}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="blessings" className="py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="text-xs tracking-luxury uppercase text-gold mb-4">05 · Blessings Wall</p>
            <h2 className="font-serif text-5xl md:text-6xl">Leave A Whisper</h2>
          </div>
          <form onSubmit={submitBlessing} className="reveal bg-card border border-border/60 rounded-2xl p-8 md:p-10 shadow-card mb-12 grid md:grid-cols-3 gap-4">
            <input
              name="name"
              required
              maxLength={60}
              placeholder="Your name"
              className="md:col-span-1 bg-transparent border-b border-border focus:border-gold outline-none py-3 text-sm"
            />
            <input
              name="message"
              required
              maxLength={280}
              placeholder="A blessing for the couple…"
              className="md:col-span-2 bg-transparent border-b border-border focus:border-gold outline-none py-3 text-sm"
            />
            <button className="md:col-span-3 mt-4 mx-auto inline-flex items-center px-10 py-4 border border-gold rounded-full text-xs tracking-luxury uppercase hover:bg-gold hover:text-ivory transition">
              Send Blessing
            </button>
          </form>
          <div className="grid md:grid-cols-2 gap-6">
            {blessings.map((b, i) => (
              <div key={i} className="reveal bg-card border border-border/60 rounded-2xl p-8 shadow-card">
                <p className="font-serif italic text-xl leading-relaxed">&ldquo;{b.message}&rdquo;</p>
                <p className="mt-6 text-xs tracking-luxury uppercase text-gold">— {b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img src={closing} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-ivory/75" />
        <div className="relative text-center px-8 max-w-3xl">
          <p className="text-xs tracking-luxury uppercase text-gold mb-6">Forever Release</p>
          <h2 className="font-serif text-5xl md:text-7xl italic">Shruti &amp; Ranjith</h2>
          <p className="mt-6 font-serif text-2xl">27 June 2026</p>
          <button
            onClick={() => setEasterOpen(true)}
            className="mt-10 text-[10px] tracking-luxury uppercase text-muted-foreground hover:text-gold transition"
          >
            · open hidden file ·
          </button>
        </div>
      </section>

      <footer className="py-12 px-8 border-t border-border/60 text-center">
        <p className="text-xs tracking-luxury uppercase text-muted-foreground">WeddingOS v7.0 · Forever Release · #ShruRann</p>
      </footer>

      {easterOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 animate-in fade-in duration-500" onClick={() => setEasterOpen(false)}>
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" />
          <div
            className="relative max-w-xl w-full bg-ivory border border-gold/60 rounded-2xl p-12 text-center shadow-soft animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-[10px] tracking-luxury uppercase text-gold mb-4">Project Forever</p>
            <h3 className="font-serif text-4xl md:text-5xl mb-6">Error 404</h3>
            <p className="font-serif italic text-xl mb-8">Alternate Future Not Found</p>
            <div className="h-px w-16 bg-gold mx-auto mb-8" />
            <p className="text-foreground/80 leading-relaxed">
              Shruti &amp; Ranjith were always meant to happen.
            </p>
            <button
              onClick={() => setEasterOpen(false)}
              className="mt-10 px-8 py-3 border border-border rounded-full text-xs tracking-luxury uppercase hover:border-gold transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
