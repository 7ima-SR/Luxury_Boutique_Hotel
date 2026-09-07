import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { rooms, articles, experiences } from "../data/hotel";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function SearchOverlay() {
  const open = useStore((s) => s.searchOpen);
  const setOpen = useStore((s) => s.setSearchOpen);
  const pushSearch = useStore((s) => s.pushSearch);
  const recent = useStore((s) => s.recentSearches);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setQ("");
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open ]);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [setOpen]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return null;
    return {
      rooms: rooms.filter((r) => (r.name + r.tagline + r.view).toLowerCase().includes(needle)),
      exp: experiences.filter((e) => (e.title + e.kicker).toLowerCase().includes(needle)).slice(0, 4),
      journal: articles.filter((a) => (a.title + a.category).toLowerCase().includes(needle)).slice(0, 4),
    };
  }, [q]);

  const go = (to) => { if (q.trim()) pushSearch(q.trim()); setOpen(false); navigate(to); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] bg-obsidian/60 backdrop-blur-sm" onClick={() => setOpen(false)} role="presentation">
          <motion.div
            initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-[8vh] w-[min(680px,92vw)] bg-warmwhite shadow-2xl"
            onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Search LUMA">
            <div className="flex items-center gap-3 border-b hairline px-5 py-4">
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && q.trim()) go(`/rooms`); }}
                placeholder="Rooms, experiences, journal, dining…" aria-label="Search LUMA"
                className="flex-1 bg-transparent serif text-[22px] placeholder:text-obsidian/35" />
              <button aria-label="Close search" onClick={() => setOpen(false)} className="p-2 hover:opacity-60"><X size={18} /></button>
            </div>
            <div className="max-h-[60vh] overflow-auto p-5">
              {!results && (
                <div>
                  <p className="label text-obsidian/50 mb-3">Recent searches</p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <button key={r} onClick={() => setQ(r)} className="border border-obsidian/15 px-4 py-2 text-[13px] hover:border-obsidian">{r}</button>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 text-[13px]">
                    <button onClick={() => go("/rooms")} className="text-left border-t hairline pt-3 hover:text-terracotta">Sea-view rooms →</button>
                    <button onClick={() => go("/dining")} className="text-left border-t hairline pt-3 hover:text-terracotta">EMBER menu →</button>
                    <button onClick={() => go("/journal")} className="text-left border-t hairline pt-3 hover:text-terracotta">Journal →</button>
                    <button onClick={() => go("/wellness")} className="text-left border-t hairline pt-3 hover:text-terracotta">Spa rituals →</button>
                  </div>
                </div>
              )}
              {results && (
                <div className="space-y-6">
                  {results.rooms.map((r) => (
                    <button key={r.id} onClick={() => go(`/rooms/${r.id}`)} className="flex w-full items-center gap-4 text-left group">
                      <img src={r.images[0]} alt="" className="h-14 w-16 object-cover" />
                      <span><span className="label text-terracotta">Stay</span><span className="serif block text-[19px] group-hover:underline">{r.name}</span></span>
                    </button>
                  ))}
                  {results.exp.map((e) => (
                    <button key={e.id} onClick={() => go(`/experience`)} className="block w-full text-left group">
                      <span className="label text-sage">Experience · {e.kicker}</span>
                      <span className="serif block text-[19px] group-hover:underline">{e.title}</span>
                    </button>
                  ))}
                  {results.journal.map((a) => (
                    <button key={a.id} onClick={() => go(`/journal/${a.slug}`)} className="block w-full text-left group">
                      <span className="label text-terracotta">Journal · {a.category}</span>
                      <span className="serif block text-[19px] group-hover:underline">{a.title}</span>
                    </button>
                  ))}
                  {results.rooms.length + results.exp.length + results.journal.length === 0 && (
                    <p className="text-[14px] text-obsidian/70">Nothing found for “{q}”. Try “sea”, “ember” or “sunset”. Your dates are still safe.</p>
                  )}
                </div>
              )}
            </div>
            <div className="border-t hairline px-5 py-3 flex justify-between text-[12px] text-obsidian/55">
              <span><Link to="/location" onClick={() => setOpen(false)} className="underline underline-offset-4">Getting here</Link></span>
              <span>ESC to close · ⏎ to search rooms</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Gallery({ images, name }) {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const next = () => setI((v) => (v + 1) % images.length);
  const prev = () => setI((v) => (v - 1 + images.length) % images.length);

  useEffect(() => {
    if (!full) return;
    const h = (e) => {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [full]);

  return (
    <div>
      <div className="relative overflow-hidden bg-sand">
        <AnimatePresence mode="wait">
          <motion.img key={i} src={images[i]} alt={`${name} — photo ${i + 1}`} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
            className="img-cine aspect-[16/10] w-full cursor-zoom-in object-cover" onClick={() => setFull(true)} />
        </AnimatePresence>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <button aria-label="Previous photo" onClick={prev} className="bg-obsidian/55 text-warmwhite p-2.5 backdrop-blur hover:bg-obsidian"><ChevronLeft size={17} /></button>
          <button aria-label="Next photo" onClick={next} className="bg-obsidian/55 text-warmwhite p-2.5 backdrop-blur hover:bg-obsidian"><ChevronRight size={17} /></button>
        </div>
        <span className="absolute bottom-4 right-4 bg-obsidian/55 text-warmwhite text-[12px] tracking-[0.14em] px-3 py-1.5 backdrop-blur">{i + 1} / {images.length}</span>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((src, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`View photo ${k + 1}`} aria-current={k === i}
            className={`overflow-hidden ${k === i ? "ring-2 ring-terracotta ring-offset-2 ring-offset-limestone" : "opacity-75 hover:opacity-100"}`}>
            <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {full && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-obsidian/95 flex flex-col" role="dialog" aria-modal="true" aria-label={`${name} gallery`}>
            <div className="flex items-center justify-between px-5 h-[68px] text-warmwhite">
              <span className="text-[12px] tracking-[0.2em] uppercase">{name} · {i + 1} / {images.length}</span>
              <button aria-label="Close gallery" onClick={() => setFull(false)} className="p-2"><X size={22} /></button>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-8">
              <button aria-label="Previous" onClick={prev} className="text-warmwhite p-3"><ChevronLeft size={30} /></button>
              <img src={images[i]} alt={`${name} fullscreen ${i + 1}`} className="max-h-[78vh] max-w-[84vw] object-contain" />
              <button aria-label="Next" onClick={next} className="text-warmwhite p-3"><ChevronRight size={30} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Toasts() {
  const toast = useStore((s) => s.toast);
  const clear = useStore((s) => s.clearToast);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clear, 3200);
    return () => clearTimeout(t);
  }, [toast, clear]);
  return (
    <AnimatePresence>
      {toast && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
          className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 bg-obsidian text-warmwhite px-6 py-3.5 text-[13px] shadow-2xl flex items-center gap-3" role="status">
          <span className="h-1.5 w-1.5 rounded-full bg-terracotta" /> {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
