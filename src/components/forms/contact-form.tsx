"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/actions/contact";
import { anredeOptions } from "@/lib/anrede";
import { Button } from "@/components/ui/button";
import { Checkbox, FieldError, Honeypot, Input, Label, Select, Textarea } from "@/components/ui/field";
import { routes } from "@/lib/routes";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-sage-300 bg-sage-100 p-5 text-forest-900 sm:p-6">
        Vielen Dank für Ihre Nachricht! Wir melden uns so bald wie möglich bei Ihnen.
      </div>
    );
  }

  const err = (field: keyof NonNullable<ContactState["fieldErrors"]>) => state.fieldErrors?.[field];
  // Siehe Reservierungsformular: Werte nach einem Fehler behalten.
  const value = (field: keyof NonNullable<ContactState["values"]>) => state.values?.[field] ?? "";

  return (
    <form action={action} noValidate className="relative grid gap-5 sm:gap-6">
      <Honeypot />
      <p className="text-sm text-muted">
        Felder mit einem Stern (<span aria-hidden="true">*</span>) sind Pflichtfelder und müssen ausgefüllt sein!
      </p>

      <div>
        <Label htmlFor="anrede" required>Anrede</Label>
        {/* Der Schlüssel erzwingt ein Neuaufbauen: React übernimmt defaultValue
            bei einem <select> nur beim ersten Rendern. */}
        <Select
          key={value("anrede")}
          id="anrede"
          name="anrede"
          defaultValue={value("anrede")}
          required
          aria-invalid={!!err("anrede")}
          aria-describedby="anrede-error"
        >
          <option value="" disabled>Bitte wählen</option>
          {anredeOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </Select>
        <FieldError id="anrede-error" message={err("anrede")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <Label htmlFor="vorname" required>Vorname</Label>
          <Input id="vorname" name="vorname" autoComplete="given-name" defaultValue={value("vorname")} required aria-invalid={!!err("vorname")} aria-describedby="vorname-error" />
          <FieldError id="vorname-error" message={err("vorname")} />
        </div>
        <div>
          <Label htmlFor="name" required>Name</Label>
          <Input id="name" name="name" autoComplete="family-name" defaultValue={value("name")} required aria-invalid={!!err("name")} aria-describedby="name-error" />
          <FieldError id="name-error" message={err("name")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        <div>
          <Label htmlFor="telefon" required>Telefon</Label>
          <Input id="telefon" name="telefon" type="tel" autoComplete="tel" defaultValue={value("telefon")} required aria-invalid={!!err("telefon")} aria-describedby="telefon-error" />
          <FieldError id="telefon-error" message={err("telefon")} />
        </div>
        <div>
          <Label htmlFor="email" required>E-Mail</Label>
          <Input id="email" name="email" type="email" autoComplete="email" defaultValue={value("email")} required aria-invalid={!!err("email")} aria-describedby="email-error" />
          <FieldError id="email-error" message={err("email")} />
        </div>
      </div>

      <div>
        <Label htmlFor="message" required>Ihre Nachricht</Label>
        <Textarea id="message" name="message" defaultValue={value("message")} required aria-invalid={!!err("message")} aria-describedby="message-error" />
        <FieldError id="message-error" message={err("message")} />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-forest-900">
          Einwilligung und Datenschutz <span className="text-red-700" aria-hidden="true">*</span>
        </p>
        <Checkbox
          id="consent"
          name="consent"
          defaultChecked={state.values?.consent === "on"}
          invalid={!!err("consent")}
          describedBy="consent-error"
        >
          Ich willige ein, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen, so lange wie
          es für den jeweiligen Zweck erforderlich ist, gespeichert werden. Diese Einwilligung können Sie jederzeit mit
          Wirkung für die Zukunft widerrufen, indem Sie eine E-Mail an uns schicken. Die{" "}
          <Link href={routes.privacy} className="underline underline-offset-2 hover:text-forest-900">
            Datenschutzerklärung
          </Link>{" "}
          habe ich gelesen und stimme dieser zu.
        </Checkbox>
        <FieldError id="consent-error" message={err("consent")} />
      </div>

      {state.formError ? (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {state.formError}
        </p>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Wird gesendet …" : "Absenden"}
        </Button>
      </div>
    </form>
  );
}
