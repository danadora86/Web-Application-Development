import type {Student} from "./types.ts"
import {Undergraduate} from "./undergraduate.ts";
import {EveningStudent} from "./eveningstudent.ts";
import {University} from "./university.ts";

// Task 1
function printStudent(s: Student): void {
    const emailText = s.email?? "no Email provided";
    console.log(`ID ${s.id} | Name: ${s.name} | Course: ${s.course} | Email: ${emailText}`);
}

const s1: Student = {id: 1, name: "Khan", course: "Web Application", email: "khan@gmail.com"};
const s2: Student = {id: "E-2", name: "Sarah", course: "Javascript"};

printStudent(s1);
printStudent(s2);

console.log("---------------------------------------------------");

const uni = new University();
const u1 = new Undergraduate(101, "John", "Computer Science", ["COM101", "COM102"], "john@uni.com")
const e1 = new EveningStudent("EV-9", "Alice", "Web Application Development");

u1.addModule("COM103");

uni.enorlStudent(u1);
uni.enorlStudent(e1);

const found1 = uni.findStudentById(101);
const found2 = uni.findStudentById("EV-9");
const found3 = uni.findStudentById(23);

console.log(found1 ? found1.toString() : "Student not found")
console.log(found2 ? found2.toString() : "Student not found")
console.log(found3 ? found3.toString() : "Student not found")

