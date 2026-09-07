import { Link, NavLink, Outlet } from "react-router-dom";
import { useStore } from "../store/useStore";

export function AccountLayout() {
  const reservations = useStore((s) => s.reservations);
  const guest = useStore((s) => s.guest);
  const name = guest.firstName ? `${guest.firstName} ${guest.lastName}`.trim() : "Guest of LUMA";
  const tabs = [["Dashboard", "/account"], ["Reservations", "/reservations"], ["Profile", "/account/profile"], ["Preferences", "/account/preferences"], ["Saved", "/account/saved"]];
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 py-12">
        <p className="label text-terracotta">Account</p>
        <h1 className="serif font-light text-[40px] md:text-[56px] mt-2">Hello, {name}.</h1>
        <p className="caption mt-1">{reservations.length} reservation(s) · Frontend demo account, stored on this device.</p>
        <nav aria-label="Account" className="mt-8 flex gap-2 overflow-x-auto no-scrollbar border-b hairline">
          {tabs.map(([l, to]) => (
            <NavLink key={to + l} to={to} end={to === "/account"}
              className={({ isActive }) => `px-4 py-3 text-[12px] uppercase tracking-[0.16em] font-semibold whitespace-nowrap border-b-2 -mb-px ${isActive ? "border-terracotta text-obsidian" : "border-transparent text-obsidian/50 hover:text-obsidian"}`}>
              {l}
            </NavLink>
          ))}
        </nav>
        <div className="py-8"><Outlet /></div>
      </div>
    </main>
  );
}

export function Dashboard() {
  const reservations = useStore((s) => s.reservations);
  const favs = useStore((s) => s.favorites);
  const upcoming = reservations.filter((r) => r.status === "Confirmed")[0];
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-warmwhite border hairline p-7">
        <p className="label text-obsidian/55">Next stay</p>
        {upcoming ? (
          <><p className="serif text-[26px] mt-2">{upcoming.roomName}</p>
          <p className="text-[13px] text-obsidian/65 mt-1">{upcoming.checkIn} → {upcoming.checkOut} · {upcoming.guests} guests</p>
          <Link to={`/reservations/${upcoming.id}`} className="mt-4 inline-block text-[12px] uppercase tracking-[0.16em] font-semibold underline underline-offset-4">View reservation</Link></>
        ) : (<><p className="serif text-[24px] font-light mt-2">Nothing booked yet. Perhaps it's time.</p>
          <Link to="/booking" className="mt-4 inline-block bg-obsidian text-warmwhite px-6 py-3 text-[11px] uppercase tracking-[0.18em] font-semibold">Book your stay</Link></>)}
      </div>
      <div className="bg-obsidian text-warmwhite p-7">
        <p className="label text-warmwhite/60">Stays</p>
        <p className="serif text-[52px] font-light mt-1">{reservations.length}</p>
        <p className="text-[13px] text-warmwhite/65">reservations on this device</p>
        <Link to="/reservations" className="mt-4 inline-block text-[12px] uppercase tracking-[0.16em] underline underline-offset-4">All reservations</Link>
      </div>
      <div className="bg-sand/50 border hairline p-7">
        <p className="label text-obsidian/55">Saved</p>
        <p className="serif text-[52px] font-light mt-1">{favs.length}</p>
        <p className="text-[13px] text-obsidian/65">rooms & experiences kept</p>
        <Link to="/account/saved" className="mt-4 inline-block text-[12px] uppercase tracking-[0.16em] font-semibold underline underline-offset-4">View saved</Link>
      </div>
    </div>
  );
}

export function Profile() {
  const guest = useStore((s) => s.guest);
  const setGuest = useStore((s) => s.setGuest);
  const showToast = useStore((s) => s.showToast);
  return (
    <form onSubmit={(e) => { e.preventDefault(); showToast("Profile saved — quietly kept on this device."); }}
      className="max-w-xl grid sm:grid-cols-2 gap-4">
      {[["firstName", "First name"], ["lastName", "Last name"], ["email", "Email"], ["phone", "Phone"]].map(([k, l]) => (
        <label key={k} className="border hairline bg-warmwhite p-4 block">
          <span className="label text-obsidian/55">{l}</span>
          <input value={guest[k]} onChange={(e) => setGuest({ [k]: e.target.value })} aria-label={l} className="mt-1.5 w-full bg-transparent text-[15px]" />
        </label>
      ))}
      <label className="border hairline bg-warmwhite p-4 block sm:col-span-2">
        <span className="label text-obsidian/55">Country</span>
        <input value={guest.country} onChange={(e) => setGuest({ country: e.target.value })} aria-label="Country" className="mt-1.5 w-full bg-transparent text-[15px]" />
      </label>
      <button className="sm:col-span-2 bg-obsidian text-warmwhite py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold hover:bg-terracotta">Save profile</button>
    </form>
  );
}

export function Preferences() {
  const showToast = useStore((s) => s.showToast);
  const opts = ["Ground floor", "High floor, sea view", "Extra quiet", "Early breakfast", "Late checkout", "No feather pillows"];
  return (
    <div className="max-w-xl">
      <p className="serif text-[26px] font-light">How do you like to stay?</p>
      <p className="caption mt-1">We read these before you arrive. Really.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {opts.map((o) => (
          <button key={o} onClick={() => showToast(`“${o}” noted for next time.`)} className="border hairline bg-warmwhite px-4 py-2.5 text-[13px] hover:border-terracotta hover:text-terracotta transition">{o}</button>
        ))}
      </div>
    </div>
  );
}

export function Saved() {
  const favs = useStore((s) => s.favorites);
  const toggleFav = useStore((s) => s.toggleFav);
  if (!favs.length) return <p className="serif text-[24px] font-light">Nothing saved yet. Tap the heart on any room.</p>;
  return (
    <ul className="space-y-3 max-w-xl">
      {favs.map((f) => (
        <li key={f} className="bg-warmwhite border hairline p-4 flex justify-between items-center">
          <span className="font-medium text-[15px]">{f.replaceAll("-", " ")}</span>
          <span className="flex gap-2">
            <Link to={`/rooms/${f}`} className="text-[12px] uppercase tracking-[0.14em] underline underline-offset-4">View</Link>
            <button onClick={() => toggleFav(f)} className="text-[12px] uppercase tracking-[0.14em] text-terracotta">Remove</button>
          </span>
        </li>
      ))}
    </ul>
  );
}
