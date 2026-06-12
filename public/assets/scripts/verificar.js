document.addEventListener('DOMContentLoaded', function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar__link').forEach(function (link) {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });

  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  if (toggle && sidebar) {
    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      overlay && overlay.classList.toggle('open');
    });
    overlay && overlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  document.querySelectorAll('.btn-validate').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.verificar-item');
      const badge = item && item.querySelector('.verificar-item__badge');
      if (badge) {
        badge.textContent = 'VALIDADO';
        badge.className = 'badge badge-green verificar-item__badge';
      }
      btn.disabled = true;
      const reject = item && item.querySelector('.btn-reject');
      if (reject) reject.disabled = true;
    });
  });

  document.querySelectorAll('.btn-reject').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.verificar-item');
      if (item) item.classList.add('dimmed');
      const badge = item && item.querySelector('.verificar-item__badge');
      if (badge) {
        badge.textContent = 'RECHAZADO';
        badge.className = 'badge badge-gray verificar-item__badge';
      }
      btn.disabled = true;
      const validate = item && item.querySelector('.btn-validate');
      if (validate) validate.disabled = true;
    });
  });
});
