import type { Metadata } from "next";
import Image from "next/image";
import { deleteGalleryImage, moveGalleryImage, saveGalleryImage, uploadGalleryImage } from "@/actions/admin/gallery";
import { ActionForm, ConfirmDeleteButton, MoveButtons } from "@/components/admin/action-form";
import { AdminHeading, Card, EmptyHint } from "@/components/admin/ui";
import { Checkbox, Input, Label, Select } from "@/components/ui/field";
import { adminGallery } from "@/lib/data/admin";

export const metadata: Metadata = { title: "Galerie" };

const areas = [
  { value: "restaurant", label: "Restaurant & Sommerterasse" },
  { value: "catering", label: "Feiern & Catering" },
] as const;

export default async function GalleryAdminPage() {
  const images = await adminGallery();

  return (
    <>
      <AdminHeading
        title="Galerie"
        description="Die Bilder auf der Seite Galerie. Der Bereich entscheidet, unter welcher Überschrift ein Bild erscheint."
      />

      <Card
        title="Bild hochladen"
        description="JPG, PNG oder WebP, höchstens 10 MB. Am besten quer und mindestens 1200 Pixel breit."
        className="mb-6"
      >
        <ActionForm action={uploadGalleryImage} submitLabel="Bild hochladen" pendingLabel="Wird hochgeladen …" resetOnSuccess>
          <div>
            <Label htmlFor="file">Bilddatei</Label>
            <input
              id="file"
              name="file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              required
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-forest-800 file:px-4 file:py-2 file:text-sm file:text-cream-50"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="alt">Bildbeschreibung</Label>
              <Input id="alt" name="alt" placeholder="Festlich gedeckter Tisch" required />
              <p className="mt-2 text-xs text-muted">
                Kurz beschreiben, was zu sehen ist. Das lesen blinde Gäste vor und hilft bei Google.
              </p>
            </div>
            <div>
              <Label htmlFor="category">Bereich</Label>
              <Select id="category" name="category" defaultValue="restaurant">
                {areas.map((area) => (
                  <option key={area.value} value={area.value}>
                    {area.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </ActionForm>
      </Card>

      {areas.map((area) => {
        const list = images.filter((image) => image.category === area.value);
        return (
          <Card key={area.value} title={area.label} className="mb-6">
            {list.length === 0 ? (
              <EmptyHint>In diesem Bereich gibt es noch keine Bilder.</EmptyHint>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {list.map((image, index) => (
                  <li key={image.id} className="rounded-xl border border-border bg-cream-50 p-4">
                    <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-cream-200">
                      <Image src={image.url} alt={image.alt} fill sizes="(min-width: 640px) 40vw, 90vw" className="object-cover" />
                    </div>

                    <ActionForm action={saveGalleryImage} hidden={{ id: image.id }} className="gap-3">
                      <div>
                        <Label htmlFor={`alt-${image.id}`}>Bildbeschreibung</Label>
                        <Input id={`alt-${image.id}`} name="alt" defaultValue={image.alt} required />
                      </div>
                      <div>
                        <Label htmlFor={`cat-${image.id}`}>Bereich</Label>
                        <Select id={`cat-${image.id}`} name="category" defaultValue={image.category}>
                          {areas.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <Checkbox id={`active-${image.id}`} name="is_active" defaultChecked={image.is_active}>
                        Auf der Website zeigen
                      </Checkbox>
                    </ActionForm>

                    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                      <MoveButtons
                        action={moveGalleryImage}
                        hidden={{ id: image.id, category: image.category }}
                        disableUp={index === 0}
                        disableDown={index === list.length - 1}
                      />
                      <ConfirmDeleteButton action={deleteGalleryImage} hidden={{ id: image.id }} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        );
      })}
    </>
  );
}
