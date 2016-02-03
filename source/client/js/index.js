import 'picturefill';
import validate from 'validate.js';
import { collect } from './form';

// Module slide down menu
// ----------------------

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
    var marginTop = pxToNumber(computedStyle['margin-top']);

    document.getElementById('js-dropdown-mask').style.height = (height + marginTop) + 'px';

  } else {
    isDropdownOpen = false;
    document.getElementById('js-dropdown-mask').style.height = '';
  }
}

document.getElementById('js-show-dropdown')
  .addEventListener('click', showDropdownClickHandler, false);

// Concact form validation
// -----------------------

const form = document.getElementById('contact-form');

const errorLabels = Array.prototype.slice.call(document.getElementsByClassName('form__error-label'), 0);

function showLabel(id) {
  for (const label of errorLabels) {
    if (label.htmlFor === id) {
      label.style.display = 'block';
    }
  }
}

if (form) {
  form.addEventListener('submit', function (event) {
    const data = collect(event.target);
    const msg = validate(data, {
      name: {
        presence: true,
      },
      email: {
        presence: true,
        email: true,
      },
      message: {
        presence: true,
      },
    });

    // Reset error message
    for (const label of errorLabels) {
      label.style.display = '';
    }

    if (msg != null) {
      event.preventDefault();

      if (msg.name) {
        showLabel('name');
      }

      if (msg.email) {
        showLabel('email');
      }

      if (msg.message) {
        showLabel('message');
      }
    }
  }, false);
}
