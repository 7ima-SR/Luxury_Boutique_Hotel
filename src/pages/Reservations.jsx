import { Link, useParams } from "react-router-dom";
import { useStore } from "../store/useStore";
import { money, fmtDateLong } from "../data/hotel";
import { Label, StatusDot } from "../components/ui";

export function Reservations() {
  const reservations = useStore((s) => s.reservations);
  const cancel = useStore((s) => s.cancelReservation);
  const showToast = useStore((s) => s.showToast);
  if (!reservations.length) {
    return (
      <main className="pt-[72px]"><div className="mx-auto max-w-[720px] px-5 py-24 text-center">
        <p className="label text-terracotta">Reservations</p>
        <p className="serif font-light text-[42px] mt-3">Nothing booked yet.<br />Perhaps it's time.</p>
        <Link to="/booking" className="mt-7 inline-block bg-obsidian text-warmwhite px-8 py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold">Check availability</Link>
      </div></main>
    );
  }
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10 py-12">
        <p className="label text-terracotta">Reservations · {reservations.length}</p>
        <h1 className="serif font-light text-[44px] md:text-[60px] mt-2">Your stays.</h1>
        <div className="mt-8 space-y-5">
          {reservations.map((r) => (
            <article key={r.id} className="bg-warmwhite border hairline p-5 md:p-6 grid md:grid-cols-12 gap-5 items-center">
              <img src={r.image} alt={r.roomName} className="md:col-span-3 aspect-[16/10] w-full object-cover" />
              <div className="md:col-span-6">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] font-semibold"><StatusDot status={r.status === "Confirmed" ? "available" : "soldout"} /> {r.status}</p>
                <p className="serif text-[28px] mt-1">{r.roomName}</p>
                <p className="text-[13px] text-obsidian/65">{fmtDateLong(r.checkIn)} → {fmtDateLong(r.checkOut)} · {r.guests} guests · {r.id}</p>
              </div>
              <div className="md:col-span-3 flex md:flex-col gap-2 md:text-right">
                <p className="serif text-[22px] md:text-right flex-1">{money(r.total)}</p>
                <Link to={`/reservations/${r.id}`} className="border border-obsidian/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-center hover:border-obsidian">View</Link>
                {r.status === "Confirmed" && (
                  <button onClick={() => { cancel(r.id); showToast("Cancelled. Your dates are still safe if you change your mind."); }} className="text-[11px] uppercase tracking-[0.16em] text-terracotta py-1">Cancel</button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export function ReservationDetails() {
  const { id } = useParams();
  const r = useStore((s) => s.reservations.find((x) => x.id === id));
  const cancel = useStore((s) => s.cancelReservation);
  const showToast = useStore((s) => s.showToast);
  if (!r) {
    return (
      <main className="pt-[72px]"><div className="mx-auto max-w-[720px] px-5 py-24 text-center">
        <p className="serif text-[36px]">Reservation not found.</p>
        <Link to="/reservations" className="mt-6 inline-block bg-obsidian text-warmwhite px-7 py-3.5 text-[12px] uppercase tracking-[0.18em]">All reservations</Link>
      </div></main>
    );
  }
  const timeline = ["Booked", "Confirmed", "Arrival", "Stay", "Departure"];
  const activeIdx = r.status === "Cancelled" ? 1 : 2;
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10 py-12 grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <p className="label text-terracotta">Reservation {r.id}</p>
          <h1 className="serif font-light text-[44px] md:text-[60px] leading-none mt-2">{r.roomName}</h1>
          <p className="mt-2 text-[14px] text-obsidian/70">{fmtDateLong(r.checkIn)} → {fmtDateLong(r.checkOut)} · {r.nights} night(s) · {r.guests} guests · <strong>{r.status}</strong></p>
          <img src={r.image} alt={r.roomName} className="mt-6 aspect-[16/9] w-full object-cover" />
          <div className="mt-6 bg-warmwhite border hairline p-6">
            <Label>Timeline</Label>
            <ol className="mt-4 space-y-0">
              {timeline.map((t, i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex flex-col items-center">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${i <= activeIdx ? "bg-sage text-warmwhite" : "border border-obsidian/20 text-obsidian/40"}`}>{i < activeIdx ? "✓" : i + 1}</span>
                    {i < timeline.length - 1 && <span className="w-px flex-1 bg-obsidian/15 min-h-[18px]" aria-hidden />}
                  </span>
                  <span className={`pb-5 text-[14px] ${i <= activeIdx ? "font-semibold" : "text-obsidian/50"}`}>{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="bg-warmwhite border hairline p-6">
              <Label>Guest</Label>
              <p className="mt-2 font-medium text-[15px]">{r.guest.firstName} {r.guest.lastName}</p>
              <p className="text-[13px] text-obsidian/65">{r.guest.email}<br />{r.guest.phone} {r.guest.country ? `· ${r.guest.country}` : ""}</p>
            </div>
            <div className="bg-warmwhite border hairline p-6">
              <Label>Hotel</Label>
              <p className="mt-2 text-[14px]">Cala Luma 4, Coastal Road<br />stay@luma-retreat.com<br />+34 600 000 024<br />Check-in from 15:00</p>
            </div>
          </div>
        </div>
        <aside className="lg:col-span-5">
          <div className="bg-obsidian text-warmwhite p-7 lg:sticky lg:top-24">
            <Label light>Price breakdown</Label>
            <dl className="mt-4 space-y-2.5 text-[13px]">
              {r.extras.map((e) => <div key={e.name} className="flex justify-between"><dt className="text-warmwhite/70">{e.name}</dt><dd>{money(e.total)}</dd></div>)}
              <div className="flex justify-between border-t hairline-light pt-3 serif text-[24px]"><dt>Total</dt><dd>{money(r.total)}</dd></div>
            </dl>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <Link to="/booking" className="border border-warmwhite/25 py-3 text-center text-[11px] uppercase tracking-[0.16em] hover:bg-warmwhite hover:text-obsidian transition">Modify</Link>
              {r.status === "Confirmed"
                ? <button onClick={() => { cancel(r.id); showToast("Cancelled. Perhaps another time."); }} className="bg-terracotta py-3 text-[11px] uppercase tracking-[0.16em] font-semibold hover:bg-warmwhite hover:text-obsidian transition">Cancel</button>
                : <span className="py-3 text-center text-[11px] uppercase tracking-[0.16em] text-warmwhite/50 border border-warmwhite/15">Cancelled</span>}
            </div>
            <p className="caption text-warmwhite/50 mt-4">Free cancellation to 7 days before arrival. After that, one night is kept.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
