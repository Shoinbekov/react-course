const numbers = [3, 7, 2, 10, 5];

// map() проходит по каждому элементу массива, что-то с ним делает и создаёт новый массив.

const doubledNumber = numbers.map((number) => {
    return number * 2;
});

// filter() означает буквально «отфильтровать».
// Он проходит по каждому элементу и проверяет условие.

const greaterThanFive = numbers.filter((number) => {
    return number > 5;
});

// filter() → найди ВСЕ подходящие.
// find() → найди ПЕРВЫЙ подходящий.

const firstGreaterThanFive = numbers.find((number) => {
    return number > 5;
});

// reduce() собирает элементы массива в одно итоговое значение.

const total = numbers.reduce((sum, number) => {
    return sum + number;
}, 0);

/*
Начни считать сумму с 0.
JavaScript делает примерно так:
Начало: sum = 0

0 + 3  = 3
3 + 7  = 10
10 + 2 = 12
12 + 10 = 22
22 + 5 = 27
*/

// number — текущее число из массива.
// sum — сумма, которая накапливается.


// includes() проверяет, есть ли указанное значение в массиве.

const hasTen = numbers.includes(10);

console.log(numbers);
console.log(doubledNumber);
console.log(greaterThanFive);
console.log(firstGreaterThanFive);
console.log(total);
console.log(hasTen);

/* 
[] → массив (Array)
{} → объект (Object)


const → создаём переменную
numbers → название переменной
[3, 7, 2, 10, 5] → array (массив)
{ name: "Anna", age: 20 } → object
*/
