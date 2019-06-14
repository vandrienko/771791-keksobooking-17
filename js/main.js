
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
        'y': 140 /* случайное число, координата y метки на карте от 130 до 630. */
      }
    }
    announcementArray.push(announcement);
    console.log('announcement11', announcementArray);
  }
  return announcement;
}

var data = generateData(1);
console.log('data1', data);

// Задание №2 У блока .map уберите класс .map--faded.
// Получаем элементы с классом map. Используем селектор.
var map = document.querySelector('.map');
// Удаляем класс map--faded у элемента map
map.classList.remove('map--faded');

// Задание №3 На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте, и заполните их данными из массива.
//  Итоговую разметку метки .map__pin можно взять из шаблона #pin.
// У метки должны быть следующие данные:
// Координаты: style="left: {{location.x}}px; top: {{location.y}}px;"
// src="{{author.avatar}}"
// alt="{{заголовок объявления}}"
// Обратите внимание. Координаты X и Y, которые вы вставите в разметку, это не координаты
// левого верхнего угла блока метки, а координаты, на которые указывает метка своим острым концом.
//  Чтобы найти эту координату нужно учесть размеры элемента с меткой.
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function createPin(obj) {
  var templateCopy = pinTemplate.cloneNode(true);
  var pinImg = templateCopy.querySelector('img');
  templateCopy.style = "left: " + obj.location.x + "px;" + "top: " + obj.location.y + "px;"
  pinImg.src = obj.author.avatar;
  pinImg.alt = 'заголовок объявления';
  return templateCopy
}
createPin(data);
console.log('DOM-элементы',data);

// Задание №3 Отрисуйте сгенерированные DOM-элементы в блок .map__pins.
//  Для вставки элементов используйте DocumentFragment
var pins = [];
appendChild(data)
