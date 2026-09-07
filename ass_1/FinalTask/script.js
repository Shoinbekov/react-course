const students = [
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
    },

];

function getAverage(grades) {
    const total = grades.reduce((sum, grade) => {
        return sum + grade;
    }, 0);

    return total / grades.length;
}

console.log(getAverage([80, 90, 85]));

function getStudentAverage(student) {
    return getAverage(student.grades);
}

console.log(getStudentAverage(students[0]));

function getPassedStudents(student) {
    return student.filter((student) => {
        return getStudentAverage(student) >= 70;
    });
}

console.log(getPassedStudents(students));

function getStudentNames(students) {
    return students.map((student) => {
        return student.name;
    });
}

console.log(getStudentNames(students));

function findStudent(student, id) {
    return students.find((student) => {
        return student.id === id;
    });
}

console.log(findStudent(students, 3));

function getTopStudent(students) {
    return students.reduce((best, student) => {
        return getStudentAverage(student) > getStudentAverage(best)
            ? student
            : best;
    });
}

console.log(getTopStudent(students));

const finalStudents = students.map((student) => {
    const average = getStudentAverage(student);

    return {
        id: student.id,
        name: student.name,
        average: average,
        passed: average >= 70
    };
});

console.log(finalStudents);

