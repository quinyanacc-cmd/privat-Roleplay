# ROLEPLAY – deine neue Beta

Diese ZIP enthält die Web-App 7.0.0-beta.2 direkt auf einer Ebene. Sie ist eine Weiterentwicklung deiner bisherigen Version 6.3.1.

## Vor dem Aktualisieren

Öffne deine bisherige App und wähle „Backup speichern“. Bewahre die JSON-Datei separat auf. Ein Quellcode-ZIP enthält deine persönlichen Einträge nicht.

## Auf deinem bisherigen GitHub-Projekt verwenden

1. Diese ZIP entpacken.
2. Im bisherigen Verzeichnis die gleichnamigen App-Dateien ersetzen und alle neuen Dateien hinzufügen. Insbesondere `storage.js`, `product.js`, `product.css`, `privacy.html` und die PNG-Symbole gehören dazu. `index.html` und Bilder bleiben auf derselben Ebene.
3. Falls GitHub Pages bereits eingerichtet ist, dessen Veröffentlichung abwarten. Falls noch keine Website existiert, muss das Hosting eingerichtet werden; ein Repository allein stellt noch keine Website bereit.
4. Die bisherige App-Adresse online öffnen. Für den ersten Wechsel von V6 alle geöffneten ROLEPLAY-Fenster und die installierte PWA schließen, anschließend neu öffnen. Am Seitenende steht `ROLEPLAY 7.0.0-beta.2`. Browserdaten dabei nicht löschen.
5. Prüfen, ob deine Tage, Routinen und Rollen vorhanden sind. Danach eine neue Sicherung exportieren.

Unter derselben Adresse und im selben Browser bleiben die Einträge im bisherigen lokalen Datenspeicher. Bei einem Wechsel von Adresse, Gerät oder in die native iPhone-App eine JSON-Sicherung importieren. Safari und native App übernehmen ihre Daten nicht automatisch voneinander.

## Was neu ist

- Unter „Rollen & Einstellungen“ eigene Rollen, Ziele, Farben, Symbole und Aktivitätsvorlagen anlegen und Wochentage zuordnen.
- Bestehende Rollen archivieren; bereits erfasste Aktivitäten behalten ihre Zuordnung.
- Religion und ursprüngliche Streaks ein- oder ausblenden.
- Neue Nutzer wählen eine Vorlage oder beginnen mit einer eigenen Rolle.
- Speicherfehler werden angezeigt, beschädigte Sicherungen vor dem Import abgewiesen und fehlgeschlagene Mehrfachspeicherungen zurückgenommen.
- Unter „Daten“ findest du Sicherung, Import und das bewusste Löschen lokaler Daten. Eine Notsicherung bewahrt bei Fehlern den noch lesbaren Stand für eine Reparatur.

## Noch vor der Veröffentlichung

Die Beta ist vorbereitet. Für den Store-Start fehlen ein echter iPhone-Test, ein signiertes Apple-Projekt, deine Anbieter-/Supportangaben und vollständige Datenschutzinformationen. Das separate Entwicklerpaket enthält das iOS-Projekt, Tests und `RELEASE.md` mit den nächsten Schritten.

Die Speicherung bleibt lokal. Exportiere regelmäßig eine JSON-Sicherung; bei App-Löschung oder gelöschten Browserdaten kann der lokale Stand verloren gehen. Sicherungsdateien sind unverschlüsselt.


## Beta 2 – Routinen

- Die persönliche Morgenroutine wurde auf acht geführte Blöcke verdichtet: Fertigmachen, Versorgung, Gebet & Ibāda, Mobilisieren, Lesen, Englisch, Peak und Abschluss + Duʿā.
- Blöcke können Feinschritte enthalten. Sie dienen im Player als Orientierung, ohne als zusätzliche Pflichtpunkte gezählt zu werden.
- Jede Routine lässt sich im Detail als `ROLEPLAY_ROUTINE`-JSON speichern. Auf der Routinen-Seite kann diese Datei später wieder geladen werden. Gleiche Kennung aktualisiert eine Routine, eine neue Kennung fügt eine weitere Routine hinzu.
- Der Routinen-Player zeigt den nächsten Block stärker im Fokus und feiert einen vollständigen Abschluss ohne störenden Browser-Alert.
