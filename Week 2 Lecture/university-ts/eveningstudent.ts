import type {Student} from "./types.ts"

export class EveningStudent implements Student {
    id: string | number;
    name: string;
    course: string;
    email?: string;

    constructor(
        id: string | number,
        name: string,
        course: string,
        email?: string
    ) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.email = email;
    }
    
    toString(): string {
        const emailText = this.email ?? "no email provided";
        return `EveningStudent: ${this.id} | ${this.name} | Course : ${this.course} | Email: ${emailText}`;
    }
}