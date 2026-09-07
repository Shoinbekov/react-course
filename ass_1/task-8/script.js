/* 
scope — это область видимости переменной. Проще говоря:
Где переменную можно использовать, а где её уже не видно.
*/

const message = "Hello"; //  => находится снаружи функции, поэтому это глобальная переменная.

function showMessage() {
    console.log(message);
}

function testScope() {
    const text = "Hello from function";

    console.log(text);
}

// Переменная, созданная внутри функции, доступна только внутри этой функции.
// Это называется function scope.

if (true) {
    const blockMessage = "I am inside the block";

    console.log(blockMessage);
}

if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
}

// let и const, созданные внутри { }, работают только внутри этих { }.

/*
Global scope   → переменная снаружи, её видно внутри
Function scope → переменная внутри функции, снаружи её не видно
Block scope    → let/const внутри { }, снаружи их не видно
var            → может выходить из обычного блока { }
*/


showMessage();
console.log(message);
testScope();
console.log(a);