'use strict';

const postData = (url, data) => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                resolve('Все гуд');
            } else {
                reject(request.statusText);
            }
        }
    });
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
});

const url = 'https://jsonplaceholder.typicode.com/photos';
const data = [1, 2, 3, 4, 5];
postData(url, data)
    .then(message => console.log(message))
    .catch(error => console.error(error));


const getData = url => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                const response = JSON.parse(request.responseText);
                resolve(response);
            } else {
                reject('Ошибка');
            }
        }
    });
    request.open('GET', url);
    request.send();
});


const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1');
const twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');
const threeImg = getData('https://jsonplaceholder.typicode.com/photos/3');

// all дождется загрузки всех и только потом выполнит then.
// В Функцию outputPhoto попадёт [dataOneImg, dataTwoImg, dataThreeImg]
Promise.all([oneImg, twoImg, threeImg])
    .then(data => console.log(data))
    .catch(error => console.log(error));

// race в then попадёт первый загруженны из массива.
// В Функцию outputPhoto попадёт данные из первого занруженного
Promise.race([oneImg, twoImg, threeImg])
    .then(data => console.log(data))
    .catch(error => console.log(error));

