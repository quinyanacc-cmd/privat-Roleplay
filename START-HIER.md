# ROLEPLAY – deine neue Beta

Diese ZIP enthält die Web-App 7.0.0-beta.3 direkt auf einer Ebene. Sie baut auf der bisherigen 7.0-Beta auf und überarbeitet insbesondere das Routinen-Erlebnis.

## Vor dem Aktualisieren

Öffne deine bisherige App und wähle „Backup speichern“. Bewahre die JSON-Datei separat auf. Ein Quellcode-ZIP enthält deine persönlichen Einträge nicht.

## Auf deinem bisherigen GitHub-Projekt verwenden

1. Diese ZIP entpacken.
2. Im bisherigen Verzeichnis die gleichnamigen App-Dateien ersetzen und alle neuen Dateien hinzufügen. `index.html`, `app.js`, `style.css`, `storage.js`, `product.js`, `product.css`, Bilder und Symbole bleiben auf derselben Ebene.
3. Falls GitHub Pages bereits eingerichtet ist, dessen Veröffentlichung abwarten.
4. Die bisherige App-Adresse online öffnen. Bei einem Versionswechsel alle geöffneten ROLEPLAY-Fenster und die installierte PWA einmal schließen und anschließend neu öffnen. Am Seitenende steht `ROLEPLAY 7.0.0-beta.3`. Browserdaten dabei nicht löschen.
5. Prüfen, ob deine Tage, Routinen und Rollen vorhanden sind. Danach eine neue Sicherung exportieren.

Unter derselben Adresse und im selben Browser bleiben die Einträge im bisherigen lokalen Datenspeicher. Bei einem Wechsel von Adresse, Gerät oder in die native iPhone-App eine JSON-Sicherung importieren. Safari und native App übernehmen ihre Daten nicht automatisch voneinander.

## Beta 3 – Morning Experience

- Die Morgenroutine ist jetzt als geführte Choreografie aufgebaut: **Bereit werden → Versorgung → Gebet & Ibāda → Aktivieren → Ausrichtung → Lesen → Englisch → Peak → Aufbrechen**.
- Drei Umfänge sind integriert: **Voll 120 Min.**, **Standard 90 Min.** und **Kurz 45 Min.**. Sie folgen derselben Grundabfolge, statt drei unterschiedliche Routinen zu erzeugen.
- „Aktivieren“ ist in der Vollversion ein echter 20-Minuten-Bewegungsblock statt nur eines symbolischen Mobilisationsschritts.
- Der neue 15-Minuten-Block **Ausrichtung** führt Bildschirm für Bildschirm durch Tagesrolle, Commitment/Affirmation, 90-Sekunden-Prozessvisualisierung, Hindernis + Wenn-dann-Plan, Mini-Journal und eine konkrete Tageshandlung.
- Die Ausrichtung verwendet das hinterlegte Ziel der aktiven Rolle. Ist noch kein eigenes Rollenziel eingetragen, verwendet ROLEPLAY einen neutralen Standard für die jeweilige Rolle.
- Antworten aus der Ausrichtung werden für den jeweiligen Tag lokal gespeichert und erscheinen beim erneuten Öffnen wieder.
- Am Ende eines vollständig absolvierten Durchlaufs erscheint eine eigene Abschlussansicht mit Tagesrolle und der festgelegten Handlung.
- Routine-Dateien unterstützen jetzt `modes`, `modeMinutes` und Spezialblöcke über `kind`. Die aktuelle Vorlage liegt als `routine-morgen-experience-v2.json` bei.

## Datensicherheit

Die Speicherung bleibt lokal. Exportiere regelmäßig eine JSON-Sicherung; bei App-Löschung oder gelöschten Browserdaten kann der lokale Stand verloren gehen. Sicherungsdateien sind unverschlüsselt.
