'use strict';

const postData = (url, data) => {
    const rez = fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }).then(response => {
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log('Всё гуд');
    });
    return rez;
};

const url = 'https://jsonplaceholder.typicode.com/photos';
const data = [1, 2, 3, 4, 5];
postData(url, data)
    .catch(error => console.log(error));


const getData = url => {
    const rez = fetch(url).then(response => {
        if (response.status !== 200) {
            throw new Error('Лол Ошибочка!!!');
        }
        return response.json();
    });
    return rez;
};

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1');
const twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');
const threeImg = getData('https://jsonplaceholder.typicode.com/photos/3');

Promise.all([oneImg, twoImg, threeImg])
    .then(data => {
        console.log(data);
    })
    .catch(error => console.warn(error));
