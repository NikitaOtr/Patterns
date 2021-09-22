'use strict';
//Loger
const loger = callback => (...arg) => {
    const res = callback(...arg);
    console.log('Вызов функции: ' + callback.name);
    console.log('Результаты: ' + res);
    return res;
};

const sum = (a, b, c) => a + b + c;

const sumLog = loger(sum);
sumLog(4, 50, 600);

//Eacher
const eacher = (data, callback) => {
    let count = 0;
    const interval = setInterval(() => {
        callback(data[count++]);
        if (count === data.length) { clearInterval(interval); }
    }, 0);
};

const arr = ['Рома', 'Илья', 'Алина', 'Ната'];
const printName = name => console.log('Имя: ' + name);

eacher(arr, printName);
