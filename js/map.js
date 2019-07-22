'use strict';

(function () {
  // Ширина и высота нашего пина.
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 82;

  // Ограничения области перемещения пина
  var MIN_X = 0;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPinElement = document.querySelector('.map__pin--main');

  // Элементы филитра
  var filterForm = document.querySelector('.map__filters');
  var mapFilter = filterForm.querySelectorAll('.map__filter');
  var housingFeatures = filterForm.querySelectorAll('#housing-features');
  // console.log('housingFeatures', housingFeatures);

  var mouseMoveCallback = null;
  var mouseUpCallback = null;
  var mouseDownCallback = null;

  function setMouseMoveCallback(fn) {
    mouseMoveCallback = fn;
  }

  function setMouseUpCallback(fn) {
    mouseUpCallback = fn;
  }

  function setMouseDownCallback(fn) {
    mouseDownCallback = fn;
  }

  // блокируем элементы фильтра
  window.utils.disableFormElements(mapFilter);
  window.utils.disableFormElements(housingFeatures);

  var onButtonClick = function () {
    // Показываем карту
    activateMap();
    // вызов функции отрисовки пинов
    // insertPins(pins);
    // включаем элементы формы
    // enableFormElements(window.forms.formElements);
    // Включаем фильтр
    // activateForm();

  };

  function getMainPinCoordinates() {
    return {
      x: mainPinElement.offsetLeft + MAIN_PIN_WIDTH / 2,
      y: isMapActive() ? mainPinElement.offsetTop + MAIN_PIN_HEIGHT : mainPinElement.offsetTop + MAIN_PIN_HEIGHT / 2
    };
  }

  // Если карта не активна
  function isMapActive() {
    var contains = map.classList.contains('map--faded');
    return !contains;
    // return !map.classList.contains('map--faded');
  }

  // Вызываем функцию получения центра объекта
  var coordinatesCenterPin = getMainPinCoordinates();
  // window.form.setAddress(coordinatesCenterPin.x, coordinatesCenterPin.y);

  // Задание №4 Отрисуйте сгенерированные DOM-элементы в блок .map__pins.
  //  Для вставки элементов используйте DocumentFragment
  // функция отрисовки пинов
  function insertPins(arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(arr[i]);
    }
    mapPins.appendChild(fragment);
  }
  // var createPin = window.createPin;
  // console.log('createPin', createPin);
  function createPins(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
      result.push(window.createPin(arr[i]));
    }
    return result;
  }

  // Функция удаеляет класс map--faded у элемента map
  function activateMap() {
    map.classList.remove('map--faded');
    // включаем элементы фильтра
    window.utils.enableFormElements(mapFilter);
    window.utils.enableFormElements(housingFeatures);
  }

  // +++++++++++++++++++++++++ module5-task1 ++++++++++++++++++++++++++++++

  // var mapPin = document.querySelector('.map__pin');
  mainPinElement.addEventListener('mousedown', function (evt) {
    // Вызываю функцию от рисовки остальных пинов и разблокировки формы.
    // onButtonClick();
    // mouseDownCallback();
    if (!isMapActive()) {
      if (mouseDownCallback) {
        mouseDownCallback();
      }
    }
    // Запомним координаты точки, с которой мы начали перемещать пин
    var startCoordsPin = {
      x: evt.clientX,
      y: evt.clientY
    };

    // При каждом движении мыши нам нужно обновлять смещение относительно первоначальной точки,
    //  чтобы диалог смещался на необходимую величину.
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: mainPinElement.offsetLeft - (startCoordsPin.x - moveEvt.clientX),
        y: mainPinElement.offsetTop - (startCoordsPin.y - moveEvt.clientY)
      };

      var isCoordsValid = validateCoords(shift);

      //  Записываем нашему пину новые координаты
      if (isCoordsValid.x) {
        mainPinElement.style.left = shift.x + 'px';
        startCoordsPin.x = moveEvt.clientX;
      }

      if (isCoordsValid.y) {
        mainPinElement.style.top = shift.y + 'px';
        startCoordsPin.y = moveEvt.clientY;
      }

      if (mouseMoveCallback) {
        var newCoordinatesPin = getMainPinCoordinates();
        window.form.setAddress(newCoordinatesPin.x, newCoordinatesPin.y);
      }
      // Вызываем функцию получения центра объекта
      // var newCoordinatesPin = getMainPinCoordinates();
      // Передаем новые координаты в инпут
      // window.form.setAddress(newCoordinatesPin.x, newCoordinatesPin.y);
    };

    function validateCoords(coordinates) {
      return {
        x: coordinates.x <= MAX_X - MAIN_PIN_WIDTH / 2 && coordinates.x >= MIN_X - MAIN_PIN_WIDTH / 2,
        y: coordinates.y <= MAX_Y - MAIN_PIN_HEIGHT && coordinates.y >= MIN_Y - MAIN_PIN_HEIGHT
      };
    }

    // При отпускании кнопки мыши нужно переставать слушать события движения мыши.
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // Добавим обработчики события передвижения мыши.
    document.addEventListener('mousemove', onMouseMove);

    // Добавим обработчики события отпускания кнопки мыши.
    document.addEventListener('mouseup', onMouseUp);

    if (mouseUpCallback) {
      var newCoordinatesPin = getMainPinCoordinates();
      window.form.setAddress(newCoordinatesPin.x, newCoordinatesPin.y);
    }
  });

  window.map = {
    activateMap: activateMap,
    insertPins: insertPins,
    createPins: createPins,
    // disableFormElements: disableFormElements,
    onButtonClick: onButtonClick,
    // enableFormElements: enableFormElements,
    coordinatesCenterPin: coordinatesCenterPin,
    setMouseMoveCallback: setMouseMoveCallback,
    setMouseUpCallback: setMouseUpCallback,
    setMouseDownCallback: setMouseDownCallback
  };
})();
