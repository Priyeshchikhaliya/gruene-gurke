"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type GridImage = { src: string; width: number; height: number; alt: string };

export function GalleryGrid({
  images,
  className,
}: {
  images: GridImage[];
  className?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul className={cn("columns-1 gap-4 min-[480px]:columns-2 md:columns-3 md:gap-5", className)}>
        {images.map((img, i) => (
          <li key={img.src} className="mb-4 break-inside-avoid md:mb-5">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${img.alt} – Bild vergrößern`}
              className="group relative block w-full overflow-hidden rounded-xl bg-cream-200 focus-visible:outline-2"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-0 bg-forest-950/0 transition-colors duration-500 group-hover:bg-forest-950/15" />
            </button>
          </li>
        ))}
      </ul>

      {current && index !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="lightbox fixed inset-0 z-100 flex items-center justify-center bg-forest-950/95 p-3 text-cream-50 sm:p-6"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Schließen"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-cream-50/10 transition-colors hover:bg-cream-50/20 sm:right-4 sm:top-4"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Vorheriges Bild"
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 transition-colors hover:bg-cream-50/20 md:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Nächstes Bild"
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream-50/10 transition-colors hover:bg-cream-50/20 md:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <figure
            key={current.src}
            className="lightbox-figure relative flex max-h-full w-full max-w-6xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[60vh] w-full sm:h-[72vh]">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            <figcaption className="mt-4 flex flex-col items-center gap-1 px-10 text-center text-sm text-cream-200/80 sm:flex-row sm:gap-4">
              <span>{current.alt}</span>
              <span className="tabular-nums text-cream-200/50">Bild {index + 1} von {images.length}</span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
