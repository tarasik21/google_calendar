import { getItem, setItem } from '../common/storage.js';
import { renderWeek } from '../calendar/calendar.js';
import { renderHeader } from '../calendar/header.js';
import { getStartOfWeek, getDisplayedMonth } from '../common/time.utils.js';

const navElem = document.querySelector('.navigation');
const displayedMonthElem = document.querySelector('.navigation__displayed-month');

// Функція для відображення поточного місяця
function renderCurrentMonth() {
  const displayedWeekStart = getItem('displayedWeekStart');

  // Перевірка, чи є коректна дата
  if (!displayedWeekStart || isNaN(new Date(displayedWeekStart).getTime())) {
    displayedMonthElem.textContent = "Invalid Date";
    return;
  }

  // Формуємо відображення місяця
  const displayedMonth = getDisplayedMonth(new Date(displayedWeekStart));
  displayedMonthElem.textContent = displayedMonth;
}

// Функція для обробки зміни тижня
const onChangeWeek = (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const direction = button.dataset.direction;
  let currentWeekStart = getItem('displayedWeekStart');

  // Якщо немає збереженої дати або дата некоректна, використовуємо поточний початок тижня
  if (!currentWeekStart || isNaN(new Date(currentWeekStart).getTime())) {
    currentWeekStart = getStartOfWeek(new Date());
  } else {
    currentWeekStart = new Date(currentWeekStart);
  }

  // Оновлюємо дату в залежності від напрямку (наступний, попередній, сьогодні)
  if (direction === 'next') {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  } else if (direction === 'prev') {
    currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  } else if (direction === 'today') {
    currentWeekStart = getStartOfWeek(new Date()); // Сьогоднішній тиждень
  }

  // Зберігаємо нову дату та оновлюємо відображення
  setItem('displayedWeekStart', currentWeekStart);
  renderHeader();
  renderWeek();
  renderCurrentMonth(); // Оновлюємо місяць після зміни тижня
};

export const initNavigation = () => {
  renderCurrentMonth(); // Відображаємо початковий місяць
  navElem.addEventListener('click', onChangeWeek); // Додаємо слухача на кнопки навігації
};
