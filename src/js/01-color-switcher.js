const refs = {
  startBTN: document.querySelector('button[data-start]'),
  stopBTN: document.querySelector('button[data-stop]'),
}

let intervalID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangeColor() {
  refs.startBTN.disabled = true;
  refs.stopBTN.disabled = false;

  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeColor() {
  refs.stopBTN.disabled = true;
  refs.startBTN.disabled = false;
  clearInterval(intervalID);
}

refs.startBTN.addEventListener('click', startChangeColor);
refs.stopBTN.addEventListener('click', stopChangeColor);
