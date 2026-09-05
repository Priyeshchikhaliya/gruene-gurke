/**
 * Legal texts from the current website (German only, as required by German law).
 * Generated from the old site's content. Before go-live the privacy policy must be
 * updated for the new stack (Vercel hosting, Supabase, Resend, self-hosted fonts).
 */
export type LegalBlock =
  | { type: "h2" | "h3" | "h4"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "lines"; lines: string[] };

export const impressum: LegalBlock[] = [
  {
    "type": "h3",
    "text": "Angaben gemäß § 5 TMG"
  },
  {
    "type": "lines",
    "lines": [
      "Grüne Gurke (Gaststätte Harzblick)",
      "Veckenstedter Weg 63",
      "38855 Wernigerode"
    ]
  },
  {
    "type": "lines",
    "lines": [
      "Handelsregister: HRB 29154",
      "Registergericht: Stendal"
    ]
  },
  {
    "type": "lines",
    "lines": [
      "Vertreten durch:",
      "Bernd Roland"
    ]
  },
  {
    "type": "h3",
    "text": "Kontakt"
  },
  {
    "type": "lines",
    "lines": [
      "Telefon: 03943 634256",
      "E-Mail: info@gruene-gurke.com"
    ]
  },
  {
    "type": "h3",
    "text": "Umsatzsteuer-ID"
  },
  {
    "type": "lines",
    "lines": [
      "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:",
      "DE337118855"
    ]
  },
  {
    "type": "h3",
    "text": "Aufsichtsbehörde"
  },
  {
    "type": "lines",
    "lines": [
      "Gewerbeamt Blankenburg",
      "Harzstr. 3",
      "38889 Blankenburg (Harz)"
    ]
  },
  {
    "type": "p",
    "text": "https://www.blankenburg.de/"
  },
  {
    "type": "h3",
    "text": "Angaben zur Berufshaftpflichtversicherung"
  },
  {
    "type": "lines",
    "lines": [
      "Name und Sitz des Versicherers:",
      "Württembergische Versicherung AG",
      "Gutenbergstraße 30",
      "70176 Stuttgart"
    ]
  },
  {
    "type": "lines",
    "lines": [
      "Geltungsraum der Versicherung:",
      "Deutschland"
    ]
  },
  {
    "type": "h3",
    "text": "Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV"
  },
  {
    "type": "lines",
    "lines": [
      "Bernd Roland",
      "GastRoland UG (haftungsbeschränkt)",
      "Veckenstedter Weg 63",
      "38855 Wernigerode"
    ]
  },
  {
    "type": "h3",
    "text": "Verbraucherstreitbeilegung/Universalschlichtungsstelle"
  },
  {
    "type": "p",
    "text": "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen."
  },
  {
    "type": "h3",
    "text": "Haftung für Inhalte"
  },
  {
    "type": "p",
    "text": "Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen."
  },
  {
    "type": "p",
    "text": "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."
  },
  {
    "type": "h3",
    "text": "Haftung für Links"
  },
  {
    "type": "p",
    "text": "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar."
  },
  {
    "type": "p",
    "text": "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."
  },
  {
    "type": "h3",
    "text": "Urheberrecht"
  },
  {
    "type": "p",
    "text": "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet."
  },
  {
    "type": "p",
    "text": "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen."
  }
];

export const datenschutz: LegalBlock[] = [
  {
    "type": "h2",
    "text": "1. Datenschutz auf einen Blick"
  },
  {
    "type": "h3",
    "text": "Allgemeine Hinweise"
  },
  {
    "type": "p",
    "text": "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung."
  },
  {
    "type": "h3",
    "text": "Datenerfassung auf dieser Website"
  },
  {
    "type": "h4",
    "text": "Wer ist verantwortlich für die Datenerfassung auf dieser Website?"
  },
  {
    "type": "p",
    "text": "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen."
  },
  {
    "type": "h4",
    "text": "Wie erfassen wir Ihre Daten?"
  },
  {
    "type": "p",
    "text": "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben."
  },
  {
    "type": "p",
    "text": "Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten."
  },
  {
    "type": "h4",
    "text": "Wofür nutzen wir Ihre Daten?"
  },
  {
    "type": "p",
    "text": "Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden."
  },
  {
    "type": "h4",
    "text": "Welche Rechte haben Sie bezüglich Ihrer Daten?"
  },
  {
    "type": "p",
    "text": "Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu."
  },
  {
    "type": "p",
    "text": "Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden."
  },
  {
    "type": "h2",
    "text": "2. Hosting und Content Delivery Networks (CDN)"
  },
  {
    "type": "h3",
    "text": "Externes Hosting"
  },
  {
    "type": "p",
    "text": "Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten, die über eine Website generiert werden, handeln."
  },
  {
    "type": "p",
    "text": "Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO)."
  },
  {
    "type": "p",
    "text": "Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen."
  },
  {
    "type": "h3",
    "text": "Abschluss eines Vertrages über Auftragsverarbeitung"
  },
  {
    "type": "p",
    "text": "Um die datenschutzkonforme Verarbeitung zu gewährleisten, haben wir einen Vertrag über Auftragsverarbeitung mit unserem Hoster geschlossen."
  },
  {
    "type": "h2",
    "text": "3. Allgemeine Hinweise und Pflichtinformationen"
  },
  {
    "type": "h3",
    "text": "Datenschutz"
  },
  {
    "type": "p",
    "text": "Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung."
  },
  {
    "type": "p",
    "text": "Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht."
  },
  {
    "type": "p",
    "text": "Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich."
  },
  {
    "type": "h3",
    "text": "Hinweis zur verantwortlichen Stelle"
  },
  {
    "type": "p",
    "text": "Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:"
  },
  {
    "type": "lines",
    "lines": [
      "Bernd Roland",
      "Veckenstedter Weg 63",
      "38855 Wernigerode"
    ]
  },
  {
    "type": "lines",
    "lines": [
      "Telefon: 03943 634256",
      "E-Mail: info@gruene-gurke.com"
    ]
  },
  {
    "type": "p",
    "text": "Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet."
  },
  {
    "type": "h3",
    "text": "Widerruf Ihrer Einwilligung zur Datenverarbeitung"
  },
  {
    "type": "p",
    "text": "Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt."
  },
  {
    "type": "h3",
    "text": "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)"
  },
  {
    "type": "p",
    "text": "WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO)."
  },
  {
    "type": "p",
    "text": "WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO)."
  },
  {
    "type": "h3",
    "text": "Beschwerderecht bei der zuständigen Aufsichtsbehörde"
  },
  {
    "type": "p",
    "text": "Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe."
  },
  {
    "type": "h3",
    "text": "Recht auf Datenübertragbarkeit"
  },
  {
    "type": "p",
    "text": "Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist."
  },
  {
    "type": "h3",
    "text": "SSL- bzw. TLS-Verschlüsselung"
  },
  {
    "type": "p",
    "text": "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile."
  },
  {
    "type": "p",
    "text": "Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden."
  },
  {
    "type": "h3",
    "text": "Auskunft, Löschung und Berichtigung"
  },
  {
    "type": "p",
    "text": "Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden."
  },
  {
    "type": "h3",
    "text": "Recht auf Einschränkung der Verarbeitung"
  },
  {
    "type": "p",
    "text": "Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:"
  },
  {
    "type": "list",
    "items": [
      "Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
      "Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.",
      "Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
      "Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.",
      "Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden."
    ]
  },
  {
    "type": "h3",
    "text": "Widerspruch gegen Werbe-E-Mails"
  },
  {
    "type": "p",
    "text": "Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor."
  },
  {
    "type": "h2",
    "text": "4. Datenerfassung auf dieser Website"
  },
  {
    "type": "h3",
    "text": "Server-Log-Dateien"
  },
  {
    "type": "p",
    "text": "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:"
  },
  {
    "type": "list",
    "items": [
      "Browsertyp und Browserversion",
      "verwendetes Betriebssystem",
      "Referrer URL",
      "Hostname des zugreifenden Rechners",
      "Uhrzeit der Serveranfrage",
      "IP-Adresse"
    ]
  },
  {
    "type": "p",
    "text": "Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen."
  },
  {
    "type": "p",
    "text": "Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden."
  },
  {
    "type": "h3",
    "text": "Kontaktformular"
  },
  {
    "type": "p",
    "text": "Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
  },
  {
    "type": "p",
    "text": "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde."
  },
  {
    "type": "p",
    "text": "Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt."
  },
  {
    "type": "h3",
    "text": "Anfrage per E-Mail, Telefon oder Telefax"
  },
  {
    "type": "p",
    "text": "Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter."
  },
  {
    "type": "p",
    "text": "Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde."
  },
  {
    "type": "p",
    "text": "Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt."
  },
  {
    "type": "h2",
    "text": "5. Plugins und Tools"
  },
  {
    "type": "h3",
    "text": "Google Web Fonts"
  },
  {
    "type": "p",
    "text": "Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen."
  },
  {
    "type": "p",
    "text": "Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde. Die Nutzung von Google WebFonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Webseitenbetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Webseite. Sofern eine entsprechende Einwilligung abgefragt wurde (z. B. eine Einwilligung zur Speicherung von Cookies), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar."
  },
  {
    "type": "p",
    "text": "Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt."
  },
  {
    "type": "p",
    "text": "Weitere Informationen zu Google Web Fonts finden Sie unter https://developers.google.com/fonts/faq und in der Datenschutzerklärung von Google: https://policies.google.com/privacy?hl=de."
  },
  {
    "type": "h3",
    "text": "Google Maps"
  },
  {
    "type": "p",
    "text": "Diese Seite nutzt über eine API den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland."
  },
  {
    "type": "p",
    "text": "Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung."
  },
  {
    "type": "p",
    "text": "Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar."
  },
  {
    "type": "p",
    "text": "Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: https://policies.google.com/privacy?hl=de."
  }
];
