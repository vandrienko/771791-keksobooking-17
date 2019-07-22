'use strict';
(function () {
  // включаем элементы формы
  function enableFormElements(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = false;
    }
  }

  // отключаем элементы формы
  function disableFormElements(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = true;
    }
  }

  window.utils = {
    enableFormElements: enableFormElements,
    disableFormElements: disableFormElements
  };
})();
