// Form state
const formState = {
    nombre: '',
    contacto: '',
    transformacion: '',
    currentScreen: 'intro'
};

const screens = ['intro', 'q1', 'q2', 'q3', 'review', 'loading', 'success', 'error'];
let currentScreenIndex = 0;

// Validation rules
const validationRules = {
    nombre: {
        validate: (val) => val.trim().length >= 2,
        errorMsg: 'El nombre debe tener al menos 2 caracteres'
    },
    contacto: {
        validate: (val) => {
            const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phone = /^(\+34|0034|34)?[\s\-]?[6789]\d{2}[\s\-]?\d{2}[\s\-]?\d{2}[\s\-]?\d{2}$|^(\+\d{1,3})[\s\-]?\d{4,14}$/;
            return email.test(val) || phone.test(val.replace(/[\s\-]/g, ''));
        },
        errorMsg: 'Por favor ingresa un email o teléfono válido'
    },
    transformacion: {
        validate: (val) => val.trim().length >= 10,
        errorMsg: 'La descripción debe tener al menos 10 caracteres'
    }
};

// Progress dots state
// activeStep: 1=q1, 2=q2, 3=q3. 0=hidden
const stepMap = { intro: 0, q1: 1, q2: 2, q3: 3, review: 3, loading: 0, success: 0, error: 0 };

function updateProgress(screenName) {
    const bar = document.getElementById('progress-bar');
    const activeStep = stepMap[screenName] || 0;
    const show = activeStep > 0;

    if (bar) bar.classList.toggle('visible', show);
    if (!show) return;

    for (let i = 1; i <= 3; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (!dot) continue;
        dot.classList.toggle('done', i < activeStep);
        dot.classList.toggle('active', i === activeStep);
    }
    for (let i = 1; i <= 2; i++) {
        const line = document.getElementById(`line-${i}`);
        if (line) line.classList.toggle('done', i < activeStep);
    }
}

// Screen navigation
function goToScreen(screenName) {
    if (!screens.includes(screenName)) return;

    const currentElement = document.getElementById(`screen-${formState.currentScreen}`);
    const nextElement = document.getElementById(`screen-${screenName}`);

    if (currentElement) currentElement.classList.remove('active');
    if (nextElement) nextElement.classList.add('active');

    formState.currentScreen = screenName;
    currentScreenIndex = screens.indexOf(screenName);

    updateProgress(screenName);

    // Auto-focus input when changing to question screens
    setTimeout(() => {
        if (screenName === 'q1') document.getElementById('nombre')?.focus();
        else if (screenName === 'q2') document.getElementById('contacto')?.focus();
        else if (screenName === 'q3') document.getElementById('transformacion')?.focus();
    }, 50);

    // Fill review data when going to review screen
    if (screenName === 'review') {
        document.getElementById('review-nombre').textContent = formState.nombre;
        document.getElementById('review-contacto').textContent = formState.contacto;
        document.getElementById('review-transformacion').textContent = formState.transformacion;
    }
}

function nextScreen() {
    const fieldByScreen = {
        q1: 'nombre',
        q2: 'contacto',
        q3: 'transformacion'
    };
    const field = fieldByScreen[formState.currentScreen];
    if (field && !validateField(field)) return;

    if (currentScreenIndex + 1 < screens.length) {
        goToScreen(screens[currentScreenIndex + 1]);
    }
}

function previousScreen() {
    if (currentScreenIndex > 0) {
        const targetScreen = screens[currentScreenIndex - 1];
        if (targetScreen === 'intro' || targetScreen === 'review') {
            goToScreen(targetScreen);
        } else if (['q1', 'q2', 'q3'].includes(targetScreen)) {
            goToScreen(targetScreen);
        }
    }
}

// Validation
function validateField(field) {
    const input = document.getElementById(field);
    const errorEl = document.getElementById(`error-${field}`);
    const rule = validationRules[field];

    if (!input || !rule) {
        return false;
    }

    const value = input.value.trim();

    if (!rule.validate(value)) {
        if (errorEl) errorEl.textContent = rule.errorMsg;
        input.style.borderBottomColor = 'var(--error)';
        return false;
    }

    if (errorEl) errorEl.textContent = '';
    input.style.borderBottomColor = '';
    formState[field] = value;
    return true;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Start button
    const btnStart = document.getElementById('btn-start');
    if (btnStart) {
        btnStart.addEventListener('click', () => goToScreen('q1'));
    }

    // Next/Back buttons
    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', nextScreen);
    });

    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', previousScreen);
    });

    // Input validation on blur
    ['nombre', 'contacto', 'transformacion'].forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('blur', () => validateField(field));
            input.addEventListener('input', () => {
                const errorEl = document.getElementById(`error-${field}`);
                if (errorEl && errorEl.textContent) {
                    validateField(field);
                }
            });
        }
    });

    // Character counter and Ctrl+Enter for textarea
    const textarea = document.getElementById('transformacion');
    if (textarea) {
        textarea.addEventListener('input', (e) => {
            const count = document.getElementById('char-count');
            if (count) count.textContent = e.target.value.length;
        });
        textarea.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                nextScreen();
            }
        });
    }

    // Enter key to next question (for nombre and contacto)
    ['nombre', 'contacto'].forEach(field => {
        const input = document.getElementById(field);
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    nextScreen();
                }
            });
        }
    });

    // Submit button - directly call submitForm
    document.getElementById('btn-submit')?.addEventListener('click', submitForm);

    // Return to landing
    document.getElementById('btn-return')?.addEventListener('click', () => {
        window.location.href = '/';
    });

    // Retry button
    document.getElementById('btn-retry')?.addEventListener('click', () => {
        goToScreen('intro');
        formState.nombre = '';
        formState.contacto = '';
        formState.transformacion = '';
        document.querySelectorAll('input, textarea').forEach(el => el.value = '');
    });
});

// Submit form
async function submitForm() {
    goToScreen('loading');

    const apiUrl = 'https://api.estudioe.eu/form';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: formState.nombre,
                contacto: formState.contacto,
                transformacion: formState.transformacion
            })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('success-nombre').textContent = formState.nombre;
            goToScreen('success');
        } else {
            showError(data.error || 'Error al enviar el formulario');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showError('Error de conexión. Por favor, intenta de nuevo.');
    }
}

function showError(message) {
    document.getElementById('error-message-text').textContent = message;
    goToScreen('error');
}
