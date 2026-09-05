export type FormStatus = "idle" | "success" | "error";

export type FormState<Field extends string = string> = {
  status: FormStatus;
  /** Feld → fertige deutsche Fehlermeldung */
  fieldErrors?: Partial<Record<Field, string>>;
  /** Formularweite Fehlermeldung */
  formError?: string;
  /**
   * Die abgeschickten Eingaben. React setzt ein Formular nach einer Action
   * zurück; damit nach einem Fehler nichts erneut getippt werden muss, geben
   * wir die Werte zurück und setzen sie wieder als Vorgabe ein.
   */
  values?: Partial<Record<Field, string>>;
};
