const students = [
    {id: 1, name: "Anna", grade: 85},
    {id: 2, name: "John", grade: 62},
    {id: 3, name: "Sara", grade: 91},
    {id: 4, name: "Mike", grade: 55}
];


const passedStudents = students.filter((student) => {
    return student.grade >= 70;
});

// student.grade = оценка студента

const studentNames = students.map((student) => {
    return student.name;
});

// find() берёт студентов по очереди.

const studentById = students.find((student) => {
    return student.id === 3;
});

const topStudent = students.reduce((best, student) => {
    return student.grade > best.grade ? student : best;
});

// .grade означает «возьми свойство grade из объекта».

// condition ? value1 : value2 => Это называется тернарный оператор.

/* 

student.grade > best.grade  ?  student  :  best
──────────────────────────     ───────     ────
       условие                 если true   если false

*/

const totalGrade = students.reduce((sum, student) => {
    return sum + student.grade;
}, 0);

const averageGrade = totalGrade / students.length;

// students.length означает:
// Сколько элементов находится в массиве students.

// .length означает длина / количество элементов.

// .length называют свойством (property).
// . → обращаемся к его свойству

const studentWithPassed = students.map((student) => {
    return {
        ...student, // => Это spread operator.
        // passed: student.grade >= 70 можно и так написать
        passed: student.grade >= 70
    };
});

/*
...student означает примерно:
«Возьми всё, что находится внутри объекта student, и скопируй сюда».
*/

console.log(students);
console.log(students[0]);
console.log(students[1].name);
console.log(passedStudents);
console.log(studentNames);
console.log(studentById);
console.log(topStudent);
console.log(averageGrade);
console.log(studentWithPassed);
