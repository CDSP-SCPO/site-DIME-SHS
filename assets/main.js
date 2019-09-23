'use strict';

// scroll if anchor is targeted in a sticky context

window.addEventListener('hashchange', function (event) {
  var header = document.querySelector('.site-header');

  // element is sticky if it's at the top but far from the document top`
  if (header.offsetTop && header.clientTop === 0) {
    window.scrollBy(0, header.offsetHeight * -1);
  }
});

var fromArray = function fromArray(collection) {
  return [].slice.apply(collection);
};

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
  if (document.body.classList.contains('toggable-headlines--none')) {
    return;
  }

  var defaultState = document.body.classList.contains('toggable-headlines--closed') || document.documentElement.clientWidth < 768 ? (document.body.classList.contains('toggable-headlines--opened') ? 'opened' : 'closed') : 'opened';
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

var createSidenotesWrapper = function createSidenotesWrapper(target, delimiters) {
  if (!target || target.classList && target.classList.contains('no-sidebar')) {
    return null;
  }

  var group = [];
  var children = fromArray(target.children);
  var childrenCount = children.length;
  var frag = document.createDocumentFragment();

  var wrapBefore = function wrapBefore(lastElement) {
    var wrapper = document.createElement('section');
    wrapper.classList.add('sidenotes-wrapper');

    var content = document.createElement('div');
    group.forEach(function (el) {
      content.appendChild(el.cloneNode(true));
    });

    var aside = document.createElement('aside');
    aside.classList.add('sidenotes');

    wrapper.appendChild(content);
    wrapper.appendChild(aside);
    frag.appendChild(wrapper);

    if (lastElement) {
      frag.appendChild(lastElement.cloneNode(true));
    }
  };

  children.forEach(function (child, i) {
    // is a delimiter
    // we wrap, append, append delimiter and clear the group
    if (delimiters.find(function (el) {
      return el === child;
    })) {
      wrapBefore(child);

      group = [];
    }

    // otherwise, we stack the element in the current group
    else {
        group.push(child);

        if (i + 1 === childrenCount) {
          wrapBefore();
        }
      }
  });

  var clonedTarget = target.cloneNode(false);
  clonedTarget.appendChild(frag);

  target.parentNode.replaceChild(clonedTarget, target);
};

var balanceNotes = function balanceNotes(sections, getElements) {
  sections.forEach(function (section) {
    var aside = section.querySelector('.sidenotes');

    getElements(section).forEach(function (note) {
      var firstChild = note.firstChild;

      // footnote
      if (firstChild.tagName === 'A' && firstChild.hash.match(/^#fn:/)) {
        var id = firstChild.hash.slice(1);
        var target = document.getElementById(id);
        var refnote = document.createElement('div');
        refnote.classList.add('sidenote');
        refnote.dataset.refnote = firstChild.innerText;
        refnote.dataset.note = '#fnref:' + id.split(':')[1];
        refnote.innerHTML = target.innerHTML;

        aside.appendChild(refnote);
        note.classList.add('in--sidenotes');
      }
      // sidenote
      else {
          aside.appendChild(note.cloneNode(true));
          note.classList.add('in--sidenotes');
        }
    });
  });
};

(function () {
  var $ = function $(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return root.querySelector(selector);
  };
  var $$ = function $$(selector) {
    var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return fromArray(root.querySelectorAll(selector));
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Left sidebar Table of Contents (generated from Hugo generator)
    var toc = document.getElementById('TableOfContents');
    new MenuSpy(toc, { enableLocationHash: false });

    // Home slides
    var slidesContainer = $('.slides');
    var navContainer = $('.slides__nav');
    if (slidesContainer && navContainer) {
      // Build the slides bulleted navigation
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

      // Meny Spy on the home
      new MenuSpy(nav, {
        enableLocationHash: false,
        threshold: document.documentElement.clientHeight / 2,
        hashTimeout: 200,
        callback: function(currentItem){
          var state = currentItem.target.dataset.slidesNavState || 'default';
          navContainer.dataset.state = state;
        }
      });
    }

    // footnotes, sidenotes -> sidebar
    createSidenotesWrapper($('.page__body'), $$('.page__body h1'));

    $$('.article__body').forEach(function (article) {
      createSidenotesWrapper(article, []);
    });

    balanceNotes($$('.sidenotes-wrapper'), function (section) {
      return $$('.sidenote, .footnote-ref', section);
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

      if (window.location.hash && $(window.location.hash)) {
        var clickable = $('.clickable', $(window.location.hash));
        if (clickable) {
          clickable.click();
        }
      }
    }
  });
})();
