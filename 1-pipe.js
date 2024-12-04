"use strict";
const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

const pipe =
  (...fns) =>
  (x) => {
    for (const f of fns) {
      if (typeof f !== "function") {
        throw new Error("All arguments passed to pipe should be functions");
      }
    }
    return fns.reduce((acc, func) => func(acc), x);
  };

const f = pipe(inc, twice, cube);
console.log(f(5));

module.exports = { pipe };
