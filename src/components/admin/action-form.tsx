"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { AlertCircle, Check, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import type { AdminState } from "@/actions/admin/helpers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Action = (state: AdminState, formData: FormData) => Promise<AdminState>;

const initial: AdminState = {};

function Feedback({ state }: { state: AdminState }) {
  if (state.error) {
    return (
      <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        {state.error}
      </p>
    );
  }
  if (state.ok && state.message) {
    return (
      <p role="status" className="flex items-start gap-2 rounded-lg bg-sage-100 px-3 py-2 text-sm text-forest-900">
        <Check className="mt-0.5 h-4 w-4 shrink-0" />
        {state.message}
      </p>
    );
  }
  return null;
}

/** Formular mit Rückmeldung. Der Knopf zeigt, dass gerade gespeichert wird. */
export function ActionForm({
  action,
  children,
  submitLabel = "Speichern",
  pendingLabel = "Speichern …",
  className,
  hidden,
  resetOnSuccess = false,
  footer,
}: {
  action: Action;
  children: ReactNode;
  submitLabel?: string;
  pendingLabel?: string;
  className?: string;
  hidden?: Record<string, string>;
  resetOnSuccess?: boolean;
  footer?: ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, initial);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resetOnSuccess && state.ok) ref.current?.reset();
  }, [resetOnSuccess, state]);

  return (
    <form ref={ref} action={formAction} className={cn("grid gap-4", className)}>
      {hidden
        ? Object.entries(hidden).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)
        : null}
      {children}
      <Feedback state={state} />
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? pendingLabel : submitLabel}
        </Button>
        {footer}
      </div>
    </form>
  );
}

/** Löschen mit Rückfrage direkt im Knopf – kein Dialogfenster. */
export function ConfirmDeleteButton({
  action,
  hidden,
  label = "Löschen",
  question = "Wirklich löschen?",
}: {
  action: Action;
  hidden: Record<string, string>;
  label?: string;
  question?: string;
}) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [armed, setArmed] = useState(false);

  return (
    <form action={formAction} className="inline-flex items-center gap-2">
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      {armed ? (
        <>
          <button
            type="submit"
            disabled={pending}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-red-700 px-4 text-xs font-medium text-white hover:bg-red-800 disabled:opacity-60"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {pending ? "Wird gelöscht …" : question}
          </button>
          <button
            type="button"
            onClick={() => setArmed(false)}
            className="text-xs text-muted underline underline-offset-4 hover:text-forest-800"
          >
            Abbrechen
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => setArmed(true)}
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-red-200 px-4 text-xs font-medium text-red-800 hover:border-red-400 hover:bg-red-50"
        >
          <Trash2 className="h-3.5 w-3.5" />
          {label}
        </button>
      )}
      {state.error ? <span className="text-xs text-red-800">{state.error}</span> : null}
    </form>
  );
}

/** Reihenfolge ändern: ein Schritt nach oben oder unten. */
export function MoveButtons({
  action,
  hidden,
  disableUp,
  disableDown,
}: {
  action: Action;
  hidden: Record<string, string>;
  disableUp?: boolean;
  disableDown?: boolean;
}) {
  const [, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="inline-flex items-center gap-1">
      {Object.entries(hidden).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <button
        type="submit"
        name="direction"
        value="up"
        disabled={pending || disableUp}
        aria-label="Nach oben"
        title="Nach oben"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-forest-800 hover:bg-cream-100 disabled:opacity-30"
      >
        <ChevronUp className="h-4 w-4" />
      </button>
      <button
        type="submit"
        name="direction"
        value="down"
        disabled={pending || disableDown}
        aria-label="Nach unten"
        title="Nach unten"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-forest-800 hover:bg-cream-100 disabled:opacity-30"
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </form>
  );
}
