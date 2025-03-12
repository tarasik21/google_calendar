import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';
import { getStartOfWeek } from '../common/time.utils.js';


export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const renderHeader = () => {
  // Отримуємо дату початку тижня з localStorage
  const displayedWeekStart = getItem('displayedWeekStart');
  if (!displayedWeekStart) return; // Якщо в storage нічого нема, виходимо

  const startDate = new Date(displayedWeekStart);

  // Генеруємо масив із 7 днів
  const weekDates = generateWeekRange(startDate);

  // Створюємо HTML для заголовка календаря
  const weekHTML = weekDates.map((date) => {
    const dayOfWeek = daysOfWeek[date.getDay()]; // Назва дня
    const dayNumber = date.getDate(); // Число місяця

    return `
      <div class="calendar__day-label" data-day="${dayNumber}">
        <span class="calendar__day-week">${dayOfWeek}</span>
        <span class="calendar__day-number">${dayNumber}</span>
      </div>
    `;
  }).join('');

  // Вставляємо розмітку у календар
  const headerElement = document.querySelector('.calendar__header');
  if (headerElement) {
    headerElement.innerHTML = weekHTML;
  }

  // Додаємо обробник для кнопки "Create"
  const createEventBtn = document.querySelector('.create-event-btn');
  if (createEventBtn) {
    createEventBtn.addEventListener('click', openModal);
  }
};

  

  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка


// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик