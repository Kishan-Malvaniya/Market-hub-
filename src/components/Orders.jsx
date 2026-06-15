import React from 'react';

export default function Orders({ setView, orders }) {
  return (
    <div className="orders-page" style={{ padding: '8rem 5% 4rem', minHeight: '100vh', color: 'white' }}>
      <button className="btn btn-ghost" style={{ marginBottom: '2rem' }} onClick={() => setView('home')}>← Back to Home</button>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center', marginTop: '-3rem' }}>My Orders</h2>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
             <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>You haven't placed any orders yet.</h3>
             <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setView('home')}>Continue Shopping</button>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--glass-border)', marginBottom: '1.5rem', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>Order #{order.id}</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Placed on {order.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ 
                    padding: '0.4rem 1rem', 
                    borderRadius: '20px', 
                    fontSize: '0.9rem', 
                    fontWeight: 'bold',
                    background: order.status === 'Delivered' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                    color: order.status === 'Delivered' ? '#4ade80' : '#facc15'
                  }}>
                    {order.status}
                  </span>
                  <p style={{ marginTop: '0.5rem', fontWeight: 'bold', fontSize: '1.1rem' }}>Total: ₹{order.total}</p>
                </div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '10px' }}>
                <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>Items In Order: <strong style={{ color: 'white' }}>{order.items.join(', ')}</strong></p>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
