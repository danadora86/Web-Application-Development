// server.mjs
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const products = [
  { name: 'Cornflakes', manufacturer: 'Organic Products Ltd.', price: 2.49 },
  { name: 'Oats', manufacturer: 'Healthy Foods Ltd.', price: 3.29 },
  { name: 'Wheat Biscuits', manufacturer: 'Cereal Factory', price: 2.99 }
];

// Simple route to return all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
  const { name, manufacturer, price } = req.body;
  if (!name || !manufacturer || !price) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }
  products.push({ name, manufacturer, price });
  res.json({ message: '✅ Product added successfully!' });
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));