'use strict';

let timeinterval;
let userDays    = 0;
let userHours   = 0;
let userMinutes = 0;
let userSeconds = 0;
let pausedTime = {};
let oldDate;

// -----------------------------

const getTimeRemaining = (oldDate, t, resumedTime) => {
    let time = resumedTime ? resumedTime : t;
    let newDate = new Date(oldDate);
    newDate.setDate(newDate.getDate() + time.days);
    newDate.setTime(newDate.getTime() + time.hours*3600000);
    newDate.setTime(newDate.getTime() + time.minutes*60000);
    newDate.setTime(newDate.getTime() + time.seconds*1000);
    
    console.log(newDate);

    let timeLeft = Date.parse(newDate) - Date.parse(new Date());
    
    let seconds = Math.floor((timeLeft / 1000) % 60);
    let minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))

    return {
        'total': timeLeft,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
};

// -----------------------------

const initializeClock = (date, endtime) => {
    timeinterval = setInterval(() => {
      updateClock(date, timeinterval, endtime);
    }, 1000);
};

// -----------------------------

const updateDisplay = (days, hours, minutes, seconds) => {
    let daysSpan = document.querySelector('.days');
    let hoursSpan = document.querySelector('.hours');
    let minutesSpan = document.querySelector('.minutes');
    let secondsSpan = document.querySelector('.seconds');
    
    daysSpan.innerHTML = days ? days : 0;
    hoursSpan.innerHTML = hours ? hours : 0;
    minutesSpan.innerHTML = minutes ? minutes : 0;
    secondsSpan.innerHTML = seconds ? ('0' + seconds).slice(-2) : 0;    
};

// -----------------------------

const updateClock = (date, interval, t) => {
    let timeObject = getTimeRemaining(date, t);
    updateDisplay(+timeObject.days, +timeObject.hours, +timeObject.minutes, +timeObject.seconds);
    
    if (timeObject.total <= 0) {
        clearInterval(interval);
    }
};

// -----------------------------

const stopClock = () => {
    pausedTime = {
      fullDate: new Date(),
      days: +document.querySelector('.days').innerHTML,
      hours: +document.querySelector('.hours').innerHTML,
      minutes: +document.querySelector('.minutes').innerHTML,
      seconds: +document.querySelector('.seconds').innerHTML,
    }
    console.log(pausedTime);
    clearInterval(timeinterval);
    timeinterval = undefined;
}

// -----------------------------

const resetInputs = () => {
    document.getElementById("numDays").value    = 0;
    document.getElementById("numHours").value   = 0;
    document.getElementById("numMinutes").value = 0;
    document.getElementById("numSeconds").value = 0;
}

// -----------------------------

const resetValues = () => {
    userDays    = document.getElementById("numDays").value ?
                  document.getElementById("numDays").value : 0;
    userHours   = document.getElementById("numHours").value ?
                  document.getElementById("numHours").value : 0;
    userMinutes = document.getElementById("numMinutes").value ?
                  document.getElementById("numMinutes").value : 0;
    userSeconds = document.getElementById("numSeconds").value ?
                  document.getElementById("numSeconds").value : 0;
    pausedTime  = {};
}

// -----------------------------

const resetClock = () => {
    resetValues();
    updateDisplay();
}

// -----------------------------

const resumeClock = () => {
    const newDate = new Date();
    updateClock(newDate, timeinterval, pausedTime);
    timeinterval = setInterval(() => {
      updateClock(newDate, timeinterval, pausedTime);
    }, 1000);    
}

// -----------------------------

let startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    oldDate = new Date();
    resetValues();
    const t = {
      days: +userDays,
      hours: +userHours,
      minutes: +userMinutes,
      seconds: +userSeconds,
    }
    updateClock(oldDate, timeinterval, t);
    initializeClock(oldDate, t);
    
    document.getElementById("startButton").style.display = "none";
    document.getElementById("resumeButton").style.display = "inline";
    document.getElementById("resetButton").style.display = "inline";
    document.getElementById("pauseButton").style.display = "inline";    
});

// -----------------------------

let pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', () => {
    stopClock();
});

// -----------------------------

let resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', () => {
    resetClock();
    stopClock();
    
    document.getElementById("startButton").style.display = "inline";
    document.getElementById("resumeButton").style.display = "none";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("pauseButton").style.display = "none";
});

// -----------------------------

let resumeButton = document.getElementById('resumeButton');
resumeButton.addEventListener('click', () => {
    resumeClock();
});

updateDisplay();