import { Link, useParams } from "react-router-dom";
import { CalendarPlus, Check, Printer } from "lucide-react";
import { money, fmtDateLong } from "../data/hotel";
import { useStore } from "../store/useStore";
import { Label } from "../components/ui";

export function downloadICS(res) {
  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", `UID:${res.id}@luma`, `SUMMARY:LUMA — ${res.roomName}`, `DTSTART:${res.checkIn.replaceAll("-", "")}`, `DTEND:${res.checkOut.replaceAll("-", "")}`, `DESCRIPTION:Reservation ${res.id} · ${res.guests} guests`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${res.id}.ics`;
  a.click();
}

export default function Confirmation() {
  const { id } = useParams();
  const res = useStore((s) => s.reservations.find((r) => r.id === id));
  if (!res) {
    return (
      <main className="pt-[72px]"><div className="mx-auto max-w-[720px] px-5 py-24 text-center">
        <p className="serif text-[36px]">We couldn't find that reservation.</p>
        <p className="caption mt-2">Something went wrong. Your dates are still safe.</p>
        <Link to="/booking" className="mt-6 inline-block bg-obsidian text-warmwhite px-7 py-3.5 text-[12px] uppercase tracking-[0.18em]">Start a new booking</Link>
      </div></main>
    );
  }
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[900px] px-5 md:px-10 py-14 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-warmwhite"><Check size={22} /></span>
        <p className="label mt-6">Booking confirmed</p>
        <h1 className="serif font-light text-[44px] md:text-[64px] leading-tight mt-3">We'll see you<br />by the sea.</h1>
        <p className="mt-4 text-[14px] text-obsidian/70">Reservation <strong className="tracking-widest">{res.id}</strong> · {res.roomName} · {res.nights} night(s) · {res.guests} guests</p>
        <img src={res.image} alt={res.roomName} className="mt-8 aspect-[21/9] w-full object-cover" />
        <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left">
          <div className="bg-warmwhite border hairline p-6">
            <Label>Stay</Label>
            <p className="serif text-[24px] mt-2">{res.roomName}</p>
            <p className="text-[14px] mt-1">{fmtDateLong(res.checkIn)} → {fmtDateLong(res.checkOut)}</p>
            <p className="text-[14px] text-obsidian/65">{res.guests} guests · Total {money(res.total)}</p>
            {res.extras.length > 0 && (
              <ul className="mt-3 text-[13px] text-obsidian/70 space-y-1">
                {res.extras.map((e) => <li key={e.name} className="flex justify-between"><span>{e.name}</span><span>{money(e.total)}</span></li>)}
              </ul>
            )}
          </div>
          <div className="bg-warmwhite border hairline p-6">
            <Label>Guest</Label>
            <p className="text-[15px] mt-2 font-medium">{res.guest.firstName} {res.guest.lastName}</p>
            <p className="text-[14px] text-obsidian/65">{res.guest.email}<br />{res.guest.phone} {res.guest.country ? `· ${res.guest.country}` : ""}</p>
            <p className="caption mt-3">Arrival from 15:00 · A quiet electric car can meet you at the airport.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button onClick={() => downloadICS(res)} className="inline-flex items-center gap-2 bg-obsidian text-warmwhite px-7 py-3.5 text-[12px] uppercase tracking-[0.16em] font-semibold hover:bg-terracotta"><CalendarPlus size={15} /> Add to calendar</button>
          <Link to={`/reservations/${res.id}`} className="inline-flex items-center gap-2 border border-obsidian/25 px-7 py-3.5 text-[12px] uppercase tracking-[0.16em] hover:bg-obsidian hover:text-warmwhite transition">View reservation</Link>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-3.5 text-[12px] uppercase tracking-[0.16em] text-obsidian/60 hover:text-obsidian"><Printer size={15} /> Print</button>
        </div>
      </div>
    </main>
  );
}
