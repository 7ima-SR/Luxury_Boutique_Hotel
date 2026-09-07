import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Search, CalendarDays } from "lucide-react";
import { useStore } from "../store/useStore";

const links = [
  { to: "/rooms", label: "Stay" },
  { to: "/experience", label: "Experience" },
  { to: "/dining", label: "Dining" },
  { to: "/wellness", label: "Wellness" },
  { to: "/journal", label: "Journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const setSearchOpen = useStore((s) => s.setSearchOpen);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [setSearchOpen]);

  const overHero = ["/", "/experience", "/dining", "/wellness"].includes(location.pathname) && !scrolled;
  const bar = overHero
    ? "bg-transparent text-warmwhite"
    : "bg-limestone/95 backdrop-blur-md text-obsidian border-b hairline";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${bar}`}>
        <nav aria-label="Primary" className="mx-auto flex max-w-[1440px] items-center justify-between px-5 md:px-10 h-[72px]">
          <div className="flex items-center gap-8">
            <button className="lg:hidden p-2 -ml-2" aria-label="Open menu" onClick={() => setOpen(true)}>
              <Menu size={20} strokeWidth={1.5} />
            </button>
            <Link to="/" className="serif text-[26px] tracking-[0.28em] font-medium pl-1" aria-label="LUMA home">
              LUMA
            </Link>
            <div className="hidden lg:flex items-center gap-7">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `text-[12px] tracking-[0.18em] uppercase font-medium opacity-80 hover:opacity-100 transition ${isActive ? "underline underline-offset-8 decoration-terracotta" : ""}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search (Cmd K)"
              className="hidden sm:inline-flex items-center gap-2 text-[12px] tracking-[0.14em] uppercase opacity-80 hover:opacity-100 px-3 py-2"
            >
              <Search size={16} strokeWidth={1.5} /> <span className="hidden xl:inline">Search</span>
              <kbd className={`hidden xl:inline text-[10px] border rounded px-1.5 py-0.5 ${overHero ? "border-warmwhite/30" : "border-obsidian/20"}`}>⌘K</kbd>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="sm:hidden p-2"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              to="/booking"
              className={`inline-flex items-center gap-2 px-5 md:px-6 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${overHero ? "bg-warmwhite text-obsidian hover:bg-sand" : "bg-obsidian text-warmwhite hover:bg-terracotta"}`}
            >
              <CalendarDays size={14} className="md:hidden" /> Book Now
            </Link>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-obsidian text-warmwhite flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between px-5 h-[72px]">
              <span className="serif text-[24px] tracking-[0.28em]">LUMA</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2"><X size={22} strokeWidth={1.25} /></button>
            </div>
            <div className="flex-1 flex flex-col justify-center px-8 gap-1">
              {[{ to: "/", label: "Home" }, ...links, { to: "/story", label: "Our Story" }, { to: "/location", label: "Location" }, { to: "/account", label: "Account" }].map((l, i) => (
                <motion.div key={l.to + l.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i, duration: 0.45 }}>
                  <Link to={l.to} className="serif block py-2 text-[38px] leading-none font-light hover:text-sand transition-colors">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-10">
              <button onClick={() => { setOpen(false); navigate("/booking"); }} className="w-full bg-terracotta text-warmwhite py-4 text-[12px] tracking-[0.2em] uppercase font-semibold">
                Book your stay
              </button>
              <p className="caption mt-4 text-warmwhite/60">Coastal retreat · 24 rooms · Open all year</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
