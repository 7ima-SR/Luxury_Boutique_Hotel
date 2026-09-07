import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import BookingBar from "../components/BookingBar";
import { RoomCard } from "../components/RoomCard";
import { Reveal, Label, Btn } from "../components/ui";
import { rooms, experiences, articles, amenitiesList, IMG } from "../data/hotel";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-obsidian" aria-label="Welcome to LUMA">
        <motion.img
          initial={{ scale: 1.08, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          src={IMG("photo-1540541338287-41700207dee6", 2000)}
          alt="LUMA retreat at dusk, pool leading to the sea"
          className="img-cine absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/15 to-obsidian/30" aria-hidden />
        <div className="relative mx-auto w-full max-w-[1440px] px-5 md:px-10 pt-32 pb-8 text-warmwhite">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }} className="label text-warmwhite/75">
            Boutique hotel · Coastal retreat
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="serif font-light leading-[0.98] mt-4 text-[13.5vw] sm:text-[64px] md:text-[96px] max-w-[12ch]"
          >
            Stay somewhere<br /><em className="font-normal">worth remembering.</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-5 max-w-md text-[15px] leading-relaxed text-warmwhite/85">
            An intimate retreat shaped by stone, sea, and the slower rhythm of coastal living.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }} className="mt-7 flex flex-wrap gap-3">
            <Link to="/rooms" className="bg-warmwhite px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-obsidian hover:bg-sand transition">Explore rooms</Link>
            <Link to="/booking" className="bg-terracotta px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-warmwhite hover:bg-obsidian transition">Book your stay</Link>
          </motion.div>
          <div className="mt-10"><BookingBar dark /></div>
          <p className="caption mt-3 text-warmwhite/60">Best rate when you book direct · No prepayment for most rooms</p>
        </div>
      </section>

      {/* INTRO — asymmetrical editorial */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 items-end">
          <div className="md:col-span-5 md:col-start-1">
            <Reveal><Label>The LUMA experience</Label></Reveal>
            <Reveal delay={0.08}>
              <h2 className="serif font-light text-[40px] md:text-[64px] leading-[1.02] mt-4">A place designed<br />for <em>less noise.</em></h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 text-[15px] leading-relaxed text-obsidian/75 max-w-sm">
                Twenty-four rooms. One quiet corner of the coast. Everything here has been considered to give you space to slow down.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <Link to="/story" className="mt-7 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold underline underline-offset-8 decoration-terracotta hover:gap-3.5 transition-all">
                Our story <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-7">
            <Reveal delay={0.1}>
              <figure>
                <img src={IMG("photo-1600585154340-be6161a56a0c")} alt="Limestone facade with deep shadows" loading="lazy" className="img-cine aspect-[3/4] w-full object-cover" />
                <figcaption className="caption mt-2">South court, 8:14am — limestone keeps the cool.</figcaption>
              </figure>
            </Reveal>
          </div>
          <div className="md:col-span-3 md:col-start-11 md:pb-16">
            <Reveal delay={0.2}>
              <figure>
                <img src={IMG("photo-1520250497591-112f2f40a3f4", 800)} alt="Still pool with linen loungers" loading="lazy" className="img-cine aspect-[4/5] w-full object-cover" />
                <figcaption className="caption mt-2">The still pool, before breakfast.</figcaption>
              </figure>
            </Reveal>
            <p className="serif italic text-[22px] leading-snug mt-6 text-obsidian/80 font-light">“We came for two nights. We stayed for six.”</p>
            <p className="caption mt-2">— Guest book, Sea Room 4</p>
          </div>
        </div>
      </section>

      {/* ROOMS — broken rhythm */}
      <section className="bg-sand/45 border-y hairline" aria-label="Rooms">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Label>Stay</Label></Reveal>
              <Reveal delay={0.06}><h2 className="serif font-light text-[40px] md:text-[64px] leading-none mt-3">Stay your way.</h2></Reveal>
            </div>
            <Reveal delay={0.1}>
              <p className="max-w-xs text-[14px] text-obsidian/70 leading-relaxed">Four room types, no two alike. All face quiet — garden, sea, or sky.</p>
              <Link to="/rooms" className="mt-3 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold">All rooms <ArrowUpRight size={15} /></Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {rooms.map((r, i) => <RoomCard key={r.id} room={r} index={i} />)}
          </div>
        </div>
      </section>

      {/* FULL-BLEED IMAGE */}
      <section className="relative h-[70vh] overflow-hidden" aria-label="Evening at LUMA">
        <img src={IMG("photo-1507525428034-b723cf961d3e", 2000)} alt="Empty cove at golden hour" loading="lazy" className="img-cine absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-obsidian/35" />
        <div className="relative h-full mx-auto max-w-[1440px] px-5 md:px-10 flex flex-col justify-end pb-12 text-warmwhite">
          <Reveal><p className="label text-warmwhite/75">Three minutes on foot</p></Reveal>
          <Reveal delay={0.08}><p className="serif font-light text-[34px] md:text-[56px] leading-tight max-w-[16ch]">The cove at 6:40am belongs to you.</p></Reveal>
          <Reveal delay={0.14}><Link to="/experience" className="mt-5 inline-flex w-fit items-center gap-2 border border-warmwhite/40 px-6 py-3 text-[12px] uppercase tracking-[0.18em] hover:bg-warmwhite hover:text-obsidian transition">The experience <ArrowRight size={14} /></Link></Reveal>
        </div>
      </section>

      {/* EXPERIENCE — horizontal scroll */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <Reveal><Label>Days here</Label></Reveal>
            <Reveal delay={0.06}><h2 className="serif font-light text-[38px] md:text-[52px] leading-[1.02] mt-3">Unscheduled,<br />on purpose.</h2></Reveal>
            <Reveal delay={0.12}><p className="mt-5 text-[14px] text-obsidian/70 leading-relaxed max-w-xs">Sea, table, spa, land, night. Join what calls — skip the rest. Drag through a few favourites.</p></Reveal>
          </div>
          <div className="md:col-span-8">
            <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x pb-2 -mx-5 px-5 md:mx-0 md:px-0">
              {experiences.slice(0, 6).map((e) => (
                <Link key={e.id} to="/experience" className="group snap-start shrink-0 w-[240px] md:w-[300px]">
                  <div className="overflow-hidden bg-sand"><img src={e.image} alt={e.title} loading="lazy" className="img-cine aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                  <p className="label text-sage mt-4">{e.kicker}</p>
                  <p className="serif text-[22px] leading-snug mt-1 group-hover:text-terracotta transition-colors">{e.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMBER + WELLNESS split */}
      <section className="bg-obsidian text-warmwhite">
        <div className="mx-auto max-w-[1440px] grid md:grid-cols-2">
          <Link to="/dining" className="group relative overflow-hidden min-h-[480px] flex flex-col justify-end p-8 md:p-12">
            <img src={IMG("photo-1414235077428-338989a2e8c0")} alt="EMBER dining room, candlelight" loading="lazy" className="img-cine absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 to-transparent" />
            <div className="relative">
              <p className="label text-warmwhite/70">EMBER · Seasonal coastal dining</p>
              <p className="serif font-light text-[36px] md:text-[48px] mt-2">Fire, fish,<br />few ingredients.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em]">View menu <ArrowRight size={14} /></span>
            </div>
          </Link>
          <Link to="/wellness" className="group relative overflow-hidden min-h-[480px] flex flex-col justify-end p-8 md:p-12 border-t md:border-t-0 md:border-l hairline-light">
            <img src={IMG("photo-1544161515-4ab6ce6db874")} alt="Spa treatment with warm towels" loading="lazy" className="img-cine absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 to-transparent" />
            <div className="relative">
              <p className="label text-warmwhite/70">Spa garden · Sage & salt</p>
              <p className="serif font-light text-[36px] md:text-[48px] mt-2">Slower<br />by design.</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em]">Treatments <ArrowRight size={14} /></span>
            </div>
          </Link>
        </div>
      </section>

      {/* AMENITIES — typographic, not cards */}
      <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Reveal><Label>Quietly included</Label></Reveal>
            <Reveal delay={0.06}><h2 className="serif font-light text-[36px] md:text-[48px] leading-tight mt-3">Everything you need. Nothing you notice.</h2></Reveal>
            <Reveal delay={0.12}><p className="mt-5 text-[14px] text-obsidian/65 max-w-xs leading-relaxed">No resort bracelets. No upsell at the door. Just the things a good house keeps.</p></Reveal>
          </div>
          <ul className="md:col-span-8 divide-y hairline border-y hairline">
            {amenitiesList.map((a, i) => (
              <Reveal key={a.name} delay={Math.min(i * 0.03, 0.2)}>
                <li className="flex items-baseline justify-between gap-6 py-4">
                  <span className="serif text-[22px] md:text-[26px] font-light">{a.name}</span>
                  <span className="caption text-right hidden sm:block">{a.note}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* JOURNAL teaser — editorial offsets */}
      <section className="bg-warmwhite border-t hairline">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28">
          <div className="flex items-end justify-between">
            <div>
              <Reveal><Label>Journal</Label></Reveal>
              <Reveal delay={0.06}><h2 className="serif font-light text-[38px] md:text-[54px] mt-3">Notes from the coast.</h2></Reveal>
            </div>
            <Link to="/journal" className="hidden md:inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] font-semibold">All stories <ArrowUpRight size={15} /></Link>
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-12">
            <Link to={`/journal/${articles[0].slug}`} className="group md:col-span-7">
              <div className="overflow-hidden"><img src={articles[0].image} alt={articles[0].title} loading="lazy" className="img-cine aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div>
              <p className="label text-terracotta mt-5">{articles[0].category} · {articles[0].minutes} min</p>
              <p className="serif text-[30px] md:text-[38px] font-light leading-tight mt-2 group-hover:text-terracotta transition-colors">{articles[0].title}</p>
              <p className="text-[14px] text-obsidian/65 mt-2 max-w-lg">{articles[0].excerpt}</p>
            </Link>
            <div className="md:col-span-4 md:col-start-9 flex flex-col gap-8 md:pt-10">
              {articles.slice(1, 4).map((a) => (
                <Link key={a.slug} to={`/journal/${a.slug}`} className="group flex gap-4">
                  <img src={a.image} alt="" loading="lazy" className="h-20 w-24 object-cover shrink-0" />
                  <span>
                    <span className="label text-obsidian/50">{a.category} · {a.minutes} min</span>
                    <span className="serif block text-[20px] leading-snug mt-1 group-hover:text-terracotta transition-colors">{a.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION strip */}
      <section className="border-t hairline">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 flex flex-col md:flex-row md:items-center gap-6 justify-between">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-1 text-terracotta" />
            <div>
              <p className="label text-obsidian/55">Getting here</p>
              <p className="serif text-[24px] md:text-[28px] font-light mt-1">Airport 45 min · Old Town 20 min · Beach 3 min</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Btn variant="line" to="/location">Location</Btn>
            <Btn variant="dark" to="/booking">Book your stay</Btn>
          </div>
        </div>
      </section>
    </main>
  );
}
