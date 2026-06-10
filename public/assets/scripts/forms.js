// forms.js — Form validation and UI interactions

export function initForms() {
  initLoginForm();
  initRegisterForm();
  initRecoveryForm();
  initRoleSelector();
}

function showError(input, message) {
  clearError(input);
  input.style.borderColor = 'var(--color-red)';
  const err = document.createElement('span');
  err.className = 'form-error';
  err.style.cssText = 'font-size:0.8rem;color:var(--color-red);margin-top:4px;display:block;';
  err.textContent = message;
  input.parentElement.appendChild(err);
}

function clearError(input) {
  input.style.borderColor = '';
  const existing = input.parentElement.querySelector('.form-error');
  existing?.remove();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Login form
function initLoginForm() {
  const form = document.querySelector('#loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const email = form.querySelector('#loginEmail');
    const password = form.querySelector('#loginPassword');

    clearError(email);
    clearError(password);

    if (!isValidEmail(email.value.trim())) {
      showError(email, 'Ingresa un correo electrónico válido.');
      valid = false;
    }

    if (password.value.length < 6) {
      showError(password, 'La contraseña debe tener al menos 6 caracteres.');
      valid = false;
    }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Iniciando sesión…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Iniciar sesión';
        btn.disabled = false;
      }, 2000);
    }
  });
}

// Register form
function initRegisterForm() {
  const form = document.querySelector('#registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const nombre = form.querySelector('#regNombre');
    const apellido = form.querySelector('#regApellido');
    const email = form.querySelector('#regEmail');
    const password = form.querySelector('#regPassword');
    const confirm = form.querySelector('#regConfirm');
    const terms = form.querySelector('#regTerms');

    [nombre, apellido, email, password, confirm].forEach(clearError);

    if (!nombre.value.trim()) { showError(nombre, 'El nombre es obligatorio.'); valid = false; }
    if (!apellido.value.trim()) { showError(apellido, 'El apellido es obligatorio.'); valid = false; }
    if (!isValidEmail(email.value.trim())) { showError(email, 'Correo electrónico inválido.'); valid = false; }
    if (password.value.length < 8) { showError(password, 'Mínimo 8 caracteres.'); valid = false; }
    if (confirm.value !== password.value) { showError(confirm, 'Las contraseñas no coinciden.'); valid = false; }
    if (!terms?.checked) { valid = false; }

    if (valid) {
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Creando cuenta…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Crear cuenta';
        btn.disabled = false;
      }, 2000);
    }
  });
}

// Recovery form
function initRecoveryForm() {
  const form = document.querySelector('#recoveryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('#recoveryEmail');
    clearError(email);

    if (!isValidEmail(email.value.trim())) {
      showError(email, 'Ingresa un correo electrónico válido.');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Enviar código de recuperación';
      btn.disabled = false;
    }, 2000);
  });
}

// Role selector
function initRoleSelector() {
  const cards = document.querySelectorAll('.role-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });
}