'use strict';

const obj = {
    name: 'Nik',
    age: '20',
    likeNumber: [1, 11, 121, 8],
    car: undefined,
    school: null,
};

const rules = {
    firstName: ['name'],
    numbers: ['likeNumber',
        numbers => numbers.filter(item => (item % 2) === 0),
        numbers => (numbers.length ? numbers : 'not numbers'),
    ],
    Mycar: ['car', car => (car ? car : 'no motor')],
    MySchool: ['school'],
};

const projection = rules => {
    const keys = Object.keys(rules);
    return obj => keys.reduce((newObj, key) => {
        newObj[key] = rules[key].reduce((value, fn, index) => (index ? fn(value) : obj[fn]), null);
        return newObj;
    }, {});
};

const fn = projection(rules);
const newObj = fn(obj);
console.dir(newObj);
