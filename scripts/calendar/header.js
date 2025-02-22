import { getItem } from '../common/storage.js';
import { generateWeekRange } from '../common/time.utils.js';
import { openModal } from '../common/modal.js';

const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const renderHeader = () => {
  const displayedWeekStart = localStorage.getItem('displayedWeekStart'); 

  if (!displayedWeekStart) {
    console.error('No "displayedWeekStart" found in localStorage');
    return;
  }


  const startDate = new Date(displayedWeekStart);
  if (isNaN(startDate)) {
    console.error('Invalid "displayedWeekStart" date in localStorage');
    return;
  }


  const weekDays = generateWeekRange(startDate);


  const headerHTML = weekDays.map(day => {
    const dayOfWeek = day.toLocaleString('en-US', { weekday: 'long' }); 
    const dayOfMonth = day.getDate();  
    const dataHour = 9;  

    return `<div class="calendar__day" data-hour="${dataHour}">
              <span class="calendar__day-name">${dayOfWeek}</span>
              <span class="calendar__day-number">${dayOfMonth}</span>
            </div>`;
  }).join('');  


  const calendarHeader = document.querySelector('.calendar__header');
  if (calendarHeader) {
    calendarHeader.innerHTML = headerHTML;
  }
};


const createButton = document.querySelector('.create-event-btn');
if (createButton) {
  createButton.addEventListener('click', () => {
    openModal(); 
  });
}





  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  // в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка


// при клике на кнопку "Create" открыть модальное окно с формой для создания события
// назначьте здесь обработчик
