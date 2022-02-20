(function () {
  //Вызов карты.............Запрет масшта-я прокруткой.........координаты...........масштаб исходный
  const map = L.map('map', { scrollWheelZoom: false }).setView([59.93891, 30.32537], 15.5);

  const basemaps = {
    //Базовый слой карты - обязательно
    StreetView: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }),
    //Топографический слой
    Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?', { layers: 'TOPO-WMS' }),
    //Слой мест
    Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', { layers: 'OSM-Overlay-WMS' }),
  };

  //Кномпка справа сверху - выбор слоя.
  L.control.layers(basemaps).addTo(map);

  //Выбор топографического слоя по умолчанию
  basemaps.StreetView.addTo(map);

  //Кастомная иконка-маркер, путь и размеры
  const basicBeachIcon = L.icon({
    iconUrl: '/img/icons/cat-in-map.svg', iconSize: [52, 78],
  });

  //Установка иконки-маркера на нужные координаты плюс подсказка по клику на маркер
  L.marker([59.93872, 30.32308], { icon: basicBeachIcon })
    .bindPopup('Гостиница для котов Котейка')
    .addTo(map);
}());
