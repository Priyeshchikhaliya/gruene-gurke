"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { createReservation, type ReservationState } from "@/actions/reservations";
import { Button } from "@/components/ui/button";
import { Checkbox, FieldError, Honeypot, Input, Label, Select, Textarea } from "@/components/ui/field";
import {
  latestReservationDate,
  seasonForDate,
  timeSlots,
  todayInBerlin,
  type OpeningSeasonInfo,
} from "@/lib/opening";
import { routes } from "@/lib/routes";

const initial: ReservationState = { status: "idle" };

export function ReservationForm({ seasons }: { seasons: OpeningSeasonInfo[] }) {
  const [state, action, pending] = useActionState(createReservation, initial);

  const today = todayInBerlin();
  const latest = latestReservationDate(today);

  // Die wählbaren Uhrzeiten hängen vom Datum ab: im Winter schließt die
  // Küche eine halbe Stunde früher als im Sommer.
  const [date, setDate] = useState(() => state.values?.date ?? "");
  const season = seasonForDate(seasons, date || today);
  const slots = timeSlots(season);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-sage-300 bg-sage-100 p-5 text-forest-900 sm:p-6">
        Vielen Dank! Ihre Anfrage ist bei uns eingegangen. Wir melden uns in Kürze per E-Mail.
      </div>
    );
  }

  const err = (field: keyof NonNullable<ReservationState["fieldErrors"]>) => state.fieldErrors?.[field];
  // React leert ein Formular nach jeder Action. Die zurückgegebenen Werte
  // setzen wir wieder als Vorgabe ein, damit nach einem Fehler nichts
  // erneut getippt werden muss.
  const value = (field: keyof NonNullable<ReservationState["values"]>) => state.values?.[field] ?? "";

  return (
    <form action={action} noValidate className="relative grid gap-5 sm:grid-cols-2 sm:gap-6">
      <Honeypot />

      <div className="sm:col-span-2">
        <Label htmlFor="name" required>Name</Label>
        <Input id="name" name="name" autoComplete="name" defaultValue={value("name")} minLength={2} maxLength={80} required aria-invalid={!!err("name")} aria-describedby="name-error" />
        <FieldError id="name-error" message={err("name")} />
      </div>

      <div>
        <Label htmlFor="email" required>E-Mail</Label>
        <Input id="email" name="email" type="email" inputMode="email" autoComplete="email" defaultValue={value("email")} maxLength={120} required aria-invalid={!!err("email")} aria-describedby="email-error" />
        <FieldError id="email-error" message={err("email")} />
      </div>

      <div>
        <Label htmlFor="phone" required>Telefon</Label>
        <Input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={value("phone")} minLength={6} maxLength={30} placeholder="03943 634256" required aria-invalid={!!err("phone")} aria-describedby="phone-error" />
        <FieldError id="phone-error" message={err("phone")} />
      </div>

      <div>
        <Label htmlFor="date" required>Datum</Label>
        <Input
          id="date"
          name="date"
          type="date"
          min={today}
          max={latest}
          defaultValue={value("date")}
          onChange={(event) => setDate(event.currentTarget.value)}
          required
          aria-invalid={!!err("date")}
          aria-describedby="date-error"
        />
        <FieldError id="date-error" message={err("date")} />
      </div>

      <div>
        <Label htmlFor="time" required>Uhrzeit</Label>
        {slots.length > 0 ? (
          <Select
            key={`${season?.slug ?? "keine"}-${value("time")}`}
            id="time"
            name="time"
            defaultValue={slots.includes(value("time")) ? value("time") : ""}
            required
            aria-invalid={!!err("time")}
            aria-describedby="time-error time-hint"
          >
            <option value="" disabled>
              Bitte wählen
            </option>
            {slots.map((slot) => (
              <option key={slot} value={slot}>
                {slot} Uhr
              </option>
            ))}
          </Select>
        ) : (
          <Input
            id="time"
            name="time"
            type="time"
            step={900}
            defaultValue={value("time")}
            required
            aria-invalid={!!err("time")}
            aria-describedby="time-error"
          />
        )}
        {season ? (
          <p id="time-hint" className="mt-2 text-xs text-muted">
            {season.label}: Küche nimmt Bestellungen von {season.opens} bis {season.kitchenUntil} Uhr an.
          </p>
        ) : null}
        <FieldError id="time-error" message={err("time")} />
      </div>

      <div>
        <Label htmlFor="guests" required>Personen</Label>
        <Input
          id="guests"
          name="guests"
          type="number"
          min={1}
          max={50}
          step={1}
          defaultValue={state.values?.guests ?? 2}
          inputMode="numeric"
          required
          aria-invalid={!!err("guests")}
          aria-describedby="guests-error guests-hint"
        />
        <p id="guests-hint" className="mt-2 text-xs text-muted">
          Auch größere Gesellschaften sind willkommen.
        </p>
        <FieldError id="guests-error" message={err("guests")} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="message" hint="optional">Anmerkungen und Sonderwünsche</Label>
        <Textarea
          id="message"
          name="message"
          defaultValue={value("message")}
          maxLength={1000}
          placeholder="Anlass, Kinderstuhl, Sitzplatz auf der Terrasse, Allergien …"
          aria-invalid={!!err("message")}
          aria-describedby="message-error"
        />
        <FieldError id="message-error" message={err("message")} />
      </div>

      <div className="sm:col-span-2">
        <Checkbox
          id="consent"
          name="consent"
          defaultChecked={state.values?.consent === "on"}
          invalid={!!err("consent")}
          describedBy="consent-error"
        >
          Ich willige ein, dass meine Angaben zur Bearbeitung der Reservierung gespeichert werden. Die{" "}
          <Link href={routes.privacy} className="underline underline-offset-2 hover:text-forest-900">
            Datenschutzerklärung
          </Link>{" "}
          habe ich gelesen und stimme dieser zu.
        </Checkbox>
        <FieldError id="consent-error" message={err("consent")} />
      </div>

      {state.formError ? (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800 sm:col-span-2">
          {state.formError}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Wird gesendet …" : "Anfrage senden"}
        </Button>
      </div>
    </form>
  );
}
