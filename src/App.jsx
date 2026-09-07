import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchOverlay, { Toasts } from "./components/overlays";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import Experience from "./pages/Experience";
import Dining from "./pages/Dining";
import Wellness from "./pages/Wellness";
import Journal from "./pages/Journal";
import Article from "./pages/Article";
import Story from "./pages/Story";
import Location from "./pages/Location";
import { AccountLayout, Dashboard, Profile, Preferences, Saved } from "./pages/Account";
import { Reservations, ReservationDetails } from "./pages/Reservations";
import NotFound from "./pages/NotFound";
import { useStore } from "./store/useStore";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  return null;
}

function StickyBook() {
  const { pathname } = useLocation();
  const hide = ["/booking", "/booking-confirmed"].some((p) => pathname.startsWith(p));
  if (hide) return null;
  return (
    <Link
      to="/booking"
      className="fixed bottom-4 inset-x-4 z-40 md:hidden bg-obsidian text-warmwhite text-center py-4 text-[12px] uppercase tracking-[0.2em] font-semibold shadow-2xl"
    >
      Book now
    </Link>
  );
}

export default function App() {
  const clearToast = useStore((s) => s.clearToast);
  useEffect(() => {
    clearToast();
  }, [clearToast]);
  return (
    <BrowserRouter>
      <ScrollTop />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-obsidian focus:text-warmwhite focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-confirmed/:id" element={<Confirmation />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<Article />} />
          <Route path="/story" element={<Story />} />
          <Route path="/location" element={<Location />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="saved" element={<Saved />} />
          </Route>
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/reservations/:id" element={<ReservationDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <SearchOverlay />
      <Toasts />
      <StickyBook />
    </BrowserRouter>
  );
}
