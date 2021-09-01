'use strict';

const input = document.querySelector('#Debounce_Throttle input');
const p = document.querySelector('#Debounce_Throttle p');

//Debounce
// time 250 - 300
const debounce = (fn, time) => {
    let flagTimeout;
    return function(...arg) {
        const fnCall = () => fn.apply(this, arg);
        clearTimeout(flagTimeout);
        flagTimeout = setTimeout(fnCall, time);
    };
};

const print = function(event) {
    const target = event.target;
    p.textContent = target.value;
};
const printDebounce = debounce(print, 300);
input.addEventListener('input', printDebounce);


// Throttle
const throttle = (fn, time) => {
    let isThrottled = false;
    let saveThis;
    let saveArgs;
    return function wrapper(...arg) {
        if (isThrottled) {
            saveThis = this;
            saveArgs = arg;
            return;
        }
        fn.apply(this, arg);
        isThrottled = true;
        setTimeout(() => {
            isThrottled = false;
            if (saveArgs) {
                wrapper.apply(saveThis, saveArgs);
                saveArgs = saveThis = null;
            }
        }, time);
    };
};

const consoleCoorrinate = function(event) {
    p.textContent = event.clientX + ' ' + event.clientY;
};
const consoleCoorrinateThrottle = throttle(consoleCoorrinate, 1000);
document.addEventListener('mousemove', consoleCoorrinateThrottle);


