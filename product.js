/* Product configuration. Role names are stable IDs; labels can change without rewriting history. */
const PRODUCT_SETTINGS_KEY = "roleplay-v25-product-settings";
const BUILTIN_ROLES = ROLES.map(role => ({ ...role }));
const BUILTIN_ACTIVITIES = ACTIVITY_TEMPLATES.map(item => ({ ...item }));
/* Öffentliche Bezeichnungen der eingebauten Rollen. Die Kennungen (name)
   bleiben unverändert, damit bestehende Einträge ihre Rolle behalten. */
const PUBLIC_ROLE_LABELS = { "Ich-Person": "Ich", Vitalist: "Gesundheit", Absolvent: "Lernen", Unternehmer: "Beruf", Muslim: "Glaube", Wirt: "Zuhause", Familienmensch: "Beziehungen" };
const ONBOARDING_DEFAULT_ROLES = ["Ich-Person", "Vitalist", "Unternehmer", "Familienmensch"];
const MAX_ONBOARDING_ROLES = 5;
const NEUTRAL_STREAKS = [{ key: "smokeFree", label: "Rauchfrei" }, { key: "alcoholFree", label: "Alkoholfrei" }];
let onboardingStep = 1;
let onboardingCustomRoles = [];
let productSettings = null;
let settingsDraft = null;
let productMessageTimer;

function religionEnabled() { return productSettings ? productSettings.religion : true; }
function moduleEnabled(key) { return productSettings ? productSettings[key] !== false : true; }
function selectableRoles(include = "") { return ROLES.filter(role => !role.archived || role.name === include); }
function availableActivityTemplates() {
  return ACTIVITY_TEMPLATES.filter(template => !template.archived && (template.key === "custom"
    || (selectableRoles().some(role => role.name === template.role)
      && (productSettings?.personalTemplate !== false || template.key.startsWith("user-"))
      && (religionEnabled() || template.role !== "Muslim"))));
}
function neutralRoutines() {
  return {
    morning: { key: "morning", title: "Morgenroutine", description: "Bewusst in den Tag", theme: "morning", autoNext: false,
      items: [{ id: "neutral-water", emoji: "💧", title: "Wasser trinken", minutes: 1, context: "", steps: [] }, { id: "neutral-plan", emoji: "📝", title: "Einen kleinen Schritt für heute wählen", minutes: 3, context: "Was passt heute zu deiner Energie und deinen Aufgaben?", steps: [] }] },
    evening: { key: "evening", title: "Abendroutine", description: "Den Tag abschließen", theme: "evening", autoNext: false,
      items: [{ id: "neutral-review", emoji: "📖", title: "Auf den Tag zurückblicken", minutes: 3, context: "Was hat dir heute geholfen?", steps: [] }, { id: "neutral-tomorrow", emoji: "🌙", title: "Morgen vorbereiten", minutes: 2, context: "", steps: [] }] }
  };
}
function makeProductSettings(template = "general", legacy = false) {
  const personal = template === "personal";
  const roles = BUILTIN_ROLES.map(role => ({ ...role, label: personal ? (role.name === "Ich-Person" ? "Ich" : role.name) : PUBLIC_ROLE_LABELS[role.name], goal: "", archived: !personal && (role.name === "Muslim" || template === "empty") }));
  if (template === "empty") roles[0].archived = false;
  const active = roles.filter(role => !role.archived);
  const weekRoles = personal ? ["Familienmensch", "Ich-Person", "Vitalist", "Absolvent", "Unternehmer", "Muslim", "Wirt"]
    : Array.from({ length: 7 }, (_, i) => active[(i + active.length - 1) % active.length].name);
  return { version: 1, completed: legacy, personalTemplate: personal, religion: personal, streaks: personal,
    vitality: true, gratitude: true, streakItems: (personal ? BUILTIN_STREAKS : NEUTRAL_STREAKS).map(item => ({ ...item, archived: false })),
    fastingDays: legacy ? 29 : 0, roles, weekRoles, activityTemplates: [] };
}
function validateProductSettings(raw) {
  RPBackup.tree(raw);
  RPBackup.assert(RPBackup.object(raw) && raw.version === 1, "Die persönlichen Einstellungen haben ein unbekanntes Format.");
  RPBackup.assert(Array.isArray(raw.roles) && raw.roles.length > 0 && raw.roles.length <= 100, "Bitte verwende zwischen 1 und 100 Rollen einschließlich archivierter Rollen.");
  const ids = new Set(), labels = new Set();
  const roles = raw.roles.map(role => {
    RPBackup.assert(RPBackup.object(role) && typeof role.name === "string" && role.name.length <= 80 && /^[\p{L}\p{N}_. -]+$/u.test(role.name) && role.name.trim() && !["__proto__", "constructor", "prototype", "__rolefocus__"].includes(role.name), "Eine Rolle hat eine ungültige Kennung.");
    RPBackup.assert(!ids.has(role.name), "Eine Rolle ist doppelt vorhanden."); ids.add(role.name);
    RPBackup.assert(typeof role.label === "string" && role.label.trim().length > 0 && role.label.length <= 48, "Jede Rolle braucht einen Namen mit höchstens 48 Zeichen.");
    const label = role.label.trim();
    if (!role.archived) { RPBackup.assert(!labels.has(label.toLocaleLowerCase("de")), "Aktive Rollen brauchen unterschiedliche Namen."); labels.add(label.toLocaleLowerCase("de")); }
    RPBackup.assert(typeof role.color === "string" && /^#[0-9a-f]{6}$/i.test(role.color), "Bitte wähle eine gültige Rollenfarbe.");
    RPBackup.assert(typeof role.emoji === "string" && role.emoji.length <= 16, "Das Rollensymbol ist zu lang.");
    RPBackup.assert(role.goal == null || (typeof role.goal === "string" && role.goal.length <= 400), "Ein Rollenziel darf höchstens 400 Zeichen enthalten.");
    return { name: role.name, label, emoji: role.emoji || "✨", color: role.color, text: parseInt(role.color.slice(1,3),16)*.299 + parseInt(role.color.slice(3,5),16)*.587 + parseInt(role.color.slice(5,7),16)*.114 < 140 ? "#ffffff" : "#15233f", goal: role.goal || "", archived: Boolean(role.archived) };
  });
  RPBackup.assert(roles.some(role => !role.archived), "Mindestens eine Rolle muss aktiv bleiben.");
  RPBackup.assert(Array.isArray(raw.weekRoles) && raw.weekRoles.length === 7 && raw.weekRoles.every(id => roles.some(role => role.name === id && !role.archived)), "Bitte ordne jedem Wochentag eine aktive Rolle zu.");
  RPBackup.assert(Number.isInteger(raw.fastingDays) && raw.fastingDays >= 0 && raw.fastingDays <= 10000, "Die offenen Fastentage müssen eine ganze Zahl zwischen 0 und 10000 sein.");
  for (const key of ["completed", "religion", "personalTemplate", "streaks"]) RPBackup.assert(typeof raw[key] === "boolean", "Eine persönliche Einstellung ist ungültig.");
  for (const key of ["vitality", "gratitude"]) RPBackup.assert(raw[key] == null || typeof raw[key] === "boolean", "Eine Moduleinstellung ist ungültig.");
  // Ältere Einstellungen kennen keine eigenen Streaks: dann gelten die bisherigen vier.
  const streakSource = raw.streakItems == null ? BUILTIN_STREAKS.map(item => ({ ...item, archived: false })) : raw.streakItems;
  RPBackup.assert(Array.isArray(streakSource) && streakSource.length <= 40, "Die Streak-Liste ist ungültig.");
  const streakIds = new Set();
  const streakItems = streakSource.map(item => {
    RPBackup.assert(RPBackup.object(item) && typeof item.key === "string" && /^(?:[A-Za-z]{2,24}|user-[a-z0-9-]{4,60})$/.test(item.key) && !streakIds.has(item.key) && !["__proto__", "constructor", "prototype"].includes(item.key), "Ein Streak hat eine ungültige Kennung.");
    streakIds.add(item.key);
    RPBackup.assert(typeof item.label === "string" && item.label.trim().length > 0 && item.label.length <= 40, "Jeder Streak braucht einen Namen mit höchstens 40 Zeichen.");
    return { key: item.key, label: item.label.trim(), archived: Boolean(item.archived) };
  });
  RPBackup.assert(Array.isArray(raw.activityTemplates || []) && (raw.activityTemplates || []).length <= 100, "Zu viele Aktivitätsvorlagen.");
  const templateIds = new Set();
  const activityTemplates = (raw.activityTemplates || []).map(item => {
    RPBackup.assert(RPBackup.object(item) && typeof item.key === "string" && /^user-[a-z0-9-]+$/.test(item.key) && !templateIds.has(item.key), "Eine Aktivitätsvorlage ist ungültig oder doppelt vorhanden."); templateIds.add(item.key);
    RPBackup.assert(typeof item.title === "string" && item.title.trim().length > 0 && item.title.length <= 80 && ids.has(item.role), "Eine Aktivitätsvorlage braucht einen Titel und eine vorhandene Rolle.");
    RPBackup.assert(typeof item.weight === "number" && Number.isFinite(item.weight) && item.weight >= .1 && item.weight <= 10, "Eine Aktivität kann zwischen 0,1 und 10 Präsenzpunkte zählen.");
    return { key: item.key, title: item.title.trim(), label: item.title.trim(), role: item.role, weight: item.weight, archived: Boolean(item.archived) };
  });
  return { version: 1, completed: raw.completed, personalTemplate: raw.personalTemplate, religion: raw.religion, streaks: raw.streaks,
    vitality: raw.vitality !== false, gratitude: raw.gratitude !== false, streakItems,
    fastingDays: raw.fastingDays, roles, weekRoles: [...raw.weekRoles], activityTemplates };
}
function hasLegacyData() {
  for (let i = 0; i < RPStorage.length; i++) {
    const key = RPStorage.key(i);
    if (key?.startsWith("roleplay-v25-review-") || key === ROUTINES_STORAGE_KEY || key === ROLE_FOCUS_STORAGE_KEY) return true;
  }
  return false;
}
function loadProductSettings() {
  const saved = RPStorage.getItem(PRODUCT_SETTINGS_KEY);
  if (saved) return validateProductSettings(JSON.parse(saved));
  const legacy = hasLegacyData();
  return makeProductSettings(legacy ? "personal" : "general", legacy);
}
function prepareImportedSettings(payload) {
  const incoming = payload.settings?.product ? validateProductSettings(payload.settings.product)
    : makeProductSettings("personal", true);
  incoming.completed = true;
  // Retain definitions required by days that are not replaced by this import.
  for (const role of ROLES) if (!incoming.roles.some(item => item.name === role.name)) incoming.roles.push({ ...role, label: role.label || roleDisplayName(role.name), archived: true, goal: role.goal || "" });
  const required = payload.reviews.flatMap(item => [item.data.role, ...(item.data.activities || []).map(activity => activity.role), ...(item.data.stateCheckins || []).map(checkin => checkin.primaryRole)]).filter(Boolean);
  for (let id of required) {
    if (["Ich", "Yannick"].includes(id)) id = "Ich-Person";
    if (!incoming.roles.some(role => role.name === id)) incoming.roles.push({ name: id, label: id, emoji: "✨", color: "#4a69bd", text: "#15233f", goal: "", archived: true });
  }
  for (const template of productSettings?.activityTemplates || []) if (!incoming.activityTemplates.some(item => item.key === template.key)) incoming.activityTemplates.push({ ...template, archived: true });
  return validateProductSettings(incoming);
}
function applyProductSettings() {
  if (!productSettings) return;
  ROLES = productSettings.roles.map(role => ({ ...role }));
  ACTIVITY_TEMPLATES = [...BUILTIN_ACTIVITIES, ...productSettings.activityTemplates];
  STREAKS = productSettings.streakItems.filter(item => !item.archived).map(({ key, label }) => ({ key, label }));
  document.body?.classList.toggle("without-religion", !productSettings.religion);
  document.body?.classList.toggle("without-streaks", !productSettings.streaks);
  document.body?.classList.toggle("without-vitality", !productSettings.vitality);
  document.body?.classList.toggle("without-gratitude", !productSettings.gratitude);
}
function setSaveStatus(text) { const node = $("saveStatus"); if (node) node.textContent = text; }
function showProductMessage(text, error = false) {
  const node = $("productMessage");
  if (!node) { if (error) alert(text); return; }
  clearTimeout(productMessageTimer);
  node.textContent = text; node.hidden = false; node.classList.toggle("is-error", error);
  node.setAttribute("role", error ? "alert" : "status");
  productMessageTimer = setTimeout(() => { node.hidden = true; }, error ? 14000 : 6000);
}
function showStorageError(error) {
  const node = $("storageError");
  if (node) { node.hidden = false; $("storageErrorText").textContent = error.message || "Die Daten konnten nicht geladen werden. Bitte sichere den aktuellen Stand."; }
  setSaveStatus("Nicht gespeichert");
}
globalThis.onRoleplayStorageError = showStorageError;
function emergencyBackup() {
  try {
    collectForm();
    const payload = { app: "RoleplayEmergency", version: APP_VERSION, createdAt: new Date().toISOString(), raw: RPStorage.emergencySnapshot(), openReview: currentData ? { date: selectedDate, data: currentData } : null };
    downloadTextFile(`${BRAND_FILE_PREFIX}-notsicherung-${todayISO()}.json`, JSON.stringify(payload, null, 2), "application/json");
    showProductMessage("Notsicherung angefordert. Prüfe bitte, ob die Datei in deinen Downloads liegt. Sie enthält persönliche Rohdaten für die Wiederherstellung.");
  } catch (error) { alert(`Die Notsicherung konnte nicht erstellt werden: ${error.message}`); }
}
function finishProductInit() {
  if (!RPStorage.getItem(PRODUCT_SETTINGS_KEY) && productSettings.completed) RPStorage.setItem(PRODUCT_SETTINGS_KEY, JSON.stringify(productSettings));
  if (!productSettings.completed) openOnboarding();
  // Erinnern, sobald es etwas zu sichern gibt: ab drei Tagen mit Einträgen
  // ohne Sicherung oder wenn die letzte Sicherung älter als sieben Tage ist.
  const lastBackup = RPStorage.getItem(BACKUP_TIMESTAMP_KEY);
  let storedDays = 0;
  for (let i = 0; i < RPStorage.length; i++) if (RPStorage.key(i)?.startsWith(`${STORAGE_NAMESPACE}-review-`)) storedDays++;
  const due = lastBackup ? Date.now() - Date.parse(lastBackup) > 7 * 86400000 : storedDays >= 3;
  $("backupReminder").hidden = !(due && storedDays > 0);
  $("backupReminder").querySelector("span").textContent = lastBackup ? "Deine letzte Sicherung ist über eine Woche her." : "Sichere deine Einträge einmal als Datei – so gehen sie bei einem Gerätewechsel nicht verloren.";
}
function setupProductUI() {
  $("openSettings").addEventListener("click", () => openSettings("roles"));
  $("openHelp").addEventListener("click", () => openSettings("help"));
  $("productMessage").addEventListener("click", () => { $("productMessage").hidden = true; });
  $("settingsClose").addEventListener("click", () => $("settingsDialog").close());
  $("emergencyBackup").addEventListener("click", emergencyBackup);
  $("recoveryImport").addEventListener("click", () => $("recoveryFile").click());
  $("recoveryFile").addEventListener("change", async event => { const file = event.target.files?.[0]; if (file && await importBackup(file)) location.reload(); event.target.value = ""; });
  $("reloadApp").addEventListener("click", () => location.reload());
  $("backupReminderButton").addEventListener("click", () => { exportBackup(); });
  $("onboardingForm").addEventListener("submit", completeOnboarding);
  $("onboardingForm").addEventListener("click", event => {
    if (event.target.closest("[data-onboarding-next]")) goToOnboardingStep(onboardingStep + 1);
    if (event.target.closest("[data-onboarding-back]")) goToOnboardingStep(onboardingStep - 1);
  });
  $("addCustomRole").addEventListener("click", addOnboardingCustomRole);
  $("customRoleName").addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); addOnboardingCustomRole(); } });
  $("onboardingRoleChoices").addEventListener("change", () => { $("onboardingRoleError").textContent = ""; });
  $("onboardingDialog").addEventListener("cancel", event => { if (!productSettings.completed) event.preventDefault(); });
  $("onboardingImport").addEventListener("click", () => $("onboardingFile").click());
  $("onboardingFile").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (file && await importBackup(file)) { $("onboardingDialog").close(); showProductMessage("Sicherung übernommen. Deine Rollen und Einträge sind bereit."); }
    event.target.value = "";
  });
  $("settingsTabs").addEventListener("click", event => { const button = event.target.closest("[data-settings-tab]"); if (button) selectSettingsTab(button.dataset.settingsTab); });
  $("settingsForm").addEventListener("submit", saveSettingsForm);
  $("addRoleButton").addEventListener("click", () => {
    collectSettingsDraft();
    if (settingsDraft.roles.length >= 100) { showProductMessage("Es sind höchstens 100 Rollen möglich.", true); return; }
    if (!canUseActiveRoles(settingsDraft.roles.filter(role => !role.archived).length + 1)) return;
    const id = newProductId("role");
    settingsDraft.roles.push({ name: id, label: "Neue Rolle", emoji: "✨", color: "#4a69bd", text: "#15233f", goal: "", archived: false });
    renderSettingsRoles(); renderWeekRoles();
    document.querySelector(`[data-role-id="${id}"] input`)?.focus();
  });
  $("settingsRoleList").addEventListener("change", event => {
    if (event.target.matches('[data-role-field="archived"]') && !event.target.checked && !canUseActiveRoles(settingsDraft.roles.filter(role => !role.archived).length + 1)) { event.target.checked = true; return; }
    if (event.target.matches('[data-role-field="archived"], [data-role-field="label"]')) { collectSettingsDraft(); renderWeekRoles(); }
  });
  $("addTemplateButton").addEventListener("click", addActivityTemplate);
  $("settingsTemplateList").addEventListener("click", event => {
    const button = event.target.closest("[data-archive-template]"); if (!button) return;
    const template = settingsDraft.activityTemplates.find(item => item.key === button.dataset.archiveTemplate);
    if (template) { template.archived = !template.archived; renderSettingsTemplates(); }
  });
  $("addStreakButton").addEventListener("click", addStreakItem);
  $("newStreakLabel").addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); addStreakItem(); } });
  $("settingsStreakList").addEventListener("click", event => {
    const button = event.target.closest("[data-toggle-streak]"); if (!button) return;
    collectSettingsDraft();
    const item = settingsDraft.streakItems.find(entry => entry.key === button.dataset.toggleStreak);
    if (item) { item.archived = !item.archived; renderSettingsStreaks(); }
  });
  ["settingsReligion", "settingsStreaks"].forEach(id => $(id).addEventListener("change", syncSettingsModuleSections));
  $("deleteLocalData").addEventListener("click", deleteLocalData);
  $("saveFeedback").addEventListener("click", saveFeedback);
  globalThis.addEventListener?.("error", event => { if (event.error) showStorageError(event.error); });
  globalThis.addEventListener?.("unhandledrejection", event => { if (event.reason) showStorageError(event.reason); });
  globalThis.addEventListener?.("offline", () => setSaveStatus("Offline · lokal gespeichert"));
  globalThis.addEventListener?.("online", () => setSaveStatus("Lokal gespeichert"));
}
function newProductId(prefix) { return `${prefix}-${globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2, 8)}`; }
function onboardingRoleLibrary() {
  return [...BUILTIN_ROLES.map(role => ({ id: role.name, label: PUBLIC_ROLE_LABELS[role.name] || role.name, emoji: role.emoji, color: role.color })),
    ...onboardingCustomRoles];
}
function renderOnboardingRoles(selected = null) {
  const current = selected || new Set([...document.querySelectorAll('[name="startRole"]:checked')].map(input => input.value));
  $("onboardingRoleChoices").innerHTML = onboardingRoleLibrary().map(role => `<label class="role-choice" style="--choice-color:${role.color}"><input type="checkbox" name="startRole" value="${escapeHTML(role.id)}" ${current.has(role.id) ? "checked" : ""}><span><span aria-hidden="true">${escapeHTML(role.emoji)}</span> ${escapeHTML(role.label)}</span></label>`).join("");
}
function addOnboardingCustomRole() {
  const label = $("customRoleName").value.trim();
  if (!label) { $("customRoleName").focus(); return; }
  if (onboardingRoleLibrary().some(role => role.label.toLocaleLowerCase("de") === label.toLocaleLowerCase("de"))) { $("onboardingRoleError").textContent = "Diese Rolle gibt es bereits."; return; }
  const palette = ["#4a69bd", "#e17055", "#00b894", "#6c5ce7", "#fdcb6e", "#e84393"];
  const role = { id: newProductId("role"), label: label.slice(0, 48), emoji: "✨", color: palette[onboardingCustomRoles.length % palette.length], custom: true };
  onboardingCustomRoles.push(role);
  const selected = new Set([...document.querySelectorAll('[name="startRole"]:checked')].map(input => input.value));
  if (selected.size < MAX_ONBOARDING_ROLES) selected.add(role.id);
  renderOnboardingRoles(selected);
  $("customRoleName").value = ""; $("onboardingRoleError").textContent = "";
}
function selectedOnboardingRoles() { return [...document.querySelectorAll('[name="startRole"]:checked')].map(input => input.value); }
function goToOnboardingStep(step) {
  if (step > onboardingStep && onboardingStep === 2) {
    const count = selectedOnboardingRoles().length;
    if (!count) { $("onboardingRoleError").textContent = "Wähle mindestens eine Rolle."; return; }
    if (count > MAX_ONBOARDING_ROLES) { $("onboardingRoleError").textContent = `Starte mit höchstens ${MAX_ONBOARDING_ROLES} Rollen. Weitere ergänzt du später in den Einstellungen.`; return; }
  }
  if (step === 3 && selectedOnboardingRoles().includes("Muslim") && !$("onboardingDialog").dataset.religionTouched) $("setupReligion").checked = true;
  onboardingStep = Math.max(1, Math.min(4, step));
  document.querySelectorAll("[data-onboarding-step]").forEach(section => { section.hidden = Number(section.dataset.onboardingStep) !== onboardingStep; });
  document.querySelectorAll(".onboarding-progress span").forEach((dot, index) => dot.classList.toggle("is-done", index < onboardingStep));
  if (onboardingStep === 4) {
    const labels = onboardingRoleLibrary().filter(role => selectedOnboardingRoles().includes(role.id)).map(role => role.label);
    const modules = [["setupVitality", "Vitalität"], ["setupGratitude", "Dankbarkeit"], ["setupRoutines", "Routinen"], ["setupStreaks", "Streaks"], ["setupReligion", "Islamische Praxis"]].filter(([id]) => $(id).checked).map(([, label]) => label);
    $("onboardingSummary").textContent = `Deine Rollen: ${labels.join(", ")}. ${modules.length ? `Dazu: ${modules.join(", ")}.` : "Nur die Tagesreflexion – schlank und fokussiert."}`;
  }
  $("onboardingDialog").querySelector(`[data-onboarding-step="${onboardingStep}"] h2`)?.focus?.();
  $("onboardingDialog").scrollTop = 0;
}
function openOnboarding() {
  onboardingStep = 1; onboardingCustomRoles = [];
  renderOnboardingRoles(new Set(ONBOARDING_DEFAULT_ROLES));
  goToOnboardingStep(1);
  $("setupReligion").addEventListener("change", () => { $("onboardingDialog").dataset.religionTouched = "true"; }, { once: true });
  $("onboardingDialog").showModal();
}
function productSettingsFromOnboarding() {
  const chosen = selectedOnboardingRoles();
  const next = makeProductSettings("general");
  next.roles = next.roles.map(role => ({ ...role, archived: !chosen.includes(role.name) }));
  for (const custom of onboardingCustomRoles.filter(role => chosen.includes(role.id))) {
    next.roles.push({ name: custom.id, label: custom.label, emoji: custom.emoji, color: custom.color, text: "#15233f", goal: "", archived: false });
  }
  // Reihenfolge der Auswahl bestimmt die Wochenrotation (Montag beginnt).
  const active = chosen.map(id => next.roles.find(role => role.name === id)).filter(Boolean);
  next.weekRoles = Array.from({ length: 7 }, (_, weekday) => active[(weekday + 6) % 7 % active.length].name);
  next.completed = true;
  next.religion = $("setupReligion").checked;
  next.streaks = $("setupStreaks").checked;
  next.vitality = $("setupVitality").checked;
  next.gratitude = $("setupGratitude").checked;
  return validateProductSettings(next);
}
function completeOnboarding(event) {
  event.preventDefault();
  try {
    const checked = productSettingsFromOnboarding();
    const initialRoutines = $("setupRoutines").checked ? neutralRoutines() : {};
    const changes = [{ key: PRODUCT_SETTINGS_KEY, value: JSON.stringify(checked) }, { key: ROUTINES_STORAGE_KEY, value: JSON.stringify(initialRoutines) }];
    if ($("setupTrial").checked) { const trial = plusTrialChange(); if (trial) changes.push(trial); }
    RPStorage.transaction(changes);
    productSettings = checked; applyProductSettings(); reloadPlusState(); routines = loadRoutines(); initOptions();
    currentData = null; setDate(todayISO()); $("onboardingDialog").close();
    showProductMessage($("setupTrial").checked ? "Willkommen! Plus ist 14 Tage freigeschaltet. Tippe auf „Morgen“, um deinen ersten Check-in zu machen." : "Willkommen! Tippe auf eine Tagesphase, um deinen ersten Check-in zu machen.");
  } catch (error) { $("onboardingError").textContent = error.message; }
}
function openSettings(tab = "roles") {
  if (dirtyReview && !saveReview(true)) return;
  settingsDraft = JSON.parse(JSON.stringify(productSettings));
  renderSettings(); selectSettingsTab(tab); $("settingsDialog").showModal();
}
function selectSettingsTab(tab) {
  if (settingsDraft) { collectSettingsDraft(); if (tab === "daily") renderWeekRoles(); }
  document.querySelectorAll("[data-settings-tab]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.settingsTab === tab)));
  document.querySelectorAll("[data-settings-panel]").forEach(panel => { panel.hidden = panel.dataset.settingsPanel !== tab; });
  $("settingsSave").hidden = !["roles", "daily"].includes(tab);
}
function renderSettingsRoles() {
  const roleHTML = role => `<fieldset class="editable-role" data-role-id="${escapeHTML(role.name)}" style="--editable-role-color:${role.color}">
    <legend>${escapeHTML(role.emoji)} ${escapeHTML(role.label)}${role.archived ? " · archiviert" : ""}</legend>
    <div class="role-edit-row"><label>Name<input data-role-field="label" value="${escapeHTML(role.label)}" maxlength="48" required></label>
    <label class="emoji-field">Symbol<input data-role-field="emoji" value="${escapeHTML(role.emoji)}" maxlength="16"></label><label class="color-field">Farbe<input data-role-field="color" type="color" value="${role.color}"></label></div>
    <label>Mein Ziel oder Leitgedanke<textarea data-role-field="goal" rows="2" maxlength="400" placeholder="Was ist mir in dieser Rolle wichtig?">${escapeHTML(role.goal || "")}</textarea></label>
    <label class="toggle-line"><input data-role-field="archived" type="checkbox" ${role.archived ? "checked" : ""}> Rolle archivieren</label>
  </fieldset>`;
  const active = settingsDraft.roles.filter(role => !role.archived);
  const archived = settingsDraft.roles.filter(role => role.archived);
  $("settingsRoleList").innerHTML = active.map(roleHTML).join("") + (archived.length ? `<details class="archived-roles"><summary>${archived.length} archivierte Rollen</summary>${archived.map(roleHTML).join("")}</details>` : "");
}
function renderWeekRoles() {
  const active = settingsDraft.roles.filter(role => !role.archived);
  const labels = [[1, "Montag"], [2, "Dienstag"], [3, "Mittwoch"], [4, "Donnerstag"], [5, "Freitag"], [6, "Samstag"], [0, "Sonntag"]];
  $("settingsWeekRoles").innerHTML = labels.map(([index, label]) => `<label>${label}<select data-weekday="${index}">${active.map(role => `<option value="${escapeHTML(role.name)}" ${settingsDraft.weekRoles[index] === role.name ? "selected" : ""}>${escapeHTML(role.label)}</option>`).join("")}</select></label>`).join("");
  $("templateRole").innerHTML = active.map(role => `<option value="${escapeHTML(role.name)}">${escapeHTML(role.label)}</option>`).join("");
}
function renderSettingsTemplates() {
  $("settingsTemplateList").innerHTML = settingsDraft.activityTemplates.map(item => `<div class="template-row"><span><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(settingsDraft.roles.find(role => role.name === item.role)?.label || item.role)} · ${formatPoints(item.weight)} Punkte${item.archived ? " · archiviert" : ""}</small></span><button type="button" class="small-button" data-archive-template="${escapeHTML(item.key)}">${item.archived ? "Aktivieren" : "Archivieren"}</button></div>`).join("") || '<p class="settings-hint">Noch keine eigenen Vorlagen. Einzelne Aktivitäten kannst du jederzeit direkt im Tagesreview erfassen.</p>';
}
function renderSettings() {
  renderSettingsRoles(); renderWeekRoles(); renderSettingsTemplates(); renderSettingsStreaks();
  $("settingsReligion").checked = settingsDraft.religion;
  $("settingsStreaks").checked = settingsDraft.streaks;
  $("settingsVitality").checked = settingsDraft.vitality;
  $("settingsGratitude").checked = settingsDraft.gratitude;
  $("settingsPersonal").checked = settingsDraft.personalTemplate;
  // Die persönliche Vorlage ist kein Angebot für neue Nutzer – nur sichtbar, wenn sie aktiv ist.
  $("settingsPersonalLine").hidden = !productSettings.personalTemplate;
  $("settingsFastingDays").value = settingsDraft.fastingDays;
  $("settingsError").textContent = "";
  $("settingsVersion").textContent = `${BRAND_NAME} ${APP_VERSION} · ${plusStatusLabel()}`;
  syncSettingsModuleSections(); renderRoleLimitHint();
}
function syncSettingsModuleSections() {
  $("settingsFastingField").hidden = !$("settingsReligion").checked;
  $("settingsStreakSection").hidden = !$("settingsStreaks").checked;
}
function renderRoleLimitHint() {
  const active = settingsDraft.roles.filter(role => !role.archived).length;
  const limit = PLUS_CONFIG.freeRoleLimit;
  $("roleLimitHint").hidden = hasPlus();
  $("roleLimitHint").innerHTML = `${active} von ${limit} Rollen in der kostenlosen Version aktiv. <button type="button" class="text-button inline" data-open-plus="roles">Mehr mit Plus</button>`;
}
function renderSettingsStreaks() {
  $("settingsStreakList").innerHTML = settingsDraft.streakItems.map(item => `<div class="template-row"><span><strong>${escapeHTML(item.label)}</strong>${item.archived ? "<small>ausgeblendet</small>" : ""}</span><button type="button" class="small-button" data-toggle-streak="${escapeHTML(item.key)}">${item.archived ? "Einblenden" : "Ausblenden"}</button></div>`).join("") || '<p class="settings-hint">Noch keine Streaks.</p>';
}
function addStreakItem() {
  collectSettingsDraft();
  const label = $("newStreakLabel").value.trim();
  if (!label) { $("newStreakLabel").focus(); return; }
  if (settingsDraft.streakItems.length >= 40) { $("settingsError").textContent = "Es sind höchstens 40 Streaks möglich."; return; }
  if (settingsDraft.streakItems.some(item => item.label.toLocaleLowerCase("de") === label.toLocaleLowerCase("de"))) { $("settingsError").textContent = "Diesen Streak gibt es bereits."; return; }
  settingsDraft.streakItems.push({ key: newProductId("user").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 65), label: label.slice(0, 40), archived: false });
  $("newStreakLabel").value = ""; $("settingsError").textContent = ""; renderSettingsStreaks();
}
function collectSettingsDraft() {
  document.querySelectorAll("[data-role-id]").forEach(fieldset => {
    const role = settingsDraft.roles.find(item => item.name === fieldset.dataset.roleId);
    if (!role) return;
    fieldset.querySelectorAll("[data-role-field]").forEach(input => { role[input.dataset.roleField] = input.type === "checkbox" ? input.checked : input.value; });
  });
  document.querySelectorAll("[data-weekday]").forEach(select => { settingsDraft.weekRoles[Number(select.dataset.weekday)] = select.value; });
  settingsDraft.religion = $("settingsReligion").checked;
  settingsDraft.streaks = $("settingsStreaks").checked;
  settingsDraft.personalTemplate = $("settingsPersonal").checked;
  settingsDraft.vitality = $("settingsVitality").checked;
  settingsDraft.gratitude = $("settingsGratitude").checked;
  settingsDraft.fastingDays = Number($("settingsFastingDays").value);
}
function addActivityTemplate() {
  collectSettingsDraft();
  const title = $("templateTitle").value.trim();
  const weight = Number($("templateWeight").value);
  if (!title || title.length > 80 || !Number.isFinite(weight) || weight < .1 || weight > 10 || !$("templateRole").value) { $("settingsError").textContent = "Bitte Titel, aktive Rolle und 0,1 bis 10 Präsenzpunkte angeben."; return; }
  settingsDraft.activityTemplates.push({ key: newProductId("user"), title, label: title, role: $("templateRole").value, weight, archived: false });
  $("templateTitle").value = ""; $("settingsError").textContent = ""; renderSettingsTemplates();
}
function saveSettingsForm(event) {
  event.preventDefault();
  try {
    collectSettingsDraft();
    const next = validateProductSettings(settingsDraft);
    const activeBefore = productSettings.roles.filter(role => !role.archived).length;
    const activeAfter = next.roles.filter(role => !role.archived).length;
    if (activeAfter > activeBefore && !canUseActiveRoles(activeAfter)) return;
    if (dirtyReview && !saveReview(true)) return;
    RPStorage.transaction([{ key: PRODUCT_SETTINGS_KEY, value: JSON.stringify(next) }]);
    productSettings = next; applyProductSettings(); initOptions();
    currentData = null; setDate(selectedDate); renderAnalysis();
    $("settingsDialog").close(); showProductMessage("Rollen und Einstellungen gespeichert.");
  } catch (error) { $("settingsError").textContent = error.message; }
}
function deleteLocalData() {
  if (!confirm(`Alle ${BRAND_NAME}-Einträge, Routinen und Einstellungen auf diesem Gerät löschen? Eine gespeicherte Backup-Datei bleibt erhalten. Erstelle vorher eine Sicherung, wenn du die Daten behalten möchtest.`)) return;
  if (prompt(`Gib LÖSCHEN ein, um die lokalen ${BRAND_NAME}-Daten zu entfernen.`) !== "LÖSCHEN") return;
  try {
    const changes = [];
    for (let i = 0; i < RPStorage.length; i++) { const key = RPStorage.key(i); if (key?.startsWith("roleplay-v25-") || key === "roleplay-last-import-at") changes.push({ key, value: null }); }
    RPStorage.transaction(changes); currentData = null; dirtyReview = false; location.reload();
  } catch (error) { showStorageError(error); }
}
function saveFeedback() {
  const text = $("feedbackText").value.trim();
  if (!text) { $("feedbackText").focus(); return; }
  const report = `${BRAND_NAME} ${APP_VERSION}\nDatum: ${todayISO()}\n\nBeobachtung und gewünschtes Verhalten:\n${text}\n\nDieser Bericht enthält keine automatisch übernommenen Tagebuch- oder Gesundheitsdaten.`;
  downloadTextFile(`${BRAND_FILE_PREFIX}-feedback-${todayISO()}.txt`, report, "text/plain;charset=utf-8");
  showProductMessage("Rückmeldung als Datei angefordert. Du entscheidest, an wen du sie weitergibst.");
}
function offerAppUpdate(registration) {
  $("updateBanner").hidden = false;
  $("installUpdate").onclick = () => {
    if (document.querySelector("dialog[open]")) { showProductMessage("Schließe zuerst den geöffneten Dialog und speichere seine Änderungen.", true); return; }
    if (!saveReview(true)) return;
    navigator.serviceWorker.addEventListener("controllerchange", () => location.reload(), { once: true });
    registration.waiting?.postMessage({ type: "ACTIVATE_UPDATE" });
  };
}

function syncRoutineAvailability() {
  document.querySelectorAll("[data-review-open-routine]").forEach(button => {
    const card = button.closest("article");
    if (card) card.hidden = !routines?.[button.dataset.reviewOpenRoutine];
  });
}

/* Nach einem Import aus den Einstellungen den Entwurf neu aufbauen. */
function afterBackupImport() {
  if ($("settingsDialog").open) { settingsDraft = JSON.parse(JSON.stringify(productSettings)); renderSettings(); }
  showProductMessage("Sicherung übernommen. Deine Rollen und Einträge sind bereit.");
}
