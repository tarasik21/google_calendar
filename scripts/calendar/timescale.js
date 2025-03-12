import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  // Генерируем массив чисел от 0 до 23
  const hours = createNumbersArray(0, 23);

  // Создаем переменную для хранения HTML разметки
  let timescaleHTML = '';

  // Цикл для генерации разметки для каждого часа
  hours.forEach(hour => {
    const hourFormatted = `${hour.toString().padStart(2, '0')}:00`; // Форматируем час в нужный вид (например, 00:00, 01:00, ...)

    // Формируем HTML разметку для текущего часа
    timescaleHTML += `
      <div class="calendar__time-slot">
        <span class="calendar__time-slot-time">${hourFormatted}</span>
      </div>
    `;
  });

  // Находим элемент .calendar__time-scale на странице
  const timescaleContainer = document.querySelector('.calendar__time-scale');

  // Вставляем сгенерированную разметку в .calendar__time-scale
  if (timescaleContainer) {
    timescaleContainer.innerHTML = timescaleHTML;
  }
};
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
