(() => {
  const getSiblings = function (elem, untilFn) {
    const siblings = [];
    let nextSibling = elem.nextElementSibling;

    while (nextSibling && untilFn(nextSibling) === false) {
      siblings.push(nextSibling);
      nextSibling = nextSibling.nextElementSibling;
    }

    return siblings;
  };

  const toggleHeadlines = (headlines, untilFn) => {
    const defaultState = document.body.classList.contains('toggable-headlines--closed') ? 'closed' : 'opened';
    const toggleSiblings = (headline) => {
      const nextItems = getSiblings(headline, untilFn);
      nextItems.forEach(s => s.classList.toggle('collapsed'));
    };

    headlines.forEach(headline => {
      headline.classList.add(defaultState);
      headline.classList.add('clickable');

      headline.addEventListener('click', (event) => {
        headline.classList.toggle('closed');
        headline.classList.toggle('opened');
        toggleSiblings(headline);
      });

      const icon = document.createElement('span');
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
