'use strict';
const output = document.getElementById('Promise');

const postData = (url, data) => fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    // credentials: 'include' or 'same-origin',
});
const url = 'https://jsonplaceholder.typicode.com/photos';
const data = [1, 2, 3, 4, 5];
postData(url, data)
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        console.log('Всё гуд');
    })
    .catch(error => console.log(error));


const getData = url => fetch(url);

const outputPhoto = data => {
    data.forEach(item => {
        output.insertAdjacentHTML('beforebegin',
            `<h4>${item.title}</h4>
            <img src="${item.thumbnailUrl}" alt="${item.title}">`);
    });
};

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1');

oneImg
    .then(response => {
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(data => {
        outputPhoto([data]);
    })
    .catch(error => console.log(error));
