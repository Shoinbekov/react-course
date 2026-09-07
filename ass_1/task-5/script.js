const original = {
    name: "Alice",
    score: 10
};

const copy = original; // => не настоящий новый объект, обе переменные ссылаются на один объект.

// const copy = { ...original }; => создаётся новый объект с такими же свойствами.

copy.score = 20;

const original2 = {
    name: "Alice",
    score: 10
}

const copy2 = { ...original2 };

// ... означает скопировать свойства.
// А {} означает создать новый объект.

copy2.score = 50;

const user2 = {
    name: "Alice",
    address: {
        city: "Almaty"
    }
};

const userCopy = { ...user2 };

/*
{ ...user2 } => делает shallow copy — поверхностную копию.

Внешний объект новый, но вложенный объект address всё ещё общий:
user2 ────────→ новый внешний объект
                    │
                    └── address ──┐
                                  ↓
                             { city: "Almaty" }
                                  ↑
userCopy ──────→ другой объект    │
                    │             │
                    └── address ──┘
*/

userCopy.address.city = "Astana";

const user3 = {
    name: "Alice",
    address: {
        city: "Almaty"
    }
};

const userCopy2 = {
    ...user3,
    address: {
        ...user3.address
    }
};

userCopy2.address.city = "Astana";

console.log(user3.address.city);
console.log(userCopy2.address.city);

console.log(userCopy.address.city);
console.log(user2.address.city);

console.log(original2.score);
console.log(copy2.score);

console.log(copy);
console.log(original);