import { Link } from "react-router-dom";
import { Reveal, Label } from "../components/ui";
import { experiences, IMG } from "../data/hotel";

export default function Experience() {
  return (
    <main className="pt-[72px]">
      <section className="relative h-[72vh] overflow-hidden bg-obsidian flex items-end">
        <img src={IMG("photo-1519046904884-53103b34b206", 2000)} alt="Cove water" className="img-cine absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 to-transparent" />
        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 pb-12 text-warmwhite">
          <p className="label text-warmwhite/70">Experience · Unscheduled, on purpose</p>
          <h1 className="serif font-light text-[48px] md:text-[84px] leading-[1.0] mt-3">Days shaped<br />by <em>tide & light.</em></h1>
        </div>
      </section>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 space-y-20">
        {experiences.slice(0, 5).map((e, i) => (
          <div key={e.id} className={`grid md:grid-cols-12 gap-8 items-center ${i % 2 ? "" : ""}`}>
            <div className={`md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
              <Reveal><img src={e.image} alt={e.title} loading="lazy" className={`img-cine w-full object-cover ${i % 2 ? "aspect-[16/10]" : "aspect-[16/11]"}`} /></Reveal>
            </div>
            <div className={`md:col-span-4 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
              <Reveal><Label>{e.kicker}</Label></Reveal>
              <Reveal delay={0.06}><h2 className="serif font-light text-[34px] md:text-[46px] leading-tight mt-3">{e.title}</h2></Reveal>
              <Reveal delay={0.1}><p className="mt-4 text-[14px] leading-relaxed text-obsidian/70">{e.text}</p></Reveal>
              <Reveal delay={0.14}><p className="caption mt-3">Ask at reception — most things need an hour's notice.</p></Reveal>
            </div>
          </div>
        ))}
        <div>
          <Reveal><Label>More, quietly</Label></Reveal>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.slice(5).map((e) => (
              <div key={e.id} className="group">
                <div className="overflow-hidden"><img src={e.image} alt={e.title} loading="lazy" className="img-cine aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <p className="label text-sage mt-3">{e.kicker}</p>
                <p className="serif text-[21px] leading-snug">{e.title}</p>
                <p className="text-[13px] text-obsidian/65 mt-1">{e.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-sand/50 border hairline p-8 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <p className="serif text-[26px] font-light">Tell us what a good day looks like. We'll arrange the rest.</p>
            <Link to="/booking" className="bg-obsidian text-warmwhite px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold hover:bg-terracotta shrink-0">Book your stay</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
