import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  // `locale` is set when a caller passes it explicitly (e.g. from a Server
  // Action). Otherwise read it from the `[locale]` root segment.
  if (!locale) {
    const value = await rootParams.locale();
    if (hasLocale(routing.locales, value)) {
      locale = value;
    } else {
      notFound();
    }
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
