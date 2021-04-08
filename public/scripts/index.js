import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

const cards = document.querySelectorAll('.cards .card')
const deleteForm = document.querySelector('#delete-job')

for (let card of cards) {
  const cardId = card.dataset.id

  const deleteButton = card.querySelector('button.delete')
  deleteButton.onclick = (envet) => {
    let element = event.target.parentNode.parentNode.parentNode;
    console.log(element)
    let id = element.getAttribute('data-id');
    console.log(id)

    modal.open()
    deleteForm.setAttribute('action', `/job/${id}/delete`);
  }
}
