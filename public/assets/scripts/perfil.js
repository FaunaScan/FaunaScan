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

  const user = JSON.parse(localStorage.getItem('faunaUser') || 'null');
  if (user) {
    const avatar = document.getElementById('perfilAvatar');
    const nameEl = document.getElementById('perfilName');
    const emailEl = document.getElementById('perfilEmail');
    const initials = ((user.nombre || '')[0] || '') + ((user.apellido || '')[0] || '');
    if (avatar) avatar.textContent = initials.toUpperCase() || '?';
    if (nameEl) nameEl.textContent = (user.nombre || '') + ' ' + (user.apellido || '');
    if (emailEl) emailEl.textContent = user.email || '';
  }

  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', function () {
      localStorage.removeItem('faunaUser');
      window.location.href = 'login.html';
    });
  }
});
