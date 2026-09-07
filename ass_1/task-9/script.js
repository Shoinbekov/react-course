function createCounter() {
    let count = 0;

    // Создай функцию createCounter. Когда она запустится, внутри неё будет создана 
    // переменная count со значением 0.

    function counter() {
        count = count + 1;
        return count;
    }


    // closure — это когда функция помнит переменные из места, 
    // где она была создана, даже после завершения внешней функции.

    return counter;
    
}

const myCounter = createCounter();
// createCounter  => сама функция
// createCounter()  => ВЫЗОВ функции

function createAdder(x) {
    function add(y) {
        return x + y;
    }

    return add;
}

const addTen = createAdder(10);

console.log(myCounter());
console.log(myCounter());
console.log(myCounter());
console.log(addTen(5));
console.log(addTen(20));
