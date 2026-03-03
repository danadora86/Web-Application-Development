interface Person {
    name: string;
    age: number;
}

function printPerson(p: Person) {
    console.log(`Name: ${p.name}, Age: ${p.age}`);
}

const alex = {
    name: "Alex"
};
printPerson(alex);