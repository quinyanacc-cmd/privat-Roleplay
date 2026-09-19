# ROLEPLAY – Routine-Dateien

Ab Version 7.0.0-beta.3 kann eine Routine nicht nur aus Blöcken und Feinschritten bestehen, sondern auch mehrere Umfänge und geführte Spezialblöcke enthalten.

## Empfohlener Ablauf

1. In ROLEPLAY die gewünschte Routine öffnen.
2. **Routine-Datei speichern** wählen.
3. Die JSON-Datei in einem Chat hochladen und die gewünschte Änderung beschreiben.
4. Die bearbeitete JSON-Datei zurück in ROLEPLAY unter **Routinen → Routine-Datei → Datei laden** importieren.

Hat die Datei dieselbe `key`-Kennung, wird die bestehende Routine aktualisiert. Eine neue Kennung fügt eine weitere Routine hinzu. Andere Routinen bleiben unberührt.

## Struktur

Jeder große `item` ist eine sichtbare Phase. `steps` sind kleine Orientierungspunkte innerhalb der Phase und zählen nicht als zusätzliche Routinenpunkte.

`modes` definiert verschiedene Umfänge einer Routine. Über `modeMinutes` kann eine Phase je Modus kürzer werden oder mit `0` vollständig entfallen. Die aktuelle Morgenroutine verwendet **Voll 120 Min.**, **Standard 90 Min.** und **Kurz 45 Min.**

Ein `kind` kann eine besondere Darstellung aktivieren. `kind: "alignment"` öffnet in der aktuellen App den geführten Ausrichtungsblock mit Rolle, Commitment, Visualisierung, Hindernisplanung, kurzem Journal und Tageshandlung.

```json
{
  "format": "ROLEPLAY_ROUTINE",
  "version": 2,
  "routine": {
    "key": "morning",
    "title": "Morgenroutine",
    "theme": "morning",
    "defaultMode": "full",
    "modes": [
      { "key": "full", "label": "Voll", "accent": "120 Min." },
      { "key": "standard", "label": "Standard", "accent": "90 Min." },
      { "key": "short", "label": "Kurz", "accent": "45 Min." }
    ],
    "items": [
      {
        "id": "m-align",
        "emoji": "🧭",
        "title": "Ausrichtung",
        "kind": "alignment",
        "minutes": 15,
        "modeMinutes": { "full": 15, "standard": 10, "short": 5 },
        "context": "Rolle, Commitment, Visualisierung und Tageshandlung.",
        "steps": []
      }
    ]
  }
}
```

Die mitgelieferte `routine-morgen-experience-v2.json` ist die aktuelle Morgenroutine und kann direkt als Ausgangspunkt verwendet werden.
