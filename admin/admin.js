/* global sessionStorage */

const API_BASE = 'https://api.estudioe.eu';

// ─── State ────────────────────────────────────────────────────────────────────
let currentTemplate = 'customer';
let currentDevice   = 'desktop';
let previewToken    = sessionStorage.getItem('preview_token') || '';
let lastPreviewUrl  = '';

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const tokenGate      = document.getElementById('token-gate');
const app            = document.getElementById('app');
const gateForm       = document.getElementById('gate-form');
const gateTokenInput = document.getElementById('gate-token');
const gateError      = document.getElementById('gate-error');

const tabs              = document.querySelectorAll('.tab');
const fieldContacto     = document.getElementById('field-contacto');
const fieldPropuesta    = document.getElementById('field-propuesta');
const fNombre           = document.getElementById('f-nombre');
const fContacto         = document.getElementById('f-contacto');
const fPropuesta        = document.getElementById('f-propuesta');

const btnPreview        = document.getElementById('btn-preview');
const btnSend           = document.getElementById('btn-send');
const btnLogout         = document.getElementById('btn-logout');
const btnOpenTab        = document.getElementById('btn-open-tab');
const previewSpinner    = document.getElementById('preview-spinner');
const sendSpinner       = document.getElementById('send-spinner');
const sendStatus        = document.getElementById('send-status');
const previewIframe     = document.getElementById('preview-iframe');
const frameContainer    = document.getElementById('frame-container');
const previewLabel      = document.getElementById('preview-label');
const deviceBtns        = document.querySelectorAll('.device-btn');

// ─── Init ─────────────────────────────────────────────────────────────────────
if (previewToken) {
  showApp();
} else {
  showGate();
}

// ─── Gate ─────────────────────────────────────────────────────────────────────
function showGate() {
  tokenGate.hidden = false;
  app.hidden = true;
  document.body.classList.add('gate-open');
}

function showApp() {
  tokenGate.hidden = true;
  app.hidden = false;
  document.body.classList.remove('gate-open');
  loadPreview();
}

gateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = gateTokenInput.value.trim();
  if (!token) return;

  gateError.textContent = '';
  gateTokenInput.disabled = true;

  // Validate by hitting the preview endpoint
  try {
    const res = await fetch(
      `${API_BASE}/preview?t=${encodeURIComponent(token)}&template=customer&nombre=Test`,
      { method: 'GET' }
    );

    if (res.status === 401) {
      gateError.textContent = 'Token incorrecto. Inténtalo de nuevo.';
      gateTokenInput.disabled = false;
      gateTokenInput.select();
      return;
    }

    previewToken = token;
    sessionStorage.setItem('preview_token', token);
    gateTokenInput.disabled = false;
    showApp();
  } catch {
    gateError.textContent = 'Error de conexión con la API.';
    gateTokenInput.disabled = false;
  }
});

btnLogout.addEventListener('click', () => {
  sessionStorage.removeItem('preview_token');
  previewToken = '';
  gateTokenInput.value = '';
  gateError.textContent = '';
  showGate();
});

// ─── Template tabs ────────────────────────────────────────────────────────────
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    currentTemplate = tab.dataset.template;

    const isTeam = currentTemplate === 'team';
    fieldContacto.classList.toggle('visible', isTeam);
    fieldPropuesta.classList.toggle('visible', isTeam);

    previewLabel.textContent = isTeam
      ? 'Vista previa · Email al equipo'
      : 'Vista previa · Email al cliente';

    loadPreview();
  });
});

// ─── Device switcher ──────────────────────────────────────────────────────────
deviceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    deviceBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDevice = btn.dataset.device;

    frameContainer.classList.remove('mobile', 'tablet', 'desktop');
    if (currentDevice !== 'desktop') {
      frameContainer.classList.add(currentDevice);
    }
  });
});

// ─── Preview ──────────────────────────────────────────────────────────────────
btnPreview.addEventListener('click', loadPreview);

// Also auto-reload on field blur (after user finishes editing)
[fNombre, fContacto, fPropuesta].forEach(el => {
  el.addEventListener('change', loadPreview);
});

async function loadPreview() {
  const params = new URLSearchParams({
    t:        previewToken,
    template: currentTemplate,
    nombre:   fNombre.value.trim()   || 'Ana García',
    contacto: fContacto.value.trim() || 'ana@ejemplo.com',
    propuesta: fPropuesta.value.trim() ||
      'Me gustaría renovar completamente el salón principal de mi apartamento.',
  });

  const url = `${API_BASE}/preview?${params}`;
  lastPreviewUrl = url;

  setLoading(true, 'preview');

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    injectPreview(html);
  } catch (err) {
    previewIframe.srcdoc = errorPage(err.message);
  } finally {
    setLoading(false, 'preview');
  }
}

function injectPreview(html) {
  previewIframe.srcdoc = html;

  // Auto-resize iframe to content height after render
  previewIframe.onload = () => {
    try {
      const h = previewIframe.contentDocument.documentElement.scrollHeight;
      if (h > 0) previewIframe.style.height = h + 'px';
    } catch {
      previewIframe.style.height = '700px';
    }
  };
}

// ─── Open in new tab ──────────────────────────────────────────────────────────
btnOpenTab.addEventListener('click', () => {
  if (lastPreviewUrl) window.open(lastPreviewUrl, '_blank', 'noopener');
});

// ─── Test send ────────────────────────────────────────────────────────────────
btnSend.addEventListener('click', async () => {
  const nombre         = fNombre.value.trim()    || 'Ana García';
  const contacto       = fContacto.value.trim()  || 'ana@ejemplo.com';
  const transformacion = fPropuesta.value.trim()  ||
    'Me gustaría renovar completamente el salón principal de mi apartamento.';

  setLoading(true, 'send');
  showStatus('');

  try {
    const res = await fetch(`${API_BASE}/test-send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: previewToken, nombre, contacto, transformacion }),
    });

    const data = await res.json();

    if (!res.ok) {
      showStatus(data.error || 'Error al enviar', 'err');
    } else {
      showStatus('Emails enviados correctamente', 'ok');
    }
  } catch (err) {
    showStatus('Error de conexión: ' + err.message, 'err');
  } finally {
    setLoading(false, 'send');
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function setLoading(on, type) {
  if (type === 'preview') {
    previewSpinner.style.display = on ? 'inline-block' : 'none';
    btnPreview.disabled = on;
  } else {
    sendSpinner.style.display = on ? 'inline-block' : 'none';
    btnSend.disabled = on;
  }
}

function showStatus(msg, type) {
  sendStatus.textContent = msg;
  sendStatus.className = 'send-status ' + (type || '');
  sendStatus.style.display = msg ? 'block' : 'none';
}

function errorPage(msg) {
  return `<!DOCTYPE html><html><body style="background:#1a0a0a;color:#c0392b;
    font-family:monospace;padding:32px;font-size:13px;">
    Error cargando preview: ${msg}</body></html>`;
}
