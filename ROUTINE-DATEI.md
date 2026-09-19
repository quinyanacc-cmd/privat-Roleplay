# ROLEPLAY – Routine-Dateien

Ab Version 7.0.0-beta.2 kann jede Routine als kleine JSON-Datei gespeichert und später wieder geladen werden.

## Empfohlener Ablauf

1. In ROLEPLAY die gewünschte Routine öffnen.
2. **Routine-Datei speichern** wählen.
3. Die JSON-Datei in einem Chat hochladen und die gewünschte Änderung beschreiben.
4. Die bearbeitete JSON-Datei zurück in ROLEPLAY unter **Routinen → Routine-Datei → Datei laden** importieren.

Hat die Datei dieselbe `key`-Kennung, wird die bestehende Routine aktualisiert. Eine neue Kennung fügt eine weitere Routine hinzu. Andere Routinen bleiben unberührt.

## Struktur

Jeder große `item` ist ein sichtbarer Routinenblock. `steps` sind kleine Orientierungspunkte innerhalb des Blocks. Sie lassen sich im Player abhaken, zählen aber nicht als eigene Routinenpunkte.

```json
{
  "format": "ROLEPLAY_ROUTINE",
  "version": 1,
  "routine": {
    "key": "morning",
    "title": "Morgenroutine",
    "description": "Ein Block nach dem anderen.",
    "theme": "morning",
    "items": [
      {
        "id": "m-read",
        "emoji": "📖",
        "title": "Lesen",
        "minutes": 20,
        "context": "Ein zusammenhängender Leseblock.",
        "steps": ["Buch öffnen", "20 Minuten lesen"]
      }
    ]
  }
}
```

Die mitgelieferte `routine-morgen-guided-v1.json` ist die aktuelle Morgenroutine und kann direkt als Ausgangspunkt verwendet werden.
