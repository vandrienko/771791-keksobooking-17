
// Создайте массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку. Структура объектов должна быть следующей:

function generateData(count) {
  var announcementArray = [];
  for (var i = 0; i < count; i++ ) {
    var announcement = {
      "author": {
        "avatar": "img/avatars/user02.png"  /* строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются */
      },
      "offer": {
        "type": "palace" /* строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo */
      },

      "location": {
        "x": 24, /* случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка. */
        "y": 140 /* случайное число, координата y метки на карте от 130 до 630. */
      }
    }
    announcementArray.push(announcement);
    console.log('announcement11', announcementArray);
  }
  // return announcement;
}

var data = generateData(8);
// console.log('data1', data);
// 1. функция получения рандомного значения из заданного интервала
// function getRandomInteger(min, max) {
//   return Math.round(Math.random() * (max - min) + min);
// }

// Задание №2 У блока .map уберите класс .map--faded.
// Получаем элементы с классом map. Используем селектор.

var map = document.querySelector('.map');
// Удаляем класс map--faded у элемента map
map.classList.remove('map--faded');

