 import { getItem } from '../common/storage.js';
 import { generateWeekRange } from '../common/time.utils.js';
 import { renderEvents } from '../events/events.js';
 import { createNumbersArray } from '../common/createNumbersArray.js';
 import { getStartOfWeek } from '../common/time.utils.js';


 export const generateDay = () => {
  console.log('Виклик generateDay()');
  let dayHTML = ''; 

  for (let hour = 0; hour < 24; hour++) {
    const hourFormatted = hour.toString().padStart(2, '0') + ':00';
    dayHTML += `
      <div class="calendar__time-slot" data-hour="${hour}">
        <span class="calendar__time-slot-time">${hourFormatted}</span>
        <div class="calendar__time-slot-events"></div> 
      </div>
    `;
  }

  return dayHTML;
};






  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)




  export function renderWeek() {
    const weekStartDate = getStartOfWeek(new Date());
    
    // Оголошуємо та присвоюємо значення weekDays тільки всередині цієї функції
    const weekDays = generateWeekRange(weekStartDate);
  
    // Подальша робота з weekDays
    weekDays.forEach((date) => {
      const dayNumber = date.getDate();
      console.log(`Рендерим день ${dayNumber} (${date.toDateString()})`);
      
      weekHTML += `
        <div class="calendar__day" data-day="${dayNumber}">
          ${generateDay()}
        </div>
      `;
    });
    console.log('Сформированный HTML:', weekHTML);
    
    // Вставка сформованої розмітки
    weekContainer.innerHTML = weekHTML;
  }
  
  
  
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents
