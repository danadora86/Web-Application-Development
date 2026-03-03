import express from 'express';

let students = [
    {id: 1, firstname: "Tim", lastname: "Smith", course: "Computer Science"},
    {id: 2, firstname: "James", lastname: "Bailey", course: "Web Development"},
    {id: 3, firstname: "Deep", lastname: "Patel", course: "Networks"},
];

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

app.get("/students", (req, res) => {
    res.json(students)
});

app.get("/students/:lastname", (req, res) => {
    const lastname = req.params.lastname;

    const results = students.filter(
        s => s.lastname.toLowerCase() === lastname.toLowerCase()
    );

    if(results.length === 0) {
        return res.status(404).json({ error: "No students found"});
        }

        res.json(results);

});

app.post("/students/create", (req, res) => {
    const {firstname, lastname, course} = req.body;

    if(!firstname || !lastname || !course) {
        return res.status(400).json({error: "all fields are required"})
    }
    const newId = students.length ? students[students.length - 1].id + 1 : 1;
    const newStudent = {id: newId, firstname, lastname, course};
    students.push(newStudent);
    
    res.status(201).json(newStudent)
});

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})