import React, { useState } from 'react';
import Navbar from './Navbar';

const CATEGORIES = ['All', 'Electronics', 'Furniture', 'Vehicles'];

export default function Home({ setView, setSelectedProductId, likedProducts, toggleLike, addToCart, products, user }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar view="home" setView={setView} searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user} />


      <section className="hero">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <h1>Discover & Trade with <span className="gradient-text">Confidence</span></h1>
        <p>The premium marketplace connecting buyers and sellers securely. Explore top deals around you or post your own.</p>

      </section>

      <section className="products-section">
        <div className="category-pills">
          {CATEGORIES.map(cat => (
            <div 
              key={cat} 
              className={`pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        <div className="grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product.id} className="card" onClick={() => { setSelectedProductId(product.id); setView('product_detail'); }} style={{ cursor: 'pointer', position: 'relative' }}>
                <div className="card-img-wrapper" style={{ position: 'relative' }}>
                  <img src={product.img} alt={product.title} className="card-img" />
                  
                 

                </div>
                <div className="card-content">
                  <h3 className="card-title">{product.title}</h3>
                  <div className="card-price">{product.price}</div>
                  <div className="card-footer">
                    <span>{product.category}</span>
                    <span>By {product.seller}</span>
                  </div>
                  <button className="contact-btn" onClick={(e) => { e.stopPropagation(); setSelectedProductId(product.id); setView('product_detail'); }}>View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              No products found matching your criteria.
            </div>
          )}
        </div>
      </section>

      <footer>
        <h2><span className="gradient-text">Market</span>Hub</h2>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '1.5rem 0 1rem', fontSize: '1.1rem' }}>
           <span className="cursor-pointer gradient-text" style={{ fontWeight: 'bold' }} onClick={() => setView('about')}>About Us</span>
           <span className="cursor-pointer gradient-text" style={{ fontWeight: 'bold' }} onClick={() => setView('contact')}>Contact Us</span>
        </div>
        <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>&copy; 2026 Market Hub. Designed for the future.</p>
      </footer>
    </>
  );
}
