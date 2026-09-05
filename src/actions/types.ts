export type FormStatus = "idle" | "success" | "error";

export type FormState<Field extends string = string> = {
  status: FormStatus;
  /** Field → translation key under `<namespace>.errors.*` */
  fieldErrors?: Partial<Record<Field, string>>;
  /** Translation key under `<namespace>.form.*` */
  formError?: string;
};

export const idleState: FormState = { status: "idle" };
