export type GalleryCategory = "restaurant" | "catering";

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  category: GalleryCategory;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  // Restaurant & Sommerterrasse
  { src: "/images/restaurant/terrace.jpg", width: 1200, height: 900, category: "restaurant",
    alt: "Sonnige Sommerterrasse mit Sonnenschirmen und grünen Stühlen" },
  { src: "/images/restaurant/room-25.jpg", width: 1200, height: 698, category: "restaurant",
    alt: "Terrasse mit Blumenkübeln und Sonnenschirmen" },
  { src: "/images/restaurant/exterior.jpg", width: 600, height: 360, category: "restaurant",
    alt: "Eingang der Gaststätte Grüne Gurke mit grünen Fensterläden" },
  { src: "/images/restaurant/room-2.jpg", width: 1200, height: 900, category: "restaurant",
    alt: "Holzvertäfelte Gaststube mit festlich eingedeckten Tischen" },
  { src: "/images/restaurant/room-42.jpg", width: 1200, height: 900, category: "restaurant",
    alt: "Gastraum mit Laternen, Vitrinenschrank und weißen Tischdecken" },
  { src: "/images/restaurant/room-16.jpg", width: 1200, height: 900, category: "restaurant",
    alt: "Eingedeckte Tische mit orangefarbenen Servietten" },
  { src: "/images/restaurant/room-36.jpg", width: 1200, height: 900, category: "restaurant",
    alt: "Lange Festtafel mit Rosen und gefalteten Servietten" },
  { src: "/images/restaurant/room-31.jpg", width: 1200, height: 900, category: "restaurant",
    alt: "Festtafel mit grünen Kerzen und roten Stühlen" },
  { src: "/images/restaurant/room-13.jpg", width: 1200, height: 900, category: "restaurant",
    alt: "Festlich gedeckter Tisch mit hellgrünen Servietten am Fenster" },
  { src: "/images/restaurant/room-34.jpg", width: 1200, height: 900, category: "restaurant",
    alt: "Tisch mit roter Rose und rot-weißen Servietten" },

  // Feiern & Catering
  { src: "/images/catering/catering-28.jpg", width: 1200, height: 900, category: "catering",
    alt: "Kaltes Buffet mit Platten, Räucherlachs und Käse" },
  { src: "/images/catering/catering-1.jpg", width: 1200, height: 900, category: "catering",
    alt: "Platte mit Schinkenröllchen, gefüllten Eiern und Kaviar" },
  { src: "/images/catering/catering-20.jpg", width: 1200, height: 900, category: "catering",
    alt: "Canapés und Spieße auf dem Partybuffet" },
  { src: "/images/catering/catering-22.jpg", width: 1200, height: 900, category: "catering",
    alt: "Reich dekoriertes Buffet mit Fisch- und Fleischplatten" },
  { src: "/images/catering/catering-13.jpg", width: 1200, height: 900, category: "catering",
    alt: "Buffet mit Aufschnitt, Salaten und Garnituren" },
  { src: "/images/catering/catering-17.jpg", width: 1200, height: 900, category: "catering",
    alt: "Dessertgläser mit Götterspeise und Mousse" },
  { src: "/images/catering/catering-24.jpg", width: 1200, height: 900, category: "catering",
    alt: "Dessertplatte mit Terrinen, Kuchen und Götterspeise" },
  { src: "/images/catering/catering-25.jpg", width: 1200, height: 900, category: "catering",
    alt: "Buffettisch mit Holzbrettern voller Häppchen" },
  { src: "/images/catering/catering-12.jpg", width: 1200, height: 900, category: "catering",
    alt: "Festbuffet mit vielen Platten im Saal" },
  { src: "/images/catering/catering-21.jpg", width: 1200, height: 900, category: "catering",
    alt: "Gemüseplatte mit Spargel, Blumenkohl und Rotkohl" },
  { src: "/images/catering/catering-32.jpg", width: 900, height: 1200, category: "catering",
    alt: "Erdbeerbowle in der Glasschale" },
  { src: "/images/catering/catering-30.jpg", width: 1200, height: 900, category: "catering",
    alt: "Rinderroulade mit Salzkartoffeln und Apfelrotkohl" },
];

export const galleryByCategory = (category: GalleryCategory) =>
  galleryImages.filter((img) => img.category === category);
