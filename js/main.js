'use strict';

(function () {
  // Массив, состоящий из 8 сгенерированных JS объектов
  var adsInfo = window.data;

  function activatePage() {
    var pins = window.map.createPins(adsInfo);
    // window.utils.enableFormElements(formElements);
    // вызов функции insertPins для отрисовки пинов
    window.map.insertPins(pins);
    // Показываем карту и включаем элементы фильтра
    window.map.onButtonClick();
    // Функция удаляет класс ad-form--disabled у формы  и fieldset у фильтра
    window.form.activateForm();
  }
  // Этот callback запускает функцию activatePage
  window.map.setMouseDownCallback(activatePage);
  // Этот callback передает координаты пина в инпут при движени
  window.map.setMouseMoveCallback(window.form.setAddress);
  // Этот callback передает координаты пина в инпут.
  window.map.setMouseUpCallback(window.form.setAddress);
  // Получаем элементы формы
  var formElements = window.form.formElements;
  // Этот callback передает координаты пина в инпут.
  var coordinatesCenterPin = window.map.coordinatesCenterPin;
  window.form.setAddress(coordinatesCenterPin.x, coordinatesCenterPin.y);
})();
