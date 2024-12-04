"use strict";
const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

const compose = (...fns) => {
  const errors = [];

  const composed = (x) => {
    try {
      return fns.reduceRight((acc, func) => {
        if (acc === undefined) return undefined;
        try {
          return func(acc);
        } catch (e) {
          errors.forEach((listener) => listener(e));
          return undefined;
        }
      }, x);
    } catch (e) {
      errors.forEach((listener) => listener(e));
      return undefined;
    }
  };

  composed.on = (event, listener) => {
    if (event === "error") {
      errors.push(listener);
    }
    return undefined;
  };

  return composed;
};

const f = compose(inc, twice, cube);
console.log(f(5));

module.exports = { compose };
