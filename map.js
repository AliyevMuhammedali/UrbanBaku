// ===== Инициализация карты на Баку =====
const map = L.map('map', {
  center: [40.4093, 49.8671],
  zoom: 13
});

// ===== Базовые слои =====

// Улицы (OSM)
const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
});

// Спутник (Esri)
const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles © Esri'
});

// Тёмная тема (CartoDB Dark)
const dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  attribution: '&copy; CartoDB',
  subdomains: 'abcd'
});

// Добавим слой по умолчанию
streets.addTo(map);

// ===== Переключатель слоёв =====
const baseLayers = {
  "🗺 Улицы": streets,
  "🛰 Спутник": satellite,
  "🌙 Тёмная тема": dark
};
L.control.layers(baseLayers).addTo(map);

// ===== Загрузка и отображение GeoJSON =====
fetch('data/locations.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.description || ''}`);
        }
      }
    }).addTo(map);
  })
  .catch(error => console.error("Ошибка загрузки GeoJSON:", error));
