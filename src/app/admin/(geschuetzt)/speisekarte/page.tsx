import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { deleteMenuCategory, deleteMenuNote, moveMenuCategory, saveMenuCategory, saveMenuNote } from "@/actions/admin/menu";
import { ActionForm, ConfirmDeleteButton, MoveButtons } from "@/components/admin/action-form";
import { AdminHeading, Card, EmptyHint, Row } from "@/components/admin/ui";
import { Checkbox, Input, Label, Textarea } from "@/components/ui/field";
import { adminMenuCategories, adminMenuNotes } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Speisekarte" };

export default async function MenuAdminPage() {
  const [categories, notes] = await Promise.all([adminMenuCategories(), adminMenuNotes()]);

  return (
    <>
      <AdminHeading
        title="Speisekarte"
        description="Die Karte ist in Kategorien geteilt. Klicken Sie auf eine Kategorie, um die Gerichte darin zu bearbeiten."
      />

      <Card title="Kategorien" className="mb-6">
        {categories.length === 0 ? (
          <EmptyHint>Noch keine Kategorie angelegt.</EmptyHint>
        ) : (
          <div className="grid gap-4">
            {categories.map((category, index) => (
              <Row key={category.id}>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/admin/speisekarte/${category.slug}`}
                    className="inline-flex items-center gap-1.5 font-display text-xl text-forest-900 hover:text-forest-700"
                  >
                    {category.title}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                  <span className="text-sm text-muted">
                    {category.itemCount} {category.itemCount === 1 ? "Gericht" : "Gerichte"}
                    {category.is_active ? "" : " · ausgeblendet"}
                  </span>
                </div>

                <ActionForm action={saveMenuCategory} hidden={{ id: category.id }} className="gap-3">
                  <div>
                    <Label htmlFor={`title-${category.id}`}>Name der Kategorie</Label>
                    <Input id={`title-${category.id}`} name="title" defaultValue={category.title} required />
                  </div>
                  <div>
                    <Label htmlFor={`intro-${category.id}`} hint="optional">Untertitel</Label>
                    <Input id={`intro-${category.id}`} name="intro" defaultValue={category.intro ?? ""} />
                  </div>
                  <div>
                    <Label htmlFor={`note-${category.id}`} hint="optional">Hinweis über den Gerichten</Label>
                    <Textarea
                      id={`note-${category.id}`}
                      name="note"
                      defaultValue={category.note ?? ""}
                      rows={2}
                      className="min-h-20"
                    />
                  </div>
                  <Checkbox id={`active-${category.id}`} name="is_active" defaultChecked={category.is_active}>
                    Auf der Website zeigen
                  </Checkbox>
                </ActionForm>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                  <MoveButtons
                    action={moveMenuCategory}
                    hidden={{ id: category.id }}
                    disableUp={index === 0}
                    disableDown={index === categories.length - 1}
                  />
                  <ConfirmDeleteButton
                    action={deleteMenuCategory}
                    hidden={{ id: category.id }}
                    label="Kategorie löschen"
                    question="Kategorie und alle Gerichte löschen?"
                  />
                </div>
              </Row>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-dashed border-border p-4 sm:p-5">
          <h3 className="mb-4 font-medium text-forest-900">Neue Kategorie hinzufügen</h3>
          <ActionForm action={saveMenuCategory} submitLabel="Kategorie hinzufügen" resetOnSuccess>
            <div>
              <Label htmlFor="new-category">Name der Kategorie</Label>
              <Input id="new-category" name="title" placeholder="Suppen & Appetitmacher" required />
            </div>
            <Checkbox id="new-category-active" name="is_active" defaultChecked>
              Auf der Website zeigen
            </Checkbox>
          </ActionForm>
        </div>
      </Card>

      <Card title="Das sei noch angemerkt" description="Die Hinweise unter der Speisekarte.">
        {notes.length === 0 ? (
          <EmptyHint>Noch kein Hinweis vorhanden.</EmptyHint>
        ) : (
          <div className="grid gap-3">
            {notes.map((note) => (
              <Row key={note.id} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <ActionForm action={saveMenuNote} hidden={{ id: note.id }} className="gap-3">
                    <div>
                      <Label htmlFor={`note-text-${note.id}`}>Hinweis</Label>
                      <Textarea
                        id={`note-text-${note.id}`}
                        name="text"
                        defaultValue={note.text}
                        rows={2}
                        className="min-h-20"
                        required
                      />
                    </div>
                  </ActionForm>
                </div>
                <div className="pb-1">
                  <ConfirmDeleteButton
                    action={deleteMenuNote}
                    hidden={{ id: note.id }}
                    label="Hinweis löschen"
                    question="Hinweis wirklich löschen?"
                  />
                </div>
              </Row>
            ))}
          </div>
        )}

        <div className="mt-6 rounded-xl border border-dashed border-border p-4 sm:p-5">
          <h3 className="mb-4 font-medium text-forest-900">Neuen Hinweis hinzufügen</h3>
          <ActionForm action={saveMenuNote} submitLabel="Hinweis hinzufügen" resetOnSuccess>
            <div>
              <Label htmlFor="new-note">Hinweis</Label>
              <Textarea id="new-note" name="text" rows={2} className="min-h-20" required />
            </div>
          </ActionForm>
        </div>
      </Card>
    </>
  );
}
