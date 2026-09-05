/**
 * Rechtstexte, auf Deutsch, wie es das Gesetz verlangt.
 *
 * Das Impressum stammt von der bisherigen Website; geändert wurde nur die
 * Rechtsgrundlage für die inhaltliche Verantwortung, weil der
 * Rundfunkstaatsvertrag seit November 2020 durch den Medienstaatsvertrag
 * ersetzt ist.
 *
 * Die Datenschutzerklärung wurde neu geschrieben. Der alte Text beschrieb
 * Google Web Fonts und ein anderes Hosting; beides trifft auf diese Website
 * nicht mehr zu. Beschrieben ist jetzt, was tatsächlich passiert: Hosting bei
 * Vercel, Datenbank bei Supabase in Frankfurt, E-Mail-Versand über Resend,
 * selbst ausgelieferte Schriften und eine Karte, die erst nach Zustimmung
 * geladen wird.
 */
export type LegalBlock =
  | { type: "h2" | "h3" | "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "lines"; lines: string[] };

export const impressum: LegalBlock[] = [
  { type: "h3", text: "Angaben gemäß § 5 TMG" },
  { type: "lines", lines: ["Grüne Gurke (Gaststätte Harzblick)", "Veckenstedter Weg 63", "38855 Wernigerode"] },
  { type: "lines", lines: ["Handelsregister: HRB 29154", "Registergericht: Stendal"] },
  { type: "lines", lines: ["Vertreten durch:", "Bernd Roland"] },

  { type: "h3", text: "Kontakt" },
  { type: "lines", lines: ["Telefon: 03943 634256", "E-Mail: info@gruene-gurke.com"] },

  { type: "h3", text: "Umsatzsteuer-ID" },
  {
    type: "lines",
    lines: ["Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:", "DE337118855"],
  },

  { type: "h3", text: "Aufsichtsbehörde" },
  { type: "lines", lines: ["Gewerbeamt Blankenburg", "Harzstr. 3", "38889 Blankenburg (Harz)"] },
  { type: "p", text: "https://www.blankenburg.de/" },

  { type: "h3", text: "Angaben zur Berufshaftpflichtversicherung" },
  {
    type: "lines",
    lines: [
      "Name und Sitz des Versicherers:",
      "Württembergische Versicherung AG",
      "Gutenbergstraße 30",
      "70176 Stuttgart",
    ],
  },
  { type: "lines", lines: ["Geltungsraum der Versicherung:", "Deutschland"] },

  { type: "h3", text: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV" },
  {
    type: "lines",
    lines: ["Bernd Roland", "GastRoland UG (haftungsbeschränkt)", "Veckenstedter Weg 63", "38855 Wernigerode"],
  },

  { type: "h3", text: "Verbraucherstreitbeilegung/Universalschlichtungsstelle" },
  {
    type: "p",
    text: "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
  },

  { type: "h3", text: "Haftung für Inhalte" },
  {
    type: "p",
    text: "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
  },
  {
    type: "p",
    text: "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.",
  },

  { type: "h3", text: "Haftung für Links" },
  {
    type: "p",
    text: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.",
  },
  {
    type: "p",
    text: "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
  },

  { type: "h3", text: "Urheberrecht" },
  {
    type: "p",
    text: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.",
  },
  {
    type: "p",
    text: "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
  },
];

export const datenschutz: LegalBlock[] = [
  { type: "h2", text: "1. Datenschutz auf einen Blick" },

  { type: "h3", text: "Allgemeine Hinweise" },
  {
    type: "p",
    text: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
  },
  {
    type: "p",
    text: "Diese Website kommt ohne Werbe- oder Analysedienste aus. Wir setzen keine Cookies zur Analyse Ihres Verhaltens ein und binden keine Schriften oder Skripte von fremden Servern ein. Solange Sie kein Formular abschicken und die Karte auf der Kontaktseite nicht ausdrücklich laden, verlassen keine personenbezogenen Daten unseren Server über das technisch Notwendige hinaus.",
  },

  { type: "h3", text: "Datenerfassung auf dieser Website" },
  { type: "h4", text: "Wer ist verantwortlich für die Datenerfassung auf dieser Website?" },
  {
    type: "p",
    text: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.",
  },
  { type: "h4", text: "Wie erfassen wir Ihre Daten?" },
  {
    type: "p",
    text: "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Das sind die Angaben aus dem Kontaktformular und aus der Reservierungsanfrage.",
  },
  {
    type: "p",
    text: "Andere Daten werden beim Aufruf der Website automatisch durch unseren Hoster erfasst. Das sind vor allem technische Daten wie Browser, Betriebssystem oder Uhrzeit des Seitenaufrufs.",
  },
  { type: "h4", text: "Wofür nutzen wir Ihre Daten?" },
  {
    type: "p",
    text: "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Ihre Angaben aus den Formularen nutzen wir ausschließlich, um Ihre Anfrage zu bearbeiten und Ihnen zu antworten.",
  },
  { type: "h4", text: "Welche Rechte haben Sie bezüglich Ihrer Daten?" },
  {
    type: "p",
    text: "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.",
  },
  {
    type: "p",
    text: "Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.",
  },

  { type: "h2", text: "2. Hosting und technische Dienstleister" },

  { type: "h3", text: "Hosting der Website" },
  {
    type: "p",
    text: "Diese Website wird bei der Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, gehostet. Die Auslieferung erfolgt über Server in der Europäischen Union. Beim Aufruf der Website verarbeitet Vercel technische Verbindungsdaten, insbesondere IP-Adresse, Zeitpunkt der Anfrage und aufgerufene Adresse.",
  },
  {
    type: "p",
    text: "Der Einsatz erfolgt im Interesse einer sicheren, schnellen und zuverlässigen Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO). Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung. Soweit dabei Daten in die USA übermittelt werden, geschieht dies auf Grundlage von Standardvertragsklauseln der Europäischen Kommission.",
  },

  { type: "h3", text: "Datenbank" },
  {
    type: "p",
    text: "Die Inhalte dieser Website sowie Ihre Anfragen aus Kontaktformular und Reservierung speichern wir in einer Datenbank des Anbieters Supabase, Inc., 970 Toa Payoh North #07-04, Singapur 318992. Der von uns genutzte Serverstandort liegt in Frankfurt am Main, Deutschland. Ihre Formulardaten verlassen die Europäische Union hierbei nicht.",
  },
  {
    type: "p",
    text: "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage der Anbahnung oder Erfüllung eines Vertrages dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung.",
  },

  { type: "h3", text: "E-Mail-Versand" },
  {
    type: "p",
    text: "Für den Versand der Bestätigungen zu Reservierungen und für die Weiterleitung von Nachrichten aus dem Kontaktformular nutzen wir den Dienst Resend der Resend, Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA. An den Anbieter werden dabei die Angaben übermittelt, die für den Versand nötig sind: Ihr Name, Ihre E-Mail-Adresse, Ihre Telefonnummer sowie der Inhalt Ihrer Nachricht beziehungsweise die Angaben zu Ihrer Reservierung.",
  },
  {
    type: "p",
    text: "Der Einsatz erfolgt zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO) und im berechtigten Interesse an einem zuverlässigen E-Mail-Versand (Art. 6 Abs. 1 lit. f DSGVO). Die Übermittlung in die USA erfolgt auf Grundlage von Standardvertragsklauseln der Europäischen Kommission. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung.",
  },

  { type: "h3", text: "Schriftarten" },
  {
    type: "p",
    text: "Die auf dieser Website verwendeten Schriften werden von unserem eigenen Server ausgeliefert. Eine Verbindung zu Servern von Google oder anderen Anbietern findet dabei nicht statt, und Ihre IP-Adresse wird zu diesem Zweck nicht übertragen.",
  },

  { type: "h2", text: "3. Allgemeine Hinweise und Pflichtinformationen" },

  { type: "h3", text: "Datenschutz" },
  {
    type: "p",
    text: "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.",
  },
  {
    type: "p",
    text: "Wir weisen darauf hin, dass die Datenübertragung im Internet, etwa bei der Kommunikation per E-Mail, Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.",
  },

  { type: "h3", text: "Hinweis zur verantwortlichen Stelle" },
  { type: "p", text: "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:" },
  { type: "lines", lines: ["Bernd Roland", "Veckenstedter Weg 63", "38855 Wernigerode"] },
  { type: "lines", lines: ["Telefon: 03943 634256", "E-Mail: info@gruene-gurke.com"] },
  {
    type: "p",
    text: "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.",
  },

  { type: "h3", text: "Speicherdauer" },
  {
    type: "p",
    text: "Soweit in dieser Datenschutzerklärung keine besondere Speicherdauer genannt wird, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen stellen oder eine Einwilligung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung haben. Gesetzliche Aufbewahrungsfristen, insbesondere handels- und steuerrechtliche, bleiben unberührt.",
  },

  { type: "h3", text: "Widerruf Ihrer Einwilligung zur Datenverarbeitung" },
  {
    type: "p",
    text: "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.",
  },

  {
    type: "h3",
    text: "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)",
  },
  {
    type: "p",
    text: "Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.",
  },
  {
    type: "p",
    text: "Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet.",
  },

  { type: "h3", text: "Beschwerderecht bei der zuständigen Aufsichtsbehörde" },
  {
    type: "p",
    text: "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Für uns zuständig ist der Landesbeauftragte für den Datenschutz Sachsen-Anhalt.",
  },

  { type: "h3", text: "Recht auf Datenübertragbarkeit" },
  {
    type: "p",
    text: "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.",
  },

  { type: "h3", text: "SSL- bzw. TLS-Verschlüsselung" },
  {
    type: "p",
    text: "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.",
  },

  { type: "h3", text: "Auskunft, Löschung und Berichtigung" },
  {
    type: "p",
    text: "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und gegebenenfalls ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.",
  },

  { type: "h3", text: "Recht auf Einschränkung der Verarbeitung" },
  {
    type: "p",
    text: "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:",
  },
  {
    type: "list",
    items: [
      "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung zu verlangen.",
      "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah oder geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
      "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung zu verlangen.",
      "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung zu verlangen.",
    ],
  },
  {
    type: "p",
    text: "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten, von ihrer Speicherung abgesehen, nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses verarbeitet werden.",
  },

  { type: "h3", text: "Widerspruch gegen Werbe-E-Mails" },
  {
    type: "p",
    text: "Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen vor.",
  },

  { type: "h2", text: "4. Datenerfassung auf dieser Website" },

  { type: "h3", text: "Cookies" },
  {
    type: "p",
    text: "Für den Besuch dieser Website setzen wir keine Cookies. Cookies kommen ausschließlich im geschützten Verwaltungsbereich zum Einsatz, den nur das Restaurant selbst nutzt; sie dienen dort der Anmeldung und sind technisch notwendig (§ 25 Abs. 2 Nr. 2 TDDDG).",
  },

  { type: "h3", text: "Server-Log-Dateien" },
  {
    type: "p",
    text: "Der Anbieter der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:",
  },
  {
    type: "list",
    items: [
      "Browsertyp und Browserversion",
      "verwendetes Betriebssystem",
      "Referrer URL",
      "Hostname des zugreifenden Rechners",
      "Uhrzeit der Serveranfrage",
      "IP-Adresse",
    ],
  },
  {
    type: "p",
    text: "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.",
  },

  { type: "h3", text: "Kontaktformular" },
  {
    type: "p",
    text: "Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir die von Ihnen gemachten Angaben: Anrede, Vorname, Name, Telefonnummer, E-Mail-Adresse und den Text Ihrer Nachricht. Diese Angaben speichern wir in unserer Datenbank und leiten sie zusätzlich per E-Mail an das Restaurant weiter, damit wir Ihre Anfrage bearbeiten und bei Rückfragen darauf zurückgreifen können.",
  },
  {
    type: "p",
    text: "Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie beim Absenden erteilen, sowie auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Anbahnung eines Vertrages zusammenhängt. Die Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung widerrufen oder der Zweck entfällt.",
  },

  { type: "h3", text: "Reservierungsanfragen" },
  {
    type: "p",
    text: "Wenn Sie über das Formular einen Tisch anfragen, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, Ihre Telefonnummer, das gewünschte Datum, die Uhrzeit, die Anzahl der Personen sowie Ihre Anmerkungen. Diese Angaben speichern wir in unserer Datenbank und schicken sie per E-Mail an das Restaurant. Sie selbst erhalten eine Eingangsbestätigung und, sobald wir über Ihre Anfrage entschieden haben, eine Zu- oder Absage per E-Mail.",
  },
  {
    type: "p",
    text: "Die Verarbeitung erfolgt zur Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage hin (Art. 6 Abs. 1 lit. b DSGVO) sowie auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Wir löschen die Angaben, wenn der Besuch abgewickelt ist und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.",
  },

  { type: "h3", text: "Anfrage per E-Mail oder Telefon" },
  {
    type: "p",
    text: "Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt, im Übrigen auf Grundlage unseres berechtigten Interesses an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).",
  },

  { type: "h2", text: "5. Karten und externe Inhalte" },

  { type: "h3", text: "Google Maps" },
  {
    type: "p",
    text: "Auf der Startseite und auf der Kontaktseite bieten wir eine Karte des Dienstes Google Maps an. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.",
  },
  {
    type: "p",
    text: "Die Karte wird nicht automatisch geladen. Sie sehen zunächst nur einen Hinweis mit unserer Anschrift. Erst wenn Sie auf „Karte laden“ klicken, wird die Karte von Google abgerufen. Dabei wird Ihre IP-Adresse an Google übertragen und in der Regel an einen Server von Google in den USA übermittelt und dort gespeichert. Solange Sie nicht klicken, findet keine Verbindung zu Google statt.",
  },
  {
    type: "p",
    text: "Die Verarbeitung erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Die Einwilligung gilt für den jeweiligen Besuch und lässt sich jederzeit widerrufen, indem Sie die Seite neu laden. Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy?hl=de.",
  },

  { type: "h3", text: "Speisekarte als PDF" },
  {
    type: "p",
    text: "Die Speisekarte zum Herunterladen liegt auf unserem eigenen Server. Beim Öffnen werden keine Daten an Dritte übermittelt.",
  },
];
