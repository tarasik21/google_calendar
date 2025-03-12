// Инициализация объекта storage из localStorage, если он существует
let storage = JSON.parse(localStorage.getItem('storage')) || {
  eventIdToDelete: null,
  displayedWeekStart: null,
  events: [], // Массив событий
};

// Функция для установки значения в объект storage и сохранения его в localStorage
export const setItem = (key, value) => {
  storage[key] = value; // Присваиваем значение в локальный объект storage
  localStorage.setItem(key, JSON.stringify(value)); // Сохраняем в localStorage
};

// Функция для получения значения по ключу из объекта storage
export const getItem = (key) => {
  return storage[key]; // Возвращаем значение по ключу
};

// Функция для удаления значения по ключу из объекта storage и синхронизации с localStorage
export const removeItem = (key) => {
  delete storage[key]; // Удаляем значение по ключу из объекта storage

  // Сохраняем обновленный объект storage в localStorage
  localStorage.setItem('storage', JSON.stringify(storage));
};

// Пример объекта события
const eventExample = {
  id: 0.7520027086457333, // уникальный id для события
  title: 'Title',
  description: 'Some description',
  start: new Date('2020-03-17T01:10:00.000Z'),
  end: new Date('2020-03-17T04:30:00.000Z'),
};

// Пример добавления события в events
setItem('events', [...getItem('events'), eventExample]);

// Пример получения всех событий
console.log(getItem('events'));

// Пример удаления события
removeItem('eventIdToDelete');
