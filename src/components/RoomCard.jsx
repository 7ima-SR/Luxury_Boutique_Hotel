import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart } from "lucide-react";
import { availabilityFor, money } from "../data/hotel";
import { useStore } from "../store/useStore";
import { StatusDot } from "./ui";

export function RoomCard({ room, index = 0 }) {
  const av = availabilityFor(room.id);
  const favs = useStore((s) => s.favorites);
  const toggleFav = useStore((s) => s.toggleFav);
  const saved = favs.includes(room.id);
  const labels = { available: "Available", limited: "Only 1 room left", soldout: "Sold out" };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06 }}
      className="group"
    >
      <Link to={`/rooms/${room.id}`} className="block relative overflow-hidden bg-sand" aria-label={`Explore ${room.name}`}>
        <img src={room.images[0]} alt={room.name} loading="lazy" className="img-cine aspect-[4/5] md:aspect-[4/4.6] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]" />
        <span className="absolute left-4 top-4 bg-warmwhite/95 px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase font-medium flex items-center gap-2">
          <StatusDot status={av.status} /> {labels[av.status]}
        </span>
        <button
          aria-label={saved ? `Remove ${room.name} from saved` : `Save ${room.name}`}
          aria-pressed={saved}
          onClick={(e) => { e.preventDefault(); toggleFav(room.id); }}
          className={`absolute right-4 top-4 p-2.5 rounded-full backdrop-blur transition ${saved ? "bg-terracotta text-warmwhite" : "bg-obsidian/30 text-warmwhite hover:bg-obsidian/60"}`}
        >
          <Heart size={15} fill={saved ? "currentColor" : "none"} />
        </button>
        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-warmwhite text-obsidian opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0" aria-hidden>
          <ArrowUpRight size={18} strokeWidth={1.5} />
        </span>
      </Link>
      <div className="pt-5 flex items-start justify-between gap-4">
        <div>
          <p className="label text-obsidian/50">{room.view} · {room.size} m²</p>
          <Link to={`/rooms/${room.id}`}><h3 className="serif text-[30px] leading-tight font-medium hover:text-terracotta transition-colors">{room.name}</h3></Link>
          <p className="text-[13px] text-obsidian/65 mt-1">{room.tagline}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="serif text-[22px]">{money(room.price)}</p>
          <p className="caption">per night</p>
        </div>
      </div>
    </motion.article>
  );
}

export function PriceBreakdown({ room, nights, guests, selectedExtras, extras }) {
  const chosen = extras.filter((e) => selectedExtras.includes(e.id));
  const roomTotal = room.price * nights;
  const extrasTotal = chosen.reduce((s, e) => s + (e.id === "late" || e.id === "transfer" ? e.price : e.price * guests * Math.max(1, nights > 3 ? 2 : 1)), 0);
  // simpler: per-guest-per-day extras use nights; transfer/late flat
  const detailed = chosen.map((e) => {
    const flat = e.id === "late" || e.id === "transfer";
    const total = flat ? e.price : e.price * guests * (e.id === "breakfast" ? nights : 1);
    return { ...e, total };
  });
  const exSum = detailed.reduce((s, e) => s + e.total, 0);
  const taxes = Math.round((roomTotal + exSum) * 0.1);
  const total = roomTotal + exSum + taxes;
  return { detailed, roomTotal, exSum, taxes, total };
}
