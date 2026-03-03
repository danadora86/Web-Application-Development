import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('wadsongs.db')

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/time', (req, res) => {
    res.send(`Server time : ${Date.now()}`)
});

app.get('/greet/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`)
});

app.get('/songs/artist/:artist', (req, res) => {
    const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist = ?')
    const rows = stmt.all(req.params.artist);
    res.json(rows);
});

app.get('/songs/title/:title', (req, res) => {
    const stmt = db.prepare('SELECT * FROM wadsongs WHERE title = ?')
    const rows = stmt.all(req.params.title);
    res.json(rows);
})

app.post('/songs', (req, res) => {
    try{
        const stmt = db.prepare("INSERT INTO wadsongs (title, artist, price, quantity) VALUES (?, ?, ?, ?)");
        const info = stmt.run(req.body.title, req.body.artist, req.body.price, req.body.quantity);
        res.status(201).json({id: info.lastInsertRowid});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

app.delete

app.use(express.json());
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));