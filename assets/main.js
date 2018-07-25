const $$ = (selector) => Array.from(document.querySelectorAll(selector));

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
    newNode.style.top = `${target.parentElement.offsetTop}px`;

    newNode.innerHTML = el.parentElement.innerHTML;
    target.insertAdjacentElement('afterend', newNode);
  });
});

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
  console.log('%s <= %s', yStart, prevEnd)
  if (yStart <= prevEnd) {
    sidenote.style.transform = `translateY(${prevEnd - yStart}px)`;
    sidenote.classList.add('moved');
  }
});
