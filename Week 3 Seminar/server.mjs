import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const db = new Database('wadsongs.db');

app.use(express.json());
app.use(express.static('public'));

db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        song_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (song_id) REFERENCES wadsongs(id)
    )
`);

app.get('/', (req, res) => {
    res.send('Song API is running');
});

app.get('/songs', (req, res) => {
    const stmt = db.prepare('SELECT * FROM wadsongs ORDER BY id');
    const rows = stmt.all();
    res.json(rows);
});

app.get('/songs/artist/:artist', (req, res) => {
    const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist = ?');
    const rows = stmt.all(req.params.artist);
    res.json(rows);
});

app.get('/songs/title/:title', (req, res) => {
    const stmt = db.prepare('SELECT * FROM wadsongs WHERE title = ?');
    const rows = stmt.all(req.params.title);
    res.json(rows);
});

app.get('/songs/search', (req, res) => {
    const { artist, title } = req.query;

    if (!artist || !title) {
        return res
            .status(400)
            .json({ error: 'artist and title query parameters are required' });
    }

    const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist = ? AND title = ?');
    const rows = stmt.all(artist, title);
    res.json(rows);
});

app.get('/songs/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be an integer' });
    }

    const stmt = db.prepare('SELECT * FROM wadsongs WHERE id = ?');
    const song = stmt.get(id);

    if (!song) {
        return res.status(404).json({ error: 'song not found' });
    }

    res.json(song);
});

app.post('/songs', (req, res) => {
    let { title, artist, year = null, downloads = 0, price, quantity } = req.body;

    title = title?.trim();
    artist = artist?.trim();

    if (!title || !artist || price === undefined || quantity === undefined || title === '' || artist === '') {
        return res.status(400).json({
            error: 'title, artist, price, and quantity are required',
        });
    }

    try {
        const stmt = db.prepare(
            'INSERT INTO wadsongs (title, artist, year, downloads, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
        );
        const info = stmt.run(title, artist, year, downloads, price, quantity);
        res.status(201).json({ id: info.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/songs/:id', (req, res) => {
    const id = Number(req.params.id);
    const { price, quantity } = req.body;

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be an integer' });
    }

    if (price === undefined || quantity === undefined) {
        return res.status(400).json({ error: 'price and quantity are required' });
    }

    try {
        const stmt = db.prepare('UPDATE wadsongs SET price = ?, quantity = ? WHERE id = ?');
        const info = stmt.run(price, quantity, id);

        if (info.changes === 0) {
            return res.status(404).json({ error: 'song not found' });
        }

        const selectStmt = db.prepare('SELECT * FROM wadsongs WHERE id = ?');
        res.json({
            message: 'song updated',
            song: selectStmt.get(id),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/songs/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be an integer' });
    }

    try {
        const stmt = db.prepare('DELETE FROM wadsongs WHERE id = ?');
        const info = stmt.run(id);

        if (info.changes === 0) {
            return res.status(404).json({ error: 'song not found' });
        }

        res.status(200).json({ message: 'song deleted', id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/songs/:id/buy', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'id must be an integer' });
    }

    try {
        const transaction = db.transaction((songId) => {
            const selectStmt = db.prepare('SELECT * FROM wadsongs WHERE id = ?');
            const updateStmt = db.prepare('UPDATE wadsongs SET quantity = quantity - 1 WHERE id = ?');
            const orderStmt = db.prepare('INSERT INTO orders (song_id, quantity) VALUES (?, ?)');
            const song = selectStmt.get(songId);

            if (!song) {
                return { error: 'song not found', status: 404 };
            }

            if (song.quantity < 1) {
                return { error: 'song is out of stock', status: 400 };
            }

            updateStmt.run(songId);
            const orderInfo = orderStmt.run(songId, 1);

            return {
                status: 201,
                orderId: orderInfo.lastInsertRowid,
                song: selectStmt.get(songId),
            };
        });

        const result = transaction(id);

        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        res.status(201).json({
            message: 'song purchased',
            order: {
                id: result.orderId,
                song_id: id,
                quantity: 1,
            },
            song: result.song,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));