'use strict';
//Loger
const loger = fn => function(...args) {
    const res = fn.call(this, ...args);
    console.log('Вызов функции: ' + fn.name);
    console.log('Результаты: ' + res);
    return res;
};

const sum = (a, b, c) => a + b + c;

const sumLog = loger(sum);
sumLog(4, 50, 640);


//Eacher
function eacher(fn, data) {
    let count = 0;
    const interval = setInterval(() => {
        fn.call(this, data[count++]);
        if (count === data.length) { clearInterval(interval); }
    }, 0);
}

const arr = ['Рома', 'Илья', 'Алина', 'Ната'];
const printName = name => console.log('Имя: ' + name);

eacher(printName, arr);
