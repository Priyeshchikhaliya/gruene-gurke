import type { Metadata } from "next";
import { deleteJobBenefit, deleteJobPosting, moveJobPosting, saveJobBenefit, saveJobPosting } from "@/actions/admin/jobs";
import { ActionForm, ConfirmDeleteButton, MoveButtons } from "@/components/admin/action-form";
import { AdminHeading, Card, EmptyHint, Row } from "@/components/admin/ui";
import { Checkbox, Input, Label } from "@/components/ui/field";
import { adminJobs } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Jobs" };

export default async function JobsAdminPage() {
  const { postings, benefits } = await adminJobs();

  return (
    <>
      <AdminHeading
        title="Jobs"
        description="Die offenen Stellen und die Liste „Wir bieten“ auf der Seite Jobs. Die Überschrift und die Bewerbungsadresse ändern Sie unter Texte."
      />

      <div className="grid gap-5">
        <Card title="Offene Stellen" description="Erscheinen auf der Jobseite und im Kasten auf der Startseite.">
          {postings.length === 0 ? (
            <EmptyHint>Noch keine Stelle angelegt.</EmptyHint>
          ) : (
            <div className="grid gap-4">
              {postings.map((posting, index) => (
                <Row key={posting.id}>
                  <ActionForm action={saveJobPosting} hidden={{ id: posting.id }}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor={`title-${posting.id}`}>Stelle</Label>
                        <Input id={`title-${posting.id}`} name="title" defaultValue={posting.title} required />
                      </div>
                      <div>
                        <Label htmlFor={`terms-${posting.id}`}>Zusatz</Label>
                        <Input
                          id={`terms-${posting.id}`}
                          name="terms"
                          defaultValue={posting.terms ?? ""}
                          placeholder="ab sofort in Vollzeit / Teilzeit"
                        />
                      </div>
                    </div>
                    <Checkbox id={`active-${posting.id}`} name="is_active" defaultChecked={posting.is_active}>
                      Auf der Website zeigen
                    </Checkbox>
                  </ActionForm>

                  <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                    <MoveButtons
                      action={moveJobPosting}
                      hidden={{ id: posting.id }}
                      disableUp={index === 0}
                      disableDown={index === postings.length - 1}
                    />
                    <ConfirmDeleteButton
                      action={deleteJobPosting}
                      hidden={{ id: posting.id }}
                      label="Stelle löschen"
                      question="Stelle wirklich löschen?"
                    />
                  </div>
                </Row>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-xl border border-dashed border-border p-4 sm:p-5">
            <h3 className="mb-4 font-medium text-forest-900">Neue Stelle hinzufügen</h3>
            <ActionForm action={saveJobPosting} submitLabel="Stelle hinzufügen" resetOnSuccess>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="new-title">Stelle</Label>
                  <Input id="new-title" name="title" placeholder="Koch (w/m/d)" required />
                </div>
                <div>
                  <Label htmlFor="new-terms">Zusatz</Label>
                  <Input id="new-terms" name="terms" placeholder="ab sofort in Vollzeit / Teilzeit" />
                </div>
              </div>
              <Checkbox id="new-active" name="is_active" defaultChecked>
                Auf der Website zeigen
              </Checkbox>
            </ActionForm>
          </div>
        </Card>

        <Card title="Wir bieten" description="Die Liste mit den Vorteilen auf der Jobseite.">
          {benefits.length === 0 ? (
            <EmptyHint>Noch kein Eintrag vorhanden.</EmptyHint>
          ) : (
            <div className="grid gap-3">
              {benefits.map((benefit) => (
                <Row key={benefit.id} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <ActionForm action={saveJobBenefit} hidden={{ id: benefit.id }} className="gap-3">
                      <div>
                        <Label htmlFor={`benefit-${benefit.id}`}>Text</Label>
                        <Input id={`benefit-${benefit.id}`} name="label" defaultValue={benefit.label} required />
                      </div>
                    </ActionForm>
                  </div>
                  <div className="pb-1">
                    <ConfirmDeleteButton
                      action={deleteJobBenefit}
                      hidden={{ id: benefit.id }}
                      label="Punkt löschen"
                      question="Punkt wirklich löschen?"
                    />
                  </div>
                </Row>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-xl border border-dashed border-border p-4 sm:p-5">
            <h3 className="mb-4 font-medium text-forest-900">Neuen Punkt hinzufügen</h3>
            <ActionForm action={saveJobBenefit} submitLabel="Punkt hinzufügen" resetOnSuccess>
              <div>
                <Label htmlFor="new-benefit">Text</Label>
                <Input id="new-benefit" name="label" placeholder="5-Tage-Woche" required />
              </div>
            </ActionForm>
          </div>
        </Card>
      </div>
    </>
  );
}
