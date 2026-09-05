import type { Metadata } from "next";
import { saveOpeningSeason } from "@/actions/admin/hours";
import { ActionForm } from "@/components/admin/action-form";
import { AdminHeading, Card } from "@/components/admin/ui";
import { Input, Label } from "@/components/ui/field";
import { adminSeasons } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Öffnungszeiten" };

export default async function OpeningHoursPage() {
  const seasons = await adminSeasons();

  return (
    <>
      <AdminHeading
        title="Öffnungszeiten"
        description="Diese Zeiten stehen auf der Startseite, auf der Kontaktseite und im Fuß jeder Seite. Die Saison, in der wir uns gerade befinden, wird auf der Website automatisch hervorgehoben."
      />

      <div className="grid gap-5">
        {seasons.map((season) => (
          <Card
            key={season.id}
            title={season.label}
            description="Uhrzeiten bitte im Format 11:00 eingeben."
          >
            <ActionForm action={saveOpeningSeason} hidden={{ id: season.id }} submitLabel="Zeiten speichern">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`label-${season.id}`}>Bezeichnung</Label>
                  <Input id={`label-${season.id}`} name="label" defaultValue={season.label} required />
                </div>
                <div>
                  <Label htmlFor={`period-${season.id}`}>Zeitraum</Label>
                  <Input
                    id={`period-${season.id}`}
                    name="period"
                    defaultValue={season.period}
                    placeholder="1. Mai – 31. Oktober"
                    required
                  />
                </div>
              </div>

              <fieldset className="grid gap-4 rounded-xl bg-cream-100 p-4 sm:grid-cols-2">
                <legend className="px-1 text-xs font-medium uppercase tracking-[0.2em] text-forest-700">
                  Restaurant
                </legend>
                <div>
                  <Label htmlFor={`ro-${season.id}`}>Von</Label>
                  <Input id={`ro-${season.id}`} name="restaurant_opens" defaultValue={season.restaurant_opens} required />
                </div>
                <div>
                  <Label htmlFor={`rc-${season.id}`}>Bis</Label>
                  <Input id={`rc-${season.id}`} name="restaurant_closes" defaultValue={season.restaurant_closes} required />
                </div>
              </fieldset>

              <fieldset className="grid gap-4 rounded-xl bg-cream-100 p-4 sm:grid-cols-2">
                <legend className="px-1 text-xs font-medium uppercase tracking-[0.2em] text-forest-700">
                  Abholservice
                </legend>
                <div>
                  <Label htmlFor={`to-${season.id}`}>Von</Label>
                  <Input id={`to-${season.id}`} name="takeaway_opens" defaultValue={season.takeaway_opens} required />
                </div>
                <div>
                  <Label htmlFor={`tc-${season.id}`}>Bis</Label>
                  <Input id={`tc-${season.id}`} name="takeaway_closes" defaultValue={season.takeaway_closes} required />
                </div>
              </fieldset>

              <div className="sm:max-w-xs">
                <Label htmlFor={`ku-${season.id}`}>Küche / Bestellannahme bis</Label>
                <Input id={`ku-${season.id}`} name="kitchen_until" defaultValue={season.kitchen_until} required />
              </div>
            </ActionForm>
          </Card>
        ))}
      </div>
    </>
  );
}
