
const modalElem = document.querySelector('.modal');
const modalContentElem = document.querySelector('.modal__content');

// Функция для открытия модального окна
export function openModal() {
  modalElem.classList.add('modal_open');
}

// Функция для закрытия модального окна
export function closeModal() {
  modalElem.classList.remove('modal_open');
}

// Закрытие при клике на фон
modalElem.addEventListener('click', event => {
  if (!modalContentElem.contains(event.target)) {
    closeModal();
  }
});

// опишите ф-ции openModal и closeModal
// модальное окно работает похожим на попап образом
// отличие в том, что попап отображается в месте клика, а модальное окно - по центру экрана
