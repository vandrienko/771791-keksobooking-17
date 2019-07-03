'use strict';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var typesOfSentences = ['palace', 'flat', 'house', 'bungalo'];
var data = generateData(8);
var pins = createPins(data);
// Ограничения области перемещения пина
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
// Ширина и высота нашего пина.
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 82;

// 1. функция получения рандомного значения из заданного интервала
function getRandomInteger(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// 2. функция получения рандомного элемента из массива
function getRandomElementArray(array) {
  var maxIndexArray = array.length - 1;
  var randomIndexArray = getRandomInteger(0, maxIndexArray);
  return array [randomIndexArray];
}

// Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку. Структура объектов должна быть следующей:
function generateData(count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    var announcement = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png' /* строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются */
      },
      offer: {
        type: getRandomElementArray(typesOfSentences)/* строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo */
      },
      location: {
        x: getRandomInteger(0, 630), /* случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка. */
        y: getRandomInteger(130, 630) /* случайное число, координата y метки на карте от 130 до 630. */
      }
    };
    result.push(announcement);
  }
  return result;
}

// Задание №3 На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
//  Итоговую разметку метки .map__pin можно взять из шаблона #pin.
function createPin(obj) {
  var templateCopy = pinTemplate.cloneNode(true);
  var pinImg = templateCopy.querySelector('img');
  templateCopy.style.left = obj.location.x + 'px';
  templateCopy.style.top = obj.location.y + 'px';
  pinImg.src = obj.author.avatar;
  pinImg.alt = 'заголовок объявления';
  return templateCopy;
}

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

function createPins(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(createPin(arr[i]));
  }
  return result;
}

// Модуль 4
var adForm = document.querySelector('.ad-form');
var address = adForm.querySelector('#address');
var formElements = adForm.querySelectorAll('fieldset');
var mainPinElement = document.querySelector('.map__pin--main');
var filterForm = document.querySelector('.map__filters');
var mapFilter = filterForm.querySelectorAll('.map__filter');
var housingFeatures = filterForm.querySelectorAll('#housing-features');
// Функция удаеляет класс map--faded у элемента map
function activateMap() {
  map.classList.remove('map--faded');
}

// Функция удаляет класс ad-form--disabled у формы что бы был виден фильтр
function activateForm() {
  adForm.classList.remove('ad-form--disabled');
}

// блокируем элементы формы
disableFormElements(formElements);

// блокируем элементы фильтра
disableFormElements(mapFilter);
disableFormElements(housingFeatures);
function disableFormElements(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = true;
  }
}

// включаем элементы формы
function enableFormElements(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = false;
  }
}

// Получения серидины объекта
// function getCoordinates(object) {
//   var coordinates = {
//     x: object.offsetLeft + object.offsetWidth / 2,
//     y: object.offsetTop + object.offsetHeight / 2
//   };
//   return coordinates;
// }

function getMainPinCoordinates() {
  return {
    x: Math.floor(mainPinElement.offsetLeft + MAIN_PIN_WIDTH / 2),
    y: Math.floor(isMapActive() ? mainPinElement.offsetTop + MAIN_PIN_HEIGHT : mainPinElement.offsetTop + MAIN_PIN_HEIGHT / 2)
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

// функция передачи кординат пина в инпут
function setAddress(x, y) {
  address.value = x + ', ' + y;
}

setAddress(coordinatesCenterPin.x, coordinatesCenterPin.y);

var onButtonClick = function () {
  // Показываем карту
  activateMap();
  // вызов функции отрисовки пинов
  insertPins(pins);
  // включаем элементы формы
  enableFormElements(formElements);
  // Включаем фильтр
  activateForm();
  // включаем элементы фильтра
  enableFormElements(mapFilter);
  enableFormElements(housingFeatures);
};

// Отслеживаем нажатия на главный пин и вызываем функцию onButtonClick.
// mainPinElement.addEventListener('click', onButtonClick);

// module4-task2
// 3.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
// «Бунгало» — минимальная цена за ночь 0;
// «Квартира» — минимальная цена за ночь 1 000;
// «Дом» — минимальная цена 5 000;
// «Дворец» — минимальная цена 10 000.
// Вместе с минимальным значением цены нужно изменять и плейсхолдер.

// Тип жилья
var housTypeElement = document.querySelector('#type');
var priceElement = document.querySelector('#price');

var minPrices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 100000
};

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

// +++++++++++++++++++++++++ module5-task1 ++++++++++++++++++++++++++++++

// var mapPin = document.querySelector('.map__pin');


mainPinElement.addEventListener('mousedown', function (evt) {
  // Вызываю функцию от рисовки остальных пинов и разблокировки формы.
  onButtonClick();

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

    startCoordsPin = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    // Вызываем функцию получения центра объекта
    var newCoordinatesPin = getMainPinCoordinates();
    // Передаем новые координаты в инпут
    setAddress(newCoordinatesPin.x, newCoordinatesPin.y);
    var isCoordsValid = validateCoords(startCoordsPin);

    //  Записываем нашему пину новые координаты
    if (isCoordsValid.x) {
      mainPinElement.style.left = shift.x + 'px';
    }

    if (isCoordsValid.y) {
      mainPinElement.style.top = shift.y + 'px';
    }
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
});

