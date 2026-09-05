import type { Metadata } from "next";
import { saveSettings } from "@/actions/admin/texts";
import { ActionForm } from "@/components/admin/action-form";
import { AdminHeading, Card } from "@/components/admin/ui";
import { Input, Label, Textarea } from "@/components/ui/field";
import { adminSettings } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Texte" };

export default async function TextsPage() {
  const settings = await adminSettings();

  return (
    <>
      <AdminHeading
        title="Texte"
        description="Kurze Texte, die an mehreren Stellen der Website auftauchen. Unter jedem Feld steht, wo der Text erscheint."
      />

      <Card>
        <ActionForm action={saveSettings} submitLabel="Alle Texte speichern">
          <div className="grid gap-6">
            {settings.map((setting) => (
              <div key={setting.key}>
                <input type="hidden" name="keys" value={setting.key} />
                <Label htmlFor={`value-${setting.key}`}>{setting.label}</Label>
                {setting.multiline ? (
                  <Textarea
                    id={`value-${setting.key}`}
                    name={`value:${setting.key}`}
                    defaultValue={setting.value}
                    rows={3}
                    className="min-h-24"
                  />
                ) : (
                  <Input id={`value-${setting.key}`} name={`value:${setting.key}`} defaultValue={setting.value} />
                )}
                {setting.hint ? <p className="mt-2 text-xs text-muted">{setting.hint}</p> : null}
              </div>
            ))}
          </div>
        </ActionForm>
      </Card>
    </>
  );
}
