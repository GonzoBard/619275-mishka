function Map() {

  var map;
  var mapContainerID = "contacts__map";
  var mapContainer = document.getElementById(mapContainerID);

  this.yandexMapInit = function () {

    mapContainer.innerHTML = "";

    map = new ymaps.Map(mapContainerID, {
      center: [59.938631, 30.323055],
      zoom: 16,
      controls: ['smallMapDefaultSet']
    }),

      // Создаём макет содержимого.
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        "$[properties.iconContent]"
      ),

      myPlacemark = new ymaps.Placemark(map.getCenter(), {
        hintContent: "г. Санкт-Петербург,<br>ул. Большая<br>Конюшенная,<br>д. 19/8, офис 101",
        balloonContent: "г. Санкт-Петербург,<br>ул. Большая<br>Конюшенная,<br>д. 19/8, офис 101"
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: "default#image",
        // Своё изображение иконки метки.
        iconImageHref: "img/icon-contacts__map-pin.svg",
        // Размеры метки.
        iconImageSize: [67, 100],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-33.5, -100]
      });

    map.geoObjects.add(myPlacemark);
    map.behaviors.disable("scrollZoom");
    map.behaviors.disable("multiTouch");
  }
}

var map = new Map();
ymaps.ready(map.yandexMapInit.bind(map));
