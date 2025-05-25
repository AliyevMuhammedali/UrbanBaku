// Центр карты — Баку
const map = L.map('map', {
  center: [40.4093, 49.8671],
  zoom: 13
});

// ===== Базовые слои =====

// Спутник без подписей
const satellite = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye',
    maxZoom: 19
  }
);

// Уличная карта от OSM
const streets = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }
);

// По умолчанию — спутник
satellite.addTo(map);

// Переключатель между слоями
const baseMaps = {
  "Спутник": satellite,
  "Улицы": streets
};
L.control.layers(baseMaps).addTo(map);

// ===== Метки из GeoJSON =====

fetch('data/locations.geojson')
  .then(res => {
    if (!res.ok) throw new Error("Не удалось загрузить locations.geojson");
    return res.json();
  })
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const name = feature.properties?.name || "Без названия";
        const description = feature.properties?.description || "";
        layer.bindPopup(`<strong>${name}</strong><br>${description}`);
      },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
      }
    }).addTo(map);
  })
  .catch(err => console.error("Ошибка загрузки GeoJSON:", err));
