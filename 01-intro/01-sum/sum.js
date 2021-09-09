const isNumber = (x) => typeof x === 'number' || typeof x === 'bigint';

function sum(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError('Not a number');
  }

  return a + b;
}

module.exports = sum;
