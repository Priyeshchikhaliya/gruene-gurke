import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import {
  deleteMenuItem,
  deleteMenuVariant,
  moveMenuItem,
  saveMenuItem,
  saveMenuVariant,
} from "@/actions/admin/menu";
import { ActionForm, ConfirmDeleteButton, MoveButtons } from "@/components/admin/action-form";
import { AdminHeading, Card, EmptyHint, Row } from "@/components/admin/ui";
import { Checkbox, Input, Label, Textarea } from "@/components/ui/field";
import { centsToInput } from "@/actions/admin/helpers";
import { adminMenuCategory } from "@/lib/data/admin";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await adminMenuCategory(slug);
  return { title: data?.category.title ?? "Kategorie" };
}

const tags = [
  { key: "veg", label: "Vegetarisch" },
  { key: "fish", label: "Fisch" },
  { key: "chef", label: "Empfehlung" },
] as const;

export default async function MenuCategoryPage({ params }: Params) {
  const { slug } = await params;
  const data = await adminMenuCategory(slug);
  if (!data) notFound();

  const { category, items } = data;

  return (
    <>
      <Link
        href="/admin/speisekarte"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-forest-800"
      >
        <ChevronLeft className="h-4 w-4" /> Alle Kategorien
      </Link>

      <AdminHeading
        title={category.title}
        description="Preise bitte wie gewohnt eingeben, zum Beispiel 18,90. Die Kürzel für Allergene stehen genau so auf der Website, zum Beispiel A.C.G."
      />

      <Card title={`${items.length} ${items.length === 1 ? "Gericht" : "Gerichte"}`} className="mb-6">
        {items.length === 0 ? (
          <EmptyHint>In dieser Kategorie gibt es noch keine Gerichte.</EmptyHint>
        ) : (
          <div className="grid gap-4">
            {items.map((item, index) => (
              <Row key={item.id}>
                <ActionForm action={saveMenuItem} hidden={{ id: item.id, category_id: category.id }} className="gap-3">
                  <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
                    <div>
                      <Label htmlFor={`name-${item.id}`}>Gericht</Label>
                      <Input id={`name-${item.id}`} name="name" defaultValue={item.name} required />
                    </div>
                    <div>
                      <Label htmlFor={`price-${item.id}`}>Preis in €</Label>
                      <Input id={`price-${item.id}`} name="price" defaultValue={centsToInput(item.price_cents)} inputMode="decimal" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`desc-${item.id}`} hint="optional">Beschreibung</Label>
                    <Textarea
                      id={`desc-${item.id}`}
                      name="description"
                      defaultValue={item.description ?? ""}
                      rows={2}
                      className="min-h-20"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr_9rem]">
                    <div>
                      <Label htmlFor={`allergens-${item.id}`} hint="optional">Allergene</Label>
                      <Input id={`allergens-${item.id}`} name="allergens" defaultValue={item.allergens ?? ""} placeholder="A.C.G" />
                    </div>
                    <div>
                      <Label htmlFor={`extra-label-${item.id}`} hint="optional">Aufpreis für</Label>
                      <Input
                        id={`extra-label-${item.id}`}
                        name="extra_label"
                        defaultValue={item.extra_label ?? ""}
                        placeholder="auf Wunsch mit Sahnemeerrettich"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`extra-price-${item.id}`} hint="optional">Aufpreis in €</Label>
                      <Input
                        id={`extra-price-${item.id}`}
                        name="extra_price"
                        defaultValue={item.extra_price_cents !== null ? centsToInput(item.extra_price_cents) : ""}
                        inputMode="decimal"
                      />
                    </div>
                  </div>

                  <fieldset className="flex flex-wrap gap-x-6 gap-y-2">
                    <legend className="mb-2 text-sm font-medium text-forest-900">Kennzeichnung</legend>
                    {tags.map((tag) => (
                      <Checkbox
                        key={tag.key}
                        id={`tag-${tag.key}-${item.id}`}
                        name={`tag:${tag.key}`}
                        defaultChecked={item.tags?.includes(tag.key)}
                      >
                        {tag.label}
                      </Checkbox>
                    ))}
                  </fieldset>

                  <Checkbox id={`available-${item.id}`} name="is_available" defaultChecked={item.is_available}>
                    Auf der Website zeigen
                  </Checkbox>
                </ActionForm>

                {item.variants.length > 0 ? (
                  <div className="mt-4 rounded-lg bg-cream-100 p-4">
                    <h4 className="mb-3 text-sm font-medium text-forest-900">Preisvarianten</h4>
                    <div className="grid gap-3">
                      {item.variants.map((variant) => (
                        <div key={variant.id} className="flex flex-col gap-3 sm:flex-row sm:items-end">
                          <div className="flex-1">
                            <ActionForm action={saveMenuVariant} hidden={{ id: variant.id }} className="gap-3">
                              <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
                                <div>
                                  <Label htmlFor={`vlabel-${variant.id}`}>Bezeichnung</Label>
                                  <Input id={`vlabel-${variant.id}`} name="label" defaultValue={variant.label} required />
                                </div>
                                <div>
                                  <Label htmlFor={`vprice-${variant.id}`}>Preis in €</Label>
                                  <Input
                                    id={`vprice-${variant.id}`}
                                    name="price"
                                    defaultValue={centsToInput(variant.price_cents)}
                                    inputMode="decimal"
                                    required
                                  />
                                </div>
                              </div>
                            </ActionForm>
                          </div>
                          <div className="pb-1">
                            <ConfirmDeleteButton
                              action={deleteMenuVariant}
                              hidden={{ id: variant.id }}
                              label="Variante löschen"
                              question="Variante wirklich löschen?"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-muted hover:text-forest-800">
                    Preisvariante hinzufügen
                  </summary>
                  <div className="mt-3 rounded-lg bg-cream-100 p-4">
                    <ActionForm action={saveMenuVariant} hidden={{ item_id: item.id }} submitLabel="Variante hinzufügen" resetOnSuccess>
                      <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
                        <div>
                          <Label htmlFor={`newv-label-${item.id}`}>Bezeichnung</Label>
                          <Input id={`newv-label-${item.id}`} name="label" placeholder="als Vorspeise" required />
                        </div>
                        <div>
                          <Label htmlFor={`newv-price-${item.id}`}>Preis in €</Label>
                          <Input id={`newv-price-${item.id}`} name="price" inputMode="decimal" required />
                        </div>
                      </div>
                    </ActionForm>
                  </div>
                </details>

                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
                  <MoveButtons
                    action={moveMenuItem}
                    hidden={{ id: item.id, category_id: category.id }}
                    disableUp={index === 0}
                    disableDown={index === items.length - 1}
                  />
                  <ConfirmDeleteButton
                    action={deleteMenuItem}
                    hidden={{ id: item.id }}
                    label="Gericht löschen"
                    question="Gericht wirklich löschen?"
                  />
                </div>
              </Row>
            ))}
          </div>
        )}
      </Card>

      <Card title="Neues Gericht hinzufügen">
        <ActionForm action={saveMenuItem} hidden={{ category_id: category.id }} submitLabel="Gericht hinzufügen" resetOnSuccess>
          <div className="grid gap-3 sm:grid-cols-[1fr_9rem]">
            <div>
              <Label htmlFor="new-item-name">Gericht</Label>
              <Input id="new-item-name" name="name" placeholder="Ukrainische Soljanka" required />
            </div>
            <div>
              <Label htmlFor="new-item-price">Preis in €</Label>
              <Input id="new-item-price" name="price" placeholder="5,60" inputMode="decimal" required />
            </div>
          </div>
          <div>
            <Label htmlFor="new-item-desc" hint="optional">Beschreibung</Label>
            <Textarea id="new-item-desc" name="description" rows={2} className="min-h-20" placeholder="mit Toast" />
          </div>
          <div>
            <Label htmlFor="new-item-allergens" hint="optional">Allergene</Label>
            <Input id="new-item-allergens" name="allergens" placeholder="A.C.G" />
          </div>
          <fieldset className="flex flex-wrap gap-x-6 gap-y-2">
            <legend className="mb-2 text-sm font-medium text-forest-900">Kennzeichnung</legend>
            {tags.map((tag) => (
              <Checkbox key={tag.key} id={`new-tag-${tag.key}`} name={`tag:${tag.key}`}>
                {tag.label}
              </Checkbox>
            ))}
          </fieldset>
          <Checkbox id="new-item-available" name="is_available" defaultChecked>
            Auf der Website zeigen
          </Checkbox>
        </ActionForm>
      </Card>
    </>
  );
}
