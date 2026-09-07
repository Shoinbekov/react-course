function isEven(number) {

    /*
    function → говорим JavaScript: создаю функцию
    isEven → название функции, мы его придумали
    number → значение, которое функция получит
    */

    return number % 2 === 0;

    // % — остаток от деления.
    
}

function getFullName(firstName, lastName) {

    return `${firstName} ${lastName}`;
}

function calculatePrice(price, quantity) {
    return price * quantity;
}

function calculateDiscount(price, percent) {
    return price - (price * percent / 100);
}

function getMax(a, b) {
    if (a > b) {
        return a;
    }else {
        return b;
    }

    // return a > b ? a : b;

}

const isEvenArrow = (number) => {
    return number % 2 === 0;
};

/**
function isEven(number)
and
const isEvenArrow = (number) =>
— два способа создания функции.

А поскольку внутри только один return, можно написать ещё короче:
const isEvenArrow = (number) => number % 2 === 0;

*/


console.log(isEven(10));
console.log(isEven(7));
console.log(getFullName("Shoinbek", "Shoinbekov"));
console.log(calculatePrice(500, 3));
console.log(calculateDiscount(1000, 20));
console.log(getMax(10, 20));
console.log(isEvenArrow(10));
