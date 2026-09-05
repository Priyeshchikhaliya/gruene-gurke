/**
 * Menü, transkribiert aus "Speisekarte aktuell März 2025" (public/speisekarte.pdf).
 * Preise in Cent, inkl. 19 % MwSt. Allergenkürzel wie gedruckt (Legende unten).
 * Will move to Supabase once the admin area lands.
 */
export type MenuTag = "veg" | "fish" | "chef";

export type MenuItem = {
  name: string;
  desc?: string;
  price: number;
  allergens?: string;
  tags?: MenuTag[];
  /** Alternative price points, e.g. starter vs. main. */
  variants?: { label: string; price: number }[];
  /** Optional add-on. */
  extra?: { label: string; price: number };
};

export type MenuCategory = {
  id: string;
  title: string;
  intro?: string;
  note?: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "suppen",
    title: "Suppen & Appetitmacher",
    items: [
      { name: "Ukrainische Soljanka", desc: "mit Toast", price: 560, allergens: "A.G.J.I.1.2.3.4.8" },
      { name: "Harzer Schiebensuppe", desc: "Zwiebelsuppe mit reichlich Fleischklößchen und Graubrot", price: 560, allergens: "A.C.G.J" },
      { name: "Deftige Brühe", desc: "mit einer Einlage aus Eierstich, edlem Gemüse und Fleischklößchen", price: 560, allergens: "A.C.J.I" },
      { name: "Tomatencremesuppe", desc: "mit Sahnehäubchen", price: 590, allergens: "A.G.J", tags: ["veg"] },
      { name: "Vorsuppe als Sattmacher", desc: "Jede Vorsuppe auch in großer Portion", price: 890 },
      { name: "Hausgemachter Erbseneintopf", desc: "mit Bockwurst", price: 990, allergens: "A.C.G.F.I.J.L.5" },
      { name: "Deftige Nudelsuppe", desc: "mit Geflügelfleisch, Gemüse und Fleischklößchen", price: 990, allergens: "A.C.J.I" },
      { name: "Überbackenes Würzfleisch", desc: "mit Sauce Hollandaise überbacken, dazu Toast und Zitrone", price: 680, allergens: "A.C.G.I.J.D" },
      { name: "Karlsbader Schnitte", desc: "2 Toast mit Schinken und Käse überbacken, Semmelbrösel und Garnitur", price: 880, allergens: "A.C.G.2.3.4" },
      { name: "Gebackener Camembert", desc: "mit Preiselbeeren, Toast und Garnitur", price: 890, allergens: "A.D.G",
        variants: [{ label: "als kleines Hauptgericht", price: 890 }, { label: "als Vorspeise", price: 680 }] },
    ],
  },
  {
    id: "snacks",
    title: "Snacks, Kaltes & belegte Brote",
    items: [
      { name: "Belegtes Brot", desc: "lecker garniert, wahlweise mit Salami, gekochtem Schinken oder kaltem Braten", price: 790, allergens: "A.G.1.2.3.4.I.J" },
      { name: "Chicke Platte", desc: "bunt arrangiert – lauter Leckereien mit Butter und Brot", price: 1450, allergens: "G.A.C.I.J.1.2.3.4" },
      { name: "Strammer Max", desc: "mit Schinkenspeck, Spiegeleiern und Garnitur", price: 940, allergens: "C.A.G.1" },
      { name: "Salamibrot mit Spiegeleiern", desc: "mit Ketchup und Garnitur", price: 940, allergens: "G.C.A.J.1.3" },
      { name: "Zigeunerbrot", desc: "mit Garnitur", price: 1090, allergens: "G.A.C.I.J" },
      { name: "Schlemmer Toast", desc: "kleines Steak mit Cremechampignons und Sauce Hollandaise", price: 1090, allergens: "A.C.G.F.J" },
      { name: "Marinierter Hering", desc: "nach Hausfrauenart mit Salzkartoffeln und Garnitur", price: 1490, allergens: "A.G.I.J", tags: ["fish"] },
      { name: "Geräucherte Forellenfilets", desc: "mit Sahnemeerrettich, Butter, Toast und Garnitur", price: 1290, allergens: "A.G", tags: ["fish"] },
      { name: "Hausgemachte Sülze", desc: "mit Remouladensoße, Bratkartoffeln und Rohkostsalat", price: 1550, allergens: "A.C.D.G.J.I.1.2.3.11" },
    ],
  },
  {
    id: "eier",
    title: "Eiergerichte",
    note: "Zu den Rühr- und Spiegeleiern gibt es Garnitur und wahlweise Butterbrot, Bratkartoffeln oder Kartoffelsalat.",
    items: [
      { name: "Drei Rühreier mit knusprigem Speck", price: 999, allergens: "A.C.2.4" },
      { name: "Drei Rühreier mit Forellenfilet", desc: "mit geräuchertem Forellenfilet und Sahnemeerrettich", price: 1590, allergens: "A.C.G", tags: ["fish"] },
      { name: "Drei Rühreier mit Tomaten", desc: "mit Tomaten und reichlich Schnittlauch", price: 1150, allergens: "A.C", tags: ["veg"] },
      { name: "Drei Spiegeleier mit knusprigem Speck", price: 1050, allergens: "A.C.2.4" },
      { name: "Bauernfrühstück", desc: "mit Gürkchen und marinierten Salaten", price: 1450, allergens: "A.C" },
      { name: "Gekochte halbe Eier", desc: "auf Remouladensoße mit Kochschinkenstreifen, Bratkartoffeln und gemischtem Salat", price: 1450, allergens: "A.J.G.I.C.2.3.4.11" },
    ],
  },
  {
    id: "nudeln",
    title: "Nudeln",
    items: [
      { name: "Hausmacher Nudeln", desc: "mit Rindergulasch und gemischtem Salatteller", price: 1890, allergens: "A.G.C.I.J.F.11" },
      { name: "Spaghetti mit Schinkenwürfeln", desc: "mit Tomatensoße und gemischtem Salatteller", price: 1550, allergens: "A.G.C.J.11" },
      { name: "Spaghetti Bolognese", desc: "mit würziger Fleischsoße, Parmesan und gemischtem Salatteller", price: 1550, allergens: "A.G.C.11" },
      { name: "Spaghetti Carbonara", desc: "mit Sahnesoße, Ei, Schinken und gemischtem Salatteller", price: 1550, allergens: "A.G.C.2.3.4.11" },
      { name: "Spaghetti „à la Genovese“", desc: "in Basilikumsoße geschwenkt, dazu Putenbruststeaks, Soße „Café de Paris“ und gemischter Salatteller", price: 1890, allergens: "A.G.C.H.F.11" },
      { name: "Spaghetti with Meatballs", desc: "mit Hackfleischbällchen in Tomatensoße und gemischtem Salatteller", price: 1550, allergens: "A.G.C.I.F.11" },
    ],
  },
  {
    id: "salate",
    title: "Salate",
    intro: "…da ham wir den Salat!",
    note: "Wählen Sie Ihr Dressing selbst: Essig-Öl-Kräuter, Joghurt, Sauerrahm, French, Balsamico oder Cocktail.",
    items: [
      { name: "Kleiner Salat", price: 570, allergens: "C.G.11", tags: ["veg"] },
      { name: "Gurkensalat", price: 570, tags: ["veg"] },
      { name: "Unser Spezialsalat", desc: "verschiedene Blatt- und Gemüsesalate der Saison mit Soße Ihrer Wahl, Butter und Toast", price: 1199, allergens: "A.C.G", tags: ["veg"] },
      { name: "Spezialsalat mit Schinken & Käse", desc: "mit gekochtem Schinken, Käse und Joghurtdressing", price: 1490, allergens: "A.C.G.2.3.4" },
      { name: "Spezialsalat mit Schinken & Ei", desc: "mit gekochtem Schinken, grob gehackten Eiern und Joghurtdressing", price: 1490, allergens: "A.C.G.2.3.4" },
      { name: "Bunter Salat „Virginia Chicken“", desc: "Spezialsalatmischung mit gegrillter Hähnchenbrust, gerösteten Pistazien und Cocktailsoße", price: 1590, allergens: "A.H.G.C.J.I" },
      { name: "Thunfischsalat „Nizza“", desc: "Spezialsalatmischung mit Thunfisch, gehackten Eiern, Zwiebelringen und Oliven", price: 1590, allergens: "C.D", tags: ["fish"] },
      { name: "Thunfischsalat „Hawaii“", desc: "mit Thunfisch, Emmentaler, Ananas und Schinkenstreifen", price: 1590, allergens: "C.G.D.2.3.4", tags: ["fish"] },
      { name: "Gemüseplatte", desc: "marinierte und angemachte Salate mit 3 Spiegeleiern auf Bratkartoffeln und Joghurtdressing", price: 1490, allergens: "C.G.2.3", tags: ["veg"] },
    ],
  },
  {
    id: "spezialsalate",
    title: "Spezial-Salatkarte",
    note: "Wählen Sie Ihr Dressing selbst: Essig-Öl-Kräuter, Joghurt, Sauerrahm, French, Balsamico oder Cocktail.",
    items: [
      { name: "Provenzalischer Bauernsalat", desc: "mit Käse nach Balkanart, Oliven, Peperoni, roten Bohnen und Zwiebeln, dazu Butter und Toast", price: 1590, allergens: "A.C.G.L", tags: ["veg"] },
      { name: "Bodetaler Salat", desc: "mit geräuchertem Forellenfilet und marinierten Pilzen, dazu Butter und Toast – wir empfehlen Joghurtdressing", price: 1590, allergens: "A.G.J.3", tags: ["fish"] },
      { name: "Bunter Salat „Louisiana“", desc: "mit gegrillten Putenmedaillons, Mandarinen, Weintrauben und knusprigen Croutons – wir empfehlen pikante Cocktailsoße", price: 1590, allergens: "A.G.J" },
      { name: "Salat „Mister Roquefort“", desc: "mit Edelschimmelkäse, Weintrauben und knusprigen Croutons – wir empfehlen Sauerrahmdressing", price: 1590, allergens: "A.G.J", tags: ["veg"] },
      { name: "„Grüne Gurke“ Chefsalat", desc: "mit gekochten Eiern, Käse, Schinken, Peperoni, Cocktailtomaten, marinierten Pilzen und knusprigen Croutons", price: 1590, allergens: "A.C.G.J.2.3.4.11", tags: ["chef"] },
      { name: "Bunter Salat „Cross Chicken“", desc: "mit Hähnchenbrust im Knuspermantel, Weintrauben, gerösteten Pistazien und pikanter Cocktailsoße", price: 1590, allergens: "A.C.H.11" },
    ],
  },
  {
    id: "gefluegel",
    title: "Geflügel",
    items: [
      { name: "Panierte Hähnchenbrust", desc: "mit Kräuterbutter, jungen Erbsen und Pommes frites", price: 1990, allergens: "A.C.G" },
      { name: "2 Hähnchenschenkel", desc: "knusprig gebraten auf feurig scharfer Soße mit Pommes frites und gemischtem Salatteller", price: 1790, allergens: "A.C.F.G.J.11" },
      { name: "Putenbruststeak „Café de Paris“", desc: "mit Soße „Café de Paris“, jungen Erbsen und Kartoffelkroketten", price: 1990, allergens: "A.G.F" },
      { name: "Putenbruststeak mit Cremechampignons", desc: "mit Kartoffelkroketten und gemischtem Salatteller", price: 1990, allergens: "A.G.F" },
      { name: "Geflügelbruststreifen in Pfifferlingrahm", desc: "in Rahmsoße mit Pfifferlingen, Speck, Zwiebelwürfeln und frischen Kräutern, dazu Butterreis und gemischter Salatteller", price: 1990, allergens: "A.G.2.3" },
      { name: "Hühnerfrikassee nach Berliner Art", desc: "mit Spargel, Fleischklößchen, Butterreis und gemischtem Salatteller", price: 1790, allergens: "A.G.I.F" },
      { name: "Chicken Wings", desc: "gegrillte Hähnchenflügel mit Barbecue-Soße, Limettenspalten, Pommes frites und gemischtem Salatteller", price: 1790, allergens: "A.G.J.11" },
      { name: "Gegrillte Hähnchenbruststeaks in Curryrahm", desc: "in Curryrahmsoße mit leckeren Früchten, Kartoffelkroketten und gemischtem Salatteller", price: 1990, allergens: "A.C.J.G.I.4.7" },
    ],
  },
  {
    id: "fleisch",
    title: "Fleischgerichte",
    items: [
      { name: "Gefüllte Rinderroulade", desc: "mit Apfelrotkohl und Salzkartoffeln", price: 2190, allergens: "A.I.J.F" },
      { name: "Wildragout", desc: "mit Waldpilzen, Apfelrotkohl und Kartoffelklößen", price: 2190, allergens: "L.I.A.G" },
      { name: "Geschmorte Schweinshaxe", desc: "in deftiger Soße mit Sauerkraut und Salzkartoffeln", price: 2090, allergens: "A.J.F.I.1" },
      { name: "Gefüllte Kohlroulade", desc: "mit Salzkartoffeln und gemischtem Salatteller", price: 1790, allergens: "C.A.F.J" },
      { name: "Rindergulasch", desc: "mit Apfelrotkohl und Kartoffelklößen", price: 1990, allergens: "A.J.F.I" },
      { name: "Rahmgeschnetzeltes vom Schwein", desc: "mit Champignons, Butterreis und jungen Erbsen", price: 1790, allergens: "A.G" },
      { name: "Gekochtes Eisbein", desc: "mit Sauerkraut und Erbsenpüree", price: 1890, allergens: "A.J.L",
        extra: { label: "auf Wunsch mit Sahnemeerrettich", price: 170 } },
      { name: "Geschmorte Rippchen", desc: "mit Sauerkraut und Salzkartoffeln", price: 1990, allergens: "A.I.F.J" },
      { name: "Feuerfleisch", desc: "mit Bratkartoffeln und gemischtem Salatteller", price: 1690, allergens: "C.A.F.2.3" },
      { name: "Geschmorter Schweinebraten", desc: "mit Mischgemüse und Salzkartoffeln", price: 1690, allergens: "C.A.J.G.I" },
    ],
  },
  {
    id: "hausmannskost",
    title: "…und immer noch kein Ende",
    items: [
      { name: "Gebratene Leber nach Berliner Art", desc: "mit gebräunten Zwiebeln und Apfelringen, dazu Erbsenpüree und Weißkrautsalat", price: 1790, allergens: "A.I.J.F.L" },
      { name: "Gebratene Leber mit Zwiebeln", desc: "mit Bratkartoffeln und gemischtem Salatteller", price: 1690, allergens: "A.2.3" },
      { name: "Gebratene Leber auf klassische Art", desc: "mit Kartoffelpüree, Zwiebelsoße und gemischtem Salatteller", price: 1690, allergens: "A.I.G.C.J.F" },
      { name: "Pfannengyros", desc: "mit Tzatziki, Krautsalat und Pommes frites", price: 1890, allergens: "A.G.I.J.F" },
      { name: "Gegrillte Schweinerippchen", desc: "nach Art des Hauses mariniert und gegrillt, dazu Zigeunersoße, Pommes frites und gemischter Salatteller", price: 2090, allergens: "A.G.J.F" },
      { name: "Paniertes Fischfilet", desc: "mit Kräuterbutter, Zitronenspalten und gemischtem Salatteller – wahlweise Pommes frites, Bratkartoffeln oder Kartoffelsalat", price: 1690, allergens: "A.D.G", tags: ["fish"] },
      { name: "Paniertes Schollenfilet", desc: "mit Remouladensoße, Zitronenspalten und gemischtem Salatteller – wahlweise Pommes frites, Bratkartoffeln oder Kartoffelsalat", price: 1790, allergens: "A.D.C.J.G.I.2.11", tags: ["fish"] },
      { name: "Riesenhacksteak", desc: "mit Bratkartoffeln, Soße und gemischtem Salatteller", price: 1690, allergens: "A.C.F.J",
        variants: [
          { label: "klassisch", price: 1690 },
          { label: "mit Cremechampignons, Letscho, Pfefferrahmsoße, Spiegeleiern, Zwiebelsoße, Kräuterbutter oder Zigeunersoße", price: 1890 },
        ] },
    ],
  },
  {
    id: "pfanne",
    title: "Aus der Pfanne",
    items: [
      { name: "Schweinesteak mit Kräuterbutter", desc: "mit Pommes frites und jungen Erbsen", price: 1890, allergens: "A.G" },
      { name: "Schweinesteak mit Letscho", desc: "mit Bratkartoffeln und Gurkensalat", price: 1890, allergens: "A.2.3" },
      { name: "Schweinesteak nach Feinschmeckerart", desc: "mit Pommes frites und jungen Erbsen", price: 1999, allergens: "G.I.J.D.A.C" },
      { name: "Schweinesteak mit Cremechampignons", desc: "mit Pommes frites und gemischtem Salatteller", price: 1890, allergens: "G.F.A" },
      { name: "Schweinesteak nach Prager Art", desc: "mit Schinkenrührei, Bratkartoffeln und jungen Erbsen", price: 1990, allergens: "A.G.C.2.4" },
      { name: "Rostbrätl", desc: "mit Bratkartoffeln und gemischtem Salatteller", price: 1890, allergens: "A.F.J.G" },
      { name: "Kasseler Steak mit Letscho", desc: "mit Pommes frites und Gurkensalat", price: 1890, allergens: "A.1" },
      { name: "Kasseler Steak mit 2 Setzeiern", desc: "mit Bratkartoffeln und gemischtem Salatteller", price: 1890, allergens: "A.C.1.2.3" },
      { name: "Leckere Schaschlyks", desc: "vom Schwein mit Leber, Gurken, Speck und Zwiebeln, dazu Zigeunersoße, Pommes frites und gemischter Salatteller", price: 1990, allergens: "A.J.G.2.4" },
      { name: "Großer „Grüne Gurke“ Grillteller", desc: "gegrillte Leber, kleine Steaks vom Schwein, Kasseler, Hähnchenbrust, kleine Bitoks, knuspriger Speck und Grillwürstchen – dazu 2 verschiedene Soßen, Butterkreation, Kroketten und junge Erbsen", price: 2290, allergens: "A.I.J.G.F.1.2.3.4.8", tags: ["chef"] },
    ],
  },
  {
    id: "schnitzelparadies",
    title: "Unser Schnitzelparadies",
    items: [
      { name: "Gefülltes Schnitzel „Classic“ (Cordon Bleu)", desc: "mit Käse und Schinken gefüllt, dazu Buttererbsen und Kartoffelkroketten", price: 2090, allergens: "A.C.G.2.3.4" },
      { name: "Gefülltes Schnitzel „Athena“", desc: "mit Käse nach Balkanart und Bauernschinken gefüllt, dazu Buttererbsen und Bratkartoffeln", price: 2090, allergens: "A.C.G.1" },
      { name: "Gefülltes Wernigeröder Herrenschnitzel", desc: "deftig mit Zwiebelmett und Kräutersenf gefüllt, dazu Pfefferrahmsoße, Zwiebelringe, Buttererbsen und Kartoffelkroketten", price: 2090, allergens: "A.C.G.J.1.3", tags: ["chef"] },
      { name: "Überbackenes Schweineschnitzel „Feinschmecker Art“", desc: "mit Würzfleisch, Spargelstücken und Sauce Hollandaise überbacken, dazu Buttererbsen und Kartoffelkroketten", price: 2250, allergens: "G.I.J.D.A.C" },
      { name: "Hausspezial „Grüne Gurke Schnitzel – Pikant“", desc: "mit Schinken und Ananas belegt, mit Käse überbacken, dazu Curryrahmsoße, Pommes frites und gemischter Salatteller", price: 2199, allergens: "A.C.G.J.I.2.3.4.7", tags: ["chef"] },
      { name: "Hausspezial „Grüne Gurke Schnitzel – Herzhaft“", desc: "mit Schinken und Tomate belegt, mit Käse überbacken, dazu Pfefferrahmsoße, Pommes frites und gemischter Salatteller", price: 2199, allergens: "A.C.G.2.3.4", tags: ["chef"] },
      { name: "Mega Schnitzelteller „Gourmet“", desc: "3 kleine Schnitzel mit Letscho, Cremechampignons und Kräuterbutter, dazu Mischgemüse und Kartoffelkroketten", price: 2190, allergens: "A.C.G.F" },
      { name: "Mailänder Schnitzel", desc: "mit Tomatensoße, Parmesan, Spaghetti und gemischtem Salatteller", price: 1990, allergens: "A.C.G.J" },
    ],
  },
  {
    id: "schnitzeleien",
    title: "…weitere Schnitzeleien",
    note: "Unsere Schnitzel wiegen unpaniert 250 Gramm.",
    items: [
      { name: "Paniertes Schweineschnitzel", desc: "in Butter gebraten, mit Pommes frites, Soße und gemischtem Salatteller", price: 1790, allergens: "A.C.G.J.I" },
      { name: "Jägerschnitzel", desc: "wie oben, mit Cremechampignons", price: 1990, allergens: "A.C.G.F" },
      { name: "Pustaschnitzel", desc: "wie oben, mit Letschogemüse", price: 1990, allergens: "A.C.G" },
      { name: "Zigeunerschnitzel", desc: "wie oben, mit Zigeunersoße", price: 1990, allergens: "A.C.G.J" },
      { name: "Zwiebelschnitzel", desc: "wie oben, mit Zwiebelsoße", price: 1990, allergens: "A.C.G.J.I.F" },
      { name: "Hamburger Schnitzel", desc: "wie oben, mit 2 Setzeiern und Soße", price: 1990, allergens: "A.C.G.J.I" },
      { name: "Schnitzel „Pfeffermühle“", desc: "wie oben, mit Pfefferrahmsoße", price: 1990, allergens: "A.C.G.3" },
      { name: "Schnitzel mit Kräuterbutter", desc: "wie oben, mit Soße", price: 1990, allergens: "A.C.G.J.I" },
      { name: "Schnitzel „nach Wiener Art“", desc: "wie oben, mit Zitronenspalten und Soße", price: 1990, allergens: "A.C.G.J.I" },
      { name: "Nostalgie: Panierte Jagdwurstscheiben", desc: "in Butter gebraten mit Bratkartoffeln, Soße und gemischtem Salatteller", price: 1690, allergens: "J.G.C.A.I.1.2.3.8",
        variants: [
          { label: "klassisch", price: 1690 },
          { label: "mit Cremechampignons, Zigeunersoße, Spiegeleiern, Zwiebelsoße, Kräuterbutter, Pfeffersoße oder Letschogemüse", price: 1890 },
        ] },
    ],
  },
  {
    id: "kinder",
    title: "Put-Put – die Karte für Kids",
    intro: "…nichts für Große. Die Karte für Kids, die wissen, was sie wollen!",
    note: "Wählt eure Beilagen selbst aus: Reis, Pommes frites, Kartoffelbrei, Gemüse oder Salat. Spiele, Puzzle, Memory, Malkiste, Bilderbuch … fragt danach!",
    items: [
      { name: "Für den Suppenkasper", desc: "1 Teller Tomatensuppe mit Knuspercroutons oder heiße Brühe mit Einlage", price: 390, allergens: "A.G.J.C.I" },
      { name: "Quasselstrippen zum Runterschlürfen", desc: "Spaghetti mit Tomatensoße, Bolognesesoße oder Käsesahnesoße", price: 690, allergens: "A.G.C.J" },
      { name: "Hühnchen Put-Put", desc: "panierte Hähnchenbrust, Chicken Wings (5 Stück) oder Frikassee vom Huhn", price: 750, allergens: "A.G.C.I.F.11" },
      { name: "Schweinchen Dick – der Rundumsattmachteller", desc: "kleines Schweineschnitzel mit Soße oder Ketchup, oder kleines Schweinesteak mit Kräuselwurst und Monsterketchup", price: 750, allergens: "A.J.G.I.C" },
      { name: "Obelix’ Original Hinkelstein", desc: "gebratener Fleischklops", price: 699, allergens: "A.F.I.C" },
      { name: "Räubergulasch", desc: "mit Gemüse und Kartoffeln", price: 699, allergens: "G" },
      { name: "Unsere Turbo-Schnecke „Mimi Nörgel“", desc: "Grillwurstschnecke mit Soße oder Ketchup", price: 699, allergens: "A.J.G.I.C" },
      { name: "Fisherman’s Friends", desc: "knusprige Fischstäbchen mit Ketchup", price: 499, allergens: "A.D", tags: ["fish"] },
      { name: "Mount Everest", desc: "ein Berg Kartoffelbrei mit Kräuselwurst und Ketchup", price: 699, allergens: "A.G.I.C.J" },
      { name: "Smarties-Teller", desc: "Milchreis mit Zucker, Zimt und vielen, vielen bunten Smarties", price: 550, allergens: "G.A.7", tags: ["veg"] },
      { name: "Troll’s Goldtaler", desc: "Kartoffelpuffer mit Zucker und Apfelmus", price: 599, allergens: "A.C.F.G.H.3", tags: ["veg"] },
      { name: "Mega Crossis", desc: "Portion extra krosse Pommes frites mit Mayo oder Ketchup", price: 390, allergens: "A.J.C.11", tags: ["veg"] },
    ],
  },
  {
    id: "desserts",
    title: "Für danach … & kleine Eiszeit",
    items: [
      { name: "Rote Grütze mit Vanillesoße", price: 580, allergens: "G", tags: ["veg"] },
      { name: "Erdbeerkompott mit Schlagsahne", price: 499, allergens: "G.3", tags: ["veg"] },
      { name: "Apfelkompott mit Vanillesoße", price: 499, allergens: "G.3", tags: ["veg"] },
      { name: "Geschichtetes Schoko-Vanille-Dessert", desc: "mit Roter Grütze und Sahnetupfer", price: 580, allergens: "G.D", tags: ["veg"] },
      { name: "Eis je Kugel", desc: "Vanille, Schokolade oder Erdbeere", price: 210, allergens: "G.A.C.E.F.H", tags: ["veg"] },
      { name: "Schlagsahne", price: 180, allergens: "G", tags: ["veg"] },
      { name: "Vanilleeis an Roter Grütze", desc: "mit Sahnetupfer garniert", price: 680, allergens: "G.A.C.E.F.H", tags: ["veg"] },
      { name: "Pfirsichbecher", desc: "mit 3 Kugeln Eis und Sahne", price: 899, allergens: "G.A.C.E.F.H", tags: ["veg"] },
      { name: "Erdbeerbecher", desc: "3 Kugeln Eis mit Erdbeerkompott und Sahne", price: 899, allergens: "G.A.C.E.F.H", tags: ["veg"] },
      { name: "Mandarinenbecher", desc: "mit 3 Kugeln Eis und Sahne", price: 899, allergens: "G.A.C.E.F.H", tags: ["veg"] },
      { name: "Ananasbecher", desc: "mit 3 Kugeln Eis und Sahne", price: 899, allergens: "G.A.C.E.F.H", tags: ["veg"] },
    ],
  },
  {
    id: "knabberzeug",
    title: "Knabberzeug",
    note: "Damit der Rahmen dieser Karte nicht gesprengt wird, erfragen Sie bitte andere Mixturen beim Personal.",
    items: [
      { name: "Chipsletten", desc: "1 Packung", price: 390, tags: ["veg"] },
      { name: "Gesalzene Erdnüsse", desc: "1 Schälchen", price: 290, allergens: "E", tags: ["veg"] },
      { name: "Salzstangen", desc: "1 Packung", price: 250, allergens: "A", tags: ["veg"] },
    ],
  },
];

export const allergenLegend: Array<{ code: string; label: string }> = [
  { code: "A", label: "Weizen (glutenhaltig)" },
  { code: "a", label: "Gerste (glutenhaltig)" },
  { code: "B", label: "Krebstiere" },
  { code: "C", label: "Eier" },
  { code: "D", label: "Fisch" },
  { code: "E", label: "Erdnüsse" },
  { code: "F", label: "Soja" },
  { code: "G", label: "Milch / Laktose" },
  { code: "H", label: "Schalenfrüchte" },
  { code: "I", label: "Sellerie" },
  { code: "J", label: "Senf" },
  { code: "K", label: "Sesam" },
  { code: "L", label: "Schwefeldioxid, Sulfite" },
  { code: "M", label: "Lupinen" },
  { code: "N", label: "Weichtiere" },
  { code: "1", label: "Konservierungsstoff Natriumnitrit" },
  { code: "2", label: "Konservierungsstoff" },
  { code: "3", label: "Antioxidationsmittel" },
  { code: "4", label: "Geschmacksverstärker" },
  { code: "5", label: "geschwefelt" },
  { code: "6", label: "chininhaltig" },
  { code: "7", label: "Farbstoff" },
  { code: "8", label: "Phosphat" },
  { code: "9", label: "enthält eine Phenylalaninquelle" },
  { code: "10", label: "coffeinhaltig" },
  { code: "11", label: "Süßungsmittel" },
];

const priceFormat = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" });

export function formatPrice(cents: number) {
  return priceFormat.format(cents / 100);
}
