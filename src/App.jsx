import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import UserProfile from './components/UserProfile';
import Orders from './components/Orders';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import './index.css';
import vespaImg from './assets/vespa.png';
import jeepImg from './assets/jeep.png';

const MOCK_PRODUCTS = [
  { id: 1, title: 'MacBook Pro M2', price: '₹95,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80', seller: 'Alex M.' },
  { id: 2, title: 'Sony Alpha a7 III', price: '₹1,50,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80', seller: 'Emma S.' },
  { id: 3, title: 'Minimalist Desk Lamp', price: '₹3,500', category: 'Furniture', img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=500&q=80', seller: 'John D.' },
  { id: 4, title: 'Mountain Bike', price: '₹25,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=500&q=80', seller: 'Sarah L.' },
  { id: 5, title: 'Leather Sofa', price: '₹65,000', category: 'Furniture', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80', seller: 'Mike R.' },
  { id: 6, title: 'Gaming Headset', price: '₹6,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80', seller: 'Chris J.' },
  { id: 7, title: 'Apple Watch Series 9', price: '₹42,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=500&q=80', seller: 'Liam T.' },
  { id: 8, title: 'Wooden Coffee Table', price: '₹8,500', category: 'Furniture', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=500&q=80', seller: 'Sophia L.' },
  { id: 9, title: 'DJI Mini 4 Pro Drone', price: '₹85,000', category: 'Electronics', img: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=500&q=80', seller: 'Elias N.' },
  { id: 10, title: 'Vintage Bookshelf', price: '₹18,000', category: 'Furniture', img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=500&q=80', seller: 'Noah C.' },
  { id: 11, title: 'BMW Mini Cooper', price: '₹45,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80', seller: 'Olivia M.' },
  { id: 12, title: 'Yamaha R1 Sports Bike', price: '₹22,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=500&q=80', seller: 'Rajesh P.' },
  { id: 13, title: 'Tesla Model 3', price: '₹60,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500&q=80', seller: 'Elon Musk' },
  { id: 14, title: 'Vintage Vespa Scooter', price: '₹95,000', category: 'Vehicles', img: vespaImg, seller: 'Luca B.' },
  { id: 15, title: 'Ford Mustang GT', price: '₹75,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=500&q=80', seller: 'Kevin K.' },
  { id: 16, title: 'Mercedes G-Wagon', price: '₹2,50,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=500&q=80', seller: 'Dimitri V.' },
  { id: 17, title: 'Ducati Panigale V4', price: '₹28,00,000', category: 'Vehicles', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=500&q=80', seller: 'Mario G.' },
  { id: 18, title: 'Jeep Wrangler Rubicon', price: '₹65,00,000', category: 'Vehicles', img: jeepImg, seller: 'Jake M.' }
];

export default function App() {
  const [view, setView] = useState('home');

  useEffect(() => {
    window.alert = (msg) => {
      const existing = document.querySelector('.custom-toast');
      if (existing) existing.remove();
      
      const toast = document.createElement('div');
      toast.textContent = msg;
      toast.className = 'custom-toast';
      document.body.appendChild(toast);
      
      setTimeout(() => toast.classList.add('show'), 10);
      
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
      }, 3000);
    };
  }, []);
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set()); 
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const fetchProducts = () => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  };

  const fetchOrders = () => {
    fetch('http://localhost:5000/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    const newLikes = new Set(likedProducts);
    if (newLikes.has(id)) {
      newLikes.delete(id);
    } else {
      newLikes.add(id);
    }
    setLikedProducts(newLikes);
  };

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
    setView('cart');
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  if (view === 'login') return <Login setView={setView} setUser={setUser} />;
  if (view === 'signup') return <Signup setView={setView} setUser={setUser} />;
  if (view === 'add_product') return <><Navbar view="add_product" setView={setView} user={user} /><AddProduct setView={setView} user={user} onProductAdded={fetchProducts} /></>;
  if (view === 'cart') return <><Navbar view="cart" setView={setView} user={user} /><Cart setView={setView} cartItems={cartItems} setCartItems={setCartItems} setOrders={setOrders} onOrderPlaced={fetchOrders} /></>;
  if (view === 'profile') return <><Navbar view="profile" setView={setView} user={user} /><UserProfile setView={setView} user={user} setUser={setUser} /></>;
  if (view === 'orders') return <><Navbar view="orders" setView={setView} user={user} /><Orders setView={setView} orders={orders} /></>;
  if (view === 'contact') return <><Navbar view="contact" setView={setView} user={user} /><ContactUs setView={setView} /></>;
  if (view === 'about') return <><Navbar view="about" setView={setView} user={user} /><AboutUs setView={setView} /></>;
  if (view === 'product_detail') return <><Navbar view="product_detail" setView={setView} user={user} /><ProductDetail product={selectedProduct} setView={setView} addToCart={addToCart} /></>;
  return <Home setView={setView} setSelectedProductId={setSelectedProductId} likedProducts={likedProducts} toggleLike={toggleLike} addToCart={addToCart} products={products} user={user} />;
}
