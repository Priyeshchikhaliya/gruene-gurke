/**
 * Öffnungszeiten auswerten. Bewusst ohne Server-Bindung, damit Formular und
 * Server Action dieselbe Regel benutzen und nicht auseinanderlaufen.
 */
export type OpeningSeasonInfo = {
  slug: string;
  label: string;
  /** Monate, in denen dieser Zeitraum gilt. Ein Wechsel über den Jahreswechsel ist erlaubt. */
  startMonth: number;
  endMonth: number;
  /** Wann das Restaurant öffnet, z. B. "11:00". */
  opens: string;
  /** Letzte Bestellannahme in der Küche, z. B. "21:30". */
  kitchenUntil: string;
};

/** Wie viele Monate im Voraus reserviert werden kann. */
export const MONTHS_AHEAD = 6;

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const toTime = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

function monthOf(isoDate: string) {
  const month = Number(isoDate.slice(5, 7));
  return Number.isInteger(month) && month >= 1 && month <= 12 ? month : null;
}

/** Der Zeitraum, der an diesem Datum gilt. */
export function seasonForDate(seasons: OpeningSeasonInfo[], isoDate: string) {
  const month = monthOf(isoDate);
  if (month === null) return undefined;
  return seasons.find((season) =>
    season.startMonth <= season.endMonth
      ? month >= season.startMonth && month <= season.endMonth
      : month >= season.startMonth || month <= season.endMonth,
  );
}

/**
 * Wählbare Uhrzeiten: von der Öffnung bis zur letzten Bestellannahme,
 * in Schritten von 30 Minuten.
 */
export function timeSlots(season: OpeningSeasonInfo | undefined, stepMinutes = 30) {
  if (!season) return [];
  const start = toMinutes(season.opens);
  const end = toMinutes(season.kitchenUntil);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) return [];

  const slots: string[] = [];
  for (let minute = start; minute <= end; minute += stepMinutes) slots.push(toTime(minute));
  return slots;
}

/** Heute in Europe/Berlin als YYYY-MM-DD. */
export function todayInBerlin() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Berlin" }).format(new Date());
}

/** Spätestes Datum, das angefragt werden kann. */
export function latestReservationDate(from = todayInBerlin()) {
  const [year, month, day] = from.split("-").map(Number);
  const target = new Date(Date.UTC(year, month - 1 + MONTHS_AHEAD, day));
  return new Intl.DateTimeFormat("en-CA", { timeZone: "UTC" }).format(target);
}

export type TimeCheck = { ok: true } | { ok: false; reason: string };

/** Prüft Datum und Uhrzeit gegen die hinterlegten Öffnungszeiten. */
export function checkReservationTime(
  seasons: OpeningSeasonInfo[],
  isoDate: string,
  time: string,
  today = todayInBerlin(),
): TimeCheck {
  if (isoDate < today) return { ok: false, reason: "Das Datum liegt in der Vergangenheit." };
  if (isoDate > latestReservationDate(today)) {
    return { ok: false, reason: `Bitte höchstens ${MONTHS_AHEAD} Monate im Voraus reservieren.` };
  }

  const season = seasonForDate(seasons, isoDate);
  if (!season) return { ok: false, reason: "Für dieses Datum sind keine Öffnungszeiten hinterlegt." };

  const slots = timeSlots(season);
  if (slots.length === 0) return { ok: false, reason: "Für dieses Datum sind keine Uhrzeiten hinterlegt." };

  if (!slots.includes(time)) {
    return {
      ok: false,
      reason: `Wir nehmen an diesem Tag von ${season.opens} bis ${season.kitchenUntil} Uhr Bestellungen an. Bitte eine Uhrzeit aus der Liste wählen.`,
    };
  }

  return { ok: true };
}
