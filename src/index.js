import './index.scss';
import $ from 'jquery';

const state = [1, 1, 1, 1];

$(document).ready(function() {
  const hamburger = $('.header__hamburger--item');
  const navigation = $('.navigation');
  hamburger.click(function(e) {
    e.preventDefault();
    if (hamburger.hasClass('is-active')) {
      hamburger.removeClass('is-active');
      navigation.slideUp('fast');

    } else {
      hamburger.addClass('is-active');
      navigation.slideDown('fast');
    }

  });

  const minus = $('.minus');
  const plus = $('.plus');
  const buy = $('.products__item--button');
  const input = $('.products__counter--input');
  input.change(function(e) {
    const currentTarget = $(e.target);
    const counter = currentTarget.parent();
    const currentStateKey = counter.data('id');
    state[currentStateKey] = currentTarget.val();
  });
  input.blur(function(e) {
    const currentTarget = $(e.target);
    const counter = currentTarget.parent();
    const currentStateKey = counter.data('id');
    if (typeof state[currentStateKey] === 'string') {
      if (parseInt(state[currentStateKey], 10)) {
        state[currentStateKey] = parseInt(state[currentStateKey], 10);
      } else {
        state[currentStateKey] = 0;
        input.val(0);
      }
    }
  });
  minus.click(function(e) {
    const currentTarget = $(e.target);
    const counter = currentTarget.parent();
    const currentStateKey = counter.data('id');
    if (state[currentStateKey] !== 0) {
      state[currentStateKey] -= 1;
      counter.find('.products__counter--input').val(state[currentStateKey]);
    }
  });
  plus.click(function(e) {
    const currentTarget = $(e.target);
    const counter = currentTarget.parent();
    const currentStateKey = counter.data('id');
    state[currentStateKey] += 1;
    counter.find('.products__counter--input').val(state[currentStateKey]);
  });
  buy.click(function(e) {
    const currentTarget = $(e.target);
    const item = currentTarget.parent();
    const header = item.find('.products__item--header');
    const currentStateKey = item.data('id');
    alert(`You add to cart ${header.text().
        trim()}: ${state[currentStateKey]} pcs`);
  });

  const form = $('.form-popular__form');
  const allState = ['first', 'second', 'third'];
  let currentStateForm = 'first';
  form.submit(function(e) {
    e.preventDefault();
    const currentTarget = $(e.target);
    const parent = currentTarget.parent();
    const currentState = parent.data('id');
    const currentIndex = allState.indexOf(currentState);
    if (allState.length - 1 >= currentIndex + 1) {
      parent.removeClass('is-active');

      currentStateForm = allState[currentIndex + 1];
      $(`.form-popular__content--item[data-id=${currentStateForm}]`).
          addClass('is-active');
      $(`.form-popular__steps--item[data-id=${currentState}]`).
          removeClass('current');
      $(`.form-popular__steps--item[data-id=${currentStateForm}]`).
          addClass('current');
    } else {
      alert(`submited`);
    }
  });

});
