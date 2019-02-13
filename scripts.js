'use strict';

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

const initializeClock = (id, endtime) => {
    let clock = document.getElementById(id);
    let daysSpan = document.querySelector('.days');
    let hoursSpan = document.querySelector('.hours');
    let minutesSpan = document.querySelector('.minutes');
    let secondsSpan = document.querySelector('.seconds');
    let timeinterval;

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

let deadline = 'Feb 12 2019 22:30:00 PST';
initializeClock('clockdiv', deadline);