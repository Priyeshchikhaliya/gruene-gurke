"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";

type Status = "pruefen" | "bereit" | "kein-link";

export function PasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("pruefen");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  /**
   * Supabase hängt die Sitzung als Fragment an die Adresse
   * (#access_token=…&refresh_token=…). Der Cookie-Client liest das nicht von
   * selbst, deshalb übergeben wir die Angaben hier einmalig und räumen die
   * Adresszeile anschließend auf.
   */
  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    const start = async () => {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        window.history.replaceState(null, "", window.location.pathname);
        if (!cancelled) setStatus(sessionError ? "kein-link" : "bereit");
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!cancelled) setStatus(session ? "bereit" : "kein-link");
    };

    void start();
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const password = new FormData(event.currentTarget).get("password");
    if (typeof password !== "string" || password.length < 8) {
      setError("Bitte mindestens acht Zeichen verwenden.");
      return;
    }

    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setSaving(false);
      setError("Das hat nicht geklappt. Bitte einen neuen Link anfordern.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  if (status === "pruefen") {
    return <p className="text-sm text-muted">Einen Moment, der Link wird geprüft …</p>;
  }

  if (status === "kein-link") {
    return (
      <div className="text-sm leading-relaxed text-ink-700">
        <p className="font-medium text-forest-900">Dieser Link ist nicht mehr gültig.</p>
        <p className="mt-2">
          Der Link gilt nur einmal und läuft nach einer Stunde ab. Bitte einen neuen Link anfordern lassen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div>
        <Label htmlFor="password">Neues Passwort</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          autoFocus
        />
      </div>

      {error ? (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={saving} className="w-full">
        {saving ? "Wird gespeichert …" : "Passwort speichern"}
      </Button>
    </form>
  );
}
