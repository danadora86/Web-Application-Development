import type {Student} from "./types.ts"

export class Undergraduate implements Student {
    id: string | number;
    name: string;
    course: string;
    email?: string;
    modules: string[];

    constructor(
        id: string | number,
        name: string,
        course: string,
        modules: string[],
        email?: string
    ) {
        this.id = id;
        this.name = name;
        this.course = course;
        this.modules = modules;
        this.email = email;
    }

    // Method
    addModule(moduleName: string): void {
        this.modules.push(moduleName);
    }
    
    toString(): string {
        const emailText = this.email ?? "no email provided";
        const moduleList = this.modules.join(", ");
        return `Undergraduate: ${this.name} | Course : ${this.course} | Modules: ${moduleList} | Email: ${emailText}`;
    }
}