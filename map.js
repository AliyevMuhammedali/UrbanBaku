// Центр карты — Баку
const map = L.map('map').setView([40.4093, 49.8671], 13);

// Спутниковый слой Esri
const satellite = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19
  }
);

// Слой улиц от OSM
const streets = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }
);

// Добавим спутник + улицы (в виде гибридного слоя)
satellite.addTo(map);
streets.addTo(map);

// Контрол выбора слоёв
const baseMaps = {
  "Спутник": satellite,
  "Улицы": streets
};

L.control.layers(baseMaps).addTo(map);

// Подключение GeoJSON
fetch('locations.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        const name = props.name || 'Без названия';
        const description = props.description || '';
        layer.bindPopup(`<strong>${name}</strong><br>${description}`);
      }
    }).addTo(map);
  });
