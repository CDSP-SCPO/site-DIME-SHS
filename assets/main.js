const footnotes = document.querySelector('.footnotes');


if (footnotes) {
  footnotes.setAttribute('hidden', true);

  const notes = Array.from(document.querySelectorAll('.footnote-return'));

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
}
