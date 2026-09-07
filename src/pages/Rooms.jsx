import { Link } from "react-router-dom";
import { RoomCard } from "../components/RoomCard";
import { Reveal, Label } from "../components/ui";
import { rooms, IMG } from "../data/hotel";

export default function Rooms() {
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-12 pb-6 grid md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-7">
          <Label>Stay · 24 rooms</Label>
          <h1 className="serif font-light text-[46px] md:text-[76px] leading-[1.0] mt-3">Four ways<br />to <em>wake up.</em></h1>
        </div>
        <p className="md:col-span-4 md:col-start-9 text-[14px] text-obsidian/70 leading-relaxed">
          No corridors of identical doors. Each room type sits in a different part of the house — garden, sea, terrace, villa. Pick your quiet.
        </p>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pb-8">
        <img src={IMG("photo-1445019980597-93fa8acb246c", 2000)} alt="LUMA rooms opening onto stone terraces" className="img-cine aspect-[21/9] w-full object-cover" />
        <p className="caption mt-2">The west wing at noon — every upper room faces the water.</p>
      </div>
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {rooms.map((r, i) => <RoomCard key={r.id} room={r} index={i} />)}
      </div>
      <div className="bg-obsidian text-warmwhite">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 grid md:grid-cols-3 gap-8 text-[14px]">
          <div><p className="label text-warmwhite/60">Good to know</p><p className="serif text-[26px] font-light mt-2">One quiet room, reserved for you.</p></div>
          <p className="text-warmwhite/70 leading-relaxed">All rates include EMBER breakfast, still pool, cove towels and Wi-Fi that actually works. No prepayment on Garden & Sea Rooms.</p>
          <div className="flex md:justify-end items-start"><Link to="/booking" className="bg-terracotta px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold hover:bg-warmwhite hover:text-obsidian transition">Check availability</Link></div>
        </div>
      </div>
    </main>
  );
}
