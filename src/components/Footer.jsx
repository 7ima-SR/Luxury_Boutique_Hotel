import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-obsidian text-warmwhite">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo markSize={32} textSize={30} />
            <p className="serif italic text-[20px] text-warmwhite/80 mt-3 font-light">Stay somewhere worth remembering.</p>
            <p className="text-[13px] text-warmwhite/60 mt-5 max-w-sm leading-relaxed">
              Twenty-four rooms on a quiet corner of the coast. Stone, sea, and slower mornings — kept deliberately small.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/booking" className="bg-warmwhite text-obsidian px-6 py-3 text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-sand transition">Book your stay</Link>
              <Link to="/story" className="border border-warmwhite/25 px-6 py-3 text-[11px] tracking-[0.18em] uppercase hover:border-warmwhite transition">Our story</Link>
            </div>
          </div>
          <nav className="md:col-span-2" aria-label="Visit">
            <p className="label text-warmwhite/50 mb-4">Visit</p>
            {[["Stay", "/rooms"], ["Experience", "/experience"], ["Dining", "/dining"], ["Wellness", "/wellness"], ["Journal", "/journal"]].map(([l, to]) => (
              <Link key={l} to={to} className="block py-1.5 text-[14px] text-warmwhite/80 hover:text-warmwhite">{l}</Link>
            ))}
          </nav>
          <nav className="md:col-span-2" aria-label="House">
            <p className="label text-warmwhite/50 mb-4">House</p>
            {[["Our story", "/story"], ["Location", "/location"], ["Reservations", "/reservations"], ["Account", "/account"], ["Book", "/booking"]].map(([l, to]) => (
              <Link key={l} to={to} className="block py-1.5 text-[14px] text-warmwhite/80 hover:text-warmwhite">{l}</Link>
            ))}
          </nav>
          <div className="md:col-span-3">
            <p className="label text-warmwhite/50 mb-4">Find us</p>
            <p className="text-[14px] text-warmwhite/80 leading-relaxed">Cala Luma 4, Coastal Road<br />Old Town 20 min · Airport 45 min<br />Beach 3 min on foot</p>
            <p className="text-[14px] text-warmwhite/80 mt-4">stay@luma-retreat.com<br />+34 600 000 024</p>
            <p className="caption text-warmwhite/40 mt-6">Check-in from 15:00 · Check-out until 12:00<br />Adults-oriented calm · Dogs on request</p>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t hairline-light flex flex-col md:flex-row justify-between gap-3 text-[12px] text-warmwhite/45">
          <p>© 2026 LUMA Retreat. A fictional boutique hotel, designed with care.</p>
          <p>Stone · Sea · Slower rhythm</p>
        </div>
      </div>
    </footer>
  );
}
