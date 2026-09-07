import { Link, useParams } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";
import { Gallery } from "../components/overlays";
import { Reveal, Label, StatusDot } from "../components/ui";
import { rooms, availabilityFor, money, fmtDateLong } from "../data/hotel";
import { useStore } from "../store/useStore";
import { RoomCard } from "../components/RoomCard";

export default function RoomDetails() {
  const { id } = useParams();
  const room = rooms.find((r) => r.id === id) || rooms[0];
  const av = availabilityFor(room.id);
  const setRoom = useStore((s) => s.setRoom);
  const showToast = useStore((s) => s.showToast);
  const checkIn = useStore((s) => s.checkIn);
  const checkOut = useStore((s) => s.checkOut);
  const others = rooms.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <main className="pt-[72px]">
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1440px] px-5 md:px-10 pt-6 text-[12px] tracking-[0.08em] uppercase text-obsidian/55 flex items-center gap-2">
        <Link to="/" className="hover:text-obsidian">Home</Link> <ChevronRight size={12} />
        <Link to="/rooms" className="hover:text-obsidian">Stay</Link> <ChevronRight size={12} />
        <span className="text-obsidian">{room.name}</span>
      </nav>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-6 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <Reveal><p className="label">{room.view} · {room.size} m² · Sleeps {room.capacity}</p></Reveal>
          <Reveal delay={0.06}><h1 className="serif font-light text-[48px] md:text-[72px] leading-[1.0] mt-3">{room.name}</h1></Reveal>
          <Reveal delay={0.1}><p className="serif italic text-[20px] text-obsidian/70 font-light mt-2">{room.tagline}</p></Reveal>
          <div className="mt-8"><Gallery images={room.images} name={room.name} /></div>
          <div className="mt-10 grid md:grid-cols-12 gap-8">
            <p className="md:col-span-7 text-[15px] leading-[1.8] text-obsidian/80">{room.description}</p>
            <dl className="md:col-span-5 border-t hairline text-[14px]">
              {[["Bed", room.bed], ["Size", `${room.size} m²`], ["Sleeps", `${room.capacity} guests`], ["Aspect", room.longView], ["Check-in", "from 15:00"], ["Checkout", "until 12:00"]].map(([k, v]) => (
                <div key={k} className="flex justify-between py-3 border-b hairline"><dt className="text-obsidian/55">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div className="mt-10">
            <Label>Amenities</Label>
            <ul className="mt-4 grid sm:grid-cols-2 gap-x-8">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 py-2.5 border-b hairline text-[14px]">
                  <Check size={15} className="text-sage shrink-0" /> {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 bg-warmwhite border hairline p-7">
            <p className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-medium"><StatusDot status={av.status} /> {av.status === "limited" ? "Just one left for these dates." : av.label}</p>
            <p className="serif text-[40px] mt-4">{money(room.price)} <span className="text-[14px] font-sans text-obsidian/55">/ night</span></p>
            <p className="caption mt-1">{fmtDateLong(checkIn)} → {fmtDateLong(checkOut)} · Breakfast included</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {room.features.map((f) => <span key={f} className="border border-obsidian/15 px-3 py-1.5 text-[12px]">{f}</span>)}
            </div>
            {av.status === "soldout" ? (
              <div className="mt-6">
                <button disabled className="w-full bg-obsidian/20 text-obsidian/60 py-4 text-[12px] uppercase tracking-[0.18em] font-semibold cursor-not-allowed">Sold out for these dates</button>
                <p className="caption mt-3">Try shifting by a day or two — the Sea Room often opens midweek.</p>
              </div>
            ) : (
              <Link
                to="/booking"
                onClick={() => { setRoom(room.id); showToast("One quiet room, reserved for you."); }}
                className="mt-6 block text-center w-full bg-obsidian text-warmwhite py-4 text-[12px] uppercase tracking-[0.18em] font-semibold hover:bg-terracotta transition"
              >
                Reserve this room
              </Link>
            )}
            <p className="caption mt-4 text-center">No prepayment · Free cancellation to 7 days</p>
          </div>
        </aside>
      </div>

      <section className="mx-auto max-w-[1440px] px-5 md:px-10 py-20">
        <div className="flex items-end justify-between mb-8">
          <h2 className="serif font-light text-[32px] md:text-[44px]">Also quiet.</h2>
          <Link to="/rooms" className="text-[12px] uppercase tracking-[0.18em] font-semibold underline underline-offset-8">All rooms</Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((r, i) => <RoomCard key={r.id} room={r} index={i} />)}
        </div>
      </section>
    </main>
  );
}
