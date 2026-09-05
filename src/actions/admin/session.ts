"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error?: string };

const schema = z.object({
  email: z.email("Bitte eine gültige E-Mail-Adresse eingeben."),
  password: z.string().min(1, "Bitte das Passwort eingeben."),
  weiter: z.string().optional(),
});

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: z.flattenError(parsed.error).fieldErrors.email?.[0] ?? "Bitte alle Felder ausfüllen." };
  }

  const supabase = await createClient();
  if (!supabase) return { error: "Die Datenbank ist noch nicht eingerichtet." };

  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { error: "E-Mail-Adresse oder Passwort stimmt nicht." };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "Dieses Konto hat keine Berechtigung für die Verwaltung." };
  }

  const weiter = parsed.data.weiter;
  redirect(weiter && weiter.startsWith("/admin") ? weiter : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect("/admin/anmelden");
}
