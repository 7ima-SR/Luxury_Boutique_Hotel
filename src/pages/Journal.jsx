import { Link } from "react-router-dom";
import { Reveal, Label } from "../components/ui";
import { articles } from "../data/hotel";

export default function Journal() {
  const [first, ...rest] = articles;
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-14 pb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Label>Journal · Notes from the coast</Label>
          <h1 className="serif font-light text-[48px] md:text-[76px] leading-none mt-3">Read slowly.</h1>
        </div>
        <p className="max-w-xs text-[14px] text-obsidian/65">Architecture, food, walks and quiet rituals — written by the people who work here.</p>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pb-20">
        <Link to={`/journal/${first.slug}`} className="group grid md:grid-cols-12 gap-8 items-center border-t hairline pt-10">
          <div className="md:col-span-8 overflow-hidden"><img src={first.image} alt={first.title} className="img-cine aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div>
          <div className="md:col-span-4">
            <p className="label text-terracotta">{first.category} · {first.minutes} min · {first.date}</p>
            <p className="serif font-light text-[36px] leading-tight mt-3 group-hover:text-terracotta transition-colors">{first.title}</p>
            <p className="text-[14px] text-obsidian/65 mt-3">{first.excerpt}</p>
            <p className="caption mt-3">By {first.author}</p>
          </div>
        </Link>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={Math.min((i % 3) * 0.06, 0.18)}>
              <Link to={`/journal/${a.slug}`} className="group block">
                <div className="overflow-hidden bg-sand"><img src={a.image} alt={a.title} loading="lazy" className={`img-cine w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"}`} /></div>
                <p className="label text-obsidian/50 mt-4">{a.category} · {a.minutes} min · {a.date}</p>
                <p className="serif text-[24px] leading-snug mt-1.5 group-hover:text-terracotta transition-colors">{a.title}</p>
                <p className="text-[13px] text-obsidian/65 mt-1.5 line-clamp-2">{a.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
