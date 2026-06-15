import React from 'react';

export default function Navbar({ setView, view, searchQuery, setSearchQuery, user }) {
  return (
    <nav>
      <div className="logo cursor-pointer" onClick={() => setView('home')}>
        <span className="gradient-text">Market</span>Hub
      </div>

      {view === 'home' && (
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <span className="cursor-pointer" style={{ color: 'var(--text-muted)', fontWeight: '600', transition: 'color 0.3s' }} onClick={() => setView('orders')} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}>Orders</span>
        <span className="cursor-pointer" style={{ color: 'var(--text-muted)', fontWeight: '600', transition: 'color 0.3s' }} onClick={() => setView('cart')} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}> Cart</span>
        <span className="cursor-pointer" style={{ color: 'var(--text-muted)', fontWeight: '600', transition: 'color 0.3s' }} onClick={() => setView('profile')} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}> Profile</span>
        <button className="btn btn-primary" onClick={() => setView('add_product')}>+ Sell</button>
        {user ? (
          <span className="cursor-pointer gradient-text" style={{ fontWeight: '700' }} onClick={() => setView('profile')}>
            Hi, {user.name.split(' ')[0]}
          </span>
        ) : (
          (view !== 'login' && view !== 'signup') && (
            <button className="btn btn-ghost" onClick={() => setView('login')}>Login</button>
          )
        )}
      </div>
    </nav>
  );
}

