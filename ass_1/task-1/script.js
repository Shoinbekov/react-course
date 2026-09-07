const studentName = "Anna";
console.log(studentName);

let age = 20;
console.log(age);

// let → значение можно поменять.
// const → переменную нельзя переназначить.

const isActive = true;
console.log(isActive);

// "Anna" → текст → string
// 20 → число → number
// true → да/нет → boolean

const courses = ["JavaScript", "React", "HTML"];
console.log(courses);

// Квадратные скобки [] означают массив

const address = {
    city: "Almaty",
    street: "Abay"
};

console.log(address);

// Объект записывается с помощью фигурных скобок

console.log(typeof studentName);
console.log(typeof age);
console.log(typeof isActive);
console.log(typeof courses);
console.log(typeof address);

const emptyValue = null;

console.log(emptyValue); // null 
console.log(typeof emptyValue); // object

// What does "typeof null" return? => typeof null returns "object".

let notDefined;

console.log(notDefined);
console.log(typeof notDefined);

// null → мы сами специально сказали: «здесь значения нет».
// undefined → значение ещё не было задано.


// Primitive values — простые значения:
/* 
string
number
boolean
undefined
null
bigint
symbol
*/

// Reference values — объекты

/*
Object
Array
Function
*/

// const studentName = "Anna";
// let age = 20;

const sentence = `My name is ${studentName} and I am ${age} years old.`;

console.log(sentence);