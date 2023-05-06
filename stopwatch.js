/** @type {HTMLElement} */
const min = document.getElementById("min");

/** @type {HTMLElement} */
const sec = document.getElementById("sec");

/** @type {HTMLElement} */
const cs = document.getElementById("cs");

/** @type {HTMLElement} */
const startButton = document.getElementById("start");

/** @type {HTMLElement} */
const runningBlock = document.getElementById("runningBox");

/** @type {HTMLElement} */
const stopButton = document.getElementById("stop");

/** @type {HTMLElement} */
const recordList = document.getElementById("list");


const CONTINUE_BUTTON_NAME = "계속";
const STOP_BUTTON_NAME = "정지";


/** @type {Number} */
let minVal = secVal = csVal = 0;

/** @type {Number} */
let intervalId = null;

const minCount = () => {
    minVal++;
    if (minVal < 10) {
        minStr = '0' + String(minVal);
    } else if (minVal < 100) {
        minStr = String(minVal);
    } else { 
        minVal = 0;
        minStr = '00';
    }
    min.innerHTML = minStr;
}

const secCount = () => {
    secVal++;
    if (secVal < 10) {
        secStr = '0' + String(secVal);
    } else if (secVal < 60) {
        secStr = String(secVal);
    } else {
        secVal = 0;
        secStr = '00';
        minCount();
    }
    sec.innerHTML = secStr;
}

const csCount = () => {
    csVal++;
    if (csVal < 10) {
        csStr = '0' + String(csVal);
    } else if (csVal < 100) {
        csStr = String(csVal);
    } else {
        csVal = 0;
        csStr = '00';
        secCount();
    }
    cs.innerHTML = csStr;
}

const start = () => {
    startButton.style.display = 'none';
    runningBlock.style.display = 'block';
    intervalId = setInterval(csCount, 10);
}

const timeStop = () => {
    if (stopButton.innerHTML == STOP_BUTTON_NAME) {
        clearInterval(intervalId);
        stopButton.innerHTML = CONTINUE_BUTTON_NAME;
    } else {
        intervalId = setInterval(csCount, 10);
        stopButton.innerHTML = STOP_BUTTON_NAME;
    }
}

const record = () => {
    const text = document.createElement("p");
    text.style.fontSize = "20px";
    text.innerHTML = min.innerText + ":" + sec.innerText + ":" + cs.innerText;
    recordList.appendChild(text);
}

const reset = () => {
    stopButton.innerHTML = STOP_BUTTON_NAME;
    runningBlock.style.display = "none";
    startButton.style.display = "block";
    clearInterval(intervalId);
    minVal = secVal = csVal = 0;
    min.innerHTML = '00';
    sec.innerHTML = '00';
    cs.innerHTML = '00';
    recordList.innerHTML = null;
}

startButton.addEventListener('click', () => start());
stopButton.addEventListener('click', () => timeStop());
document.getElementById("record").addEventListener('click', () => record());
document.getElementById("reset").addEventListener('click', () => reset());
