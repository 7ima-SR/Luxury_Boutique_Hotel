# LUMA — Stay Somewhere Worth Remembering

A complete, production-quality **luxury boutique hotel website and booking experience** built with **React only**. LUMA is a fictional 24-room coastal retreat — intimate, architectural, and calm — presented with an editorial, magazine-grade design language.

> "An intimate retreat shaped by stone, sea, and the slower rhythm of coastal living."

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Booking Flow](#booking-flow)
- [State Management](#state-management)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Scripts](#scripts)
- [Demo Data](#demo-data)
- [Deployment](#deployment)
- [License](#license)

---

## Features

### Marketing & Editorial

- **Cinematic homepage** — full-viewport hero, floating booking bar, asymmetrical editorial intro, room showcase, full-bleed cove break, horizontal experience rail, EMBER/Wellness split, typographic amenities list, journal teaser
- **Rooms** — 4 room types (Garden Room, Sea Room, Suite, LUMA Villa) with hover transitions, pricing, and realistic availability states
- **Room details** — image gallery with thumbnails, fullscreen mode, prev/next, image counter, keyboard navigation, amenity list, sticky reservation panel
- **Experience** — 12 curated experiences across Sea, Table, Spa, Land, Night + more
- **Dining (EMBER)** — seasonal coastal restaurant with tabbed menu (Breakfast, Small Plates, Mains, Dessert, Drinks), chef and wine notes
- **Wellness** — 5 treatments with duration, pricing, and booking actions; sage-accented calm UI
- **Journal** — 15 editorial articles with category, reading time, date, author, and excerpt
- **Article pages** — hero image, drop caps, inline imagery, pull quotes, related stories
- **Our Story** — brand timeline (2018 → 2026) with large typography and photography
- **Location** — illustrated map (no API key required), honest drive times, transfer booking

### Booking Engine (frontend-only, realistic)

1. **Dates** — check-in / check-out / guests with night-count validation
2. **Room** — compare rooms, live totals, availability badges (`Available` / `Only 1 room left` / `Sold out`), sold-out rooms blocked from selection
3. **Extras** — breakfast, airport transfer, private dinner, spa ritual, late checkout with per-guest/per-stay pricing
4. **Guest details** — validated name/email/phone/country form
5. **Payment** — card / Apple Pay / PayPal demo UI (no real processing), inline error handling
6. **Confirmation** — reservation number, room, dates, guests, totals, guest info, add-to-calendar (`.ics` download), print, view-reservation link

### Guest Account (local, no backend)

- Dashboard, Reservations, Profile, Preferences, Saved rooms
- Reservation cards with **View / Modify / Cancel**
- Reservation details with price breakdown and stay timeline (Booked → Confirmed → Arrival → Stay → Departure)
- Human empty states ("Nothing booked yet. Perhaps it's time.")

### Platform

- Global search overlay (`⌘K` / `Ctrl+K`), recent searches, grouped results (rooms, experiences, journal)
- Fullscreen mobile menu, sticky mobile **Book Now** bar, bottom-sheet-style booking panels
- Toasts, focus states, skip-to-content link, semantic HTML, ARIA dialogs/forms
- Persisted booking context, reservations, favorites, and profile via `localStorage`

---

## Tech Stack

| Layer      | Choice                                              |
| ---------- | --------------------------------------------------- |
| UI         | React 19, React Router 7                            |
| Styling    | Tailwind CSS 4 (`@tailwindcss/vite`), custom theme  |
| Motion     | Framer Motion (200–700ms cinematic reveals)         |
| Icons      | Lucide React                                        |
| State      | Zustand + `persist` middleware (localStorage)       |
| Fonts      | Cormorant Garamond (serif) + Manrope (sans)         |
| Build      | Vite 8                                              |
| Lint       | Oxlint                                              |
| Images     | Unsplash CDN (lazy-loaded, sized URLs)              |

No backend, database, auth server, or payment processor — everything runs in the browser.

---

## Getting Started

**Prerequisites:** Node.js 20+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → http://localhost:5173

# 3. Production build
npm run build

# 4. Preview the production build
npm run preview

# 5. Lint
npm run lint
```

---

## Project Structure

```
Luxury_Boutique_Hotel/
├── index.html              # Title, meta, Google Fonts
├── vite.config.js          # React + Tailwind plugins
├── src/
│   ├── main.jsx            # React entry (StrictMode)
│   ├── App.jsx             # Router, ScrollTop, layout, StickyBook
│   ├── index.css           # Tailwind import, brand theme, base styles
│   ├── data/
│   │   └── hotel.js        # Rooms, extras, experiences, menus,
│   │                       # treatments, 15 articles, helpers
│   ├── store/
│   │   └── useStore.js     # Zustand: dates, guests, room, extras,
│   │                       # guest, reservations, favorites, search, toast
│   ├── components/
│   │   ├── Navbar.jsx      # Transparent→solid nav, mobile menu, ⌘K
│   │   ├── Footer.jsx      # Sitemap, contact, booking CTA
│   │   ├── BookingBar.jsx  # Floating availability bar
│   │   ├── RoomCard.jsx    # Room card + price-breakdown helper
│   │   ├── overlays.jsx    # SearchOverlay, Gallery, Toasts
│   │   └── ui.jsx          # Reveal, Label, Btn, StatusDot
│   └── pages/
│       ├── Home.jsx        # Hero + editorial sections
│       ├── Rooms.jsx       # Room index
│       ├── RoomDetails.jsx # Gallery + booking panel
│       ├── Booking.jsx     # 5-step booking flow
│       ├── Confirmation.jsx# Booking success + .ics download
│       ├── Experience.jsx  # Things to do
│       ├── Dining.jsx      # EMBER restaurant + menu
│       ├── Wellness.jsx    # Spa treatments
│       ├── Journal.jsx     # Article index
│       ├── Article.jsx     # Editorial article
│       ├── Story.jsx       # Brand timeline
│       ├── Location.jsx    # Map + transfers
│       ├── Account.jsx     # Dashboard/Profile/Preferences/Saved
│       ├── Reservations.jsx# Reservation list + details
│       └── NotFound.jsx    # 404
└── dist/                   # Production build output
```

---

## Pages & Routes

| Route                    | Page                          |
| ------------------------ | ----------------------------- |
| `/`                      | Home                          |
| `/rooms`                 | All rooms                     |
| `/rooms/:id`             | Room details + gallery        |
| `/booking`               | 5-step booking flow           |
| `/booking-confirmed/:id` | Confirmation                  |
| `/experience`            | Experiences                   |
| `/dining`                | EMBER restaurant              |
| `/wellness`              | Spa & rituals                 |
| `/journal`               | Journal index                 |
| `/journal/:slug`         | Article                       |
| `/story`                 | Our story                     |
| `/location`              | Location & transfers          |
| `/account/*`             | Dashboard / Profile / Prefs / Saved |
| `/reservations`          | Reservation list              |
| `/reservations/:id`      | Reservation details           |
| `*`                      | 404                           |

---

## Booking Flow

```
Dates → Room → Extras → Details → Payment → Confirmation
```

- Totals = `room × nights` + extras (per-guest × nights for breakfast, flat for transfer/late checkout) + 10% taxes.
- Sold-out rooms (e.g. the Villa on default dates) cannot be selected; limited rooms show "Just one left for these dates."
- Reservations are stored in Zustand + `localStorage`, so they survive reloads and power the Account area.

---

## State Management

`src/store/useStore.js` (Zustand, persisted as `luma-store`):

| Key                | Persisted | Purpose                              |
| ------------------ | --------- | ------------------------------------ |
| `checkIn/checkOut` | Yes       | Booking dates                        |
| `guests`           | Yes       | Party size                           |
| `roomId`           | No        | Selected room (per booking)          |
| `selectedExtras`   | No        | Chosen extras (per booking)          |
| `guest`            | Yes       | Guest profile / checkout details     |
| `reservations`     | Yes       | Confirmed bookings                   |
| `favorites`        | Yes       | Saved rooms                          |
| `recentSearches`   | No        | Search history (session)             |
| `searchOpen/toast` | No        | Ephemeral UI state                   |

---

## Design System

**Palette** (architectural, warm, cinematic — no gold clichés, no neon, no blue gradients):

| Token       | Hex       | Use                                    |
| ----------- | --------- | -------------------------------------- |
| Obsidian    | `#181715` | Header, footer, buttons, dark sections |
| Limestone   | `#E9E3D8` | Main background (instead of white)     |
| Sand        | `#D5C7B4` | Cards, panels, secondary sections      |
| Terracotta  | `#A65D43` | CTA highlights, active states          |
| Sage        | `#747867` | Wellness, nature, availability         |
| Warm White  | `#F7F4EE` | Text on dark                           |

**Typography:** Cormorant Garamond for headlines, room names, quotes, and editorial; Manrope for nav, forms, buttons, and booking UI.

**Layout principles:** asymmetrical grids, irregular image sizes, generous whitespace, small captions, hairline borders, varied section rhythms (image+text, text+image, full-bleed, type-only, horizontal scroll) — never heading → paragraph → 3 identical cards on repeat.

---

## Accessibility

- Semantic landmarks, skip-to-content link, correct heading hierarchy
- ARIA labels on dialogs, gallery controls, checkboxes, and forms
- Keyboard support: gallery arrows/escape, `⌘K` search, `Esc` to close overlays, visible focus rings
- Alt text on imagery, status text (not color-only) for availability

## Performance

- Lazy-loaded images with sized Unsplash URLs, `aspect-*` boxes to prevent CLS
- Route-level code via React Router, memoized search results, minimal re-renders via Zustand selectors
- Single CSS bundle (~50 kB), no map SDKs, no backend round-trips

---

## Scripts

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/`    |
| `npm run preview` | Preview the production build |
| `npm run lint`  | Run Oxlint                     |

---

## Demo Data

All content lives in `src/data/hotel.js` — 4 rooms, 12 experiences, 15 journal articles, 10 amenities, 5 dining categories, 5 wellness treatments, and 5 bookable extras with believable copy, pricing, and metadata. No lorem ipsum. Photography is served from Unsplash CDN, so an internet connection is required for images.

---

## Deployment

The project builds to static files — deploy `dist/` anywhere:

```bash
npm run build
# Serve dist/ via Netlify, Vercel, GitHub Pages, or any static host.
# Client-side routing: configure SPA fallback to index.html.
```

---

## License

Fictional demo project. LUMA, EMBER, and all copy/imagery references are invented for design purposes.
