import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

export const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];


export const renderHeader = () => {
  // 1. Получаем дату начала недели из localStorage
  const displayedWeekStart = getItem('displayedWeekStart') || getStartOfWeek(new Date());
  const startDate = new Date(displayedWeekStart);
  if (isNaN(startDate)) {
    console.error('Invalid startDate, using fallback.');
    startDate = getStartOfWeek(new Date());
  }
  

  // 2. Генерируем массив из 7 дней недели
  const weekDates = generateWeekRange(startDate);

  // 3. Создаем HTML-разметку для заголовка (7 дней недели)
  const weekHTML = weekDates.map((date) => {
    const dayOfWeek = daysOfWeek[date.getDay()]; // Получаем день недели
    const dayNumber = date.getDate(); // Получаем число месяца

    return `
      <div class="calendar__day-label" data-day="${dayNumber}">
        <span class="calendar__day-week">${dayOfWeek}</span>
        <span class="calendar__day-number">${dayNumber}</span>
      </div>
    `;
  }).join('');

  // 4. Вставляем разметку в .calendar__header
  document.querySelector('.calendar__header').innerHTML = weekHTML;

  // 5. Добавляем обработчик клика на кнопку "Create"
  document
    .querySelector('.create-event-btn')
    .addEventListener('click', openModal);
};

  

  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка


// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик