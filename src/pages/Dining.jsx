import { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, Label } from "../components/ui";
import { diningMenus, IMG, money } from "../data/hotel";
import { useStore } from "../store/useStore";

export default function Dining() {
  const cats = Object.keys(diningMenus);
  const [cat, setCat] = useState("Mains");
  const showToast = useStore((s) => s.showToast);
  return (
    <main className="pt-[72px]">
      <section className="bg-obsidian text-warmwhite">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-6">
            <p className="label text-warmwhite/60">EMBER · Seasonal coastal dining</p>
            <h1 className="serif font-light text-[52px] md:text-[88px] leading-[1.0] mt-4">Cooked over<br /><em>ember & patience.</em></h1>
            <p className="mt-6 max-w-md text-[15px] text-warmwhite/70 leading-relaxed">A short menu that changes with the boats and the hill farms. Breakfast 7:30–11:00 · Dinner 19:00–22:00. Non-guests welcome, if there is room.</p>
            <div className="mt-7 flex gap-3">
              <button onClick={() => showToast("Table request noted — we hold dinners till 22:00.")} className="bg-terracotta px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold hover:bg-warmwhite hover:text-obsidian transition">Reserve a table</button>
              <Link to="/booking" className="border border-warmwhite/30 px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] hover:bg-warmwhite hover:text-obsidian transition">Stay over</Link>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <img src={IMG("photo-1466978913421-dad2ebd01d17")} alt="Plated dish at EMBER" className="img-cine aspect-[4/5] w-full object-cover" />
            <p className="caption text-warmwhite/50 mt-2">Tonight: catch of the day, charred fennel, grilled lemon.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-5 md:px-10 py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <Reveal><Label>The menu</Label></Reveal>
          <div className="mt-4 flex lg:flex-col gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Menu categories">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
                className={`text-left serif text-[26px] px-4 py-2 border-l-2 shrink-0 transition ${cat === c ? "border-terracotta text-obsidian" : "border-obsidian/12 text-obsidian/45 hover:text-obsidian"}`}>{c}</button>
            ))}
          </div>
          <div className="mt-8 border-t hairline pt-6 text-[13px] text-obsidian/65 space-y-3">
            <p><strong className="text-obsidian">Chef Ana Ruiz</strong> — cooked on this coast for twelve years. Previously a two-table place in the village.</p>
            <p><strong className="text-obsidian">Wine</strong> — forty coastal bottles, mostly natural. Ask Mara for the skin-contact from the hill.</p>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Reveal key={cat}>
            <ul className="divide-y hairline border-y hairline">
              {diningMenus[cat].map((m) => (
                <li key={m.name} className="py-5 flex justify-between gap-6">
                  <span><span className="serif text-[24px] font-light">{m.name}</span><span className="block text-[13px] text-obsidian/60 mt-0.5">{m.desc}</span></span>
                  <span className="serif text-[20px] whitespace-nowrap">{money(m.price)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <p className="caption mt-4">Menus shift with the market. Tell us about allergies — the kitchen cooks around them happily.</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <img src={IMG("photo-1414235077428-338989a2e8c0", 900)} alt="EMBER interior" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <img src={IMG("photo-1510812431401-41d2bd2722f3", 900)} alt="Wine cellar" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </div>
    </main>
  );
}
