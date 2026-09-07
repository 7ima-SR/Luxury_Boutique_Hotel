import { Reveal, Label } from "../components/ui";
import { treatments, IMG, money } from "../data/hotel";
import { useStore } from "../store/useStore";

export default function Wellness() {
  const showToast = useStore((s) => s.showToast);
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-14 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-6">
          <Label>Wellness · Sage & salt</Label>
          <h1 className="serif font-light text-[48px] md:text-[76px] leading-[1.0] mt-3">Slower<br />by <em>design.</em></h1>
          <p className="mt-5 max-w-md text-[15px] text-obsidian/70 leading-relaxed">A cedar sauna cut into the hill, a garden pavilion for treatments, and a shala deck that catches the first sun. No playlists. Just heat, water, breath.</p>
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <img src={IMG("photo-1540555700478-4be289fbecef", 1000)} alt="Treatment in soft light" className="img-cine aspect-[4/3] w-full object-cover" />
          <p className="caption mt-2">The garden pavilion at dusk — book it for the last light.</p>
        </div>
      </div>
      <div className="mx-auto max-w-[1100px] px-5 md:px-10 py-14">
        <ul className="divide-y hairline border-y hairline">
          {treatments.map((t, i) => (
            <Reveal key={t.id} delay={Math.min(i * 0.04, 0.2)}>
              <li className="py-6 grid sm:grid-cols-12 gap-3 items-center">
                <div className="sm:col-span-6">
                  <p className="serif text-[26px] font-light">{t.name}</p>
                  <p className="text-[13px] text-obsidian/65 mt-1 max-w-md">{t.desc}</p>
                </div>
                <p className="sm:col-span-2 text-[13px] uppercase tracking-[0.14em] text-sage font-semibold">{t.duration}</p>
                <p className="sm:col-span-2 serif text-[22px]">{money(t.price)}</p>
                <div className="sm:col-span-2 sm:text-right">
                  <button onClick={() => showToast(`${t.name} noted — choose a time at reception.`)} className="border border-obsidian/25 px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] font-semibold hover:bg-obsidian hover:text-warmwhite transition">Book</button>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 grid md:grid-cols-2 gap-6 items-stretch">
          <img src={IMG("photo-1506126613408-eca07ce68773", 1000)} alt="Sunrise yoga on the deck" loading="lazy" className="aspect-[16/10] w-full object-cover" />
          <div className="bg-sage/15 border border-sage/30 p-8 flex flex-col justify-center">
            <p className="label text-sage">Daily · 7:30am</p>
            <p className="serif text-[30px] font-light mt-2">Sunrise yoga, tea after.</p>
            <p className="text-[14px] text-obsidian/70 mt-3">All levels. Mats and blankets waiting. Just come down in whatever you slept in.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
