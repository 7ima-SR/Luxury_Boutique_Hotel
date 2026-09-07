import { Bus, Car, Footprints, Plane } from "lucide-react";
import { Reveal, Label } from "../components/ui";
import { IMG } from "../data/hotel";
import { useStore } from "../store/useStore";

const rows = [
  { icon: Footprints, place: "Private cove & beach", time: "3 min", note: "On foot, towels provided" },
  { icon: Car, place: "Fishing village", time: "12 min", note: "Blue door lunch, Friday market" },
  { icon: Car, place: "Old Town", time: "20 min", note: "E-bikes available at reception" },
  { icon: Plane, place: "International airport", time: "45 min", note: "Quiet transfer, €90 per way" },
];

export default function Location() {
  const showToast = useStore((s) => s.showToast);
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-14 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Label>Location · One quiet corner</Label>
          <h1 className="serif font-light text-[48px] md:text-[72px] leading-[1.0] mt-3">Far enough.<br />Close <em>enough.</em></h1>
          <p className="mt-5 text-[15px] text-obsidian/70 leading-relaxed max-w-md">Cala Luma 4, Coastal Road. Above a working cove, below olive terraces. The map below is drawn, not tracked — distances are honest.</p>
          <ul className="mt-8 divide-y hairline border-y hairline">
            {rows.map((r) => (
              <li key={r.place} className="flex items-center gap-4 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-obsidian/15 shrink-0"><r.icon size={17} strokeWidth={1.5} /></span>
                <span className="flex-1"><span className="block font-medium text-[15px]">{r.place}</span><span className="block text-[13px] text-obsidian/60">{r.note}</span></span>
                <span className="serif text-[22px] whitespace-nowrap">{r.time}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => showToast("Transfer request noted — we drive electric, quietly.")} className="mt-6 bg-obsidian text-warmwhite px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold hover:bg-terracotta flex items-center gap-2">
            <Bus size={15} /> Arrange airport transfer
          </button>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative overflow-hidden border hairline bg-warmwhite" role="img" aria-label="Illustrated map of LUMA surroundings">
              <img src={IMG("photo-1507525428034-b723cf961d3e", 1600)} alt="" className="aspect-[16/12] w-full object-cover opacity-90" />
              <span className="absolute left-[18%] top-[30%] bg-obsidian text-warmwhite text-[11px] tracking-[0.12em] uppercase px-3 py-1.5">Old Town · 20 min</span>
              <span className="absolute left-[55%] top-[62%] bg-terracotta text-warmwhite text-[11px] tracking-[0.12em] uppercase px-3 py-1.5">★ LUMA · you are nearly here</span>
              <span className="absolute left-[62%] top-[82%] bg-warmwhite text-obsidian text-[11px] tracking-[0.12em] uppercase px-3 py-1.5 border hairline">Cove · 3 min</span>
              <span className="absolute right-[8%] top-[12%] bg-warmwhite/90 text-obsidian text-[11px] tracking-[0.12em] uppercase px-3 py-1.5">Airport · 45 min →</span>
            </div>
          </Reveal>
          <p className="caption mt-2">Illustrated map — no tracking, no API. Distances timed by our own slow driving.</p>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="bg-sand/50 border hairline p-6"><p className="label">Arrival</p><p className="text-[14px] mt-2">Check-in from 15:00. Come earlier — swim first, room when ready. Luggage vanishes to your room.</p></div>
            <div className="bg-sand/50 border hairline p-6"><p className="label">Departure</p><p className="text-[14px] mt-2">Checkout until 12:00, late to 14:00 (€60). Last swim, warm bread, then the quiet car.</p></div>
          </div>
        </div>
      </div>
      <div className="h-10" />
    </main>
  );
}
