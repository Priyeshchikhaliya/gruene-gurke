"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sendContactMessage, type ContactState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { FieldError, Honeypot, Input, Label, Textarea } from "@/components/ui/field";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const locale = useLocale();
  const [state, action, pending] = useActionState(sendContactMessage, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-sage-300 bg-sage-100 p-6 text-forest-900">
        {t("form.success")}
      </div>
    );
  }

  const err = (field: keyof NonNullable<ContactState["fieldErrors"]>) => {
    const key = state.fieldErrors?.[field];
    return key ? t(`errors.${key}` as never) : undefined;
  };

  return (
    <form action={action} noValidate className="relative grid gap-6">
      <input type="hidden" name="locale" value={locale} />
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("form.name")}</Label>
          <Input id="name" name="name" autoComplete="name" required aria-invalid={!!err("name")} aria-describedby="name-error" />
          <FieldError id="name-error" message={err("name")} />
        </div>
        <div>
          <Label htmlFor="email">{t("form.email")}</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!err("email")} aria-describedby="email-error" />
          <FieldError id="email-error" message={err("email")} />
        </div>
      </div>

      <div>
        <Label htmlFor="message">{t("form.message")}</Label>
        <Textarea id="message" name="message" required aria-invalid={!!err("message")} aria-describedby="message-error" />
        <FieldError id="message-error" message={err("message")} />
      </div>

      {state.formError ? (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {t(`form.${state.formError}` as never)}
        </p>
      ) : null}

      <div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? tc("loading") : t("form.submit")}
        </Button>
      </div>
    </form>
  );
}
