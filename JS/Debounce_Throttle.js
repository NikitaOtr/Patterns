'use strict';

const input = document.querySelector('#Debounce_Throttle input');
const p = document.querySelector('#Debounce_Throttle p');

//Debounce
const debounce = (fn, time) => {
    let flagTimeout;
    return function(...args) {
        const fnCall = () => fn.call(this, ...args);
        clearTimeout(flagTimeout);
        flagTimeout = setTimeout(fnCall, time);
    };
};

const print = text => p.textContent = text;

const printDebounce = debounce(print, 300);

input.addEventListener('input', event => {
    printDebounce(event.target.value);
});


// Throttle
const throttle = (fn, time) => {
    let isThrottled = false;
    let saveThis;
    let saveArgs;
    return function wrapper(...args) {
        if (isThrottled) {
            saveThis = this;
            saveArgs = args;
            return;
        }
        fn.call(this, ...args);
        isThrottled = true;
        setTimeout(() => {
            isThrottled = false;
            if (saveArgs) {
                wrapper.call(saveThis, ...saveArgs);
                saveArgs = saveThis = null;
            }
        }, time);
    };
};

const printCoordinates = (x, y) => p.textContent = `X:${x}  Y:${y}`;

const printCoordinatesThrottle = throttle(printCoordinates, 1000);

document.addEventListener('mousemove', event => {
    printCoordinatesThrottle(event.clientX, event.clientY);
});
