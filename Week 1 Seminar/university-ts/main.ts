import type {Student} from "./types.ts"

// Task 1
function printStudent(s: Student): void {
    const emailText = s.email?? "no Email provided";
    console.log(`ID ${s.id} | Name: ${s.name} | Course: ${s.course} | Email: ${emailText}`);
}

const s1: Student = {id: 1, name: "Khan", course: "Web Application", email: "khan@gmail.com"};
const s2: Student = {id: "E-2", name: "Sarah", course: "Javascript"};

printStudent(s1);
printStudent(s2);
