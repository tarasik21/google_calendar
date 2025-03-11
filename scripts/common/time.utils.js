import shmoment from './shmoment.js';

// Функція для отримання дати початку тижня (Понеділок)
export const getStartOfWeek = (date) => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Перемещаемся к понедельнику
  startOfWeek.setDate(startOfWeek.getDate() + diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};




// Генерация недели из переданной даты
export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + i);
    result.push(newDate);
  }
  return result;
};

// Генерація днів тижня для поточної дати з початком з понеділка
const weekStartDate = getStartOfWeek(new Date()); // перейменував startDate на weekStartDate
const weekDays = generateWeekRange(weekStartDate); // Сюда можно добавлять логику генерации дней недели



// Функция, которая вернет объект с датой и временем по переданным параметрам
export const getDateTime = (date, time) => {
  const [hours, minutes] = time.split(':');
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

const monthsNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Функция для отображения месяца и года для недели, в которой находится переданный день
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
