const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

// Функция для создания и отображения модального окна
// modal.js

export const openModal = () => {
  const modalElem = document.createElement('div');
  modalElem.classList.add('modal');

  const modalContentElem = document.createElement('div');
  modalContentElem.classList.add('modal__content');
  
  const closeButton = document.createElement('button');
  closeButton.classList.add('close-btn');
  closeButton.innerText = 'Закрыть';

  const header = document.createElement('h2');
  header.innerText = 'Это модальное окно';
  const paragraph = document.createElement('p');
  paragraph.innerText = 'Здесь может быть какой-то контент...';

  modalContentElem.appendChild(closeButton);
  modalContentElem.appendChild(header);
  modalContentElem.appendChild(paragraph);
  modalElem.appendChild(modalContentElem);
  
  document.body.appendChild(modalElem);
  
  modalElem.style.display = 'flex';

  closeButton.addEventListener('click', () => closeModal(modalElem));
};

export const closeModal = (modalElem) => {
  modalElem.style.display = 'none';
  modalElem.remove();
};


// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана