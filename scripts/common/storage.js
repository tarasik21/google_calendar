let storage = {
  // используется для удаления события
  eventIdToDelete: null,
  // хранит дату понедельника той отображаемой недели
  displayedWeekStart: null,
  // хранит массив всех событий
  events: [],
  // это все данные, которые вам нужно хранить для работы приложения
};

export const getItem = (key) => {
  const data = localStorage.getItem(key);
  return data ? new Date(data) : null; // Преобразуем строку в Date, если она есть
};

export const setItem = (key, value) => {
  localStorage.setItem(key, value.toISOString()); // Сохраняем дату в формате ISO
};


// пример объекта события
const eventExample = {
  id: 0.7520027086457333, // id понадобится для работы с событиями
  title: 'Title',
  description: 'Some description',
  start: new Date('2020-03-17T01:10:00.000Z'),
  end: new Date('2020-03-17T04:30:00.000Z'),
};
