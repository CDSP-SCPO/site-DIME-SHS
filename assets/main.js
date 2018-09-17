'use strict';

// scroll if anchor is targeted in a sticky context

window.addEventListener('hashchange', function (event) {
  var header = $('.site-header');

  // element is sticky if it's at the top but far from the document top
  if (header.offsetTop && header.clientTop === 0) {
    window.scrollBy(0, header.offsetHeight * -1);
  }
});

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

(function () {
  var $ = function $(selector) {
    return document.querySelector(selector);
  };
  var $$ = function $$(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return [].slice.apply(root.querySelectorAll(selector));
  };

  document.addEventListener('DOMContentLoaded', function() {
    var toc = document.getElementById('TableOfContents');
    new MenuSpy(toc, { enableLocationHash: false });

    var slidesContainer = $('.slides');
    if (slidesContainer) {
      var nav = $('.slides__nav > ul');
      $$('.slide', slidesContainer).forEach(function (slide, i) {
        if (!slide.getAttribute('id')) {
          slide.setAttribute('id', 'slide:' + (i + 1));
        }
        var id = slide.getAttribute('id');
        var li = document.createElement('li');
        li.innerHTML = '<a href="#' + id + '">' + String(i + 1) + '</a>';
        if (i === 0) {
          li.classList.add('active');
        }
        nav.appendChild(li);
      });
      new MenuSpy(nav, {
        enableLocationHash: false,
        // refElement: slidesContainer,
        threshold: 75,
        hashTimeout: 300
      });
    }

    // footnotes, sidenotes -> sidebar
    createSidenotesWrapper($$('.page__body h1'));


    $$('.footnotes').forEach(function (footnotes) {
      var notes = $$('.footnote-return');

      notes.forEach(function (el) {
        var id = el.hash.slice(1);
        var target = document.getElementById(id);
        var newNode = document.createElement('div');
        newNode.classList.add('in-sidebar');
        newNode.classList.add('in-sidebar--from-footnote');
        newNode.style.top = target.offsetTop + 'px';

        newNode.innerHTML = el.parentElement.innerHTML;
        // target.insertAdjacentElement('afterend', newNode);
      });
    });

    // togglable headlines
    if (document.body.classList.contains('toggable-headlines')) {
      toggleHeadlines($$('.article__title'), function (el) {
        return el.classList.contains('article__title');
      });
      toggleHeadlines($$('.page__body h1'), function (el) {
        return el.nodeName === 'H1';
      });
      toggleHeadlines($$('.page__body .f2'), function (el) {
        return el.classList.contains('f2');
      });
      toggleHeadlines($$('.bibliography h2'), function (el) {
        return el.nodeName === 'H2';
      });
      toggleHeadlines($$('.bibliography-section h3'), function (el) {
        return el.nodeName === 'H3';
      });
    }
  });
})();
