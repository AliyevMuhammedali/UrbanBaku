// Создание карты и установка центра на Баку
const map = L.map('map').setView([40.4093, 49.8671], 13);

// Спутниковый слой от Esri
const satellite = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19
  }
);

// Уличный слой от OpenStreetMap
const streets = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
    opacity: 0.5 // делаем слой полупрозрачным, чтобы видно было спутник
  }
);

// Добавление гибридного слоя на карту
satellite.addTo(map);
streets.addTo(map);

// Контрол переключения базовых слоёв
const baseMaps = {
  "Спутник": satellite,
  "Улицы": streets
};
L.control.layers(baseMaps).addTo(map);

// Загрузка GeoJSON с метками заброшенных мест
fetch('locations.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error("Не удалось загрузить locations.geojson");
    }
    return response.json();
  })
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const props = feature.properties || {};
        const name = props.name || "Без названия";
        const description = props.description || "";
        layer.bindPopup(`<strong>${name}</strong><br>${description}`);
      },
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
          title: feature.properties?.name || ""
        });
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error("Ошибка при загрузке GeoJSON:", error);
  });
