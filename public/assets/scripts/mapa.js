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

  var map = L.map('mapaLeaflet').setView([-9.19, -75.01], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  var markers = [
    { lat: -12.046, lng: -77.042, especie: 'Jaguar', estado: 'En peligro', emoji: '🐆', zona: 'Lima' },
    { lat: -13.531, lng: -71.967, especie: 'Cóndor Andino', estado: 'Vulnerable', emoji: '🦅', zona: 'Cusco' },
    { lat: -3.749, lng: -73.253, especie: 'Delfín Rosado', estado: 'En peligro', emoji: '🐬', zona: 'Loreto' },
    { lat: -5.194, lng: -80.631, especie: 'Nutria Gigante', estado: 'En peligro crítico', emoji: '🦦', zona: 'Piura' },
    { lat: -8.112, lng: -79.028, especie: 'Oso de Anteojos', estado: 'Vulnerable', emoji: '🐻', zona: 'La Libertad' },
    { lat: -16.409, lng: -71.537, especie: 'Vicuña', estado: 'Estable', emoji: '🦙', zona: 'Arequipa' },
    { lat: -6.771, lng: -79.840, especie: 'Puma', estado: 'Vulnerable', emoji: '🦁', zona: 'Lambayeque' },
    { lat: -4.013, lng: -77.818, especie: 'Tapir Amazónico', estado: 'Vulnerable', emoji: '🐾', zona: 'San Martín' }
  ];

  var colorMap = {
    'En peligro crítico': '#c0392b',
    'En peligro': '#e67e22',
    'Vulnerable': '#f5a623',
    'Estable': '#4caf7d'
  };

  function getIcon(color) {
    return L.divIcon({
      html: '<div style="width:14px;height:14px;background:' + color + ';border:2px solid #fff;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,.4)"></div>',
      className: '',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
  }

  var allMarkerObjects = [];
  markers.forEach(function (m) {
    var color = colorMap[m.estado] || '#888';
    var marker = L.marker([m.lat, m.lng], { icon: getIcon(color) }).addTo(map);
    marker.bindPopup('<strong>' + m.emoji + ' ' + m.especie + '</strong><br><span style="font-size:.8rem;color:#555">' + m.zona + '</span><br><span style="font-size:.8rem;color:' + color + '">' + m.estado + '</span>');
    allMarkerObjects.push({ data: m, marker: marker });
  });

  var especieFilter = document.getElementById('filtroEspecie');
  var estadoFilter = document.getElementById('filtroEstado');

  function applyFilters() {
    var esp = especieFilter ? especieFilter.value.toLowerCase() : '';
    var est = estadoFilter ? estadoFilter.value : '';
    allMarkerObjects.forEach(function (obj) {
      var matchEsp = !esp || obj.data.especie.toLowerCase().includes(esp);
      var matchEst = !est || obj.data.estado === est;
      if (matchEsp && matchEst) {
        map.addLayer(obj.marker);
      } else {
        map.removeLayer(obj.marker);
      }
    });
  }

  especieFilter && especieFilter.addEventListener('input', applyFilters);
  estadoFilter && estadoFilter.addEventListener('change', applyFilters);
});
