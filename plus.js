/* ==========================================================================
   ENSEMBLE Plus – Freischaltung ohne Server und ohne Konto.

   Zustände: founder (Bestandsnutzer), license (signierter Schlüssel),
   trial (14 Tage), free. Lizenzschlüssel sind mit ECDSA P-256 signiert und
   werden vollständig auf dem Gerät geprüft. Das ist ein Vertrauensmodell für
   ehrliche Kundschaft: Eine lokale App lässt sich grundsätzlich umgehen.

   Grundsatz: Plus schaltet Funktionen frei, sperrt aber nie Daten. Einträge,
   Sicherung und Import bleiben immer kostenlos.
   ========================================================================== */
const PLUS_STORAGE_KEY = `${STORAGE_NAMESPACE}-plus`;
const PLUS_CONFIG = {
  trialDays: 14,
  freeRoleLimit: 5,
  freeRoutineLimit: 2,
  // Preise sind Platzhalter und werden nur angezeigt.
  plans: [
    { key: "year", label: "Jährlich", price: "24,99 €", note: "ca. 2,08 € im Monat" },
    { key: "lifetime", label: "Einmalig", price: "59 €", note: "dauerhaft für Version 8" }
  ],
  // Kauflink (z. B. Lemon Squeezy, Digistore24, Stripe Payment Link). Leer = Kauf noch nicht geöffnet.
  checkoutUrl: "",
  // Öffentlicher Prüfschlüssel. Der private Schlüssel liegt ausschließlich beim Herausgeber.
  publicKeyJwk: { kty: "EC", crv: "P-256", x: "vhIuikf_c41m_mI1nelPdvDEnMFLJ_n7Cl9486d0aCw", y: "alAaHhSuLXx1terqLsmZLY_Hze8pESP2Ykv5_G0NoSw" }
};
const PLUS_FEATURES = {
  roles: `Mehr als ${PLUS_CONFIG.freeRoleLimit} aktive Rollen sind Teil von Plus.`,
  routines: `Mehr als ${PLUS_CONFIG.freeRoutineLimit} Routinen sind Teil von Plus.`,
  routineFiles: "Routine-Dateien laden und speichern ist Teil von Plus.",
  monthAnalysis: "Die Monatsauswertung ist Teil von Plus.",
  roleFocus: "Der Rollenfokus ist Teil von Plus.",
  csvExport: "Der Excel-Export ist Teil von Plus. Deine vollständige Sicherung bleibt kostenlos.",
  help: "",
  menu: ""
};
let plusState = { founder: false, trialStartedAt: null, license: null };
let plusLicense = null; // geprüfte Nutzdaten des Schlüssels

function isNativeApp() { return Boolean(globalThis.Capacitor?.isNativePlatform?.()); }

function readPlusRecord() {
  const raw = safeParse(RPStorage.getItem(PLUS_STORAGE_KEY), null);
  if (!RPBackup.object(raw)) return null;
  return {
    founder: raw.founder === true,
    trialStartedAt: typeof raw.trialStartedAt === "string" && Number.isFinite(Date.parse(raw.trialStartedAt)) ? raw.trialStartedAt : null,
    license: typeof raw.license === "string" && raw.license.length <= 2000 ? raw.license : null
  };
}

/* Beim allerersten Start dieser Version: Wer bereits Daten hat, gehört zu den
   ersten Nutzern und erhält Plus dauerhaft („Gründer“). Muss vor jeder
   anderen Schreiboperation laufen. */
function initPlus() {
  const record = readPlusRecord();
  if (record) { plusState = record; }
  else {
    const existing = Boolean(RPStorage.getItem(PRODUCT_SETTINGS_KEY)) || hasLegacyData();
    plusState = { founder: existing, trialStartedAt: null, license: null };
    RPStorage.setItem(PLUS_STORAGE_KEY, JSON.stringify(plusState));
  }
  plusLicense = decodeLicensePayload(plusState.license);
  if (plusState.license) verifyLicense(plusState.license).then(payload => { plusLicense = payload; refreshPlusUI(); })
    .catch(() => { plusLicense = null; refreshPlusUI(); });
  setupPlusUI();
}
function reloadPlusState() {
  const record = readPlusRecord();
  if (record) plusState = record;
  plusLicense = decodeLicensePayload(plusState.license);
  if (plusState.license) verifyLicense(plusState.license).then(payload => { plusLicense = payload; refreshPlusUI(); }).catch(() => { plusLicense = null; refreshPlusUI(); });
  refreshPlusUI();
}
function savePlusState() { RPStorage.setItem(PLUS_STORAGE_KEY, JSON.stringify(plusState)); }

function trialDaysLeft(now = Date.now()) {
  if (!plusState.trialStartedAt) return 0;
  const end = Date.parse(plusState.trialStartedAt) + PLUS_CONFIG.trialDays * 86400000;
  return Math.max(0, Math.ceil((end - now) / 86400000));
}
function licenseActive(now = new Date()) {
  if (!plusLicense) return false;
  return !plusLicense.e || plusLicense.e >= dateToISO(now);
}
function plusAccess() {
  if (plusState.founder) return { active: true, kind: "founder" };
  if (licenseActive()) return { active: true, kind: "license" };
  const days = trialDaysLeft();
  if (days > 0) return { active: true, kind: "trial", daysLeft: days };
  return { active: false, kind: plusState.trialStartedAt ? "expired" : "free" };
}
function hasPlus() { return plusAccess().active; }
function plusStatusLabel() {
  const access = plusAccess();
  return { founder: "Plus · Gründer", license: "Plus", trial: `Plus-Test · noch ${access.daysLeft} ${access.daysLeft === 1 ? "Tag" : "Tage"}`, expired: "Kostenlose Version", free: "Kostenlose Version" }[access.kind];
}

/* Zentrale Schranke für alle Plus-Funktionen. */
function requirePlus(feature) {
  if (hasPlus()) return true;
  openPlusDialog(feature);
  return false;
}
function canUseActiveRoles(count) { return count <= PLUS_CONFIG.freeRoleLimit || requirePlus("roles"); }
function canAddRoutine() { return Object.keys(routines || {}).length < PLUS_CONFIG.freeRoutineLimit || requirePlus("routines"); }

function plusTrialChange() {
  if (plusState.trialStartedAt) return null;
  const next = { ...plusState, trialStartedAt: new Date().toISOString() };
  return { key: PLUS_STORAGE_KEY, value: JSON.stringify(next) };
}
function startPlusTrial() {
  const change = plusTrialChange();
  if (!change) return;
  RPStorage.transaction([change]);
  reloadPlusState();
  showProductMessage(`Plus ist jetzt ${PLUS_CONFIG.trialDays} Tage freigeschaltet. Der Test endet automatisch.`);
  renderPlusDialog();
  if (typeof renderAnalysis === "function") renderAnalysis();
}

/* Sicherungen tragen Gründerstatus und Lizenz mit, damit ein Gerätewechsel
   nichts kostet. Der Testzeitraum wird bewusst nicht übertragen. */
function plusBackupData() { return { founder: plusState.founder, license: plusState.license }; }
function plusImportChange(payload) {
  const incoming = payload?.settings?.plus;
  if (!RPBackup.object(incoming)) return null;
  const next = { ...plusState };
  if (incoming.founder === true) next.founder = true;
  if (!next.license && typeof incoming.license === "string" && incoming.license.length <= 2000) next.license = incoming.license;
  if (next.founder === plusState.founder && next.license === plusState.license) return null;
  return { key: PLUS_STORAGE_KEY, value: JSON.stringify(next) };
}

/* --------------------------------------------------------------------------
   Lizenzschlüssel: ENS1-<base64url(JSON)>.<base64url(Signatur)>
   Signiert wird die base64url-Zeichenkette der Nutzdaten (wie bei JWS).
   -------------------------------------------------------------------------- */
function base64UrlToBytes(text) {
  const normal = text.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normal + "=".repeat((4 - normal.length % 4) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}
function splitLicense(key) {
  const clean = String(key || "").replace(/\s+/g, "");
  const match = /^ENS1-([A-Za-z0-9_-]+)\.([A-Za-z0-9_-]+)$/.exec(clean);
  if (!match) throw new Error("Das ist kein gültiger ENSEMBLE-Lizenzschlüssel. Er beginnt mit „ENS1-“.");
  return { clean, body: match[1], signature: match[2] };
}
function decodeLicensePayload(key) {
  if (!key) return null;
  try {
    const { body } = splitLicense(key);
    const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(body)));
    return validLicensePayload(payload) ? payload : null;
  } catch { return null; }
}
function validLicensePayload(payload) {
  return RPBackup.object(payload) && payload.v === 1 && payload.p === "plus" && typeof payload.id === "string"
    && (payload.e == null || RPBackup.date(payload.e)) && (payload.i == null || RPBackup.date(payload.i));
}
async function verifyLicense(key) {
  const { body, signature } = splitLicense(key);
  if (!globalThis.crypto?.subtle) throw new Error("Dieser Browser kann den Schlüssel nicht prüfen. Öffne ENSEMBLE über https.");
  const publicKey = await crypto.subtle.importKey("jwk", PLUS_CONFIG.publicKeyJwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, publicKey, base64UrlToBytes(signature), new TextEncoder().encode(body));
  if (!ok) throw new Error("Der Lizenzschlüssel ist nicht gültig. Prüfe, ob er vollständig kopiert wurde.");
  const payload = JSON.parse(new TextDecoder().decode(base64UrlToBytes(body)));
  if (!validLicensePayload(payload)) throw new Error("Der Lizenzschlüssel hat ein unbekanntes Format.");
  return payload;
}
async function activateLicenseFromInput() {
  const message = $("licenseMessage");
  try {
    const key = $("licenseInput").value;
    const payload = await verifyLicense(key);
    if (payload.e && payload.e < todayISO()) throw new Error(`Diese Lizenz ist am ${formatShortDate(payload.e)} abgelaufen.`);
    plusState = { ...plusState, license: splitLicense(key).clean };
    savePlusState(); plusLicense = payload;
    message.textContent = ""; $("licenseInput").value = "";
    refreshPlusUI(); renderPlusDialog();
    if (typeof renderAnalysis === "function") renderAnalysis();
    showProductMessage("Danke! ENSEMBLE Plus ist freigeschaltet.");
  } catch (error) { message.textContent = error.message; message.classList.add("is-error"); }
}

/* --------------------------------------------------------------------------
   Oberfläche
   -------------------------------------------------------------------------- */
let plusUIReady = false;
function setupPlusUI() {
  if (plusUIReady || !$("plusDialog")) return;
  plusUIReady = true;
  $("openPlus").addEventListener("click", () => openPlusDialog("menu"));
  $("plusClose").addEventListener("click", () => $("plusDialog").close());
  $("startTrial").addEventListener("click", startPlusTrial);
  $("buyPlus").addEventListener("click", () => {
    if (PLUS_CONFIG.checkoutUrl && !isNativeApp()) { window.open(PLUS_CONFIG.checkoutUrl, "_blank", "noopener"); $("licenseDetails").open = true; return; }
    $("licenseDetails").open = true;
    $("licenseMessage").classList.remove("is-error");
    $("licenseMessage").textContent = "Der Kauf wird in Kürze geöffnet. Wenn du bereits einen Lizenzschlüssel hast, füge ihn hier ein.";
    $("licenseInput").focus();
  });
  $("activateLicense").addEventListener("click", activateLicenseFromInput);
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-open-plus]");
    if (trigger) { event.preventDefault(); openPlusDialog(trigger.dataset.openPlus); }
  });
  refreshPlusUI();
}
function openPlusDialog(feature = "menu") {
  const dialog = $("plusDialog");
  if (!dialog) return;
  dialog.dataset.feature = feature;
  renderPlusDialog();
  if (!dialog.open) dialog.showModal();
}
function renderPlusDialog() {
  const access = plusAccess();
  const reason = PLUS_FEATURES[$("plusDialog").dataset.feature] || "";
  $("plusReason").hidden = !reason || access.active;
  $("plusReason").textContent = reason;
  const statusText = {
    founder: "<strong>Plus ist dauerhaft aktiv.</strong> Danke, dass du ENSEMBLE von Anfang an begleitest.",
    license: `<strong>Plus ist aktiv.</strong> ${plusLicense?.e ? `Gültig bis ${escapeHTML(formatShortDate(plusLicense.e))}.` : "Dauerhaft freigeschaltet."}`,
    trial: `<strong>Du testest Plus.</strong> Noch ${access.daysLeft} ${access.daysLeft === 1 ? "Tag" : "Tage"}. Danach wechselt ENSEMBLE automatisch in die kostenlose Version – ohne Kosten.`,
    expired: "<strong>Dein Test ist beendet.</strong> Alles, was du angelegt hast, bleibt erhalten.",
    free: "Mehr Tiefe für dein System: alle Rollen, eigene Routinen und die Monatsauswertung."
  }[access.kind];
  $("plusStatus").innerHTML = `<p>${statusText}</p>`;
  $("plusStatus").classList.toggle("is-active", access.active);
  const purchasable = !["founder", "license"].includes(access.kind);
  $("plusPlans").hidden = !purchasable;
  $("plusPlans").innerHTML = PLUS_CONFIG.plans.map(plan => `<div class="plus-plan"><span>${escapeHTML(plan.label)}</span><strong>${escapeHTML(plan.price)}</strong><small>${escapeHTML(plan.note)}</small></div>`).join("");
  $("startTrial").hidden = Boolean(plusState.trialStartedAt) || !purchasable;
  $("buyPlus").hidden = !purchasable || isNativeApp();
  $("buyPlus").classList.toggle("secondary-button", !plusState.trialStartedAt);
  $("buyPlus").classList.toggle("primary-button", Boolean(plusState.trialStartedAt));
  $("licenseDetails").hidden = !purchasable || isNativeApp();
}
function refreshPlusUI() {
  const chip = $("openPlus");
  if (!chip) return;
  const access = plusAccess();
  chip.classList.toggle("is-active", access.active);
  chip.textContent = access.kind === "trial" ? `Plus ${access.daysLeft} T.` : "Plus";
  chip.setAttribute("aria-label", plusStatusLabel());
  document.body.classList.toggle("has-plus", access.active);
  if ($("plusDialog")?.open) renderPlusDialog();
}
