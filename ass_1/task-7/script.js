const add = (a, b) => {
    return a + b;
};

const multiply = (a, b) => {
    return a * b;
};

const calculate = (a, b, operation) => {
    return operation(a, b);
};

// operation — это просто переменная-параметр.

// operation — это как пустое место для функции, а при вызове calculate() мы говорим, какую функцию туда поставить.

console.log(add(5, 3));
console.log(multiply(5, 3));
console.log(calculate(5, 3, add));
console.log(calculate(5, 3, multiply));