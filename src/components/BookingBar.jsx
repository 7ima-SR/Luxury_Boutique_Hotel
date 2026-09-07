import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus } from "lucide-react";
import { useStore } from "../store/useStore";
import { fmtDate } from "../data/hotel";

export default function BookingBar({ dark = false }) {
  const { checkIn, checkOut, guests, setDates, setGuests } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const Field = ({ label, value, onClick, id }) => (
    <button
      type="button"
      id={id}
      onClick={() => setOpen(open === label ? null : label)}
      className="flex-1 text-left px-5 md:px-7 py-4 min-w-0"
      aria-expanded={open === label}
    >
      <span className={`block text-[10px] tracking-[0.22em] uppercase font-semibold ${dark ? "text-warmwhite/60" : "text-obsidian/55"}`}>{label}</span>
      <span className={`serif block text-[20px] mt-1 ${dark ? "text-warmwhite" : "text-obsidian"}`}>{value}</span>
    </button>
  );

  return (
    <div className={`relative z-20 mx-auto w-full max-w-[1020px] ${dark ? "bg-obsidian/90 backdrop-blur border border-warmwhite/15" : "bg-warmwhite shadow-[0_24px_60px_-24px_rgba(24,23,21,0.4)]"}`}>
      <div className={`flex flex-col md:flex-row md:items-stretch md:divide-x ${dark ? "md:divide-warmwhite/12" : "md:divide-obsidian/10"}`}>
        <Field label="Check-in" value={fmtDate(checkIn)} id="checkin-field" />
        <Field label="Check-out" value={fmtDate(checkOut)} id="checkout-field" />
        <div className="flex-1 px-5 md:px-7 py-4">
          <span className={`block text-[10px] tracking-[0.22em] uppercase font-semibold ${dark ? "text-warmwhite/60" : "text-obsidian/55"}`}>Guests</span>
          <span className="flex items-center gap-4 mt-1">
            <button aria-label="Fewer guests" className="p-1 opacity-70 hover:opacity-100" onClick={() => setGuests(Math.max(1, guests - 1))}><Minus size={15} /></button>
            <span className={`serif text-[20px] ${dark ? "text-warmwhite" : ""}`}>{guests} Guest{guests > 1 ? "s" : ""}</span>
            <button aria-label="More guests" className="p-1 opacity-70 hover:opacity-100" onClick={() => setGuests(Math.min(5, guests + 1))}><Plus size={15} /></button>
          </span>
        </div>
        <div className="p-2 md:w-[260px] md:shrink-0">
          <button
            onClick={() => navigate("/booking")}
            className="w-full h-full min-h-[64px] bg-terracotta text-warmwhite text-[12px] tracking-[0.2em] uppercase font-semibold hover:bg-obsidian transition-colors"
          >
            Check availability
          </button>
        </div>
      </div>
      {open && (
        <div className={`absolute left-0 right-0 top-full mt-2 p-5 flex flex-wrap gap-4 items-end ${dark ? "bg-obsidian text-warmwhite border border-warmwhite/15" : "bg-warmwhite shadow-xl"}`}>
          <label className="text-[12px] uppercase tracking-widest">Check-in
            <input type="date" value={checkIn} onChange={(e) => setDates(e.target.value, checkOut)} className={`ml-3 border px-3 py-2 bg-transparent ${dark ? "border-warmwhite/20" : "border-obsidian/20"}`} />
          </label>
          <label className="text-[12px] uppercase tracking-widest">Check-out
            <input type="date" value={checkOut} min={checkIn} onChange={(e) => setDates(checkIn, e.target.value)} className={`ml-3 border px-3 py-2 bg-transparent ${dark ? "border-warmwhite/20" : "border-obsidian/20"}`} />
          </label>
          <button onClick={() => setOpen(null)} className="ml-auto text-[12px] tracking-[0.18em] uppercase underline underline-offset-4">Done</button>
        </div>
      )}
    </div>
  );
}
