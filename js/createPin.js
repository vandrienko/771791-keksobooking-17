'use strict';

// Функция которая создает пин в соответствии с данными которые в ее поступают.

// Задание №3 На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
//  Итоговую разметку метки .map__pin можно взять из шаблона #pin.
// var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// console.log(pinTemplate);
(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  function createPin(obj) {
    var templateCopy = pinTemplate.cloneNode(true);
    var pinImg = templateCopy.querySelector('img');
    templateCopy.style.left = obj.location.x + 'px';
    templateCopy.style.top = obj.location.y + 'px';
    pinImg.src = obj.author.avatar;
    pinImg.alt = 'заголовок объявления';
    return templateCopy;
  }
  window.createPin = createPin;
})();
