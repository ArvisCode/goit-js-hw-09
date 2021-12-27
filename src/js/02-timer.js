import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input : document.querySelector('#datetime-picker'),
  startBTN : document.querySelector('[data-start]'),
  days : document.querySelector('[data-days]'),
  hours : document.querySelector('[data-hours]'),
  minutes : document.querySelector('[data-minutes]'),
  seconds : document.querySelector('[data-seconds]'),
}

refs.startBTN.disabled = true;
let selectedTime = 0;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = this.config.defaultDate.getTime();
    if (currentDate > selectedDate) {
      alert('Please choose a date in the future');
      return;
    }
    selectedTime = selectedDates[0];
    refs.startBTN.disabled = false;
  }
}

function start() {
  intervalID = setInterval(() => {
    const currentTime = Date.now();
    const timeLeftMs = selectedTime.getTime() - currentTime;
    const timeLeft = convertMs(timeLeftMs);

    refs.days.textContent = addLeadingZero(timeLeft.days);
    refs.hours.textContent = addLeadingZero(timeLeft.hours);
    refs.minutes.textContent = addLeadingZero(timeLeft.minutes);
    refs.seconds.textContent =addLeadingZero(timeLeft.seconds);

    if (timeLeftMs < 1000) {
      //alert('Time is over. Enter new date.');
      clearInterval(intervalID);
    }
  }, 1000);
}

flatpickr(refs.input, options);
refs.startBTN.addEventListener('click', start)

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}