document.addEventListener('DOMContentLoaded', function () {

  function showError(input, msg) {
    clearError(input);
    input.style.borderColor = '#c0392b';
    var err = document.createElement('span');
    err.style.cssText = 'font-size:0.8rem;color:#c0392b;margin-top:4px;display:block;';
    err.textContent = msg;
    input.parentElement.appendChild(err);
  }

  function clearError(input) {
    input.style.borderColor = '';
    var e = input.parentElement.querySelector('span');
    if (e && e.style.color === 'rgb(192, 57, 43)') e.remove();
  }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  var form = document.querySelector('#recoveryForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = form.querySelector('#recoveryEmail');
    clearError(email);

    if (!validEmail(email.value.trim())) {
      showError(email, 'Ingresa un correo electrónico válido.');
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando…';
    btn.disabled = true;
    setTimeout(function () { window.location.href = 'login.html'; }, 1500);
  });
});
