import shmoment from './shmoment.js';

// вернет дату понедельника той недели, в которую входит переданный день
// Функція для отримання дати початку тижня (Понеділок)
// Функція для отримання дати початку тижня (Понеділок)
const getStartOfWeek = (date) => {
  const day = date.getDay();
  const diff = (day === 0 ? 6 : day - 1); // Якщо неділя (0), то ми йдемо назад на 6 днів
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0); // Налаштуємо час на початок дня (00:00)
  return startOfWeek;
};

// Генерація днів тижня для поточної дати з початком з понеділка
const weekStartDate = getStartOfWeek(new Date()); // перейменував startDate на weekStartDate
const weekDays = generateWeekRange(weekStartDate);

console.log('Генерація днів тижня:', weekDays);


// вернет массив из 7 дней, начиная и переданной даты
if (typeof weekDays === 'undefined') {
  const weekStartDate = getStartOfWeek(new Date()); // отримуємо дату початку тижня
  weekDays = generateWeekRange(weekStartDate); // генеруємо дні тижня
}

console.log('Генерація днів тижня:', weekDays);

// Ваш основний код
export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

// Генеруємо дні тижня для поточної дати
const startDate = new Date();  // Ти можеш замінити на будь-яку дату
const weekDays = generateWeekRange(startDate);

console.log('Генерація днів тижня:', weekDays);  // Тепер weekDays визначена


// вернет объект даты по переданной дате '2000-01-01' и времени '21:00'
export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

const monthsNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// вернет месяц и год для недели, в которой находится переданный день
export const getDisplayedMonth = (date) => {
  const weekStart = getStartOfWeek(date);
  const weekEnd = shmoment(date).add('days', 6).result();
  const startMonth = weekStart.getMonth();
  const startYear = weekStart.getFullYear();
  const endMonth = weekEnd.getMonth();
  const endYear = weekEnd.getFullYear();
  const isSameMonth = startMonth === endMonth;
  if (isSameMonth) {
    return `${monthsNames[startMonth]} ${startYear}`;
  }
  const isSameYear = startYear === endYear;
  return isSameYear
    ? `${monthsNames[startMonth]} - ${monthsNames[endMonth]} ${startYear}`
    : `${monthsNames[startMonth]} ${startYear} - ${monthsNames[endMonth]} ${endYear}`;
};