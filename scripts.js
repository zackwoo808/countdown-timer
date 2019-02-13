'use strict';

let timeinterval;
let deadline = 'Feb 13 2019 22:30:00 PST';

const getTimeRemaining = (endtime) => {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24))

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
};

const initializeClock = (endtime) => {
    let daysSpan = document.querySelector('.days');
    let hoursSpan = document.querySelector('.hours');
    let minutesSpan = document.querySelector('.minutes');
    let secondsSpan = document.querySelector('.seconds');

    function updateClock() {
        let t = getTimeRemaining(endtime);
        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = t.hours;
        minutesSpan.innerHTML = t.minutes;
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    };

    updateClock();
    timeinterval = setInterval(updateClock, 1000);
};

const stopClock = () => {
    clearInterval(timeinterval);
}

const resetClock = () => {
    deadline = new Date();
}

let startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    initializeClock(deadline);
});

let stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', () => {
    stopClock();
});

let resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
    resetClock();
    initializeClock(deadline);
    stopClock();
});