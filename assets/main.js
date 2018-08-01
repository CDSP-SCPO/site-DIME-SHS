import menuspy from './vendor/menuspy.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));

const toc = document.getElementById('TableOfContents');
new menuspy(toc, {enableLocationHash: false});

const slidesContainer = $('.slides');
if (slidesContainer) {
  const nav = $('.slides__nav > ul');

  $$('.slide', slidesContainer).forEach((slide, i) => {
    if (!slide.getAttribute('id')) {
      slide.setAttribute('id', `slide:${i+1}`)
    }

    const id = slide.getAttribute('id');
    const li = document.createElement('li');
    li.innerHTML = `<a href="#${id}">${String(i+1)}</a>`;

    if (i === 0) {
      li.classList.add('active');
    }

    nav.appendChild(li);
  });

  new menuspy(nav, {
    enableLocationHash: false,
    // refElement: slidesContainer,
    threshold: 75,
    hashTimeout: 300,
  });
}

// toggle state
if(document.body.classList.contains('toggable-headlines')) {
  const headlines = $$('.article__title');
  const defaultState = document.body.classList.contains('toggable-headlines--closed') ? 'closed' : 'opened';

  headlines.forEach(headline => {
    headline.classList.add(defaultState);
    headline.classList.add('clickable');

    headline.addEventListener('click', (event) => {
      headline.classList.toggle('closed');
      headline.classList.toggle('opened');
    });

    const icon = document.createElement('span');
    icon.classList.add('open-close');
    icon.setAttribute('aria-role', 'button');
    headline.appendChild(icon);
  });
}

// footnotes -> sidenotes
$$('.footnotes').forEach(footnotes => {
  footnotes.setAttribute('hidden', true);

  const notes = $$('.footnote-return');

  notes.forEach((el) => {
    const id = el.hash.slice(1);
    const target = document.getElementById(id);
    const newNode = document.createElement('div');
    newNode.classList.add('in-sidebar');
    newNode.classList.add('in-sidebar--from-footnote');
    newNode.style.top = `${target.offsetTop}px`;

    newNode.innerHTML = el.parentElement.innerHTML;
    target.insertAdjacentElement('afterend', newNode);
  });
});

// because we'd like to wait for images to load before calculating stuff
window.addEventListener('load', () => {
  // content-notes -> sidenotes
  $$('.in-sidebar--from-content').forEach(sidenote => {
    const {previousElementSibling} = sidenote;

    if (!previousElementSibling) {
      return;
    }

    sidenote.style.top = `${previousElementSibling.offsetTop}px`;
  });

  // realign
  $$('.in-sidebar').forEach((sidenote, i, all) => {
    const previousAlike = all[i-1];

    if (i === 0 || !sidenote.parentElement.contains(previousAlike)) {
      return;
    }

    // move after if overlap
    const yStart = sidenote.offsetTop;
    const prevEnd = previousAlike.offsetTop + previousAlike.offsetHeight;

    if (yStart <= prevEnd) {
      sidenote.style.transform = `translateY(${prevEnd - yStart}px)`;
      sidenote.classList.add('moved');
    }
  });
});
