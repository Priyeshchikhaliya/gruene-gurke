import type { Metadata } from "next";
import { deleteOpeningSeason, moveOpeningSeason, saveOpeningSeason } from "@/actions/admin/hours";
import { ActionForm, ConfirmDeleteButton, MoveButtons } from "@/components/admin/action-form";
import { AdminHeading, Card, EmptyHint, Row } from "@/components/admin/ui";
import { Input, Label, Select } from "@/components/ui/field";
import { adminSeasons } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Öffnungszeiten" };

const months = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

type Fields = {
  idPrefix: string;
  label?: string;
  period?: string;
  startMonth?: number;
  endMonth?: number;
  restaurantOpens?: string;
  restaurantCloses?: string;
  takeawayOpens?: string;
  takeawayCloses?: string;
  kitchenUntil?: string;
};

/** Ein Satz Felder, für vorhandene Zeiträume wie für einen neuen. */
function SeasonFields({
  idPrefix,
  label = "",
  period = "",
  startMonth = 1,
  endMonth = 12,
  restaurantOpens = "11:00",
  restaurantCloses = "22:00",
  takeawayOpens = "11:00",
  takeawayCloses = "22:00",
  kitchenUntil = "21:30",
}: Fields) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`label-${idPrefix}`}>Bezeichnung</Label>
          <Input id={`label-${idPrefix}`} name="label" defaultValue={label} placeholder="Sommer" required />
        </div>
        <div>
          <Label htmlFor={`period-${idPrefix}`}>Zeitraum, wie er auf der Website steht</Label>
          <Input
            id={`period-${idPrefix}`}
            name="period"
            defaultValue={period}
            placeholder="1. Mai – 31. Oktober"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={`start-${idPrefix}`}>Gilt von Monat</Label>
          <Select id={`start-${idPrefix}`} name="start_month" defaultValue={String(startMonth)}>
            {months.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor={`end-${idPrefix}`}>bis Monat</Label>
          <Select id={`end-${idPrefix}`} name="end_month" defaultValue={String(endMonth)}>
            {months.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <p className="-mt-1 text-xs text-muted">
        Diese beiden Monate entscheiden, welcher Zeitraum auf der Website als „aktuell“ hervorgehoben wird.
      </p>

      <fieldset className="grid gap-4 rounded-xl bg-cream-100 p-4 sm:grid-cols-2">
        <legend className="px-1 text-xs font-medium uppercase tracking-[0.2em] text-forest-700">Restaurant</legend>
        <div>
          <Label htmlFor={`ro-${idPrefix}`}>Von</Label>
          <Input id={`ro-${idPrefix}`} name="restaurant_opens" defaultValue={restaurantOpens} required />
        </div>
        <div>
          <Label htmlFor={`rc-${idPrefix}`}>Bis</Label>
          <Input id={`rc-${idPrefix}`} name="restaurant_closes" defaultValue={restaurantCloses} required />
        </div>
      </fieldset>

      <fieldset className="grid gap-4 rounded-xl bg-cream-100 p-4 sm:grid-cols-2">
        <legend className="px-1 text-xs font-medium uppercase tracking-[0.2em] text-forest-700">Abholservice</legend>
        <div>
          <Label htmlFor={`to-${idPrefix}`}>Von</Label>
          <Input id={`to-${idPrefix}`} name="takeaway_opens" defaultValue={takeawayOpens} required />
        </div>
        <div>
          <Label htmlFor={`tc-${idPrefix}`}>Bis</Label>
          <Input id={`tc-${idPrefix}`} name="takeaway_closes" defaultValue={takeawayCloses} required />
        </div>
      </fieldset>

      <div className="sm:max-w-xs">
        <Label htmlFor={`ku-${idPrefix}`}>Küche / Bestellannahme bis</Label>
        <Input id={`ku-${idPrefix}`} name="kitchen_until" defaultValue={kitchenUntil} required />
      </div>
    </>
  );
}

export default async function OpeningHoursPage() {
  const seasons = await adminSeasons();

  return (
    <>
      <AdminHeading
        title="Öffnungszeiten"
        description="Diese Zeiten stehen auf der Startseite, auf der Kontaktseite und im Fuß jeder Seite. Uhrzeiten bitte im Format 11:00 eingeben."
      />

      <Card title="Zeiträume" className="mb-6">
        {seasons.length === 0 ? (
          <EmptyHint>Noch kein Zeitraum angelegt.</EmptyHint>
        ) : (
          <div className="grid gap-4">
            {seasons.map((season, index) => (
              <Row key={season.id}>
                <ActionForm action={saveOpeningSeason} hidden={{ id: season.id }} submitLabel="Zeiten speichern">
                  <SeasonFields
                    idPrefix={season.id}
                    label={season.label}
                    period={season.period}
                    startMonth={season.start_month}
                    endMonth={season.end_month}
                    restaurantOpens={season.restaurant_opens}
                    restaurantCloses={season.restaurant_closes}
                    takeawayOpens={season.takeaway_opens}
                    takeawayCloses={season.takeaway_closes}
                    kitchenUntil={season.kitchen_until}
                  />
                </ActionForm>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                  <MoveButtons
                    action={moveOpeningSeason}
                    hidden={{ id: season.id }}
                    disableUp={index === 0}
                    disableDown={index === seasons.length - 1}
                  />
                  <ConfirmDeleteButton
                    action={deleteOpeningSeason}
                    hidden={{ id: season.id }}
                    question="Zeitraum wirklich löschen?"
                  />
                </div>
              </Row>
            ))}
          </div>
        )}
      </Card>

      <Card
        title="Neuen Zeitraum hinzufügen"
        description="Zum Beispiel für eine Sommerpause oder geänderte Zeiten in der Weihnachtszeit."
      >
        <ActionForm action={saveOpeningSeason} submitLabel="Zeitraum hinzufügen" resetOnSuccess>
          <SeasonFields idPrefix="neu" />
        </ActionForm>
      </Card>
    </>
  );
}
