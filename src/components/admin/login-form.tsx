"use client";

import { useActionState } from "react";
import { signIn, type LoginState } from "@/actions/admin/session";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";

const initial: LoginState = {};

export function LoginForm({ weiter }: { weiter?: string }) {
  const [state, action, pending] = useActionState(signIn, initial);

  return (
    <form action={action} className="grid gap-5">
      {weiter ? <input type="hidden" name="weiter" value={weiter} /> : null}

      <div>
        <Label htmlFor="email">E-Mail-Adresse</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required autoFocus />
      </div>

      <div>
        <Label htmlFor="password">Passwort</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>

      {state.error ? (
        <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Anmelden …" : "Anmelden"}
      </Button>
    </form>
  );
}
