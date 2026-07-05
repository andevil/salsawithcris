"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  CaretLeft,
  CaretRight,
  CheckCircle,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { availability, bookingServices, sectionCopy } from "@/lib/data";
import { BlurFade } from "@/components/magicui/BlurFade";

const copy = sectionCopy.booking;

type Step = "calendar" | "form" | "success";

type DayCell = {
  iso: string;
  day: number;
  isWeekend: boolean;
  isToday: boolean;
  isAvailable: boolean;
  isBooked: boolean;
};

// Availability in lib/data.ts is mock data pending a real booking backend —
// once that's wired up, derive TODAY from the server/client clock is fine
// since real availability will always be generated relative to "now".
const now = new Date();
const TODAY_ISO = toIso(now.getFullYear(), now.getMonth(), now.getDate());
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toIso(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// The mock availability slots are pinned to June/July 2026. If "today" has
// moved past all of them (no real backend yet), fall back to the month of
// the earliest mock slot so the calendar doesn't open on an empty view.
function initialViewDate(): { year: number; month: number } {
  const mockIsoDates = Object.keys(availability.slots).sort();
  const latestMock = mockIsoDates[mockIsoDates.length - 1];
  if (latestMock && latestMock < TODAY_ISO) {
    const earliest = mockIsoDates[0];
    const [y, m] = earliest.split("-").map(Number);
    return { year: y, month: m - 1 };
  }
  return { year: now.getFullYear(), month: now.getMonth() };
}

function buildMonth(year: number, month: number): (DayCell | null)[] {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Convert JS Sunday-start (0) to Monday-start grid.
  const startOffset = (first.getDay() + 6) % 7;

  const cells: (DayCell | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const iso = toIso(year, month, d);
    const dow = new Date(year, month, d).getDay();
    cells.push({
      iso,
      day: d,
      isWeekend: dow === 0 || dow === 6,
      isToday: iso === TODAY_ISO,
      isAvailable: Boolean(availability.slots[iso]?.length),
      isBooked: availability.booked.includes(iso),
    });
  }
  return cells;
}

export function BookingCalendar() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("calendar");

  // Calendar state — starts on the current month, unless the mock
  // availability data has entirely lapsed (see initialViewDate above).
  const [viewYear, setViewYear] = useState(() => initialViewDate().year);
  const [viewMonth, setViewMonth] = useState(() => initialViewDate().month);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(bookingServices[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const cells = useMemo(
    () => buildMonth(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const slots = selectedDate ? availability.slots[selectedDate] ?? [] : [];

  const transition = {
    duration: reduce ? 0.15 : 0.4,
    ease: "easeInOut" as const,
  };
  const variants = reduce
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
      };

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const selectDay = (cell: DayCell) => {
    if (!cell.isAvailable || cell.isBooked) return;
    setSelectedDate(cell.iso);
    setSelectedTime(null);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string } = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setStep("success");
  };

  const reset = () => {
    setStep("calendar");
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setService(bookingServices[0]);
    setMessage("");
    setErrors({});
  };

  const prettyDate = (iso: string | null) => {
    if (!iso) return "";
    const [y, m, d] = iso.split("-").map(Number);
    return `${MONTH_NAMES[m - 1]} ${d}, ${y}`;
  };

  return (
    <section id="booking" className="page-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <BlurFade inViewMargin="-60px">
          <div className="mb-12 max-w-2xl">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-salsa-red">
              Booking
            </p>
            <h2 className="font-display text-4xl font-light leading-tight text-espresso sm:text-5xl md:text-6xl">
              {copy.heading}
            </h2>
            {copy.subheading && (
              <p className="mt-6 text-base leading-relaxed text-muted">
                {copy.subheading}
              </p>
            )}
            {copy.reassurance && (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {copy.reassurance}{" "}
                <a
                  href="#contact"
                  className="font-medium text-salsa-red underline decoration-salsa-red/30 underline-offset-4 transition-colors hover:text-deep-red"
                >
                  Send a message
                </a>
              </p>
            )}
          </div>
        </BlurFade>

        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
          {(["calendar", "form", "success"] as Step[]).map((s, i) => {
            const stepOrder: Step[] = ["calendar", "form", "success"];
            const isDone = stepOrder.indexOf(step) > i;
            const isActive = step === s;
            return (
              <span
                key={s}
                className={cn(
                  "flex items-center gap-3",
                  isActive ? "text-salsa-red" : isDone ? "text-gold" : "text-muted",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-pill border font-medium",
                    isActive
                      ? "border-salsa-red bg-salsa-red text-cream-soft"
                      : isDone
                        ? "border-gold bg-gold/15 text-espresso"
                        : "border-current",
                  )}
                >
                  {i + 1}
                </span>
                <span className="hidden sm:inline">
                  {s === "calendar" ? "Date" : s === "form" ? "Details" : "Done"}
                </span>
                {i < 2 && <span className="text-gold/40">—</span>}
              </span>
            );
          })}
        </div>

        <div className="glass-card overflow-hidden p-0">
          <AnimatePresence mode="wait">
            {/* ---------------- STEP 1: CALENDAR ---------------- */}
            {step === "calendar" && (
              <motion.div
                key="calendar"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="grid grid-cols-1 md:grid-cols-2"
              >
                {/* Month grid */}
                <div className="border-b border-gold/20 p-6 md:border-b-0 md:border-r md:p-10">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-display text-2xl font-medium text-espresso">
                      {MONTH_NAMES[viewMonth]} {viewYear}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => changeMonth(-1)}
                        aria-label="Previous month"
                        className="rounded-md border border-gold/30 p-2 text-espresso-soft transition-colors hover:border-gold hover:text-salsa-red"
                      >
                        <CaretLeft size={16} weight="light" />
                      </button>
                      <button
                        type="button"
                        onClick={() => changeMonth(1)}
                        aria-label="Next month"
                        className="rounded-md border border-gold/30 p-2 text-espresso-soft transition-colors hover:border-gold hover:text-salsa-red"
                      >
                        <CaretRight size={16} weight="light" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center">
                    {WEEKDAYS.map((d) => (
                      <span
                        key={d}
                        className="pb-2 text-[0.65rem] uppercase tracking-wider text-muted"
                      >
                        {d}
                      </span>
                    ))}
                    {cells.map((cell, i) =>
                      cell === null ? (
                        <span key={`empty-${i}`} />
                      ) : (
                        <button
                          key={cell.iso}
                          type="button"
                          disabled={!cell.isAvailable || cell.isBooked}
                          onClick={() => selectDay(cell)}
                          aria-label={`${prettyDate(cell.iso)}${
                            cell.isBooked
                              ? " — fully booked"
                              : cell.isAvailable
                                ? " — available"
                                : " — unavailable"
                          }`}
                          aria-pressed={selectedDate === cell.iso}
                          className={cn(
                            "relative flex aspect-square items-center justify-center rounded-md border text-sm transition-colors",
                            selectedDate === cell.iso
                              ? "border-transparent bg-gradient-to-br from-salsa-red to-gold text-cream-soft shadow-[0_8px_20px_rgba(185,28,28,0.28)]"
                              : cell.isBooked
                                ? "cursor-not-allowed border-gold/10 bg-cream-soft text-muted line-through"
                                : cell.isAvailable
                                  ? "border-gold/40 bg-gold/[0.15] text-espresso hover:border-gold hover:bg-gold/25"
                                  : cn(
                                      "cursor-not-allowed border-transparent",
                                      cell.isWeekend
                                        ? "text-muted/60"
                                        : "text-muted",
                                    ),
                          )}
                        >
                          {cell.day}
                          {cell.isToday && (
                            <span
                              className="absolute bottom-1 h-1 w-1 rounded-pill bg-gold"
                              aria-hidden
                            />
                          )}
                        </button>
                      ),
                    )}
                  </div>

                  {/* Legend — not relying on color alone */}
                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.7rem] text-muted">
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm border border-gold/40 bg-gold/[0.15]" />
                      Available
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm bg-gradient-to-br from-salsa-red to-gold" />
                      Selected
                    </span>
                    <span className="flex items-center gap-2 line-through">
                      Booked
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-pill bg-gold" />
                      Today
                    </span>
                  </div>
                </div>

                {/* Day details + time slots */}
                <div className="flex flex-col p-6 md:p-10">
                  <h4 className="font-display text-xl font-medium text-espresso">
                    {selectedDate ? prettyDate(selectedDate) : "Select a date"}
                  </h4>
                  <p className="mt-2 text-sm text-muted">
                    {selectedDate
                      ? "Choose a time that suits you."
                      : "Available days are highlighted. Pick one to see times."}
                  </p>

                  {selectedDate && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          aria-pressed={selectedTime === slot}
                          className={cn(
                            "rounded-md border py-3 text-sm transition-colors",
                            selectedTime === slot
                              ? "border-transparent bg-gradient-to-br from-salsa-red to-gold text-cream-soft shadow-[0_8px_20px_rgba(185,28,28,0.28)]"
                              : "border-gold/40 bg-gold/[0.15] text-espresso hover:border-gold hover:bg-gold/25",
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep("form")}
                    className="primary-cta mt-auto px-8 py-4 text-sm font-medium tracking-wide transition-all duration-300 enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-none disabled:bg-muted/30 disabled:text-muted disabled:shadow-none"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* ---------------- STEP 2: FORM ---------------- */}
            {step === "form" && (
              <motion.form
                key="form"
                onSubmit={submitForm}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="p-6 md:p-10"
              >
                <div className="mb-8 rounded-md border border-gold/25 bg-cream-soft px-5 py-4 text-sm text-espresso-soft">
                  <span className="text-espresso">{prettyDate(selectedDate)}</span>
                  {" · "}
                  <span className="text-salsa-red">{selectedTime}</span>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field label="Name" error={errors.name} htmlFor="bk-name">
                    <input
                      id="bk-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-md border border-gold/30 bg-cream-soft px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-gold"
                    />
                  </Field>

                  <Field label="Email" error={errors.email} htmlFor="bk-email">
                    <input
                      id="bk-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-md border border-gold/30 bg-cream-soft px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-gold"
                    />
                  </Field>

                  <Field label="Service" htmlFor="bk-service" className="md:col-span-2">
                    <select
                      id="bk-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full rounded-md border border-gold/30 bg-cream-soft px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-gold"
                    >
                      {bookingServices.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="Message (optional)"
                    htmlFor="bk-message"
                    className="md:col-span-2"
                  >
                    <textarea
                      id="bk-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-md border border-gold/30 bg-cream-soft px-4 py-3 text-sm text-espresso outline-none transition-colors focus:border-gold"
                    />
                  </Field>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep("calendar")}
                    className="flex items-center justify-center gap-2 rounded-pill border border-muted/40 px-8 py-4 text-sm font-medium tracking-wide text-espresso-soft transition-colors hover:border-muted hover:text-espresso"
                  >
                    <ArrowLeft size={16} weight="light" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="primary-cta flex flex-1 items-center justify-center gap-2 px-8 py-4 text-sm font-medium tracking-wide transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Confirm Booking
                    <ArrowRight size={16} weight="light" />
                  </button>
                </div>
              </motion.form>
            )}

            {/* ---------------- STEP 3: SUCCESS ---------------- */}
            {step === "success" && (
              <motion.div
                key="success"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={transition}
                className="flex flex-col items-center p-10 text-center md:p-16"
              >
                <CheckCircle size={64} weight="light" className="text-gold" />
                <h3 className="mt-6 font-display text-4xl font-medium text-espresso">
                  Your request is in.
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                  Thank you for reaching out. I&rsquo;ll get back to you soon so we
                  can find the best rhythm, time, and class for you.
                </p>

                <div className="glass-card mt-8 w-full max-w-sm p-6 text-left text-sm">
                  <SummaryRow label="Service" value={service} />
                  <SummaryRow label="Date" value={prettyDate(selectedDate)} />
                  <SummaryRow label="Time" value={selectedTime ?? ""} />
                </div>

                <button
                  type="button"
                  onClick={reset}
                  className="primary-cta mt-8 px-8 py-4 text-sm font-medium tracking-wide transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Book Another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(className, error && "shake")}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted"
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-xs text-salsa-red">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gold/15 py-2 last:border-0">
      <span className="text-muted">{label}</span>
      <span className="text-espresso">{value}</span>
    </div>
  );
}
