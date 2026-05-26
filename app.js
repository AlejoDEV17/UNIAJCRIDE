const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const state = {
  role: "passenger",
  selectedDestination: null,
  activeRoute: null,
  roadRoute: null,
  pickupRoute: null,
  activeDriverIndex: 0,
  activeDriverLabel: "AM",
  assignedDriver: null,
  routeProgress: 0,
  phase: "idle",
  verificationCode: "",
  verificationSent: false,
  verificationChallenge: "",
  verificationExpiresAt: 0,
  modalOpen: false,
  driverRoutePublished: false,
  driverRoute: null,
  driverDestination: null,
  driverRouteMode: "north",
  driverRouteCompleted: false,
  driverRouteProgress: 0,
  driverPickedCount: 0,
  driverPausedUntil: 0,
  driverStopMessage: "",
  driverStopIndex: 0,
  lastTripSummary: null,
  carpool: {
    passengerSlot: 2,
    capacity: 4,
    occupancy: 2,
    riders: [],
    pickups: [],
    futureStops: [],
    stopIndex: 0,
    stopMessage: "",
  },
  acceptedPassenger: null,
  driverAcceptedStudents: [],
  locationReady: false,
  user: {
    name: "Estudiante UNIAJC",
    program: "Ingeniería de Sistemas",
    semester: "Semestre 6",
    email: "",
    avatar: "",
    payment: "Nequi",
    home: "Cra 2A #57-103",
    campus: "Campus Norte UNIAJC",
  },
  driver: {
    name: "Daniel Rivas",
    program: "Tecnología en Gestión Empresarial",
    vehicle: "Renault Kwid E-Tech",
    plate: "KWD-284",
    license: "Licencia B1 activa",
    soat: "Vigente hasta 2027",
    techReview: "Tecnomecanica al dia",
    avatar: "",
  },
  sosContacts: ["Mamá", "Bienestar UNIAJC"],
};

const drivers = [
  {
    name: "Ana María Ruiz",
    program: "Ingeniería de Sistemas",
    vehicle: "Chevrolet Onix",
    plate: "KJU-218",
    license: "Licencia B1 activa",
    soat: "SOAT vigente",
    techReview: "Tecnomecanica al dia",
    status: "Disponible",
    eta: "4 min",
    rating: "4.98",
    trips: "118 viajes",
    route: "UNIAJC Norte → San Fernando",
    markerIndex: 0,
    markerLabel: "AM",
    avatar: avatarSvg("#ff70df", "#52f4ff", "AM"),
    path: [[0.13, 0.2], [0.25, 0.25], [0.37, 0.33], [0.55, 0.38], [0.71, 0.47], [0.86, 0.62]],
    offset: 0.05,
    speed: 0.0045,
  },
  {
    name: "Miguel Cárdenas",
    program: "Ingeniería de Sistemas",
    vehicle: "Mazda 2 Hybrid",
    plate: "MZD-516",
    license: "Licencia B1 activa",
    soat: "SOAT vigente",
    techReview: "Tecnomecanica al dia",
    status: "Disponible",
    eta: "5 min",
    rating: "4.91",
    trips: "94 viajes",
    route: "UNIAJC Sur → Centro",
    markerIndex: 1,
    markerLabel: "MC",
    avatar: avatarSvg("#52f4ff", "#2878ff", "MC"),
    path: [[0.75, 0.12], [0.65, 0.25], [0.56, 0.39], [0.48, 0.52], [0.42, 0.68], [0.36, 0.84]],
    offset: 0.42,
    speed: 0.0038,
  },
  {
    name: "Laura Vélez",
    program: "Ingeniería de Sistemas",
    vehicle: "Kia Picanto",
    plate: "KPC-183",
    license: "Licencia B1 activa",
    soat: "SOAT vigente",
    techReview: "Tecnomecanica al dia",
    status: "Disponible",
    eta: "3 min",
    rating: "4.96",
    trips: "76 viajes",
    route: "Granada → Campus",
    markerIndex: 2,
    markerLabel: "LV",
    avatar: avatarSvg("#c650ff", "#52f4ff", "LV"),
    path: [[0.1, 0.77], [0.23, 0.67], [0.35, 0.58], [0.51, 0.52], [0.67, 0.48], [0.88, 0.43]],
    offset: 0.72,
    speed: 0.0042,
  },
  {
    name: "Daniel Rivas",
    program: "Tecnología en Gestión Empresarial",
    vehicle: "Renault Kwid E-Tech",
    plate: "KWD-284",
    license: "Licencia B1 activa",
    soat: "SOAT vigente",
    techReview: "Tecnomecanica al dia",
    status: "Disponible",
    eta: "6 min",
    rating: "4.88",
    trips: "63 viajes",
    route: "La Flora → UNIAJC",
    markerIndex: 3,
    markerLabel: "DR",
    avatar: avatarSvg("#45ff9a", "#2878ff", "DR"),
    path: [[0.18, 0.3], [0.3, 0.38], [0.45, 0.47], [0.58, 0.6], [0.73, 0.66]],
    offset: 0.25,
    speed: 0.0035,
  },
  {
    name: "Juan Pablo Ortiz",
    program: "Ingeniería de Sistemas",
    vehicle: "Nissan March",
    plate: "JPO-512",
    license: "Licencia B1 activa",
    soat: "SOAT vigente",
    techReview: "Tecnomecanica al dia",
    status: "Disponible",
    eta: "4 min",
    rating: "4.93",
    trips: "101 viajes",
    route: "Centenario → Campus",
    markerIndex: 4,
    markerLabel: "JP",
    avatar: avatarSvg("#52f4ff", "#c650ff", "JP"),
    path: [[0.2, 0.7], [0.33, 0.61], [0.48, 0.52], [0.61, 0.45], [0.82, 0.4]],
    offset: 0.61,
    speed: 0.0037,
  },
];

const destinations = [
  {
    name: "Cra 2A #57-103",
    zone: "Ruta norte - La Flora",
    coords: [3.4868, -76.5124],
    eta: "16 min",
    price: "$5.900",
    aliases: ["cra 2 a 57-103", "carrera 2a 57 103", "cra 2a #57 103", "cra2a57103"],
    point: [0.25, 0.25],
    route: [[0.48, 0.68], [0.42, 0.61], [0.39, 0.5], [0.37, 0.33], [0.25, 0.25]],
  },
  {
    name: "Calle 5 #38-25",
    zone: "Ruta sur - Tequendama",
    coords: [3.4278, -76.5472],
    eta: "14 min",
    price: "$4.900",
    aliases: ["calle 5 38-25", "cl 5 38 25", "c 5 #38-25"],
    point: [0.74, 0.73],
    route: [[0.48, 0.68], [0.57, 0.63], [0.66, 0.66], [0.74, 0.73]],
  },
  {
    name: "San Fernando",
    zone: "Cerca a estadio y salud",
    coords: [3.4357, -76.5462],
    eta: "12 min",
    price: "$4.500",
    point: [0.62, 0.55],
    route: [[0.48, 0.68], [0.51, 0.6], [0.56, 0.56], [0.62, 0.55]],
  },
  {
    name: "Chipichape",
    zone: "Ruta norte - centro comercial",
    coords: [3.4769, -76.5284],
    eta: "15 min",
    price: "$5.800",
    point: [0.68, 0.22],
    route: [[0.48, 0.68], [0.42, 0.61], [0.48, 0.52], [0.56, 0.39], [0.65, 0.25], [0.68, 0.22]],
  },
  {
    name: "Campus Norte UNIAJC",
    zone: "Av. 6N #28N-102",
    coords: [3.45165, -76.532],
    eta: "0 min",
    price: "$0",
    point: [0.48, 0.68],
    route: [[0.48, 0.68], [0.48, 0.68]],
  },
  {
    name: "Campus Sur Pance",
    zone: "Calle 25 #127-220",
    coords: [3.3696, -76.5271],
    eta: "24 min",
    price: "$7.200",
    point: [0.84, 0.86],
    route: [[0.48, 0.68], [0.57, 0.63], [0.66, 0.66], [0.76, 0.75], [0.84, 0.86]],
  },
];

const driverRequests = [
  { name: "Valentina", route: "Campus Norte -> San Fernando", eta: "2 min" },
  { name: "Santiago", route: "Sameco -> Chipichape", eta: "6 min" },
  { name: "Isabella", route: "Campus Norte -> Calle 5", eta: "4 min" },
];

const driverPickupStudents = [
  { name: "Ana Maria Ruiz", initials: "AM", program: "Ingenieria de Sistemas", semester: "Semestre 5", email: "ana.ruiz@estudiante.uniajc.edu.co", phone: "+57 300 214 8841", address: "La Flora", destination: "Campus Norte UNIAJC", rating: "4.96", trips: "22 viajes", coords: [3.4767, -76.5249], progress: 0.18 },
  { name: "Miguel Cardenas", initials: "MC", program: "Ingenieria de Sistemas", semester: "Semestre 7", email: "miguel.cardenas@estudiante.uniajc.edu.co", phone: "+57 310 552 9408", address: "Granada", destination: "Campus Norte UNIAJC", rating: "4.91", trips: "18 viajes", coords: [3.4595, -76.5282], progress: 0.36 },
  { name: "Laura Velez", initials: "LV", program: "Ingenieria de Sistemas", semester: "Semestre 6", email: "laura.velez@estudiante.uniajc.edu.co", phone: "+57 315 711 6024", address: "Juanambu", destination: "Campus Norte UNIAJC", rating: "4.98", trips: "31 viajes", coords: [3.4617, -76.5369], progress: 0.54 },
  { name: "Juan Pablo Ortiz", initials: "JP", program: "Ingenieria de Sistemas", semester: "Semestre 4", email: "juan.ortiz@estudiante.uniajc.edu.co", phone: "+57 301 449 1270", address: "Centenario", destination: "Campus Norte UNIAJC", rating: "4.89", trips: "14 viajes", coords: [3.4537, -76.5398], progress: 0.72 },
];

const passengerPool = [
  { initials: "AM", label: "Ana San Fernando", coords: [3.4357, -76.5462] },
  { initials: "MC", label: "Miguel Centro", coords: [3.4519, -76.5356] },
  { initials: "LV", label: "Laura Granada", coords: [3.4595, -76.5282] },
  { initials: "JP", label: "Juan P. Flora", coords: [3.4537, -76.5398] },
  { initials: "SV", label: "Sofi Versalles", coords: [3.4635, -76.5334] },
  { initials: "DR", label: "Daniel Norte", coords: [3.4868, -76.5124] },
];

const canvas = $("#cityMap");
const ctx = canvas.getContext("2d");
let lastFrame = performance.now();
let phaseCompleted = false;
let rideMap;
let rideMapLayers = {};
let rideMapFitKey = "";
let rideMapUserAdjusted = false;
let leafletDriverProgress = 0;
const campusCoords = [3.45165, -76.532];
let userCoords = [...campusCoords];
let geoWatchId = null;
let tripAnimationFrame = null;
let tripAnimationStartedAt = 0;
let tripAnimationDuration = 9000;
let tripPausedUntil = 0;
let tripPausedTotal = 0;
let tripPauseStartedAt = 0;
const driverMapMarkers = [
  { label: "AM", coords: [3.447, -76.539], end: [3.459, -76.526], type: "driver", progress: 0.15, speed: 0.0014, route: null },
  { label: "MC", coords: [3.459, -76.526], end: [3.452, -76.542], type: "driver", progress: 0.58, speed: 0.0011, route: null },
  { label: "LV", coords: [3.465, -76.531], end: [3.441, -76.524], type: "driver", progress: 0.34, speed: 0.0012, route: null },
  { label: "DR", coords: [3.438, -76.548], end: [3.456, -76.535], type: "driver", progress: 0.76, speed: 0.001, route: null },
  { label: "JP", coords: [3.475, -76.522], end: [3.45165, -76.532], type: "driver", progress: 0.48, speed: 0.0013, route: null },
];
let searchDebounce;
let remoteSearchToken = 0;

function avatarSvg(from, to, initials) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="120" height="120" rx="34" fill="#07101c"/><circle cx="60" cy="45" r="25" fill="url(#g)" opacity=".95"/><path d="M24 108c5-26 24-39 36-39s31 13 36 39" fill="url(#g)" opacity=".75"/><text x="60" y="67" text-anchor="middle" font-family="Arial" font-size="24" font-weight="900" fill="#fff">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function init() {
  state.user.avatar = avatarSvg("#52f4ff", "#2878ff", "UR");
  state.driver.avatar = avatarSvg("#45ff9a", "#2878ff", "DR");
  bindEvents();
  resizeCanvas();
  initDriverRoadRoutes();
  renderAll();
  requestAnimationFrame(drawFrame);
}

function bindEvents() {
  window.addEventListener("resize", resizeCanvas);
  configureAuthMode();

  $$(".segment").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".segment").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.role = button.dataset.roleChoice;
      resetRuntimeForRole(state.role);
    });
  });

  $("#loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!state.verificationSent) {
      toast("Primero solicita el código de verificación");
      return;
    }
    const enteredCode = $("#codeInput").value.trim();
    if (!/^\d{4,6}$/.test(enteredCode)) {
      $("#loginStatus").textContent = "Ingresa un código válido de 4 a 6 dígitos.";
      $("#codeInput").focus();
      return;
    }
    if (window.UNIAJC_RIDE_VERIFY_ENDPOINT) {
      $("#loginSubmitBtn").disabled = true;
      $("#loginSubmitBtn").textContent = "Verificando...";
      const verified = await verifyInstitutionalCode(state.user.email, enteredCode);
      $("#loginSubmitBtn").disabled = false;
      $("#loginSubmitBtn").textContent = "Verificar e ingresar";
      if (!verified) {
        $("#loginStatus").textContent = "El código no coincide. Revisa tu correo o solicita uno nuevo.";
        $("#codeInput").focus();
        return;
      }
    } else if (enteredCode !== state.verificationCode || Date.now() > state.verificationExpiresAt) {
      $("#loginStatus").textContent = "El código no coincide o ya expiró. Solicita uno nuevo.";
      $("#codeInput").focus();
      return;
    }
    enterAppFromLogin($("#emailInput").value.trim());
  });

  $("#sendCodeBtn").addEventListener("click", handleSendCode);

  $("#openSearchBtn").addEventListener("click", () => {
    if (state.role === "driver") {
      openDriverRouteModal();
      return;
    }
    openSearchModal();
  });
  $("#settingsBtn").addEventListener("click", openSettingsModal);
  $("#profileSettingsBtn").addEventListener("click", openSettingsModal);
  $("#sosBtn").addEventListener("click", openSecurityModal);
  $("#driverInfoBtn").addEventListener("click", openAssignedDriverProfile);
  $("#profileBtn").addEventListener("click", () => showScreen("profile"));
  $("#mainActionBtn").addEventListener("click", handleMainAction);
  $("#locateMeBtn").addEventListener("click", () => requestCurrentLocation({ silent: false }));

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.dataset.view;
      if (view === "settings") {
        openSettingsModal();
        return;
      }
      if (view === "security") {
        openSecurityModal();
        return;
      }
      showScreen(view);
    });
  });

  $$(".back-btn").forEach((button) => {
    button.addEventListener("click", () => showScreen(button.dataset.back));
  });

  $("#modalLayer").addEventListener("click", (event) => {
    if (event.target.id === "modalLayer") closeModal();
  });

  $$(".mini-action").forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.dataset.destination) {
        toast(button.textContent.trim());
        return;
      }
      selectDestination(destinations.find((item) => item.name === button.dataset.destination) || destinations[0]);
    });
  });
}

function showScreen(view) {
  const map = {
    app: "appScreen",
    home: "appScreen",
    profile: "profileScreen",
  };
  $$(".screen").forEach((screen) => screen.classList.remove("active"));
  $(`#${map[view]}`).classList.add("active");
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view || (view === "app" && tab.dataset.view === "home")));
  renderAll();
  if (view === "app" || view === "home") {
    requestAnimationFrame(() => {
      resizeCanvas();
      ensureRideMapReady();
    });
  }
}

function isDevAuthMode() {
  return window.UNIAJC_RIDE_AUTH_MODE === "dev";
}

function configureAuthMode() {
  if (!isDevAuthMode()) return;
  $("#sendCodeBtn").textContent = "Ingresar";
  $("#roleBlock").classList.remove("hidden");
  $("#codeField").classList.add("hidden");
  $("#loginSubmitBtn").classList.add("hidden");
  $("#loginStatus").textContent = "Modo pruebas activo. No se enviarán correos.";
}

function enterAppFromLogin(email) {
  syncUserFromEmail(email);
  resetRuntimeForRole(state.role);
  $("#loginStatus").textContent = isDevAuthMode() ? "Acceso de pruebas aprobado." : "Correo institucional verificado.";
  showScreen("app");
  renderAll();
  startLocationTracking({ silent: true });
  toast(isDevAuthMode() ? "Modo pruebas activo" : "Verificacion UNIAJC aprobada");
}

function resetRuntimeForRole(role) {
  cancelTripAnimation();
  state.phase = "idle";
  state.selectedDestination = null;
  state.activeRoute = null;
  state.roadRoute = null;
  state.pickupRoute = null;
  state.activeDriverIndex = 0;
  state.activeDriverLabel = "AM";
  state.assignedDriver = null;
  state.routeProgress = 0;
  state.lastTripSummary = null;
  state.driverRoutePublished = false;
  state.driverRoute = null;
  state.driverDestination = null;
  state.driverRouteMode = "north";
  state.driverRouteCompleted = false;
  state.driverRouteProgress = 0;
  state.driverPickedCount = 0;
  state.driverPausedUntil = 0;
  state.driverStopMessage = "";
  state.driverStopIndex = 0;
  state.acceptedPassenger = null;
  state.driverAcceptedStudents = [];
  state.carpool = {
    passengerSlot: 2,
    capacity: 4,
    occupancy: 2,
    riders: [],
    pickups: [],
    futureStops: [],
    stopIndex: 0,
    stopMessage: "",
  };
  phaseCompleted = false;
  resetRideMapAutoFit();
  if (role === "passenger") return;
  state.selectedDestination = null;
}

function syncUserFromEmail(email) {
  const cleanEmail = email.trim().toLowerCase();
  state.user.email = cleanEmail;
  state.user.name = nameFromEmail(cleanEmail);
  state.user.program = "Ingeniería de Sistemas";
  state.user.avatar = avatarSvg("#52f4ff", "#2878ff", initialsFromName(state.user.name));
  if (state.role === "driver") {
    state.driver.email = cleanEmail;
    state.driver.name = state.user.name;
    state.driver.program = "Ingenieria de Sistemas";
    state.driver.avatar = avatarSvg("#45ff9a", "#2878ff", initialsFromName(state.driver.name));
  }
}

function nameFromEmail(email) {
  const local = email.split("@")[0].replace(/\d+/g, "");
  const knownNames = {
    alejandrolozano: "Alejandro Lozano Restrepo",
    alejandrolozanorestrepo: "Alejandro Lozano Restrepo",
  };
  const compact = local.replace(/[^a-zñáéíóúü]/gi, "").toLowerCase();
  if (knownNames[compact]) return knownNames[compact];
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length > 1) return parts.map(titleCase).join(" ");
  return titleCase(local || "Estudiante UNIAJC");
}

function initialsFromName(name) {
  const parts = name.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || "U") + (parts[1]?.[0] || "R");
}

function titleCase(value) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .map((part) => part ? part[0].toUpperCase() + part.slice(1) : "")
    .join(" ");
}

function requestCurrentLocation({ silent = false } = {}) {
  if (!navigator.geolocation) {
    if (!silent) toast("GPS del navegador no disponible");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      await applyBrowserLocation(position);
      if (!silent) toast("Ubicación real activada");
    },
    () => {
      state.locationReady = false;
      userCoords = [...campusCoords];
      ensureRideMapReady();
      if (!silent) toast("Usando ubicación UNIAJC como respaldo");
    },
    {
      enableHighAccuracy: true,
      timeout: 7000,
      maximumAge: 60000,
    },
  );
}

function startLocationTracking({ silent = false } = {}) {
  requestCurrentLocation({ silent });
  if (!navigator.geolocation || geoWatchId !== null) return;
  geoWatchId = navigator.geolocation.watchPosition(
    (position) => {
      applyBrowserLocation(position);
    },
    () => {
      state.locationReady = false;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 45000,
    },
  );
}

async function applyBrowserLocation(position) {
  state.locationReady = true;
  if (isNavigationActive()) return;
  userCoords = [position.coords.latitude, position.coords.longitude];
  if (state.selectedDestination?.coords) {
    state.roadRoute = await fetchRoadRoute(userCoords, state.selectedDestination.coords);
  }
  ensureRideMapReady();
  renderAll();
}

function isNavigationActive() {
  return state.driverRoutePublished || ["searching", "pickup", "readyStart", "trip"].includes(state.phase);
}

async function handleSendCode() {
  const email = $("#emailInput").value.trim().toLowerCase();
  if (!isInstitutionalEmail(email)) {
    $("#loginStatus").textContent = "Usa tu correo institucional UNIAJC.";
    $("#emailInput").focus();
    return;
  }

  if (isDevAuthMode()) {
    state.verificationSent = true;
    enterAppFromLogin(email);
    return;
  }

  const button = $("#sendCodeBtn");
  button.disabled = true;
  button.textContent = "Enviando...";
  $("#loginStatus").textContent = "Validando correo institucional.";

  try {
    state.verificationCode = createVerificationCode();
    state.verificationExpiresAt = Date.now() + 10 * 60 * 1000;
    state.verificationChallenge = await sendVerificationCode(email, state.verificationCode);
  } catch (error) {
    console.error("Email verification error:", error);
    $("#loginStatus").textContent = getEmailErrorMessage(error);
    button.disabled = false;
    button.textContent = "Enviar código";
    return;
  }
  state.verificationSent = true;
  state.user.email = email;

  $("#codeField").classList.remove("hidden");
  $("#roleBlock").classList.remove("hidden");
  $("#loginSubmitBtn").classList.remove("hidden");
  $("#loginStatus").textContent = "Código enviado. Revisa tu correo institucional.";
  $("#codeInput").focus();
  button.textContent = "Reenviar código";

  window.setTimeout(() => {
    button.disabled = false;
  }, 1200);
}

function isInstitutionalEmail(email) {
  return /^[^\s@]+@[^\s@]*uniajc\.edu\.co$/.test(email);
}

function createVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendVerificationCode(email, code) {
  const endpoint = window.UNIAJC_RIDE_AUTH_ENDPOINT || "";
  if (endpoint) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, app: "UNIAJC-RIDE" }),
    });
    if (!response.ok) throw new Error("No se pudo enviar el código");
    const data = await response.json().catch(() => ({}));
    return data.challengeId || "";
  }

  const emailConfig = window.UNIAJC_RIDE_EMAIL || {};
  if (emailConfig.provider === "emailjs") {
    validateEmailJsConfig(emailConfig);
    window.emailjs.init({ publicKey: emailConfig.publicKey });
    await window.emailjs.send(
      emailConfig.serviceId,
      emailConfig.templateId,
      {
        to_email: email,
        email,
        recipient_email: email,
        recipient: email,
        user_email: email,
        from_email: email,
        reply_to: email,
        to_name: email.split("@")[0],
        from_name: "UNIAJC-RIDE",
        verification_code: code,
        code,
        app_name: "UNIAJC-RIDE",
        expires_in: "10 minutos",
        subject: "Código de verificación UNIAJC-RIDE",
        message: `Tu código de verificación UNIAJC-RIDE es ${code}. Expira en 10 minutos.`,
      },
      {
        publicKey: emailConfig.publicKey,
      },
    );
    return "emailjs";
  }

  throw new Error("Configura EmailJS para enviar el código al correo.");
}

function validateEmailJsConfig(config) {
  const values = [config.publicKey, config.serviceId, config.templateId];
  const missing = values.some((value) => typeof value !== "string" || !value || value.startsWith("TU_"));
  if (missing) throw new Error("Faltan las credenciales de EmailJS en app.config.js.");
  if (!window.emailjs) throw new Error("No se pudo cargar EmailJS. Revisa tu conexión.");
}

function getEmailErrorMessage(error) {
  const detail = error?.text || error?.message || "";
  if (detail.includes("recipients address is empty")) return "En la plantilla de EmailJS falta To Email: {{to_email}}.";
  if (detail.includes("Public Key")) return "Public Key de EmailJS incorrecta. Revisa app.config.js.";
  if (detail.includes("service ID")) return "Service ID incorrecto o servicio Outlook no actualizado.";
  if (detail.includes("template ID")) return "Template ID incorrecto o plantilla no publicada.";
  if (detail.includes("origin")) return "EmailJS bloqueó este origen. Revisa Security > Allowed origins.";
  return detail || "No se pudo enviar el código. Revisa la plantilla de EmailJS.";
}

async function verifyInstitutionalCode(email, code) {
  const endpoint = window.UNIAJC_RIDE_VERIFY_ENDPOINT || "";
  if (!endpoint) return true;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      code,
      challengeId: state.verificationChallenge,
      app: "UNIAJC-RIDE",
    }),
  });
  if (!response.ok) return false;
  const data = await response.json().catch(() => ({}));
  return data.verified === true;
}

function renderAll() {
  $("#topAvatar").src = state.role === "driver" ? state.driver.avatar : state.user.avatar;
  renderDriverInfoButton();
  renderHome();
  renderProfile();
}

function renderDriverInfoButton() {
  const button = $("#driverInfoBtn");
  if (!button) return;
  const hasDriver = state.role === "passenger" && state.assignedDriver && ["pickup", "readyStart", "trip"].includes(state.phase);
  button.classList.toggle("hidden", !hasDriver);
  if (hasDriver) $("#driverInfoInitials").textContent = state.assignedDriver.markerLabel;
}

function renderHome() {
  const isDriver = state.role === "driver";
  const liveDot = $(".live-dot");
  $("#roleStatus").textContent = isDriver ? "Modo conductor activo" : "GPS activo";
  $("#movingStatus").textContent = isDriver ? "solicitudes disponibles" : "conductores en movimiento";
  $("#modeEyebrow").textContent = isDriver ? "Modo conductor" : "Modo pasajero";
  $("#passengerQuick").classList.toggle("hidden", isDriver || state.phase !== "idle" || !state.selectedDestination);
  $("#driverOptions").classList.toggle("hidden", true);
  $("#carpoolPanel").classList.toggle("hidden", isDriver || !state.selectedDestination);
  $("#driverPanel").classList.toggle("hidden", !isDriver);
  $("#mainActionBtn").classList.toggle("hidden", state.phase === "trip");
  liveDot.classList.add("hidden");

  const activeDestination = isDriver ? state.driverDestination : state.selectedDestination;
  if (activeDestination) {
    $("#destinationLabel").textContent = activeDestination.name;
  } else {
    $("#destinationLabel").textContent = isDriver ? "Tipo de ruta" : "¿A dónde vas?";
  }

  if (isDriver) {
    $("#sheetTitle").textContent = state.driverStopMessage || (state.driverRouteCompleted
      ? "Ruta finalizada"
      : state.driverRoutePublished
        ? `Ruta hacia ${state.driverDestination?.name || "destino"}`
        : "Solicitudes cerca de tu ruta");
    liveDot.textContent = state.driverRouteCompleted ? "Llegada" : state.driverRoutePublished ? `${state.driverPickedCount}/4` : "4 cupos";
    liveDot.classList.remove("hidden");
    $("#mainActionBtn").textContent = state.driverRouteCompleted
      ? "Nueva ruta"
      : state.driverRoutePublished
        ? "Ruta en curso"
        : state.driverDestination
          ? "Publicar ruta"
          : "Elegir ruta";
    $("#mainActionBtn").disabled = state.driverRoutePublished;
    renderDriverPickupRoute();
    return;
  }

  $("#mainActionBtn").disabled = false;
  if (state.phase === "idle") {
    $("#sheetTitle").textContent = state.selectedDestination ? `UNIAJC → ${state.selectedDestination.name}` : "Elige tu destino";
    if (state.selectedDestination?.eta) {
      liveDot.textContent = state.selectedDestination.eta;
      liveDot.classList.remove("hidden");
    }
    $("#anaPrice").textContent = state.selectedDestination?.price || "$4.500";
    $("#mainActionBtn").textContent = state.selectedDestination ? "Confirmar viaje" : "Buscar destino";
  }
  if (state.phase === "pickup") {
    $("#sheetTitle").textContent = "Tu conductor viene en camino";
    liveDot.textContent = "Llegando";
    liveDot.classList.remove("hidden");
    $("#mainActionBtn").textContent = `Esperando a ${state.activeDriverLabel}`;
    $("#mainActionBtn").disabled = true;
  }
  if (state.phase === "readyStart") {
    $("#sheetTitle").textContent = "El conductor llegó al punto";
    liveDot.textContent = "Listo";
    liveDot.classList.remove("hidden");
    $("#mainActionBtn").textContent = "Iniciar viaje";
  }
  if (state.phase === "trip") {
    $("#sheetTitle").textContent = "Viaje en curso";
    liveDot.textContent = "En ruta";
    liveDot.classList.remove("hidden");
  }
  renderPassengerCarpool();
}

function renderDriverRequests() {
  const list = $("#driverRequests");
  list.innerHTML = "";
  driverRequests.forEach((request) => {
    const card = document.createElement("div");
    card.className = "request-card";
    card.innerHTML = `<div><strong>${request.name}</strong><span>${request.route} · ${request.eta}</span></div><button>Aceptar</button>`;
    $("button", card).addEventListener("click", () => {
      state.acceptedPassenger = request.name;
      toast(`Pasajero aceptado: ${request.name}`);
      card.remove();
    });
    list.appendChild(card);
  });
}

function renderPassengerCarpool() {
  const panel = $("#carpoolPanel");
  if (!panel || !state.selectedDestination) return;
  const carpool = state.carpool;
  const visibleRiders = carpool.riders.slice(0, carpool.occupancy);
  const nextPickup = carpool.riders[carpool.occupancy];
  const status =
    state.phase === "pickup" ? `Conductor ${state.activeDriverLabel} en camino`
      : state.phase === "readyStart" ? "Conductor en tu punto"
        : state.phase === "trip"
          ? carpool.stopMessage || (nextPickup ? `Próxima parada: ${nextPickup.shortName}` : `Camino a ${state.selectedDestination?.name || "destino"}`)
          : `Eres pasajero ${carpool.passengerSlot}`;

  panel.innerHTML = `
    <div class="carpool-head">
      <div><strong>${status}</strong><span>Carpooling universitario UNIAJC</span></div>
      <b>${carpool.occupancy}/${carpool.capacity}</b>
    </div>
    <div class="carpool-riders">
      ${visibleRiders.map((rider) => `<span class="${rider.isUser ? "you" : ""}">${rider.label}</span>`).join("")}
    </div>
    <div class="carpool-meta">
      <span>Destino: ${state.selectedDestination.name}</span>
      <span>${state.selectedDestination.price || "$4.500"}</span>
    </div>`;
}

function setupPassengerCarpool() {
  const passengerSlot = 1 + Math.floor(Math.random() * 4);
  const userInitials = initialsFromName(state.user.name);
  const shuffled = [...passengerPool].sort(() => Math.random() - 0.5);
  const riders = Array.from({ length: 4 }, (_, index) => {
    if (index === passengerSlot - 1) {
      return {
        initials: userInitials,
        label: `${userInitials} Tú`,
        shortName: "ti",
        coords: [...userCoords],
        isUser: true,
      };
    }
    const rider = shuffled.pop();
    return {
      ...rider,
      shortName: rider.label.split(" ")[0],
      isUser: false,
    };
  });
  const futureStops = riders.slice(passengerSlot).filter((rider) => rider.coords);

  state.carpool = {
    passengerSlot,
    capacity: 4,
    occupancy: passengerSlot,
    riders,
    pickups: [],
    futureStops,
    stopIndex: 0,
    stopMessage: "",
  };
}

function updateCarpoolOccupancy() {
  if (state.phase !== "trip") return;
  const extra = state.carpool.stopIndex;
  state.carpool.occupancy = Math.min(state.carpool.capacity, state.carpool.passengerSlot + extra);
  renderPassengerCarpool();
}

function renderDriverPickupRoute() {
  const list = $("#driverRequests");
  list.innerHTML = "";

  const heading = document.createElement("div");
  heading.className = "route-summary";
  const driverDestinationName = state.driverDestination?.name || "destino";
  heading.innerHTML = state.driverRouteCompleted
    ? `<strong>Ruta completada</strong><span>Destino: ${driverDestinationName}</span>`
    : state.driverRoutePublished
      ? `<strong>${state.driverPickedCount}/4 recogidos</strong><span>Destino: ${driverDestinationName}</span>`
      : `<strong>Solicitudes disponibles</strong><span>${state.driverDestination ? `Hacia ${driverDestinationName}` : "Elige un destino para publicar"}</span>`;
  list.appendChild(heading);

  driverPickupStudents.forEach((student, index) => {
    const accepted = state.driverAcceptedStudents.includes(student.initials);
    const picked = state.driverRouteCompleted || (state.driverRoutePublished && state.driverRouteProgress >= student.progress);
    const card = document.createElement("div");
    card.className = `request-card pickup-card ${state.driverRoutePublished || state.driverRouteCompleted ? "route-stop" : ""} ${picked ? "picked" : ""}`;
    if (state.driverRoutePublished) {
      card.innerHTML = `
        <span class="stop-index">${picked ? "✓" : index + 1}</span>
        <div><strong>${student.name}</strong><span>${student.address} · ${student.destination}</span></div>
        <em>${picked ? "Recogido" : "Pendiente"}</em>`;
      list.appendChild(card);
      return;
    }

    card.innerHTML = `
      <span class="stop-index">${picked ? "✓" : index + 1}</span>
      <div><strong>${student.name}</strong><span>${student.program} · ${student.address}</span></div>
      <div class="request-actions">
        <button type="button" class="ghost-action" data-student-profile="${student.initials}">Ver perfil</button>
        <button type="button" ${accepted ? "disabled" : ""} data-student-accept="${student.initials}">${accepted ? "Aceptado" : "Aceptar"}</button>
      </div>`;
    list.appendChild(card);
  });

  $$("[data-student-profile]", list).forEach((button) => {
    button.addEventListener("click", () => {
      const student = driverPickupStudents.find((item) => item.initials === button.dataset.studentProfile);
      if (student) openStudentProfileModal(student);
    });
  });

  $$("[data-student-accept]", list).forEach((button) => {
    button.addEventListener("click", () => {
      const initials = button.dataset.studentAccept;
      const student = driverPickupStudents.find((item) => item.initials === initials);
      if (!state.driverAcceptedStudents.includes(initials)) state.driverAcceptedStudents.push(initials);
      state.acceptedPassenger = student?.name || initials;
      renderDriverPickupRoute();
      toast(`Solicitud aceptada: ${student?.name || initials}`);
    });
  });

  const campus = document.createElement("div");
  if (state.driverRouteMode === "home") return;
  campus.className = `request-card pickup-card route-stop campus-stop ${state.driverRouteCompleted || state.driverRouteProgress >= 0.98 ? "picked" : ""}`;
  campus.innerHTML = `
    <span class="stop-index">FIN</span>
    <div><strong>Destino final</strong><span>${driverDestinationName}</span></div>
    <em>${state.driverRouteCompleted || state.driverRouteProgress >= 0.995 ? "Llegada" : "En ruta"}</em>`;
  list.appendChild(campus);
}

function renderProfile() {
  const isDriver = state.role === "driver";
  $("#profileTitle").textContent = isDriver ? "Perfil conductor" : "Perfil pasajero";
  const content = $("#profileContent");
  const person = isDriver ? state.driver : state.user;
  content.innerHTML = "";

  const hero = document.createElement("section");
  hero.className = "glass-panel profile-hero";
  hero.innerHTML = `
    <div class="profile-avatar"><img src="${person.avatar}" alt=""></div>
    <div>
      <h2>${person.name}</h2>
      <p>${person.program}</p>
      <span class="verified">${isDriver ? "Conductor verificado UNIAJC" : "Estudiante verificado UNIAJC"}</span>
      ${isDriver ? "" : `<label class="profile-photo-edit">Cambiar foto<input id="profilePhotoInput" type="file" accept="image/*" /></label>`}
    </div>`;
  content.appendChild(hero);
  bindProfilePhotoInput();

  if (isDriver) {
    content.appendChild(nodeFromHTML(`
      <section class="info-list">
        <div class="info-row"><strong>Vehículo registrado</strong><span>${state.driver.vehicle}</span></div>
        <div class="info-row"><strong>Placa</strong><span>${state.driver.plate}</span></div>
        <div class="info-row"><strong>Licencia</strong><span>${state.driver.license}</span></div>
        <div class="info-row"><strong>SOAT</strong><span>${state.driver.soat}</span></div>
        <div class="info-row"><strong>Tecnomecanica</strong><span>${state.driver.techReview}</span></div>
        <div class="info-row"><strong>Estado disponible</strong><span>Activo</span></div>
      </section>`));
    content.appendChild(nodeFromHTML(`
      <section class="driver-stats">
        <div class="stat-tile" data-profile-detail="Viajes dados"><span>Viajes dados</span><strong>74</strong></div>
        <div class="stat-tile" data-profile-detail="Rating"><span>Rating</span><strong>4.9</strong></div>
        <div class="stat-tile" data-profile-detail="Ahorro generado"><span>Ahorro generado</span><strong>$426k</strong></div>
        <div class="stat-tile" data-profile-detail="CO2 evitado"><span>CO2 evitado</span><strong>61kg</strong></div>
      </section>`));
    content.appendChild(menu(["Solicitudes recibidas", "Rutas ofrecidas", "Ganancias y aportes", "Documentos del vehículo"]));
    bindProfileDetailCards(content);
    return;
  }

  content.appendChild(nodeFromHTML(`
    <section class="info-list">
      <div class="info-row"><strong>Nombre</strong><span>${state.user.name}</span></div>
      <div class="info-row"><strong>Correo institucional</strong><span>${state.user.email || "Correo UNIAJC"}</span></div>
      <div class="info-row"><strong>Programa académico</strong><span>${state.user.program}</span></div>
      <div class="info-row"><strong>Semestre</strong><span>${state.user.semester}</span></div>
      <div class="info-row"><strong>Estado</strong><span>Verificado UNIAJC</span></div>
    </section>`));
}

function bindProfilePhotoInput() {
  const input = $("#profilePhotoInput");
  if (!input) return;
  input.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.user.avatar = reader.result;
      renderAll();
      toast("Foto de perfil actualizada");
    };
    reader.readAsDataURL(file);
  });
}

function menu(items) {
  const section = document.createElement("section");
  section.className = "profile-menu";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.className = "menu-row";
    button.innerHTML = `<strong>${item}</strong><span>Abrir</span>`;
    button.addEventListener("click", () => {
      openProfileMenuModal(item);
    });
    section.appendChild(button);
  });
  return section;
}

function bindProfileDetailCards(root) {
  $$(".info-row", root).forEach((row) => {
    row.addEventListener("click", () => {
      const title = $("strong", row)?.textContent || "Detalle";
      const value = $("span", row)?.textContent || "";
      openProfileInfoModal(title, value);
    });
  });

  $$("[data-profile-detail]", root).forEach((tile) => {
    tile.addEventListener("click", () => {
      const title = tile.dataset.profileDetail;
      const value = $("strong", tile)?.textContent || "";
      openProfileInfoModal(title, value);
    });
  });
}

function openProfileInfoModal(title, value) {
  openModal(`
    <div class="modal-card profile-detail-modal">
      <div class="modal-head">
        <strong>${title}</strong>
        <button class="icon-btn close-modal" aria-label="Cerrar"></button>
      </div>
      <div class="detail-value">${value}</div>
      <p>${profileDetailText(title, value)}</p>
    </div>`);
}

function profileDetailText(title, value) {
  const details = {
    "Vehiculo registrado": `Vehiculo asociado a tu cuenta de conductor UNIAJC-RIDE: ${value}.`,
    "Vehículo registrado": `Vehiculo asociado a tu cuenta de conductor UNIAJC-RIDE: ${value}.`,
    Placa: `Placa validada para operar en rutas universitarias: ${value}.`,
    Licencia: `Estado de licencia del conductor: ${value}.`,
    SOAT: `Seguro obligatorio registrado: ${value}.`,
    Tecnomecanica: `Revision tecnico-mecanica registrada: ${value}.`,
    "Estado disponible": `Tu disponibilidad actual es ${value}.`,
    "Viajes dados": `Has completado ${value} viajes como conductor verificado.`,
    Rating: `Calificacion promedio recibida por pasajeros: ${value}.`,
    "Ahorro generado": `Aporte economico estimado para estudiantes transportados: ${value}.`,
    "CO2 evitado": `Impacto ambiental acumulado en rutas compartidas: ${value}.`,
  };
  return details[title] || "Informacion validada en tu perfil local de demostracion.";
}

function openProfileMenuModal(item) {
  const content = profileMenuContent(item);
  openModal(`
    <div class="modal-card profile-detail-modal">
      <div class="modal-head">
        <strong>${item}</strong>
        <button class="icon-btn close-modal" aria-label="Cerrar"></button>
      </div>
      ${content}
    </div>`);
  const routeButton = $("#openDriverRouteFromProfile");
  if (routeButton) {
    routeButton.addEventListener("click", () => {
      closeModal(false);
      openDriverRouteModal();
    });
  }
}

function profileMenuContent(item) {
  if (item === "Solicitudes recibidas") {
    return `
      <div class="modal-list">
        ${driverPickupStudents.map((student) => `
          <div class="modal-list-row">
            <strong>${student.name}</strong>
            <span>${student.address} -> ${student.destination}</span>
          </div>`).join("")}
      </div>`;
  }
  if (item === "Rutas ofrecidas") {
    return `
      <div class="modal-list">
        <div class="modal-list-row"><strong>Ruta actual</strong><span>${state.driverDestination?.name || "Sin ruta publicada"}</span></div>
        <div class="modal-list-row"><strong>Modo</strong><span>${driverRouteModeLabel()}</span></div>
        <div class="modal-list-row"><strong>Estado</strong><span>${state.driverRoutePublished ? "En curso" : state.driverRouteCompleted ? "Finalizada" : "Disponible"}</span></div>
      </div>
      <button class="primary-action" id="openDriverRouteFromProfile">Configurar ruta</button>`;
  }
  if (item === "Ganancias y aportes") {
    return `
      <div class="summary-grid compact">
        <div><span>Ganancias estimadas</span><strong>$426k</strong></div>
        <div><span>Aportes compartidos</span><strong>74</strong></div>
        <div><span>Promedio ruta</span><strong>$5.300</strong></div>
        <div><span>CO2 evitado</span><strong>61kg</strong></div>
      </div>`;
  }
  return `
    <div class="modal-list">
      <div class="modal-list-row"><strong>Vehiculo</strong><span>${state.driver.vehicle}</span></div>
      <div class="modal-list-row"><strong>Placa</strong><span>${state.driver.plate}</span></div>
      <div class="modal-list-row"><strong>Licencia</strong><span>${state.driver.license}</span></div>
      <div class="modal-list-row"><strong>SOAT</strong><span>${state.driver.soat}</span></div>
      <div class="modal-list-row"><strong>Tecnomecanica</strong><span>${state.driver.techReview}</span></div>
    </div>`;
}

function driverRouteModeLabel() {
  if (state.driverRouteMode === "south") return "Campus Sur";
  if (state.driverRouteMode === "home") return "Regreso a casas";
  return "Campus Norte";
}

function nodeFromHTML(html) {
  const wrap = document.createElement("div");
  wrap.innerHTML = html.trim();
  return wrap.firstElementChild;
}

function openSearchModal() {
  openTemplate("searchTemplate");
  $("#modalLayer").classList.add("search-mode");
  const input = $("#destinationInput");
  input.value = "";
  renderResults("");
  input.focus();
  input.addEventListener("input", () => {
    renderResults(input.value);
    queueRemoteSearch(input.value);
  });
}

function renderResults(query) {
  const list = $("#resultList");
  const normalized = normalizeSearchText(query);
  const compact = compactSearchText(query);
  list.innerHTML = "";
  if (!normalized) {
    renderSearchHint("Escribe una dirección, barrio, universidad o lugar de Cali.");
    return;
  }
  const results = destinations.filter((item) => {
    const haystack = normalizeSearchText([item.name, item.zone, ...(item.aliases || [])].join(" "));
    const compactHaystack = compactSearchText([item.name, item.zone, ...(item.aliases || [])].join(" "));
    return haystack.includes(normalized) || compactHaystack.includes(compact);
  });
  results.forEach((destination) => {
    list.appendChild(createResultButton(destination, "UNIAJC-RIDE"));
  });
  if (query.trim().length >= 3) {
    renderSearchStatus("Buscando referencias reales en Cali...");
  } else if (!results.length) {
    renderSearchHint("Sigue escribiendo para ver coincidencias.");
  }
}

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/#/g, " ")
    .replace(/\bcarrera\b/g, "cra")
    .replace(/\bcalle\b/g, "cl")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactSearchText(value) {
  return normalizeSearchText(value).replace(/[^a-z0-9]/g, "");
}

function queueRemoteSearch(query) {
  clearTimeout(searchDebounce);
  const cleanQuery = query.trim();
  if (cleanQuery.length < 3) return;
  const token = ++remoteSearchToken;
  searchDebounce = window.setTimeout(() => searchCaliAddress(cleanQuery, token), 420);
}

async function searchCaliAddress(query, token) {
  const list = $("#resultList");
  if (!list) return;
  const input = $("#destinationInput");
  const params = new URLSearchParams({
    format: "jsonv2",
    addressdetails: "1",
    limit: "12",
    countrycodes: "co",
    viewbox: "-76.62,3.55,-76.45,3.33",
    bounded: "1",
    "accept-language": "es",
    q: `${formatCaliAddressQuery(query)}, Cali, Valle del Cauca, Colombia`,
  });

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
    if (!response.ok) throw new Error("No se pudo buscar la direccion");
    const results = await response.json();
    if (token !== remoteSearchToken || input?.value.trim() !== query) return;

    $$(".result-status", list).forEach((item) => item.remove());
    const existingKeys = new Set($$(".result-item", list).map((item) => item.dataset.key));
    const remoteDestinations = results.map(nominatimToDestination).filter(Boolean).filter((destination) => {
      const key = destinationKey(destination);
      if (existingKeys.has(key)) return false;
      existingKeys.add(key);
      return true;
    });

    if (!remoteDestinations.length && !$(".result-item", list)) {
      renderSearchHint("No encontre esa referencia. Prueba con barrio, calle, carrera o sitio cercano.");
      return;
    }

    remoteDestinations.forEach((destination) => {
      list.appendChild(createResultButton(destination, "OpenStreetMap"));
    });
  } catch (error) {
    console.warn("Address search fallback:", error);
    if (token === remoteSearchToken) {
      $$(".result-status", list).forEach((item) => item.remove());
      if (!$(".result-item", list)) renderSearchHint("No hubo conexion con el buscador de direcciones.");
    }
  }
  return;

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`);
    if (!response.ok) throw new Error("No se pudo buscar la dirección");
    const results = await response.json();
    if (!results.length) return;
    const existingNames = new Set($$(".result-item strong", list).map((item) => item.textContent.toLowerCase()));
    results.forEach((result) => {
      const destination = {
        name: result.name || result.display_name.split(",")[0],
        zone: result.display_name,
        coords: [Number(result.lat), Number(result.lon)],
        eta: "Calculando",
        price: "$4.900",
        route: null,
      };
      if (existingNames.has(destination.name.toLowerCase())) return;
      const item = document.createElement("button");
      item.className = "result-item";
      item.innerHTML = `<strong>${destination.name}</strong><span>${destination.zone}</span>`;
      item.addEventListener("click", () => {
        selectDestination(destination);
        closeModal();
      });
      list.appendChild(item);
    });
  } catch (error) {
    console.warn("Address search fallback:", error);
  }
}

function renderSearchHint(message) {
  const list = $("#resultList");
  if (!list) return;
  list.innerHTML = "";
  const item = document.createElement("div");
  item.className = "result-hint";
  item.textContent = message;
  list.appendChild(item);
}

function renderSearchStatus(message) {
  const list = $("#resultList");
  if (!list || $(".result-status", list)) return;
  const item = document.createElement("div");
  item.className = "result-status";
  item.textContent = message;
  list.appendChild(item);
}

function createResultButton(destination, source) {
  const item = document.createElement("button");
  item.className = "result-item";
  item.dataset.key = destinationKey(destination);

  const title = document.createElement("strong");
  title.textContent = destination.name;
  const zone = document.createElement("span");
  zone.textContent = destination.zone;
  const meta = document.createElement("small");
  meta.textContent = source;

  item.append(title, zone, meta);
  item.addEventListener("click", () => {
    selectDestination(destination);
    closeModal();
  });
  return item;
}

function nominatimToDestination(result) {
  const lat = Number(result.lat);
  const lng = Number(result.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const address = result.address || {};
  const road = address.road || address.pedestrian || address.footway || address.neighbourhood || address.suburb;
  const house = address.house_number;
  const name = road && house ? `${road} #${house}` : result.name || road || result.display_name.split(",")[0];

  return {
    name,
    zone: cleanDisplayAddress(result.display_name),
    coords: [lat, lng],
    eta: "Calculando",
    price: "$4.900",
    route: null,
  };
}

function cleanDisplayAddress(displayName) {
  return displayName
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 5)
    .join(", ");
}

function destinationKey(destination) {
  const coords = destination.coords?.map((value) => Number(value).toFixed(5)).join(",");
  return `${normalizeSearchText(destination.name)}-${coords || ""}`;
}

function formatCaliAddressQuery(query) {
  return query
    .trim()
    .replace(/\bcra\.?\s*/i, "Carrera ")
    .replace(/\bkr\.?\s*/i, "Carrera ")
    .replace(/\bcl\.?\s*/i, "Calle ");
}

async function selectDestination(destination) {
  if (state.role === "driver") {
    selectDriverDestination(destination);
    return;
  }
  if (state.role !== "passenger") return;
  state.selectedDestination = destination;
  state.activeRoute = destination.route;
  state.roadRoute = null;
  state.routeProgress = 0;
  resetRideMapAutoFit();
  setupPassengerCarpool();
  phaseCompleted = false;
  renderAll();
  drawRideMapRoute(false);
  toast(`Calculando ruta por vías hacia ${destination.name}`);
  state.roadRoute = await fetchRoadRoute(userCoords, destination.coords);
  if (state.roadRoute?.length) {
    const km = polylineKm(state.roadRoute);
    state.selectedDestination.eta = `${Math.max(6, Math.round((km / 24) * 60) + 4)} min`;
    state.selectedDestination.price = `$${(Math.round((2800 + km * 950) / 100) * 100).toLocaleString("es-CO")}`;
  }
  renderAll();
  drawRideMapRoute();
  toast(`Ruta trazada hacia ${destination.name}`);
}

function selectDriverDestination(destination, mode = "north") {
  state.driverDestination = destination;
  state.driverRouteMode = mode;
  state.driverRoutePublished = false;
  state.driverRouteCompleted = false;
  state.driverRoute = null;
  state.driverRouteProgress = 0;
  state.driverPickedCount = 0;
  state.driverAcceptedStudents = [];
  updateDriverStudentDestinations();
  resetRideMapAutoFit();
  renderAll();
  ensureRideMapReady();
  toast(`Destino de conductor: ${destination.name}`);
}

function openDriverRouteModal() {
  const north = destinations.find((item) => item.name === "Campus Norte UNIAJC");
  const south = destinations.find((item) => item.name === "Campus Sur Pance");
  openModal(`
    <div class="modal-card driver-route-modal">
      <div class="modal-head">
        <strong>Publicar ruta</strong>
        <button class="icon-btn close-modal" aria-label="Cerrar"></button>
      </div>
      <button class="route-choice" data-driver-route="north">
        <strong>Ir a Campus Norte</strong>
        <span>Recoger estudiantes y llegar a ${north.name}</span>
      </button>
      <button class="route-choice" data-driver-route="south">
        <strong>Ir a Campus Sur</strong>
        <span>Recoger estudiantes y llegar a ${south.name}</span>
      </button>
      <button class="route-choice" data-driver-route="home">
        <strong>Regreso a casas</strong>
        <span>Salir del campus y dejar estudiantes en sus barrios</span>
      </button>
    </div>`);

  $$("[data-driver-route]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.driverRoute;
      const destination = mode === "south" ? south : north;
      selectDriverDestination(destination, mode);
      closeModal(false);
    });
  });
}

function updateDriverStudentDestinations() {
  if (state.driverRouteMode === "home") {
    driverPickupStudents.forEach((student) => {
      student.destination = student.address;
    });
    return;
  }
  driverPickupStudents.forEach((student) => {
    student.destination = state.driverDestination?.name || "Campus Norte UNIAJC";
  });
}

async function preparePassengerSharedRoute() {
  if (!state.selectedDestination) return;
  resetRideMapAutoFit();
  const stops = orderStopsForSharedRide(userCoords, state.carpool.futureStops || [], state.selectedDestination.coords);
  state.carpool.futureStops = stops;
  state.carpool.riders = [
    ...state.carpool.riders.slice(0, state.carpool.passengerSlot),
    ...stops,
  ];
  const waypoints = [
    userCoords,
    ...stops.map((stop) => stop.coords),
    state.selectedDestination.coords,
  ].filter(Boolean);
  const roadRoute = await fetchRoadRouteThrough(waypoints);
  state.roadRoute = roadRoute || (waypoints.length >= 2 ? waypoints : null) || state.roadRoute || geoRoute(state.selectedDestination);
  state.activeRoute = state.roadRoute;
  state.carpool.pickups = assignStopProgresses(state.roadRoute, stops);
}

function orderStopsForSharedRide(from, stops, destinationCoords) {
  const pending = [...stops];
  const ordered = [];
  let current = from;
  while (pending.length) {
    pending.sort((a, b) => {
      const aScore = haversineKm(current, a.coords) + haversineKm(a.coords, destinationCoords) * 0.25;
      const bScore = haversineKm(current, b.coords) + haversineKm(b.coords, destinationCoords) * 0.25;
      return aScore - bScore;
    });
    const next = pending.shift();
    ordered.push(next);
    current = next.coords;
  }
  return ordered;
}

async function publishDriverCampusRoute() {
  if (state.driverRouteCompleted) {
    state.driverRouteCompleted = false;
    state.driverRoutePublished = false;
    state.driverRoute = null;
    state.driverDestination = null;
    state.driverRouteMode = "north";
    state.driverRouteProgress = 0;
    state.driverPickedCount = 0;
    state.driverAcceptedStudents = [];
    state.driverPausedUntil = 0;
    state.driverStopMessage = "";
    state.driverStopIndex = 0;
    renderAll();
    ensureRideMapReady();
    return;
  }
  if (!state.driverDestination) {
    openDriverRouteModal();
    return;
  }
  if (!state.driverAcceptedStudents.length) {
    state.driverAcceptedStudents = driverPickupStudents.map((student) => student.initials);
  }
  state.driverRoutePublished = true;
  state.driverRouteCompleted = false;
  state.driverRouteProgress = 0;
  state.driverPickedCount = 0;
  state.driverPausedUntil = 0;
  state.driverStopMessage = "";
  state.driverStopIndex = 0;
  state.selectedDestination = null;
  state.roadRoute = null;
  renderAll();
  ensureRideMapReady();
  toast("Trazando ruta con 4 recogidas");

  updateDriverStudentDestinations();
  const destination = state.driverDestination;
  const isHomeRoute = state.driverRouteMode === "home";
  const orderedStops = orderStopsForSharedRide(userCoords, driverPickupStudents, destination.coords);
  const waypoints = isHomeRoute
    ? [userCoords, ...orderedStops.map((student) => student.coords)]
    : [userCoords, ...orderedStops.map((student) => student.coords), destination.coords];
  state.driverRoute = await fetchRoadRouteThrough(waypoints);
  if (!state.driverRoute?.length) state.driverRoute = waypoints;
  const stopProgresses = assignStopProgresses(state.driverRoute, orderedStops);
  stopProgresses.forEach((stop) => {
    const student = driverPickupStudents.find((item) => item.initials === stop.initials);
    if (student) student.progress = stop.progress;
  });

  renderAll();
  ensureRideMapReady();
  toast(isHomeRoute ? "Ruta activa: regreso a casas" : `Ruta activa hacia ${destination.name}`);
}

async function handleMainAction() {
  if (state.role === "driver") {
    publishDriverCampusRoute();
    return;
  }

  if (state.phase === "idle") {
    if (!state.selectedDestination) {
      openSearchModal();
      return;
    }
    startPassengerSearch();
    return;
  }

  if (state.phase === "readyStart") {
    const mainButton = $("#mainActionBtn");
    if (mainButton) {
      mainButton.disabled = true;
      mainButton.textContent = "Calculando ruta compartida...";
    }
    await preparePassengerSharedRoute();
    state.phase = "trip";
    state.routeProgress = 0;
    phaseCompleted = false;
    renderAll();
    ensureRideMapReady();
    startTripAnimation(15000 + (state.carpool.pickups?.length || 0) * 4200);
    toast("Viaje compartido iniciado");
  }
}

function startPassengerSearch() {
  if (state.role !== "passenger") return;
  state.phase = "searching";
  renderAll();
  openModal(`
    <div class="modal-card">
      <div class="radar"></div>
      <h3 style="text-align:center">Buscando conductor cercano...</h3>
      <p style="text-align:center;color:var(--muted);margin-top:8px">Analizando rutas universitarias seguras</p>
    </div>`);
  const wait = 3000 + Math.floor(Math.random() * 2000);
  window.setTimeout(showDriverFound, wait);
}

function showDriverFound() {
  if (!state.modalOpen || state.phase !== "searching") return;
  const driver = selectRideDriver();
  state.assignedDriver = driver;
  state.activeDriverIndex = driver.markerIndex;
  state.activeDriverLabel = driver.markerLabel;
  closeModal(false);
  openTemplate("rideFoundTemplate");
  $("#foundDriverAvatar").src = driver.avatar;
  $("#foundDriverName").textContent = driver.name;
  $("#foundDriverVehicle").textContent = `${driver.vehicle} · ${driver.route}`;
  $("#foundPlate").textContent = `Placa ${driver.plate}`;
  $("#foundEta").textContent = `Llega en ${driver.eta}`;
  $("#acceptRideBtn").addEventListener("click", async () => {
    closeModal();
    state.phase = "pickup";
    const activeDriver = getAssignedDriverPosition();
    const driverStart = activeDriver.position;
    state.pickupRoute = null;
    state.activeRoute = [driverStart, userCoords];
    state.routeProgress = 0;
    phaseCompleted = false;
    resetRideMapAutoFit();
    state.pickupRoute = await fetchRoadRoute(driverStart, userCoords);
    state.activeRoute = state.pickupRoute || [driverStart, userCoords];
    renderAll();
    ensureRideMapReady();
    startTripAnimation(9000);
  });
}

function selectRideDriver() {
  const nearby = drivers
    .map((driver) => {
      const marker = driverMapMarkers[driver.markerIndex];
      const position = marker?.route ? pointOnGeoRoute(marker.route, marker.progress) : marker?.coords;
      return { driver, km: position ? haversineKm(position, userCoords) : 99 };
    })
    .sort((a, b) => a.km - b.km)
    .slice(0, 3);
  return nearby[Math.floor(Math.random() * nearby.length)]?.driver || drivers[Math.floor(Math.random() * drivers.length)];
}

function getAssignedDriverPosition() {
  const index = state.assignedDriver?.markerIndex ?? state.activeDriverIndex;
  const marker = driverMapMarkers[index] || driverMapMarkers[0];
  const position = marker.route ? pointOnGeoRoute(marker.route, marker.progress) : marker.coords;
  return { marker, index, position };
}

function startTripAnimation(durationMs) {
  cancelTripAnimation();
  tripAnimationStartedAt = performance.now();
  tripAnimationDuration = durationMs;
  tripPausedUntil = 0;
  tripPausedTotal = 0;
  tripPauseStartedAt = 0;
  state.carpool.stopMessage = "";
  state.carpool.stopIndex = 0;
  state.routeProgress = 0;

  const step = (now) => {
    if (!["pickup", "trip"].includes(state.phase)) {
      cancelTripAnimation();
      return;
    }
    if (tripPausedUntil && now < tripPausedUntil) {
      updateTripStatusText();
      tripAnimationFrame = requestAnimationFrame(step);
      return;
    }
    if (tripPausedUntil && now >= tripPausedUntil) {
      tripPausedTotal += tripPausedUntil - tripPauseStartedAt;
      tripPausedUntil = 0;
      tripPauseStartedAt = 0;
      state.carpool.stopMessage = "";
      renderPassengerCarpool();
    }

    state.routeProgress = Math.min(1, (now - tripAnimationStartedAt - tripPausedTotal) / tripAnimationDuration);
    maybePauseForCarpoolPickup(now);
    updateActiveVehicleMarker();
    updateTripStatusText();
    updateCarpoolOccupancy();
    if (state.routeProgress >= 1) {
      tripAnimationFrame = null;
      finishPhaseIfNeeded();
      return;
    }
    tripAnimationFrame = requestAnimationFrame(step);
  };

  tripAnimationFrame = requestAnimationFrame(step);
}

function cancelTripAnimation() {
  if (!tripAnimationFrame) return;
  cancelAnimationFrame(tripAnimationFrame);
  tripAnimationFrame = null;
  tripPausedUntil = 0;
  tripPausedTotal = 0;
  tripPauseStartedAt = 0;
}

function maybePauseForCarpoolPickup(now) {
  if (state.phase !== "trip") return;
  const { pickups, stopIndex, riders, occupancy, capacity } = state.carpool;
  if (stopIndex >= pickups.length || occupancy >= capacity) return;
  const stop = pickups[stopIndex];
  if (state.routeProgress < stop.progress) return;

  const rider = riders[occupancy] || stop;
  state.carpool.stopMessage = `Parada: sube ${rider?.shortName || "pasajero"}`;
  state.carpool.stopIndex += 1;
  state.carpool.occupancy = Math.min(capacity, occupancy + 1);
  tripPauseStartedAt = now;
  tripPausedUntil = now + 2300;
  renderPassengerCarpool();
  drawRideMapRoute(true);
  toast(`${rider?.shortName || "Pasajero"} se subió al viaje`);
}

function updateActiveVehicleMarker() {
  const route = state.phase === "pickup" ? state.pickupRoute || state.activeRoute : state.roadRoute || state.activeRoute;
  if (!route?.length) return;
  const position = pointOnGeoRoute(route, state.routeProgress);
  if (rideMapLayers.tripCar) {
    rideMapLayers.tripCar.setLatLng(position);
  }
  if (state.phase === "trip" && rideMapLayers.user) {
    rideMapLayers.user.setLatLng(position);
  }
  if (rideMapLayers.route && ["pickup", "trip"].includes(state.phase)) {
    const visibleRoute = routeFromProgress(route, state.routeProgress);
    if (visibleRoute) rideMapLayers.route.setLatLngs(visibleRoute);
    if (rideMapLayers.routeGlow && visibleRoute) rideMapLayers.routeGlow.setLatLngs(visibleRoute);
  }
}

function updateTripStatusText() {
  const liveDot = $(".live-dot");
  if (!liveDot) return;
  if (tripPausedUntil) {
    liveDot.textContent = "Parada";
    return;
  }
  const remaining = Math.max(1, Math.ceil((1 - state.routeProgress) * (state.phase === "pickup" ? 4 : 8)));
  liveDot.textContent = state.phase === "pickup" ? `${remaining} min` : `Destino ${remaining} min`;
}

function finishPhaseIfNeeded() {
  if (phaseCompleted || state.routeProgress < 1) return;
  phaseCompleted = true;
  if (state.phase === "pickup") {
    state.phase = "readyStart";
    state.routeProgress = 0;
    state.pickupRoute = null;
    state.activeRoute = state.roadRoute || geoRoute(state.selectedDestination);
    cancelTripAnimation();
    renderAll();
    ensureRideMapReady();
    toast("Tu conductor llegó");
  } else if (state.phase === "trip") {
    state.lastTripSummary = buildTripSummary();
    state.phase = "idle";
    state.selectedDestination = null;
    state.pickupRoute = null;
    state.activeRoute = null;
    state.roadRoute = null;
    cancelTripAnimation();
    renderAll();
    ensureRideMapReady();
    openSummaryModal();
  }
}

function openSummaryModal() {
  openTemplate("summaryTemplate");
  renderSummaryModal();
  bindPillGroups($("#paymentOptions"));
  bindPaymentActions();
  $("#confirmPaymentBtn").addEventListener("click", () => {
    const payment = $("#paymentOptions .pill.active")?.textContent || "Nequi";
    closeModal();
    resetPassengerHome();
    toast(`Pago confirmado por ${payment}. Viaje finalizado`);
  });
}

function buildTripSummary() {
  const riders = Math.max(1, state.carpool.capacity || state.carpool.occupancy || 1);
  const total = parseCop(state.selectedDestination?.price) || 21100;
  const userCost = Math.round(total / riders);
  const minutes = state.selectedDestination?.eta || "18 min";
  return {
    total,
    userCost,
    riders,
    minutes,
    co2: (1.1 + riders * 0.15).toFixed(1),
  };
}

function renderSummaryModal() {
  const summary = state.lastTripSummary || buildTripSummary();
  $("#summaryUserCost").textContent = formatCop(summary.userCost);
  $("#summaryTotalCost").textContent = formatCop(summary.total);
  $("#summaryRiders").textContent = `${summary.riders}`;
  $("#summaryTime").textContent = summary.minutes;
  $("#summaryCo2").textContent = `${summary.co2} kg`;
}

function parseCop(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const numeric = String(value).replace(/[^\d]/g, "");
  return Number(numeric) || 0;
}

function formatCop(value) {
  return `$${Math.round(value).toLocaleString("es-CO")}`;
}

function resetPassengerHome() {
  cancelTripAnimation();
  state.phase = "idle";
  state.selectedDestination = null;
  state.activeRoute = null;
  state.roadRoute = null;
  state.pickupRoute = null;
  state.routeProgress = 0;
  state.assignedDriver = null;
  state.lastTripSummary = null;
  state.carpool = {
    passengerSlot: 2,
    capacity: 4,
    occupancy: 2,
    riders: [],
    pickups: [],
    futureStops: [],
    stopIndex: 0,
    stopMessage: "",
  };
  phaseCompleted = false;
  renderAll();
  ensureRideMapReady();
}

function bindPaymentActions() {
  const feedback = document.createElement("div");
  feedback.className = "payment-feedback";
  feedback.textContent = "Nequi seleccionado. Confirma para cerrar el viaje.";
  $("#paymentOptions").after(feedback);

  $$("#paymentOptions .pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const method = pill.textContent.trim();
      const messages = {
        Nequi: "Nequi seleccionado. Se abriría una solicitud al número registrado.",
        PSE: "PSE seleccionado. Se abriría la pasarela bancaria.",
        Efectivo: "Efectivo seleccionado. Paga al conductor al finalizar.",
      };
      feedback.textContent = messages[method] || `${method} seleccionado.`;
    });
  });
}

function openSettingsModal() {
  openTemplate("settingsTemplate");
  $("#settingsPreview").src = state.role === "driver" ? state.driver.avatar : state.user.avatar;
  $("#settingsEmail").value = state.user.email || "";
  $("#settingsName").value = state.role === "driver" ? state.driver.name : state.user.name;
  $("#settingsProgram").value = state.role === "driver" ? state.driver.program : state.user.program;
  $("#settingsSemester").value = state.user.semester;
  renderContacts();
  bindPillGroups($(".settings-modal"));

  $("#photoInput").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      $("#settingsPreview").src = reader.result;
      if (state.role === "driver") state.driver.avatar = reader.result;
      else state.user.avatar = reader.result;
      renderAll();
    };
    reader.readAsDataURL(file);
  });

  $("#addContactBtn").addEventListener("click", () => {
    const value = $("#sosContactInput").value.trim();
    if (!value) return;
    state.sosContacts.push(value);
    $("#sosContactInput").value = "";
    renderContacts();
  });

  $("#saveSettingsBtn").addEventListener("click", () => {
    const target = state.role === "driver" ? state.driver : state.user;
    const email = $("#settingsEmail").value.trim();
    if (email && isInstitutionalEmail(email)) syncUserFromEmail(email);
    target.name = $("#settingsName").value.trim() || target.name;
    target.program = $("#settingsProgram").value.trim() || target.program;
    state.user.semester = $("#settingsSemester").value;
    const activePayment = $(".pill-group[data-setting='payment'] .pill.active");
    if (activePayment) state.user.payment = activePayment.textContent;
    renderAll();
    closeModal();
    toast("Configuración actualizada");
  });

  $("#deleteAccountBtn").addEventListener("click", () => {
    closeModal();
    showScreen("home");
    $$(".screen").forEach((screen) => screen.classList.remove("active"));
    $("#loginScreen").classList.add("active");
    toast("Cuenta local desactivada");
  });
}

function renderContacts() {
  const list = $("#contactList");
  if (!list) return;
  list.innerHTML = "";
  state.sosContacts.forEach((contact) => {
    const item = document.createElement("span");
    item.textContent = contact;
    list.appendChild(item);
  });
}

function openSecurityModal() {
  openTemplate("securityTemplate");
  $("#call123Btn").addEventListener("click", () => {
    window.location.href = "tel:123";
  });
  $("#shareLocationBtn").addEventListener("click", () => {
    const mapsUrl = `https://maps.google.com/?q=${userCoords[0]},${userCoords[1]}`;
    const message = encodeURIComponent(`Estoy usando UNIAJC-RIDE. Esta es mi ubicacion actual: ${mapsUrl}`);
    window.open(`https://wa.me/?text=${message}`, "_blank");
  });
}

function openAssignedDriverProfile() {
  const driver = state.assignedDriver;
  if (!driver) {
    toast("Aún no hay conductor asignado");
    return;
  }
  openModal(`
    <div class="modal-card driver-profile-modal">
      <div class="modal-head">
        <strong>Perfil del conductor</strong>
        <button class="icon-btn close-modal" aria-label="Cerrar"></button>
      </div>
      <div class="driver-profile-hero">
        <img src="${driver.avatar}" alt="" />
        <div>
          <span>Conductor verificado UNIAJC</span>
          <h3>${driver.name}</h3>
          <p>${driver.program}</p>
        </div>
      </div>
      <div class="driver-profile-grid">
        <div><span>Vehículo</span><strong>${driver.vehicle}</strong></div>
        <div><span>Placa</span><strong>${driver.plate}</strong></div>
        <div><span>Licencia</span><strong>${driver.license || "Licencia B1 activa"}</strong></div>
        <div><span>SOAT</span><strong>${driver.soat || "SOAT vigente"}</strong></div>
        <div><span>Tecnomecanica</span><strong>${driver.techReview || "Al dia"}</strong></div>
        <div><span>Estado</span><strong>${driver.status || "Activo"}</strong></div>
        <div><span>Rating</span><strong>${driver.rating}</strong></div>
        <div><span>Experiencia</span><strong>${driver.trips}</strong></div>
      </div>
      <div class="driver-profile-route">
        <strong>Ruta compartida</strong>
        <span>${driver.route}</span>
      </div>
    </div>`);
}

function openStudentProfileModal(student) {
  const accepted = state.driverAcceptedStudents.includes(student.initials);
  openModal(`
    <div class="modal-card driver-profile-modal">
      <div class="modal-head">
        <strong>Perfil del estudiante</strong>
        <button class="icon-btn close-modal" aria-label="Cerrar"></button>
      </div>
      <div class="driver-profile-hero">
        <img src="${avatarSvg("#52f4ff", "#2878ff", student.initials)}" alt="" />
        <div>
          <span>Estudiante verificado UNIAJC</span>
          <h3>${student.name}</h3>
          <p>${student.program}</p>
        </div>
      </div>
      <div class="driver-profile-grid">
        <div><span>Semestre</span><strong>${student.semester}</strong></div>
        <div><span>Estado</span><strong>Activo</strong></div>
        <div><span>Correo</span><strong>${student.email}</strong></div>
        <div><span>Telefono</span><strong>${student.phone}</strong></div>
        <div><span>Rating</span><strong>${student.rating}</strong></div>
        <div><span>Historial</span><strong>${student.trips}</strong></div>
      </div>
      <div class="driver-profile-route">
        <strong>Solicitud de viaje</strong>
        <span>${student.address} -> ${student.destination}</span>
      </div>
      <button class="primary-action" id="acceptStudentFromModal" ${accepted ? "disabled" : ""}>${accepted ? "Solicitud aceptada" : "Aceptar estudiante"}</button>
    </div>`);

  const acceptButton = $("#acceptStudentFromModal");
  if (!acceptButton || accepted) return;
  acceptButton.addEventListener("click", () => {
    if (!state.driverAcceptedStudents.includes(student.initials)) state.driverAcceptedStudents.push(student.initials);
    state.acceptedPassenger = student.name;
    closeModal();
    renderAll();
    toast(`Solicitud aceptada: ${student.name}`);
  });
}

function bindPillGroups(root = document) {
  const groups = root.matches?.(".pill-group") ? [root] : $$(".pill-group", root);
  groups.forEach((group) => {
    $$(".pill", group).forEach((pill) => {
      pill.addEventListener("click", () => {
        $$(".pill", group).forEach((item) => item.classList.remove("active"));
        pill.classList.add("active");
      });
    });
  });
}

function openTemplate(templateId) {
  const template = $(`#${templateId}`);
  openModal(template.innerHTML);
}

function openModal(html) {
  const layer = $("#modalLayer");
  layer.innerHTML = html;
  layer.classList.remove("search-mode");
  layer.classList.add("active");
  layer.setAttribute("aria-hidden", "false");
  state.modalOpen = true;
  $$(".close-modal", layer).forEach((button) => button.addEventListener("click", () => closeModal()));
}

function closeModal(showToast = true) {
  const layer = $("#modalLayer");
  layer.classList.remove("active");
  layer.classList.remove("search-mode");
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = "";
  state.modalOpen = false;
  if (showToast) renderAll();
}

function toast(message) {
  const existing = $(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  window.setTimeout(() => el.remove(), 2400);
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function initRideMap() {
  if (rideMap || !window.L || !$("#rideMap")) return;

  rideMap = L.map("rideMap", {
    zoomControl: false,
    attributionControl: false,
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: false,
  }).setView(userCoords, 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(rideMap);

  rideMap.on("dragstart zoomstart", () => {
    rideMapUserAdjusted = true;
  });
}

function resetRideMapAutoFit() {
  rideMapFitKey = "";
  rideMapUserAdjusted = false;
}

function ensureRideMapReady() {
  if (!window.L || !$("#rideMap")) return;
  initRideMap();
  const refresh = () => {
    if (!rideMap) return;
    rideMap.invalidateSize(true);
    drawRideMapRoute(Boolean(state.selectedDestination));
  };
  refresh();
  requestAnimationFrame(refresh);
  window.setTimeout(refresh, 140);
  window.setTimeout(refresh, 520);
}

function createMapIcon(label, type = "default") {
  return L.divIcon({
    className: "",
    html: `<div class="map-marker ${type}">${label}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

function destinationMarkerLabel(destination) {
  return /uniajc|campus/i.test(destination?.name || "") ? "U" : "FIN";
}

function geoRoute(destination = state.selectedDestination) {
  const end = destination?.coords || destinations.find((item) => item.name === "San Fernando").coords;
  const midpoint = [
    (userCoords[0] + end[0]) / 2 + 0.008,
    (userCoords[1] + end[1]) / 2 - 0.006,
  ];
  return [userCoords, midpoint, end];
}

async function fetchRoadRoute(from, to) {
  if (!to) return null;
  const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo calcular la ruta");
    const data = await response.json();
    const coordinates = data.routes?.[0]?.geometry?.coordinates || [];
    if (!coordinates.length) return null;
    return coordinates.map(([lng, lat]) => [lat, lng]);
  } catch (error) {
    console.warn("OSRM route fallback:", error);
    return null;
  }
}

async function fetchRoadRouteThrough(points) {
  if (!points?.length || points.length < 2) return null;
  const coords = points.map(([lat, lng]) => `${lng},${lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo calcular la ruta con paradas");
    const data = await response.json();
    const coordinates = data.routes?.[0]?.geometry?.coordinates || [];
    if (!coordinates.length) return null;
    return coordinates.map(([lng, lat]) => [lat, lng]);
  } catch (error) {
    console.warn("OSRM multi-stop route fallback:", error);
    return null;
  }
}

async function initDriverRoadRoutes() {
  const routes = await Promise.all(driverMapMarkers.map((driver) => fetchRoadRoute(driver.coords, driver.end)));
  driverMapMarkers.forEach((driver, index) => {
    if (routes[index]?.length) {
      driver.route = routes[index];
      return;
    }
    const midpoint = [
      (driver.coords[0] + driver.end[0]) / 2 + 0.004,
      (driver.coords[1] + driver.end[1]) / 2 - 0.004,
    ];
    driver.route = [driver.coords, midpoint, driver.end];
  });
}

function drawRideMapRoute(showRoute = Boolean(state.selectedDestination)) {
  if (!rideMap || !window.L) return;
  Object.values(rideMapLayers).forEach((layer) => rideMap.removeLayer(layer));
  rideMapLayers = {};

  const destination = state.role === "driver" ? state.driverDestination : state.selectedDestination;
  const isDriverRouteVisible = state.role === "driver" && (state.driverRoutePublished || state.driverRouteCompleted);
  const route = isDriverRouteVisible
    ? state.driverRoute
    : state.phase === "pickup"
      ? state.pickupRoute || state.activeRoute
      : ["readyStart", "trip"].includes(state.phase)
        ? state.roadRoute || state.activeRoute
        : state.roadRoute || (destination ? geoRoute(destination) : null);
  const shouldShowRoute = Boolean(showRoute || ["pickup", "readyStart", "trip"].includes(state.phase) || isDriverRouteVisible);

  const routeProgress = isDriverRouteVisible ? state.driverRouteProgress : state.routeProgress;
  const visibleRoute = (["pickup", "trip"].includes(state.phase) || isDriverRouteVisible) && route?.length
    ? routeFromProgress(route, routeProgress)
    : route;

  if (shouldShowRoute && visibleRoute) {
    rideMapLayers.routeGlow = L.polyline(visibleRoute, {
      color: "#37e7ff",
      weight: 11,
      opacity: 0.18,
      lineCap: "round",
    }).addTo(rideMap);

    rideMapLayers.route = L.polyline(visibleRoute, {
      color: "#52f4ff",
      weight: 6,
      opacity: 0.96,
      dashArray: "12 12",
      lineCap: "round",
    }).addTo(rideMap);
  }

  const isDriverMap = state.role === "driver";
  const userPosition = isDriverMap && isDriverRouteVisible && route?.length
    ? pointOnGeoRoute(route, state.driverRouteProgress)
    : state.phase === "trip" && route?.length
      ? pointOnGeoRoute(route, state.routeProgress)
      : userCoords;
  const selfInitials = isDriverMap ? initialsFromName(state.driver.name) : initialsFromName(state.user.name);
  rideMapLayers.user = L.marker(userPosition, { icon: createMapIcon(`${selfInitials}<br><small>${isDriverMap ? "Yo" : "Tú"}</small>`, isDriverMap ? "driver active-car" : "user") }).addTo(rideMap);
  if (destination?.coords && state.phase !== "pickup") {
    rideMapLayers.destination = L.marker(destination.coords, { icon: createMapIcon(destinationMarkerLabel(destination), "destination") }).addTo(rideMap);
  }

  if (isDriverRouteVisible) {
    driverPickupStudents.forEach((student, index) => {
      const picked = state.driverRouteProgress >= student.progress;
      rideMapLayers[`pickupStop${index}`] = L.marker(student.coords, { icon: createMapIcon(picked ? "✓" : student.initials, picked ? "pickup picked" : "pickup") }).addTo(rideMap);
    });
    if (state.driverDestination?.coords && state.driverRouteMode !== "home") {
      rideMapLayers.driverDestination = L.marker(state.driverDestination.coords, { icon: createMapIcon(destinationMarkerLabel(state.driverDestination), "destination") }).addTo(rideMap);
    }
  }

  if (state.role === "passenger" && ["readyStart", "trip"].includes(state.phase)) {
    const stops = state.carpool.pickups?.length ? state.carpool.pickups : state.carpool.futureStops;
    stops.forEach((stop, index) => {
      if (!stop.coords) return;
      const picked = state.phase === "trip" && index < state.carpool.stopIndex;
      const label = picked ? "✓" : stop.initials || index + 1;
      rideMapLayers[`passengerStop${index}`] = L.marker(stop.coords, { icon: createMapIcon(label, picked ? "pickup picked" : "pickup") }).addTo(rideMap);
    });
  }

  if (!isDriverMap) {
    driverMapMarkers.forEach((driver, index) => {
      if (["pickup", "readyStart", "trip"].includes(state.phase) && index === state.activeDriverIndex) return;
      const routePosition = driver.route ? pointOnGeoRoute(driver.route, driver.progress) : driver.coords;
      const marker = L.marker(routePosition, { icon: createMapIcon(driver.label, "driver") }).addTo(rideMap);
      rideMapLayers[`driver${index}`] = marker;
    });
  }

  if (["pickup", "trip"].includes(state.phase) && route?.length) {
    const iconType = "driver active-car";
    const label = state.activeDriverLabel;
    rideMapLayers.tripCar = L.marker(pointOnGeoRoute(route, state.routeProgress), { icon: createMapIcon(label, iconType) }).addTo(rideMap);
  }

  if (visibleRoute) {
    const fitKey = rideMapRouteFitKey(route);
    if (!rideMapUserAdjusted && fitKey !== rideMapFitKey) {
      rideMapFitKey = fitKey;
      rideMap.fitBounds(L.latLngBounds(visibleRoute), {
        paddingTopLeft: [48, 115],
        paddingBottomRight: [48, 335],
        animate: false,
      });
    }
  } else {
    const fitKey = "idle";
    if (!rideMapUserAdjusted && fitKey !== rideMapFitKey) {
      rideMapFitKey = fitKey;
      rideMap.setView(userCoords, 13);
    }
  }
}

function rideMapRouteFitKey(route) {
  const destination = state.selectedDestination;
  const first = route?.[0]?.map((value) => value.toFixed(4)).join(",");
  const last = route?.[route.length - 1]?.map((value) => value.toFixed(4)).join(",");
  return [
    state.role,
    state.phase,
    destination?.name || "no-destination",
    state.activeDriverLabel,
    route?.length || 0,
    first,
    last,
  ].join("|");
}

function updateLeafletMotion(dt) {
  driverMapMarkers.forEach((driver, index) => {
    const marker = rideMapLayers[`driver${index}`];
    if (!marker || !driver.route) return;
    driver.progress = (driver.progress + dt * driver.speed) % 1;
    marker.setLatLng(pointOnGeoRoute(driver.route, driver.progress));
  });
  if (rideMapLayers.tripCar && ["pickup", "trip"].includes(state.phase)) {
    const route = state.phase === "pickup" ? state.pickupRoute || state.activeRoute : state.roadRoute || state.activeRoute;
    if (route?.length) rideMapLayers.tripCar.setLatLng(pointOnGeoRoute(route, state.routeProgress));
  }
  if (state.role === "driver" && state.driverRoutePublished && state.driverRoute?.length) {
    const now = performance.now();
    if (state.driverPausedUntil && now < state.driverPausedUntil) {
      const liveDot = $(".live-dot");
      if (liveDot) liveDot.textContent = "Parada";
      return;
    }
    if (state.driverPausedUntil && now >= state.driverPausedUntil) {
      state.driverPausedUntil = 0;
      state.driverStopMessage = "";
      renderHome();
    }

    const previousPicked = state.driverPickedCount;
    state.driverRouteProgress = Math.min(1, state.driverRouteProgress + dt / 78);
    maybePauseDriverPickup(now);
    state.driverPickedCount = driverPickupStudents.filter((student) => state.driverRouteProgress >= student.progress).length;
    const driverPosition = pointOnGeoRoute(state.driverRoute, state.driverRouteProgress);
    if (rideMapLayers.user) rideMapLayers.user.setLatLng(driverPosition);
    const visibleRoute = routeFromProgress(state.driverRoute, state.driverRouteProgress);
    if (visibleRoute) {
      if (rideMapLayers.route) rideMapLayers.route.setLatLngs(visibleRoute);
      if (rideMapLayers.routeGlow) rideMapLayers.routeGlow.setLatLngs(visibleRoute);
    }
    const liveDot = $(".live-dot");
    if (liveDot) liveDot.textContent = `${state.driverPickedCount}/4`;
    if (previousPicked !== state.driverPickedCount) {
      renderDriverPickupRoute();
      drawRideMapRoute(true);
    }
    if (state.driverRouteProgress >= 1) {
      state.driverRoutePublished = false;
      state.driverRouteCompleted = true;
      state.driverPickedCount = driverPickupStudents.length;
      renderAll();
      drawRideMapRoute(true);
      toast("Ruta finalizada");
    }
  }
}

function maybePauseDriverPickup(now) {
  const stops = [...driverPickupStudents].sort((a, b) => a.progress - b.progress);
  if (state.driverStopIndex >= stops.length) return;
  const stop = stops[state.driverStopIndex];
  if (state.driverRouteProgress < stop.progress) return;
  state.driverStopIndex += 1;
  state.driverPausedUntil = now + 2600;
  state.driverStopMessage = `Recogiendo a ${stop.name.split(" ")[0]}`;
  toast(`${stop.name.split(" ")[0]} se subió al viaje`);
}

function pointOnGeoRoute(points, progress) {
  const lengths = [];
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    const len = distance(points[index - 1], points[index]);
    lengths.push(len);
    total += len;
  }

  let target = progress * total;
  for (let index = 0; index < lengths.length; index += 1) {
    if (target <= lengths[index]) {
      const a = points[index];
      const b = points[index + 1];
      const local = lengths[index] === 0 ? 0 : target / lengths[index];
      return [a[0] + (b[0] - a[0]) * local, a[1] + (b[1] - a[1]) * local];
    }
    target -= lengths[index];
  }
  return points[points.length - 1];
}

function routeFromProgress(points, progress) {
  if (!points?.length) return null;
  const current = pointOnGeoRoute(points, progress);
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  points.forEach((point, index) => {
    const dist = distance(point, current);
    if (dist < bestDistance) {
      bestDistance = dist;
      bestIndex = index;
    }
  });
  return [current, ...points.slice(Math.min(bestIndex + 1, points.length - 1))];
}

function polylineKm(points) {
  let km = 0;
  for (let index = 1; index < points.length; index += 1) {
    km += haversineKm(points[index - 1], points[index]);
  }
  return km;
}

function assignStopProgresses(route, stops) {
  if (!route?.length || !stops?.length) return [];
  let searchFrom = 0;
  const cumulative = [0];
  let total = 0;
  for (let index = 1; index < route.length; index += 1) {
    total += distance(route[index - 1], route[index]);
    cumulative[index] = total;
  }
  return stops.map((stop, index) => {
    let bestIndex = searchFrom;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (let pointIndex = searchFrom; pointIndex < route.length; pointIndex += 1) {
      const dist = haversineKm(route[pointIndex], stop.coords);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestIndex = pointIndex;
      }
    }
    searchFrom = Math.max(bestIndex, searchFrom);
    const fallback = ((index + 1) / (stops.length + 1)) * 0.88;
    const progress = total > 0 ? cumulative[bestIndex] / total : fallback;
    return {
      ...stop,
      progress: Math.min(0.94, Math.max(0.05, Number.isFinite(progress) ? progress : fallback)),
    };
  });
}

function haversineKm(from, to) {
  const earthRadius = 6371;
  const toRad = (value) => (value * Math.PI) / 180;
  const dLat = toRad(to[0] - from[0]);
  const dLng = toRad(to[1] - from[1]);
  const lat1 = toRad(from[0]);
  const lat2 = toRad(to[0]);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function drawFrame(now) {
  const dt = Math.min(64, now - lastFrame) / 1000;
  lastFrame = now;
  updateMotion(dt);
  drawMap();
  requestAnimationFrame(drawFrame);
}

function updateMotion(dt) {
  drivers.forEach((driver) => {
    driver.offset = (driver.offset + driver.speed * dt) % 1;
  });
  if (["pickup", "trip"].includes(state.phase) && state.activeRoute) {
    updateActiveVehicleMarker();
  }
  updateLeafletMotion(dt);
}

function drawMap() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);
  const grd = ctx.createLinearGradient(0, 0, w, h);
  grd.addColorStop(0, "#06111e");
  grd.addColorStop(0.54, "#081322");
  grd.addColorStop(1, "#03070f");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  drawDistricts(w, h);
  drawRoads(w, h);
  drawLabels(w, h);
  drawRoute(w, h);
  drawUser(w, h);
  drawDrivers(w, h);
}

function drawDistricts(w, h) {
  ctx.save();
  ctx.globalAlpha = 0.18;
  const blocks = [
    [0.04, 0.17, 0.24, 0.18],
    [0.32, 0.12, 0.27, 0.16],
    [0.66, 0.12, 0.22, 0.18],
    [0.08, 0.45, 0.24, 0.2],
    [0.38, 0.42, 0.22, 0.16],
    [0.68, 0.42, 0.24, 0.18],
    [0.12, 0.72, 0.25, 0.16],
    [0.56, 0.74, 0.32, 0.14],
  ];
  blocks.forEach((block, index) => {
    ctx.fillStyle = index % 2 ? "#122441" : "#0f2f3a";
    roundRect(block[0] * w, block[1] * h, block[2] * w, block[3] * h, 18);
    ctx.fill();
  });
  ctx.restore();
}

function drawRoads(w, h) {
  const roads = [
    [[0.13, 0.2], [0.25, 0.25], [0.37, 0.33], [0.55, 0.38], [0.71, 0.47], [0.86, 0.62]],
    [[0.75, 0.12], [0.65, 0.25], [0.56, 0.39], [0.48, 0.52], [0.42, 0.68], [0.36, 0.84]],
    [[0.1, 0.77], [0.23, 0.67], [0.35, 0.58], [0.51, 0.52], [0.67, 0.48], [0.88, 0.43]],
    [[0.2, 0.1], [0.29, 0.26], [0.35, 0.43], [0.46, 0.58], [0.57, 0.63], [0.74, 0.73], [0.84, 0.86]],
    [[0.06, 0.38], [0.21, 0.4], [0.35, 0.45], [0.48, 0.52], [0.62, 0.55], [0.8, 0.56]],
  ];
  roads.forEach((road) => {
    drawPath(road, w, h, "rgba(21, 33, 56, 0.95)", 18);
    drawPath(road, w, h, "rgba(82, 244, 255, 0.16)", 2);
  });

  ctx.save();
  ctx.setLineDash([10, 16]);
  roads.forEach((road) => drawPath(road, w, h, "rgba(226, 246, 255, 0.16)", 1));
  ctx.restore();
}

function drawLabels(w, h) {
  ctx.save();
  ctx.font = "700 11px Inter, Arial";
  ctx.fillStyle = "rgba(238, 247, 255, 0.62)";
  [
    ["Chipichape", 0.67, 0.2],
    ["San Fernando", 0.58, 0.53],
    ["UNIAJC", 0.5, 0.7],
    ["Calle 5", 0.74, 0.76],
    ["Cali", 0.13, 0.58],
  ].forEach(([label, x, y]) => ctx.fillText(label, x * w, y * h));
  ctx.restore();
}

function drawRoute(w, h) {
  if (!state.activeRoute) return;
  drawPath(state.activeRoute, w, h, "rgba(69, 255, 154, 0.25)", 12);
  drawPath(state.activeRoute, w, h, "#45ff9a", 4);

  if (state.selectedDestination) {
    const [x, y] = state.selectedDestination.point;
    drawPin(x * w, y * h, "#45ff9a");
  }

  if (["pickup", "trip"].includes(state.phase)) {
    const pos = pointOnPath(state.activeRoute, state.routeProgress);
    const next = pointOnPath(state.activeRoute, Math.min(1, state.routeProgress + 0.01));
    drawCar(pos[0] * w, pos[1] * h, Math.atan2(next[1] - pos[1], next[0] - pos[0]), "#52f4ff");
  }
}

function drawUser(w, h) {
  const x = 0.48 * w;
  const y = 0.68 * h;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, 18, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(82, 244, 255, 0.16)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2);
  ctx.fillStyle = "#52f4ff";
  ctx.shadowColor = "#52f4ff";
  ctx.shadowBlur = 18;
  ctx.fill();
  ctx.restore();
}

function drawDrivers(w, h) {
  if (state.phase === "trip") return;
  drivers.forEach((driver, index) => {
    const pos = pointOnPath(driver.path, driver.offset);
    const next = pointOnPath(driver.path, (driver.offset + 0.012) % 1);
    drawCar(pos[0] * w, pos[1] * h, Math.atan2(next[1] - pos[1], next[0] - pos[0]), index === 1 ? "#45ff9a" : "#2878ff");
  });
}

function drawPath(points, w, h, color, width) {
  ctx.save();
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    if (index === 0) ctx.moveTo(x * w, y * h);
    else ctx.lineTo(x * w, y * h);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
  ctx.restore();
}

function drawCar(x, y, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.fillStyle = color;
  roundRect(-11, -6, 22, 12, 5);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255,255,255,.86)";
  roundRect(-2, -4, 8, 8, 3);
  ctx.fill();
  ctx.restore();
}

function drawPin(x, y, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(0, -7, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-7, -1);
  ctx.lineTo(7, -1);
  ctx.lineTo(0, 13);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function pointOnPath(points, t) {
  const lengths = [];
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const len = distance(points[i - 1], points[i]);
    lengths.push(len);
    total += len;
  }
  let target = ((t % 1) + 1) % 1 * total;
  if (t >= 1) target = total;
  for (let i = 0; i < lengths.length; i += 1) {
    if (target <= lengths[i]) {
      const a = points[i];
      const b = points[i + 1];
      const local = lengths[i] === 0 ? 0 : target / lengths[i];
      return [a[0] + (b[0] - a[0]) * local, a[1] + (b[1] - a[1]) * local];
    }
    target -= lengths[i];
  }
  return points[points.length - 1];
}

function distance(a, b) {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function roundRect(x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

init();
