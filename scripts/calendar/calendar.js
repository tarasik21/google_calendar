 import { getItem } from '../common/storage.js';
 import { generateWeekRange } from '../common/time.utils.js';
 import { renderEvents } from '../events/events.js';
 import { createNumbersArray } from '../common/createNumbersArray.js';
 import { daysOfWeek } from '../calendar/header.js';  // Убедитесь, что путь правильный
 import { getStartOfWeek } from '/scripts/common/time.utils.js';






// Функция для генерации разметки одного дня
export const generateDay = () => {
  let dayHTML = '';
  for (let hour = 0; hour < 24; hour++) {
    const hourFormatted = hour.toString().padStart(2, '0') + ':00';
    dayHTML += `
      <div class="calendar__time-slot" data-hour="${hour}">
        <span class="calendar__time-slot-time">${hourFormatted}</span>
        <div class="calendar__time-slot-events"></div> 
      </div>
    `;
  }
  return dayHTML;
};

// Функция для рендеринга недели
export const renderWeek = () => {
  const weekStartDate = getStartOfWeek(new Date());
  const weekDays = generateWeekRange(weekStartDate);

  let weekHTML = `
    <thead>
      <tr>
        <th></th> <!-- Пустая ячейка для времени -->
        ${weekDays.map(date => {
          const dayOfWeek = daysOfWeek[date.getDay()];
          const dayNumber = date.getDate();
          return `<th>${dayOfWeek} ${dayNumber}</th>`;
        }).join('')}
      </tr>
    </thead>
    <tbody>
  `;

  for (let hour = 0; hour < 24; hour++) {
    const hourFormatted = `${hour.toString().padStart(2, '0')}:00`;
    weekHTML += `
      <tr>
        <td>${hourFormatted}</td> 
        ${weekDays.map(date => {
          return `
            <td class="calendar__time-slot" data-hour="${hour}" data-day="${date.getDate()}">
              ${generateDay()}  <!-- Теперь каждый день получает 24 блока -->
            </td>
          `;
        }).join('')}
      </tr>
    `;
  }

  weekHTML += '</tbody>';

  const weekContainer = document.querySelector('.calendar__week');
  if (!weekContainer) {
    console.error("Элемент .calendar__week не найден!");
    return;
  }

  weekContainer.innerHTML = weekHTML;

  console.log("Рендеринг недели выполнен!");
  renderEvents(); // если у тебя есть функция рендеринга событий
};


  
  
  
  
  
  
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
