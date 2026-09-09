const PRAYERS = ["Fajr", "Dhuhr", "ʿAsr", "Maghrib", "ʿIschāʾ"];
const SUNNAH_PRAYERS = ["2 vor Fajr", "Ḍuḥā", "vor Dhuhr", "nach Dhuhr", "nach Maghrib", "nach ʿIschāʾ", "Witr", "Qiyām"];
const SUNNAH_PRAYER_STATES = [
  { value: "", label: "Offen", icon: "○", short: "Offen" },
  { value: "Verrichtet", label: "Verrichtet", icon: "✓", short: "Verrichtet" },
  { value: "Nicht vorgesehen", label: "Heute nicht vorgesehen", icon: "–", short: "Nicht vorgesehen" }
];
const PRAYER_STATES = [
  { value: "", label: "Offen", icon: "○", short: "Offen" },
  { value: "Normal", label: "Gebetet", icon: "●", short: "Gebet" },
  { value: "Gemeinschaft", label: "Moschee", icon: "🕌", short: "Moschee" },
  { value: "Verspätet", label: "Verspätet", icon: "🕓", short: "Verspätet" },
  { value: "Nachgeholt", label: "Nachgeholt", icon: "↩️", short: "Nachgeholt" },
  { value: "Nicht gebetet", label: "Nicht gebetet", icon: "❌", short: "Nicht gebetet" }
];

const PRAYER_COLOR_META = {
  Fajr: { a: "#6D63F6", b: "#27C7E8" },
  Dhuhr: { a: "#FFD15C", b: "#F2A13B" },
  "ʿAsr": { a: "#F6A54C", b: "#EC6A55" },
  Maghrib: { a: "#F36D8B", b: "#B96AF2" },
  "ʿIschāʾ": { a: "#2F7FE9", b: "#20D6CA" }
};

const ROLES = [
  { name: "Ich-Person", emoji: "🫆", color: "#4AA8FF", text: "#174E7A" },
  { name: "Vitalist", emoji: "🧬", color: "#193C8C", text: "#FFFFFF" },
  { name: "Absolvent", emoji: "🎓", color: "#F07A32", text: "#6D2E09" },
  { name: "Unternehmer", emoji: "💰", color: "#F2C94C", text: "#5D4800" },
  { name: "Muslim", emoji: "🕋", color: "#2EC4B6", text: "#075C55" },
  { name: "Wirt", emoji: "🏡", color: "#8E2F45", text: "#FFFFFF" },
  { name: "Familienmensch", emoji: "💌", color: "#72C472", text: "#205B29" }
];

const STREAKS = [
  { key: "cannabisFree", label: "Cannabisfrei" },
  { key: "compulsionFree", label: "Begierde" },
  { key: "alcoholFree", label: "Alkoholfrei" },
  { key: "smokeFree", label: "Rauchfrei" }
];

const EMOTION_GROUPS = [
  { label: "Sehr positiv", options: [
    ["Euphorisch", "🤩 Euphorisch"], ["Erfüllt", "🌟 Erfüllt"], ["Freudig", "😄 Freudig"], ["Begeistert", "🥳 Begeistert"], ["Inspiriert", "💡 Inspiriert"], ["Stolz", "🙌 Stolz"]
  ]},
  { label: "Positiv & tragend", options: [
    ["Zufrieden", "🙂 Zufrieden"], ["Dankbar", "🥰 Dankbar"], ["Hoffnungsvoll", "🌤️ Hoffnungsvoll"], ["Zuversichtlich", "✨ Zuversichtlich"], ["Motiviert", "🔥 Motiviert"], ["Fokussiert", "🎯 Fokussiert"], ["Neugierig", "🔎 Neugierig"], ["Verbunden", "🤝 Verbunden"], ["Liebevoll", "💗 Liebevoll"], ["Sicher", "🛡️ Sicher"], ["Erleichtert", "😮‍💨 Erleichtert"]
  ]},
  { label: "Ruhig & ausgeglichen", options: [
    ["Friedlich", "🕊️ Friedlich"], ["Gelassen", "🧘 Gelassen"], ["Ruhig", "😌 Ruhig"], ["Geerdet", "🌿 Geerdet"], ["Klar", "🧭 Klar"], ["Ausgeglichen", "⚖️ Ausgeglichen"], ["Gottesfürchtig", "🤲 Gottesfürchtig"]
  ]},
  { label: "Neutral & gemischt", options: [
    ["Neutral", "😐 Neutral"], ["Nachdenklich", "🤔 Nachdenklich"], ["Sehnsüchtig", "🌙 Sehnsüchtig"], ["Unentschlossen", "↔️ Unentschlossen"], ["Verwirrt", "😵 Verwirrt"], ["Gelangweilt", "🥱 Gelangweilt"], ["Hungrig", "🍽️ Hungrig"], ["Müde", "😴 Müde"]
  ]},
  { label: "Belastet", options: [
    ["Unsicher", "😕 Unsicher"], ["Besorgt", "😟 Besorgt"], ["Enttäuscht", "😞 Enttäuscht"], ["Frustriert", "😣 Frustriert"], ["Traurig", "😔 Traurig"], ["Einsam", "🥺 Einsam"], ["Unruhig", "😬 Unruhig"], ["Gestresst", "😵‍💫 Gestresst"], ["Gereizt", "😤 Gereizt"], ["Ärgerlich", "😠 Ärgerlich"], ["Scham", "🫣 Scham"], ["Reue", "🥀 Reue"], ["Schuldig", "😞 Schuldig"], ["Versucht", "🧲 Versuchung"], ["Begehrlich", "❤️‍🔥 Große Begierde"]
  ]},
  { label: "Stark belastet", options: [
    ["Ängstlich", "😰 Ängstlich"], ["Panik", "😱 Panik"], ["Wütend", "😡 Wütend"], ["Überfordert", "😫 Überfordert"], ["Überreizt", "🤯 Überreizt"], ["Erschöpft", "🪫 Erschöpft"], ["Leer", "🫥 Leer"], ["Hoffnungslos", "🌑 Hoffnungslos"], ["Verzweifelt", "🕳️ Verzweifelt"], ["Krank", "🤒 Krank"], ["Schmerzen", "🤕 Schmerzen"]
  ]}
];

const EMOTIONS = [
  { value: "", label: "Noch nicht eingetragen" },
  ...EMOTION_GROUPS.flatMap(group => group.options.map(([value, label]) => ({ value, label, group: group.label })))
];

// Sichtbare Auswahl. Die Werte beschreiben nur Zusammenhänge mit Energie und Befinden,
// sie sind keine moralische Bewertung der Mahlzeit.
const MEAL_CATEGORY_META = {
  "": { label: "Kategorie auswählen …", score: null },
  none: { label: "Nichts gegessen", score: 28 },
  light: { label: "Leicht", score: 78 },
  balanced: { label: "Ausgewogen", score: 90 },
  protein: { label: "Eiweißreich", score: 84 },
  sweet: { label: "Süß", score: 52 },
  fatty: { label: "Fettig", score: 44 },
  fastfood: { label: "Stark verarbeitet", score: 36 },
  large: { label: "Sehr große Mahlzeit", score: 46 }
};

// Nicht mehr angebotene Kategorien aus älteren Versionen: bleiben lesbar und exportierbar,
// erscheinen aber nur noch dann im Dropdown, wenn sie tatsächlich gespeichert sind.
const LEGACY_MEAL_CATEGORY_META = {
  irregular: { label: "Unregelmäßig / nebenbei", score: 48 },
  mixed: { label: "Gemischt", score: 62 },
  other: { label: "Sonstiges", score: 60 }
};

function mealCategoryMeta(value) {
  return MEAL_CATEGORY_META[value] || LEGACY_MEAL_CATEGORY_META[value] || null;
}

const DREAM_CATEGORIES = [
  ["", "Nicht erfasst"],
  ["none", "Kein Traum erinnert"],
  ["pleasant", "Angenehm"],
  ["neutral", "Neutral"],
  ["unusual", "Ungewöhnlich"],
  ["burdening", "Belastend"],
  ["nightmare", "Alptraum"],
  ["relapse", "Konsum- oder Rückfalltraum"],
  ["wet", "Feuchter Traum"],
  ["spiritual", "Religiös oder bedeutsam empfunden"]
];

const SLEEP_CHOICES = [0, 1, 2, 4, 5, 6];

const SLEEP_LABELS = [
  "Sehr erholsam",
  "Erholsam",
  "Okay",
  "",
  "Unruhig",
  "Kaum Schlaf",
  "Kein Schlaf"
];

const SLEEP_COLORS = ["#38d4c3", "#53d38f", "#c6de5f", "#d9dee9", "#f7b54a", "#f47c5f", "#df4050"];

const STATE_BODY_OPTIONS = {
  fit: { label: "Fit", icon: "⚡", score: 95 },
  stable: { label: "Stabil", icon: "🌿", score: 75 },
  tired: { label: "Müde", icon: "😴", score: 52 },
  exhausted: { label: "Erschöpft", icon: "🥱", score: 28 },
  sick: { label: "Krank", icon: "🤒", score: 24 },
  pain: { label: "Schmerzen", icon: "🤕", score: 30 }
};

const STATE_MIND_OPTIONS = {
  clear: { label: "Klar", icon: "🧭", score: 92 },
  normal: { label: "Ausgeglichen", icon: "🧠", score: 72 },
  scattered: { label: "Ablenkbar", icon: "🫧", score: 54 },
  strained: { label: "Angespannt", icon: "〰️", score: 44 },
  overloaded: { label: "Überfordert", icon: "🌪️", score: 25 }
};

const STATE_MOTIVATION_OPTIONS = {
  driven: { label: "Entschlossen", icon: "🔥", score: 92 },
  available: { label: "Verfügbar", icon: "→", score: 72 },
  hesitant: { label: "Zögerlich", icon: "…", score: 54 },
  resistant: { label: "Starker Widerstand", icon: "↔", score: 36 },
  blocked: { label: "Blockiert", icon: "■", score: 20 }
};

const CONTEXT_OPTIONS = {
  supportive: { label: "Unterstützend", icon: "🤝", score: 92 },
  normal: { label: "Normal", icon: "🏠", score: 72 },
  pressure: { label: "Zeitdruck", icon: "⏱️", score: 46 },
  conflict: { label: "Konflikt", icon: "⚠️", score: 34 },
  overstimulating: { label: "Überreizend", icon: "🔊", score: 29 }
};

const SUPPORT_OPTIONS = {
  strong: { label: "Gut verfügbar", score: 95 },
  available: { label: "Bei Bedarf verfügbar", score: 75 },
  limited: { label: "Begrenzt", score: 48 },
  none: { label: "Nicht verfügbar", score: 28 }
};

/* Tagesphasen in chronologischer Reihenfolge: Morgen → Mittag → Nachmittag →
   Abend → Nacht. Die Schlüssel bleiben unverändert, damit gespeicherte
   Einträge weiterhin exakt zugeordnet werden. Die hinterlegten Uhrzeiten
   sind Vorschläge für neue Einträge und ändern gespeicherte Zeiten nie. */
const CHECKIN_SLOTS = [
  { key: "morning", label: "Morgens", icon: "🌅", time: "08:00", color: "#F2A93B" },
  { key: "midday", label: "Mittags", icon: "☀️", time: "13:00", color: "#E5B52E" },
  { key: "afternoon", label: "Nachmittags", icon: "🌤️", time: "16:00", color: "#E29A63" },
  { key: "evening", label: "Abends", icon: "🌇", time: "19:00", color: "#B268C4" },
  { key: "night", label: "Nacht", icon: "🌙", time: "07:00", color: "#6256C7" }
];
/* Verbindliche Reihenfolge der Tagesreise. Sie bestimmt allein, welcher
   Check-in als nächster offen ist – die Uhrzeit tut das ausdrücklich nicht.
   Ein neuer Tag beginnt deshalb immer mit „Morgen"; „Nacht" steht am Ende. */
const CHECKIN_CHRONOLOGY = ["morning", "midday", "afternoon", "evening", "night"];
// Tage vor Version 6 kennen nur vier Phasen; der Nachmittag fehlt dort.
const LEGACY_CHECKIN_CHRONOLOGY = ["morning", "midday", "evening", "night"];
const LOAD_OPTIONS = {
  low: { label: "Niedrig", score: 86, icon: "○" },
  normal: { label: "Normal", score: 62, icon: "◐" },
  high: { label: "Hoch", score: 28, icon: "●" }
};

const RESPONSIBILITY_SOURCE_LABELS = {
  role: "Rolle / Auftrag",
  relationship: "Beziehung",
  self: "Selbst übernommen",
  contract: "Beruf / Vertrag",
  law: "Recht / Norm",
  religion: "Religiöse Norm",
  cause: "Verursachung / Schutz"
};
const URGENCY_LABELS = { low: "gering", medium: "mittel", high: "hoch", immediate: "unmittelbar" };
const IMPACT_LABELS = { low: "gering", medium: "mittel", high: "hoch" };
const FLEXIBILITY_LABELS = { high: "hoch", medium: "mittel", low: "gering", none: "kein" };

const POSITIVE_EMOTIONS = new Set(["Euphorisch", "Erfüllt", "Freudig", "Begeistert", "Inspiriert", "Stolz", "Zufrieden", "Dankbar", "Hoffnungsvoll", "Zuversichtlich", "Motiviert", "Fokussiert", "Neugierig", "Verbunden", "Liebevoll", "Sicher", "Erleichtert", "Friedlich", "Gelassen", "Ruhig", "Geerdet", "Klar", "Ausgeglichen", "Gottesfürchtig"]);
const HEAVY_EMOTIONS = new Set(["Ängstlich", "Panik", "Wütend", "Überfordert", "Überreizt", "Erschöpft", "Leer", "Hoffnungslos", "Verzweifelt", "Krank", "Schmerzen"]);

/* ==========================================================================
   ZENTRALE KONFIGURATION DER ROLLENLOGIK
   Alle Grenzwerte, Gewichtungen und Rollentexte stehen ausschließlich hier.
   Die Oberfläche liest daraus – nirgends sonst werden diese Zahlen wiederholt.
   ========================================================================== */

/* Fünf verbindliche Modi, aufsteigend: Index 0 ist der schonendste Modus.
   Es gibt keine weiteren sichtbaren Modusbezeichnungen mehr. */
const MODE_LADDER = ["gentle", "minimum", "standard", "focus", "development"];

// Sichtbare Beschriftung und Farbe je Modus. Einzige Quelle für beides.
const MODES = [
  { key: "gentle",      label: "Schon-Modus",       icon: "◔", color: "#E77D4D" },
  { key: "minimum",     label: "Minimum",           icon: "⌁", color: "#E5A22E" },
  { key: "standard",    label: "Standard",          icon: "◐", color: "#27B9A9" },
  { key: "focus",       label: "Fokus",             icon: "◎", color: "#3D7BE8" },
  { key: "development", label: "Entwicklungsmodus", icon: "✦", color: "#7258E8" }
];

/* Frühere Modusschlüssel werden beim Laden auf die neue Fünfer-Systematik
   abgebildet. Gespeicherte Tage behalten dadurch ihre Aussage. */
const LEGACY_MODE_KEYS = {
  stabilization: "gentle", recovery: "gentle", protection: "gentle",
  maintenance: "minimum", balance: "standard", design: "focus", peak: "development"
};

function modeKey(value) {
  const mapped = LEGACY_MODE_KEYS[value] || value;
  return MODES.some(mode => mode.key === mapped) ? mapped : "";
}

function modeMeta(value) {
  const key = modeKey(value);
  return key ? MODES.find(mode => mode.key === key) : null;
}

/* Gewichtung des Zustands.

   STATE_WEIGHTS gilt ausschließlich für Check-ins ohne Gottesfurchtwert –
   also für den gesamten historischen Bestand. Diese Tage behalten dadurch
   unverändert ihre bisherige Aussage.

   STATE_WEIGHTS_TAQWA gilt für jeden Check-in, der einen Gottesfurchtwert
   enthält. */
const STATE_WEIGHTS = {
  mood: 0.58,
  energy: 0.42
};

const STATE_WEIGHTS_TAQWA = {
  mood: 0.36,
  energy: 0.32,
  taqwa: 0.32
};

// Untergrenze je Modus, bezogen auf den gewichteten Wert 0–100.
const MODE_THRESHOLDS = {
  gentle: 0,
  minimum: 40,
  standard: 55,
  focus: 70,
  development: 92
};

/* Schutzregeln. Sie können den Modus ausschließlich begrenzen, nie anheben –
   damit ein sehr niedriger Einzelwert nicht durch einen hohen anderen Wert
   wegkompensiert wird.

   hardFloor = erzwingt genau diesen Modus
   caps      = höchstens dieser Modus
   lift      = Ausnahme, die eine Begrenzung um n Stufen anheben darf        */
const MODE_RULES = {
  // Ein extrem niedriger Einzelwert bedeutet immer den Schon-Modus.
  hardFloor: { threshold: 15, mode: "gentle" },

  caps: [
    { when: { energyBelow: 25 }, cap: "gentle" },
    { when: { moodBelow: 25 }, cap: "gentle" },
    { when: { moodBelow: 35 }, cap: "minimum" },
    { when: { energyBelow: 35 }, cap: "minimum" }
  ],

  // Sehr gute Laune darf eine energiebedingte Begrenzung um eine Stufe anheben.
  lift: {
    when: { energyFrom: 25, energyTo: 34, moodFrom: 80 },
    steps: 1
  }
};

// Feste Tagesrollen. Schlüssel entspricht getDay() (0 = Sonntag).
const DAY_ROLE_MAP = {
  1: "ich",
  2: "vitalist",
  3: "absolvent",
  4: "unternehmer",
  5: "muslim",
  6: "wirt",
  0: "familienmensch"
};

/* Tagesrollen. Der Modus erteilt bewusst keine rollenspezifischen Aufgaben
   mehr – hier steht deshalb nur noch, wie die Rolle des Tages heißt. */
const ROLE_CONFIG = {
  ich: { label: "Ich", roleName: "Ich-Person" },
  vitalist: { label: "Vitalist", roleName: "Vitalist" },
  absolvent: { label: "Absolvent", roleName: "Absolvent" },
  unternehmer: { label: "Unternehmer", roleName: "Unternehmer" },
  muslim: { label: "Muslim", roleName: "Muslim" },
  wirt: { label: "Wirt", roleName: "Wirt" },
  familienmensch: { label: "Familienmensch", roleName: "Familienmensch" }
};

const ROLE_TAGLINES = {
  "Ich-Person": "Heute bewusst bei dir selbst bleiben.",
  "Vitalist": "Heute in deinen Körper investieren.",
  "Absolvent": "Heute in Wissen und Abschluss investieren.",
  "Unternehmer": "Heute an deinen Vorhaben und deiner Zukunft bauen.",
  "Muslim": "Heute deine Verbindung zu Allah stärken.",
  "Wirt": "Heute Ordnung und Verantwortung zuhause tragen.",
  "Familienmensch": "Heute deiner Familie bewusst Zeit und Nähe geben."
};

/* --------------------------------------------------------------------------
   Berechnung
   -------------------------------------------------------------------------- */

function modeIndex(key) {
  const i = MODE_LADDER.indexOf(key);
  return i < 0 ? MODE_LADDER.indexOf("standard") : i;
}

/* Gewichteter Zustandswert. Liegt ein Gottesfurchtwert vor, gilt die
   Dreier-Gewichtung; fehlt er, bleibt es exakt bei der bisherigen
   Zwei-Werte-Rechnung. Es wird nie ein Wert ergänzt oder geschätzt. */
function stateScore(energy, mood, taqwa = null) {
  if (energy === null || energy === undefined || mood === null || mood === undefined) return null;
  const e = clamp(Number(energy), 0, 100);
  const m = clamp(Number(mood), 0, 100);
  if (taqwa === null || taqwa === undefined || taqwa === "") {
    return Math.round(m * STATE_WEIGHTS.mood + e * STATE_WEIGHTS.energy);
  }
  const t = clamp(Number(taqwa), 0, 100);
  return Math.round(m * STATE_WEIGHTS_TAQWA.mood + e * STATE_WEIGHTS_TAQWA.energy + t * STATE_WEIGHTS_TAQWA.taqwa);
}

// Modus aus dem Zustandswert, bevor Schutzregeln greifen.
function modeFromScore(score) {
  let result = MODE_LADDER[0];
  MODE_LADDER.forEach(key => { if (score >= MODE_THRESHOLDS[key]) result = key; });
  return result;
}

/* Ermittelt den Rollenmodus. Die Schutzregeln lesen ausschließlich Energie
   und Laune – eine hohe Gottesfurcht kann Erschöpfung deshalb niemals
   überstimmen, sondern nur den Ausgangswert innerhalb der Grenzen heben. */
function resolveMode(energy, mood, taqwa = null) {
  const score = stateScore(energy, mood, taqwa);
  if (score === null) return null;
  const e = clamp(Number(energy), 0, 100);
  const m = clamp(Number(mood), 0, 100);

  // Harte Untergrenze: ein extrem niedriger Wert bedeutet immer Schon-Modus.
  const floor = MODE_RULES.hardFloor;
  if (e <= floor.threshold || m <= floor.threshold) {
    return { key: floor.mode, score, capped: true, lifted: false };
  }

  const base = modeFromScore(score);
  let index = modeIndex(base);
  let capped = false;

  // Obergrenzen anwenden: die strengste gewinnt.
  MODE_RULES.caps.forEach(rule => {
    const hit = (rule.when.energyBelow !== undefined && e < rule.when.energyBelow)
      || (rule.when.moodBelow !== undefined && m < rule.when.moodBelow);
    if (!hit) return;
    const capIndex = modeIndex(rule.cap);
    if (capIndex <= index) { capped = capped || capIndex < index; index = Math.min(index, capIndex); }
  });

  // Ausnahme: sehr gute Laune hebt eine energiebedingte Begrenzung um eine Stufe.
  const lift = MODE_RULES.lift;
  let lifted = false;
  if (capped
      && e >= lift.when.energyFrom && e <= lift.when.energyTo
      && m >= lift.when.moodFrom) {
    const raised = Math.min(index + lift.steps, modeIndex(base));
    if (raised > index) { index = raised; lifted = true; }
  }

  return { key: MODE_LADDER[index], score, capped, lifted };
}

/* Tagesrolle aus dem Datum – fest zugeordnet, unabhängig vom Zustand.
   Ein aktiver Rollenfokus ersetzt die Rotation für den betroffenen Zeitraum. */
function dayRoleKey(iso = selectedDate) {
  const focus = roleFocusActiveOn(iso);
  if (focus) {
    const entry = Object.entries(ROLE_CONFIG).find(([, config]) => config.roleName === focus);
    if (entry) return entry[0];
  }
  return DAY_ROLE_MAP[new Date(`${iso}T12:00:00`).getDay()] || "ich";
}

function dayRoleConfig(iso = selectedDate) {
  return ROLE_CONFIG[dayRoleKey(iso)] || ROLE_CONFIG.ich;
}

/* ==========================================================================
   COACH-IMPULS
   Der Modus beschreibt Umfang, Tempo und Form des Handelns – nicht die
   Aufgaben. Der Coach besteht aus einem festen Kernsatz je Modus und einem
   deterministischen Zusatzsatz je Zustandskategorie. Gleiche Werte ergeben
   immer denselben Text; es gibt keinerlei Zufall.
   ========================================================================== */

const MODE_COACH_CORE = {
  gentle: "Fahr heute bewusst einen Gang runter.",
  minimum: "Mach es klein – aber geh den nächsten Schritt.",
  standard: "Du bist solide aufgestellt. Geh den Tag verlässlich an.",
  focus: "Bündele deine Kraft auf das, was heute wirklich zählt.",
  development: "Heute ist Raum, über das Gewohnte hinauszugehen."
};

const MODE_COACH_ADDITION = {
  gentle: {
    bothLow: "Halte den Tag leicht und entscheide nach jedem kleinen Schritt neu.",
    moodLeads: "Deine Stimmung trägt dich, aber deine Kraft braucht heute Maß.",
    energyLeads: "Kraft ist vorhanden, doch innerlich brauchst du heute weniger Druck.",
    balanced: "Ein ruhiger, leichter Rhythmus ist heute vollkommen angemessen.",
    bothHigh: "Trotz des Schwungs bleibt heute ein schonender Rahmen sinnvoll."
  },
  minimum: {
    bothLow: "Ein überschaubarer Anfang genügt; danach darfst du neu entscheiden.",
    moodLeads: "Deine Stimmung hilft dir beim Anfangen – teile deine Kraft dennoch klug ein.",
    energyLeads: "Warte nicht auf perfekte Motivation; ein klarer Anfang kann dich tragen.",
    balanced: "Ein verlässlicher nächster Schritt reicht als gute Richtung.",
    bothHigh: "Nutze den Schwung für einen klaren Schritt, ohne den Rahmen unnötig auszuweiten."
  },
  standard: {
    bothLow: "Halte den Rhythmus einfach und verlässlich, ohne zusätzlichen Druck.",
    moodLeads: "Die innere Bereitschaft ist da; plane deine Kraft mit Augenmaß.",
    energyLeads: "Energie ist verfügbar; ein klarer Rhythmus gibt ihr Richtung.",
    balanced: "Energie und Laune bilden eine tragfähige Basis.",
    bothHigh: "Die Basis trägt gut; bleib klar, statt unnötig zu beschleunigen."
  },
  focus: {
    bothLow: "Wähle einen einzigen Schwerpunkt und schütze deine verbleibende Kraft.",
    moodLeads: "Deine innere Bereitschaft ist stark; bündele sie, statt dich zu verzetteln.",
    energyLeads: "Kraft ist da; gib ihr eine klare Richtung, ohne auf den perfekten Antrieb zu warten.",
    balanced: "Du hast genug Stabilität für Tiefe – halte Ablenkungen klein.",
    bothHigh: "Energie und Laune ziehen gemeinsam – schütze deinen Fokus vor zu vielen Baustellen."
  },
  development: {
    bothLow: "Entwicklung bedeutet heute nicht mehr Menge, sondern eine kluge Verbesserung.",
    moodLeads: "Deine Begeisterung öffnet Raum; gib ihr eine klare Entwicklungsrichtung.",
    energyLeads: "Deine Kraft ist hoch; setze sie für Aufbau statt für bloßes Tempo ein.",
    balanced: "Setze einen mutigen Entwicklungsakzent, statt einfach nur mehr zu tun.",
    bothHigh: "Nutze den Schwung mutig – aber verliere dich nicht im bloßen Mehr."
  }
};

/* Zustandskategorie. Die Prüfreihenfolge ist verbindlich und darf nicht
   verändert werden: bothHigh, bothLow, moodLeads, energyLeads, balanced. */
function coachStateCategory(energy, mood) {
  const e = clamp(Number(energy), 0, 100);
  const m = clamp(Number(mood), 0, 100);
  if (e >= 80 && m >= 80) return "bothHigh";
  if (e < 40 && m < 40) return "bothLow";
  if (m - e >= 15) return "moodLeads";
  if (e - m >= 15) return "energyLeads";
  return "balanced";
}

/* Einzige Textquelle des Coaches. Hauptansicht und Check-in-Vorschau rufen
   ausschließlich diese Funktion auf – doppelte Logik gibt es nicht. */
function coachImpulse(energy, mood, key) {
  const mode = modeMeta(key);
  if (!mode || energy === null || energy === undefined || mood === null || mood === undefined) return null;
  const category = coachStateCategory(energy, mood);
  return {
    modeKey: mode.key,
    category,
    core: MODE_COACH_CORE[mode.key],
    addition: MODE_COACH_ADDITION[mode.key][category]
  };
}

/* Bedeutungsbeschreibung unter jedem der drei Regler.

   Für jeden möglichen Reglerwert steht genau ein fester Text: 21 Stufen je
   Regler (0, 5, 10 … 100), insgesamt 63 Texte. Es gibt keinen Zufall und
   keine wechselnden Formulierungen; gleiche Werte ergeben immer denselben
   Satz. Die Texte beschreiben ausschließlich das eigene Erleben – sie
   bewerten nicht und stellen keine Aufgabe.

   Gottesfurcht beschreibt dabei ausdrücklich nur das eigene Erleben von
   Gottesbewusstsein, niemals Allahs tatsächliche Nähe. */
const SLIDER_MEANING_STEPS = Array.from({ length: 21 }, (_, index) => index * 5);

const SLIDER_MEANINGS = {
  energy: {
    0: "Keine nutzbare Reserve – vollständige Entlastung steht im Vordergrund.",
    5: "Fast keine Kraft – selbst kleine Anforderungen kosten viel.",
    10: "Kaum Reserven – nur das Nötigste ist heute realistisch.",
    15: "Sehr wenig Energie – kleine Schritte und Pausen sind angemessen.",
    20: "Wenig Kraft – ein reduziertes Tempo schützt die verbleibende Energie.",
    25: "Begrenzte Reserve – ein kleiner, klarer Schritt ist gut machbar.",
    30: "Noch eher kraftarm – Umfang und Tempo sollten überschaubar bleiben.",
    35: "Etwas Energie ist da – ein ruhiges Pensum ist realistisch.",
    40: "Grundenergie vorhanden – einfache Aufgaben sind gut tragbar.",
    45: "Solide Basis – ein normales, begrenztes Pensum ist möglich.",
    50: "Mittlere Energie – Alltag und einzelne Anforderungen sind machbar.",
    55: "Ausreichende Kraft – verlässliches Handeln ist gut möglich.",
    60: "Stabile Energie – ein normales Pensum ist gut tragbar.",
    65: "Gute Reserven – auch konzentriertes Arbeiten ist möglich.",
    70: "Deutlich belastbar – anspruchsvollere Aufgaben passen heute gut.",
    75: "Viel Energie – Tempo und Tiefe können bewusst erhöht werden.",
    80: "Hohe Kraft – auch größere Vorhaben sind realistisch.",
    85: "Sehr gute Reserven – längere Konzentration ist gut möglich.",
    90: "Sehr hohe Energie – es besteht viel Handlungsspielraum.",
    95: "Nahezu volle Kraft – besonders anspruchsvolle Schritte sind tragbar.",
    100: "Volle Energie – die verfügbare Handlungsfähigkeit ist maximal."
  },
  mood: {
    0: "Extrem gedrückt – der Moment fühlt sich kaum tragbar an.",
    5: "Sehr stark gedrückt – fast alles wirkt gerade schwer.",
    10: "Deutlich gedrückt – Milde mit dir ist angemessen.",
    15: "Stark gedämpft – Leichtigkeit ist im Moment kaum erreichbar.",
    20: "Niedrige Stimmung – vieles kostet spürbar mehr Überwindung.",
    25: "Gedrückt – positive Impulse kommen nur schwer durch.",
    30: "Eher niedergeschlagen – der Tag fühlt sich belastet an.",
    35: "Gedämpfte Stimmung – einzelne gute Momente bleiben erreichbar.",
    40: "Leicht gedrückt – Belastendes steht noch im Vordergrund.",
    45: "Etwas unter der eigenen Mitte – die Stimmung bleibt verhalten.",
    50: "Neutral – weder deutlich belastet noch besonders getragen.",
    55: "Leicht aufgehellt – erste positive Energie ist spürbar.",
    60: "Ziemlich ausgeglichen – der Tag fühlt sich grundsätzlich stimmig an.",
    65: "Gute Stimmung – vieles fällt etwas leichter.",
    70: "Deutlich positiv – Offenheit und Zuversicht sind spürbar.",
    75: "Sehr gute Grundstimmung – Vorhaben fühlen sich zugänglich an.",
    80: "Freudige Stimmung – der Tag wird offen und zugewandt erlebt.",
    85: "Sehr positiv – Motivation und Verbundenheit sind deutlich spürbar.",
    90: "Ausgesprochen gute Stimmung – Leichtigkeit trägt das Handeln.",
    95: "Fast euphorisch – sehr viel Freude und Schwung sind vorhanden.",
    100: "Höchste Stimmung – vollständige Begeisterung und Leichtigkeit sind spürbar."
  },
  taqwa: {
    0: "Gottesbewusstsein ist im eigenen Erleben kaum zugänglich.",
    5: "Sehr große innere Distanz – die Ausrichtung auf Allah tritt stark zurück.",
    10: "Sehr fern – Gottesbewusstsein spielt gerade kaum eine Rolle.",
    15: "Kaum spürbar – die innere Hinwendung bleibt schwach.",
    20: "Fern – die Verbindung wird nur vereinzelt wahrgenommen.",
    25: "Noch deutlich fern – die Erinnerung an Allah erreicht den Alltag selten.",
    30: "Eher fern – Gottesbewusstsein erscheint nur in einzelnen Momenten.",
    35: "Erste Nähe – die Hinwendung wird zeitweise wieder spürbar.",
    40: "Leicht präsent – Gottesbewusstsein begleitet einzelne Entscheidungen.",
    45: "Im Hintergrund vorhanden – die Ausrichtung ist noch wechselhaft.",
    50: "Spürbar vorhanden – Nähe und Distanz halten sich die Waage.",
    55: "Regelmäßig präsent – Gottesbewusstsein begleitet den Alltag zunehmend.",
    60: "Stabil vorhanden – die Ausrichtung wirkt in mehreren Situationen.",
    65: "Deutlich präsent – Absichten werden bewusster auf Allah ausgerichtet.",
    70: "Nah – Gottesbewusstsein prägt viele Entscheidungen.",
    75: "Spürbare Nähe – Handeln und Absicht greifen zunehmend ineinander.",
    80: "Sehr nah – die Ausrichtung auf Allah trägt den Tag.",
    85: "Tiefe Nähe – Gottesbewusstsein bleibt auch im Handeln gegenwärtig.",
    90: "Sehr starke Präsenz – Absicht und Verhalten sind klar ausgerichtet.",
    95: "Fast durchgehend nah – Gottesbewusstsein prägt den gesamten Tag.",
    100: "Durchgehend gegenwärtig – Gottesbewusstsein trägt Absicht und Handeln."
  }
};

/* Nur für die Textauswahl wird auf den nächsten Fünferschritt gerundet –
   ältere Zwischenwerte behalten ihren gespeicherten Originalwert. */
function sliderMeaningStep(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return null;
  return Math.round(clamp(numeric, 0, 100) / 5) * 5;
}

function sliderMeaning(kind, value) {
  const texts = SLIDER_MEANINGS[kind];
  if (!texts) return "";
  if (value === null || value === undefined || value === "") return "";
  const step = sliderMeaningStep(value);
  if (step === null) return "";
  return texts[step] || "";
}

const RESPONSIBILITY_KEYS = ["situationState", "responsibilityClarity", "roleScope", "appropriateness", "effectLearning"];
const ROLE_REFLECTION_ORDER = ["", "fulfilled", "adapted", "deferred", "missed", "overextended"];
const ROLE_REFLECTION_META = {
  "": { label: "Nicht reflektiert", short: "Offen", icon: "○", score: null },
  fulfilled: { label: "Verantwortungsvoll erfüllt", short: "Erfüllt", icon: "✓", score: 2 },
  adapted: { label: "Verantwortungsvoll angepasst", short: "Angepasst", icon: "≈", score: 2 },
  deferred: { label: "Verantwortungsvoll zurückgestellt", short: "Zurückgestellt", icon: "↷", score: 2 },
  missed: { label: "Nicht angemessen beantwortet", short: "Versäumt", icon: "×", score: 0 },
  overextended: { label: "Rolle überdehnt", short: "Überdehnt", icon: "!", score: 0 }
};

const ROUTINE_STATE_ORDER = ["", "done", "missed", "responsiblySkipped"];
const TASK_STATE_META = {
  "": { label: "Offen", short: "Offen", icon: "–", score: null, className: "open" },
  done: { label: "Erledigt", short: "Erledigt", icon: "✓", score: 1, className: "done" },
  responsiblySkipped: { label: "Gewissenhaft", short: "Gewissenhaft", icon: "✓", score: 1, className: "conscientious" },
  missed: { label: "Nicht erledigt", short: "Nicht erledigt", icon: "×", score: 0, className: "missed" }
};

const STREAK_DAILY_STATES = {
  "": { label: "Heute offen", short: "Offen", score: null },
  protected: { label: "Geschützt", short: "Geschützt", score: 1 },
  resisted: { label: "Herausforderung widerstanden", short: "Widerstanden", score: 1 },
  lapse: { label: "Unterbrechung", short: "Unterbrochen", score: 0 }
};

const ALLAH_NAMES = [
"الرَّحْمَن / Ar-Rahmān – Der Allerbarmer",
"الرَّحِيم / Ar-Rahīm – Der Barmherzige",
"الْمَلِك / Al-Malik – Der König",
"الْقُدُّوس / Al-Quddūs – Der Heilige",
"السَّلَام / As-Salām – Der Frieden",
"الْمُؤْمِن / Al-Muʾmin – Der Gewährer der Sicherheit",
"الْمُهَيْمِن / Al-Muhaymin – Der Beschützer",
"الْعَزِيز / Al-ʿAzīz – Der Allmächtige",
"الْجَبَّار / Al-Jabbār – Der Bezwinger",
"الْمُتَكَبِّر / Al-Mutakabbir – Der Erhabene",
"الْخَالِق / Al-Khāliq – Der Schöpfer",
"الْبَارِئ / Al-Bāriʾ – Der Erschaffer",
"الْمُصَوِّر / Al-Musawwir – Der Gestalter",
"الْغَفَّار / Al-Ghaffār – Der stets Vergebende",
"الْقَهَّار / Al-Qahhār – Der Allbezwinger",
"الْوَهَّاب / Al-Wahhāb – Der Schenkende",
"الرَّزَّاق / Ar-Razzāq – Der Versorger",
"الْفَتَّاح / Al-Fattāh – Der Öffnende",
"الْعَلِيم / Al-ʿAlīm – Der Allwissende",
"الْقَابِض / Al-Qābid – Der Zurückhaltende",
"الْبَاسِط / Al-Bāsit – Der Gewährende",
"الْخَافِض / Al-Khāfid – Der Erniedrigende",
"الرَّافِع / Ar-Rāfiʿ – Der Erhöhende",
"الْمُعِزّ / Al-Muʿizz – Der Ehrende",
"الْمُذِلّ / Al-Mudhill – Der Demütigende",
"السَّمِيع / As-Samīʿ – Der Allhörende",
"الْبَصِير / Al-Basīr – Der Allsehende",
"الْحَكَم / Al-Hakam – Der Richter",
"الْعَدْل / Al-ʿAdl – Der Gerechte",
"اللَّطِيف / Al-Latīf – Der Feinfühlige",
"الْخَبِير / Al-Khabīr – Der Kundige",
"الْحَلِيم / Al-Halīm – Der Nachsichtige",
"الْعَظِيم / Al-ʿAzīm – Der Gewaltige",
"الْغَفُور / Al-Ghafūr – Der Allvergebende",
"الشَّكُور / Ash-Shakūr – Der Dankbar Anerkennende",
"الْعَلِيّ / Al-ʿAliyy – Der Höchste",
"الْكَبِير / Al-Kabīr – Der Große",
"الْحَفِيظ / Al-Hafīz – Der Bewahrende",
"الْمُقِيت / Al-Muqīt – Der Ernährende",
"الْحَسِيب / Al-Hasīb – Der Abrechnende",
"الْجَلِيل / Al-Jalīl – Der Majestätische",
"الْكَرِيم / Al-Karīm – Der Großzügige",
"الرَّقِيب / Ar-Raqīb – Der Wachende",
"الْمُجِيب / Al-Mujīb – Der Erhörende",
"الْوَاسِع / Al-Wāsiʿ – Der Allumfassende",
"الْحَكِيم / Al-Hakīm – Der Allweise",
"الْوَدُود / Al-Wadūd – Der Liebevolle",
"الْمَجِيد / Al-Majīd – Der Ruhmreiche",
"الْبَاعِث / Al-Bāʿith – Der Erweckende",
"الشَّهِيد / Ash-Shahīd – Der Zeuge",
"الْحَق / Al-Haqq – Die Wahrheit",
"الْوَكِيل / Al-Wakīl – Der Sachwalter",
"الْقَوِي / Al-Qawiyy – Der Starke",
"الْمَتِين / Al-Matīn – Der Unerschütterliche",
"الْوَلِي / Al-Waliyy – Der Schutzherr",
"الْحَمِيد / Al-Hamīd – Der Lobenswerte",
"الْمُحْصِي / Al-Muhsī – Der alles Erfassende",
"الْمُبْدِئ / Al-Mubdiʾ – Der Urheber",
"الْمُعِيد / Al-Muʿīd – Der Wiederbringende",
"الْمُحْيِي / Al-Muhyī – Der Lebensspendende",
"الْمُمِيت / Al-Mumīt – Der den Tod Bestimmende",
"الْحَي / Al-Hayy – Der Lebendige",
"الْقَيُّوم / Al-Qayyūm – Der Beständige",
"الْوَاجِد / Al-Wājid – Der Findende",
"الْمَاجِد / Al-Mājid – Der Edle",
"الْوَاحِد / Al-Wāhid – Der Eine",
"الْأَحَد / Al-Ahad – Der Einzige",
"الصَّمَد / As-Samad – Der Absolute",
"الْقَادِر / Al-Qādir – Der Mächtige",
"الْمُقْتَدِر / Al-Muqtadir – Der vollkommen Mächtige",
"الْمُقَدِّم / Al-Muqaddim – Der Voranstellende",
"الْمُؤَخِّر / Al-Muʾakhkhir – Der Aufschiebende",
"الْأَوَّل / Al-Awwal – Der Erste",
"الْآخِر / Al-Ākhir – Der Letzte",
"الظَّاهِر / Az-Zāhir – Der Offenbare",
"الْبَاطِن / Al-Bātin – Der Verborgene",
"الْوَالِي / Al-Wālī – Der Herrschende",
"الْمُتَعَالِي / Al-Mutaʿālī – Der überaus Erhabene",
"الْبَر / Al-Barr – Der Gütige",
"التَّوَّاب / At-Tawwāb – Der Reue Annehmende",
"الْمُنْتَقِم / Al-Muntaqim – Der Vergelter",
"العَفُو / Al-ʿAfuww – Der Verzeihende",
"الرَّؤُوف / Ar-Raʾūf – Der Mitfühlende",
"مَالِكُ الْمُلْك / Mālik al-Mulk – Der Besitzer aller Herrschaft",
"ذُوالْجَلَالِ وَالْإِكْرَام / Dhul-Jalāli wal-Ikrām – Der Herr von Majestät und Ehre",
"الْمُقْسِط / Al-Muqsit – Der Ausgleichend Gerechte",
"الْجَامِع / Al-Jāmiʿ – Der Versammelnde",
"الْغَنِي / Al-Ghaniyy – Der Unabhängige",
"الْمُغْنِي / Al-Mughnī – Der Reichmachende",
"الْمَانِع / Al-Māniʿ – Der Abwehrende",
"الضَّار / Ad-Dārr – Der Schaden Zulassende",
"النَّافِع / An-Nāfiʿ – Der Nutzen Gewährende",
"النُّور / An-Nūr – Das Licht",
"الْهَادِي / Al-Hādī – Der Rechtleitende",
"الْبَدِيع / Al-Badīʿ – Der unvergleichliche Schöpfer",
"الْبَاقِي / Al-Bāqī – Der Bleibende",
"الْوَارِث / Al-Wārith – Der Erbe",
"الرَّشِيد / Ar-Rashīd – Der Rechtleitende",
"الصَّبُور / As-Sabūr – Der Geduldige"
];

const DEFAULT_ROUTINES = {
  morning: {
    key: "morning",
    title: "Morgenroutine",
    description: "Starte deinen Tag mit Klarheit und Fokus.",
    theme: "morning",
    autoNext: false,
    items: [
      { id: "m-candle", emoji: "🕯️", title: "Kerze", minutes: 1, context: "Alles Lob gebührt Allah, Der uns nach dem Tod wieder lebendig machte - und zu Ihm ist die Auferstehung." },
      { id: "m-medicine-cat", emoji: "🔛", title: "Tabletten / Katze", minutes: 3, context: "Medikamente einnehmen, Wasser trinken und Zizo versorgen." },
      { id: "m-ibada", emoji: "🧎🏻", title: "Ibāda", minutes: 25, context: "Gebet, Dhikr und eine bewusste Hinwendung zu Allah." },
      { id: "m-sport", emoji: "🤸🏻", title: "Sport", minutes: 5, context: "Kurz aktiv werden. Entscheidend ist, überhaupt anzufangen." },
      { id: "m-bed", emoji: "🛏️", title: "Fertigmachen + Bett", minutes: 15, context: "Waschen, anziehen, Bett machen und den Raum in Ordnung bringen." },
      { id: "m-breakfast", emoji: "🥗", title: "Frühstücken", minutes: 2, context: "Frühstück vorbereiten oder bewusst einplanen." },
      { id: "m-thumb-yoga", emoji: "🪷", title: "Daumen Yoga", minutes: 3, context: "Kurze Mobilisation der Hände und Finger." },
      { id: "m-quizlet", emoji: "📋", title: "Quizlet", minutes: 5, context: "Wiederholung statt Perfektion." },
      { id: "m-peak", emoji: "💡", title: "Peak", minutes: 15, context: "Kognitives Training konzentriert durchführen." },
      { id: "m-english", emoji: "🔤", title: "Englisch", minutes: 25, context: "Eine klar definierte Lerneinheit abschließen." },
      { id: "m-arabic", emoji: "📒", title: "Arabisch", minutes: 5, context: "Auch eine kurze Wiederholung zählt." },
      { id: "m-writing", emoji: "📝", title: "Schreiben", minutes: 10, context: "Gedanken festhalten oder am Buch weiterarbeiten." },
      { id: "m-finish", emoji: "🎒", title: "Fertigmachen", minutes: 5, context: "Alles Nötige einpacken und den nächsten Übergang vorbereiten." }
    ]
  },
  evening: {
    key: "evening",
    title: "Abendroutine",
    description: "Schließe deinen Tag bewusst und ruhig ab.",
    theme: "evening",
    autoNext: false,
    items: [
      { id: "e-candle-1", emoji: "🕯️", title: "Kerze", minutes: 2.5, context: "https://diegebetszeiten.de/koran/al-ihlas\n\nOh Allah, hilf mir, Deiner zu gedenken, Dir zu danken und Dir auf die beste Weise zu dienen" },
      { id: "e-clothes", emoji: "👕", title: "Kleidung", minutes: 10, context: "Kleidung für den nächsten Tag vollständig bereitlegen." },
      { id: "e-bathroom", emoji: "🧼", title: "Badezimmer", minutes: 5, context: "Waschen, Zähne putzen und dich ruhig auf die Nacht einstellen." },
      { id: "e-kitchen", emoji: "🍵", title: "Küche", minutes: 10, context: "Küche kurz ordnen und alles für morgen sauber hinterlassen." },
      { id: "e-plan", emoji: "🗓️", title: "Tag vorbereiten", minutes: 5, context: "Kurz den morgigen Tag gedanklich vorbereiten." },
      { id: "e-weekplan", emoji: "📋", title: "Wochenplan", minutes: 10, context: "Plane bewusst und prüfe, was morgen wirklich wichtig ist." },
      { id: "e-quizlet", emoji: "📰", title: "Quizlet", minutes: 5, context: "Nur eine kurze Wiederholung – Kontinuität zählt." },
      { id: "e-english", emoji: "🔤", title: "Englisch", minutes: 10, context: "Lerneinheit abschließen oder kurz wiederholen." },
      { id: "e-arabic", emoji: "📒", title: "Arabisch", minutes: 5, context: "Eine kurze Wiederholung oder ein kleiner Lernschritt reicht aus." },
      { id: "e-candle-2", emoji: "🕯️", title: "Kerze", minutes: 2.5, context: "https://diegebetszeiten.de/koran/al-baqara/#255\n\nĀyat al-Kursī lesen und den Tag im Gedenken an Allah abschließen." }
    ]
  }
};

// Dauerauswahl im Schritt-Editor: 1 bis 180 Minuten als native iOS-Auswahl.
/* ==========================================================================
   GEWICHTETE AKTIVITÄTEN
   Jede Aktivität entsteht aus genau einer Vorlage. Titel, Rolle und Gewicht
   stehen ausschließlich hier – es gibt keine manuelle Punkteingabe.
   ========================================================================== */
const ACTIVITY_TEMPLATES = [
  { key: "sma",     label: "SMA-Arbeitstag",   title: "SMA-Arbeitstag",   role: "Unternehmer",    weight: 0.2, isSma: true, dailyCap: 0.2 },
  { key: "book",    label: "Buchprojekt",      title: "Buchprojekt",      role: "Unternehmer",    weight: 1.5 },
  { key: "gym",     label: "Gym",              title: "Gym",              role: "Vitalist",       weight: 2.0 },
  { key: "arabic",  label: "Arabisch lernen",  title: "Arabisch lernen",  role: "Muslim",         weight: 1.5 },
  { key: "jumua",   label: "Jumʿa",            title: "Jumʿa",            role: "Muslim",         weight: 2.0, dailyCap: 2.0 },
  { key: "mosque",  label: "Moschee",          title: "Moschee",          role: "Muslim",         weight: 1.0, dailyCap: 1.0 },
  { key: "youth",   label: "Jugendgruppe",     title: "Jugendgruppe",     role: "Muslim",         weight: 2.0 },
  { key: "cleanup", label: "Clean Up",         title: "Clean Up",         role: "Wirt",           weight: 1.5 },
  { key: "family",  label: "Familienzeit",     title: "Familienzeit",     role: "Familienmensch", weight: 1.5 },
  { key: "custom",  label: "Eigene Aktivität", title: "",                 role: "",               weight: 1.0 }
];

function activityTemplate(key) {
  return ACTIVITY_TEMPLATES.find(template => template.key === key) || null;
}

/* Tagesbegrenzung einer Vorlage. Mehrere Einträge derselben begrenzten
   Vorlage an einem Kalendertag ergeben zusammen genau diesen Wert.
   Vorlagen ohne Begrenzung zählen pro tatsächlichem Eintrag. */
function activityDailyCap(key) {
  const template = activityTemplate(key);
  return template && Number.isFinite(template.dailyCap) ? template.dailyCap : null;
}

// Ein Kalendertag mit mindestens einem SMA-Eintrag ergibt insgesamt so viele Punkte.
const SMA_DAY_POINTS = activityDailyCap("sma");

/* Historische Titel dürfen einer Vorlage zugeordnet werden, wenn sie exakt
   übereinstimmen – unabhängig von Groß- und Kleinschreibung. Sonst wird
   nichts erraten. */
function templateForLegacyTitle(title) {
  const normalized = String(title || "").trim().toLowerCase();
  if (!normalized) return null;
  return ACTIVITY_TEMPLATES.find(template => template.key !== "custom" && template.title.toLowerCase() === normalized) || null;
}

/* Bringt eine gespeicherte Aktivität auf die aktuelle Form. Bestehende
   isSma-Markierungen werden übernommen; fehlt ein Gewicht, gilt 1 Punkt. */
function normalizeActivity(item) {
  const title = String(item?.title || "");
  const stored = activityTemplate(item?.template);
  const template = stored
    || (item?.isSma ? activityTemplate("sma") : null)
    || templateForLegacyTitle(title)
    || activityTemplate("custom");
  const isSma = template.key === "sma";
  const storedWeight = Number(item?.weight);
  const weight = template.key === "custom"
    ? (Number.isFinite(storedWeight) && storedWeight > 0 ? storedWeight : 1)
    : template.weight;
  return {
    title: isSma ? template.title : (title || template.title),
    role: template.key === "custom" ? getRole(item?.role || "Ich-Person").name : template.role,
    template: template.key,
    weight,
    isSma
  };
}

function roundPoints(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function formatPoints(value) {
  const rounded = roundPoints(value);
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/0$/, "");
  return text.replace(".", ",");
}

/* Punktzeilen eines Tages in Eingabereihenfolge. Mehrere Einträge einer
   tagesbegrenzten Vorlage (SMA-Arbeitstag, Moschee, Jumʿa) werden zu genau
   einer Zeile mit dem Tageswert zusammengefasst – dadurch stimmen
   Einzelwerte und Tagessumme immer exakt überein. */
function activityPointRows(data, date) {
  const activities = (data?.activities || []).map(normalizeActivity);
  const entriesPerTemplate = {};
  activities.forEach(activity => {
    if (activityDailyCap(activity.template) === null) return;
    entriesPerTemplate[activity.template] = (entriesPerTemplate[activity.template] || 0) + 1;
  });

  const counted = {};
  const rows = [];
  activities.forEach(activity => {
    const cap = activityDailyCap(activity.template);
    if (cap !== null) {
      if (counted[activity.template]) return;
      counted[activity.template] = true;
      rows.push({
        date,
        title: activity.title,
        role: activity.role,
        points: cap,
        template: activity.template,
        isSma: activity.isSma,
        capped: true,
        entries: entriesPerTemplate[activity.template],
        // Bestandsfeld: bleibt für ältere Auswertungen und Exporte lesbar.
        smaEntries: activity.isSma ? entriesPerTemplate[activity.template] : 0
      });
      return;
    }
    rows.push({
      date,
      title: activity.title,
      role: activity.role,
      points: activity.weight,
      template: activity.template,
      isSma: false,
      capped: false,
      entries: 1,
      smaEntries: 0
    });
  });
  return rows;
}

function dayPointTotal(data, date) {
  return roundPoints(activityPointRows(data, date).reduce((sum, row) => sum + row.points, 0));
}

const ROUTINE_MINUTE_CHOICES = Array.from({ length: 180 }, (_, index) => index + 1);
const APP_VERSION = "6.2.2";
const SCHEMA_VERSION = 7;
const STORAGE_NAMESPACE = "roleplay-v25";
const ROUTINES_STORAGE_KEY = `${STORAGE_NAMESPACE}-routines`;
const BACKUP_TIMESTAMP_KEY = `${STORAGE_NAMESPACE}-last-backup-at`;
const ROUTINE_SESSION_STORAGE_KEY = `${STORAGE_NAMESPACE}-active-routine-session`;
const ROLE_FOCUS_STORAGE_KEY = `${STORAGE_NAMESPACE}-role-focus`;
const WEEK_MODE_STORAGE_KEY = `${STORAGE_NAMESPACE}-week-mode`;
const $ = id => document.getElementById(id);

let selectedDate = todayISO();
let currentData = null;
let calendarCursor = firstOfMonth(selectedDate);
let routines = null;
let activeRoutineKey = null;
let editingRoutineItemId = null;
let activityDragIndex = null;
let routineDragIndex = null;
let routineSession = null;
let autoSaveTimer = null;
let streaksUnlocked = false;
let roleFocus = null;

function todayISO() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function dateToISO(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function addDays(iso, amount) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + amount);
  return dateToISO(d);
}

/* --------------------------------------------------------------------------
   Kalenderwochen
   Die Woche läuft immer von Montag bis Sonntag – kein gleitendes Fenster.
   -------------------------------------------------------------------------- */
function mondayOf(iso) {
  const d = new Date(`${iso}T12:00:00`);
  const shift = (d.getDay() + 6) % 7;   // Montag = 0
  d.setDate(d.getDate() - shift);
  return dateToISO(d);
}

// Stabiler Schlüssel einer Kalenderwoche: das Datum ihres Montags.
function firstOfMonth(iso) {
  return `${iso.slice(0, 7)}-01`;
}

function storageKey(date) { return `${STORAGE_NAMESPACE}-review-${date}`; }
function safeParse(text, fallback = null) { try { return JSON.parse(text); } catch { return fallback; } }
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function escapeHTML(value = "") { return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char])); }

function linkifyText(value = "") {
  const escaped = escapeHTML(value);
  return escaped
    .replace(/(https?:\/\/[^\s<]+)/gi, url => {
      const clean = url.replace(/[),.;!?]+$/, "");
      const suffix = url.slice(clean.length);
      return `<a href="${clean}" target="_blank" rel="noopener noreferrer">${clean}</a>${suffix}`;
    })
    .replace(/\n/g, "<br>");
}

function getRole(name) {
  const normalized = ["Yannick", "Ich"].includes(name) ? "Ich-Person" : name;
  return ROLES.find(role => role.name === normalized) || ROLES[0];
}

function roleDisplayName(name) {
  const role = getRole(name);
  return role.name === "Ich-Person" ? "Ich" : role.name;
}

/* Maskottchen sind absichtlich direkt eingebettet. Dadurch kann beim Upload
   auf GitHub keine Bilddatei oder Unterordner-Struktur mehr fehlen. */
const ROLE_MASCOT_IMAGES = {
  'Ich-Person': "data:image/webp;base64,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",
  'Vitalist': "data:image/webp;base64,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",
  'Absolvent': "data:image/webp;base64,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",
  'Unternehmer': "data:image/webp;base64,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",
  'Muslim': "data:image/webp;base64,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",
  'Wirt': "data:image/webp;base64,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",
  'Familienmensch': "data:image/webp;base64,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"
};

const ROLE_SPEECHES = {
  "Ich-Person": [
    "Ich bin jemand, der seinen neuen Lebensweg bewusst lebt … Inshallah",
    "2026 werden Routinen und Gebete wieder mein Fundament … Inshallah",
    "Ich kehre nach Unterbrechungen bewusst in meine Struktur zurück … Inshallah",
    "Mein Alltag wird stabiler und geordneter … Inshallah",
    "Meinen neuen Lebensweg festigen … Inshallah"
  ],
  "Vitalist": [
    "Ich schütze meine körperliche und psychische Gesundheit … Inshallah",
    "2026 möchte ich Gesundheit und Stabilität weiter stärken … Inshallah",
    "Training, Abstinenz und Therapie tragen mein System … Inshallah",
    "Bewegung wird wieder ein fester Bestandteil meines Lebens … Inshallah",
    "Meine Gesundheit schützen und stärken … Inshallah"
  ],
  "Absolvent": [
    "Ich bin ein Lernender, der kontinuierlich wächst … Inshallah",
    "2026 baue ich eine verlässliche Arabisch-Grundlage auf … Inshallah",
    "Ich lerne jede Woche Arabisch und bleibe dran … Inshallah",
    "Wortschatz und Verständnis wachsen sichtbar … Inshallah",
    "Arabisch Schritt für Schritt erschließen … Inshallah"
  ],
  "Unternehmer": [
    "Ich verwandle Ideen Schritt für Schritt in reale Produkte … Inshallah",
    "2026 bringe ich ROLEPLAY in eine veröffentlichte Realität … Inshallah",
    "Ich arbeite kontinuierlich an Buch und App … Inshallah",
    "Buch und App werden sichtbar weiterentwickelt … Inshallah",
    "ROLEPLAY Wirklichkeit werden lassen … Inshallah"
  ],
  "Muslim": [
    "Ich nehme meine Verpflichtungen ernst und kehre zurück … Inshallah",
    "Bis zum nächsten Ramadan hole ich offene Fastentage nach … Inshallah",
    "Ich faste regelmäßig, solange noch Tage offen sind … Inshallah",
    "Die offenen Fastentage sinken bis auf null … Inshallah",
    "Meine Verpflichtungen erfüllen und zurückkehren … Inshallah"
  ],
  "Wirt": [
    "Ich übernehme Verantwortung für mein Zuhause … Inshallah",
    "2026 bringe ich meinen Keller in einen geordneten Zustand … Inshallah",
    "Ich sortiere, entsorge und räume Schritt für Schritt … Inshallah",
    "Ordnung und Nutzbarkeit werden sichtbar besser … Inshallah",
    "Mein Zuhause ordnen und erhalten … Inshallah"
  ],
  "Familienmensch": [
    "Ich bin für meine Familie präsent und verlässlich … Inshallah",
    "Familie soll bewusst Raum in meinem Jahr haben … Inshallah",
    "Ich halte Kontakt und nehme mir bewusst Zeit … Inshallah",
    "Nähe und Verbundenheit werden im Alltag sichtbar … Inshallah",
    "Für meine Familie präsent sein … Inshallah"
  ]
};

function roleSpeechText(roleName, date = selectedDate) {
  const lines = ROLE_SPEECHES[roleName] || ROLE_SPEECHES["Ich-Person"];
  const seed = `${date}|${roleName}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash + seed.charCodeAt(i) * (i + 1)) >>> 0;
  return lines[hash % lines.length];
}

function updateHeaderRoleUI(role = getRole($("dayRole")?.value || currentData?.role || ROLES[0].name)) {
  if ($("roleHeroIcon")) $("roleHeroIcon").textContent = role.emoji;
  if ($("roleHeroName")) $("roleHeroName").textContent = roleDisplayName(role.name);
  if ($("mascotQuote")) $("mascotQuote").textContent = roleSpeechText(role.name);
  if ($("roleMascotImage")) {
    $("roleMascotImage").src = ROLE_MASCOT_IMAGES[role.name] || ROLE_MASCOT_IMAGES["Ich-Person"];
    $("roleMascotImage").alt = `${roleDisplayName(role.name)}-Maskottchen`;
  }
}

/* ==========================================================================
   ROLLENFOKUS
   Eine Rolle ersetzt vorübergehend die feste Wochenrotation. Der Fokus wird
   eigenständig gespeichert, im Backup mitgeführt und ist jederzeit eindeutig
   beendbar. Bereits gespeicherte Tage werden dadurch nie verändert.
   ========================================================================== */
const ROLE_FOCUS_MODES = ["today", "days", "until", "manual"];

function normalizeRoleFocus(raw) {
  if (!raw || typeof raw !== "object") return null;
  const role = ROLES.some(item => item.name === raw.role) ? raw.role : "";
  if (!role) return null;
  const mode = ROLE_FOCUS_MODES.includes(raw.mode) ? raw.mode : "manual";
  const isDate = value => /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
  const startDate = isDate(raw.startDate) ? raw.startDate : todayISO();
  const endDate = isDate(raw.endDate) ? raw.endDate : "";
  if (mode !== "manual" && !endDate) return null;
  return { role, mode, startDate, endDate };
}

function loadRoleFocus() {
  const stored = normalizeRoleFocus(safeParse(localStorage.getItem(ROLE_FOCUS_STORAGE_KEY)));
  // Ein abgelaufener Fokus endet von selbst und wird nicht weitergeschleppt.
  roleFocus = stored && stored.endDate && stored.endDate < todayISO() ? null : stored;
  if (stored && !roleFocus) localStorage.removeItem(ROLE_FOCUS_STORAGE_KEY);
  return roleFocus;
}

function saveRoleFocus() {
  if (roleFocus) localStorage.setItem(ROLE_FOCUS_STORAGE_KEY, JSON.stringify(roleFocus));
  else localStorage.removeItem(ROLE_FOCUS_STORAGE_KEY);
}

// Rollenname, wenn an diesem Datum ein Fokus gilt – sonst null.
function roleFocusActiveOn(iso) {
  if (!roleFocus) return null;
  if (iso < roleFocus.startDate) return null;
  if (roleFocus.endDate && iso > roleFocus.endDate) return null;
  return roleFocus.role;
}

function roleFocusIsActive() {
  return Boolean(roleFocusActiveOn(todayISO()));
}

function roleFocusRangeLabel() {
  if (!roleFocus) return "";
  if (roleFocus.mode === "manual") return "bis manuell beendet";
  if (roleFocus.startDate === roleFocus.endDate) return `nur ${formatShortDate(roleFocus.endDate)}`;
  return `bis ${formatLongDate(roleFocus.endDate)}`;
}

function defaultRoleForDate(date) {
  const focus = roleFocusActiveOn(date);
  if (focus) return focus;
  const weekday = new Date(`${date}T12:00:00`).getDay();
  const names = ["Familienmensch", "Ich-Person", "Vitalist", "Absolvent", "Unternehmer", "Muslim", "Wirt"];
  return names[weekday];
}

function findPreviousReview(date) {
  let cursor = date;
  for (let i = 0; i < 3650; i += 1) {
    cursor = addDays(cursor, -1);
    const rawText = localStorage.getItem(storageKey(cursor));
    if (!rawText) continue;
    const data = safeParse(rawText);
    if (data) return { date: cursor, data };
  }
  return null;
}

function inheritedStreaks(previousData) {
  return Object.fromEntries(STREAKS.map(streak => {
    const old = previousData?.streaks?.[streak.key];
    const previousDays = typeof old === "object" && old !== null ? Number(old.days || 0) : 0;
    const wasBroken = typeof old === "object" && old !== null ? Boolean(old.broken || old.status === "broken") : false;
    return [streak.key, { days: wasBroken ? 0 : previousDays + 1, broken: false, todayStatus: "" }];
  }));
}

function emptyReview(date) {
  const previous = findPreviousReview(date)?.data;
  return {
    role: defaultRoleForDate(date),
    breakfast: "", lunch: "", dinner: "", snack: "",
    mealCategories: { breakfast: "", lunch: "", dinner: "", snack: "" },
    water: "0", steps: "",
    morningRoutineState: "", eveningRoutineState: "",
    morningRoutine: false, eveningRoutine: false,
    routineProgress: { morning: {}, evening: {} },
    prayers: Object.fromEntries(PRAYERS.map(prayer => [prayer, ""])),
    sunnahPrayers: Object.fromEntries(SUNNAH_PRAYERS.map(prayer => [prayer, ""])),
    ramadanDays: previous?.ramadanDays !== undefined ? Number(previous.ramadanDays) : -29,
    fastingCompleted: false,
    sleepQualityScore: "",
    dreamCategory: "",
    dreams: "",
    activities: [],
    streaks: inheritedStreaks(previous),
    mood: "",
    gratitude1: "", gratitude2: "", allahName: "",
    stateCheckins: [],
    responsibility: Object.fromEntries(RESPONSIBILITY_KEYS.map(key => [key, null])),
    roleReflections: Object.fromEntries(ROLES.map(role => [role.name, ""])),
    responsibilityNote: "",
    responsibilityMain: "", responsibilityAdaptation: "", responsibilityNextStep: "",
    // Neue Tage arbeiten mit fünf Check-ins; historische Tage bleiben bei vier.
    checkinStructure: 5,
    notes: ""
  };
}

function legacySleepScore(value) {
  return ({ "Sehr gut": 1, "Gut": 2, "Neutral": 2, "Schlecht": 4, "Sehr schlecht": 5 })[value] ?? "";
}

function normalizeReview(raw, date, hasStoredValue) {
  const base = emptyReview(date);
  const merged = { ...base, ...(raw || {}) };
  merged.role = getRole(raw?.role || base.role).name;
  merged.prayers = { ...base.prayers, ...(raw?.prayers || {}) };
  merged.sunnahPrayers = { ...base.sunnahPrayers, ...(raw?.sunnahPrayers || {}) };
  merged.activities = Array.isArray(raw?.activities)
    ? raw.activities.map(normalizeActivity).filter(item => item.title)
    : [];
  merged.mealCategories = Object.fromEntries(["breakfast", "lunch", "dinner", "snack"].map(key => {
    const value = raw?.mealCategories?.[key] || "";
    return [key, mealCategoryMeta(value) ? value : ""];
  }));
  merged.dreamCategory = DREAM_CATEGORIES.some(([value]) => value === raw?.dreamCategory) ? raw.dreamCategory : "";
  const normalizeRoutineState = value => {
    // "angepasst erfüllt" aus älteren Versionen wird zu "Gewissenhaft".
    const migrated = ["adapted", "adaptedFulfilled", "responsibly-skipped", "angepasst"].includes(value) ? "responsiblySkipped" : value;
    return TASK_STATE_META[migrated] ? migrated : "";
  };
  const morningState = raw?.morningRoutineState || (raw?.morningRoutine ? "done" : "");
  const eveningState = raw?.eveningRoutineState || (raw?.eveningRoutine ? "done" : "");
  merged.morningRoutineState = normalizeRoutineState(morningState);
  merged.eveningRoutineState = normalizeRoutineState(eveningState);
  const normalizedSleep = raw?.sleepQualityScore ?? legacySleepScore(raw?.sleepQuality);
  merged.sleepQualityScore = normalizedSleep === "" || normalizedSleep === undefined || normalizedSleep === null ? "" : Number(normalizedSleep);
  merged.routineProgress = {
    morning: { ...(raw?.routineProgress?.morning || {}) },
    evening: { ...(raw?.routineProgress?.evening || {}) }
  };
  merged.stateCheckins = Array.isArray(raw?.stateCheckins) ? raw.stateCheckins.map((entry, index) => {
    const time = /^\d{2}:\d{2}$/.test(entry.time || "") ? entry.time : "12:00";
    const inferredSlot = entry.slot || legacySlotForTime(time);
    return {
      id: String(entry.id || `state-${date}-${index}`),
      slot: CHECKIN_SLOTS.some(slot => slot.key === inferredSlot) ? inferredSlot : legacySlotForTime(time),
      time,
      energy: entry.energy === "" || entry.energy === undefined || entry.energy === null ? null : clamp(Number(entry.energy), 0, 100),
      mood: entry.mood === "" || entry.mood === undefined || entry.mood === null ? null : clamp(Number(entry.mood), 0, 100),
      // Fehlt die Gottesfurcht, bleibt sie leer. Es wird kein Wert erfunden.
      taqwa: entry.taqwa === "" || entry.taqwa === undefined || entry.taqwa === null ? null : clamp(Number(entry.taqwa), 0, 100),
      load: LOAD_OPTIONS[entry.load] ? entry.load : "normal",
      body: STATE_BODY_OPTIONS[entry.body] ? entry.body : "stable",
      mind: STATE_MIND_OPTIONS[entry.mind] ? entry.mind : "normal",
      motivation: STATE_MOTIVATION_OPTIONS[entry.motivation] ? entry.motivation : "available",
      context: CONTEXT_OPTIONS[entry.context || entry.environment] ? (entry.context || entry.environment) : "normal",
      support: SUPPORT_OPTIONS[entry.support] ? entry.support : "available",
      emotion: EMOTIONS.some(option => option.value === entry.emotion) ? entry.emotion : "",
      primaryRole: getRole(entry.primaryRole || raw?.role || base.role).name,
      responsibilitySource: RESPONSIBILITY_SOURCE_LABELS[entry.responsibilitySource] ? entry.responsibilitySource : "role",
      responsibility: String(entry.responsibility || ""),
      urgency: URGENCY_LABELS[entry.urgency] ? entry.urgency : "medium",
      impact: IMPACT_LABELS[entry.impact] ? entry.impact : "medium",
      flexibility: FLEXIBILITY_LABELS[entry.flexibility] ? entry.flexibility : "medium",
      conflict: ["no", "possible", "yes"].includes(entry.conflict) ? entry.conflict : "no",
      hydrationMl: Math.max(0, Number(entry.hydrationMl ?? raw?.water ?? 0)),
      nutritionScore: Number.isFinite(Number(entry.nutritionScore)) ? clamp(Number(entry.nutritionScore), 0, 100) : null,
      sleepQualityScore: entry.sleepQualityScore === "" || entry.sleepQualityScore === undefined || entry.sleepQualityScore === null ? "" : clamp(Number(entry.sleepQualityScore), 0, 6),
      dreamCategory: DREAM_CATEGORIES.some(([value]) => value === entry.dreamCategory) ? entry.dreamCategory : "",
      dreamNote: String(entry.dreamNote || ""),
      selectedFrameworkKey: modeKey(entry.selectedFrameworkKey),
      recommendedFrameworkKey: modeKey(entry.recommendedFrameworkKey),
      frameworkOverrideReason: String(entry.frameworkOverrideReason || ""),
      note: String(entry.note || ""),
      createdAt: entry.createdAt || `${date}T${time}:00`
    };
  }).sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time)) : [];
  // 6.2.1: Schlaf- und Trauminformationen gehören zum Morgen-Check-in.
  // Bestehende Nachtwerte bleiben als Zustandsaufnahme erhalten; Schlafdaten
  // werden verlustfrei in einen vorhandenen Morgen kopiert oder als separater
  // Morgen-Check-in angelegt. Die alten Top-Level-Felder bleiben kompatibel.
  if (hasStoredValue) {
    const hasSleepData = entry => entry && (entry.sleepQualityScore !== "" || entry.dreamCategory || entry.dreamNote);
    let morning = merged.stateCheckins.find(entry => entry.slot === "morning") || null;
    const night = merged.stateCheckins.find(entry => entry.slot === "night") || null;

    if (hasSleepData(night)) {
      if (!morning) {
        morning = {
          ...night,
          id: `state-${date}-morning-sleep-migrated`,
          slot: "morning",
          time: "08:00",
          energy: null, mood: null, taqwa: null,
          createdAt: `${date}T08:00:00`
        };
        merged.stateCheckins.push(morning);
      } else {
        if (morning.sleepQualityScore === "") morning.sleepQualityScore = night.sleepQualityScore;
        if (!morning.dreamCategory) morning.dreamCategory = night.dreamCategory;
        if (!morning.dreamNote) morning.dreamNote = night.dreamNote;
      }
      night.sleepQualityScore = "";
      night.dreamCategory = "";
      night.dreamNote = "";
    }

    const legacySleep = merged.sleepQualityScore;
    const legacyDream = merged.dreamCategory || "";
    const legacyDreamNote = String(raw?.dreams || "");
    if (legacySleep !== "" || legacyDream || legacyDreamNote) {
      if (!morning) {
        morning = {
          id: `state-${date}-morning-migrated`,
          slot: "morning", time: "08:00",
          energy: null, mood: null, taqwa: null, load: "normal", body: "stable", mind: "normal", motivation: "available",
          context: "normal", support: "available", emotion: "",
          primaryRole: merged.role, responsibilitySource: "role", responsibility: "",
          urgency: "medium", impact: "medium", flexibility: "medium", conflict: "no",
          hydrationMl: Math.max(0, Number(raw?.water || 0)), nutritionScore: null,
          sleepQualityScore: legacySleep, dreamCategory: legacyDream, dreamNote: legacyDreamNote,
          selectedFrameworkKey: "", recommendedFrameworkKey: "", frameworkOverrideReason: "",
          note: "", createdAt: `${date}T08:00:00`
        };
        merged.stateCheckins.push(morning);
      } else {
        if (morning.sleepQualityScore === "" && legacySleep !== "") morning.sleepQualityScore = legacySleep;
        if (!morning.dreamCategory && legacyDream) morning.dreamCategory = legacyDream;
        if (!morning.dreamNote && legacyDreamNote) morning.dreamNote = legacyDreamNote;
      }
    }
    if (morning) {
      merged.sleepQualityScore = morning.sleepQualityScore;
      merged.dreamCategory = morning.dreamCategory || "";
      merged.dreams = morning.dreamNote || "";
    }
    merged.stateCheckins.sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time));
  }

  const legacyResponsibility = raw?.responsibility || {};
  const migratedResponsibility = {
    situationState: legacyResponsibility.situationState ?? legacyResponsibility.stateHonesty,
    responsibilityClarity: legacyResponsibility.responsibilityClarity ?? legacyResponsibility.amanahCare,
    roleScope: legacyResponsibility.roleScope ?? legacyResponsibility.boundaryRespect,
    appropriateness: legacyResponsibility.appropriateness ?? legacyResponsibility.roleFidelity,
    effectLearning: legacyResponsibility.effectLearning ?? null
  };
  merged.responsibility = Object.fromEntries(RESPONSIBILITY_KEYS.map(key => {
    const value = migratedResponsibility[key];
    return [key, [0, 1, 2].includes(Number(value)) ? Number(value) : null];
  }));
  merged.roleReflections = Object.fromEntries(ROLES.map(role => {
    const legacyValue = raw?.roleReflections?.[role.name] ?? (role.name === "Ich-Person" ? raw?.roleReflections?.Yannick : undefined);
    const value = legacyValue === "responsible" ? "fulfilled" : legacyValue === "partial" ? "adapted" : legacyValue;
    return [role.name, ROLE_REFLECTION_ORDER.includes(value) ? value : ""];
  }));
  merged.responsibilityNote = String(raw?.responsibilityNote || "");
  merged.responsibilityMain = String(raw?.responsibilityMain || "");
  merged.responsibilityAdaptation = String(raw?.responsibilityAdaptation || "");
  merged.responsibilityNextStep = String(raw?.responsibilityNextStep || raw?.responsibilityNote || "");
  /* Tagesstruktur: gespeicherte Angabe hat Vorrang. Fehlt sie, gilt ein
     bereits gespeicherter zurückliegender Tag als Vierer-Tag – der Nachmittag
     wird dort nicht rückwirkend als Versäumnis gewertet. Sobald dort ein
     Nachmittag eingetragen ist, gilt die Fünfer-Struktur. */
  const storedStructure = Number(raw?.checkinStructure);
  merged.checkinStructure = storedStructure === 4 || storedStructure === 5
    ? storedStructure
    : (hasStoredValue && date < todayISO() ? 4 : 5);
  if (merged.stateCheckins.some(entry => entry.slot === "afternoon")) merged.checkinStructure = 5;

  // Die frühere ROLEPLAY-Bilanz entfällt vollständig; Altbestände werden verworfen.
  delete merged.roleplayBalance;

  merged.streaks = hasStoredValue ? { ...base.streaks } : base.streaks;
  STREAKS.forEach(streak => {
    const old = raw?.streaks?.[streak.key];
    if (old && typeof old === "object") {
      const broken = Boolean(old.broken || old.status === "broken" || old.todayStatus === "lapse");
      merged.streaks[streak.key] = { days: Math.max(0, Number(old.days || 0)), broken, todayStatus: STREAK_DAILY_STATES[old.todayStatus] ? old.todayStatus : (broken ? "lapse" : "") };
    } else if (!merged.streaks[streak.key]) {
      merged.streaks[streak.key] = { days: 0, broken: false, todayStatus: "" };
    }
  });
  return merged;
}

function loadReview(date) {
  const rawText = localStorage.getItem(storageKey(date));
  const raw = rawText ? safeParse(rawText, {}) : {};
  return normalizeReview(raw, date, Boolean(rawText));
}

function collectForm() {
  if (!currentData) return;
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "gratitude1", "gratitude2", "allahName", "responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep", "notes"].forEach(id => {
    if ($(id)) currentData[id] = $(id).value;
  });
  currentData.mealCategories = currentData.mealCategories || { breakfast: "", lunch: "", dinner: "", snack: "" };
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const select = $(`${key}Category`);
    if (select) currentData.mealCategories[key] = mealCategoryMeta(select.value) ? select.value : "";
  });
  currentData.ramadanDays = Number(currentData.ramadanDays || 0);
  currentData.role = $("dayRole")?.value || currentData.role;
  currentData.morningRoutine = currentData.morningRoutineState === "done";
  currentData.eveningRoutine = currentData.eveningRoutineState === "done";
}

function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(() => saveReview(true), 550);
}

function saveReview(silent = false) {
  collectForm();
  localStorage.setItem(storageKey(selectedDate), JSON.stringify(currentData));
  renderStats();
  renderRoutineCards();
  if ($("analysisPage")?.classList.contains("active")) renderAnalysis();
  if (!silent) {
    const button = $("saveButton");
    const original = button.textContent;
    button.textContent = "✓ Gespeichert";
    setTimeout(() => { button.textContent = original; }, 1100);
  }
}

function formatDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date(`${iso}T12:00:00`));
}

function formatLongDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${iso}T12:00:00`));
}

function formatShortDate(iso) {
  return new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit" }).format(new Date(`${iso}T12:00:00`));
}

function setDate(date) {
  weekOffset = 0;
  slideOffset = 0;
  selectedDate = date;
  calendarCursor = firstOfMonth(date);
  currentData = loadReview(date);
  $("dateButton").textContent = formatDate(date);
  fillForm();
  renderStats();
  renderRoutineCards();
  if (activeRoutineKey) renderRoutineDetail(activeRoutineKey);
}

function fillForm() {
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "ramadanDays", "gratitude1", "gratitude2", "allahName", "responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep", "notes"].forEach(id => {
    if ($(id)) $(id).value = currentData[id] ?? "";
  });
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const select = $(`${key}Category`);
    if (!select) return;
    const value = currentData.mealCategories?.[key] || "";
    select.innerHTML = mealCategoryOptionsHTML(value);
    select.value = value;
  });
  updateMealSelectionStyles();
  renderRolePickerOptions();
  $("dayRole").value = getRole(currentData.role).name;
  applyRolePickerStyle();
  renderWaterControl();
  updateRamadanDisplay();
  updateRoutineStateButtons();
  renderPrayers();
  renderActivities();
  renderStateOverview();
  renderResponsibilityReflection();
  renderStreaks();
}

function currentClockTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

/* Nur noch für Altdaten: Einträge aus früheren Versionen ohne gespeicherte
   Phase bekommen daraus ihre Zuordnung. Für die Frage, welcher Check-in als
   nächster offen ist, wird die Uhrzeit ausdrücklich nicht mehr verwendet. */
function legacySlotForTime(time = currentClockTime()) {
  const hour = Number(String(time).slice(0, 2));
  if (hour < 10) return "morning";
  if (hour < 16) return "midday";
  if (hour < 21) return "evening";
  return "night";
}

/* Struktur des angezeigten Tages: 5 Phasen (ab Version 6) oder 4 Phasen
   (historische Tage). Historische Tage bekommen den Nachmittag nicht
   nachträglich als Versäumnis angerechnet. */
function checkinStructure(data = currentData) {
  return Number(data?.checkinStructure) === 4 ? 4 : 5;
}

function activeChronology(data = currentData) {
  return checkinStructure(data) === 4 ? LEGACY_CHECKIN_CHRONOLOGY : CHECKIN_CHRONOLOGY;
}

function slotIndex(key) {
  const index = CHECKIN_CHRONOLOGY.indexOf(key);
  return index < 0 ? CHECKIN_CHRONOLOGY.length : index;
}

function checkinSlot(key) {
  return CHECKIN_SLOTS.find(slot => slot.key === key) || CHECKIN_SLOTS[0];
}

function emotionStateScore(value) {
  if (!value) return 65;
  if (POSITIVE_EMOTIONS.has(value)) return 88;
  if (HEAVY_EMOTIONS.has(value)) return 26;
  if (["Traurig", "Besorgt", "Enttäuscht", "Frustriert", "Gestresst", "Gereizt", "Ärgerlich", "Scham", "Reue", "Schuldig", "Einsam", "Unruhig", "Versucht", "Begehrlich"].includes(value)) return 43;
  return 62;
}

function sleepCapacityScore(value) {
  if (value === "" || value === undefined || value === null || Number(value) === 3) return null;
  return ({ 0: 95, 1: 86, 2: 72, 4: 48, 5: 28, 6: 12 })[Number(value)] ?? null;
}

function mealKeysForSlot(slot) {
  if (slot === "morning") return ["breakfast"];
  if (slot === "midday") return ["breakfast", "lunch"];
  if (slot === "afternoon") return ["breakfast", "lunch", "snack"];
  if (slot === "evening") return ["breakfast", "lunch", "snack", "dinner"];
  return ["breakfast", "lunch", "snack", "dinner"];
}

function mealContextScore(slot, data = currentData) {
  const values = mealKeysForSlot(slot).map(key => data?.mealCategories?.[key] || "").filter(Boolean);
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + (mealCategoryMeta(value)?.score ?? 62), 0) / values.length);
}

function mealCategoryLabel(value) {
  return mealCategoryMeta(value)?.label || "Noch offen";
}

function morningSleepCheckin(data = currentData) {
  return (data?.stateCheckins || []).find(entry => entry.slot === "morning") || null;
}

function innerStateCapacity(checkin) {
  if (!checkin) return null;
  const energy = checkin.energy === null || checkin.energy === undefined ? 60 : clamp(Number(checkin.energy), 0, 100);
  const mood = checkin.mood === null || checkin.mood === undefined ? emotionStateScore(checkin.emotion) : clamp(Number(checkin.mood), 0, 100);
  const emotion = emotionStateScore(checkin.emotion);
  const load = LOAD_OPTIONS[checkin.load]?.score ?? LOAD_OPTIONS.normal.score;
  return Math.round(energy * .40 + mood * .28 + emotion * .12 + load * .20);
}

function hydrationContextScore(slot, ml) {
  const thresholds = { morning: 500, midday: 1000, afternoon: 1250, evening: 1500, night: 1800 };
  const target = thresholds[slot] || 1000;
  if (!Number.isFinite(Number(ml)) || Number(ml) <= 0) return null;
  return clamp(Math.round(Number(ml) / target * 100), 0, 100);
}

function stateCapacity(checkin, data = currentData) {
  const inner = innerStateCapacity(checkin);
  if (inner === null) return null;
  const morning = morningSleepCheckin(data);
  const sleep = sleepCapacityScore(morning?.sleepQualityScore);
  const hydration = hydrationContextScore(checkin.slot, checkin.hydrationMl);
  const nutrition = checkin.nutritionScore;
  const weighted = [{ value: inner, weight: .78 }];
  if (sleep !== null) weighted.push({ value: sleep, weight: .10 });
  if (hydration !== null) weighted.push({ value: hydration, weight: .06 });
  if (nutrition !== null) weighted.push({ value: nutrition, weight: .06 });
  return Math.round(weighted.reduce((sum, item) => sum + item.value * item.weight, 0) / weighted.reduce((sum, item) => sum + item.weight, 0));
}

/* --------------------------------------------------------------------------
   Rollenmodus-Empfehlung
   Der Modus entsteht ausschließlich aus Energie und Laune. Die Gewichtung,
   die Schwellen und die Schutzregeln stehen zentral in STATE_WEIGHTS,
   MODE_THRESHOLDS und MODE_RULES – hier werden keine Zahlen wiederholt.

   Eine manuelle Auswahl gibt es nicht mehr; der Modus ist immer automatisch.
   -------------------------------------------------------------------------- */

// Liefert Energie, Laune und – falls erfasst – Gottesfurcht eines Check-ins.
function checkinValues(checkin) {
  if (!checkin) return null;
  const e = checkin.energy === null || checkin.energy === undefined ? null : clamp(Number(checkin.energy), 0, 100);
  const m = checkin.mood === null || checkin.mood === undefined ? null : clamp(Number(checkin.mood), 0, 100);
  if (e === null || m === null) return null;
  const t = checkin.taqwa === null || checkin.taqwa === undefined || checkin.taqwa === "" ? null : clamp(Number(checkin.taqwa), 0, 100);
  return { energy: e, mood: m, taqwa: t };
}

function recommendedModeForCheckin(checkin, data = currentData) {
  const values = checkinValues(checkin);
  if (!values) return null;
  const resolved = resolveMode(values.energy, values.mood, values.taqwa);
  if (!resolved) return null;
  const mode = modeMeta(resolved.key) || MODES[0];
  return {
    ...mode,
    score: resolved.score,
    lifted: Boolean(resolved.lifted),
    energy: values.energy,
    mood: values.mood,
    taqwa: values.taqwa
  };
}

// Es gibt keine manuelle Auswahl: der empfohlene Modus ist zugleich der gültige.
function modeForCheckin(checkin, data = currentData) {
  return recommendedModeForCheckin(checkin, data);
}

// Maßgeblicher Modus des Tages: der zuletzt erfasste Check-in bestimmt ihn.
function currentDayMode(data = currentData) {
  return modeForCheckin(latestStateCheckin(data), data);
}


function checkinReasonFactors(checkin, data = currentData) {
  if (!checkin) return [];
  const factors = [];
  factors.push(`Energie: ${checkin.energy ?? "–"} %`);
  factors.push(`Laune: ${checkin.mood ?? "–"} %`);
  if (checkin.taqwa !== null && checkin.taqwa !== undefined && checkin.taqwa !== "") factors.push(`Gottesfurcht: ${checkin.taqwa} %`);
  if (checkin.emotion) factors.push(`Gefühl: ${checkin.emotion}`);
  factors.push(`Belastung: ${LOAD_OPTIONS[checkin.load]?.label || "Normal"}`);
  const morning = morningSleepCheckin(data);
  if (morning?.sleepQualityScore !== "" && morning?.sleepQualityScore !== undefined) factors.push(`Schlaf: ${SLEEP_LABELS[Number(morning.sleepQualityScore)] || "erfasst"}`);
  if (checkin.slot === "morning" && checkin.dreamCategory) factors.push(`Traum: ${dreamCategoryLabel(checkin.dreamCategory)}`);
  const water = Number(checkin.hydrationMl || 0);
  if (water > 0) factors.push(`Getrunken: ${(water / 1000).toFixed(1).replace(".", ",")} L`);
  const meals = mealKeysForSlot(checkin.slot).map(key => data?.mealCategories?.[key]).filter(Boolean);
  if (meals.length) factors.push(`Ernährung: ${meals.map(mealCategoryLabel).join(" · ")}`);
  return factors;
}

function latestStateCheckin(data = currentData) {
  const entries = Array.isArray(data?.stateCheckins) ? data.stateCheckins : [];
  return [...entries].sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time)).at(-1) || null;
}

/* Kreisförmige Tagesdarstellung mit vier Segmenten.
   Jedes Segment ist eine echte Schaltfläche und öffnet den jeweiligen
   Check-in – der Kreis ersetzt die früheren Karten also auch funktional. */
/* ==========================================================================
   ROLEPLAY STATE CYCLE
   Kein Fortschrittsring, sondern ein vollständiger Tageszyklus.

   Die vier Tagesphasen laufen im Uhrzeigersinn:
     oben links   Nacht    (180°–270°)
     oben rechts  Morgen   (270°–360°)
     unten rechts Mittag   (0°–90°)
     unten links  Abend    (90°–180°)

   Die Farbwelten sind so gewählt, dass sie ineinander übergehen: das Ende
   jeder Phase liegt nahe am Anfang der nächsten, und Abend läuft zurück in
   die Nacht. Dadurch liest sich der Ring als EIN Zyklus, nicht als vier
   eingefärbte Buttons.

   Eine Phase ohne Zustandsaufnahme bleibt gedämpft. "Beleuchtet" bedeutet
   ausdrücklich nicht "erledigt", sondern: für diese Phase liegt eine
   Zustandsaufnahme vor.
   ========================================================================== */

/* Farbwelten der vier Tageszeiten. a und b spannen den Verlauf des Knotens,
   line ist die Farbe in der Verbindungslinie, glow der weiche Schein. */
const CYCLE_PHASES = {
  night:     { short: "Nacht",      from: 180, a: "#4F5BD5", b: "#8145D8", line: "#6B4FD6", glow: "rgba(101,79,214,.42)" },
  morning:   { short: "Morgen",     from: 270, a: "#9B5CF0", b: "#F79A3C", line: "#E4735F", glow: "rgba(233,124,80,.45)" },
  midday:    { short: "Mittag",     from: 0,   a: "#F7B733", b: "#2FBEDD", line: "#63C3C9", glow: "rgba(60,190,214,.40)" },
  // Nachmittag: der Türkis-Gold-Ton des Mittags läuft in wärmere Abendfarben.
  afternoon: { short: "Nachmittag", from: 60,  a: "#54C6D6", b: "#F0A15C", line: "#E29A63", glow: "rgba(226,154,99,.40)" },
  evening:   { short: "Abend",      from: 120, a: "#E0619B", b: "#6A4FCF", line: "#A65AB6", glow: "rgba(166,90,182,.40)" }
};

/* Farbanker rund um den Tag. Zwischen ihnen wird interpoliert, deshalb gibt
   es keine Segmentgrenzen: der Ring läuft als ein einziger Verlauf durch.

   Der Weg folgt einem echten Tag – tiefes Indigo, violette Dämmerung,
   Sonnenaufgang, Gold, klarer Mittagshimmel, weicher Nachmittag,
   Sonnenuntergang, Abendrot, Abenddämmerung und zurück ins Indigo. */
const CYCLE_STOPS = [
  { at: 180, c: "#2A2E6B" },   // Abend geht in die Nacht über
  { at: 205, c: "#1D2456" },
  { at: 225, c: "#171F4F" },   // tiefste Nacht
  { at: 250, c: "#3B2F6E" },
  { at: 270, c: "#6B4C86" },   // Dämmerung
  { at: 292, c: "#C2705F" },
  { at: 315, c: "#F0906A" },   // Sonnenaufgang
  { at: 337, c: "#F7BE6C" },
  { at: 360, c: "#EFD98F" },   // später Vormittag
  { at: 22,  c: "#BCDDD8" },
  { at: 45,  c: "#86D2E8" },   // klarer Mittagshimmel
  { at: 68,  c: "#9AC8E6" },
  { at: 90,  c: "#B3B9DE" },   // Nachmittag wird weicher
  { at: 112, c: "#E9A87A" },   // Sonnenuntergang
  { at: 135, c: "#D2708F" },   // Abendrot
  { at: 157, c: "#8A5794" },   // Abenddämmerung
  { at: 180, c: "#2A2E6B" }
];

// Ergänzt einen rgb()-Wert um einen Alphakanal.
function rgbWithAlpha(rgb, alpha) {
  const m = String(rgb).match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (!m) return rgb;
  return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${alpha})`;
}

function hexToRgbTriple(hex) {
  const v = hex.replace("#", "");
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
}

/* Die Ankerwinkel werden einmalig zu einer aufsteigenden Folge ab 180°
   aufgerollt (180 … 540), damit die Suche auch über den Nullpunkt hinweg
   funktioniert. */
const CYCLE_STOPS_UNWRAPPED = (() => {
  let previous = CYCLE_STOPS[0].at;
  return CYCLE_STOPS.map((stop, index) => {
    if (index === 0) return { at: previous, c: stop.c };
    let at = stop.at;
    while (at <= previous) at += 360;
    previous = at;
    return { at, c: stop.c };
  });
})();

// Farbe an einem beliebigen Winkel – lineare Mischung der beiden Nachbaranker.
function cycleColorAt(angle) {
  const base = CYCLE_STOPS_UNWRAPPED[0].at;
  const a = ((angle - base) % 360 + 360) % 360 + base;
  for (let i = 0; i < CYCLE_STOPS_UNWRAPPED.length - 1; i += 1) {
    const s0 = CYCLE_STOPS_UNWRAPPED[i];
    const s1 = CYCLE_STOPS_UNWRAPPED[i + 1];
    if (a >= s0.at && a <= s1.at) {
      const t = s1.at === s0.at ? 0 : (a - s0.at) / (s1.at - s0.at);
      const c0 = hexToRgbTriple(s0.c);
      const c1 = hexToRgbTriple(s1.c);
      return `rgb(${c0.map((v, k) => Math.round(v + (c1[k] - v) * t)).join(",")})`;
    }
  }
  return CYCLE_STOPS_UNWRAPPED[0].c;
}


/* Hervorgehoben wird immer der erste noch nicht ausgefüllte Check-in in der
   festen Reihenfolge – unabhängig von der Uhrzeit. Sind alle erledigt,
   leuchtet keiner mehr. */
function pendingPhaseKey() {
  const bySlot = Object.fromEntries((currentData?.stateCheckins || []).map(e => [e.slot, e]));
  return activeChronology().find(key => !bySlot[key]) || null;
}

/* Tageszeit-Symbole in einheitlichem Strichstil, mittig auf 0 0 gezeichnet.
   Bewusst eine einzige Formsprache statt gemischter Icon-Stile. */
function phaseGlyph(key) {
  if (key === "night") {
    // Die Sichel entsteht als Differenz zweier Kreise – dadurch bekommt sie
    // durchgehend gleichmäßige Rundungen statt einer eingedellten Scheibe.
    /* Echte Sichel aus zwei Bögen: außen der Rand des Mondes, innen die
       Gegenkante. Über fill-rule ginge es nicht – dort würde auch der
       überstehende Teil des zweiten Kreises mitgefüllt und die Sichel
       schlösse sich zum Ring. */
    return `<svg viewBox="-16 -16 32 32" aria-hidden="true">
      <g transform="rotate(-20)">
        <path d="M2.60 -10.07 A10.4 10.4 0 1 0 2.60 10.07 A10.4 10.4 0 0 1 2.60 -10.07 Z"></path>
      </g>
      <circle class="spark" cx="8.6" cy="-8" r="1.5"></circle>
      <circle class="spark" cx="11.8" cy="-3" r="1"></circle></svg>`;
  }
  if (key === "midday") {
    const rays = [0, 45, 90, 135, 180, 225, 270, 315].map(d => {
      const a = d * Math.PI / 180;
      return `<line x1="${(Math.cos(a) * 9.2).toFixed(2)}" y1="${(Math.sin(a) * 9.2).toFixed(2)}"
        x2="${(Math.cos(a) * 13).toFixed(2)}" y2="${(Math.sin(a) * 13).toFixed(2)}"></line>`;
    }).join("");
    return `<svg viewBox="-16 -16 32 32" aria-hidden="true"><circle cx="0" cy="0" r="6"></circle>${rays}</svg>`;
  }
  /* Nachmittag: die Sonne steht noch klar über dem Horizont, aber nicht mehr
     im Zenit. Gleiche Strichsprache wie die übrigen Phasen, tiefer gesetzter
     Horizont als beim Abend. */
  if (key === "afternoon") {
    return `<svg viewBox="-16 -16 32 32" aria-hidden="true">
      <circle cx="0" cy="-3.4" r="5.4"></circle>
      <line x1="0" y1="-13.2" x2="0" y2="-10.8"></line>
      <line x1="-8.3" y1="-11.7" x2="-6.5" y2="-9.9"></line>
      <line x1="8.3" y1="-11.7" x2="6.5" y2="-9.9"></line>
      <line x1="-12.2" y1="-3.4" x2="-9.8" y2="-3.4"></line>
      <line x1="12.2" y1="-3.4" x2="9.8" y2="-3.4"></line>
      <line x1="-11.5" y1="8.4" x2="11.5" y2="8.4"></line>
    </svg>`;
  }
  // Morgen: Sonne steigt über den Horizont. Abend: sie sinkt darunter.
  if (key === "morning") {
    // Aufgehende Sonne: volle Halbscheibe über dem Horizont, Strahlen nach oben.
    return `<svg viewBox="-16 -16 32 32" aria-hidden="true">
      <path d="M-7.4 3.6a7.4 7.4 0 0 1 14.8 0Z"></path>
      <line x1="-13" y1="3.6" x2="13" y2="3.6"></line>
      <line x1="0" y1="-12.8" x2="0" y2="-9"></line>
      <line x1="-9.8" y1="-6.6" x2="-7.1" y2="-3.9"></line>
      <line x1="9.8" y1="-6.6" x2="7.1" y2="-3.9"></line>
    </svg>`;
  }
  /* Untergehende Sonne: die Scheibe ist bereits zum Teil hinter dem Horizont
     verschwunden, darunter liegt ihre Spiegelung. Das liest sich ruhiger als
     die früheren Pfeile und unterscheidet sich klar vom Morgen. */
  return `<svg viewBox="-16 -16 32 32" aria-hidden="true">
    <path d="M-8.9 1.4A9 9 0 0 1 8.9 1.4Z"></path>
    <line x1="-13" y1="1.4" x2="13" y2="1.4"></line>
    <line x1="-6.2" y1="7.4" x2="6.2" y2="7.4"></line>
  </svg>`;
}

/* Horizontale Tagesbahn über fünf Phasen: Morgen → Mittag → Nachmittag →
   Abend → Nacht. Sichtbar sind ausschließlich Tagesphase, Symbol und Status –
   Prozentwerte stehen im Check-in-Dialog, im Verlauf und in den Auswertungen.
   Vier sichtbar unterscheidbare Zustände:
     erledigt  – farbig, mit Haken
     jetzt     – moderat größer und farbig
     später    – ruhig und neutral
     nicht Teil des Tages – historische Vierer-Tage ohne Nachmittag
   Die Verbindungslinie besteht aus eigenständigen Segmenten, die
   ausschließlich die Zwischenräume füllen und die Kreise nicht berühren. */
function renderCheckinSlots() {
  const container = $("checkinSlots");
  if (!container || !currentData) return;
  const bySlot = Object.fromEntries((currentData.stateCheckins || []).map(entry => [entry.slot, entry]));
  const pending = pendingPhaseKey();
  const active = activeChronology();

  const stops = CHECKIN_CHRONOLOGY.map(key => {
    const phase = CYCLE_PHASES[key];
    const entry = bySlot[key];
    const state = entry ? "done"
      : !active.includes(key) ? "outside"
      : key === pending ? "current" : "upcoming";
    return { key, phase, entry, state };
  });

  // Ein Segment je Zwischenraum. Farbe links und rechts aus den Nachbarn.
  const linkColor = stop => (stop.state === "done" || stop.state === "current") ? stop.phase.line : "var(--journey-idle)";
  const links = stops.slice(0, -1).map((stop, index) =>
    `<i style="--i:${index};--from:${linkColor(stop)};--to:${linkColor(stops[index + 1])}"></i>`).join("");

  const nodes = stops.map(stop => {
    const { key, phase, entry, state } = stop;
    /* Die Zahlen bleiben ausschließlich in der Vorlesehilfe erhalten; sichtbar
       zeigt die Bahn nur Tagesphase, Symbol und Status. */
    const hasEnergy = entry && entry.energy !== null && entry.energy !== undefined;
    const hasMood = entry && entry.mood !== null && entry.mood !== undefined;
    const hasTaqwa = entry && entry.taqwa !== null && entry.taqwa !== undefined && entry.taqwa !== "";
    const action = state === "done" ? "bearbeiten" : "eintragen";
    const values = entry
      ? [
          hasEnergy ? `Energie ${entry.energy} %` : "",
          hasMood ? `Laune ${entry.mood} %` : "",
          hasTaqwa ? `Gottesfurcht ${entry.taqwa} %` : ""
        ].filter(Boolean).join(", ")
      : "";
    const status = entry ? (values || "erfasst")
      : state === "outside" ? "für diesen Tag nicht erfasst" : "noch nicht erfasst";
    return `<button type="button" class="journey-stop is-${state}" data-open-checkin-slot="${key}"
        style="--stop-a:${phase.a};--stop-b:${phase.b};--stop-line:${phase.line};--stop-glow:${phase.glow}"
        aria-label="${escapeHTML(phase.short)} ${action}. ${escapeHTML(status)}.">
      <span class="stop-node">
        <span class="stop-icon">${phaseGlyph(key)}</span>
        ${state === "done" ? `<span class="stop-check" aria-hidden="true"><svg viewBox="0 0 14 14"><path d="M3 7.4 5.9 10.2 11 4.6"></path></svg></span>` : ""}
      </span>
      <span class="stop-name">${escapeHTML(phase.short)}</span>
    </button>`;
  }).join("");

  container.innerHTML = `<div class="day-journey">
    <div class="journey-stops">
      <span class="journey-links" aria-hidden="true">${links}</span>
      ${nodes}
    </div>
  </div>`;

  container.querySelectorAll("[data-open-checkin-slot]").forEach(element => {
    element.addEventListener("click", () => openStateCheckinDialog(element.dataset.openCheckinSlot));
  });
}

/* Coach-Fläche: kleine Überschrift, kräftiger Kernsatz, ruhiger Zusatzsatz.
   Beide Texte stammen ausschließlich aus coachImpulse(). */
function coachImpulseHTML(energy, mood, key) {
  const impulse = coachImpulse(energy, mood, key);
  if (!impulse) return "";
  return `<div class="coach-impulse">
    <span class="coach-eyebrow">Impuls für jetzt</span>
    <strong class="coach-core">${escapeHTML(impulse.core)}</strong>
    <span class="coach-addition">${escapeHTML(impulse.addition)}</span>
  </div>`;
}

function renderStateOverview() {
  const summary = $("currentStateSummary");
  const timeline = $("stateTimeline");
  if (!summary || !timeline || !currentData) return;
  renderCheckinSlots();
  const checkins = [...(currentData.stateCheckins || [])].sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || (a.time || "").localeCompare(b.time || ""));
  // Maßgeblich ist der neueste vorhandene Check-in des Tages.
  const latest = [...checkins].at(-1);
  const mode = modeForCheckin(latest);
  const role = dayRoleConfig(selectedDate);

  if (!latest || !mode) {
    summary.className = "current-state-summary state-readout is-empty";
    summary.removeAttribute("style");
    summary.innerHTML = `<p class="readout-empty">Noch kein Check-in</p>`;
  } else {
    /* Die Auswertung liest sich als Ergebnis: Tagesrolle, Rollenmodus und
       darunter der Coach-Impuls. Es erscheinen hier bewusst keine Aufgaben,
       keine Begründungstexte und keine Prozentwerte – die Zahlen stehen im
       Check-in-Dialog, im aufgeklappten Verlauf und in den Auswertungen. */
    summary.className = "current-state-summary state-readout";
    summary.style.setProperty("--mode-color", mode.color);
    summary.style.setProperty("--mode-soft", hexToRgba(mode.color, .13));
    summary.style.setProperty("--mode-line", hexToRgba(mode.color, .28));
    summary.innerHTML = `
      <div class="readout-head">
        <span class="readout-role">${escapeHTML(role.roleName)}</span>
        <strong class="readout-mode">${escapeHTML(mode.label)}</strong>
      </div>
      ${coachImpulseHTML(latest.energy, latest.mood, mode.key)}`;
  }

  timeline.innerHTML = checkins.length ? [...checkins].reverse().map(entry => {
    const entryMode = modeForCheckin(entry);
    const slot = checkinSlot(entry.slot);
    const sleep = entry.slot === "morning" && entry.sleepQualityScore !== "" && entry.sleepQualityScore !== undefined
      ? ` · ${SLEEP_LABELS[Number(entry.sleepQualityScore)] || "Schlaf erfasst"}` : "";
    const taqwaPart = entry.taqwa === null || entry.taqwa === undefined || entry.taqwa === ""
      ? "" : ` · ${entry.taqwa} % Gottesfurcht`;
    const details = `${entry.energy ?? "–"} % Energie · ${entry.mood ?? "–"} % Laune${taqwaPart}${sleep}`;
    return `<article class="state-timeline-item" style="--framework-color:${entryMode?.color || "var(--muted)"}">
      <div class="state-timeline-marker"></div>
      <div class="state-timeline-copy">
        <div class="state-timeline-title"><strong>${slot.icon} ${escapeHTML(slot.label)} · ${escapeHTML(entry.time || "")}</strong><span>${escapeHTML(entryMode?.label || "")}</span></div>
        <small>${escapeHTML(details)}</small>
      </div>
      <button type="button" class="state-delete-button" data-delete-state-checkin="${escapeHTML(entry.id)}" aria-label="Check-in löschen">×</button>
    </article>`;
  }).join("") : `<p class="state-timeline-empty">Noch keine Momentaufnahme gespeichert.</p>`;

  timeline.querySelectorAll("[data-delete-state-checkin]").forEach(button => button.addEventListener("click", () => {
    const deleted = (currentData.stateCheckins || []).find(entry => entry.id === button.dataset.deleteStateCheckin);
    currentData.stateCheckins = (currentData.stateCheckins || []).filter(entry => entry.id !== button.dataset.deleteStateCheckin);
    if (deleted?.slot === "morning") {
      currentData.sleepQualityScore = "";
      currentData.dreamCategory = "";
      currentData.dreams = "";
    }
    saveReview(true);
    renderStateOverview();
  }));
}

function emotionOptionsHTML() {
  return `<option value="">Noch nicht eingetragen</option>${EMOTION_GROUPS.map(group => `<optgroup label="${escapeHTML(group.label)}">${group.options.map(([value, label]) => `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`).join("")}</optgroup>`).join("")}`;
}


function dreamCategoryLabel(value) {
  return DREAM_CATEGORIES.find(([key]) => key === value)?.[1] || "Nicht erfasst";
}


function toggleMorningSleepFields(slotKey) {
  const isMorning = slotKey === "morning";
  // Der Morgen enthält zusätzlich den Rückblick auf Schlaf und Traum;
  // Energie, Laune und Gottesfurcht bleiben wie bei allen Check-ins sichtbar.
  if ($("sleepCheckinSection")) $("sleepCheckinSection").hidden = !isMorning;
  if ($("dayCheckinSection")) $("dayCheckinSection").hidden = false;
}

function fillStateCheckinForm(slotKey) {
  const requestedSlot = CHECKIN_CHRONOLOGY.includes(slotKey) ? slotKey : (pendingPhaseKey() || CHECKIN_CHRONOLOGY[0]);
  const existing = (currentData.stateCheckins || []).find(entry => entry.slot === requestedSlot);
  const latest = [...(currentData.stateCheckins || [])].sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot)).at(-1);
  const slot = checkinSlot(requestedSlot);
  $("stateCheckinDialog").dataset.editingSlot = requestedSlot;
  $("stateSlot").value = requestedSlot;
  // Der Dialog nimmt die Farbwelt der angetippten Tagesphase auf, damit er
  // sich wie eine Fortsetzung der Zyklusdarstellung anfühlt.
  const phase = CYCLE_PHASES[requestedSlot] || CYCLE_PHASES.morning;
  // Die Farben stammen direkt aus dem Tageszyklus: Anfang, Mitte und Ende der
  // Phase. Dadurch trägt der Dialog dieselbe Lichtstimmung wie der Ring.
  const phaseStart = cycleColorAt(phase.from + 12);
  const phaseMid = cycleColorAt(phase.from + 45);
  const phaseEnd = cycleColorAt(phase.from + 78);
  const dialog = $("stateCheckinDialog");
  dialog.dataset.phase = requestedSlot;
  dialog.style.setProperty("--phase-a", phaseStart);
  dialog.style.setProperty("--phase-b", phaseEnd);
  dialog.style.setProperty("--phase-veil", rgbWithAlpha(phaseStart, .16));
  dialog.style.setProperty("--phase-veil-b", rgbWithAlpha(phaseEnd, .13));
  $("stateSlotDisplay").style.setProperty("--slot-color", phaseMid);
  $("stateSlotDisplay").style.setProperty("--slot-soft", rgbWithAlpha(phaseMid, .16));
  $("stateSlotDisplay").style.setProperty("--slot-glow", rgbWithAlpha(phaseEnd, .28));
  $("stateSlotDisplay").innerHTML = `<span class="phase-mark" aria-hidden="true"><svg viewBox="0 0 40 30">${phaseGlyph(requestedSlot, 20, 15)}</svg></span>`
    + `<strong>${escapeHTML(phase.short)}</strong><small>${requestedSlot === "morning" ? "Schlaf und Zustand" : "Zustandsaufnahme"}</small>`;
  // Energie, Laune und Gottesfurcht gelten für alle fünf Check-ins.
  $("stateEnergy").value = existing?.energy ?? latest?.energy ?? 60;
  $("stateMood").value = existing?.mood ?? latest?.mood ?? 60;
  if ($("stateTaqwa")) $("stateTaqwa").value = existing?.taqwa ?? latest?.taqwa ?? 60;
  $("stateTime").value = existing?.time || (selectedDate === todayISO() ? currentClockTime() : slot.time);
  const sleepValue = existing?.sleepQualityScore ?? currentData.sleepQualityScore ?? "";
  $("stateSleepQuality").value = sleepValue;
  $("stateDreamCategory").value = existing?.dreamCategory || currentData.dreamCategory || "";
  $("stateDreamNote").value = existing?.dreamNote || currentData.dreams || "";
  toggleMorningSleepFields(requestedSlot);
  // Zurücksetzen nur anbieten, wenn für diese Tagesphase etwas gespeichert ist.
  const resetButton = $("resetStateCheckin");
  if (resetButton) resetButton.hidden = !existing;
  if ($("stateDialogTitle")) $("stateDialogTitle").textContent = phase.short;
  updateStateCheckinPreview();
}

function openStateCheckinDialog(slotKey = null) {
  fillStateCheckinForm(slotKey || pendingPhaseKey() || CHECKIN_CHRONOLOGY[0]);
  $("stateCheckinDialog").showModal();
}

/* Entfernt die Zustandsaufnahme einer einzelnen Tagesphase. Die übrigen
   Angaben des Tages bleiben unberührt – nur dieser eine Eintrag verschwindet. */
function resetStateCheckin(slotKey) {
  if (!currentData || !slotKey) return;
  const before = (currentData.stateCheckins || []).length;
  currentData.stateCheckins = (currentData.stateCheckins || []).filter(entry => entry.slot !== slotKey);
  if (currentData.stateCheckins.length === before) return;
  if (slotKey === "morning") {
    currentData.sleepQualityScore = "";
    currentData.dreamCategory = "";
    currentData.dreams = "";
  }
  saveReview(true);
  renderStateOverview();
  renderStats();
}

function stateCheckinFromForm() {
  const slot = $("stateSlot").value;
  const morningSleep = $("stateSleepQuality").value;
  const energyRaw = $("stateEnergy").value;
  const moodRaw = $("stateMood").value;
  const taqwaRaw = $("stateTaqwa") ? $("stateTaqwa").value : "";
  const existing = (currentData.stateCheckins || []).find(entry => entry.slot === slot);
  return {
    slot,
    energy: Number(energyRaw === "" ? 60 : energyRaw),
    mood: Number(moodRaw === "" ? 60 : moodRaw),
    taqwa: Number(taqwaRaw === "" ? 60 : taqwaRaw),
    primaryRole: currentData.role,
    hydrationMl: Math.max(0, Number(currentData.water || 0)),
    sleepQualityScore: slot === "morning" ? (morningSleep === "" ? "" : Number(morningSleep)) : "",
    dreamCategory: slot === "morning" ? $("stateDreamCategory").value : "",
    dreamNote: slot === "morning" ? $("stateDreamNote").value.trim() : "",
    time: $("stateTime").value || currentClockTime(),
    // Frühere Felder bleiben erhalten, damit alte Tage unverändert bestehen –
    // für die Modusberechnung werden sie nicht mehr gelesen.
    ...(existing ? {
      load: existing.load,
      emotion: existing.emotion,
      note: existing.note,
      selectedFrameworkKey: existing.selectedFrameworkKey,
      frameworkOverrideReason: existing.frameworkOverrideReason
    } : {})
  };
}


function updateStateCheckinPreview() {
  if (!$("stateEnergy")) return;
  const draft = stateCheckinFromForm();
  const mode = modeForCheckin(draft);
  $("stateEnergyValue").textContent = `${draft.energy ?? 0} %`;
  $("stateMoodValue").textContent = `${draft.mood ?? 0} %`;
  if ($("stateTaqwaValue")) $("stateTaqwaValue").textContent = `${draft.taqwa ?? 0} %`;
  if ($("stateEnergyMeaning")) $("stateEnergyMeaning").textContent = sliderMeaning("energy", draft.energy);
  if ($("stateMoodMeaning")) $("stateMoodMeaning").textContent = sliderMeaning("mood", draft.mood);
  if ($("stateTaqwaMeaning")) $("stateTaqwaMeaning").textContent = sliderMeaning("taqwa", draft.taqwa);
  const preview = $("stateFrameworkPreviewText");
  if (!preview) return;
  if (!mode) { preview.innerHTML = ""; return; }
  const role = dayRoleConfig(selectedDate);
  preview.style.setProperty("--framework-color", mode.color);
  preview.style.setProperty("--framework-soft", hexToRgba(mode.color, .12));
  preview.style.setProperty("--framework-glow", hexToRgba(mode.color, .24));
  preview.style.setProperty("--mode-color", mode.color);
  preview.style.setProperty("--mode-soft", hexToRgba(mode.color, .13));
  preview.style.setProperty("--mode-line", hexToRgba(mode.color, .28));
  // Dieselbe zentrale Textfunktion wie in der Hauptansicht.
  preview.innerHTML = `<strong>${escapeHTML(role.roleName)} · ${escapeHTML(mode.label)}</strong>`
    + coachImpulseHTML(draft.energy, draft.mood, mode.key);
}

function saveStateCheckin(event) {
  event.preventDefault();
  const entry = stateCheckinFromForm();
  const recommended = recommendedModeForCheckin(entry);
  entry.recommendedFrameworkKey = recommended?.key || "";
    const existing = (currentData.stateCheckins || []).find(item => item.slot === entry.slot);
  entry.id = existing?.id || `state-${selectedDate}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  entry.createdAt = existing?.createdAt || `${selectedDate}T${entry.time}:00`;
  currentData.stateCheckins = [...(currentData.stateCheckins || []).filter(item => item.slot !== entry.slot), entry]
    .sort((a, b) => slotIndex(a.slot) - slotIndex(b.slot) || a.time.localeCompare(b.time));
  if (entry.slot === "morning") {
    currentData.sleepQualityScore = entry.sleepQualityScore;
    currentData.dreamCategory = entry.dreamCategory;
    currentData.dreams = entry.dreamNote;
  }
  // Wird ein Nachmittag bewusst eingetragen, wechselt der Tag dauerhaft
  // auf die Fünfer-Struktur. Werte werden dabei nie erfunden.
  if (entry.slot === "afternoon") currentData.checkinStructure = 5;
  $("stateCheckinDialog").close();
  saveReview(true);
  renderStateOverview();
}

function prayerWasPerformed(value) {
  return Boolean(value) && value !== "Nicht gebetet";
}

function renderResponsibilityReflection() {
  if (!currentData) return;
  ["responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep"].forEach(id => {
    if ($(id) && document.activeElement !== $(id)) $(id).value = currentData[id] || "";
  });
}

/* Der Fokus wird im vorhandenen Rollenwähler bedient – der Header bleibt
   unverändert. Der letzte Eintrag öffnet den Fokusdialog. */
const ROLE_FOCUS_OPTION = "__rolefocus__";

function renderRolePickerOptions() {
  const picker = $("dayRole");
  if (!picker) return;
  const previous = picker.value;
  const focusRole = roleFocusIsActive() ? roleFocus.role : "";
  const options = ROLES.map(role => {
    const marker = role.name === focusRole ? " · Fokus" : "";
    return `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(roleDisplayName(role.name))}${marker}</option>`;
  }).join("");
  picker.innerHTML = `${options}<option value="${ROLE_FOCUS_OPTION}">◎ Rollenfokus ${focusRole ? "ändern" : "setzen"} …</option>`;
  picker.dataset.focusActive = focusRole ? "true" : "false";
  if (previous && previous !== ROLE_FOCUS_OPTION) picker.value = previous;
}

function fillRoleFocusForm() {
  const active = roleFocusIsActive();
  $("roleFocusRole").innerHTML = ROLES
    .map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(roleDisplayName(role.name))}</option>`).join("");
  $("roleFocusRole").value = active ? roleFocus.role : getRole(currentData?.role || ROLES[0].name).name;
  $("roleFocusDuration").value = active ? roleFocus.mode : "today";
  $("roleFocusDate").value = active && roleFocus.endDate ? roleFocus.endDate : addDays(todayISO(), 7);
  $("roleFocusDateField").hidden = $("roleFocusDuration").value !== "until";
  $("endRoleFocus").hidden = !active;
  $("roleFocusStatus").textContent = active
    ? `Aktiver Fokus: ${roleFocus.role} – ${roleFocusRangeLabel()}.`
    : "Kein Fokus aktiv. Es gilt die normale Wochenrotation.";
}

function openRoleFocusDialog() {
  fillRoleFocusForm();
  $("roleFocusDialog").showModal();
}

function applyRoleFocusAfterChange() {
  saveRoleFocus();
  renderRolePickerOptions();
  currentData = loadReview(selectedDate);
  fillForm();
  renderStats();
  renderAnalysis();
}

function saveRoleFocusFromForm(event) {
  event.preventDefault();
  const role = ROLES.some(item => item.name === $("roleFocusRole").value) ? $("roleFocusRole").value : ROLES[0].name;
  const duration = $("roleFocusDuration").value;
  const start = todayISO();
  let mode = "manual";
  let endDate = "";
  if (duration === "today") { mode = "today"; endDate = start; }
  else if (duration === "3") { mode = "days"; endDate = addDays(start, 2); }
  else if (duration === "7") { mode = "days"; endDate = addDays(start, 6); }
  else if (duration === "until") {
    mode = "until";
    const chosen = $("roleFocusDate").value;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(chosen) || chosen < start) {
      $("roleFocusStatus").textContent = "Bitte ein Enddatum ab heute wählen.";
      return;
    }
    endDate = chosen;
  }
  roleFocus = { role, mode, startDate: start, endDate };
  $("roleFocusDialog").close();
  applyRoleFocusAfterChange();
}

function endRoleFocus() {
  roleFocus = null;
  $("roleFocusDialog").close();
  applyRoleFocusAfterChange();
}

function applyRolePickerStyle() {
  const role = getRole($("dayRole").value || currentData?.role);
  const picker = $("dayRole");
  picker.style.setProperty("--role-color", role.color);
  picker.style.setProperty("--role-soft", hexToRgba(role.color, .18));
  picker.style.setProperty("--role-text", role.text);
  if ($("roleTagline")) $("roleTagline").textContent = ROLE_TAGLINES[role.name] || "Heute deine Rolle bewusst gestalten.";
  updateHeaderRoleUI(role);
  applyHeaderTheme(role);
}

/* Mischt eine Farbe in Richtung einer Zielfarbe. Rein visuell – die
   gespeicherten Rollenfarben selbst bleiben unverändert. */
function mixHex(hex, target, amount) {
  const a = hexToRgbTriple(hex);
  const b = hexToRgbTriple(target);
  const mixed = a.map((value, index) => Math.round(value + (b[index] - value) * amount));
  return `rgb(${mixed.join(",")})`;
}

/* Die Kopfzeile ist Glas: die Rollenfarbe trägt nur noch Verlauf, Akzentlinie
   und Schrifttönung. Weil helle Rollenfarben auf Glas sonst verschwinden
   würden, wird die Schriftfarbe aus der Rollenfarbe abgeleitet statt aus dem
   früheren Vollton-Kontrastwert. */
function applyHeaderTheme(role = getRole($("dayRole")?.value || currentData?.role || ROLES[0].name)) {
  const header = $("appHeader");
  if (!header) return;
  header.dataset.role = role.name;
  header.style.setProperty("--header-role", role.color);
  header.style.setProperty("--header-role-deep", mixHex(role.color, "#0b1734", .34));
  header.style.setProperty("--header-role-bright", mixHex(role.color, "#ffffff", .34));
  header.style.setProperty("--header-role-ink", role.text);
  document.documentElement.style.setProperty("--active-role", role.color);
  document.documentElement.style.setProperty("--active-role-soft", hexToRgba(role.color, .18));
  document.documentElement.style.setProperty("--active-role-softer", hexToRgba(role.color, .09));
}

function statusCircle(icon, variant = "neutral", size = "medium") {
  return `<span class="status-circle ${variant} ${size}">${icon}</span>`;
}

function prayerStateMeta(value) {
  return PRAYER_STATES.find(option => option.value === value) || PRAYER_STATES[0];
}

function prayerStateTheme(value) {
  switch (value) {
    case "Normal":
      return { a: "#6A76F8", b: "#5BA2FF", softA: .16, softB: .13, glow: .26 };
    case "Gemeinschaft":
      return { a: "#59D7F7", b: "#3FC4E8", softA: .18, softB: .14, glow: .24 };
    case "Verspätet":
      return { a: "#F6B14A", b: "#F08A35", softA: .18, softB: .14, glow: .24 };
    case "Nachgeholt":
      return { a: "#FF7A86", b: "#E05261", softA: .18, softB: .14, glow: .24 };
    case "Nicht gebetet":
      return { a: "#E05A66", b: "#B54A5A", softA: .18, softB: .14, glow: .18 };
    default:
      return { a: "#7A839A", b: "#5C6478", softA: .09, softB: .06, glow: .0 };
  }
}

function prayerStateIconHTML(value, size = "medium") {
  const meta = prayerStateMeta(value);
  // Die Farbe folgt dem Status, nicht dem Namen des Gebets.
  if (value === "") return statusCircle("", "neutral", size);
  if (value === "Nicht gebetet") return statusCircle("✕", "missed", size);
  if (value === "Nachgeholt") return statusCircle(meta.icon, "recovered", size);
  if (value === "Verspätet") return statusCircle(meta.icon, "warning", size);
  if (value === "Gemeinschaft") return statusCircle(meta.icon, "conscientious", size);
  return statusCircle("✓", "gradient", size);
}

function routineStateIconHTML(value, size = "small") {
  if (value === "done") return statusCircle("✓", "gradient", size);
  if (value === "responsiblySkipped") return statusCircle("✓", "conscientious", size);
  if (value === "missed") return statusCircle("✕", "missed", size);
  return statusCircle("–", "neutral", size);
}

function renderWaterControl() {
  const waterMl = Number(currentData?.water || 0);
  if ($("water")) $("water").value = String(waterMl);
  if ($("waterTotalDisplay")) $("waterTotalDisplay").textContent = `${(waterMl / 1000).toFixed(1).replace(".", ",")} Liter`;
  if ($("waterDroplets")) {
    const count = Math.max(1, Math.min(8, Math.round(waterMl / 500) || 1));
    const filled = Math.min(8, Math.round(waterMl / 500));
    $("waterDroplets").innerHTML = Array.from({length: count}, (_, index) => `<button type="button" class="water-drop ${index < filled ? 'filled' : ''}" data-water-direct="${(index + 1) * 500}" aria-label="${(index + 1) * 0.5} Liter">💧</button>`).join("");
    document.querySelectorAll("[data-water-direct]").forEach(button => button.addEventListener("click", () => {
      currentData.water = String(Number(button.dataset.waterDirect || 0));
      renderWaterControl(); saveReview(true);
    }));
  }
}

function updateRoutineStateButtons() {
  document.querySelectorAll("[data-routine-cycle]").forEach(button => {
    const key = button.dataset.routineCycle;
    const state = key === "morning" ? currentData.morningRoutineState : currentData.eveningRoutineState;
    const meta = TASK_STATE_META[state] || TASK_STATE_META[""];
    button.dataset.state = state;
    button.classList.toggle("is-done", state === "done");
    button.classList.remove("is-adapted", "is-responsible-skip");
    button.classList.toggle("is-conscientious", state === "responsiblySkipped");
    button.classList.toggle("is-missed", state === "missed");
    button.innerHTML = `${routineStateIconHTML(state, "small")}<span>${escapeHTML(meta.label)}</span>`;
    button.setAttribute("aria-label", `${key === "morning" ? "Morgenroutine" : "Abendroutine"}: ${meta.label}. Antippen zum Ändern.`);
  });
}

function cycleRoutineState(key) {
  const current = key === "morning" ? currentData.morningRoutineState : currentData.eveningRoutineState;
  const index = ROUTINE_STATE_ORDER.indexOf(current);
  const next = ROUTINE_STATE_ORDER[(index + 1) % ROUTINE_STATE_ORDER.length];
  if (key === "morning") currentData.morningRoutineState = next;
  else currentData.eveningRoutineState = next;
  updateRoutineStateButtons();
  saveReview(true);
}

function renderPrayers() {
  $("prayerList").innerHTML = PRAYERS.map(prayer => {
    const state = currentData.prayers?.[prayer] || "";
    const meta = prayerStateMeta(state);
    const theme = prayerStateTheme(state);
    // Die gesamte Karte ist die Schaltfläche – der Statuskreis allein war als
    // Trefferfläche zu klein und lag teilweise unter dem Kartennamen.
    return `<button type="button" class="prayer-card prayer-card-compact" data-state="${escapeHTML(state)}" data-open-prayer="${escapeHTML(prayer)}" data-prayer-kind="obligatory" style="--prayer-a:${theme.a};--prayer-b:${theme.b};--prayer-soft:${hexToRgba(theme.a, theme.softA)};--prayer-soft-b:${hexToRgba(theme.b, theme.softB)};--prayer-glow:${hexToRgba(theme.b, theme.glow)}" aria-label="${escapeHTML(prayer)}: ${escapeHTML(meta.label)}. Antippen zum Ändern.">
      <strong>${escapeHTML(prayer)}</strong>
      <span class="prayer-state-button">${prayerStateIconHTML(state, "medium")}</span>
    </button>`;
  }).join("");

  const sunnahList = $("sunnahPrayerList");
  if (sunnahList) {
    sunnahList.innerHTML = SUNNAH_PRAYERS.map(prayer => {
      const state = currentData.sunnahPrayers?.[prayer] || "";
      const meta = SUNNAH_PRAYER_STATES.find(option => option.value === state) || SUNNAH_PRAYER_STATES[0];
      // Antippen wechselt unmittelbar zum nächsten Status – wie bei den Routinen.
      return `<button type="button" class="sunnah-prayer-chip state-${state === "Verrichtet" ? "done" : state === "Nicht vorgesehen" ? "neutral" : "open"}" data-cycle-sunnah="${escapeHTML(prayer)}" aria-label="${escapeHTML(prayer)}: ${escapeHTML(meta.label)}. Antippen für den nächsten Status."><span>${state === "Verrichtet" ? "✓" : state === "Nicht vorgesehen" ? "–" : "○"}</span><strong>${escapeHTML(prayer)}</strong><small>${escapeHTML(meta.short)}</small></button>`;
    }).join("");
    const done = SUNNAH_PRAYERS.filter(prayer => currentData.sunnahPrayers?.[prayer] === "Verrichtet").length;
    if ($("sunnahPrayerSummary")) $("sunnahPrayerSummary").textContent = done ? `${done} verrichtet` : "Noch nichts erfasst";
  }

  document.querySelectorAll("[data-open-prayer]").forEach(button => button.addEventListener("click", () => openPrayerDialog(button.dataset.openPrayer, button.dataset.prayerKind || "obligatory")));
  document.querySelectorAll("[data-cycle-sunnah]").forEach(button => button.addEventListener("click", () => cycleSunnahPrayer(button.dataset.cycleSunnah)));
}

function openPrayerDialog(prayer, kind = "obligatory") {
  $("prayerDialogTitle").textContent = prayer;
  $("prayerDialog").dataset.prayer = prayer;
  $("prayerDialog").dataset.kind = kind;
  const states = kind === "sunnah" ? SUNNAH_PRAYER_STATES : PRAYER_STATES;
  const store = kind === "sunnah" ? currentData.sunnahPrayers : currentData.prayers;
  const current = store?.[prayer] || "";
  $("prayerStateOptions").innerHTML = states.map(option => {
    const stateClass = (option.value || "open").toLowerCase().replace(/[^a-z0-9äöüß]+/g, "-").replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
    return `
    <button type="button" class="prayer-option state-${stateClass} ${current === option.value ? "active" : ""}" data-prayer-option="${escapeHTML(option.value)}">
      ${kind === "sunnah" ? statusCircle(option.value === "Verrichtet" ? "✓" : option.value === "Nicht vorgesehen" ? "–" : "", option.value === "Verrichtet" ? "gradient" : "neutral", "medium") : prayerStateIconHTML(option.value, "medium")}
      <strong>${escapeHTML(option.label)}</strong>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-prayer-option]").forEach(button => button.addEventListener("click", () => {
    const prayerName = $("prayerDialog").dataset.prayer;
    const prayerKind = $("prayerDialog").dataset.kind;
    if (prayerKind === "sunnah") currentData.sunnahPrayers[prayerName] = button.dataset.prayerOption;
    else currentData.prayers[prayerName] = button.dataset.prayerOption;
    saveReview(true);
    renderPrayers();
    $("prayerDialog").close();
  }));
  $("prayerDialog").showModal();
}

function propagateRamadanForward(fromDate) {
  let runningValue = Number(currentData.ramadanDays || 0);
  for (let offset = 1; offset <= 3650; offset += 1) {
    const date = addDays(fromDate, offset);
    const rawText = localStorage.getItem(storageKey(date));
    if (!rawText) continue;
    const raw = safeParse(rawText);
    if (!raw) continue;
    if (raw.fastingCompleted) runningValue += 1;
    raw.ramadanDays = runningValue;
    localStorage.setItem(storageKey(date), JSON.stringify(raw));
  }
}

function propagateStreaksForward(fromDate) {
  let running = Object.fromEntries(STREAKS.map(streak => {
    const state = currentData.streaks?.[streak.key] || { days: 0, broken: false, todayStatus: "" };
    return [streak.key, { days: Number(state.days || 0), broken: Boolean(state.broken) }];
  }));

  for (let offset = 1; offset <= 3650; offset += 1) {
    const date = addDays(fromDate, offset);
    const rawText = localStorage.getItem(storageKey(date));
    if (!rawText) continue;
    const raw = safeParse(rawText);
    if (!raw) continue;
    raw.streaks = raw.streaks || {};
    STREAKS.forEach(streak => {
      const existing = raw.streaks[streak.key] || {};
      const todayStatus = STREAK_DAILY_STATES[existing.todayStatus] ? existing.todayStatus : "";
      const brokenHere = Boolean(existing.broken || existing.status === "broken" || todayStatus === "lapse");
      const next = brokenHere
        ? { days: 0, broken: true, todayStatus: "lapse" }
        : { days: running[streak.key].broken ? 0 : running[streak.key].days + 1, broken: false, todayStatus };
      raw.streaks[streak.key] = next;
      running[streak.key] = next;
    });
    localStorage.setItem(storageKey(date), JSON.stringify(raw));
  }
}

function updateRamadanDisplay() {
  const value = Number($("ramadanDays").value || 0);
  const display = $("ramadanDisplay");
  display.className = value < 0 ? "ramadan-negative" : value === 0 ? "ramadan-zero" : "ramadan-positive";
  display.textContent = value < 0 ? `${Math.abs(value)} Tage offen` : value === 0 ? "Alle Tage nachgeholt" : `${value} zusätzliche Tage`;
  const button = $("ramadanComplete");
  button.disabled = Boolean(currentData?.fastingCompleted);
  button.textContent = currentData?.fastingCompleted ? "Fastentag geschafft ✓" : "Fastentag geschafft";
}

function renderActivities() {
  const list = $("activityList");
  if (!list) return;
  const activities = (currentData.activities || []).map(normalizeActivity);
  currentData.activities = activities;
  // Tagesbegrenzte Vorlagen zählen nur mit ihrem ersten Eintrag des Tages.
  const cappedShown = {};
  list.innerHTML = activities.length ? activities.map((activity, index) => {
    const role = getRole(activity.role);
    const cap = activityDailyCap(activity.template);
    let points;
    if (cap !== null) {
      points = cappedShown[activity.template]
        ? "Tagesbegrenzung"
        : `${formatPoints(cap)} ${cap === 1 ? "Punkt" : "Punkte"}`;
      cappedShown[activity.template] = true;
    } else {
      points = `${formatPoints(activity.weight)} ${activity.weight === 1 ? "Punkt" : "Punkte"}`;
    }
    return `<div class="activity-row tracking-activity" data-activity-index="${index}" style="--activity-color:${role.color};--activity-soft:${hexToRgba(role.color,.10)};--activity-glow:${hexToRgba(role.color,.18)}">
      <div class="activity-main">
        <div class="activity-copy"><strong>${escapeHTML(activity.title)}</strong><small>${escapeHTML(role.emoji)} ${escapeHTML(role.name)} · ${escapeHTML(points)}</small></div>
      </div>
      <div class="activity-sort-actions" aria-label="Aktivität sortieren">
        <button type="button" data-move-activity="-1" data-activity-index="${index}" ${index === 0 ? "disabled" : ""} aria-label="Nach oben">↑</button>
        <button type="button" data-move-activity="1" data-activity-index="${index}" ${index === activities.length - 1 ? "disabled" : ""} aria-label="Nach unten">↓</button>
      </div>
      <button type="button" class="delete-button" data-delete-activity="${index}" aria-label="Aktivität löschen">×</button>
    </div>`;
  }).join("") : `<p class="activity-empty">Noch keine Aktivität dokumentiert.</p>`;

  document.querySelectorAll("[data-move-activity]").forEach(button => button.addEventListener("click", () => {
    moveArrayItem(currentData.activities, Number(button.dataset.activityIndex), Number(button.dataset.moveActivity));
    saveReview(true);
    renderActivities();
  }));
  document.querySelectorAll("[data-delete-activity]").forEach(button => button.addEventListener("click", () => {
    currentData.activities.splice(Number(button.dataset.deleteActivity), 1);
    saveReview(true);
    renderActivities();
  }));
}

/* Eine Vorlage setzt Titel, Rolle und Gewicht eindeutig. Nur „Eigene
   Aktivität" lässt Titel und Rolle frei – ihr Wert ist fest ein Punkt. */
function applyActivityTemplate() {
  const select = $("activityTemplate");
  if (!select) return;
  const template = activityTemplate(select.value) || activityTemplate("custom");
  const isCustom = template.key === "custom";
  const titleField = $("activityTitle");
  const roleField = $("activityRole");
  if (titleField) {
    titleField.disabled = !isCustom;
    titleField.required = isCustom;
    if (!isCustom) titleField.value = template.title;
  }
  if (roleField) {
    roleField.disabled = !isCustom;
    if (!isCustom) roleField.value = template.role;
  }
  const hint = $("activityWeightHint");
  if (hint) {
    const cap = activityDailyCap(template.key);
    hint.textContent = cap !== null
      ? `${template.role} · ${formatPoints(cap)} ${cap === 1 ? "Punkt" : "Punkte"} je Kalendertag, unabhängig von der Anzahl der Einträge.`
      : isCustom
        ? `Frei wählbar · ${formatPoints(template.weight)} Punkt`
        : `${template.role} · ${formatPoints(template.weight)} ${template.weight === 1 ? "Punkt" : "Punkte"}`;
  }
}

function moveArrayItem(array, index, delta) {
  const target = index + delta;
  if (target < 0 || target >= array.length) return;
  [array[index], array[target]] = [array[target], array[index]];
}

/* Kompakte Umrechnung der exakten Tageszahl. Die Streak-Logik selbst bleibt
   unverändert – dies ist ausschließlich eine zusätzliche Lesehilfe. */
function humanDuration(days) {
  const total = Math.max(0, Math.floor(Number(days) || 0));
  if (total < 30) return "";
  const years = Math.floor(total / 365);
  const months = Math.floor((total - years * 365) / 30);
  if (!years) return `≈ ${months} ${months === 1 ? "Monat" : "Monate"}`;
  const yearText = `${years} ${years === 1 ? "Jahr" : "Jahre"}`;
  return months ? `≈ ${yearText} und ${months} ${months === 1 ? "Monat" : "Monate"}` : `≈ ${yearText}`;
}

function renderStreaks() {
  const list = $("streakList");
  if (!list || !currentData) return;
  list.innerHTML = STREAKS.map(streak => {
    const state = currentData.streaks?.[streak.key] || { days: 0, broken: false, todayStatus: "" };
    const isActive = !state.broken && Number(state.days || 0) > 0;
    const daily = STREAK_DAILY_STATES[state.todayStatus || ""] || STREAK_DAILY_STATES[""];
    const statusText = state.todayStatus === "lapse" ? "Unterbrochen" : isActive ? "Aktiv" : "Offen";
    return `<div class="streak-card ${state.broken ? "streak-broken" : ""} ${isActive ? "streak-active" : ""} ${state.todayStatus === "resisted" ? "streak-victory" : ""}">
      <div class="streak-card-head">
        <div><strong>${escapeHTML(streak.label)}</strong><small>${escapeHTML(daily.label)}</small></div>
        <span class="streak-status">${statusText}</span>
      </div>
      <div class="streak-input-wrap">
        <input class="streak-days-large" type="number" min="0" inputmode="numeric" data-streak-days="${streak.key}" value="${Number(state.days || 0)}" aria-label="${escapeHTML(streak.label)} Tage">
        <span class="streak-unit">Tage</span>
      </div>
      ${humanDuration(Number(state.days || 0)) ? `<small class="streak-duration">${escapeHTML(humanDuration(Number(state.days || 0)))}</small>` : ""}
      <div class="streak-daily-actions" role="group" aria-label="Unterbrechung erfassen">
        <button type="button" class="danger ${state.todayStatus === "lapse" ? "active" : ""}" data-streak-daily="lapse" data-streak-key="${streak.key}">Unterbrechung</button>
      </div>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-streak-days]").forEach(input => input.addEventListener("change", () => {
    const state = currentData.streaks[input.dataset.streakDays];
    state.days = Math.max(0, Number(input.value || 0));
    state.broken = false;
    if (state.todayStatus === "lapse") state.todayStatus = "";
    saveReview(true); propagateStreaksForward(selectedDate); renderStreaks();
  }));
  document.querySelectorAll("[data-streak-daily]").forEach(button => button.addEventListener("click", () => {
    const state = currentData.streaks[button.dataset.streakKey];
    state.todayStatus = state.todayStatus === "lapse" ? "" : "lapse";
    state.broken = state.todayStatus === "lapse";
    if (state.broken) state.days = 0;
    saveReview(true); propagateStreaksForward(selectedDate); renderStreaks(); renderStats();
  }));
}

/* --------------------------------------------------------------------------
   Wochenrückblick
   Sieben Tage bis einschließlich des gewählten Datums. Die Auswertung bleibt
   beschreibend: keine Erfolgsquote, kein Gesamtscore, keine Bewertung.
   -------------------------------------------------------------------------- */
/* Immer eine vollständige Kalenderwoche, Montag bis Sonntag.
   weekOffset zählt Wochen zurück; 0 ist die Woche des gewählten Tages.
   Zeiträume nach dem gewählten Tag sind nicht erreichbar (siehe shiftRange). */
let weekOffset = 0;
let slideOffset = 0;
let weekMode = "calendar";

function loadWeekMode() {
  const stored = localStorage.getItem(WEEK_MODE_STORAGE_KEY);
  weekMode = stored === "sliding" ? "sliding" : "calendar";
  return weekMode;
}

function setWeekMode(mode) {
  weekMode = mode === "sliding" ? "sliding" : "calendar";
  localStorage.setItem(WEEK_MODE_STORAGE_KEY, weekMode);
  weekOffset = 0;
  slideOffset = 0;
  renderStats();
}

/* Kalenderwoche: immer Montag bis Sonntag, auch in der laufenden Woche.
   Zukünftige Tage bleiben sichtbar und leer – es wird nicht abgeschnitten. */
function weekDates(reference = selectedDate, offset = weekOffset) {
  const monday = addDays(mondayOf(reference), offset * 7);
  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
}

/* Gleitende sieben Tage: der Zeitraum endet am gewählten Tag und verschiebt
   sich mit jedem Pfeil oder Wisch um genau einen Tag. */
function slidingDates(reference = selectedDate, offset = slideOffset) {
  const end = addDays(reference, offset);
  return Array.from({ length: 7 }, (_, index) => addDays(end, index - 6));
}

function rangeDates() {
  return weekMode === "sliding" ? slidingDates() : weekDates();
}

// Laune eines Tages: Mittel der erfassten Tages-Check-ins.
function dailyAverageMood(data) {
  const values = (data?.stateCheckins || [])
    .filter(entry => entry.mood !== null && entry.mood !== undefined)
    .map(entry => clamp(Number(entry.mood), 0, 100));
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

// Morgen- und Abendroutine eines Tages, in genau dieser Reihenfolge.
function dailyRoutineStates(data) {
  return [data?.morningRoutineState || "", data?.eveningRoutineState || ""];
}

/* Ein Schritt entspricht im Kalendermodus einer vollständigen Woche und im
   gleitenden Modus genau einem Tag. Über den gewählten Tag hinaus wird nicht
   nach vorne navigiert. */
function shiftRange(delta) {
  if (weekMode === "sliding") {
    const next = slideOffset + delta;
    if (next > 0 || next < -3650) return false;
    slideOffset = next;
  } else {
    const next = weekOffset + delta;
    if (next > 0 || next < -520) return false;
    weekOffset = next;
  }
  renderStats();
  return true;
}

// Energie eines Tages: Mittel der erfassten Tages-Check-ins (die Nacht trägt
// keinen Energiewert und bleibt deshalb außen vor).
function dailyAverageEnergy(data) {
  // Seit alle vier Check-ins Energie erfassen, zählt auch die Nacht mit –
  // sonst fehlte an Tagen mit reinem Nacht-Check-in der Energiewert.
  const values = (data?.stateCheckins || [])
    .filter(entry => entry.energy !== null && entry.energy !== undefined)
    .map(entry => clamp(Number(entry.energy), 0, 100));
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

/* Gottesfurcht eines Tages: Mittel der Check-ins, die einen Wert enthalten.
   Tage ohne Angabe bleiben leer – es wird nichts interpoliert. */
function dailyAverageTaqwa(data) {
  const values = (data?.stateCheckins || [])
    .filter(entry => entry.taqwa !== null && entry.taqwa !== undefined && entry.taqwa !== "")
    .map(entry => clamp(Number(entry.taqwa), 0, 100));
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

// Belastung als eigenständige Kurve: hoher Wert bedeutet hohe Belastung.
function dailyAverageLoad(data) {
  const levels = { low: 20, normal: 50, high: 85 };
  const values = (data?.stateCheckins || [])
    .filter(entry => entry.slot !== "night")
    .map(entry => levels[entry.load] ?? levels.normal);
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function dailyPrayerProgress(data) {
  const count = PRAYERS.filter(prayer => prayerWasPerformed(data?.prayers?.[prayer])).length;
  return { count, total: PRAYERS.length };
}

function buildWeeklyTrendChart(labels, series, options = {}) {
  const width = 440;
  const height = 380;
  const padLeft = 30;
  const padRight = 12;
  const padTop = 14;
  const padBottom = 28;
  const plotWidth = width - padLeft - padRight;
  const plotHeight = height - padTop - padBottom;
  const xFor = index => padLeft + (labels.length === 1 ? plotWidth / 2 : plotWidth * index / (labels.length - 1));
  const yFor = value => padTop + plotHeight * (1 - clamp(value, 0, 100) / 100);
  const todayIndex = Number.isInteger(options.todayIndex) ? options.todayIndex : -1;

  const grid = [0, 25, 50, 75, 100].map(value => {
    const y = yFor(value);
    return `<line x1="${padLeft}" y1="${y.toFixed(1)}" x2="${width - padRight}" y2="${y.toFixed(1)}"></line>
      <text x="${padLeft - 6}" y="${(y + 3.5).toFixed(1)}" text-anchor="end">${value}</text>`;
  }).join("");

  // Lücken (Tage ohne Eintrag) unterbrechen die Linie, statt sie zu erfinden.
  // Die Kurvenführung ist aus der früheren Designsprache übernommen: weiche
  // Bézier-Segmente statt harter Knicke.
  const paths = series.map(item => {
    const segments = [];
    let current = [];
    item.values.forEach((value, index) => {
      if (value === null || value === undefined) {
        if (current.length) segments.push(current);
        current = [];
        return;
      }
      current.push({ x: xFor(index), y: yFor(value) });
    });
    if (current.length) segments.push(current);
    return segments
      .filter(segment => segment.length > 1)
      .map(points => {
        let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
        for (let i = 1; i < points.length; i += 1) {
          const prev = points[i - 1];
          const point = points[i];
          const mid = (prev.x + point.x) / 2;
          d += ` C${mid.toFixed(1)} ${prev.y.toFixed(1)}, ${mid.toFixed(1)} ${point.y.toFixed(1)}, ${point.x.toFixed(1)} ${point.y.toFixed(1)}`;
        }
        return `<path class="wellbeing-line ${item.className}" d="${d}"></path>`;
      })
      .join("");
  }).join("");

  const dots = series.map(item => item.values.map((value, index) => value === null || value === undefined
    ? ""
    : `<circle class="wellbeing-dot ${item.className} ${index === todayIndex ? "today" : ""}" cx="${xFor(index).toFixed(1)}" cy="${yFor(value).toFixed(1)}" r="${index === todayIndex ? 6.5 : 5.0}"></circle>`).join("")).join("");

  // Ruhige Markierung des heutigen Tages – ohne Wertung, nur zur Orientierung.
  const bandWidth = labels.length > 1 ? plotWidth / (labels.length - 1) * 0.64 : 40;
  const todayBand = todayIndex < 0 ? "" :
    `<rect class="trend-today-band" x="${(xFor(todayIndex) - bandWidth / 2).toFixed(1)}" y="${padTop}" width="${bandWidth.toFixed(1)}" height="${plotHeight}" rx="10"></rect>`;

  const xLabels = labels.map((label, index) =>
    `<text x="${xFor(index).toFixed(1)}" y="${height - 8}" text-anchor="middle" class="${index === todayIndex ? "today" : ""}">${escapeHTML(label)}</text>`).join("");

  const legend = series.map(item =>
    `<span class="${item.className}"><i aria-hidden="true"></i>${escapeHTML(item.label)}</span>`).join("");

  return `<div class="trend-panel">
    <div class="trend-legend">${legend}</div>
    <svg class="trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Verlauf von Energie, Laune und Gottesfurcht">
      ${todayBand}
      <g class="trend-grid">${grid}</g>
      ${paths}
      ${dots}
      <g class="trend-x-labels">${xLabels}</g>
    </svg>
    <p class="trend-note">Tage ohne Eintrag bleiben leer. Die Darstellung beschreibt den Verlauf und bewertet ihn nicht.</p>
  </div>`;
}

/* Kleines eigenes Stern-Symbol. Signalisiert ausschließlich, dass ein
   Bereich an diesem Tag vollständig verantwortungsvoll abgeschlossen wurde –
   keine Punktzahl, keine Bewertung, keine Gamification. */
function achievementStar(label) {
  return `<svg class="achievement-star" viewBox="0 0 24 24" role="img" aria-label="${escapeHTML(label)}">
    <path d="M12 3.2l2.28 5.02 5.47.6-4.07 3.7 1.12 5.38L12 15.2l-4.8 2.7 1.12-5.38L4.25 8.82l5.47-.6z"></path>
  </svg>`;
}

function buildPrayerWeekPanel(labels, counts) {
  const days = labels.map((label, index) => {
    const count = counts[index];
    const dots = Array.from({ length: PRAYERS.length }, (_, dot) =>
      `<i class="${count !== null && count !== undefined && dot < count ? "filled" : ""}"></i>`).join("");
    return `<div class="prayer-week-day">
      <small>${escapeHTML(label)}</small>
      <div class="prayer-week-dots">${dots}</div>
      <b class="week-mark">${count === PRAYERS.length ? achievementStar("Alle Pflichtgebete erfüllt") : ""}</b>
    </div>`;
  }).join("");
  return `<div class="prayer-week-panel">
    <span class="panel-caption">Pflichtgebete pro Tag</span>
    <div class="prayer-week-grid">${days}</div>
  </div>`;
}

function renderStats() {
  if (!currentData) return;
  const dates = rangeDates();
  const reviews = dates.map(date => ({ date, data: loadReview(date), stored: Boolean(localStorage.getItem(storageKey(date))) }));
  const labels = dates.map(date => new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(new Date(`${date}T12:00:00`)).replace(".", ""));
  const energy = reviews.map(item => item.stored ? dailyAverageEnergy(item.data) : null);
  const mood = reviews.map(item => item.stored ? dailyAverageMood(item.data) : null);
  const taqwa = reviews.map(item => item.stored ? dailyAverageTaqwa(item.data) : null);
  /* Die Pflichtgebete stehen ausschließlich in ihrer eigenen Wochenübersicht
     darunter – sie sind bewusst keine Kurve im Liniengraphen. */
  const prayerCounts = reviews.map(item => item.stored ? dailyPrayerProgress(item.data).count : null);
  const routineStates = reviews.map(item => item.stored ? dailyRoutineStates(item.data) : ["", ""]);
  const today = todayISO();

  const label = $("weekLabel");
  // Kurz halten: neben der Überschrift steht auf schmalen Geräten wenig Platz.
  if (label) label.textContent = weekMode === "sliding"
    ? (slideOffset === 0 ? "Letzte 7 Tage" : `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`)
    : (weekOffset === 0 && dates.includes(today) ? "Diese Woche" : `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`);

  const range = $("weekRange");
  if (range) range.textContent = `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`;
  const back = $("weekBack");
  const forward = $("weekForward");
  if (back) back.disabled = false;
  if (forward) forward.disabled = weekMode === "sliding" ? slideOffset >= 0 : weekOffset >= 0;
  document.querySelectorAll("[data-week-mode]").forEach(button => {
    const selected = button.dataset.weekMode === weekMode;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });

  $("statsGrid").innerHTML = `
    ${buildWeeklyTrendChart(labels, [
      { label: "Energie", className: "energy", values: energy },
      { label: "Laune", className: "mood", values: mood },
      { label: "Gottesfurcht", className: "taqwa", values: taqwa }
    ], { todayIndex: dates.indexOf(today) })}
    ${buildPrayerWeekPanel(labels, prayerCounts)}
    ${buildRoutineWeekPanel(labels, routineStates)}`;
}

/* Zweite Wochenübersicht direkt unter den Gebeten: zwei Punkte pro Tag.
   Erster Punkt Morgenroutine, zweiter Punkt Abendroutine – ohne Beschriftung. */
function buildRoutineWeekPanel(labels, states) {
  // Verantwortungsvoll abgeschlossen heißt: tatsächlich durchgeführt ODER
  // bewusst und gewissenhaft nicht durchgeführt. Beides zählt gleich.
  const isSettled = state => state === "done" || state === "responsiblySkipped";
  const days = labels.map((label, index) => {
    const pair = states[index] || ["", ""];
    const dots = pair.map(state => `<i class="${isSettled(state) ? "filled" : ""}"></i>`).join("");
    const both = pair.length === 2 && pair.every(isSettled);
    return `<div class="routine-week-day">
      <small>${escapeHTML(label)}</small>
      <div class="routine-week-dots">${dots}</div>
      <b class="week-mark">${both ? achievementStar("Beide Routinen verantwortungsvoll abgeschlossen") : ""}</b>
    </div>`;
  }).join("");
  return `<div class="routine-week-panel">
    <span class="panel-caption">Routinen pro Tag</span>
    <div class="routine-week-grid">${days}</div>
  </div>`;
}

/* ==========================================================================
   AUSWERTUNG
   Dritter Navigationstab. Alle Zahlen und alle Impulse entstehen
   ausschließlich regelbasiert aus den gespeicherten Einträgen. Es wird nichts
   geschätzt, ergänzt oder hochgerechnet; fehlende Angaben bleiben leer.
   ========================================================================== */
let analysisMonth = todayISO().slice(0, 7);
let roleSplitRange = "week";

function monthDates(month) {
  const first = `${month}-01`;
  const cursor = new Date(`${first}T12:00:00`);
  const total = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  return Array.from({ length: total }, (_, index) => addDays(first, index));
}

function monthLabelText(month) {
  return new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(new Date(`${month}-01T12:00:00`));
}

function shiftAnalysisMonth(delta) {
  const date = new Date(`${analysisMonth}-01T12:00:00`);
  date.setMonth(date.getMonth() + delta);
  const next = dateToISO(date).slice(0, 7);
  if (next > todayISO().slice(0, 7)) return;
  analysisMonth = next;
  renderAnalysis();
}

// Nur tatsächlich gespeicherte Tage zählen. Leere Tage bleiben leer.
function storedReviews(dates) {
  return dates
    .filter(date => Boolean(localStorage.getItem(storageKey(date))))
    .map(date => ({ date, data: loadReview(date) }));
}

function averageOf(values) {
  const clean = values.filter(value => value !== null && value !== undefined);
  if (!clean.length) return null;
  return Math.round(clean.reduce((sum, value) => sum + value, 0) / clean.length);
}

function periodStats(dates) {
  const entries = storedReviews(dates);
  const checkins = entries.reduce((sum, item) => sum + (item.data.stateCheckins?.length || 0), 0);
  const prayerCount = entries.reduce((sum, item) => sum + dailyPrayerProgress(item.data).count, 0);
  const isSettled = state => state === "done" || state === "responsiblySkipped";
  const routineCount = entries.reduce((sum, item) =>
    sum + [item.data.morningRoutineState, item.data.eveningRoutineState].filter(isSettled).length, 0);
  const fastingDays = entries.filter(item => item.data.fastingCompleted).length;
  const smaDays = entries.filter(item => (item.data.activities || []).some(activity => normalizeActivity(activity).isSma)).length;
  return {
    entries,
    entryDays: entries.length,
    checkins,
    energy: averageOf(entries.map(item => dailyAverageEnergy(item.data))),
    mood: averageOf(entries.map(item => dailyAverageMood(item.data))),
    taqwa: averageOf(entries.map(item => dailyAverageTaqwa(item.data))),
    prayerCount,
    prayerPossible: entries.length * PRAYERS.length,
    routineCount,
    routinePossible: entries.length * 2,
    fastingDays,
    smaDays,
    smaPoints: roundPoints(smaDays * SMA_DAY_POINTS)
  };
}

function previousMonth(month) {
  const date = new Date(`${month}-01T12:00:00`);
  date.setMonth(date.getMonth() - 1);
  return dateToISO(date).slice(0, 7);
}

/* Trend in Worten. Ohne Vergleichswert erscheint bewusst kein Trend –
   ein fehlender Vormonat wird nicht als Rückgang dargestellt. */
function trendText(current, previous, unit = " %") {
  if (current === null || current === undefined || previous === null || previous === undefined) return "";
  const diff = Math.round(current - previous);
  if (diff === 0) return "unverändert zum Vormonat";
  return `${Math.abs(diff)}${unit} ${diff > 0 ? "über" : "unter"} dem Vormonat`;
}

function statRowHTML(label, value, trend = "") {
  return `<div class="month-stat">
    <span>${escapeHTML(label)}</span>
    <strong>${escapeHTML(value)}</strong>
    ${trend ? `<small>${escapeHTML(trend)}</small>` : ""}
  </div>`;
}

function monthImpulseList(stats, month) {
  const impulses = [];
  const dayCount = monthDates(month).length;
  if (!stats.entryDays) {
    impulses.push("Für diesen Monat liegen noch keine Einträge vor.");
    return impulses;
  }
  impulses.push(`An ${stats.entryDays} von ${dayCount} Tagen hast du etwas festgehalten – ${stats.checkins} ${stats.checkins === 1 ? "Check-in ist" : "Check-ins sind"} darin enthalten.`);
  if (stats.prayerCount) {
    const average = (stats.prayerCount / stats.entryDays).toFixed(1).replace(".", ",");
    impulses.push(`${stats.prayerCount} Pflichtgebete erfasst, im Schnitt ${average} von ${PRAYERS.length} je Eintragstag.`);
  }
  if (stats.taqwa !== null) {
    impulses.push(stats.taqwa >= 60
      ? `Die Gottesfurcht liegt im Schnitt bei ${stats.taqwa} % – eine tragende Ausrichtung über den Monat.`
      : `Die Gottesfurcht liegt im Schnitt bei ${stats.taqwa} %. Ein fester Ankerpunkt am Tag kann sie sichtbar halten.`);
  }
  if (stats.routineCount) {
    impulses.push(stats.routineCount === 1
      ? "Eine Routine wurde abgeschlossen oder bewusst ausgelassen."
      : `${stats.routineCount} Routinen wurden abgeschlossen oder bewusst ausgelassen.`);
  }
  if (stats.smaDays) {
    impulses.push(`${stats.smaDays} ${stats.smaDays === 1 ? "SMA-Arbeitstag" : "SMA-Arbeitstage"} · ${formatPoints(stats.smaPoints)} ${stats.smaPoints === 1 ? "Punkt" : "Punkte"}.`);
  }
  if (stats.fastingDays) {
    impulses.push(stats.fastingDays === 1
      ? "Ein Fastentag ist in diesem Monat erfasst."
      : `${stats.fastingDays} Fastentage sind in diesem Monat erfasst.`);
  }
  if (stats.energy !== null && stats.mood !== null && stats.energy < 45 && stats.mood < 45) {
    impulses.push("Energie und Laune lagen über weite Strecken niedrig. Ein bewusst kleineres Pensum ist eine angemessene Antwort darauf.");
  }
  return impulses;
}

function renderMonthReview() {
  const summary = $("monthSummary");
  const impulses = $("monthImpulses");
  if (!summary || !impulses) return;

  const label = $("monthLabel");
  if (label) label.textContent = monthLabelText(analysisMonth);
  const forward = $("monthForward");
  if (forward) forward.disabled = analysisMonth >= todayISO().slice(0, 7);

  const stats = periodStats(monthDates(analysisMonth));
  const past = periodStats(monthDates(previousMonth(analysisMonth)));
  const value = (number, suffix = " %") => number === null ? "–" : `${number}${suffix}`;

  summary.innerHTML = `
    ${statRowHTML("Eintragstage", `${stats.entryDays}`, trendText(stats.entryDays, past.entryDays || null, ""))}
    ${statRowHTML("Check-ins", `${stats.checkins}`, trendText(stats.checkins, past.checkins || null, ""))}
    ${statRowHTML("Energie", value(stats.energy), trendText(stats.energy, past.energy))}
    ${statRowHTML("Laune", value(stats.mood), trendText(stats.mood, past.mood))}
    ${statRowHTML("Gottesfurcht", value(stats.taqwa), trendText(stats.taqwa, past.taqwa))}
    ${statRowHTML("Pflichtgebete", stats.prayerPossible ? `${stats.prayerCount} von ${stats.prayerPossible}` : "–")}
    ${statRowHTML("Routinen", stats.routinePossible ? `${stats.routineCount} von ${stats.routinePossible}` : "–")}
    ${statRowHTML("Fastentage", `${stats.fastingDays}`)}`;

  impulses.innerHTML = `<h3 class="month-impulse-title">Rückblick &amp; Impulse</h3>
    <ul class="impulse-list">${monthImpulseList(stats, analysisMonth).map(text => `<li>${escapeHTML(text)}</li>`).join("")}</ul>`;
}

function exportMonthReport() {
  const stats = periodStats(monthDates(analysisMonth));
  const past = periodStats(monthDates(previousMonth(analysisMonth)));
  const split = roleSplitData(monthDates(analysisMonth));
  const value = (number, suffix = " %") => number === null ? "keine Angabe" : `${number}${suffix}`;
  const lines = [
    `ROLEPLAY – Monatsrückblick ${monthLabelText(analysisMonth)}`,
    "",
    `Eintragstage: ${stats.entryDays}`,
    `Check-ins: ${stats.checkins}`,
    `Energie: ${value(stats.energy)}${trendText(stats.energy, past.energy) ? ` (${trendText(stats.energy, past.energy)})` : ""}`,
    `Laune: ${value(stats.mood)}${trendText(stats.mood, past.mood) ? ` (${trendText(stats.mood, past.mood)})` : ""}`,
    `Gottesfurcht: ${value(stats.taqwa)}${trendText(stats.taqwa, past.taqwa) ? ` (${trendText(stats.taqwa, past.taqwa)})` : ""}`,
    `Pflichtgebete: ${stats.prayerCount} von ${stats.prayerPossible}`,
    `Routinen: ${stats.routineCount} von ${stats.routinePossible}`,
    `Fastentage: ${stats.fastingDays}`,
    `SMA-Arbeitstage: ${stats.smaDays} · ${formatPoints(stats.smaPoints)} Punkte`,
    "",
    "",
    "Rollenpräsenz",
    ...ROLES.map(role => {
      const entry = split.roles.find(item => item.role === role.name);
      return `  ${role.name}: ${formatPoints(entry.points)} Präsenzpunkte · ${entry.rows.length} ${entry.rows.length === 1 ? "Aktivität" : "Aktivitäten"}`;
    }),
    "",
    "Rückblick & Impulse",
    ...monthImpulseList(stats, analysisMonth).map(text => `  - ${text}`)
  ];
  downloadTextFile(`roleplay-monatsreport-${analysisMonth}.txt`, lines.join("\r\n"), "text/plain;charset=utf-8");
  const impulses = $("monthImpulses");
  if (impulses) impulses.dataset.exported = "true";
}

/* --------------------------------------------------------------------------
   Rollenpräsenz
   Die Punkte zeigen, welchen Rollen durch bewusst erfasste Aktivitäten Raum
   gegeben wurde. Sie messen ausdrücklich weder Zeitaufwand noch Auslastung,
   Produktivität, Pflichterfüllung oder persönlichen Wert.
   -------------------------------------------------------------------------- */
function roleSplitDates() {
  return roleSplitRange === "month" ? monthDates(analysisMonth) : weekDates(selectedDate, 0);
}

function roleSplitData(dates) {
  const rowsByRole = Object.fromEntries(ROLES.map(role => [role.name, []]));
  storedReviews(dates).forEach(({ date, data }) => {
    activityPointRows(data, date).forEach(row => {
      if (!rowsByRole[row.role]) rowsByRole[row.role] = [];
      rowsByRole[row.role].push(row);
    });
  });
  const roles = ROLES.map(role => {
    const rows = [...(rowsByRole[role.name] || [])].sort((a, b) => a.date.localeCompare(b.date));
    return {
      role: role.name,
      rows,
      activeDays: new Set(rows.map(row => row.date)).size,
      points: roundPoints(rows.reduce((sum, row) => sum + row.points, 0))
    };
  });
  const total = roundPoints(roles.reduce((sum, item) => sum + item.points, 0));
  const activityCount = roles.reduce((sum, item) => sum + item.rows.length, 0);
  const represented = roles.filter(item => item.points > 0).length;
  const leader = [...roles].sort((a, b) => b.points - a.points)[0];
  return { roles, total, activityCount, represented, leader: leader && leader.points > 0 ? leader : null };
}

function roleSplitImpulseList(split) {
  const impulses = [];
  if (!split.activityCount) {
    impulses.push("In diesem Zeitraum sind noch keine Aktivitäten eingetragen.");
    return impulses;
  }
  impulses.push(`Du hast ${split.activityCount} ${split.activityCount === 1 ? "Aktivität" : "Aktivitäten"} festgehalten; daraus ergeben sich ${formatPoints(split.total)} ${split.total === 1 ? "Präsenzpunkt" : "Präsenzpunkte"} auf ${split.represented} ${split.represented === 1 ? "Rolle" : "Rollen"}.`);
  if (split.leader) {
    impulses.push(`Schwerpunkt der Rollenpräsenz war ${split.leader.role} mit ${formatPoints(split.leader.points)} Punkten.`);
  }
  const open = split.roles.filter(item => item.points === 0).map(item => item.role);
  // Während eines aktiven Fokus wird keine andere Rolle als offen ausgewiesen.
  if (open.length && !roleFocusIsActive()) {
    impulses.push(open.length === 1
      ? `${open[0]} ist in diesem Zeitraum nicht erfasst – eine kleine Aktivität würde genügen.`
      : `Nicht erfasst: ${open.join(", ")}. Eine einzelne Aktivität reicht, um eine davon aufzunehmen.`);
  }
  if (roleFocusIsActive()) {
    impulses.push(`Der Rollenfokus liegt derzeit auf ${roleFocus.role} – ${roleFocusRangeLabel()}.`);
  }
  return impulses;
}

/* Neutraler Status einer Rolle. Bewusst ohne wertende Begriffe: eine Rolle
   ohne Eintrag ist „nicht erfasst" – nicht schwach, schlecht oder
   vernachlässigt. */
function rolePresenceStatus(item, split) {
  if (item.points === 0) return "nicht erfasst";
  if (split.leader && split.leader.role === item.role) return "Schwerpunkt";
  return "sichtbar";
}

/* Ruhige Gesamtverteilung: die Anteile aller vertretenen Rollen an der
   erfassten Präsenz, in stabiler Rollenreihenfolge. */
function rolePresenceDistributionHTML(split) {
  if (!split.total) {
    return `<p class="role-presence-empty">Noch keine Präsenzpunkte in diesem Zeitraum.</p>`;
  }
  const segments = split.roles.filter(item => item.points > 0).map(item => {
    const role = getRole(item.role);
    const share = Math.round(item.points / split.total * 100);
    return `<span class="role-presence-segment" style="--role-color:${role.color};--share:${item.points / split.total * 100}%"
      title="${escapeHTML(role.name)} ${share} %"></span>`;
  }).join("");
  const legend = split.roles.filter(item => item.points > 0).map(item => {
    const role = getRole(item.role);
    const share = Math.round(item.points / split.total * 100);
    return `<span class="role-presence-key"><i style="--role-color:${role.color}"></i>${escapeHTML(role.emoji)} ${escapeHTML(role.name)} <b>${share} %</b></span>`;
  }).join("");
  return `<div class="role-presence-share" role="img"
      aria-label="Anteile der Rollen an der erfassten Präsenz">${segments}</div>
    <div class="role-presence-keys">${legend}</div>`;
}

function renderRoleSplit() {
  const list = $("roleSplitList");
  const summary = $("roleSplitSummary");
  const impulses = $("roleSplitImpulses");
  if (!list || !summary || !impulses) return;

  document.querySelectorAll("[data-role-range]").forEach(button => {
    const selected = button.dataset.roleRange === roleSplitRange;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });

  const dates = roleSplitDates();
  const split = roleSplitData(dates);
  const max = Math.max(...split.roles.map(item => item.points), 1);
  const periodLabel = roleSplitRange === "month"
    ? monthLabelText(analysisMonth)
    : `${formatShortDate(dates[0])} – ${formatShortDate(dates[6])}`;

  summary.textContent = periodLabel;

  const metrics = $("roleSplitMetrics");
  if (metrics) {
    metrics.innerHTML = `
      <div class="role-presence-metric">
        <span>Aktivitäten</span><strong>${split.activityCount}</strong>
      </div>
      <div class="role-presence-metric">
        <span>Präsenzpunkte</span><strong>${formatPoints(split.total)}</strong>
      </div>
      <div class="role-presence-metric">
        <span>Sichtbare Rollen</span><strong>${split.represented} von ${ROLES.length}</strong>
      </div>`;
  }

  const distribution = $("roleSplitDistribution");
  if (distribution) distribution.innerHTML = rolePresenceDistributionHTML(split);

  // Alle sieben Rollen bleiben in ihrer stabilen Reihenfolge sichtbar.
  list.innerHTML = split.roles.map(item => {
    const role = getRole(item.role);
    const status = rolePresenceStatus(item, split);
    const count = item.rows.length
      ? `${item.rows.length} ${item.rows.length === 1 ? "Aktivität" : "Aktivitäten"} · ${item.activeDays} ${item.activeDays === 1 ? "Tag" : "Tage"}`
      : "keine Aktivität erfasst";
    return `<button type="button" class="role-split-row${item.points === 0 ? " is-open" : ""}" data-role-detail="${escapeHTML(item.role)}"
      style="--role-color:${role.color};--role-soft:${hexToRgba(role.color, .16)}"
      aria-label="${escapeHTML(role.name)}: ${formatPoints(item.points)} Präsenzpunkte, ${escapeHTML(count)}, ${escapeHTML(status)}. Details öffnen.">
      <span class="role-split-head">
        <span class="role-split-name">${escapeHTML(role.emoji)} ${escapeHTML(role.name)}</span>
        <b>${formatPoints(item.points)}</b>
      </span>
      <span class="role-split-bar"><i style="--fill:${Math.round(item.points / max * 100)}%"></i></span>
      <small class="role-split-meta"><span>${escapeHTML(count)}</span><span class="role-split-status">${escapeHTML(status)}</span></small>
    </button>`;
  }).join("");

  impulses.innerHTML = `<h3 class="month-impulse-title">Rückblick &amp; Impulse</h3>
    <ul class="impulse-list">${roleSplitImpulseList(split).map(text => `<li>${escapeHTML(text)}</li>`).join("")}</ul>`;

  list.querySelectorAll("[data-role-detail]").forEach(button =>
    button.addEventListener("click", () => openRoleDetailDialog(button.dataset.roleDetail)));
}

/* Detailaufschlüsselung einer Rolle. Die angezeigten Einzelwerte und die
   Tagessummen ergeben zusammen exakt den Wert der Rollenpräsenz. */
function openRoleDetailDialog(roleName) {
  const dialog = $("roleDetailDialog");
  if (!dialog) return;
  const split = roleSplitData(roleSplitDates());
  const entry = split.roles.find(item => item.role === roleName);
  $("roleDetailTitle").textContent = `${getRole(roleName).emoji} ${roleName}`;

  const byDate = new Map();
  (entry?.rows || []).forEach(row => {
    if (!byDate.has(row.date)) byDate.set(row.date, []);
    byDate.get(row.date).push(row);
  });

  const days = [...byDate.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([date, rows]) => {
    const daySum = roundPoints(rows.reduce((sum, row) => sum + row.points, 0));
    return `<div class="role-detail-day">
      <div class="role-detail-day-head"><strong>${escapeHTML(formatLongDate(date))}</strong><b>${formatPoints(daySum)}</b></div>
      ${rows.map(row => `<div class="role-detail-row">
        <span>${escapeHTML(row.title)}${row.capped && row.entries > 1 ? ` <small>(${row.entries} Einträge · Tagesbegrenzung)</small>` : ""}</span>
        <b>${formatPoints(row.points)}</b>
      </div>`).join("")}
    </div>`;
  }).join("");

  $("roleDetailBody").innerHTML = entry && entry.rows.length
    ? `${days}<div class="role-detail-total"><strong>Gesamt</strong><b>${formatPoints(entry.points)}</b></div>`
    : `<p class="section-hint">In diesem Zeitraum sind für diese Rolle noch keine Aktivitäten eingetragen.</p>`;
  dialog.showModal();
}

function roleSplitInfoHTML() {
  const rows = ACTIVITY_TEMPLATES.map(template => {
    const role = template.key === "custom" ? "frei wählbar" : template.role;
    const cap = activityDailyCap(template.key);
    const points = cap === null
      ? `${formatPoints(template.weight)}`
      : `${formatPoints(cap)} je Kalendertag`;
    return `<div class="info-row"><span>${escapeHTML(template.label)}</span><small>${escapeHTML(role)}</small><b>${escapeHTML(points)}</b></div>`;
  }).join("");
  const capped = ACTIVITY_TEMPLATES.filter(template => activityDailyCap(template.key) !== null)
    .map(template => `${template.label} (${formatPoints(activityDailyCap(template.key))})`).join(", ");
  return `<p>Diese Auswertung zeigt, welchen Rollen du durch bewusst erfasste Aktivitäten Raum gegeben hast. Die Punkte gewichten die Aussagekraft einer Aktivität. Sie messen weder Zeitaufwand noch deinen persönlichen Wert oder die vollständige Erfüllung einer Rolle.</p>
    <p>Deshalb kann ein SMA-Arbeitstag trotz großem Zeitaufwand mit ${formatPoints(activityDailyCap("sma"))} gewichtet sein, während eine bewusst prägende Ankeraktivität wie Jumʿa mit ${formatPoints(activityTemplate("jumua").weight)} zählt.</p>
    <p>Jede Aktivität bringt den Punktwert ihrer Vorlage mit. Die Punkte einer Rolle sind die Summe aller ihrer Aktivitäten im Zeitraum; der Balken zeigt den Anteil an der stärksten Rolle.</p>
    <div class="info-rows">${rows}</div>
    <p>Tagesbegrenzung: ${escapeHTML(capped)} zählen höchstens einmal pro Kalendertag, unabhängig von der Anzahl der Einträge. Es gibt kein Wochenlimit. Alle übrigen Vorlagen zählen pro Eintrag.</p>
    <p>Aktivitäten ohne hinterlegtes Gewicht zählen einen Punkt.</p>
    <p>Die fünf Pflichtgebete bleiben vollständig außerhalb dieser Punkte. Sie werden gesondert erfasst und ergeben ausdrücklich keine Punktzahl religiöser Pflichterfüllung.</p>`;
}

function renderAnalysis() {
  if (!$("analysisPage")) return;
  // Reihenfolge der Seite: zuerst die Rollenpräsenz, darunter der Monatsrückblick.
  renderRoleSplit();
  renderMonthReview();
}

function getAllReviews() {
  const reviews = [];
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith(`${STORAGE_NAMESPACE}-review-`)) continue;
    const date = key.replace(`${STORAGE_NAMESPACE}-review-`, "");
    const raw = safeParse(localStorage.getItem(key));
    if (raw) reviews.push({ date, data: normalizeReview(raw, date, true) });
  }
  return reviews.sort((a, b) => a.date.localeCompare(b.date));
}

function downloadTextFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(filename, blob);
}

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function backupPayload() {
  return {
    app: "Roleplay",
    version: APP_VERSION,
    schemaVersion: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    reviews: getAllReviews(),
    routines,
    settings: {
      roleFocus: roleFocus || null,
      weekMode
    }
  };
}

function exportBackup() {
  saveReview(true);
  const payload = backupPayload();
  downloadTextFile(`roleplay-backup-${todayISO()}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  localStorage.setItem(BACKUP_TIMESTAMP_KEY, new Date().toISOString());
  $("backupStatus").textContent = `Backup erstellt: ${payload.reviews.length} Tagesreviews und ${Object.keys(routines || {}).length} Routinen.`;
}

/* Vor jedem Import wird der aktuelle Bestand automatisch als Datei
   heruntergeladen. Ein Import kann dadurch nie zu Datenverlust führen. */
function downloadSafetyBackup() {
  const payload = backupPayload();
  payload.safetyBackup = true;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  downloadTextFile(`roleplay-sicherung-vor-import-${stamp}.json`, JSON.stringify(payload, null, 2), "application/json;charset=utf-8");
  return payload.reviews.length;
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const payload = safeParse(reader.result);
    const validReviews = Array.isArray(payload?.reviews) ? payload.reviews.filter(item => /^\d{4}-\d{2}-\d{2}$/.test(item?.date) && item?.data) : [];
    if (!validReviews.length) { alert("Diese Datei enthält keine gültigen Roleplay-Tagesreviews."); return; }
    if (!confirm(`${validReviews.length} Tagesreviews importieren? Vorhandene Einträge mit demselben Datum werden ersetzt.\n\nZuvor wird automatisch eine Sicherung des aktuellen Bestands heruntergeladen.`)) return;
    saveReview(true);
    const secured = downloadSafetyBackup();
    // Ältere Backups werden unverändert übernommen; fehlende neue Felder
    // ergänzt die Normalisierung beim Laden, ohne Werte zu erfinden.
    validReviews.forEach(item => localStorage.setItem(storageKey(item.date), JSON.stringify(item.data)));
    if (payload.routines) {
      routines = normalizeRoutines(payload.routines);
      saveRoutines();
    }
    const importedFocus = normalizeRoleFocus(payload?.settings?.roleFocus);
    if (importedFocus) { roleFocus = importedFocus; saveRoleFocus(); }
    if (payload?.settings?.weekMode) setWeekMode(payload.settings.weekMode);
    loadRoleFocus();
    localStorage.setItem("roleplay-last-import-at", new Date().toISOString());
    setDate(selectedDate);
    renderAnalysis();
    $("backupStatus").textContent = `${validReviews.length} Tagesreviews importiert. Sicherung mit ${secured} Tagesreviews wurde zuvor heruntergeladen.`;
    alert("Backup wurde erfolgreich importiert.");
  };
  reader.readAsText(file);
}

function csvEscape(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function exportCsv() {
  saveReview(true);
  const headers = [
    "Datum", "Tagesrolle", "Frühstück_Kategorie", "Frühstück", "Mittag_Kategorie", "Mittagessen", "Abend_Kategorie", "Abendessen", "Snack_Kategorie", "Snack", "Wasser_ml", "Schritte",
    "Morgenroutine", "Abendroutine", ...PRAYERS, ...SUNNAH_PRAYERS.map(prayer => `Sunnah_${prayer}`),
    "Ramadan_Tage", "Fastentag", "Schlafqualität", "Traumkategorie", "Traumnotiz",
    "Checkins_Anzahl", "Letzter_Checkin", "Empfohlener_Rollenmodus", "Gewählter_Rollenmodus", "Abweichungsbegründung", "Energie", "Laune", "Gottesfurcht", "Gefühl", "Belastung", "Kontextnotiz",
    "Dankbarkeit", "Bewusste_Wahrnehmung", "Name_Allahs",
    "Wichtigste_Verantwortung", "Anpassung_oder_Vermeidung", "Nächster_verantwortlicher_Schritt",
    ...STREAKS.flatMap(streak => [`${streak.label}_Tage`, `${streak.label}_Heute`]), "Aktivitäten", "Notizen"
  ];
  const lines = [headers.map(csvEscape).join(";")];
  getAllReviews().forEach(({ date, data }) => {
    const activities = (data.activities || []).map(activity => `${activity.title} | ${activity.role}`).join(" / ");
    const latest = latestStateCheckin(data);
    const mode = modeForCheckin(latest, data);
    const row = [
      date, data.role,
      mealCategoryLabel(data.mealCategories?.breakfast || ""), data.breakfast,
      mealCategoryLabel(data.mealCategories?.lunch || ""), data.lunch,
      mealCategoryLabel(data.mealCategories?.dinner || ""), data.dinner,
      mealCategoryLabel(data.mealCategories?.snack || ""), data.snack,
      data.water, data.steps,
      TASK_STATE_META[data.morningRoutineState]?.label || "Offen", TASK_STATE_META[data.eveningRoutineState]?.label || "Offen",
      ...PRAYERS.map(prayer => data.prayers?.[prayer] || ""), ...SUNNAH_PRAYERS.map(prayer => data.sunnahPrayers?.[prayer] || ""),
      data.ramadanDays, data.fastingCompleted ? "Ja" : "Nein", data.sleepQualityScore, dreamCategoryLabel(data.dreamCategory || ""), data.dreams,
      data.stateCheckins?.length || 0, latest ? checkinSlot(latest.slot).label : "", mode?.label || "", mode?.label || "", latest?.frameworkOverrideReason || "", latest?.energy ?? "", latest?.mood ?? "", latest?.taqwa ?? "", latest?.emotion || "", LOAD_OPTIONS[latest?.load]?.label || "", latest?.note || "",
      data.gratitude1, data.gratitude2, data.allahName,
      data.responsibilityMain, data.responsibilityAdaptation, data.responsibilityNextStep,
      ...STREAKS.flatMap(streak => [Number(data.streaks?.[streak.key]?.days || 0), data.streaks?.[streak.key]?.todayStatus || ""]), activities, data.notes
    ];
    lines.push(row.map(csvEscape).join(";"));
  });
  downloadTextFile(`roleplay-export-${todayISO()}.csv`, `﻿${lines.join("\r\n")}`, "text/csv;charset=utf-8");
  $("backupStatus").textContent = "CSV-Export mit Check-ins, Gebeten und Reflexion wurde erstellt.";
}

function hexToRgba(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16), g = parseInt(clean.slice(2, 4), 16), b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function rawReviewForCalendar(date) {
  const rawText = localStorage.getItem(storageKey(date));
  if (!rawText) return null;
  return safeParse(rawText, {});
}

function renderCalendar() {
  const monthDate = new Date(`${calendarCursor}T12:00:00`);
  $("calendarMonthLabel").textContent = new Intl.DateTimeFormat("de-DE", { month: "long", year: "numeric" }).format(monthDate);
  const weekdayOffset = (monthDate.getDay() + 6) % 7;
  const start = addDays(calendarCursor, -weekdayOffset);
  $("calendarGrid").innerHTML = Array.from({ length: 42 }, (_, index) => {
    const date = addDays(start, index);
    const raw = rawReviewForCalendar(date);
    const role = getRole(raw?.role || defaultRoleForDate(date));
    const outside = date.slice(0, 7) !== calendarCursor.slice(0, 7);
    const classes = ["calendar-day", outside ? "outside" : "", date === todayISO() ? "today" : "", raw ? "has-entry" : "", date === selectedDate ? "selected" : ""].filter(Boolean).join(" ");
    const style = raw ? `--entry-color:${role.color};--entry-soft:${hexToRgba(role.color,.18)};--entry-text:${role.text}` : "";
    return `<button type="button" class="${classes}" style="${style}" data-calendar-date="${date}" aria-label="${formatDate(date)}${raw ? `, Eintrag in Rolle ${role.name}` : ""}">${Number(date.slice(-2))}</button>`;
  }).join("");
  document.querySelectorAll("[data-calendar-date]").forEach(button => button.addEventListener("click", () => {
    setDate(button.dataset.calendarDate);
    $("calendarDialog").close();
  }));
}

function openCalendar() {
  calendarCursor = firstOfMonth(selectedDate);
  renderCalendar();
  $("calendarDialog").showModal();
}

function normalizeRoutines(value) {
  const defaults = JSON.parse(JSON.stringify(DEFAULT_ROUTINES));
  const incoming = value && typeof value === "object" ? value : {};
  /* Liegt bereits ein Speicherstand vor, ist er maßgeblich: sonst kehrte eine
     gelöschte Standardroutine beim nächsten Start zurück. Die Vorlagen dienen
     dann nur noch als Grundgerüst für fehlende Felder. */
  const hasStored = Object.keys(incoming).length > 0;
  const keys = hasStored ? Object.keys(incoming) : Object.keys(defaults);
  const output = {};
  keys.forEach((key, index) => {
    const base = defaults[key] || {
      key,
      title: incoming[key]?.title || `Routine ${index + 1}`,
      description: incoming[key]?.description || "Eigene Routine",
      theme: incoming[key]?.theme || "focus",
      autoNext: false,
      items: []
    };
    const merged = { ...base, ...(incoming[key] || {}) };
    merged.key = key;
    merged.theme = merged.theme || (key === "morning" ? "morning" : key === "evening" ? "evening" : "focus");
    merged.items = Array.isArray(merged.items) ? merged.items.map((item, idx) => ({
      id: item.id || `${key}-${Date.now()}-${idx}`,
      emoji: item.emoji || "✨",
      title: item.title || "Neuer Schritt",
      minutes: clamp(Number(item.minutes || 5), 1, 180),
      context: item.context || ""
    })) : [];
    output[key] = merged;
  });
  return output;
}

function loadRoutines() {
  const stored = safeParse(localStorage.getItem(ROUTINES_STORAGE_KEY));
  return normalizeRoutines(stored);
}

function saveRoutines() {
  localStorage.setItem(ROUTINES_STORAGE_KEY, JSON.stringify(routines));
}

function orderedRoutineKeys() {
  return Object.keys(routines || {}).sort((a, b) => {
    const rank = key => key === "morning" ? 0 : key === "evening" ? 1 : 2;
    return rank(a) - rank(b) || (routines[a]?.title || a).localeCompare(routines[b]?.title || b, "de");
  });
}

function routineMinutes(routine) {
  return routine.items.reduce((sum, item) => sum + Number(item.minutes || 0), 0);
}

function routineProgress(key) {
  const progress = currentData?.routineProgress?.[key] || {};
  const items = routines[key].items;
  const done = items.filter(item => progress[item.id] === "done").length;
  const resolved = items.filter(item => ["done", "skipped"].includes(progress[item.id])).length;
  return { done, resolved, total: items.length };
}

function renderRoutineCards() {
  if (!routines || !currentData) return;
  $("routineCards").innerHTML = orderedRoutineKeys().map(key => {
    const routine = routines[key];
    const progress = routineProgress(key);
    const progressMap = currentData.routineProgress?.[key] || {};
    const remaining = routine.items
      .filter(item => !["done", "skipped"].includes(progressMap[item.id]))
      .reduce((sum, item) => sum + Number(item.minutes || 0), 0);
    const percent = progress.total ? Math.round(progress.resolved / progress.total * 100) : 0;
    const started = progress.resolved > 0;
    const finished = progress.total > 0 && progress.resolved === progress.total;

    // Die Zeile unter dem Titel beantwortet: Wo stehe ich heute damit?
    // Kurz halten: die Zeile steht neben der Starttaste und darf nicht umbrechen.
    const meta = !routine.items.length
      ? "Noch keine Schritte"
      : finished
        ? "Abgeschlossen"
        : started
          ? `${progress.resolved}/${progress.total} · noch ${remaining} Min.`
          : `${routine.items.length} Schritte · ${routineMinutes(routine)} Min.`;

    return `<button type="button" class="routine-hero ${routine.theme} ${finished ? "is-finished" : started ? "is-started" : ""}" data-open-routine="${key}">
      <span class="routine-thread" aria-hidden="true"></span>
      ${finished ? `<span class="routine-hero-badge" aria-hidden="true">✓</span>` : ""}
      <div class="routine-hero-top simple">
        <div>
          <h2>${escapeHTML(routine.title)}</h2>
          <p>${escapeHTML(routine.description)}</p>
          <span class="routine-hero-meta">${escapeHTML(meta)}</span>
        </div>
      </div>
      ${progress.total ? `<span class="routine-hero-track" aria-hidden="true"><i style="width:${percent}%"></i></span>` : ""}
      <span class="routine-hero-play ${finished ? "done" : ""}" data-start-routine="${key}" role="button"
        aria-label="${escapeHTML(routine.title)} ${started && !finished ? "fortsetzen" : "starten"}" tabindex="0">${finished ? "↻" : "▶"}</span>
    </button>`;
  }).join("");
  document.querySelectorAll("[data-open-routine]").forEach(card => card.addEventListener("click", event => {
    if (event.target.closest("[data-start-routine]")) return;
    openRoutineDetail(card.dataset.openRoutine);
  }));
  document.querySelectorAll("[data-start-routine]").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    startRoutine(button.dataset.startRoutine);
  }));
}

function openRoutineDetail(key) {
  activeRoutineKey = key;
  $("routineOverview").hidden = true;
  $("routineDetail").hidden = false;
  $("routineDetail").dataset.routineKey = key;
  renderRoutineDetail(key);
}

function closeRoutineDetail() {
  activeRoutineKey = null;
  $("routineDetail").hidden = true;
  $("routineOverview").hidden = false;
  renderRoutineCards();
}

function renderRoutineDetail(key) {
  const routine = routines[key];
  const progress = routineProgress(key);
  const progressPercent = progress.total ? Math.round((progress.resolved / progress.total) * 100) : 0;
  const progressMap = currentData.routineProgress?.[key] || {};
  const completedMinutes = routine.items.filter(item => progressMap[item.id] === "done").reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  const remainingMinutes = routine.items.filter(item => !["done", "skipped"].includes(progressMap[item.id])).reduce((sum, item) => sum + Number(item.minutes || 0), 0);
  $("routineDetailEyebrow").textContent = key === "morning" ? "MORGEN" : key === "evening" ? "ABEND" : "FOKUS";
  $("routineDetailTitle").textContent = routine.title;
  $("routineDetailMeta").textContent = `${routine.items.length} Schritte · ${routineMinutes(routine)} Minuten`;
  $("routineDetailProgress").innerHTML = `<div class="routine-progress-head"><strong>${progress.done}/${progress.total} erledigt</strong><span>${progressPercent}%</span></div><div class="routine-progress-track"><i style="width:${progressPercent}%"></i></div><small>ca. ${completedMinutes} Min. erledigt · ${remainingMinutes} Min. offen</small>`;
  $("routineItemList").innerHTML = routine.items.map((item, index) => {
    const state = progressMap[item.id] || "";
    const stateLabel = state === "done" ? " · erledigt" : state === "skipped" ? " · übersprungen" : "";
    return `<div class="routine-item clean ${state ? `is-${state}` : ""}" draggable="true" data-routine-index="${index}">
      <span class="routine-number">${index + 1}</span>
      <span class="routine-emoji-bubble">${escapeHTML(item.emoji)}</span>
      <div class="routine-item-copy">
        <strong>${escapeHTML(item.title)}</strong>
        <small>${item.minutes} Min.${stateLabel}${item.context ? " · Kontext" : ""}</small>
      </div>
      <div class="routine-sort-controls" aria-label="Reihenfolge ändern">
        <button type="button" data-move-routine-item="up" data-routine-control="${index}" aria-label="Nach oben" ${index === 0 ? "disabled" : ""}>↑</button>
        <button type="button" data-move-routine-item="down" data-routine-control="${index}" aria-label="Nach unten" ${index === routine.items.length - 1 ? "disabled" : ""}>↓</button>
      </div>
      <button type="button" class="routine-item-menu" data-edit-routine-item="${escapeHTML(item.id)}" aria-label="Bearbeiten">⋯</button>
    </div>`;
  }).join("");

  document.querySelectorAll("[data-edit-routine-item]").forEach(button => button.addEventListener("click", () => openRoutineItemDialog(button.dataset.editRoutineItem)));
  document.querySelectorAll("[data-routine-control]").forEach(button => button.addEventListener("click", () => {
    const index = Number(button.dataset.routineControl);
    moveArrayItem(routine.items, index, button.dataset.moveRoutineItem === "up" ? -1 : 1);
    saveRoutines(); renderRoutineDetail(key); renderRoutineCards();
  }));
  document.querySelectorAll("[data-routine-index]").forEach(row => {
    row.addEventListener("dragstart", () => { routineDragIndex = Number(row.dataset.routineIndex); row.classList.add("dragging"); });
    row.addEventListener("dragend", () => { routineDragIndex = null; row.classList.remove("dragging"); });
    row.addEventListener("dragover", event => event.preventDefault());
    row.addEventListener("drop", event => {
      event.preventDefault();
      const targetIndex = Number(row.dataset.routineIndex);
      if (routineDragIndex === null || routineDragIndex === targetIndex) return;
      const [item] = routine.items.splice(routineDragIndex, 1);
      routine.items.splice(targetIndex, 0, item);
      saveRoutines(); renderRoutineDetail(key); renderRoutineCards();
    });
  });
}


function renderSessionRoutineEditor() {
  if (!routineSession || !$('sessionRoutineItemList')) return;
  const routine = routines[routineSession.key];
  if (!routine) return;
  const currentId = currentSessionItem()?.id;
  const editor = $('sessionRoutineEditor');
  if (editor) editor.dataset.currentItemId = currentId || '';

  $('sessionRoutineItemList').innerHTML = sessionItems().map((item, index) => {
    const state = currentData.routineProgress?.[routineSession.key]?.[item.id] || '';
    const stateLabel = item.id === currentId ? 'läuft gerade' : state === 'done' ? 'erledigt' : state === 'skipped' ? 'übersprungen' : '';
    return `<div class="session-editor-item ${item.id === currentId ? 'is-current' : ''}" data-session-item-id="${escapeHTML(item.id)}">
      <button class="session-editor-drag-handle" type="button" aria-label="${escapeHTML(item.title)} verschieben" data-session-drag-handle>
        <span></span><span></span><span></span>
      </button>
      <span class="session-editor-emoji">${escapeHTML(item.emoji)}</span>
      <div class="session-editor-copy">
        <strong>${escapeHTML(item.title)}</strong>
        <small>${item.minutes} Min.${stateLabel ? ` · ${stateLabel}` : ''}</small>
      </div>
      <button type="button" class="session-editor-start ${item.id === currentId ? 'is-current' : ''}" data-session-start="${escapeHTML(item.id)}" aria-label="${item.id === currentId ? 'Läuft gerade' : `${escapeHTML(item.title)} starten`}" ${item.id === currentId ? 'disabled' : ''}>
        <span aria-hidden="true">${item.id === currentId ? '●' : '▶'}</span>
      </button>
    </div>`;
  }).join('');

  document.querySelectorAll('[data-session-start]').forEach(button => button.addEventListener('click', () => {
    startSessionItemById(button.dataset.sessionStart);
  }));
  bindSessionEditorReordering();
}

function bindSessionEditorReordering() {
  const list = $('sessionRoutineItemList');
  if (!list) return;

  list.querySelectorAll('[data-session-drag-handle]').forEach(handle => {
    handle.addEventListener('pointerdown', event => {
      if (!routineSession || event.button > 0) return;
      const row = handle.closest('.session-editor-item');
      if (!row) return;
      const currentItemId = currentSessionItem()?.id;
      const pointerId = event.pointerId;
      event.preventDefault();
      handle.setPointerCapture?.(pointerId);
      row.classList.add('is-dragging');
      document.body.classList.add('session-editor-sorting');

      const move = moveEvent => {
        const target = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY)?.closest('.session-editor-item');
        if (!target || target === row || target.parentElement !== list) return;
        const box = target.getBoundingClientRect();
        const placeAfter = moveEvent.clientY > box.top + box.height / 2;
        list.insertBefore(row, placeAfter ? target.nextSibling : target);

        const listBox = list.getBoundingClientRect();
        if (moveEvent.clientY < listBox.top + 70) list.scrollTop -= 14;
        if (moveEvent.clientY > listBox.bottom - 70) list.scrollTop += 14;
      };

      const finish = () => {
        document.removeEventListener('pointermove', move);
        document.removeEventListener('pointerup', finish);
        document.removeEventListener('pointercancel', finish);
        row.classList.remove('is-dragging');
        document.body.classList.remove('session-editor-sorting');
        try { handle.releasePointerCapture?.(pointerId); } catch (_) {}

        const order = [...list.querySelectorAll('.session-editor-item')].map(entry => entry.dataset.sessionItemId);
        const byId = new Map(sessionItems().map(item => [item.id, item]));
        // Nur die Session-Kopie wird neu geordnet – das Template bleibt unberührt.
        routineSession.items = order.map(id => byId.get(id)).filter(Boolean);
        routineSession.index = Math.max(0, routineSession.items.findIndex(item => item.id === currentItemId));
        persistRoutineSession();
        renderRoutineSession();
        renderSessionRoutineEditor();
        renderRoutineCards();
        if (activeRoutineKey === routineSession.key) renderRoutineDetail(activeRoutineKey);
      };

      document.addEventListener('pointermove', move, { passive: false });
      document.addEventListener('pointerup', finish, { once: true });
      document.addEventListener('pointercancel', finish, { once: true });
    });
  });
}

function startSessionItemById(itemId) {
  if (!routineSession) return;
  const items = sessionItems();
  const index = items.findIndex(item => item.id === itemId);
  if (index < 0) return;

  const item = items[index];
  routineSession.index = index;
  routineSession.remaining = Math.round(Number(item.minutes || 0) * 60);
  routineSession.running = true;
  routineSession.endAt = Date.now() + routineSession.remaining * 1000;
  routineSession.expiredNotified = false;
  routineSession.contextOpen = false;
  delete currentData.routineProgress?.[routineSession.key]?.[item.id];
  saveReview(true);
  persistRoutineSession();
  renderRoutineSession();
  renderSessionRoutineEditor();
}

function toggleSessionRoutineEditor(force) {
  const panel = $("sessionRoutineEditor");
  const button = $("sessionEditRoutine");
  if (!panel) return;
  const show = typeof force === "boolean" ? force : panel.hidden;
  panel.hidden = !show;
  if (button) {
    button.setAttribute("aria-expanded", String(show));
    button.classList.toggle("is-open", show);
    const label = button.querySelector("span:last-child");
    if (label) label.textContent = show ? "Anpassen geöffnet" : "Anpassen";
  }
  if (show) renderSessionRoutineEditor();
}

/* Minutenauswahl als natives select – auf dem iPhone öffnet dadurch das
   Auswahlrad. Eine abweichend gespeicherte Dauer (etwa 2,5) bleibt als
   zusätzliche Option erhalten und wird nicht verändert. */
function fillRoutineMinuteOptions(currentValue) {
  const select = $("routineItemMinutes");
  if (!select) return;
  const value = Number(currentValue);
  const options = ROUTINE_MINUTE_CHOICES.map(minutes =>
    `<option value="${minutes}">${minutes} ${minutes === 1 ? "Minute" : "Minuten"}</option>`);
  if (Number.isFinite(value) && value > 0 && !ROUTINE_MINUTE_CHOICES.includes(value)) {
    const label = String(value).replace(".", ",");
    options.unshift(`<option value="${value}">${label} ${value === 1 ? "Minute" : "Minuten"}</option>`);
  }
  select.innerHTML = options.join("");
  select.value = String(Number.isFinite(value) && value > 0 ? value : 5);
}

function setRoutineEmojiError(visible) {
  const field = $("routineItemEmoji");
  const error = $("routineItemEmojiError");
  if (error) error.hidden = !visible;
  if (field) {
    field.classList.toggle("has-error", visible);
    field.setAttribute("aria-invalid", visible ? "true" : "false");
  }
}

function openRoutineItemDialog(itemId = null) {
  editingRoutineItemId = itemId;
  const item = itemId ? routines[activeRoutineKey].items.find(entry => entry.id === itemId) : null;
  $("routineItemDialogTitle").textContent = item ? "Schritt bearbeiten" : "Schritt hinzufügen";
  // Neuer Schritt: leeres Emoji-Feld, kein Standardwert.
  $("routineItemEmoji").value = item?.emoji || "";
  $("routineItemTitle").value = item?.title || "";
  fillRoutineMinuteOptions(item?.minutes ?? 5);
  $("routineItemContext").value = item?.context || "";
  $("deleteRoutineItem").hidden = !item;
  setRoutineEmojiError(false);
  $("routineItemDialog").showModal();
}

function saveRoutineItemFromForm(event) {
  event.preventDefault();
  const title = $("routineItemTitle").value.trim();
  const emoji = $("routineItemEmoji").value.trim();
  // Das Emoji ist Pflicht; es wird kein Standardwert eingesetzt.
  if (!emoji) {
    setRoutineEmojiError(true);
    $("routineItemEmoji").focus();
    return;
  }
  setRoutineEmojiError(false);
  if (!title) return;
  const selectedMinutes = Number($("routineItemMinutes").value);
  const item = {
    id: editingRoutineItemId || `${activeRoutineKey}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    emoji,
    title,
    minutes: Number.isFinite(selectedMinutes) && selectedMinutes > 0 ? clamp(selectedMinutes, 0.5, 180) : 5,
    context: $("routineItemContext").value.trim()
  };
  const list = routines[activeRoutineKey].items;
  const index = list.findIndex(entry => entry.id === editingRoutineItemId);
  if (index >= 0) list[index] = item; else list.push(item);
  saveRoutines();
  $("routineItemDialog").close();
  renderRoutineDetail(activeRoutineKey); renderRoutineCards();
  if (routineSession?.key === activeRoutineKey) {
    const editedIndex = routines[activeRoutineKey].items.findIndex(entry => entry.id === item.id);
    if (editingRoutineItemId && editedIndex >= 0 && currentSessionItem()?.id === item.id && routineSession.remaining > item.minutes * 60) {
      routineSession.remaining = item.minutes * 60;
      if (routineSession.running) routineSession.endAt = Date.now() + routineSession.remaining * 1000;
    }
    persistRoutineSession(); renderRoutineSession(); renderSessionRoutineEditor();
  }
}

function deleteRoutineItem() {
  if (!editingRoutineItemId || !confirm("Diesen Schritt wirklich löschen?")) return;
  const list = routines[activeRoutineKey].items;
  const index = list.findIndex(item => item.id === editingRoutineItemId);
  const deletingCurrentSessionItem = routineSession?.key === activeRoutineKey && currentSessionItem()?.id === editingRoutineItemId;
  if (index >= 0) list.splice(index, 1);
  delete currentData.routineProgress?.[activeRoutineKey]?.[editingRoutineItemId];
  if (routineSession?.key === activeRoutineKey) {
    if (!list.length) { closeRoutineSession(); }
    else {
      routineSession.index = Math.min(index, list.length - 1);
      if (deletingCurrentSessionItem) {
        routineSession.remaining = Math.round(list[routineSession.index].minutes * 60);
        routineSession.running = true;
        routineSession.endAt = Date.now() + routineSession.remaining * 1000;
        routineSession.expiredNotified = false;
      }
      persistRoutineSession();
    }
  }
  saveRoutines(); saveReview(true);
  $("routineItemDialog").close();
  renderRoutineDetail(activeRoutineKey); renderRoutineCards();
  if (routineSession) { renderRoutineSession(); renderSessionRoutineEditor(); }
}

function startRoutine(key) {
  const routine = routines[key];
  if (!routine.items.length) return;
  currentData.routineProgress[key] = currentData.routineProgress[key] || {};
  const progress = currentData.routineProgress?.[key] || {};
  let index = routine.items.findIndex(item => !["done", "skipped"].includes(progress[item.id]));
  if (index < 0) {
    if (!confirm("Diese Routine ist heute bereits abgeschlossen. Fortschritt zurücksetzen und erneut starten?")) return;
    currentData.routineProgress[key] = {};
    index = 0;
  }
  const remaining = Math.round(routine.items[index].minutes * 60);
  // Die Session arbeitet auf einer Kopie. Umsortieren während des Durchlaufs
  // verändert damit ausschließlich diesen Durchlauf, nie das gespeicherte
  // Routine-Template. Dauerhafte Änderungen laufen über "Routine bearbeiten".
  routineSession = { key, index, remaining, running: true, endAt: Date.now() + remaining * 1000, interval: null, contextOpen: true, expiredNotified: false,
    items: (routines[key]?.items || []).map(item => ({ ...item })) };
  persistRoutineSession();
  $("routineSessionDialog").showModal();
  renderRoutineSession();
  startSessionInterval();
}

/* Schritte des laufenden Durchlaufs. Fällt auf das Template zurück, damit
   Sessions aus früheren Versionen ohne eigene Kopie weiterhin laufen. */
function sessionItems() {
  if (!routineSession) return [];
  if (Array.isArray(routineSession.items) && routineSession.items.length) return routineSession.items;
  return routines[routineSession.key]?.items || [];
}

/* Verbleibende Dauer und voraussichtliche Endzeit.
   Wird bei jedem Rendern neu berechnet – also auch nach Erledigen,
   Überspringen, Umsortieren und Zeitänderung. */
function sessionRemainingSummary() {
  if (!routineSession) return null;
  const items = sessionItems();
  const progress = currentData?.routineProgress?.[routineSession.key] || {};
  // Laufender Schritt: tatsächliche Restzeit. Danach: geplante Dauer.
  const upcoming = items.slice(routineSession.index + 1)
    .filter(item => !progress[item.id])
    .reduce((sum, item) => sum + Number(item.minutes || 0) * 60, 0);
  const totalSeconds = Math.max(0, Math.round(routineSession.remaining)) + upcoming;
  const end = new Date(Date.now() + totalSeconds * 1000);
  return {
    minutes: Math.max(0, Math.round(totalSeconds / 60)),
    endLabel: `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}`
  };
}

function currentSessionItem() {
  return sessionItems()[routineSession.index];
}

function renderRoutineSession() {
  if (!routineSession) return;
  syncRoutineSessionClock();
  const routine = routines[routineSession.key];
  const item = currentSessionItem();
  if (!routine || !item) return;
  $("routineSessionDialog").dataset.theme = routine.theme || "focus";
  $("sessionRoutineName").textContent = routine.title;
  const items = sessionItems();
  $("sessionProgress").textContent = `Schritt ${routineSession.index + 1} von ${items.length}`;
  // Die Session übernimmt das Kopfbild ihrer Routine als ruhige Atmosphäre.
  const dialogEl = $("routineSessionDialog");
  dialogEl.dataset.theme = routine.theme || "focus";
  // Fortschrittsring um den Timer: Anteil der bereits erledigten Schritte.
  const resolved = items.filter(item => (currentData?.routineProgress?.[routineSession.key] || {})[item.id]).length;
  const ring = Math.round(resolved / Math.max(1, items.length) * 100);
  $("sessionTimerCircle").style.setProperty("--session-progress", `${ring}%`);
  $("sessionItemTitle").textContent = item.title;
  $("sessionItemEmoji").textContent = item.emoji;
  $("sessionTimer").textContent = formatTimer(routineSession.remaining);
  $("sessionPause").textContent = routineSession.running ? "Ⅱ" : "▶";
  $("sessionContext").hidden = !item.context;
  $("sessionContext").innerHTML = item.context ? linkifyText(item.context) : "";
  const next = items[routineSession.index + 1];
  $("sessionNext").textContent = next ? `Als Nächstes: ${next.title}` : "Letzter Schritt dieser Routine";
  const rest = sessionRemainingSummary();
  const restEl = $("sessionRemaining");
  if (restEl && rest) restEl.textContent = `Noch ${rest.minutes} Min. · ca. ${rest.endLabel} Uhr fertig`;
  const editor = $("sessionRoutineEditor");
  if (editor && !editor.hidden && editor.dataset.currentItemId !== item.id) renderSessionRoutineEditor();
}

function formatTimer(seconds) {
  const value = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(value % 60).padStart(2, "0")}`;
}

function playTimerDoneTone() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [880, 1175, 988];
    notes.forEach((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      const start = ctx.currentTime + index * 0.18;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
      oscillator.start(start);
      oscillator.stop(start + 0.16);
    });
  } catch (error) {
    console.warn("Ton konnte nicht abgespielt werden", error);
  }
}

function persistRoutineSession() {
  if (!routineSession) {
    localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
    return;
  }
  const { interval, ...serializable } = routineSession;
  localStorage.setItem(ROUTINE_SESSION_STORAGE_KEY, JSON.stringify(serializable));
}

function syncRoutineSessionClock() {
  if (!routineSession?.running || !routineSession.endAt) return;
  const nextRemaining = Math.max(0, Math.ceil((routineSession.endAt - Date.now()) / 1000));
  routineSession.remaining = nextRemaining;
  if (nextRemaining <= 0) {
    routineSession.running = false;
    routineSession.endAt = null;
    if (!routineSession.expiredNotified) {
      routineSession.expiredNotified = true;
      playTimerDoneTone();
    }
    persistRoutineSession();
  }
}

function updateRoutineSessionClockDisplay() {
  if (!routineSession) return;
  syncRoutineSessionClock();
  const timer = $("sessionTimer");
  if (timer) timer.textContent = formatTimer(routineSession.remaining);
  const pause = $("sessionPause");
  if (pause) pause.textContent = routineSession.running ? "Ⅱ" : "▶";
}

function startSessionInterval() {
  if (routineSession?.interval) clearInterval(routineSession.interval);
  if (!routineSession) return;
  updateRoutineSessionClockDisplay();
  routineSession.interval = window.setInterval(updateRoutineSessionClockDisplay, 250);
}

function toggleRoutineSessionRunning() {
  if (!routineSession) return;
  syncRoutineSessionClock();
  if (routineSession.running) {
    routineSession.running = false;
    routineSession.endAt = null;
  } else if (routineSession.remaining > 0) {
    routineSession.running = true;
    routineSession.endAt = Date.now() + routineSession.remaining * 1000;
    routineSession.expiredNotified = false;
  }
  persistRoutineSession();
  renderRoutineSession();
}

function adjustRoutineSessionMinutes(deltaMinutes) {
  if (!routineSession) return;
  syncRoutineSessionClock();
  routineSession.remaining = Math.max(0, routineSession.remaining + deltaMinutes * 60);
  if (routineSession.running) routineSession.endAt = Date.now() + routineSession.remaining * 1000;
  routineSession.expiredNotified = false;
  persistRoutineSession();
  renderRoutineSession();
}

function restoreRoutineSession() {
  const stored = safeParse(localStorage.getItem(ROUTINE_SESSION_STORAGE_KEY));
  if (!stored || !routines?.[stored.key] || !routines[stored.key].items?.[stored.index]) {
    localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
    return;
  }
  routineSession = { ...stored, interval: null, remaining: Math.max(0, Number(stored.remaining || 0)), running: Boolean(stored.running), endAt: stored.endAt ? Number(stored.endAt) : null };
  syncRoutineSessionClock();
  if (!$("routineSessionDialog").open) $("routineSessionDialog").showModal();
  renderRoutineSession();
  startSessionInterval();
}

function completeSessionItem(status) {
  if (!routineSession) return;
  syncRoutineSessionClock();
  const key = routineSession.key;
  const routine = routines[key];
  // Die Abfolge richtet sich nach der Session-Kopie, damit ein Umsortieren
  // während des Durchlaufs auch tatsächlich die Reihenfolge bestimmt.
  const items = sessionItems();
  const item = currentSessionItem();
  currentData.routineProgress[key][item.id] = status;
  const nextIndex = routineSession.index + 1;
  if (nextIndex >= items.length) {
    const allDone = items.every(entry => currentData.routineProgress[key][entry.id] === "done");
    if (key === "morning") currentData.morningRoutineState = allDone ? "done" : "responsiblySkipped";
    else if (key === "evening") currentData.eveningRoutineState = allDone ? "done" : "responsiblySkipped";
    saveReview(true);
    closeRoutineSession();
    alert(allDone ? `${routine.title} abgeschlossen.` : `${routine.title} gewissenhaft beendet. Übersprungene Schritte bleiben dokumentiert.`);
    return;
  }
  routineSession.index = nextIndex;
  routineSession.remaining = Math.round(Number(items[nextIndex].minutes || 0) * 60);
  routineSession.running = true;
  routineSession.endAt = Date.now() + routineSession.remaining * 1000;
  routineSession.expiredNotified = false;
  routineSession.contextOpen = false;
  saveReview(true);
  persistRoutineSession();
  renderRoutineSession();
  if ($("sessionRoutineEditor") && !$("sessionRoutineEditor").hidden) renderSessionRoutineEditor();
}

function closeRoutineSession() {
  if (routineSession?.interval) clearInterval(routineSession.interval);
  routineSession = null;
  localStorage.removeItem(ROUTINE_SESSION_STORAGE_KEY);
  if ($("routineSessionDialog").open) $("routineSessionDialog").close();
  const editor = $("sessionRoutineEditor");
  if (editor) { editor.hidden = true; editor.dataset.currentItemId = ""; }
  const editButton = $("sessionEditRoutine");
  if (editButton) { editButton.setAttribute("aria-expanded", "false"); editButton.classList.remove("is-open"); }
  updateRoutineStateButtons();
  renderRoutineCards();
  if (activeRoutineKey) renderRoutineDetail(activeRoutineKey);
}

function requestStreakAccess() {
  const dialog = $("streakPrivacyDialog");
  if (dialog && !dialog.open) dialog.showModal();
}

function grantStreakAccess() {
  streaksUnlocked = true;
  const dialog = $("streakPrivacyDialog");
  if (dialog?.open) dialog.close();
  switchPage("streaks", { skipGuard: true });
}

function switchPage(page, options = {}) {
  if (page === "streaks" && !streaksUnlocked && !options.skipGuard) {
    requestStreakAccess();
    return;
  }
  const titles = { review: "Tagesreflexion", routines: "Routinen", analysis: "Auswertung", streaks: "Streaks" };
  $("reviewPage").classList.toggle("active", page === "review");
  $("routinesPage").classList.toggle("active", page === "routines");
  $("analysisPage").classList.toggle("active", page === "analysis");
  $("streaksPage").classList.toggle("active", page === "streaks");
  $("pageTitle").textContent = titles[page] || "Roleplay";
  $("rolePickerWrap").hidden = false;
  $("dateNavigation").hidden = false;
  document.querySelectorAll(".nav-button").forEach(button => button.classList.toggle("active", button.dataset.page === page));
  if (page === "routines") renderRoutineCards();
  if (page === "analysis") renderAnalysis();
  if (page === "streaks") renderStreaks();
  if (page !== "streaks") streaksUnlocked = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateMealSelectionStyles() {
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const entry = document.querySelector(`[data-meal-entry="${key}"]`);
    const select = $(`${key}Category`);
    if (!entry || !select) return;
    entry.classList.toggle("is-selected", Boolean(select.value));
    entry.classList.toggle("meal-none", select.value === "none");
  });
}

function mealCategoryOptionsHTML(currentValue = "") {
  const entries = Object.entries(MEAL_CATEGORY_META);
  if (currentValue && LEGACY_MEAL_CATEGORY_META[currentValue]) {
    entries.push([currentValue, LEGACY_MEAL_CATEGORY_META[currentValue]]);
  }
  return entries.map(([value, meta]) => `<option value="${escapeHTML(value)}">${escapeHTML(meta.label)}</option>`).join("");
}

function initOptions() {
  const roleOptions = ROLES.map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.emoji)} ${escapeHTML(roleDisplayName(role.name))}</option>`).join("");
  renderRolePickerOptions();
  $("activityRole").innerHTML = roleOptions;
  if ($("activityTemplate")) {
    $("activityTemplate").innerHTML = ACTIVITY_TEMPLATES
      .map(template => `<option value="${template.key}">${escapeHTML(template.label)}</option>`).join("");
  }
  $("stateSlot").innerHTML = CHECKIN_SLOTS.map(slot => `<option value="${slot.key}">${slot.icon} ${escapeHTML(slot.label)}</option>`).join("");
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => { if ($(`${key}Category`)) $(`${key}Category`).innerHTML = mealCategoryOptionsHTML(); });
  if ($("stateSleepQuality")) $("stateSleepQuality").innerHTML = `<option value="">Nicht erfasst</option>${SLEEP_CHOICES.map(value => `<option value="${value}">${escapeHTML(SLEEP_LABELS[value] || "-")}</option>`).join("")}`;
  if ($("stateDreamCategory")) $("stateDreamCategory").innerHTML = DREAM_CATEGORIES.map(([value, label]) => `<option value="${escapeHTML(value)}">${escapeHTML(label)}</option>`).join("");
  $("allahName").innerHTML = `<option value="">Name Allahs auswählen …</option>${ALLAH_NAMES.map(name => `<option>${escapeHTML(name)}</option>`).join("")}`;
  fillRoutineMinuteOptions(5);
}


function createRoutineKey(title) {
  const base = title.toLowerCase().replace(/[^a-z0-9äöüß]+/gi, "-").replace(/^-+|-+$/g, "") || `routine-${Date.now()}`;
  let key = base, counter = 2;
  while (routines[key]) { key = `${base}-${counter++}`; }
  return key;
}

/* Derselbe Dialog legt neue Routinen an und bearbeitet bestehende. Wird ein
   Schlüssel übergeben, sind Löschen möglich und die Felder vorbelegt. */
function openRoutineDialog(key = null) {
  const routine = key ? routines[key] : null;
  const dialog = $("routineDialog");
  dialog.dataset.editingRoutine = key || "";
  $("routineTitle").value = routine?.title || "";
  $("routineDescription").value = routine?.description || "";
  $("routineTheme").value = routine?.theme || "focus";
  const heading = dialog.querySelector("h3");
  if (heading) heading.textContent = routine ? "Routine bearbeiten" : "Routine hinzufügen";
  if ($("routineDialogSubmit")) $("routineDialogSubmit").textContent = routine ? "Sichern" : "Erstellen";
  // Die letzte verbliebene Routine bleibt erhalten – sonst stünde die Seite leer.
  if ($("deleteRoutine")) $("deleteRoutine").hidden = !routine || Object.keys(routines).length <= 1;
  updateRoutineThemePreview();
  dialog.showModal();
}

function updateRoutineThemePreview() {
  const preview = $("routineThemePreview");
  if (!preview) return;
  preview.className = `routine-theme-preview ${$("routineTheme").value}`;
}

/* Entfernt eine Routine samt ihrem Fortschritt des laufenden Tages.
   Gespeicherte Tage bleiben unberührt – dort steht der Fortschritt weiterhin. */
function deleteRoutine() {
  const key = $("routineDialog").dataset.editingRoutine;
  if (!key || !routines[key]) return;
  if (Object.keys(routines).length <= 1) return;
  if (!window.confirm(`„${routines[key].title}" wirklich löschen? Die Schritte gehen dabei verloren.`)) return;
  if (routineSession?.key === key) closeRoutineSession();
  delete routines[key];
  saveRoutines();
  $("routineDialog").close();
  if ($("routineDetail")) $("routineDetail").hidden = true;
  renderRoutineCards();
}

function saveRoutineFromForm(event) {
  event.preventDefault();
  const title = $("routineTitle").value.trim();
  if (!title) return;
  const editing = $("routineDialog").dataset.editingRoutine;
  if (editing && routines[editing]) {
    // Beim Bearbeiten bleiben Schlüssel und Schritte unangetastet.
    routines[editing].title = title;
    routines[editing].description = $("routineDescription").value.trim() || routines[editing].description;
    routines[editing].theme = $("routineTheme").value || "focus";
  } else {
    const key = createRoutineKey(title);
    routines[key] = {
      key,
      title,
      description: $("routineDescription").value.trim() || "Eigene Routine",
      theme: $("routineTheme").value || "focus",
      autoNext: false,
      items: []
    };
  }
  saveRoutines();
  $("routineDialog").close();
  renderRoutineCards();
  if (editing && $("routineDetail") && !$("routineDetail").hidden) openRoutineDetail(editing);
}

// Beim Scrollen klappen Titel und Rollenwähler ein; sichtbar bleibt nur die kompakte
// Datumsleiste. Zwei getrennte Schwellen verhindern Springen genau an der Grenze.
function bindHeaderCollapse() {
  const header = $("appHeader");
  if (!header) return;
  let collapsed = false;
  let ticking = false;
  const apply = () => {
    ticking = false;
    const offset = window.scrollY || document.documentElement.scrollTop || 0;
    if (!collapsed && offset > 72) { collapsed = true; header.classList.add("compact"); }
    else if (collapsed && offset < 28) { collapsed = false; header.classList.remove("compact"); }
  };
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(apply);
  }, { passive: true });
  apply();
}

function bindEvents() {
  $("prevDay").addEventListener("click", () => setDate(addDays(selectedDate, -1)));
  $("nextDay").addEventListener("click", () => setDate(addDays(selectedDate, 1)));
  $("dateButton").addEventListener("click", openCalendar);
  $("calendarPrevMonth").addEventListener("click", () => {
    const date = new Date(`${calendarCursor}T12:00:00`); date.setMonth(date.getMonth() - 1); calendarCursor = dateToISO(date); renderCalendar();
  });
  $("calendarNextMonth").addEventListener("click", () => {
    const date = new Date(`${calendarCursor}T12:00:00`); date.setMonth(date.getMonth() + 1); calendarCursor = dateToISO(date); renderCalendar();
  });
  $("calendarToday").addEventListener("click", () => { setDate(todayISO()); $("calendarDialog").close(); });
  $("calendarClose").addEventListener("click", () => $("calendarDialog").close());
  $("prayerDialogClose").addEventListener("click", () => $("prayerDialog").close());

  $("dayRole").addEventListener("change", () => {
    if ($("dayRole").value === ROLE_FOCUS_OPTION) {
      $("dayRole").value = getRole(currentData.role).name;
      openRoleFocusDialog();
      return;
    }
    currentData.role = $("dayRole").value;
    applyRolePickerStyle();
    saveReview(true);
  });
  $("roleFocusForm").addEventListener("submit", saveRoleFocusFromForm);
  $("cancelRoleFocus").addEventListener("click", () => $("roleFocusDialog").close());
  $("endRoleFocus").addEventListener("click", endRoleFocus);
  $("roleFocusDuration").addEventListener("change", () => {
    $("roleFocusDateField").hidden = $("roleFocusDuration").value !== "until";
  });
  $("roleFocusDialog").addEventListener("cancel", event => { event.preventDefault(); $("roleFocusDialog").close(); });
  $("saveButton").addEventListener("click", () => saveReview(false));
  ["breakfast", "lunch", "dinner", "snack", "water", "steps", "gratitude1", "gratitude2", "allahName", "responsibilityMain", "responsibilityAdaptation", "responsibilityNextStep", "notes"].forEach(id => {
    if (!$(id)) return;
    $(id).addEventListener("change", () => saveReview(true));
    $(id).addEventListener("input", () => { collectForm(); scheduleAutoSave(); });
  });
  ["breakfast", "lunch", "dinner", "snack"].forEach(key => {
    const select = $(`${key}Category`);
    if (!select) return;
    select.addEventListener("change", () => { collectForm(); updateMealSelectionStyles(); saveReview(true); });
  });
  $("cancelStateCheckin").addEventListener("click", () => $("stateCheckinDialog").close());
  $("stateCheckinDialog").addEventListener("cancel", event => { event.preventDefault(); $("stateCheckinDialog").close(); });
  $("stateCheckinForm").addEventListener("submit", saveStateCheckin);
  ["stateEnergy", "stateMood", "stateTaqwa", "stateSleepQuality", "stateDreamCategory", "stateDreamNote"].forEach(id => {
    if (!$(id)) return;
    $(id).addEventListener(["stateEnergy", "stateMood", "stateTaqwa", "stateDreamNote"].includes(id) ? "input" : "change", () => updateStateCheckinPreview());
  });
  const changeWater = delta => {
    currentData.water = String(Math.max(0, Math.min(10000, Number(currentData.water || 0) + delta)));
    renderWaterControl();
    saveReview(true);
    renderStateOverview();
  };
  if ($("resetStateCheckin")) $("resetStateCheckin").addEventListener("click", () => {
    const slot = $("stateCheckinDialog").dataset.editingSlot;
    resetStateCheckin(slot);
    $("stateCheckinDialog").close();
  });
  document.querySelectorAll("[data-week-mode]").forEach(button =>
    button.addEventListener("click", () => setWeekMode(button.dataset.weekMode)));
  if ($("weekBack")) $("weekBack").addEventListener("click", () => shiftRange(-1));
  if ($("weekForward")) $("weekForward").addEventListener("click", () => shiftRange(1));
  bindWeekSwipe();
  if ($("waterMinus")) $("waterMinus").addEventListener("click", () => changeWater(-500));
  if ($("waterPlus")) $("waterPlus").addEventListener("click", () => changeWater(500));
  document.querySelectorAll("[data-routine-cycle]").forEach(button => button.addEventListener("click", () => cycleRoutineState(button.dataset.routineCycle)));
  document.querySelectorAll("[data-review-open-routine]").forEach(button => button.addEventListener("click", () => {
    switchPage("routines");
    openRoutineDetail(button.dataset.reviewOpenRoutine);
  }));

  $("addActivity").addEventListener("click", () => {
    $("activityTemplate").value = "custom";
    $("activityTitle").value = "";
    $("activityRole").value = getRole(currentData.role).name;
    applyActivityTemplate();
    $("activityDialog").showModal();
    setTimeout(() => $("activityTitle").focus(), 50);
  });
  if ($("activityTemplate")) $("activityTemplate").addEventListener("change", () => applyActivityTemplate());
  $("cancelActivity").addEventListener("click", () => $("activityDialog").close());
  $("activityForm").addEventListener("submit", event => {
    event.preventDefault();
    const template = activityTemplate($("activityTemplate")?.value) || activityTemplate("custom");
    const title = template.key === "custom" ? $("activityTitle").value.trim() : template.title;
    if (!title) return;
    currentData.activities.push(normalizeActivity({
      title,
      role: template.key === "custom" ? $("activityRole").value : template.role,
      template: template.key
    }));
    $("activityDialog").close(); saveReview(true); renderActivities();
  });

  if ($("monthBack")) $("monthBack").addEventListener("click", () => shiftAnalysisMonth(-1));
  if ($("monthForward")) $("monthForward").addEventListener("click", () => shiftAnalysisMonth(1));
  if ($("exportMonthReport")) $("exportMonthReport").addEventListener("click", exportMonthReport);
  document.querySelectorAll("[data-role-range]").forEach(button => button.addEventListener("click", () => {
    roleSplitRange = button.dataset.roleRange === "month" ? "month" : "week";
    renderRoleSplit();
  }));
  if ($("roleSplitInfo")) $("roleSplitInfo").addEventListener("click", () => {
    $("roleSplitInfoBody").innerHTML = roleSplitInfoHTML();
    $("roleSplitInfoDialog").showModal();
  });
  if ($("closeRoleSplitInfo")) $("closeRoleSplitInfo").addEventListener("click", () => $("roleSplitInfoDialog").close());
  if ($("closeRoleDetail")) $("closeRoleDetail").addEventListener("click", () => $("roleDetailDialog").close());

  $("exportBackup").addEventListener("click", exportBackup);
  $("exportCsv").addEventListener("click", exportCsv);
  $("importBackupButton").addEventListener("click", () => $("importBackupInput").click());
  $("importBackupInput").addEventListener("change", event => {
    const file = event.target.files?.[0]; if (file) importBackup(file); event.target.value = "";
  });

  document.querySelectorAll(".nav-button").forEach(button => button.addEventListener("click", () => switchPage(button.dataset.page)));
  $("cancelStreakAccess").addEventListener("click", () => $("streakPrivacyDialog").close());
  $("confirmStreakAccess").addEventListener("click", grantStreakAccess);
  $("streakPrivacyDialog").addEventListener("cancel", event => { event.preventDefault(); $("streakPrivacyDialog").close(); });
  $("openRoutines").addEventListener("click", () => switchPage("routines"));
  $("backToRoutineOverview").addEventListener("click", closeRoutineDetail);
  $("startRoutineDetail").addEventListener("click", () => startRoutine(activeRoutineKey));
  if ($("addRoutine")) $("addRoutine").addEventListener("click", () => openRoutineDialog());
  if ($("deleteRoutine")) $("deleteRoutine").addEventListener("click", deleteRoutine);
  if ($("routineTheme")) $("routineTheme").addEventListener("change", updateRoutineThemePreview);
  if ($("editRoutineMeta")) $("editRoutineMeta").addEventListener("click", () => {
    const key = $("routineDetail")?.dataset.routineKey;
    if (key) openRoutineDialog(key);
  });
  $("routineDialogForm").addEventListener("submit", saveRoutineFromForm);
  $("cancelRoutine").addEventListener("click", () => $("routineDialog").close());
  $("addRoutineItem").addEventListener("click", () => openRoutineItemDialog());
  $("routineItemForm").addEventListener("submit", saveRoutineItemFromForm);
  $("cancelRoutineItem").addEventListener("click", () => $("routineItemDialog").close());
  $("deleteRoutineItem").addEventListener("click", deleteRoutineItem);
  $("routineItemEmoji").addEventListener("input", () => {
    if ($("routineItemEmoji").value.trim()) setRoutineEmojiError(false);
  });

  $("closeRoutineSession").addEventListener("click", closeRoutineSession);
  $("routineSessionDialog").addEventListener("cancel", event => {
    event.preventDefault();
    const editor = $("sessionRoutineEditor");
    if (editor && !editor.hidden) toggleSessionRoutineEditor(false);
    else closeRoutineSession();
  });
  $("sessionPause").addEventListener("click", toggleRoutineSessionRunning);
  $("sessionComplete").addEventListener("click", () => completeSessionItem("done"));
  $("sessionSkip").addEventListener("click", () => completeSessionItem("skipped"));
  $("sessionMinus").addEventListener("click", () => adjustRoutineSessionMinutes(-1));
  $("sessionPlus").addEventListener("click", () => adjustRoutineSessionMinutes(1));
  $("sessionEditRoutine").addEventListener("click", () => toggleSessionRoutineEditor());
  $("sessionEditorDone").addEventListener("click", () => toggleSessionRoutineEditor(false));
  $("sessionRoutineEditor").addEventListener("click", event => {
    if (event.target === $("sessionRoutineEditor")) toggleSessionRoutineEditor(false);
  });

  bindHeaderCollapse();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && routineSession) { syncRoutineSessionClock(); renderRoutineSession(); }
    persistRoutineSession();
  });
  window.addEventListener("focus", () => { if (routineSession) { syncRoutineSessionClock(); renderRoutineSession(); } });
  window.addEventListener("pageshow", () => { if (routineSession) { syncRoutineSessionClock(); renderRoutineSession(); } });
  window.addEventListener("pagehide", persistRoutineSession);
}

/* ==========================================================================
   DIALOGE – gemeinsamer Hintergrundschutz
   Die Positionierung selbst liegt vollständig in einer einzigen CSS-Regel.
   Hier wird ausschließlich verhindert, dass die Seite hinter einem offenen
   Dialog mitscrollt; die Scrollposition wird beim Schließen exakt
   wiederhergestellt. Fokus, Escape und alle vorhandenen Schließen-Buttons
   bleiben unverändert.
   ========================================================================== */
let dialogScrollOffset = 0;
let dialogScrollLocked = false;

/* Bei eingeblendeter Tastatur schrumpft der sichtbare Bereich (visual
   viewport), während die Layouthöhe gleich bleibt. Beides wird hier in zwei
   CSS-Variablen übersetzt, damit der Dialog sichtbar bleibt und seine
   Aktionen nicht abgeschnitten werden. Fehlt die API, gilt unverändert die
   reine CSS-Zentrierung mit 100dvh. */
function syncDialogViewport() {
  const view = window.visualViewport;
  if (!view) return;
  const root = document.documentElement;
  const layoutHeight = window.innerHeight || view.height;
  root.style.setProperty("--dialog-vh", `${Math.round(view.height)}px`);
  root.style.setProperty("--dialog-shift", `${Math.round(view.offsetTop + view.height / 2 - layoutHeight / 2)}px`);
}

function updateDialogScrollLock() {
  const anyOpen = Boolean(document.querySelector("dialog[open]"));
  if (anyOpen) syncDialogViewport();
  if (anyOpen && !dialogScrollLocked) {
    dialogScrollOffset = window.scrollY || 0;
    document.body.style.top = `-${dialogScrollOffset}px`;
    document.body.classList.add("dialog-open");
    dialogScrollLocked = true;
  } else if (!anyOpen && dialogScrollLocked) {
    document.body.classList.remove("dialog-open");
    document.body.style.top = "";
    window.scrollTo(0, dialogScrollOffset);
    dialogScrollLocked = false;
  }
}

function setupDialogs() {
  document.querySelectorAll("dialog").forEach(dialog => {
    if (typeof dialog.showModal === "function") {
      const nativeShowModal = dialog.showModal.bind(dialog);
      dialog.showModal = () => {
        nativeShowModal();
        updateDialogScrollLock();
      };
    }
    dialog.addEventListener("close", updateDialogScrollLock);
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
      if (document.querySelector("dialog[open]")) syncDialogViewport();
    });
    window.visualViewport.addEventListener("scroll", () => {
      if (document.querySelector("dialog[open]")) syncDialogViewport();
    });
  }
}

function init() {
  loadRoleFocus();
  loadWeekMode();
  analysisMonth = todayISO().slice(0, 7);
  setupDialogs();
  initOptions();
  if ($("appVersionLabel")) $("appVersionLabel").textContent = `ROLEPLAY ${APP_VERSION}`;
  routines = loadRoutines();
  bindEvents();
  const lastBackupAt = localStorage.getItem(BACKUP_TIMESTAMP_KEY);
  if (lastBackupAt) $("backupStatus").textContent = `Letztes Backup: ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(lastBackupAt))}`;
  setDate(todayISO());
  switchPage("review");
  restoreRoutineSession();
  registerServiceWorker();
}

/* Aktualisierung: Der neue Service Worker übernimmt sofort (skipWaiting und
   clients.claim). Nur wenn die Seite vorher bereits von einem Worker
   kontrolliert wurde, wird einmalig neu geladen – so greift die neue
   Version zuverlässig, ohne beim ersten Installieren eine Schleife zu
   erzeugen. */
function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const hadController = Boolean(navigator.serviceWorker.controller);
  let reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!hadController || reloading) return;
    reloading = true;
    window.location.reload();
  });
  navigator.serviceWorker.register("./service-worker.js").catch(() => {});
}

document.addEventListener("DOMContentLoaded", init);

/* Sunnah-Gebete: zyklischer Wechsel durch die vorhandenen Statuswerte.
   Die bestehende Datenstruktur bleibt unverändert – gespeichert werden
   weiterhin genau die Werte aus SUNNAH_PRAYER_STATES. */
function cycleSunnahPrayer(prayer) {
  if (!currentData) return;
  currentData.sunnahPrayers = currentData.sunnahPrayers || {};
  const order = SUNNAH_PRAYER_STATES.map(item => item.value);
  const current = currentData.sunnahPrayers[prayer] || "";
  const next = order[(order.indexOf(current) + 1 + order.length) % order.length];
  currentData.sunnahPrayers[prayer] = next;
  saveReview(true);
  renderPrayers();
}

/* Horizontales Blättern durch den Rückblick.
   Im Kalendermodus entspricht eine Wischbewegung genau einer Woche, im
   gleitenden Modus genau einem Tag (siehe shiftRange). */
function bindWeekSwipe() {
  const area = $("statsSwipe");
  if (!area || area.dataset.swipeBound === "true") return;
  area.dataset.swipeBound = "true";
  let startX = 0, startY = 0, active = false;

  area.addEventListener("pointerdown", event => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    startX = event.clientX; startY = event.clientY; active = true;
  });

  area.addEventListener("pointerup", event => {
    if (!active) return;
    active = false;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    // Nur eindeutig horizontale Bewegungen zählen, damit Scrollen nicht stört.
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    const moved = shiftRange(dx > 0 ? -1 : 1);
    if (moved) area.animate(
      [{ opacity: .45, transform: `translateX(${dx > 0 ? 14 : -14}px)` }, { opacity: 1, transform: "none" }],
      { duration: 190, easing: "ease-out" });
  });

  area.addEventListener("pointercancel", () => { active = false; });
}
