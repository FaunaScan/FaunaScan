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

  document.querySelectorAll('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      chip.classList.toggle('chip--active');
    });
  });

  const btnGeo = document.getElementById('btnGeolocate');
  const latInput = document.getElementById('latitud');
  const lngInput = document.getElementById('longitud');
  if (btnGeo && latInput && lngInput) {
    btnGeo.addEventListener('click', function () {
      if (!navigator.geolocation) return;
      btnGeo.textContent = 'Obteniendo...';
      navigator.geolocation.getCurrentPosition(function (pos) {
        latInput.value = pos.coords.latitude.toFixed(6);
        lngInput.value = pos.coords.longitude.toFixed(6);
        btnGeo.textContent = '📍 Usar mi ubicación';
      }, function () {
        btnGeo.textContent = '📍 Usar mi ubicación';
      });
    });
  }

  const btnGuardar = document.getElementById('btnGuardar');
  if (btnGuardar) {
    btnGuardar.addEventListener('click', function () {
      btnGuardar.textContent = 'Guardando...';
      btnGuardar.disabled = true;
      setTimeout(function () {
        window.location.href = 'historial.html';
      }, 800);
    });
  }
});
