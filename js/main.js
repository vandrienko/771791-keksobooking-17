'use strict';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var typesOfSentences = ['palace', 'flat', 'house', 'bungalo'];
var data = generateData(8);
var pins = createPins(data);

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
var pinMain = document.querySelector('.map__pin--main');

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
function disableFormElements(arr) {
  for (var i = 0; i < arr.length; i++) {
    // arr[i].setAttribute('disabled', 'disabled');
    arr[i].disabled = true;
  }
}

// включаем элементы формы
function enableFormElements(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('disabled');
  }
}
// Получения серидины объекта
function getCoordinates(object) {
  var coordinates = {
    x: object.offsetLeft + object.offsetWidth / 2,
    y: object.offsetTop + object.offsetHeight / 2
  };
  return coordinates;
}

// Вызываем функцию подучения центра объекты
var coordinates = getCoordinates(pinMain);

// функция передачи кординат пина в инпут
function setAddress(x, y) {
  address.value = x + ', ' + y;
}

setAddress(coordinates.x, coordinates.y);

var onButtonClick = function () {
  // Показываем карту
  activateMap();
  // вызов функции отрисовки пинов
  insertPins(pins);
  // включаем элементы формы
  enableFormElements(formElements);
  // ключаем фильтр
  activateForm();
};

// Отслеживаем нажатия на главный пин и вызываем функцию onButtonClick.
pinMain.addEventListener('click', onButtonClick);
