'use strict';
// В этом файле находится наш массив с данными
(function () {
  var typesOfSentences = ['palace', 'flat', 'house', 'bungalo'];
  // Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку. Структура объектов должна быть следующей:
  function generateData() {
    var result = [];
    for (var i = 0; i < 8; i++) {
      var announcement = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png' /* строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются */
        },
        offer: {
          type: getRandomElementArray(typesOfSentences)/* строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo */
        },
        location: {
          x: getRandomInteger(0, 1200), /* случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка. */
          y: getRandomInteger(130, 630) /* случайное число, координата y метки на карте от 130 до 630. */
        }
      };
      result.push(announcement);
    }
    return result;
  }

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
  window.data = generateData();

})();
