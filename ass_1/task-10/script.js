const number = [10, 20, 30, 40];
const [first, second] = number;

const user = {
    id: 1,
    name: "Anna",
    age: 21
};

const { id, name, age } = user;
// Это деструктуризация объекта.

const userWithScore = {
    ...user,
    score: 50
};

const updatedUser = {
    ...user,
    age: 22
};

const userWithEmail = {
    ...user,
    email: "anna@example.com"
};

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combined = [...array1, ...array2];

function sum(...numbers) {
    console.log(numbers);
}

function sum(...numbers) {
    return numbers.reduce((total, number) => {
        return total + number;
    }, 0);
}

/*
Destructuring → достаём значения
Spread ...    → раскрывает/копирует
Rest ...      → собирает значения
*/

console.log(first);
console.log(second);
console.log(id, name, age);
console.log(userWithScore);
console.log(updatedUser);
console.log(user);
console.log(userWithEmail);
console.log(user);
console.log(combined);
sum(10, 20, 30, 40);
console.log(sum(10, 20, 30, 40));
