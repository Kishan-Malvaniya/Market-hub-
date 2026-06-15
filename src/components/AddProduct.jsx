import React, { useState } from 'react';

export default function AddProduct({ setView, user, onProductAdded }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          price: Number(price),
          category,
          img,
          seller: user ? user.name : 'Anonymous'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add product.');
      }

      alert("Product added successfully!");
      if (onProductAdded) onProductAdded();
      setView('home');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ padding: '6rem 5% 4rem' }}>
        <div className="orb orb-1"></div>
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 10 }}>
          <button className="btn btn-ghost" style={{ marginBottom: '2rem' }} onClick={() => setView('home')}>← Back to Home</button>
          <div className="auth-card" style={{ maxWidth: '600px', width: '100%' }}>
            <h2>Sell an Item</h2>
            <p>Post your ad to reach thousands of buyers</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ad Title</label>
                <input 
                  type="text" 
                  placeholder="What are you selling?" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="form-select" 
                  required 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', color: 'white', padding: '0.8rem 1rem', border: '1px solid var(--glass-border)', borderRadius: '10px', outline: 'none' }}
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Electronics" style={{ background: '#1e293b' }}>Electronics</option>
                  <option value="Furniture" style={{ background: '#1e293b' }}>Furniture</option>
                  <option value="Vehicles" style={{ background: '#1e293b' }}>Vehicles</option>
                </select>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/image.jpg" 
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Posting...' : 'Post Ad Now'}
              </button>
              <button type="button" className="btn btn-ghost w-100" style={{ marginTop: '1rem' }} onClick={() => setView('home')}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}