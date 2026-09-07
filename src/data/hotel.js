export const IMG = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const rooms = [
  {
    id: "garden-room",
    name: "The Garden Room",
    tagline: "Ground level, wrapped in jasmine and stone.",
    description:
      "You wake to filtered light through olive leaves. The Garden Room sits at ground level with its own planted terrace — rain shower in honed travertine, linen curtains, a king bed dressed in washed flax. It is the quietest room in the house, made for readers and long sleepers.",
    price: 340,
    size: 42,
    capacity: 2,
    bed: "King bed",
    view: "Private garden",
    longView: "Garden terrace",
    features: ["King bed", "Garden terrace", "Rain shower", "42 m²"],
    amenities: ["King-size bed", "Rain shower", "Private terrace", "High-speed Wi-Fi", "Breakfast included", "Air conditioning", "Minibar", "Daily housekeeping"],
    images: [
      IMG("photo-1611892440504-42a792e24d32"),
      IMG("photo-1590490360182-c33d57733427"),
      IMG("photo-1600566753086-00f18fb6b3ea"),
      IMG("photo-1600210492486-724fe5c67fb0"),
    ],
    availability: "available",
  },
  {
    id: "sea-room",
    name: "The Sea Room",
    tagline: "Coffee on the balcony before the coast wakes.",
    description:
      "One step onto the balcony and the sea does the rest. Limewashed walls, smoked oak, a deep window seat facing due west. The Sea Room is for those who check the tide before they check their phone.",
    price: 480,
    size: 48,
    capacity: 2,
    bed: "King bed",
    view: "Ocean view",
    longView: "Ocean view · Private balcony",
    features: ["King bed", "Ocean view", "Private balcony", "48 m²"],
    amenities: ["King-size bed", "Ocean view", "Private terrace", "Rain shower", "High-speed Wi-Fi", "Breakfast included", "Air conditioning", "Room service", "Daily housekeeping"],
    images: [
      IMG("photo-1582719508461-905c673771fd"),
      IMG("photo-1591088398332-8a7791972843"),
      IMG("photo-1578683010236-d716f9a3f461"),
      IMG("photo-1519046904884-53103b34b206"),
    ],
    availability: "limited",
  },
  {
    id: "luma-suite",
    name: "The Suite",
    tagline: "Room to stay a little longer.",
    description:
      "A separate living room in stone and bouclé, an ocean terrace large enough for dinner, and a bathroom you will photograph. The Suite was designed for slow weeks — writing mornings, long baths, room service at dusk.",
    price: 720,
    size: 72,
    capacity: 3,
    bed: "King bed + day bed",
    view: "Ocean terrace",
    longView: "Ocean terrace · Living area",
    features: ["King bed", "Living area", "Ocean terrace", "72 m²"],
    amenities: ["King-size bed", "Ocean view", "Private terrace", "Rain shower", "High-speed Wi-Fi", "Breakfast included", "Air conditioning", "Minibar", "Room service", "Daily housekeeping"],
    images: [
      IMG("photo-1600607687939-ce8a6c25118c"),
      IMG("photo-1600585154340-be6161a56a0c"),
      IMG("photo-1615874959474-d609969a20ed"),
      IMG("photo-1616594039964-ae9021a400a0"),
    ],
    availability: "available",
  },
  {
    id: "luma-villa",
    name: "The LUMA Villa",
    tagline: "A house of your own, inside the retreat.",
    description:
      "Two bedrooms, a private pool cut into limestone, outdoor dining under a pergola of vines. The Villa has its own entrance and its own quiet. Staff appear when you need them and vanish when you don't.",
    price: 1240,
    size: 118,
    capacity: 4,
    bed: "2 × King beds",
    view: "Private pool",
    longView: "Private pool · Outdoor dining",
    features: ["2 bedrooms", "Private pool", "Outdoor dining", "118 m²"],
    amenities: ["King-size bed", "Ocean view", "Private terrace", "Rain shower", "High-speed Wi-Fi", "Breakfast included", "Air conditioning", "Minibar", "Room service", "Daily housekeeping"],
    images: [
      IMG("photo-1600596542815-ffad4c1539a9"),
      IMG("photo-1602002418082-a4443e081dd1"),
      IMG("photo-1600047509807-ba8f99d2cdde"),
      IMG("photo-1600566752355-35792bedcfea"),
    ],
    availability: "soldout",
  },
];

export const extras = [
  { id: "breakfast", name: "EMBER breakfast in room", desc: "Warm bread, coastal cheese, soft eggs. Served when you wake.", price: 28, per: "guest / day", icon: "coffee" },
  { id: "transfer", name: "Airport transfer", desc: "45 min in a quiet electric car. Cold towels, still water.", price: 90, per: "per way", icon: "car" },
  { id: "dinner", name: "Private dinner under the stars", desc: "Five courses from EMBER, served on your terrace.", price: 140, per: "per guest", icon: "moon" },
  { id: "spa", name: "Slow ritual · 60 min", desc: "Warm oil, salt, eucalyptus. In the spa garden pavilion.", price: 110, per: "per person", icon: "spa" },
  { id: "late", name: "Late checkout · 2pm", desc: "No rush. Keep the room, keep the light.", price: 60, per: "per stay", icon: "clock" },
];

export const amenitiesList = [
  { name: "Ocean view", note: "Every upper room faces due west" },
  { name: "Private terrace", note: "Stone, linen shade, morning sun" },
  { name: "Rain shower", note: "Honed travertine, eucalyptus steam" },
  { name: "King-size bed", note: "Washed flax, wool, feather" },
  { name: "High-speed Wi-Fi", note: "Fibre, quiet corners included" },
  { name: "Breakfast included", note: "EMBER, 7:30 — 11:00" },
  { name: "Air conditioning", note: "Silent, limewashed vents" },
  { name: "Minibar", note: "Local wine, citrus, small chocolate" },
  { name: "Room service", note: "Until 22:00, no cart noise" },
  { name: "Daily housekeeping", note: "Between 10:00 — 14:00, softly" },
];

export const experiences = [
  { id: "sea", kicker: "The Sea", title: "A private stretch of coastline", text: "Three minutes on foot. Cabanas, cold water, no music. Our boat leaves at 7am for those who ask.", image: IMG("photo-1507525428034-b723cf961d3e"), tag: "Coast" },
  { id: "table", kicker: "The Table", title: "Lunch where the fishermen eat", text: "We will tell you where — a blue door in the village, grilled catch, lemon, nothing else needed.", image: IMG("photo-1414235077428-338989a2e8c0"), tag: "Food" },
  { id: "spa", kicker: "The Spa", title: "Slow wellness rituals", text: "Salt, heat, oil. Sixty minutes that feel like a day. Book the garden pavilion at dusk.", image: IMG("photo-1544161515-4ab6ce6db874"), tag: "Wellness" },
  { id: "land", kicker: "The Land", title: "Guided walks through terraces", text: "Olive groves, dry stone, a farmer who remembers everything. Tuesdays and Saturdays.", image: IMG("photo-1500382017468-9049fed747ef"), tag: "Walks" },
  { id: "night", kicker: "The Night", title: "Private dinners under the stars", text: "Five courses on your terrace. Candles, wool blankets, the sea not far.", image: IMG("photo-1466978913421-dad2ebd01d17"), tag: "Evenings" },
  { id: "boat", kicker: "Morning", title: "Swim before breakfast", text: "The cove at 6:40am belongs to you and two herons. Towels are already there.", image: IMG("photo-1519046904884-53103b34b206"), tag: "Coast" },
  { id: "cellar", kicker: "Cellar", title: "Natural wine, low light", text: "Forty bottles, all coastal. Ask Mara for the skin-contact from the hill.", image: IMG("photo-1510812431401-41d2bd2722f3"), tag: "Drink" },
  { id: "garden", kicker: "Garden", title: "Citrus hour", text: "At five, we cut citrus for the rooms. Join if you like — bring nothing.", image: IMG("photo-1466692476868-aef1dfb1e735"), tag: "Garden" },
  { id: "studio", kicker: "Studio", title: "Clay with Elena", text: "A local potter, a wheel, earthy hands. You keep what you make.", image: IMG("photo-1565193566173-7a0ee3dbe261"), tag: "Craft" },
  { id: "ride", kicker: "Wheels", title: "E-bikes to the Old Town", text: "Twenty minutes along the water. We pack figs and a lock.", image: IMG("photo-1507035895480-2b3156c31fc8"), tag: "Explore" },
  { id: "stars", kicker: "After dark", title: "Telescope on the roof", text: "Saturn on clear nights. Blankets, tea, no talking required.", image: IMG("photo-1419242902214-272b3f66ee7a"), tag: "Evenings" },
  { id: "market", kicker: "Village", title: "Friday market with our chef", text: "Go early with Ana. Taste, carry, then eat what you found at lunch.", image: IMG("photo-1488459716781-31db52582fe9"), tag: "Food" },
];

export const diningMenus = {
  Breakfast: [
    { name: "Warm sourdough, salted butter", desc: "From the village oven, 6am bake", price: 9 },
    { name: "Soft eggs, smoked yogurt", desc: "Chive oil, grilled lemon", price: 14 },
    { name: "Ricotta, honey, thyme", desc: "Sheep's ricotta from the hill farm", price: 13 },
    { name: "Citrus, fennel, olive", desc: "Blood orange, shaved fennel", price: 12 },
  ],
  "Small Plates": [
    { name: "Grilled octopus, aioli", desc: "Charred lemon, parsley oil", price: 24 },
    { name: "Burrata, charred grapes", desc: "Basil, aged balsamic", price: 19 },
    { name: "Anchovy, tomato, crispbread", desc: "Village tomatoes, sea salt", price: 14 },
  ],
  Mains: [
    { name: "Catch of the day, fennel", desc: "Whatever the boats brought", price: 34 },
    { name: "Lamb, embered vegetables", desc: "Slow fire, rosemary jus", price: 36 },
    { name: "Hand-cut pasta, tomato", desc: "Basil, pecorino, olive oil", price: 22 },
  ],
  Dessert: [
    { name: "Olive oil cake, citrus", desc: "Mascarpone, candied peel", price: 12 },
    { name: "Dark chocolate, sea salt", desc: "Olive oil, rosemary smoke", price: 13 },
  ],
  Drinks: [
    { name: "Coastal white — Hill vintage", desc: "Skin contact, glass / bottle", price: 14 },
    { name: "Fig leaf martini", desc: "Gin, fig leaf, lemon oil", price: 16 },
    { name: "Blood orange spritz", desc: "Bitter, soda, rosemary", price: 12 },
  ],
};

export const treatments = [
  { id: "t1", name: "Warm oil massage", duration: "60 min", price: 110, desc: "Salt scrub, eucalyptus steam, slow strokes. In the garden pavilion." },
  { id: "t2", name: "Deep stone heat", duration: "75 min", price: 140, desc: "Basalt stones, warm towels. For backs that carry too much." },
  { id: "t3", name: "Sauna + cold plunge", duration: "45 min", price: 45, desc: "Cedar sauna cut into the hill. Plunge pool at 12 degrees." },
  { id: "t4", name: "Sunrise yoga", duration: "60 min", price: 35, desc: "On the shala deck. Mats, blankets, sea air. All levels." },
  { id: "t5", name: "Evening meditation", duration: "30 min", price: 25, desc: "Breath, low light, wool blankets. No experience needed." },
];

const articleImages = [
  "photo-1507525428034-b723cf961d3e",
  "photo-1520250497591-112f2f40a3f4",
  "photo-1600585154340-be6161a56a0c",
  "photo-1466637574441-749b8f19452f",
  "photo-1470252649378-9c29740c9fa8",
  "photo-1445019980597-93fa8acb246c",
  "photo-1504674900247-0877df9cc836",
  "photo-1493809842364-78817add7ffb",
  "photo-1519046904884-53103b34b206",
  "photo-1540541338287-41700207dee6",
  "photo-1414235077428-338989a2e8c0",
  "photo-1506126613408-eca07ce68773",
  "photo-1488459716781-31db52582fe9",
  "photo-1500382017468-9049fed747ef",
  "photo-1510812431401-41d2bd2722f3",
];

const articleMeta = [
  { slug: "slow-morning", category: "Rituals", title: "A Slow Morning at LUMA", excerpt: "Bread at seven, swim at eight, nothing until ten. Notes on how the house wakes.", minutes: 4, date: "Aug 12, 2026", author: "Mara Ellingsen" },
  { slug: "what-to-pack", category: "Guide", title: "What to Pack for the Coast", excerpt: "Linen, one good book, sandals you can walk in. Leave the rest.", minutes: 3, date: "Jul 28, 2026", author: "June Park" },
  { slug: "architecture-quiet", category: "Design", title: "The Architecture of Quiet", excerpt: "Why every wall is thick, every window low, and every corridor bends.", minutes: 6, date: "Jul 02, 2026", author: "Studio Nord" },
  { slug: "farmers-ember", category: "Food", title: "Meet the Local Farmers Behind EMBER", excerpt: "Three families, one hill, and the tomatoes that ruined all other tomatoes.", minutes: 5, date: "Jun 18, 2026", author: "Ana Ruiz" },
  { slug: "five-sunsets", category: "Guide", title: "Five Places to Watch the Sunset", excerpt: "The roof, the cove, the olive terrace — and two we only tell in person.", minutes: 4, date: "Jun 01, 2026", author: "Mara Ellingsen" },
  { slug: "linen-study", category: "Craft", title: "Why Everything Here Is Linen", excerpt: "Flax, wash, wear. On fabric that softens the longer you stay.", minutes: 3, date: "May 20, 2026", author: "June Park" },
  { slug: "winter-coast", category: "Seasons", title: "The Coast in Winter", excerpt: "Empty beaches, wood smoke, and the best table at EMBER.", minutes: 5, date: "May 04, 2026", author: "Ana Ruiz" },
  { slug: "light-rooms", category: "Design", title: "Designing with Light, Not Lamps", excerpt: "How the Sea Rooms track the sun from 6am to 8pm.", minutes: 4, date: "Apr 16, 2026", author: "Studio Nord" },
  { slug: "swim-guide", category: "Rituals", title: "Where to Swim Within Ten Minutes", excerpt: "Coves, ladders, water temperature by month. Honestly rated.", minutes: 3, date: "Mar 30, 2026", author: "Mara Ellingsen" },
  { slug: "ember-fire", category: "Food", title: "Cooking Over Ember", excerpt: "Our chef on fire, restraint, and why the menu is short.", minutes: 6, date: "Mar 11, 2026", author: "Ana Ruiz" },
  { slug: "sound-hotel", category: "Design", title: "The Sound of This Hotel", excerpt: "No lobby music. Gravel, water, cutlery. Silence, kept on purpose.", minutes: 4, date: "Feb 22, 2026", author: "Studio Nord" },
  { slug: "yoga-dawn", category: "Wellness", title: "Yoga at Dawn, Tea After", excerpt: "What happens on the shala deck before the house wakes.", minutes: 3, date: "Feb 08, 2026", author: "Noa Lind" },
  { slug: "market-friday", category: "Food", title: "Friday Market, Basket by Basket", excerpt: "Follow Ana through the village stalls she has known for a decade.", minutes: 5, date: "Jan 19, 2026", author: "Ana Ruiz" },
  { slug: "stone-story", category: "Design", title: "Limestone, and Why It Matters", excerpt: "The quarry ten kilometres away that built every wall you touch.", minutes: 4, date: "Jan 05, 2026", author: "Studio Nord" },
  { slug: "night-wine", category: "Evenings", title: "A Glass After Ten", excerpt: "The cellar stays open late. Mara pours whatever is open.", minutes: 2, date: "Dec 12, 2025", author: "June Park" },
];

export const articles = articleMeta.map((a, i) => ({
  ...a,
  id: a.slug,
  image: IMG(articleImages[i % articleImages.length]),
  image2: IMG(articleImages[(i + 4) % articleImages.length], 1200),
}));

export function availabilityFor(roomId, nights) {
  const r = rooms.find((x) => x.id === roomId);
  if (!r) return { status: "available", label: "Available" };
  if (r.availability === "soldout") return { status: "soldout", label: "Sold out" };
  if (r.availability === "limited") return { status: "limited", label: "Only 1 room left" };
  return { status: "available", label: "Available" };
}

export const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};
export const fmtDateLong = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
};
export const nightsBetween = (a, b) => {
  if (!a || !b) return 0;
  const ms = new Date(b + "T12:00:00") - new Date(a + "T12:00:00");
  return Math.max(0, Math.round(ms / 86400000));
};
export const money = (n) => `€${Number(n).toLocaleString("en-IE")}`;
