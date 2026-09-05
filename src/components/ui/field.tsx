import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-base text-foreground placeholder:text-ink-400 transition-colors focus:border-forest-700 focus:outline-none aria-[invalid=true]:border-red-600";

export function Label({
  htmlFor,
  children,
  hint,
  required,
}: {
  htmlFor: string;
  children: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-forest-900">
      {children}
      {required ? <span className="ml-0.5 text-red-700" aria-hidden="true">*</span> : null}
      {hint ? <span className="ml-1 font-normal text-ink-400">({hint})</span> : null}
    </label>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-700">
      {message}
    </p>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(control, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(control, "appearance-none bg-surface", className)} {...props} />;
}

export function Checkbox({
  id,
  name,
  children,
  invalid,
  describedBy,
  defaultChecked,
}: {
  id: string;
  name: string;
  children: ReactNode;
  invalid?: boolean;
  describedBy?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer gap-3 text-sm leading-relaxed text-ink-700">
      <input
        id={id}
        name={name}
        type="checkbox"
        value="on"
        defaultChecked={defaultChecked}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="mt-1 h-4 w-4 shrink-0 accent-forest-800"
      />
      <span>{children}</span>
    </label>
  );
}

/**
 * Falle gegen automatische Einsendungen. Menschen sehen das Feld nie.
 *
 * Wichtig: Das Feld ist per `hidden` wirklich ausgeblendet und heißt nicht
 * "website". Ein sichtbar platziertes Feld mit einem geläufigen Namen füllen
 * Browser aus dem gespeicherten Adressbuch aus - dann verschwinden echte
 * Nachrichten spurlos.
 */
export function Honeypot() {
  return (
    <div hidden aria-hidden="true">
      <label htmlFor="zusatzangabe">Bitte leer lassen</label>
      <input
        id="zusatzangabe"
        name="zusatzangabe"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
