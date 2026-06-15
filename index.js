import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/market-hub')
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      const productCount = await Product.countDocuments();
      if (productCount === 0) {
        const productsData = await readJSON('products.json');
        await Product.insertMany(productsData);
      }
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        const usersData = await readJSON('users.json');
        await User.insertMany(usersData);
      }
      const orderCount = await Order.countDocuments();
      if (orderCount === 0) {
        const ordersData = await readJSON('orders.json');
        await Order.insertMany(ordersData);
      }
    } catch (err) {
      console.log('Seeding error:', err);
    }
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Helper function to read data from JSON files
const readJSON = async (fileName) => {
  try {
    const filePath = path.join(__dirname, 'data', fileName);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
};

// Helper function to write data to JSON files
const writeJSON = async (fileName, data) => {
  try {
    const filePath = path.join(__dirname, 'data', fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${fileName}:`, error);
    return false;
  }
};

// --- AUTH ROUTES ---

// Sign Up Endpoint
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields (name, email, password) are required.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const newUser = new User({ name, email: email.toLowerCase(), password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!', user: { name, email } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase(), password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.json({ message: 'Login successful!', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- PRODUCT ROUTES ---

// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add New Product
app.post('/api/products', async (req, res) => {
  try {
    const { title, price, category, img, seller } = req.body;
    if (!title || !price || !category) {
      return res.status(400).json({ error: 'Title, price, and category are required.' });
    }

    const maxIdProduct = await Product.findOne().sort('-id');
    const nextId = maxIdProduct ? maxIdProduct.id + 1 : 1;
    
    let formattedPrice = price;
    if (typeof price === 'number' || !price.startsWith('₹')) {
      formattedPrice = `₹${Number(price).toLocaleString('en-IN')}`;
    }

    const newProduct = new Product({
      id: nextId,
      title,
      price: formattedPrice,
      category,
      img: img || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
      seller: seller || 'Anonymous'
    });

    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- ORDER ROUTES ---

// Get All Orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create New Order
app.post('/api/orders', async (req, res) => {
  try {
    const { total, items } = req.body;
    if (!total || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Total price and items array are required.' });
    }

    const randNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder = new Order({
      id: `ORD-${randNum}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: String(total).startsWith('₹') ? String(total).replace('₹', '') : String(total),
      status: 'Pending',
      items
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully!', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
