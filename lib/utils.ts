import { format, parseISO } from 'date-fns'

// Format a date string or Date object as "d MMM yyyy" — returns '—' if missing/invalid.
export function fmtDate(d: string | Date | null | undefined): string {
  if (!d) return '—'
  try {
    const date = typeof d === 'string' ? parseISO(d) : d
    if (Number.isNaN(date.getTime())) return '—'
    return format(date, 'd MMM yyyy')
  } catch {
    return '—'
  }
}

// Convert 24h "HH:MM" or "HH:MM:SS" to "h:MM AM/PM"
export function fmtTime(t: string | null | undefined): string {
  if (!t) return '—'
  const [hStr, mStr] = t.split(':')
  const h = parseInt(hStr, 10)
  const m = parseInt(mStr, 10)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

// Lightweight clsx-style className combiner — keeps components dependency-free.
type ClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | Record<string, boolean | null | undefined>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const process = (value: ClassValue): void => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(process);
    } else if (typeof value === "object") {
      for (const key in value) {
        if (value[key]) out.push(key);
      }
    }
  };

  inputs.forEach(process);
  return out.join(" ");
}
