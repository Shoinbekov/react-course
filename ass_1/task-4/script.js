const user = {
    id: 1,
    name: "Shoin",
    age: 22,
    address: {
        city: "Almaty",
        street: "Abay"
    }
};

/*
const для объекта не запрещает менять его свойства. const запрещает
присвоить самой переменной совершенно другое значение.
*/

// user.age => получить свойство

user.age = 23;

user.email = "shoin@example.com";

delete user.address.street;

const { name, age } = user;

// Возьми из объекта user свойства name и age и создай 
// переменные с такими же названиями.

const { address: { city } } = user;

/*
обычный способ
const city = user.address.city;

destructuring
const { address: { city } } = user;
*/

const { name: userName } = user;
// «Возьми name из user и сохрани его в переменную userName.»

/*
Важно: сам объект не изменился. В нём всё ещё:
user.name
А не:
user.userName
*/

console.log(user);
console.log(user.address.city);
console.log(user.age);
console.log(name);
console.log(age);
console.log(city);
console.log(userName);
