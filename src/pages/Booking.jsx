import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CreditCard, Minus, Plus, ShieldCheck } from "lucide-react";
import { rooms, extras, availabilityFor, money, nightsBetween, fmtDateLong, fmtDate } from "../data/hotel";
import { useStore } from "../store/useStore";
import { Label, StatusDot } from "../components/ui";

const steps = ["Dates", "Room", "Extras", "Details", "Payment"];

export default function Booking() {
  const [step, setStep] = useState(0);
  const [payMethod, setPayMethod] = useState("card");
  const [card, setCard] = useState({ n: "", e: "", c: "" });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const s = useStore();
  const navigate = useNavigate();
  const nights = nightsBetween(s.checkIn, s.checkOut);
  const selectedRoom = rooms.find((r) => r.id === s.roomId) || null;

  const totals = useMemo(() => {
    if (!selectedRoom) return null;
    const roomTotal = selectedRoom.price * Math.max(1, nights);
    const det = extras.filter((e) => s.selectedExtras.includes(e.id)).map((e) => {
      const flat = e.id === "late" || e.id === "transfer";
      const total = flat ? e.price : e.id === "breakfast" ? e.price * s.guests * Math.max(1, nights) : e.price * s.guests;
      return { ...e, total };
    });
    const exSum = det.reduce((a, b) => a + b.total, 0);
    const taxes = Math.round((roomTotal + exSum) * 0.1);
    return { det, roomTotal, exSum, taxes, total: roomTotal + exSum + taxes };
  }, [selectedRoom, nights, s.selectedExtras, s.guests]);

  const validDates = nights > 0;
  const canNext =
    step === 0 ? validDates :
    step === 1 ? !!selectedRoom :
    step === 2 ? true :
    step === 3 ? (s.guest.firstName.trim() && s.guest.lastName.trim() && /.+@.+\..+/.test(s.guest.email)) :
    true;

  const placeBooking = () => {
    if (payMethod === "card" && (card.n.replace(/\s/g, "").length < 12 || !card.e || card.c.length < 3)) {
      setError("Something went wrong. Your dates are still safe — check the card details once more.");
      return;
    }
    setError("");
    setPlacing(true);
    setTimeout(() => {
      const id = "LUMA-" + Math.random().toString(36).slice(2, 7).toUpperCase();
      const res = {
        id, roomId: selectedRoom.id, roomName: selectedRoom.name, image: selectedRoom.images[0],
        checkIn: s.checkIn, checkOut: s.checkOut, guests: s.guests, nights: Math.max(1, nights),
        extras: totals.det.map((d) => ({ name: d.name, total: d.total })),
        guest: { ...s.guest }, total: totals.total, status: "Confirmed", createdAt: new Date().toISOString(),
      };
      s.addReservation(res);
      s.resetBooking();
      setPlacing(false);
      navigate(`/booking-confirmed/${id}`);
    }, 1400);
  };

  return (
    <main className="pt-[72px] min-h-screen">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 py-10">
        <p className="label text-terracotta">Booking · Your stay is almost ready.</p>
        <h1 className="serif font-light text-[40px] md:text-[60px] leading-none mt-3">Book your stay.</h1>

        {/* stepper */}
        <ol className="mt-8 flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar" aria-label="Booking steps">
          {steps.map((label, i) => (
            <li key={label} className="flex items-center gap-1 md:gap-2 shrink-0">
              <button onClick={() => i < step && setStep(i)} disabled={i >= step}
                className={`flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-semibold ${i === step ? "text-obsidian" : i < step ? "text-sage" : "text-obsidian/35"}`}
                aria-current={i === step ? "step" : undefined}>
                <span className={`flex h-7 w-7 items-center justify-center rounded-full border text-[12px] ${i < step ? "bg-sage text-warmwhite border-sage" : i === step ? "bg-obsidian text-warmwhite border-obsidian" : "border-obsidian/20"}`}>
                  {i < step ? <Check size={13} /> : i + 1}
                </span> {label}
              </button>
              {i < steps.length - 1 && <span className="mx-1 md:mx-3 h-px w-6 md:w-10 bg-obsidian/15" aria-hidden />}
            </li>
          ))}
        </ol>

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-warmwhite border hairline p-6 md:p-10 min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.35 }}>
                {step === 0 && (
                  <div>
                    <h2 className="serif text-[30px] font-light">When are you coming?</h2>
                    <div className="mt-6 grid sm:grid-cols-3 gap-4">
                      <label className="border hairline p-4 block"> <span className="label text-obsidian/55">Check-in</span>
                        <input type="date" value={s.checkIn} onChange={(e) => s.setDates(e.target.value, s.checkOut)} className="mt-2 w-full bg-transparent serif text-[20px]" aria-label="Check-in date" />
                      </label>
                      <label className="border hairline p-4 block"> <span className="label text-obsidian/55">Check-out</span>
                        <input type="date" value={s.checkOut} min={s.checkIn} onChange={(e) => s.setDates(s.checkIn, e.target.value)} className="mt-2 w-full bg-transparent serif text-[20px]" aria-label="Check-out date" />
                      </label>
                      <div className="border hairline p-4"> <span className="label text-obsidian/55">Guests</span>
                        <span className="mt-2 flex items-center gap-3">
                          <button aria-label="Fewer guests" onClick={() => s.setGuests(Math.max(1, s.guests - 1))} className="border border-obsidian/20 p-1.5"><Minus size={14} /></button>
                          <span className="serif text-[20px]">{s.guests}</span>
                          <button aria-label="More guests" onClick={() => s.setGuests(Math.min(5, s.guests + 1))} className="border border-obsidian/20 p-1.5"><Plus size={14} /></button>
                        </span>
                      </div>
                    </div>
                    {!validDates && <p className="mt-4 text-[13px] text-terracotta">Check-out needs to be after check-in — your dates are still safe.</p>}
                    {validDates && <p className="mt-4 text-[14px] text-obsidian/70">{nights} night{nights > 1 ? "s" : ""} · {fmtDateLong(s.checkIn)} → {fmtDateLong(s.checkOut)} · {s.guests} guest{s.guests > 1 ? "s" : ""}</p>}
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="serif text-[30px] font-light">Choose your room.</h2>
                    <p className="caption mt-1">{fmtDate(s.checkIn)} → {fmtDate(s.checkOut)} · {nights} nights · {s.guests} guests</p>
                    <div className="mt-6 space-y-5">
                      {rooms.map((r) => {
                        const av = availabilityFor(r.id);
                        const active = s.roomId === r.id;
                        const sold = av.status === "soldout";
                        return (
                          <div key={r.id} className={`border p-4 md:p-5 flex flex-col md:flex-row gap-4 transition ${active ? "border-terracotta ring-1 ring-terracotta" : "hairline"} ${sold ? "opacity-70" : ""}`}>
                            <img src={r.images[0]} alt={r.name} className="h-36 w-full md:w-48 object-cover shrink-0" loading="lazy" />
                            <div className="flex-1 min-w-0">
                              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] font-semibold"><StatusDot status={av.status} /> {av.status === "limited" ? "Just one left for these dates." : av.label}</p>
                              <p className="serif text-[24px] mt-1">{r.name} <span className="text-[13px] font-sans text-obsidian/55">· {r.size} m² · {r.view}</span></p>
                              <p className="text-[13px] text-obsidian/65 mt-1 line-clamp-2">{r.tagline}</p>
                              <p className="serif text-[20px] mt-2">{money(r.price)} <span className="text-[12px] font-sans text-obsidian/55">/ night · {money(r.price * Math.max(1, nights))} total</span></p>
                            </div>
                            <div className="flex md:flex-col justify-end gap-2 shrink-0">
                              <Link to={`/rooms/${r.id}`} className="border border-obsidian/20 px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-center hover:border-obsidian">View</Link>
                              <button disabled={sold} onClick={() => s.setRoom(r.id)} className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] font-semibold ${sold ? "bg-obsidian/10 text-obsidian/40 cursor-not-allowed" : active ? "bg-terracotta text-warmwhite" : "bg-obsidian text-warmwhite hover:bg-terracotta"}`}>
                                {sold ? "Sold out" : active ? "Selected" : "Select"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="serif text-[30px] font-light">Add something slow.</h2>
                    <p className="caption mt-1">Optional. Everything can also be arranged at the house.</p>
                    <ul className="mt-6 divide-y hairline border-y hairline">
                      {extras.map((e) => {
                        const on = s.selectedExtras.includes(e.id);
                        return (
                          <li key={e.id} className="py-4 flex items-start gap-4">
                            <button role="checkbox" aria-checked={on} aria-label={`Add ${e.name}`} onClick={() => s.toggleExtra(e.id)}
                              className={`mt-1 flex h-5 w-5 items-center justify-center border shrink-0 ${on ? "bg-terracotta border-terracotta text-warmwhite" : "border-obsidian/30"}`}>
                              {on && <Check size={13} />}
                            </button>
                            <button onClick={() => s.toggleExtra(e.id)} className="flex-1 text-left">
                              <span className="flex justify-between gap-4"><span className="font-medium text-[15px]">{e.name}</span><span className="serif text-[18px] whitespace-nowrap">{money(e.price)} <span className="text-[11px] font-sans text-obsidian/55">{e.per}</span></span></span>
                              <span className="block text-[13px] text-obsidian/65 mt-0.5">{e.desc}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="serif text-[30px] font-light">Who is coming?</h2>
                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      {[["firstName", "First name", "text"], ["lastName", "Last name", "text"], ["email", "Email", "email"], ["phone", "Phone", "tel"]].map(([k, label, type]) => (
                        <label key={k} className="border hairline p-4 block">
                          <span className="label text-obsidian/55">{label}</span>
                          <input type={type} value={s.guest[k]} onChange={(e) => s.setGuest({ [k]: e.target.value })} placeholder={label} aria-label={label}
                            className="mt-1.5 w-full bg-transparent text-[15px] placeholder:text-obsidian/30" />
                        </label>
                      ))}
                      <label className="border hairline p-4 block sm:col-span-2">
                        <span className="label text-obsidian/55">Country</span>
                        <select value={s.guest.country} onChange={(e) => s.setGuest({ country: e.target.value })} aria-label="Country" className="mt-1.5 w-full bg-transparent text-[15px]">
                          <option value="">Select…</option>
                          {["Ireland", "United Kingdom", "Germany", "France", "Spain", "Netherlands", "United States", "Other"].map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </label>
                    </div>
                    <p className="caption mt-4">We only write about your stay. No newsletters unless you ask.</p>
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="serif text-[30px] font-light">Payment <span className="text-[14px] font-sans text-obsidian/55">— demo only, nothing is charged.</span></h2>
                    <div className="mt-5 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Payment method">
                      {[["card", "Card"], ["apple", " Apple Pay"], ["paypal", "PayPal"]].map(([v, l]) => (
                        <button key={v} role="radio" aria-checked={payMethod === v} onClick={() => setPayMethod(v)}
                          className={`border py-3 text-[13px] font-semibold flex items-center justify-center gap-2 ${payMethod === v ? "border-terracotta bg-terracotta/10" : "hairline"}`}>
                          <CreditCard size={15} /> {l}
                        </button>
                      ))}
                    </div>
                    {payMethod === "card" && (
                      <div className="mt-4 grid gap-3">
                        <label className="border hairline p-4 block"><span className="label text-obsidian/55">Card number</span>
                          <input inputMode="numeric" value={card.n} onChange={(e) => setCard({ ...card, n: e.target.value })} placeholder="4242 4242 4242 4242" aria-label="Card number" className="mt-1.5 w-full bg-transparent tracking-widest" /></label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className="border hairline p-4 block"><span className="label text-obsidian/55">Expiry</span>
                            <input value={card.e} onChange={(e) => setCard({ ...card, e: e.target.value })} placeholder="MM / YY" aria-label="Expiry" className="mt-1.5 w-full bg-transparent" /></label>
                          <label className="border hairline p-4 block"><span className="label text-obsidian/55">CVC</span>
                            <input inputMode="numeric" value={card.c} onChange={(e) => setCard({ ...card, c: e.target.value })} placeholder="123" aria-label="CVC" className="mt-1.5 w-full bg-transparent" /></label>
                        </div>
                      </div>
                    )}
                    {payMethod !== "card" && (
                      <div className="mt-4 border border-dashed border-obsidian/25 p-8 text-center">
                        <p className="serif text-[22px]">{payMethod === "apple" ? "Confirm with Apple Pay" : "You will be redirected to PayPal"}</p>
                        <p className="caption mt-1">Demo checkout — no real redirect happens.</p>
                      </div>
                    )}
                    {error && <p role="alert" className="mt-4 text-[13px] text-terracotta">{error}</p>}
                    <p className="mt-4 flex items-center gap-2 text-[13px] text-obsidian/65"><ShieldCheck size={15} className="text-sage" /> Encrypted demo · Free cancellation to 7 days before arrival.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between border-t hairline pt-6">
              <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] font-semibold disabled:opacity-30">
                <ArrowLeft size={14} /> Back
              </button>
              {step < 4 ? (
                <button onClick={() => canNext && setStep(step + 1)} disabled={!canNext} className="inline-flex items-center gap-2 bg-obsidian text-warmwhite px-8 py-3.5 text-[12px] uppercase tracking-[0.16em] font-semibold hover:bg-terracotta transition disabled:opacity-30">
                  Continue <ArrowRight size={14} />
                </button>
              ) : (
                <button onClick={placeBooking} disabled={placing || !selectedRoom} className="inline-flex items-center gap-2 bg-terracotta text-warmwhite px-8 py-3.5 text-[12px] uppercase tracking-[0.16em] font-semibold hover:bg-obsidian transition disabled:opacity-50">
                  {placing ? "Reserving…" : `Confirm · ${totals ? money(totals.total) : ""}`} <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>

          {/* summary */}
          <aside className="lg:col-span-4">
            <div className="bg-obsidian text-warmwhite p-7 lg:sticky lg:top-24">
              <Label light>Your stay</Label>
              {selectedRoom ? (
                <>
                  <img src={selectedRoom.images[0]} alt="" className="mt-4 aspect-[16/9] w-full object-cover" />
                  <p className="serif text-[26px] mt-4">{selectedRoom.name}</p>
                  <p className="text-[13px] text-warmwhite/70">{fmtDateLong(s.checkIn)} → {fmtDateLong(s.checkOut)} · {Math.max(1, nights)} night(s) · {s.guests} guests</p>
                  {totals && (
                    <dl className="mt-5 space-y-2.5 text-[13px] border-t hairline-light pt-5">
                      <div className="flex justify-between"><dt className="text-warmwhite/70">{money(selectedRoom.price)} × {Math.max(1, nights)} nights</dt><dd>{money(totals.roomTotal)}</dd></div>
                      {totals.det.map((d) => <div key={d.id} className="flex justify-between"><dt className="text-warmwhite/70">{d.name}</dt><dd>{money(d.total)}</dd></div>)}
                      <div className="flex justify-between"><dt className="text-warmwhite/70">Taxes & fees (10%)</dt><dd>{money(totals.taxes)}</dd></div>
                      <div className="flex justify-between border-t hairline-light pt-3 serif text-[22px]"><dt>Total</dt><dd>{money(totals.total)}</dd></div>
                    </dl>
                  )}
                </>
              ) : (
                <>
                  <p className="serif text-[24px] mt-4 font-light">Nothing booked yet.<br />Perhaps it's time.</p>
                  <p className="text-[13px] text-warmwhite/60 mt-2">{fmtDateLong(s.checkIn)} → {fmtDateLong(s.checkOut)} · {s.guests} guests</p>
                </>
              )}
              <p className="caption text-warmwhite/50 mt-5">We'll see you by the sea. Free cancellation to 7 days.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
