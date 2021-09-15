const isNumber = (x: number) => typeof x === "number" || typeof x === "bigint";

export default function sum(a: number, b: number) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new TypeError("Not a number");
  }

  return a + b;
}