import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="pt-[72px]">
      <div className="mx-auto max-w-[720px] px-5 py-28 text-center">
        <p className="label text-terracotta">404 · Off the map</p>
        <h1 className="serif font-light text-[52px] md:text-[72px] leading-tight mt-3">This path leads<br />to the sea.</h1>
        <p className="mt-4 text-[14px] text-obsidian/65">The page you wanted isn't here. Your dates are still safe.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="bg-obsidian text-warmwhite px-7 py-3.5 text-[12px] uppercase tracking-[0.18em] font-semibold">Home</Link>
          <Link to="/rooms" className="border border-obsidian/25 px-7 py-3.5 text-[12px] uppercase tracking-[0.18em]">Rooms</Link>
        </div>
      </div>
    </main>
  );
}
