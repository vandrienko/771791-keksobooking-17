'use strict';
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var typesOfSentences = ['palace', 'flat', 'house', 'bungalo'];

var data = generateData(8);
var pins = [];

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

// function addZeros(number, len) {
//   var result = String(number);
//   if (String(number).length < len) {
//     for (var i = 0; i < len - String(number).length; i++) {
//       result = 0 + result;
//     }
//   }
//   return result;
// }

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

// Задание №2 У блока .map уберите класс .map--faded.
// Показываем карту
activateMap();
// Функция добоаляем класс map--faded у элемента map
function activateMap() {
  map.classList.remove('map--faded');
}

// Функция удаляем класс map--faded у элемента map
// function deactivateMap() {
//   map.classList.add('map--faded');
// }

// Задание №3 На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
//  Итоговую разметку метки .map__pin можно взять из шаблона #pin.
// У метки должны быть следующие данные:
// Координаты: style="left: {{location.x}}px; top: {{location.y}}px;"
// src="{{author.avatar}}"
// alt="{{заголовок объявления}}"
// Обратите внимание. Координаты X и Y, которые вы вставите в разметку, это не координаты
// левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом.
//  Чтобы найти эту координату нужно учесть размеры элемента с меткой.
function createPin(obj) {
  var templateCopy = pinTemplate.cloneNode(true);
  var pinImg = templateCopy.querySelector('img');
  templateCopy.style = 'left: ' + obj.location.x + 'px;' + 'top: ' + obj.location.y + 'px;';
  pinImg.src = obj.author.avatar;
  pinImg.alt = 'заголовок объявления';
  return templateCopy;
}

// Задание №3 Отрисуйте сгенерированные DOM-элементы в блок .map__pins.
//  Для вставки элементов используйте DocumentFragment
function insertPins(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(arr[i]);
  }
  mapPins.appendChild(fragment);
}

for (var i = 0; i < data.length; i++) {
  pins.push(createPin(data[i]));
}

insertPins(pins);
