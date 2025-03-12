import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';



const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector(
  '.navigation__displayed-month'
);


export const renderCurrentMonth = () => {
  // 1. Получаем начало недели из localStorage или используем текущую дату
  const displayedWeekStart = getItem('displayedWeekStart');
  const startDate = displayedWeekStart ? new Date(displayedWeekStart) : new Date();
  
  // 2. Извлекаем месяц из даты (индексация месяцев начинается с 0, т.е. январь = 0, февраль = 1 и т.д.)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthName = monthNames[startDate.getMonth()]; // Получаем название месяца

  // 3. Вставляем название месяца в .navigation__displayed-month
  const monthContainer = document.querySelector('.navigation__displayed-month');
  if (monthContainer) {
    monthContainer.textContent = monthName;
  }
};

  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  // вставить в .navigation__displayed-month

  const onChangeWeek = (event) => {
    const direction = event.target.getAttribute('data-direction'); // получаем направление (next/prev)
    const displayedWeekStart = localStorage.getItem('displayedWeekStart');
    
    if (!displayedWeekStart) {
      console.error('No displayedWeekStart found in localStorage');
      return; // Если в localStorage нет даты, возвращаемся
    }
  
    const displayedDate = new Date(displayedWeekStart); // Преобразуем строку в объект Date
  
    // Проверка на корректность даты
    if (isNaN(displayedDate)) {
      console.error('Invalid date in localStorage:', displayedWeekStart);
      return;
    }
  
    let newStartDate;
  
    // Если направление "next", сдвигаем на 7 дней вперед
    if (direction === 'next') {
      newStartDate = new Date(displayedDate);
      newStartDate.setDate(displayedDate.getDate() + 7);
    } 
    // Если направление "prev", сдвигаем на 7 дней назад
    else if (direction === 'prev') {
      newStartDate = new Date(displayedDate);
      newStartDate.setDate(displayedDate.getDate() - 7);
    }
  
    // Вычисляем начало недели для нового отображаемого дня
    const startOfNewWeek = getStartOfWeek(newStartDate);
  
    // Если startOfNewWeek корректная
    if (startOfNewWeek) {
      // Обновляем дату начала недели в localStorage
      localStorage.setItem('displayedWeekStart', startOfNewWeek.toISOString());
  
      // Перерисовываем элементы
      renderHeader();
      renderWeek();
      renderCurrentMonth();
    }
  };

  

  
  export const initNavigation = () => {
    renderCurrentMonth();
    navElem.addEventListener('click', onChangeWeek);
  };