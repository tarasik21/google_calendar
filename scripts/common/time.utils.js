import shmoment from './shmoment.js';
import { setItem } from './common/storage.js';

// Функція для отримання дати початку тижня (Понеділок)
export const getStartOfWeek = (date) => {
  if (!(date instanceof Date) || isNaN(date)) {
    console.error('Invalid Date passed to getStartOfWeek:', date);
    return; // Возвращаем undefined, если дата некорректна
  }

  const day = date.getDay(); // Получаем день недели (0 - воскресенье, 1 - понедельник и так далее)
  const diff = day === 0 ? -6 : 1 - day; // Если воскресенье (0), то сдвиг на -6, иначе на (1 - день недели)
  const startOfWeek = new Date(date); // Копируем переданную дату
  startOfWeek.setDate(date.getDate() + diff); // Сдвигаем дату на количество дней до понедельника
  startOfWeek.setHours(0, 0, 0, 0); // Устанавливаем время на 00:00 для начала дня

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
const startOfWeek = getStartOfWeek(new Date()); // Например, вычисление начала недели
setItem('displayedWeekStart', startOfWeek); // Сохранение в localStorage

const weekDays = generateWeekRange(startDate); // Сюда можно добавлять логику генерации дней недели



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
