export const createNumbersArray = (from, to) => {
  // Создаем массив для хранения чисел
  const numbersArray = [];
  
  // Цикл для генерации чисел от from до to включительно
  for (let i = from; i <= to; i++) {
    numbersArray.push(i);
  }
  
  // Возвращаем сгенерированный массив
  return numbersArray;
};

  // ф-ция должна генерировать массив чисел от from до to
