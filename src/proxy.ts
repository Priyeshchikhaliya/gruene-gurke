import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Frischt die Supabase-Sitzung für den Verwaltungsbereich auf und schickt
 * nicht angemeldete Besucher zur Anmeldung. Die eigentliche Rechteprüfung
 * passiert zusätzlich serverseitig in `requireAdmin()`.
 */
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anonKey || url.includes("YOUR-PROJECT")) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  // Anmeldung und das Setzen des Passworts brauchen noch keine Sitzung.
  const isPublicAdminPage = path === "/admin/anmelden" || path === "/admin/passwort";

  if (!user && !isPublicAdminPage) {
    const target = request.nextUrl.clone();
    target.pathname = "/admin/anmelden";
    target.searchParams.set("weiter", path);
    return NextResponse.redirect(target);
  }

  if (user && path === "/admin/anmelden") {
    const target = request.nextUrl.clone();
    target.pathname = "/admin";
    target.search = "";
    return NextResponse.redirect(target);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
