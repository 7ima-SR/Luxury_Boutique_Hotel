import { Link, useParams } from "react-router-dom";
import { Reveal, Label } from "../components/ui";
import { articles } from "../data/hotel";

const body = [
  "The house wakes before the guests do. At six, Ana is already at the market stalls she has known for a decade, choosing tomatoes by smell. At seven, bread arrives from the village oven, still warm enough to soften the butter without help.",
  "This is the part of the coast that guidebooks skip — a working shoreline, not a backdrop. Fishermen mend nets by the blue door. An old farmer waves from the terraces. The light does something here around eight that no photograph quite keeps.",
  "We built LUMA low and thick-walled for a reason. Every window sits low, so you see sea before sky. Every corridor bends, so sound never travels far. Limestone from the quarry ten kilometres away keeps the rooms cool until noon and warm after dusk.",
];

export default function Article() {
  const { slug } = useParams();
  const a = articles.find((x) => x.slug === slug) || articles[0];
  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <main className="pt-[72px]">
      <article>
        <div className="relative h-[62vh] overflow-hidden bg-obsidian flex items-end">
          <img src={a.image} alt={a.title} className="img-cine absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
          <div className="relative mx-auto w-full max-w-[820px] px-5 pb-10 text-warmwhite">
            <p className="label text-warmwhite/70">{a.category} · {a.date} · {a.minutes} min read</p>
            <h1 className="serif font-light text-[42px] md:text-[64px] leading-[1.02] mt-3">{a.title}</h1>
            <p className="mt-3 text-[13px] text-warmwhite/70">By {a.author}</p>
          </div>
        </div>
        <div className="mx-auto max-w-[700px] px-5 py-14">
          <p className="serif italic text-[24px] font-light text-obsidian/80 leading-snug">{a.excerpt}</p>
          <p className="dropcap mt-8 text-[16px] leading-[1.85] text-obsidian/85">{body[0]}</p>
          <Reveal><img src={a.image2} alt="" loading="lazy" className="img-cine my-10 aspect-[16/10] w-full object-cover" /></Reveal>
          <p className="text-[16px] leading-[1.85] text-obsidian/85">{body[1]}</p>
          <blockquote className="my-10 border-l-2 border-terracotta pl-6 serif italic text-[28px] font-light leading-snug">“We didn't want a hotel that photographs well. We wanted one that sleeps well.”</blockquote>
          <p className="text-[16px] leading-[1.85] text-obsidian/85">{body[2]}</p>
          <p className="text-[16px] leading-[1.85] text-obsidian/85 mt-5">Come and see for yourself. The bread is warm at seven, the cove is empty at eight, and nothing is scheduled until ten — unless you ask.</p>
          <div className="mt-10 flex gap-3">
            <Link to="/booking" className="bg-obsidian text-warmwhite px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold hover:bg-terracotta">Book your stay</Link>
            <Link to="/journal" className="border border-obsidian/25 px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] hover:bg-obsidian hover:text-warmwhite transition">More stories</Link>
          </div>
        </div>
      </article>
      <section className="border-t hairline bg-warmwhite">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-14">
          <Label>Keep reading</Label>
          <div className="mt-6 grid sm:grid-cols-3 gap-8">
            {related.map((r) => (
              <Link key={r.slug} to={`/journal/${r.slug}`} className="group">
                <img src={r.image} alt={r.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <p className="label text-obsidian/50 mt-3">{r.category} · {r.minutes} min</p>
                <p className="serif text-[22px] leading-snug mt-1 group-hover:text-terracotta">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
