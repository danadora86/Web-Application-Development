import type {Student} from "./types.ts";

export class University {
    students: Student[];

    constructor() {
        this.students = [];
    }

    enorlStudent(student: Student): void {
        this.students.push(student);
    }

    findStudentById(id: string | number): Student | null {
        for (const s of this.students) {
            if (s.id === id) return s;
        }
        return null;
    
    }
}