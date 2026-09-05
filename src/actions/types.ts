export type FormStatus = "idle" | "success" | "error";

export type FormState<Field extends string = string> = {
  status: FormStatus;
  /** Feld → fertige deutsche Fehlermeldung */
  fieldErrors?: Partial<Record<Field, string>>;
  /** Formularweite Fehlermeldung */
  formError?: string;
};

export const idleState: FormState = { status: "idle" };
