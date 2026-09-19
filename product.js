/* Product configuration. Role names are stable IDs; labels can change without rewriting history. */
const PRODUCT_SETTINGS_KEY = "roleplay-v25-product-settings";
const BUILTIN_ROLES = ROLES.map(role => ({ ...role }));
const BUILTIN_ACTIVITIES = ACTIVITY_TEMPLATES.map(item => ({ ...item }));
let productSettings = null;
let settingsDraft = null;
let productMessageTimer;

function religionEnabled() { return productSettings ? productSettings.religion : true; }
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
  const labels = { "Ich-Person": "Ich", Vitalist: "Gesundheit", Absolvent: "Lernen", Unternehmer: "Beruf", Muslim: "Muslim", Wirt: "Zuhause", Familienmensch: "Beziehungen" };
  const roles = BUILTIN_ROLES.map(role => ({ ...role, label: personal ? (role.name === "Ich-Person" ? "Ich" : role.name) : labels[role.name], goal: "", archived: !personal && (role.name === "Muslim" || template === "empty") }));
  if (template === "empty") roles[0].archived = false;
  const active = roles.filter(role => !role.archived);
  const weekRoles = personal ? ["Familienmensch", "Ich-Person", "Vitalist", "Absolvent", "Unternehmer", "Muslim", "Wirt"]
    : Array.from({ length: 7 }, (_, i) => active[(i + active.length - 1) % active.length].name);
  return { version: 1, completed: legacy, personalTemplate: personal, religion: personal, streaks: personal,
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
  RPBackup.assert(Array.isArray(raw.activityTemplates || []) && (raw.activityTemplates || []).length <= 100, "Zu viele Aktivitätsvorlagen.");
  const templateIds = new Set();
  const activityTemplates = (raw.activityTemplates || []).map(item => {
    RPBackup.assert(RPBackup.object(item) && typeof item.key === "string" && /^user-[a-z0-9-]+$/.test(item.key) && !templateIds.has(item.key), "Eine Aktivitätsvorlage ist ungültig oder doppelt vorhanden."); templateIds.add(item.key);
    RPBackup.assert(typeof item.title === "string" && item.title.trim().length > 0 && item.title.length <= 80 && ids.has(item.role), "Eine Aktivitätsvorlage braucht einen Titel und eine vorhandene Rolle.");
    RPBackup.assert(typeof item.weight === "number" && Number.isFinite(item.weight) && item.weight >= .1 && item.weight <= 10, "Eine Aktivität kann zwischen 0,1 und 10 Präsenzpunkte zählen.");
    return { key: item.key, title: item.title.trim(), label: item.title.trim(), role: item.role, weight: item.weight, archived: Boolean(item.archived) };
  });
  return { version: 1, completed: raw.completed, personalTemplate: raw.personalTemplate, religion: raw.religion, streaks: raw.streaks,
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
  document.body?.classList.toggle("without-religion", !productSettings.religion);
  document.body?.classList.toggle("without-streaks", !productSettings.streaks);
}
function setSaveStatus(text) { const node = $("saveStatus"); if (node) node.textContent = text; }
function showProductMessage(text, error = false) {
  const node = $("productMessage");
  if (!node) { if (error) alert(text); return; }
  clearTimeout(productMessageTimer);
  node.textContent = text; node.hidden = false; node.classList.toggle("is-error", error);
  node.setAttribute("role", error ? "alert" : "status");
  if (!error) productMessageTimer = setTimeout(() => { node.hidden = true; }, 8000);
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
    downloadTextFile(`roleplay-notsicherung-${todayISO()}.json`, JSON.stringify(payload, null, 2), "application/json");
    showProductMessage("Notsicherung angefordert. Prüfe bitte, ob die Datei in deinen Downloads liegt. Sie enthält persönliche Rohdaten für die Wiederherstellung.");
  } catch (error) { alert(`Die Notsicherung konnte nicht erstellt werden: ${error.message}`); }
}
function finishProductInit() {
  if (!RPStorage.getItem(PRODUCT_SETTINGS_KEY) && productSettings.completed) RPStorage.setItem(PRODUCT_SETTINGS_KEY, JSON.stringify(productSettings));
  if (!productSettings.completed) $("onboardingDialog").showModal();
  const lastBackup = RPStorage.getItem(BACKUP_TIMESTAMP_KEY);
  if (!lastBackup || Date.now() - Date.parse(lastBackup) > 7 * 86400000) $("backupReminder").hidden = false;
}
function setupProductUI() {
  $("openSettings").addEventListener("click", () => openSettings("roles"));
  $("openHelp").addEventListener("click", () => openSettings("help"));
  $("settingsClose").addEventListener("click", () => $("settingsDialog").close());
  $("emergencyBackup").addEventListener("click", emergencyBackup);
  $("recoveryImport").addEventListener("click", () => $("recoveryFile").click());
  $("recoveryFile").addEventListener("change", async event => { const file = event.target.files?.[0]; if (file && await importBackup(file)) location.reload(); event.target.value = ""; });
  $("reloadApp").addEventListener("click", () => location.reload());
  $("backupReminderButton").addEventListener("click", () => { exportBackup(); });
  $("onboardingForm").addEventListener("submit", completeOnboarding);
  $("onboardingDialog").addEventListener("cancel", event => { if (!productSettings.completed) event.preventDefault(); });
  $("onboardingImport").addEventListener("click", () => $("onboardingFile").click());
  $("onboardingFile").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (file && await importBackup(file)) { $("onboardingDialog").close(); showProductMessage("Sicherung übernommen. Deine Rollen und Einträge sind bereit."); }
    event.target.value = "";
  });
  document.querySelectorAll('[name="startTemplate"]').forEach(radio => radio.addEventListener("change", () => {
    $("firstRoleField").hidden = radio.value !== "empty";
    $("firstRoleName").required = radio.value === "empty";
    $("setupReligion").checked = radio.value === "personal";
  }));
  $("settingsTabs").addEventListener("click", event => { const button = event.target.closest("[data-settings-tab]"); if (button) selectSettingsTab(button.dataset.settingsTab); });
  $("settingsForm").addEventListener("submit", saveSettingsForm);
  $("addRoleButton").addEventListener("click", () => {
    collectSettingsDraft();
    if (settingsDraft.roles.length >= 100) { showProductMessage("Es sind höchstens 100 Rollen möglich.", true); return; }
    const id = newProductId("role");
    settingsDraft.roles.push({ name: id, label: "Neue Rolle", emoji: "✨", color: "#4a69bd", text: "#15233f", goal: "", archived: false });
    renderSettingsRoles(); renderWeekRoles();
    document.querySelector(`[data-role-id="${id}"] input`)?.focus();
  });
  $("settingsRoleList").addEventListener("change", event => {
    if (event.target.matches('[data-role-field="archived"], [data-role-field="label"]')) { collectSettingsDraft(); renderWeekRoles(); }
  });
  $("addTemplateButton").addEventListener("click", addActivityTemplate);
  $("settingsTemplateList").addEventListener("click", event => {
    const button = event.target.closest("[data-archive-template]"); if (!button) return;
    const template = settingsDraft.activityTemplates.find(item => item.key === button.dataset.archiveTemplate);
    if (template) { template.archived = !template.archived; renderSettingsTemplates(); }
  });
  $("settingsExport").addEventListener("click", exportBackup);
  $("settingsImport").addEventListener("click", () => $("settingsImportFile").click());
  $("settingsImportFile").addEventListener("change", async event => {
    const file = event.target.files?.[0];
    if (file && await importBackup(file)) { settingsDraft = JSON.parse(JSON.stringify(productSettings)); renderSettings(); }
    event.target.value = "";
  });
  $("deleteLocalData").addEventListener("click", deleteLocalData);
  $("saveFeedback").addEventListener("click", saveFeedback);
  globalThis.addEventListener?.("error", event => { if (event.error) showStorageError(event.error); });
  globalThis.addEventListener?.("unhandledrejection", event => { if (event.reason) showStorageError(event.reason); });
  globalThis.addEventListener?.("offline", () => setSaveStatus("Offline · lokal gespeichert"));
  globalThis.addEventListener?.("online", () => setSaveStatus("Lokal gespeichert"));
}
function newProductId(prefix) { return `${prefix}-${globalThis.crypto?.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2, 8)}`; }
function completeOnboarding(event) {
  event.preventDefault();
  try {
    const selected = document.querySelector('[name="startTemplate"]:checked').value;
    const next = makeProductSettings(selected);
    next.completed = true; next.religion = $("setupReligion").checked;
    if (selected === "empty") {
      next.roles[0].label = $("firstRoleName").value.trim();
      next.roles[0].goal = $("firstRoleGoal").value.trim();
    }
    const checked = validateProductSettings(next);
    const initialRoutines = selected === "personal" ? normalizeRoutines(null) : selected === "empty" ? {} : neutralRoutines();
    RPStorage.transaction([{ key: PRODUCT_SETTINGS_KEY, value: JSON.stringify(checked) }, { key: ROUTINES_STORAGE_KEY, value: JSON.stringify(initialRoutines) }]);
    productSettings = checked; applyProductSettings(); routines = loadRoutines(); initOptions();
    currentData = null; setDate(todayISO()); $("onboardingDialog").close();
    showProductMessage("Deine Rollen sind bereit. Beginne mit einer kurzen Zustandsaufnahme.");
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
  renderSettingsRoles(); renderWeekRoles(); renderSettingsTemplates();
  $("settingsReligion").checked = settingsDraft.religion;
  $("settingsStreaks").checked = settingsDraft.streaks;
  $("settingsPersonal").checked = settingsDraft.personalTemplate;
  $("settingsFastingDays").value = settingsDraft.fastingDays;
  $("settingsError").textContent = "";
  $("settingsVersion").textContent = `ROLEPLAY ${APP_VERSION}`;
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
    if (dirtyReview && !saveReview(true)) return;
    RPStorage.transaction([{ key: PRODUCT_SETTINGS_KEY, value: JSON.stringify(next) }]);
    productSettings = next; applyProductSettings(); initOptions();
    currentData = null; setDate(selectedDate); renderAnalysis();
    $("settingsDialog").close(); showProductMessage("Rollen und Einstellungen gespeichert.");
  } catch (error) { $("settingsError").textContent = error.message; }
}
function deleteLocalData() {
  if (!confirm("Alle ROLEPLAY-Einträge, Routinen und Einstellungen auf diesem Gerät löschen? Eine gespeicherte Backup-Datei bleibt erhalten. Erstelle vorher eine Sicherung, wenn du die Daten behalten möchtest.")) return;
  if (prompt("Gib LÖSCHEN ein, um die lokalen ROLEPLAY-Daten zu entfernen.") !== "LÖSCHEN") return;
  try {
    const changes = [];
    for (let i = 0; i < RPStorage.length; i++) { const key = RPStorage.key(i); if (key?.startsWith("roleplay-v25-") || key === "roleplay-last-import-at") changes.push({ key, value: null }); }
    RPStorage.transaction(changes); currentData = null; dirtyReview = false; location.reload();
  } catch (error) { showStorageError(error); }
}
function saveFeedback() {
  const text = $("feedbackText").value.trim();
  if (!text) { $("feedbackText").focus(); return; }
  const report = `ROLEPLAY ${APP_VERSION}\nDatum: ${todayISO()}\n\nBeobachtung und gewünschtes Verhalten:\n${text}\n\nDieser Bericht enthält keine automatisch übernommenen Tagebuch- oder Gesundheitsdaten.`;
  downloadTextFile(`roleplay-feedback-${todayISO()}.txt`, report, "text/plain;charset=utf-8");
  showProductMessage("Fehlerbericht angefordert. Du kannst die Datei an die Person weitergeben, von der du die Testversion erhalten hast.");
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
