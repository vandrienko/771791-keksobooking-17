'use strict';
(function () {

  // Элементы формы
  var adForm = document.querySelector('.ad-form');
  // Наш инпут в который выводим кординаты главного пина
  var address = adForm.querySelector('#address');
  var formElements = adForm.querySelectorAll('fieldset');
  // console.log('form    Elements', formElements);
  // блокируем элементы формы
  window.map.disableFormElements(formElements);

  // функция передачи кординат пина в инпут
  function setAddress(x, y) {
    address.value = x + ', ' + y;
  }

  // Тип жилья
  var housTypeElement = document.querySelector('#type');
  var priceElement = document.querySelector('#price');

  // Структура объекта
  // «Бунгало» — минимальная цена за ночь 0;
  // «Квартира» — минимальная цена за ночь 1 000;
  // «Дом» — минимальная цена 5 000;
  // «Дворец» — минимальная цена 10 000.
  var minPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 100000
  };

  // Функция удаляет класс ad-form--disabled у формы что бы был виден фильтр
  function activateForm() {
    adForm.classList.remove('ad-form--disabled');
  }

  function onHousTypeElementChange(evt) {
    setMinPrice(minPrices[evt.target.value]);
  }

  housTypeElement.addEventListener('change', onHousTypeElementChange);

  // записываеи значение дата атрибута в поле min и placeholder. цена за ночь
  function setMinPrice(value) {
    priceElement.min = value;
    priceElement.placeholder = value;
  }

  // 3.5. Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля, во втором выделяется соответствующее ему.
  // Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.

  // Время заезда
  var timeinElement = document.querySelector('#timein');

  // Время выезда
  var timeoutElement = document.querySelector('#timeout');

  timeinElement.addEventListener('change', onTimeinСhange);
  timeoutElement.addEventListener('change', onTimeoutСhange);

  // Копируем значение времени заезда в время выезда
  function onTimeinСhange() {
    timeoutElement.value = timeinElement.value;
  }

  // Копируем значение времени выезда в время заезда
  function onTimeoutСhange() {
    timeinElement.value = timeoutElement.value;
  }

  window.form = {
    setAddress: setAddress,
    formElements: formElements,
    activateForm: activateForm
  };
})();
