import "server-only";

import { Resend } from "resend";
import { resendConfig } from "@/lib/env";
import { siteConfig } from "@/lib/site";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function rows(entries: Array<[string, string]>) {
  return entries
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6b6a62;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
}

function shell(title: string, body: string) {
  return `<!doctype html><html lang="de"><body style="margin:0;background:#fbf9f4;font-family:ui-sans-serif,system-ui,sans-serif;color:#1a1a17">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <p style="margin:0 0 24px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#174237">${escapeHtml(siteConfig.name)}</p>
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:600">${escapeHtml(title)}</h1>
    ${body}
    <p style="margin:32px 0 0;font-size:12px;color:#8b8a82">${escapeHtml(siteConfig.address.street)}, ${escapeHtml(siteConfig.address.postalCode)} ${escapeHtml(siteConfig.address.city)} · ${escapeHtml(siteConfig.phone.display)}</p>
  </div></body></html>`;
}

export type ReservationEmailInput = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  message?: string;
};

/** Benachrichtigt das Restaurant und bestätigt dem Gast den Eingang. */
export async function sendReservationEmails(input: ReservationEmailInput) {
  const config = resendConfig();
  if (!config) {
    console.warn("[e-mail] Resend ist nicht eingerichtet, es wurde nichts versendet.");
    return;
  }
  const resend = new Resend(config.apiKey);
  const details = rows([
    ["Name", input.name],
    ["E-Mail", input.email],
    ["Telefon", input.phone],
    ["Datum", input.date],
    ["Uhrzeit", input.time],
    ["Personen", String(input.guests)],
    ...(input.message ? [["Anmerkungen", input.message] as [string, string]] : []),
  ]);

  await resend.batch.send([
    {
      from: config.from,
      to: config.inbox,
      replyTo: input.email,
      subject: `Reservierung: ${input.name} · ${input.date} ${input.time} · ${input.guests} P.`,
      html: shell("Neue Reservierungsanfrage", `<table style="border-collapse:collapse">${details}</table>`),
    },
    {
      from: config.from,
      to: input.email,
      subject: `Ihre Reservierungsanfrage bei ${siteConfig.name}`,
      html: shell(
        "Wir haben Ihre Anfrage erhalten",
        `<p style="margin:0 0 16px;line-height:1.6">Vielen Dank! Wir prüfen die Verfügbarkeit und bestätigen Ihre Reservierung in Kürze per E-Mail.</p><table style="border-collapse:collapse">${details}</table>`,
      ),
    },
  ]);
}

export type ContactEmailInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function sendContactEmail(input: ContactEmailInput) {
  const config = resendConfig();
  if (!config) {
    console.warn("[e-mail] Resend ist nicht eingerichtet, es wurde nichts versendet.");
    return;
  }
  const resend = new Resend(config.apiKey);
  await resend.emails.send({
    from: config.from,
    to: config.inbox,
    replyTo: input.email,
    subject: `Kontaktanfrage: ${input.name}`,
    html: shell(
      "Neue Nachricht über das Kontaktformular",
      `<table style="border-collapse:collapse">${rows([
        ["Name", input.name],
        ["E-Mail", input.email],
        ...(input.phone ? [["Telefon", input.phone] as [string, string]] : []),
      ])}</table><p style="white-space:pre-wrap;line-height:1.6;margin:16px 0 0">${escapeHtml(input.message)}</p>`,
    ),
  });
}
