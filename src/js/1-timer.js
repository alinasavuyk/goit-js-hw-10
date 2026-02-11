import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate =null;
const button=document.querySelector('[data-start]');
const input = document.querySelector(`input`);
const valueDays=document.querySelector("[data-days]");
const valueHours=document.querySelector("[data-hours]");
const valueMinutes=document.querySelector("[data-minutes]");
const valueSeconds=document.querySelector("[data-seconds]")
button.addEventListener('click', handleClick);
 button.disabled=true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
   const selectedDate =selectedDates[0]
    if (selectedDate<new Date()){
        iziToast.warning({
    title: 'Caution',
    message: 'Please choose a date in the future',
});
        button.disabled=true;
    }else{
userSelectedDate= selectedDate;
 button.disabled=false;
    }},
};
flatpickr("#datetime-picker", options);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function handleClick() {
   button.disabled=true;
    input.disabled=true;
  const timerId = setInterval(() => {
    const currentTime = Date.now(); 
    const timerMs = userSelectedDate.getTime() - currentTime; 
    if (timerMs <= 0) {
      clearInterval(timerId);
       input.disabled=false; 
      return;
    } 
    const timeData = convertMs(timerMs);
    valueDays.textContent = addLeadingZero(timeData.days);
    valueHours.textContent = addLeadingZero(timeData.hours);
    valueMinutes.textContent = addLeadingZero(timeData.minutes);
    valueSeconds.textContent = addLeadingZero(timeData.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
