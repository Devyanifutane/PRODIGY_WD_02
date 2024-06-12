let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
    showButton("PAUSE");
}

function pause() {
    clearInterval(timerInterval);
    showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    showButton("PLAY");
    laps.innerHTML = "";
}

function lap() {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement("li");
    li.innerText = lapTime;
    laps.appendChild(li);
}

function showButton(buttonKey) {
    if (buttonKey === "PLAY") {
        startStopBtn.innerHTML = "Start";
    } else {
        startStopBtn.innerHTML = "Pause";
    }
}

startStopBtn.addEventListener("click", () => {
    if (!isRunning) {
        start();
    } else {
        pause();
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);