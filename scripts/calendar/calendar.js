 import { getItem } from '../common/storage.js';
 import { generateWeekRange  } from '../common/time.utils.js';
 import { renderEvents } from '../events/events.js';
 import { createNumbersArray } from '../common/createNumbersArray.js';
 import { daysOfWeek } from '../calendar/header.js';  // Убедитесь, что путь правильный
 import { getStartOfWeek } from '/scripts/common/time.utils.js';






// Функция для генерации разметки одного дня
// Функция для генерации разметки дня с 24 часами
export const generateDay = (date) => {
  let dayHTML = '';
  // Цикл по часам с 0 до 23
  for (let hour = 0; hour < 24; hour++) {
    const hourFormatted = `${hour.toString().padStart(2, '0')}:00`; // Форматируем время
    // Формируем HTML-разметку для каждого часа
    dayHTML += `
      <div class="calendar__time-slot" data-hour="${hour}" data-day="${date.getDate()}">
        <span class="calendar__time-slot-time">${hourFormatted}</span>
        <div class="calendar__time-slot-events"></div> 
      </div>
    `;
  }
  return dayHTML; // Возвращаем всю разметку
};

// Функция для рендеринга недели
export const renderWeek = () => {
  // 1. Отримуємо дату початку тижня з localStorage
  const displayedWeekStart = getItem('displayedWeekStart');
  if (!displayedWeekStart) return;

  const startDate = new Date(displayedWeekStart);

  // 2. Генеруємо 7 днів для тижня
  const weekDays = generateWeekRange(startDate);

  // 3. Формуємо HTML для кожного дня
  const weekHTML = weekDays.map((date) => {
    const dayNumber = date.getDate(); // Отримуємо число місяця
    return `
      <div class="calendar__day" data-day="${dayNumber}">
        ${generateDay(date)} <!-- Вставляємо 24 години для кожного дня -->
      </div>
    `;
  }).join('');

  // 4. Вставляємо розмітку в .calendar__week
  const weekContainer = document.querySelector('.calendar__week');
  if (weekContainer) {
    weekContainer.innerHTML = weekHTML;
  }

  // 5. Рендеримо події після вставки HTML
  renderEvents();
};


  
  
  
  
  
  
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
