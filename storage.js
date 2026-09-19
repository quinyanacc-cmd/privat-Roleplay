/* Local persistence and recoverable multi-key commits. No user data leaves the device. */
(function (root) {
  "use strict";
  const PREFIX = "roleplay-v25-";
  const JOURNAL = PREFIX + "pending-transaction";
  let committing = false;
  let stale = false;
  function report(error) {
    if (typeof root.onRoleplayStorageError === "function") root.onRoleplayStorageError(error);
    return error;
  }
  function backend() { return root.localStorage; }
  function failure(error) {
    const wrapped = new Error(error.name === "QuotaExceededError"
      ? "Der Gerätespeicher ist voll. Diese Änderung wurde nicht gespeichert. Sichere deine Einträge als Datei und schaffe Speicherplatz."
      : error.message || "Die Einträge konnten nicht gespeichert werden.");
    wrapped.name = error.name || "StorageError";
    return report(wrapped);
  }
  function guard() {
    if (stale) throw failure(new Error("ROLEPLAY wurde in einem anderen Fenster geändert. Sichere offene Eingaben über die Notsicherung und lade diese Ansicht neu."));
    if (!committing && backend().getItem(JOURNAL)) throw failure(new Error("Eine unterbrochene Speicherung muss zuerst wiederhergestellt werden. Bitte lade ROLEPLAY neu."));
  }
  function owned(key) { return typeof key === "string" && (key.startsWith(PREFIX) || key === "roleplay-last-import-at") && key !== JOURNAL; }
  function rollback(journal) {
    // Release the new values before restoring old ones, including after quota errors.
    for (const entry of journal.before) backend().removeItem(entry.key);
    for (const entry of journal.before) if (entry.value !== null) backend().setItem(entry.key, entry.value);
    backend().removeItem(JOURNAL);
  }
  const api = {
    get length() { try { return backend().length; } catch (e) { throw failure(e); } },
    key(index) { try { return backend().key(index); } catch (e) { throw failure(e); } },
    getItem(key) { try { return backend().getItem(key); } catch (e) { throw failure(e); } },
    setItem(key, value) {
      try { guard(); backend().setItem(key, String(value)); return true; }
      catch (e) { throw failure(e); }
    },
    removeItem(key) {
      try { guard(); backend().removeItem(key); return true; }
      catch (e) { throw failure(e); }
    },
    recover() {
      const text = api.getItem(JOURNAL);
      if (!text) return false;
      try {
        const journal = JSON.parse(text);
        if (journal.version !== 1 || !Array.isArray(journal.before) || !journal.before.length
          || journal.before.some(x => !x || !owned(x.key) || (x.value !== null && typeof x.value !== "string"))) {
          throw new Error("Die lokale Wiederherstellungsdatei ist beschädigt. Erstelle eine Notsicherung, bevor du weitere Änderungen vornimmst.");
        }
        committing = true;
        rollback(journal);
        return true;
      } catch (e) { throw failure(e); }
      finally { committing = false; }
    },
    transaction(changes) {
      guard();
      if (!Array.isArray(changes) || !changes.length) return;
      if (changes.some(x => !x || !owned(x.key) || (x.value !== null && typeof x.value !== "string"))
        || new Set(changes.map(x => x.key)).size !== changes.length) throw new Error("Ungültiger Speicherauftrag.");
      const journal = { version: 1, before: changes.map(x => ({ key: x.key, value: api.getItem(x.key) })) };
      // If there is insufficient room for the journal, no existing entry is touched.
      try { backend().setItem(JOURNAL, JSON.stringify(journal)); } catch (e) { throw failure(e); }
      committing = true;
      try {
        for (const { key, value } of changes) {
          if (value === null) backend().removeItem(key); else backend().setItem(key, value);
        }
        backend().removeItem(JOURNAL);
      } catch (e) {
        try { rollback(journal); }
        catch (_) { throw failure(new Error("Die Speicherung wurde unterbrochen. Die Wiederherstellungsdaten sind noch vorhanden. Bitte lade ROLEPLAY neu und erstelle eine Notsicherung.")); }
        throw failure(e);
      } finally { committing = false; }
    },
    emergencySnapshot() {
      const result = {};
      for (let i = 0; i < backend().length; i++) {
        const key = backend().key(i);
        if (owned(key) || key === JOURNAL) result[key] = backend().getItem(key);
      }
      return result;
    },
    report,
    get stale() { return stale; }
  };
  root.RPStorage = api;
  if (root.addEventListener) root.addEventListener("storage", event => {
    if (event.storageArea === backend() && (event.key === null || owned(event.key) || event.key === JOURNAL)) {
      stale = true;
      report(new Error("Ein anderes Fenster hat deine ROLEPLAY-Daten geändert. Sichere offene Eingaben über die Notsicherung und lade diese Ansicht neu."));
    }
  });
})(globalThis);

/* Validate the complete file before any writes. Legacy v6 backups remain supported. */
(function (root) {
  "use strict";
  const object = value => !!value && typeof value === "object" && !Array.isArray(value);
  function date(value) {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(value + "T12:00:00Z");
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }
  function assert(ok, message) { if (!ok) throw new Error(message); }
  function tree(value, depth = 0, budget = { count: 0 }) {
    assert(depth <= 24 && ++budget.count <= 2000000, "Die Sicherung ist zu umfangreich oder zu tief verschachtelt.");
    if (!value || typeof value !== "object") return;
    for (const key of Object.keys(value)) {
      assert(!["__proto__", "prototype", "constructor"].includes(key), "Die Sicherung enthält einen unzulässigen Feldnamen.");
      tree(value[key], depth + 1, budget);
    }
  }
  function review(value, iso) {
    assert(date(iso) && object(value), "Ein Tagesreview enthält ein ungültiges Datum oder Datenformat.");
    for (const key of ["prayers", "sunnahPrayers", "streaks", "roleReflections", "routineProgress", "mealCategories", "responsibility"]) {
      assert(value[key] == null || object(value[key]), `Das Feld ${key} hat ein ungültiges Format.`);
    }
    for (const key of ["activities", "stateCheckins"]) {
      assert(value[key] == null || (Array.isArray(value[key]) && value[key].every(object)), `Das Feld ${key} enthält ungültige Einträge.`);
    }
    for (const entry of value.stateCheckins || []) {
      for (const key of ["energy", "mood", "taqwa", "sleepQualityScore", "hydrationMl", "nutritionScore"]) {
        const number = entry[key];
        assert(number == null || number === "" || (["number", "string"].includes(typeof number) && Number.isFinite(Number(number))), `Ein Check-in enthält einen ungültigen Zahlenwert (${key}).`);
      }
      assert(entry.time == null || (typeof entry.time === "string" && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(entry.time)), "Ein Check-in enthält eine ungültige Uhrzeit.");
      for (const key of ["id", "slot", "note", "dreamNote", "emotion", "primaryRole"]) assert(entry[key] == null || typeof entry[key] === "string", `Ungültiger Check-in-Text (${key}).`);
    }
    for (const entry of value.activities || []) {
      assert((typeof entry.title === "string" || (entry.title == null && typeof entry.template === "string")) && (entry.role == null || typeof entry.role === "string"), "Eine Aktivität enthält ungültige Angaben.");
      assert(entry.weight == null || Number.isFinite(Number(entry.weight)), "Ein Aktivitätsgewicht ist ungültig.");
    }
    for (const key of ["role", "notes", "dreams", "gratitude1", "gratitude2", "responsibilityNote", "breakfast", "lunch", "dinner", "snack"]) {
      assert(value[key] == null || typeof value[key] === "string", `Das Textfeld ${key} hat ein ungültiges Format.`);
    }
    for (const key of ["water", "steps", "ramadanDays"]) assert(value[key] == null || value[key] === "" || (["string", "number"].includes(typeof value[key]) && Number.isFinite(Number(value[key]))), `Das Zahlenfeld ${key} ist ungültig.`);
    return value;
  }
  function routines(value) {
    assert(object(value), "Die Routinen haben ein ungültiges Format.");
    for (const item of Object.values(value)) {
      assert(object(item) && Array.isArray(item.items) && item.items.every(object), "Eine Routine enthält ungültige Schritte.");
      assert(item.title == null || typeof item.title === "string", "Ein Routinentitel ist ungültig.");
      for (const step of item.items) {
        for (const key of ["id", "title", "emoji", "context"]) assert(step[key] == null || typeof step[key] === "string", "Ein Routinenschritt enthält ungültigen Text.");
        assert(step.minutes == null || Number.isFinite(Number(step.minutes)), "Die Dauer eines Routinenschritts ist ungültig.");
        assert(step.steps == null || (Array.isArray(step.steps) && step.steps.length <= 20 && step.steps.every(value => typeof value === "string" && value.length <= 180)), "Die Feinschritte eines Routinenblocks sind ungültig.");
      }
    }
  }
  function payload(value) {
    assert(object(value), "Diese Datei ist keine gültige ROLEPLAY-Sicherung.");
    tree(value);
    assert(value.app == null || String(value.app).toLowerCase() === "roleplay", "Diese Sicherung gehört zu einer anderen App.");
    assert(value.schemaVersion == null || (Number.isInteger(value.schemaVersion) && value.schemaVersion >= 1 && value.schemaVersion <= 8), "Diese Sicherung benötigt eine neuere ROLEPLAY-Version.");
    assert(Array.isArray(value.reviews) && value.reviews.length <= 20000, "Die Tagesreviews fehlen oder sind zu umfangreich.");
    const dates = new Set();
    for (const item of value.reviews) {
      assert(object(item), "Ein Tagesreview ist ungültig.");
      review(item.data, item.date);
      assert(!dates.has(item.date), "Die Sicherung enthält ein Datum mehrfach.");
      dates.add(item.date);
    }
    if (value.routines != null) routines(value.routines);
    assert(value.settings == null || object(value.settings), "Die Einstellungen sind ungültig.");
    return value;
  }
  root.RPBackup = { payload, review, routines, date, tree, object, assert };
})(globalThis);
