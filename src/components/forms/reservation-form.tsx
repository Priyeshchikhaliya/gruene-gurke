"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createReservation, type ReservationState } from "@/actions/reservations";
import { Button } from "@/components/ui/button";
import { Checkbox, FieldError, Honeypot, Input, Label, Textarea } from "@/components/ui/field";
import { routes } from "@/lib/routes";

const initial: ReservationState = { status: "idle" };

export function ReservationForm() {
  const [state, action, pending] = useActionState(createReservation, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-sage-300 bg-sage-100 p-5 text-forest-900 sm:p-6">
        Vielen Dank! Ihre Anfrage ist bei uns eingegangen. Wir melden uns in Kürze per E-Mail.
      </div>
    );
  }

  const err = (field: keyof NonNullable<ReservationState["fieldErrors"]>) => state.fieldErrors?.[field];
  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} noValidate className="relative grid gap-5 sm:grid-cols-2 sm:gap-6">
      <Honeypot />

      <div className="sm:col-span-2">
        <Label htmlFor="name" required>Name</Label>
        <Input id="name" name="name" autoComplete="name" required aria-invalid={!!err("name")} aria-describedby="name-error" />
        <FieldError id="name-error" message={err("name")} />
      </div>

      <div>
        <Label htmlFor="email" required>E-Mail</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!err("email")} aria-describedby="email-error" />
        <FieldError id="email-error" message={err("email")} />
      </div>

      <div>
        <Label htmlFor="phone" required>Telefon</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" required aria-invalid={!!err("phone")} aria-describedby="phone-error" />
        <FieldError id="phone-error" message={err("phone")} />
      </div>

      <div>
        <Label htmlFor="date" required>Datum</Label>
        <Input id="date" name="date" type="date" min={today} required aria-invalid={!!err("date")} aria-describedby="date-error" />
        <FieldError id="date-error" message={err("date")} />
      </div>

      <div>
        <Label htmlFor="time" required>Uhrzeit</Label>
        <Input id="time" name="time" type="time" step={900} required aria-invalid={!!err("time")} aria-describedby="time-error" />
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
          defaultValue={2}
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
          placeholder="Anlass, Kinderstuhl, Sitzplatz auf der Terrasse, Allergien …"
          aria-invalid={!!err("message")}
          aria-describedby="message-error"
        />
        <FieldError id="message-error" message={err("message")} />
      </div>

      <div className="sm:col-span-2">
        <Checkbox id="consent" name="consent" invalid={!!err("consent")} describedBy="consent-error">
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
