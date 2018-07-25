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

    newNode.innerHTML = el.parentElement.innerHTML;
    target.insertAdjacentElement('afterend', newNode);
    target.setAttribute('hidden', true);
  });
});

// content-notes -> sidenotes
$$('.in-sidebar--from-content').forEach(sidenote => {
  const {previousElementSibling} = sidenote;

  sidenote.style.top = `${previousElementSibling.offsetTop}px`;
});
