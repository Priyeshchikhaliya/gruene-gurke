import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Locale detection + prefixing. Supabase session refresh for /admin will be
// composed in here once the admin area lands.
export default createIntlMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, Vercel internals and any file with an extension.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
