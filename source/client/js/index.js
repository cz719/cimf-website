'use strict';

(function (window, document) {

  var getStyle = window.getComputedStyle;

  function pxToNumber(str) {
    return parseInt(str.slice(0, -2));
  }

  var isDropdownOpen = false;

  function showDropdownClickHandler(event) {
    event.preventDefault();

    if (!isDropdownOpen) {
      isDropdownOpen = true;
      var dropdown = document.getElementById('js-dropdown');
      var computedStyle = getStyle(dropdown);
      var height = pxToNumber(computedStyle['height']);
      document.getElementById('js-dropdown-mask').style.height = height + 'px';
    } else {
      isDropdownOpen = false;
      document.getElementById('js-dropdown-mask').style.height = '';
    }
  }

  document.getElementById('js-show-dropdown')
    .addEventListener('click', showDropdownClickHandler, false);

})(window, document);
