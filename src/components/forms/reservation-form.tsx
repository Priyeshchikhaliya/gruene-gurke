"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { createReservation, type ReservationState } from "@/actions/reservations";
import { Button } from "@/components/ui/button";
import { FieldError, Honeypot, Input, Label, Select, Textarea } from "@/components/ui/field";

const initial: ReservationState = { status: "idle" };

export function ReservationForm() {
  const t = useTranslations("reservations");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [state, action, pending] = useActionState(createReservation, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-sage-300 bg-sage-100 p-6 text-forest-900">
        {t("form.success")}
      </div>
    );
  }

  const err = (field: keyof NonNullable<ReservationState["fieldErrors"]>) => {
    const key = state.fieldErrors?.[field];
    return key ? t(`errors.${key}` as never) : undefined;
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form action={action} noValidate className="relative grid gap-6 sm:grid-cols-2">
      <input type="hidden" name="locale" value={locale} />
      <Honeypot />

      <div className="sm:col-span-2">
        <Label htmlFor="name">{t("form.name")}</Label>
        <Input id="name" name="name" autoComplete="name" required aria-invalid={!!err("name")} aria-describedby="name-error" />
        <FieldError id="name-error" message={err("name")} />
      </div>

      <div>
        <Label htmlFor="email">{t("form.email")}</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!err("email")} aria-describedby="email-error" />
        <FieldError id="email-error" message={err("email")} />
      </div>

      <div>
        <Label htmlFor="phone">{t("form.phone")}</Label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" required aria-invalid={!!err("phone")} aria-describedby="phone-error" />
        <FieldError id="phone-error" message={err("phone")} />
      </div>

      <div>
        <Label htmlFor="date">{t("form.date")}</Label>
        <Input id="date" name="date" type="date" min={today} required aria-invalid={!!err("date")} aria-describedby="date-error" />
        <FieldError id="date-error" message={err("date")} />
      </div>

      <div>
        <Label htmlFor="time">{t("form.time")}</Label>
        <Input id="time" name="time" type="time" step={900} required aria-invalid={!!err("time")} aria-describedby="time-error" />
        <FieldError id="time-error" message={err("time")} />
      </div>

      <div>
        <Label htmlFor="guests">{t("form.guests")}</Label>
        <Select id="guests" name="guests" defaultValue="2" aria-invalid={!!err("guests")} aria-describedby="guests-error">
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Select>
        <FieldError id="guests-error" message={err("guests")} />
      </div>

      <div className="sm:col-span-2">
        <Label htmlFor="message" hint={tc("optional")}>{t("form.message")}</Label>
        <Textarea id="message" name="message" placeholder={t("form.messagePlaceholder")} aria-invalid={!!err("message")} aria-describedby="message-error" />
        <FieldError id="message-error" message={err("message")} />
      </div>

      {state.formError ? (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800 sm:col-span-2">
          {t(`form.${state.formError}` as never)}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? tc("loading") : t("form.submit")}
        </Button>
      </div>
    </form>
  );
}
