'use strict';

const Memoization = (fn, length) => {
    const getKey = (args, fn) => args.reduce((res, item) => res + fn(item), '');

    const cach = new Map();

    return function(...args) {
        const key = getKey(args, item => JSON.stringify(item));

        if (cach.has(key)) {
            const res = cach.get(key);
            cach.delete(key);
            cach.set(key, res);
            return res;
        }

        if (cach.size === length) {
            const deleteKey = cach.keys().next().value;
            cach.delete(deleteKey);
        }

        const res = fn.call(this, ...args);
        cach.set(key, res);
        return res;
    };
};

const pow = (number, degree) => {
    let res = 0;
    for (let i = 0; i < degree; i++) { res += number; }
    return res;
};

const memoizPow = Memoization(pow, 2);

console.log(memoizPow(1, 1e1));
console.log(memoizPow(2, 1e2));
console.log(memoizPow(3, 1e3));
console.log(memoizPow(2, 1e2));
console.log(memoizPow(4, 1e4));
