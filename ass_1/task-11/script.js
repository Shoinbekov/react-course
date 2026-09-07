/*
?.  → безопасно проверить свойство
??  → запасное значение только для null / undefined
||  → запасное значение для falsy: 0, "", false, null, undefined
*/

const user1 = {
    name: "Anna",
    address: {
        city: "Almaty"
    }
};

const user2 = {
    name: "John"
};

const city = user2.address?.city ?? "City not specified";

/*
значение ?? запасноеЗначение

То есть:
Если слева null или undefined → возьми то, что справа.
*/

/*
?. → безопасно проверь, существует ли свойство

?? → если получилось null/undefined,
     используй запасное значение
*/

const value = 0;


console.log(user1.address?.city);
console.log(user2.address?.city);

/*
?. можно читать очень просто:

«Если address существует — возьми city. 
Если не существует — не выдавай ошибку.»
*/

console.log(city);
console.log(value || 100);
console.log(value ?? 100);

/*
|| → «Если значение ложное — дай запасное».

20 || 100  → 20
5  || 100  → 5

0  || 100  → 100
"" || 100  → 100
false || 100 → 100
null || 100 → 100
undefined || 100 → 100
*/