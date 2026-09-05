import { Fish, Leaf, Star } from "lucide-react";
import { allergenLegend, formatPrice, menuCategories, type MenuItem, type MenuTag } from "@/lib/menu";
import { cn } from "@/lib/utils";

const tagIcon: Record<MenuTag, typeof Leaf> = { veg: Leaf, fish: Fish, chef: Star };
const tagLabel: Record<MenuTag, string> = { veg: "Vegetarisch", fish: "Fisch", chef: "Empfehlung" };
const tagStyle: Record<MenuTag, string> = {
  veg: "bg-sage-100 text-forest-800",
  fish: "bg-sky-50 text-sky-800",
  chef: "bg-gold-400/25 text-gold-600",
};

function minPrice(item: MenuItem) {
  return item.variants ? Math.min(...item.variants.map((v) => v.price)) : item.price;
}

export function MenuSections() {
  return (
    <div className="container-site xl:grid xl:grid-cols-[15rem_1fr] xl:gap-16">
      {/* Kategorien: waagerechte Pillen auf kleinen Schirmen, feste Spalte ab xl */}
      <nav
        aria-label="Kategorien der Speisekarte"
        className="sticky top-24 z-30 -mx-5 mb-8 overflow-x-auto bg-cream-50/95 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:top-28 sm:px-8 lg:-mx-12 lg:px-12 xl:static xl:m-0 xl:overflow-visible xl:bg-transparent xl:p-0 xl:backdrop-blur-none"
      >
        <div className="xl:sticky xl:top-32">
          <p className="mb-3 hidden text-xs font-medium uppercase tracking-[0.2em] text-forest-700 xl:block">
            Kategorien
          </p>
          <ul className="flex gap-2 xl:flex-col xl:gap-0">
            {menuCategories.map((cat) => (
              <li key={cat.id} className="shrink-0">
                <a
                  href={`#${cat.id}`}
                  className="block whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm text-ink-700 transition-colors hover:border-forest-800 hover:text-forest-900 xl:whitespace-normal xl:rounded-none xl:border-0 xl:border-l-2 xl:border-l-transparent xl:bg-transparent xl:px-4 xl:py-1.5 xl:hover:border-l-forest-800"
                >
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="max-w-3xl space-y-12 sm:space-y-16">
        {menuCategories.map((cat) => (
          <section key={cat.id} id={cat.id} className="scroll-mt-44 sm:scroll-mt-48 xl:scroll-mt-32">
            <header className="border-b border-forest-800/20 pb-4">
              <h2 className="font-display text-2xl text-forest-900 sm:text-3xl md:text-4xl">{cat.title}</h2>
              {cat.intro ? <p className="mt-1 font-display text-lg italic text-ink-500">{cat.intro}</p> : null}
            </header>
            {cat.note ? (
              <p className="mt-4 rounded-lg bg-sage-100 px-4 py-3 text-sm leading-relaxed text-forest-900">{cat.note}</p>
            ) : null}
            <ul className="mt-2 divide-y divide-border/80">
              {cat.items.map((item) => (
                <li key={item.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-4 sm:gap-x-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="font-medium text-forest-900">{item.name}</h3>
                      {item.tags?.map((tag) => {
                        const Icon = tagIcon[tag];
                        return (
                          <span
                            key={tag}
                            className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium", tagStyle[tag])}
                          >
                            <Icon className="h-3 w-3" aria-hidden="true" />
                            {tagLabel[tag]}
                          </span>
                        );
                      })}
                      {item.allergens ? (
                        <span className="text-[11px] tracking-wide text-ink-400">{item.allergens}</span>
                      ) : null}
                    </div>
                  </div>

                  <p className="shrink-0 whitespace-nowrap font-display text-lg tabular-nums text-forest-900 sm:text-xl">
                    {item.variants ? <span className="mr-1 font-sans text-xs text-ink-400">ab</span> : null}
                    {formatPrice(minPrice(item))}
                  </p>

                  {item.desc || item.variants || item.extra ? (
                    <div className="col-span-2 mt-1">
                      {item.desc ? <p className="text-sm leading-relaxed text-muted">{item.desc}</p> : null}
                      {item.variants ? (
                        <ul className="mt-2 space-y-1 text-sm">
                          {item.variants.map((v) => (
                            <li key={v.label} className="flex items-baseline justify-between gap-4">
                              <span className="text-ink-700">{v.label}</span>
                              <span className="shrink-0 tabular-nums text-forest-900">{formatPrice(v.price)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {item.extra ? (
                        <p className="mt-1 text-sm text-ink-500">
                          {item.extra.label} <span className="tabular-nums">+ {formatPrice(item.extra.price)}</span>
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6 md:p-8">
          <h2 className="font-display text-2xl text-forest-900">Zusatzstoffe & Allergene</h2>
          <p className="mt-2 text-sm text-muted">
            Die Kürzel hinter den Gerichten stehen für folgende Zusatzstoffe und Allergene:
          </p>
          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2 text-sm min-[420px]:grid-cols-2 sm:grid-cols-3">
            {allergenLegend.map((a) => (
              <div key={a.code} className="flex gap-2">
                <dt className="w-6 shrink-0 font-medium text-forest-900">{a.code}</dt>
                <dd className="text-ink-700">{a.label}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
