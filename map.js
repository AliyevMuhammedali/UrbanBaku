// Инициализация карты на Баку
const map = L.map('map').setView([40.4093, 49.8671], 13);

// OSM слой
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Загрузка и отображение GeoJSON
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
  });
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
