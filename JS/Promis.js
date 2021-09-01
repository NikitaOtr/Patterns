'use strict';
const output = document.getElementById('Promise');

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

const outputPhoto = data => {
    data.forEach(item => {
        output.insertAdjacentHTML('beforebegin',
            `<h4>${item.title}</h4>
            <img src="${item.thumbnailUrl}" alt="${item.title}">`);
    });
};

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1');
const twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');
const threeImg = getData('https://jsonplaceholder.typicode.com/photos/3');

// выполниться после race
Promise.all([oneImg, twoImg, threeImg])
    .then(outputPhoto)
    .catch(error => console.log(error));

// выполниться перед all
Promise.race([oneImg, twoImg, threeImg])
    .then(data => outputPhoto([data]))
    .catch(error => console.log(error));

