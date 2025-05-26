document.getElementById("map").style.display = "block";

// ===== Инициализация карты =====
const myMap = L.map('map', {
  center: [40.4093, 49.8671],
  zoom: 13
});

const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
});
const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles © Esri'
});
const dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  attribution: '&copy; CartoDB',
  subdomains: 'abcd'
});
streets.addTo(myMap);

const baseLayers = {
  "🗺 Улицы": streets,
  "🛰 Спутник": satellite,
  "🌙 Тёмная тема": dark
};
L.control.layers(baseLayers).addTo(myMap);

// ===== Загрузка и отображение GeoJSON =====
fetch('data/locations.geojson')
  .then(response => response.json())
  .then(data => {
    const geojsonLayer = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(`<strong>${feature.properties.name}</strong><br>${feature.properties.description || ''}`);
        }
      }
    }).addTo(myMap);

    // Добавление поиска
    const searchControl = new L.Control.Search({
      layer: geojsonLayer,
      propertyName: 'name',
      marker: false,
      moveToLocation: function (latlng, title, map) {
        myMap.setView(latlng, 17); // Увеличить при переходе
      }
    });
    searchControl.addTo(myMap);

    // Удалить загрузчик
    document.getElementById("loader").style.display = "none";
  })
  .catch(error => {
    console.error("Ошибка загрузки GeoJSON:", error);
    alert("Ошибка загрузки данных.");
  });
