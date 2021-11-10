'use strict';

// Частичное применение / Каррирование
const currying = (fn, ...params) => {
    function curried(...args) {
        if (fn.length <= args.length) {
            return fn.call(this, ...args);
        } else {
            return (...others) => curried(...args, ...others);
            // return other => curried(...args, other);
        }
    }
    return curried(...params);
    // return curried();
};

const sum = (a, b, c, d, e) => a + b + c + d + e;

const p0 = currying(sum);
const p1 = p0(1, 4, 6);
const p2 = p1();
const p3 = p2(3);
const p4 = p3(4);
const p5 = p4(5);
console.log(p5);


// Композиция
const composition = (...funcs) => function composit(...args) {
    return funcs.reduce((accum, fn, index) => (index ? fn.call(this, accum) : fn.call(this, ...accum)), args);
};

const f1 = (a, b = 0, c = 0) => a + b + c;
const f2 = x => x ** 2;
const f3 = z => {
    console.log('rez ' + z);
    return 'rez ' + z;
};

const com = composition(f1, f2, f3);
console.log(com(10, 34, 67));
