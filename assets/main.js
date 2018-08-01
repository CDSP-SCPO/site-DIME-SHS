import menuspy from './vendor/menuspy.js';
import toggleHeadlines from './toggle-headlines.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));

const toc = document.getElementById('TableOfContents');
new menuspy(toc, {enableLocationHash: false});

// scroll if anchor is targeted in a sticky context
window.addEventListener('hashchange', (event) => {
  const header = $('.site-header');

  // element is sticky if it's at the top but far from the document top
  if (header.offsetTop && header.clientTop === 0) {
    window.scrollBy(0, header.offsetHeight * -1);
  }
});

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

  // toggle state
  if(document.body.classList.contains('toggable-headlines')) {
    toggleHeadlines($$('.article__title'), (el) => el.classList.contains('article__title'));
    toggleHeadlines($$('.page__body h1'), (el) => el.nodeName === 'H1');
    toggleHeadlines($$('.page__body .f2'), (el) => el.classList.contains('f2'));
    toggleHeadlines($$('.bibliography h2'), (el) => el.nodeName === 'H2');
    toggleHeadlines($$('.bibliography-section h3'), (el) => el.nodeName === 'H3');
  }
});
