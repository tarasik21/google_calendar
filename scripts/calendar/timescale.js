import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  const timescaleContainer = document.querySelector('.calendar__time-scale');
  
  if (!timescaleContainer) {
    console.error('Element with class ".calendar__time-scale" not found.');
    return;
  }

  let timescaleHTML = ''; 

  for (let hour = 0; hour < 24; hour++) {

    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;


    timescaleHTML += `
      <div class="time-slot" data-hour="${hour}">
        <span class="time-slot__label">${formattedHour}:00</span>
      </div>`;
  }


  timescaleContainer.innerHTML = timescaleHTML;
};


renderTimescale();
