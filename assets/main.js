import menuspy from './vendor/menuspy.js';
import toggleHeadlines from './toggle-headlines.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));

const toc = document.getElementById('TableOfContents');
new menuspy(toc, {enableLocationHash: false});

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
    toggleHeadlines($$('.bibliography h3'), (el) => el.nodeName === 'H3');
  }
});
