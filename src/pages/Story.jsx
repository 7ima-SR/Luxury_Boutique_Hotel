import { Link } from "react-router-dom";
import { Reveal, Label } from "../components/ui";
import { IMG } from "../data/hotel";

const timeline = [
  ["2018", "The idea", "Two friends, one sketchbook. A hotel with no lobby music, no buffet, no hurry."],
  ["2019", "The land", "A quiet plot above a working cove — olive terraces, dry stone, a view due west."],
  ["2021", "Construction", "Local limestone, limewash, smoked oak. Thick walls, low windows, bent corridors."],
  ["2023", "LUMA opens", "Twenty-four rooms. EMBER fires its oven. The cove keeps its quiet."],
  ["2026", "Today", "Same rooms, softer linen. Guests who return, staff who stay. Still deliberately small."],
];

export default function Story() {
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10 pt-14 text-center">
        <Label>Our story</Label>
        <h1 className="serif font-light text-[48px] md:text-[84px] leading-[1.0] mt-4">Built to be<br /><em>quiet.</em></h1>
        <p className="mx-auto mt-6 max-w-xl text-[15px] text-obsidian/70 leading-relaxed">LUMA began with a refusal — no towers, no ballrooms, no “luxury experience”. Just stone, sea, and people who care about breakfast.</p>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-14 grid md:grid-cols-12 gap-8 items-center">
        <img src={IMG("photo-1600585154340-be6161a56a0c", 1600)} alt="LUMA facade" className="img-cine md:col-span-7 aspect-[16/10] w-full object-cover" />
        <img src={IMG("photo-1600607687939-ce8a6c25118c", 900)} alt="Interior detail" loading="lazy" className="img-cine md:col-span-4 md:col-start-9 aspect-[3/4] w-full object-cover" />
      </div>
      <div className="mx-auto max-w-[900px] px-5 md:px-10 pb-20">
        {timeline.map(([year, title, text], i) => (
          <Reveal key={year} delay={Math.min(i * 0.05, 0.2)}>
            <div className="grid sm:grid-cols-12 gap-4 py-10 border-t hairline">
              <p className="serif text-[54px] font-light sm:col-span-3 leading-none text-terracotta">{year}</p>
              <div className="sm:col-span-9">
                <p className="serif text-[30px] font-light">{title}</p>
                <p className="mt-2 text-[15px] text-obsidian/70 leading-relaxed max-w-lg">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <div className="mt-6 bg-obsidian text-warmwhite p-10 text-center">
          <p className="serif italic font-light text-[30px]">“Stay somewhere worth remembering.”</p>
          <p className="caption text-warmwhite/60 mt-3">— Painted above the door, day one. Still there.</p>
          <Link to="/booking" className="mt-7 inline-block bg-warmwhite text-obsidian px-8 py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold hover:bg-terracotta hover:text-warmwhite transition">Come and see</Link>
        </div>
      </div>
    </main>
  );
}
