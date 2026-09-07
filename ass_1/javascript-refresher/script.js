// ==================================================
// TASK 1 — VARIABLES & DATA TYPES
// ==================================================

const studentName = "Anna";
let studentAge = 20;
const isActive = true;

const courses = ["JavaScript", "React", "HTML"];

const studentAddress = {
    city: "Almaty",
    street: "Abay"
};

const emptyValue = null;
let notAssigned;

const introduction =
    `My name is ${studentName}. I am ${studentAge} years old and I live in ${studentAddress.city}.`;

document.getElementById("task1").innerHTML = `
    <p><strong>Name:</strong> ${studentName} — ${typeof studentName}</p>
    <p><strong>Age:</strong> ${studentAge} — ${typeof studentAge}</p>
    <p><strong>Active:</strong> ${isActive} — ${typeof isActive}</p>
    <p><strong>Courses:</strong> ${courses.join(", ")}</p>
    <p><strong>Address:</strong> ${studentAddress.city}, ${studentAddress.street}</p>
    <p><strong>null:</strong> ${emptyValue} — typeof null is "${typeof emptyValue}"</p>
    <p><strong>undefined:</strong> ${notAssigned}</p>
    <p><strong>Template literal:</strong> ${introduction}</p>
    <p><em>Insight: let can be reassigned, while const cannot be reassigned.</em></p>
`;


// ==================================================
// TASK 2 — ARRAY METHODS
// ==================================================

const numbersTask2 = [3, 7, 2, 10, 5];

const doubledNumbers = numbersTask2.map((number) => {
    return number * 2;
});

const greaterThanFive = numbersTask2.filter((number) => {
    return number > 5;
});

const firstGreaterThanFive = numbersTask2.find((number) => {
    return number > 5;
});

const totalTask2 = numbersTask2.reduce((sum, number) => {
    return sum + number;
}, 0);

const hasTen = numbersTask2.includes(10);

document.getElementById("task2").innerHTML = `
    <p><strong>Original:</strong> ${numbersTask2.join(", ")}</p>
    <p><strong>map() doubled:</strong> ${doubledNumbers.join(", ")}</p>
    <p><strong>filter() > 5:</strong> ${greaterThanFive.join(", ")}</p>
    <p><strong>find() first > 5:</strong> ${firstGreaterThanFive}</p>
    <p><strong>reduce() sum:</strong> ${totalTask2}</p>
    <p><strong>includes(10):</strong> ${hasTen}</p>
    <p><em>Insight: these methods allow us to process arrays without changing the original array.</em></p>
`;


// ==================================================
// TASK 3 — ARRAYS OF OBJECTS
// ==================================================

const studentsTask3 = [
    { id: 1, name: "Anna", grade: 85 },
    { id: 2, name: "John", grade: 62 },
    { id: 3, name: "Sara", grade: 91 },
    { id: 4, name: "Mike", grade: 55 }
];

const passedTask3 = studentsTask3.filter((student) => {
    return student.grade >= 70;
});

const studentNamesTask3 = studentsTask3.map((student) => {
    return student.name;
});

const studentId3 = studentsTask3.find((student) => {
    return student.id === 3;
});

const highestStudent = studentsTask3.reduce((best, student) => {
    return student.grade > best.grade ? student : best;
});

const totalGradesTask3 = studentsTask3.reduce((sum, student) => {
    return sum + student.grade;
}, 0);

const averageGradeTask3 = totalGradesTask3 / studentsTask3.length;

const studentsWithPassed = studentsTask3.map((student) => {
    return {
        ...student,
        passed: student.grade >= 70
    };
});

document.getElementById("task3").innerHTML = `
    <p><strong>Passed students:</strong> ${passedTask3.map(student => student.name).join(", ")}</p>
    <p><strong>Names:</strong> ${studentNamesTask3.join(", ")}</p>
    <p><strong>Student with ID 3:</strong> ${studentId3.name}</p>
    <p><strong>Highest grade:</strong> ${highestStudent.name} (${highestStudent.grade})</p>
    <p><strong>Average grade:</strong> ${averageGradeTask3.toFixed(2)}</p>
    <p><strong>New passed property:</strong> ${studentsWithPassed.map(student =>
        `${student.name}: ${student.passed}`
    ).join(" | ")}</p>
    <p><em>Insight: arrays can contain objects, and array methods can work with object properties.</em></p>
`;


// ==================================================
// TASK 4 — OBJECTS
// ==================================================

const userTask4 = {
    id: 1,
    name: "Shoin",
    age: 22,
    address: {
        city: "Almaty",
        street: "Abay"
    }
};

const originalNameTask4 = userTask4.name;
const originalCityTask4 = userTask4.address.city;

userTask4.age = 23;
userTask4.email = "shoin@example.com";
delete userTask4.address.street;

const { name: destructuredName, age: destructuredAge } = userTask4;
const { address: { city: destructuredCity } } = userTask4;
const { name: userName } = userTask4;

document.getElementById("task4").innerHTML = `
    <p><strong>Name:</strong> ${originalNameTask4}</p>
    <p><strong>City:</strong> ${originalCityTask4}</p>
    <p><strong>Updated age:</strong> ${userTask4.age}</p>
    <p><strong>Added email:</strong> ${userTask4.email}</p>
    <p><strong>Street after delete:</strong> ${userTask4.address.street}</p>
    <p><strong>Destructured:</strong> ${destructuredName}, ${destructuredAge}</p>
    <p><strong>Nested city:</strong> ${destructuredCity}</p>
    <p><strong>Renamed variable:</strong> ${userName}</p>
    <p><em>Insight: const objects can have their properties changed even though the variable itself cannot be reassigned.</em></p>
`;


// ==================================================
// TASK 5 — VALUES & REFERENCES
// ==================================================

const original = {
    name: "Alice",
    score: 10
};

const copy = original;
copy.score = 20;

const referenceResult = original.score;


const original2 = {
    name: "Alice",
    score: 10
};

const copy2 = {
    ...original2
};

copy2.score = 50;


const userTask5 = {
    name: "Alice",
    address: {
        city: "Almaty"
    }
};

const userCopy = {
    ...userTask5
};

userCopy.address.city = "Astana";

const shallowOriginalCity = userTask5.address.city;


const userTask5Deep = {
    name: "Alice",
    address: {
        city: "Almaty"
    }
};

const userCopyDeep = {
    ...userTask5Deep,
    address: {
        ...userTask5Deep.address
    }
};

userCopyDeep.address.city = "Astana";

document.getElementById("task5").innerHTML = `
    <p><strong>Reference copy:</strong> changing copy.score also changed original.score to ${referenceResult}</p>

    <p>
        <strong>Spread copy:</strong>
        original score = ${original2.score},
        copy score = ${copy2.score}
    </p>

    <p>
        <strong>Shallow nested copy:</strong>
        original city became ${shallowOriginalCity}
    </p>

    <p>
        <strong>Correct nested copy:</strong>
        original city = ${userTask5Deep.address.city},
        copy city = ${userCopyDeep.address.city}
    </p>

    <p><em>Insight: spread creates a shallow copy. Nested objects need to be copied separately.</em></p>
`;


// ==================================================
// TASK 6 — FUNCTIONS
// ==================================================

function isEven(number) {
    return number % 2 === 0;
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
    return a > b ? a : b;
}

const isEvenArrow = (number) => number % 2 === 0;

document.getElementById("task6").innerHTML = `
    <p><strong>isEven(10):</strong> ${isEven(10)}</p>
    <p><strong>getFullName:</strong> ${getFullName("Anna", "Smith")}</p>
    <p><strong>calculatePrice(100, 3):</strong> ${calculatePrice(100, 3)}</p>
    <p><strong>20% discount from 100:</strong> ${calculateDiscount(100, 20)}</p>
    <p><strong>getMax(10, 20):</strong> ${getMax(10, 20)}</p>
    <p><strong>Arrow isEven(7):</strong> ${isEvenArrow(7)}</p>
    <p><em>Insight: functions make code reusable and can receive values through parameters.</em></p>
`;


// ==================================================
// TASK 7 — FUNCTIONS AS VALUES
// ==================================================

const add = (a, b) => {
    return a + b;
};

const multiply = (a, b) => {
    return a * b;
};

const calculate = (a, b, operation) => {
    return operation(a, b);
};

document.getElementById("task7").innerHTML = `
    <p><strong>calculate(5, 3, add):</strong> ${calculate(5, 3, add)}</p>
    <p><strong>calculate(5, 3, multiply):</strong> ${calculate(5, 3, multiply)}</p>
    <p><em>Insight: a function can be stored in a variable and passed to another function as an argument.</em></p>
`;


// ==================================================
// TASK 8 — SCOPE
// ==================================================

const globalMessage = "Hello from global scope";

function scopeExample() {
    const functionMessage = "Hello from function scope";
    return functionMessage;
}

let varResult;

if (true) {
    var a = 10;
    let b = 20;
    const c = 30;

    varResult = `Inside block: a = ${a}, b = ${b}, c = ${c}`;
}

document.getElementById("task8").innerHTML = `
    <p><strong>Global:</strong> ${globalMessage}</p>
    <p><strong>Function:</strong> ${scopeExample()}</p>
    <p><strong>${varResult}</strong></p>
    <p><strong>Outside block, var a:</strong> ${a}</p>
    <p><strong>let b and const c:</strong> cannot be accessed outside the block.</p>
    <p><em>Insight: let and const are block scoped, while var can escape a normal block.</em></p>
`;


// ==================================================
// TASK 9 — CLOSURES
// ==================================================

function createCounter() {
    let count = 0;

    function counter() {
        count = count + 1;
        return count;
    }

    return counter;
}

const myCounter = createCounter();

const counter1 = myCounter();
const counter2 = myCounter();
const counter3 = myCounter();


function createAdder(x) {

    function addNumber(y) {
        return x + y;
    }

    return addNumber;
}

const addTen = createAdder(10);

document.getElementById("task9").innerHTML = `
    <p><strong>Counter call 1:</strong> ${counter1}</p>
    <p><strong>Counter call 2:</strong> ${counter2}</p>
    <p><strong>Counter call 3:</strong> ${counter3}</p>
    <p><strong>addTen(5):</strong> ${addTen(5)}</p>
    <p><strong>addTen(20):</strong> ${addTen(20)}</p>
    <p><em>Insight: closures allow a function to remember variables from the place where it was created.</em></p>
`;


// ==================================================
// TASK 10 — DESTRUCTURING, SPREAD & REST
// ==================================================

const numbersTask10 = [10, 20, 30, 40];

const [first, second] = numbersTask10;

const userTask10 = {
    id: 1,
    name: "Anna",
    age: 21
};

const {
    id: task10Id,
    name: task10Name,
    age: task10Age
} = userTask10;

const userWithScore = {
    ...userTask10,
    score: 50
};

const updatedUser = {
    ...userTask10,
    age: 22
};

const userWithEmail = {
    ...userTask10,
    email: "anna@example.com"
};

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combined = [
    ...array1,
    ...array2
];

function sum(...numbers) {
    return numbers.reduce((total, number) => {
        return total + number;
    }, 0);
}

document.getElementById("task10").innerHTML = `
    <p><strong>First:</strong> ${first}</p>
    <p><strong>Second:</strong> ${second}</p>
    <p><strong>Object destructuring:</strong> ${task10Id}, ${task10Name}, ${task10Age}</p>
    <p><strong>Score added:</strong> ${userWithScore.score}</p>
    <p><strong>Updated age:</strong> ${updatedUser.age}</p>
    <p><strong>Email:</strong> ${userWithEmail.email}</p>
    <p><strong>Combined arrays:</strong> ${combined.join(", ")}</p>
    <p><strong>sum(10, 20, 30, 40):</strong> ${sum(10, 20, 30, 40)}</p>
    <p><em>Insight: spread expands values, while rest collects multiple values into one array.</em></p>
`;


// ==================================================
// TASK 11 — OPTIONAL CHAINING & DEFAULTS
// ==================================================

const user1Task11 = {
    name: "Anna",
    address: {
        city: "Almaty"
    }
};

const user2Task11 = {
    name: "John"
};

const city1 = user1Task11.address?.city ?? "City not specified";
const city2 = user2Task11.address?.city ?? "City not specified";

const orZero = 0 || 100;
const nullishZero = 0 ?? 100;

const orEmpty = "" || "Default";
const nullishEmpty = "" ?? "Default";

const orFalse = false || true;
const nullishFalse = false ?? true;

const nullDefault = null ?? "Default";
const undefinedDefault = undefined ?? "Default";

document.getElementById("task11").innerHTML = `
    <p><strong>Anna city:</strong> ${city1}</p>
    <p><strong>John city:</strong> ${city2}</p>
    <p><strong>0 || 100:</strong> ${orZero}</p>
    <p><strong>0 ?? 100:</strong> ${nullishZero}</p>
    <p><strong>"" || "Default":</strong> ${orEmpty}</p>
    <p><strong>"" ?? "Default":</strong> "${nullishEmpty}"</p>
    <p><strong>false || true:</strong> ${orFalse}</p>
    <p><strong>false ?? true:</strong> ${nullishFalse}</p>
    <p><strong>null ?? "Default":</strong> ${nullDefault}</p>
    <p><strong>undefined ?? "Default":</strong> ${undefinedDefault}</p>
    <p><em>Insight: || replaces any falsy value, while ?? only replaces null or undefined.</em></p>
`;


// ==================================================
// FINAL TASK — STUDENT ANALYSIS
// ==================================================

const finalTaskStudents = [
    {
        id: 1,
        name: "Anna",
        age: 20,
        grades: [80, 90, 85]
    },
    {
        id: 2,
        name: "John",
        age: 21,
        grades: [60, 55, 70]
    },
    {
        id: 3,
        name: "Sara",
        age: 19,
        grades: [95, 90, 100]
    },
    {
        id: 4,
        name: "Mike",
        age: 22,
        grades: [50, 60, 55]
    },
    {
        id: 5,
        name: "Alex",
        age: 20,
        grades: [75, 80, 70]
    }
];


function getAverage(grades) {

    const total = grades.reduce((sum, grade) => {
        return sum + grade;
    }, 0);

    return total / grades.length;
}


function getStudentAverage(student) {
    return getAverage(student.grades);
}


function getPassedStudents(students) {

    return students.filter((student) => {
        return getStudentAverage(student) >= 70;
    });
}


function getStudentNames(students) {

    return students.map((student) => {
        return student.name;
    });
}


function findStudent(students, id) {

    return students.find((student) => {
        return student.id === id;
    });
}


function getTopStudent(students) {

    return students.reduce((best, student) => {

        return getStudentAverage(student) >
            getStudentAverage(best)
            ? student
            : best;
    });
}


const finalStudents = finalTaskStudents.map((student) => {

    const average = getStudentAverage(student);

    return {
        id: student.id,
        name: student.name,
        average,
        passed: average >= 70
    };
});


const finalResults = document.getElementById("finalResults");


finalStudents.forEach((student) => {

    const card = document.createElement("div");

    card.className = "student-card";

    card.innerHTML = `
        <h3>${student.name}</h3>

        <p>
            <strong>ID:</strong>
            ${student.id}
        </p>

        <p>
            <strong>Average:</strong>
            ${student.average.toFixed(2)}
        </p>

        <p class="${student.passed ? "passed" : "failed"}">
            <strong>Status:</strong>
            ${student.passed ? "Passed" : "Failed"}
        </p>
    `;

    finalResults.appendChild(card);
});


const passedStudents = getPassedStudents(finalTaskStudents);

const topStudent = getTopStudent(finalTaskStudents);

const foundStudent = findStudent(finalTaskStudents, 3);

const allStudentNames = getStudentNames(finalTaskStudents);


document.getElementById("finalSummary").innerHTML = `
    <p>
        <strong>All students:</strong>
        ${allStudentNames.join(", ")}
    </p>

    <p>
        <strong>Passed students:</strong>
        ${passedStudents.map(student => student.name).join(", ")}
    </p>

    <p>
        <strong>Student with ID 3:</strong>
        ${foundStudent.name}
    </p>

    <p>
        <strong>Top student:</strong>
        ${topStudent.name}
        (${getStudentAverage(topStudent).toFixed(2)})
    </p>

    <p>
        <em>
            Final insight: this task combines arrays, objects,
            functions, map, filter, find and reduce to transform
            student data without modifying the original array.
        </em>
    </p>
`;


// Console output for checking
console.log("Final Students:", finalStudents);