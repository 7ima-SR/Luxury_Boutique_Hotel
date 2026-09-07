import { motion } from "framer-motion";

export function Reveal({ children, delay = 0, y = 26, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Label({ children, light = false }) {
  return (
    <p className={`label ${light ? "text-warmwhite/70" : "text-terracotta"}`}>{children}</p>
  );
}

export function Btn({ children, variant = "dark", to, onClick, type = "button", className = "", ...rest }) {
  const styles =
    variant === "dark"
      ? "bg-obsidian text-warmwhite hover:bg-terracotta"
      : variant === "light"
        ? "bg-warmwhite text-obsidian hover:bg-sand"
        : variant === "line"
          ? "border border-obsidian/25 text-obsidian hover:border-obsidian hover:bg-obsidian hover:text-warmwhite"
          : variant === "terracotta"
            ? "bg-terracotta text-warmwhite hover:bg-obsidian"
            : "";
  const cls = `inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[12px] font-semibold tracking-[0.16em] uppercase transition-all duration-300 ${styles} ${className}`;
  if (to) return <a href={to} onClick={onClick} className={cls} {...rest}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls} {...rest}>{children}</button>;
}

export function StatusDot({ status }) {
  const map = {
    available: "bg-sage",
    limited: "bg-terracotta",
    soldout: "bg-obsidian/30",
  };
  return <span aria-hidden className={`inline-block h-1.5 w-1.5 rounded-full ${map[status] || map.available}`} />;
}
