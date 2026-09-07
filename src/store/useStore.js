import { create } from "zustand";
import { persist } from "zustand/middleware";

const todayPlus = (d) => {
  const t = new Date();
  t.setDate(t.getDate() + d);
  return t.toISOString().slice(0, 10);
};

export const useStore = create(
  persist(
    (set, get) => ({
      checkIn: todayPlus(5),
      checkOut: todayPlus(9),
      guests: 2,
      roomId: null,
      selectedExtras: [],
      guest: { firstName: "", lastName: "", email: "", phone: "", country: "" },
      reservations: [],
      activeReservationId: null,
      favorites: [],
      recentSearches: ["Sea Room", "EMBER dinner", "sunset", "late checkout"],
      searchOpen: false,
      toast: null,

      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setGuests: (guests) => set({ guests }),
      setRoom: (roomId) => set({ roomId }),
      toggleExtra: (id) =>
        set((s) => ({
          selectedExtras: s.selectedExtras.includes(id)
            ? s.selectedExtras.filter((e) => e !== id)
            : [...s.selectedExtras, id],
        })),
      setGuest: (patch) => set((s) => ({ guest: { ...s.guest, ...patch } })),
      setSearchOpen: (v) => set({ searchOpen: v }),
      pushSearch: (q) =>
        set((s) => ({ recentSearches: [q, ...s.recentSearches.filter((x) => x !== q)].slice(0, 5) })),
      toggleFav: (id) =>
        set((s) => ({ favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [...s.favorites, id] })),
      showToast: (toast) => set({ toast }),
      clearToast: () => set({ toast: null }),

      addReservation: (res) =>
        set((s) => ({ reservations: [res, ...s.reservations], activeReservationId: res.id })),
      cancelReservation: (id) =>
        set((s) => ({
          reservations: s.reservations.map((r) => (r.id === id ? { ...r, status: "Cancelled" } : r)),
        })),
      resetBooking: () => set({ roomId: null, selectedExtras: [] }),
    }),
    { name: "luma-store", partialize: (s) => ({ checkIn: s.checkIn, checkOut: s.checkOut, guests: s.guests, reservations: s.reservations, favorites: s.favorites, guest: s.guest }) }
  )
);
