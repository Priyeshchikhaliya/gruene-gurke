/**
 * Seasonal opening hours (from the current website). Open daily.
 * Will move to Supabase once the admin area lands.
 */
export type SeasonId = "summer" | "winter";

export type Season = {
  id: SeasonId;
  /** Inclusive month range, 1–12 */
  from: { month: number; day: number };
  to: { month: number; day: number };
  restaurant: { opens: string; closes: string };
  takeaway: { opens: string; closes: string };
  kitchenUntil: string;
};

export const seasons: Season[] = [
  {
    id: "summer",
    from: { month: 5, day: 1 },
    to: { month: 10, day: 31 },
    restaurant: { opens: "11:00", closes: "22:00" },
    takeaway: { opens: "11:00", closes: "22:00" },
    kitchenUntil: "21:30",
  },
  {
    id: "winter",
    from: { month: 11, day: 1 },
    to: { month: 4, day: 30 },
    restaurant: { opens: "11:00", closes: "22:00" },
    takeaway: { opens: "11:00", closes: "21:30" },
    kitchenUntil: "21:00",
  },
];

/** schema.org OpeningHoursSpecification for the whole year (restaurant hours are identical). */
export const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "11:00",
    closes: "22:00",
  },
];
