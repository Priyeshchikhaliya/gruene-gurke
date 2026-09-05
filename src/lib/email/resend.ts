import "server-only";

import { Resend } from "resend";
import { serverEnv } from "@/lib/env";
import { siteConfig } from "@/lib/site";

let client: Resend | undefined;

function resend() {
  if (!client) client = new Resend(serverEnv().RESEND_API_KEY);
  return client;
}

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
        `<tr><td style="padding:6px 12px 6px 0;color:#6b6a62">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join("");
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#fbf9f4;font-family:ui-sans-serif,system-ui,sans-serif;color:#1a1a17">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px">
    <p style="margin:0 0 24px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:#1d3728">${escapeHtml(siteConfig.name)}</p>
    <h1 style="margin:0 0 16px;font-size:24px;font-weight:600">${escapeHtml(title)}</h1>
    ${body}
    <p style="margin:32px 0 0;font-size:12px;color:#8b8a82">${escapeHtml(siteConfig.address.street)}, ${escapeHtml(siteConfig.address.postalCode)} ${escapeHtml(siteConfig.address.city)} · ${escapeHtml(siteConfig.phone)}</p>
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
  locale: "de" | "en";
};

/** Notifies the restaurant and sends the guest an acknowledgement. */
export async function sendReservationEmails(input: ReservationEmailInput) {
  const env = serverEnv();
  const de = input.locale === "de";
  const details = rows([
    [de ? "Name" : "Name", input.name],
    [de ? "E-Mail" : "Email", input.email],
    [de ? "Telefon" : "Phone", input.phone],
    [de ? "Datum" : "Date", input.date],
    [de ? "Uhrzeit" : "Time", input.time],
    [de ? "Personen" : "Guests", String(input.guests)],
    ...(input.message ? [[de ? "Anmerkungen" : "Notes", input.message] as [string, string]] : []),
  ]);

  await resend().batch.send([
    {
      from: env.RESEND_FROM_EMAIL,
      to: env.RESTAURANT_INBOX_EMAIL,
      replyTo: input.email,
      subject: `Reservierung: ${input.name} · ${input.date} ${input.time} · ${input.guests} P.`,
      html: shell("Neue Reservierungsanfrage", `<table style="border-collapse:collapse">${details}</table>`),
    },
    {
      from: env.RESEND_FROM_EMAIL,
      to: input.email,
      subject: de
        ? `Ihre Reservierungsanfrage bei ${siteConfig.name}`
        : `Your reservation request at ${siteConfig.name}`,
      html: shell(
        de ? "Wir haben Ihre Anfrage erhalten" : "We have received your request",
        `<p style="margin:0 0 16px;line-height:1.6">${
          de
            ? "Vielen Dank! Wir prüfen die Verfügbarkeit und bestätigen Ihre Reservierung in Kürze per E-Mail."
            : "Thank you! We will check availability and confirm your reservation by email shortly."
        }</p><table style="border-collapse:collapse">${details}</table>`,
      ),
    },
  ]);
}

export type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
  locale: "de" | "en";
};

export async function sendContactEmail(input: ContactEmailInput) {
  const env = serverEnv();
  await resend().emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.RESTAURANT_INBOX_EMAIL,
    replyTo: input.email,
    subject: `Kontaktanfrage: ${input.name}`,
    html: shell(
      "Neue Nachricht über das Kontaktformular",
      `<table style="border-collapse:collapse">${rows([
        ["Name", input.name],
        ["E-Mail", input.email],
        ["Sprache", input.locale.toUpperCase()],
      ])}</table><p style="white-space:pre-wrap;line-height:1.6;margin:16px 0 0">${escapeHtml(input.message)}</p>`,
    ),
  });
}
