// ===== Инициализация карты на Баку =====
const map = L.map('map', {
  center: [40.4093, 49.8671],
  zoom: 13
});

// ===== Базовые слои =====
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

// Слой по умолчанию
streets.addTo(map);

// ===== Переключатель слоёв =====
const baseLayers = {
  "🗺 Улицы": streets,
  "🛰 Спутник": satellite,
  "🌙 Тёмная тема": dark
};
L.control.layers(baseLayers).addTo(map);

// ===== Переменная для маршрута =====
function updateTransport(select) {
  selectedTransport = select.value;
}

let routingControl = null;
let selectedTransport = 'foot'; // по умолчанию — пешком

function routeTo(latlng) {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  if (!navigator.geolocation) {
    alert("Геолокация не поддерживается вашим браузером");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);

    routingControl = L.Routing.control({
      waypoints: [
        userLatLng,
        L.latLng(latlng[0], latlng[1])
      ],
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/${selectedTransport}`
      }),
      lineOptions: {
        styles: [{ color: 'cyan', weight: 5 }]
      },
      show: false,
      addWaypoints: false
    }).addTo(map);
  }, () => {
    alert("Не удалось получить ваше местоположение.");
  });
}


// ===== Загрузка и отображение GeoJSON =====
fetch('data/locations.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          const name = feature.properties.name;
          const desc = feature.properties.description || '';
          const coords = layer.getLatLng();

          const popupContent = `
            <strong>${name}</strong><br>
            ${desc}<br><br>
            <select id="transport-select" onchange="updateTransport(this)">
              <option value="foot">🚶 Пешком</option>
              <option value="car">🚗 Машина</option>
              <option value="bike">🚴 Велосипед</option>
            </select><br><br>
            <button onclick="routeTo([${coords.lat}, ${coords.lng}])">📍 Построить маршрут</button>
          `;
          layer.bindPopup(popupContent);
        }
      }
    }).addTo(map);
  })
  .catch(error => console.error("Ошибка загрузки GeoJSON:", error));

// ===== Обновление транспорта =====
function updateTransport(select) {
  selectedTransport = select.value;
}

// ===== Построение маршрута =====
function routeTo(destinationLatLng) {
  if (!navigator.geolocation) {
    alert("Ваш браузер не поддерживает геолокацию");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const start = L.latLng(position.coords.latitude, position.coords.longitude);
    const end = L.latLng(destinationLatLng[0], destinationLatLng[1]);

    if (routingControl) {
      map.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
      waypoints: [start, end],
      lineOptions: {
        styles: [{ color: 'red', opacity: 0.8, weight: 5 }]
      },
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/${selectedTransport}`
      }),
      createMarker: function () { return null; },
      routeWhileDragging: false,
      draggableWaypoints: false,
      addWaypoints: false,
      show: false
    }).on('routesfound', function (e) {
      const route = e.routes[0];
      const distance = (route.summary.totalDistance / 1000).toFixed(2);
      const time = Math.ceil(route.summary.totalTime / 60);

      L.popup()
        .setLatLng(end)
        .setContent(`Расстояние: ${distance} км<br>Время: ~${time} мин`)
        .openOn(map);
    }).addTo(map);
  }, error => {
    alert("Не удалось определить местоположение: " + error.message);
  });
}

// ===== Кнопка "Моё местоположение" =====
const locateControl = L.control({ position: 'topleft' });
locateControl.onAdd = function (map) {
  const button = L.DomUtil.create('button', 'locate-button');
  button.title = 'Показать моё местоположение';
  button.innerHTML = '📍';
  L.DomEvent.on(button, 'click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    map.locate({ setView: true, maxZoom: 16 });
    map.once('locationfound', function (e) {
      L.marker(e.latlng).addTo(map).bindPopup("Вы здесь").openPopup();
      L.circle(e.latlng, {
        radius: e.accuracy,
        color: '#136aec',
        fillOpacity: 0.1
      }).addTo(map);
    });
    map.once('locationerror', function (e) {
      alert("Не удалось получить местоположение: " + e.message);
 // ===== Инициализация карты на Баку =====
const map = L.map('map', {
  center: [40.4093, 49.8671],
  zoom: 13
});

// ===== Слои =====
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

streets.addTo(map);

const baseLayers = {
  "🗺 Улицы": streets,
  "🛰 Спутник": satellite,
  "🌙 Тёмная тема": dark
};
L.control.layers(baseLayers).addTo(map);

// ===== Переменные для маршрута =====
let routingControl = null;
let selectedTransport = 'foot';

// ===== Обработка смены транспорта =====
function updateTransport(select) {
  selectedTransport = select.value;
}

// ===== Построение маршрута =====
function routeTo(latlng) {
  if (routingControl) {
    map.removeControl(routingControl);
  }

  if (!navigator.geolocation) {
    alert("Ваш браузер не поддерживает геолокацию.");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const userLatLng = L.latLng(position.coords.latitude, position.coords.longitude);

    routingControl = L.Routing.control({
      waypoints: [
        userLatLng,
        L.latLng(latlng[0], latlng[1])
      ],
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/${selectedTransport}`
      }),
      lineOptions: {
        styles: [{ color: 'cyan', weight: 5 }]
      },
      createMarker: () => null,
      show: false,
      addWaypoints: false
    }).addTo(map);
  }, () => {
    alert("Не удалось получить ваше местоположение.");
  });
}

// ===== Загрузка GeoJSON =====
fetch('data/locations.geojson')
  .then(response => response.json())
  .then(data => {
    const geoJsonLayer = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        const latlng = feature.geometry.coordinates.slice().reverse();

        const popup = `
          <strong>${props.name}</strong><br>
          ${props.description || ''}<br><br>
          <button onclick="routeTo([${latlng}])">📍 Проложить маршрут</button>
        `;
        layer.bindPopup(popup);
      }
    }).addTo(map);

    // Добавим поиск по названиям
    new L.Control.Search({
      layer: geoJsonLayer,
      propertyName: 'name',
      zoom: 17,
      initial: false,
      hideMarkerOnCollapse: true
    }).addTo(map);
  })
  .catch(error => console.error("Ошибка загрузки GeoJSON:", error));

// ===== Геолокация пользователя =====
map.locate({ setView: false, watch: false });
map.on("locationfound", (e) => {
  L.circleMarker(e.latlng, {
    radius: 6,
    color: "blue",
    fillColor: "#30f",
    fillOpacity: 0.8
  }).addTo(map).bindPopup("Вы здесь").openPopup();
});
   });
  });
  return button;
};
locateControl.addTo(map);
