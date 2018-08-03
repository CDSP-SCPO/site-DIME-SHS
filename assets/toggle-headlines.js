'use strict';

(function () {
  var getSiblings = function getSiblings(elem, untilFn) {
    var siblings = [];
    var nextSibling = elem.nextElementSibling;

    while (nextSibling && untilFn(nextSibling) === false) {
      siblings.push(nextSibling);
      nextSibling = nextSibling.nextElementSibling;
    }

    return siblings;
  };

  var toggleHeadlines = function toggleHeadlines(headlines, untilFn) {
    var defaultState = document.body.classList.contains('toggable-headlines--closed') ? 'closed' : 'opened';
    var toggleSiblings = function toggleSiblings(headline) {
      var nextItems = getSiblings(headline, untilFn);
      nextItems.forEach(function (s) {
        return s.classList.toggle('collapsed');
      });
    };

    headlines.forEach(function (headline) {
      headline.classList.add(defaultState);
      headline.classList.add('clickable');

      headline.addEventListener('click', function (event) {
        headline.classList.toggle('closed');
        headline.classList.toggle('opened');
        toggleSiblings(headline);
      });

      var icon = document.createElement('span');
      icon.classList.add('open-close');
      icon.setAttribute('aria-role', 'button');
      headline.appendChild(icon);

      if (defaultState === 'closed') {
        toggleSiblings(headline);
      }
    });
  };

  window.toggleHeadlines = toggleHeadlines;
})();
