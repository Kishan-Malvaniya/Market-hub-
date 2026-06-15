import React from 'react';

export default function UserProfile({ setView, user, setUser }) {
  if (!user) {
    return (
      <div className="profile-page" style={{ padding: '8rem 5% 4rem', minHeight: '100vh', color: 'white' }}>
        <div style={{ background: 'var(--bg-card)', padding: '4rem 3rem', borderRadius: '20px', border: '1px solid var(--glass-border)', maxWidth: '700px', margin: '0 auto', textAlign: 'center', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Please Log In</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You must be logged in to view your profile.</p>
          <button className="btn btn-primary" onClick={() => setView('login')}>Log In Now</button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page" style={{ padding: '8rem 5% 4rem', minHeight: '100vh', color: 'white' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <button className="btn btn-ghost" style={{ marginBottom: '2rem' }} onClick={() => setView('home')}>← Back to Home</button>
      </div>
      <div style={{ background: 'var(--bg-card)', padding: '4rem 3rem', borderRadius: '20px', border: '1px solid var(--glass-border)', maxWidth: '700px', margin: '0 auto', textAlign: 'center', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        <img src="https://i.pinimg.com/564x/ab/c6/1c/abc61c449e6621012d6867c70b023c86.jpg" alt="Profile" style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', marginBottom: '1.5rem', border: '4px solid var(--primary)' }} />

        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{user.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{user.email}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', margin: '2rem 0', padding: '1.5rem 0', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
          <div>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>5</h4>
            <p style={{ color: 'var(--text-muted)' }}>Items Sold</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>12</h4>
            <p style={{ color: 'var(--text-muted)' }}>Active Listings</p>
          </div>
          <div>
            <h4 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>4.9</h4>
            <p style={{ color: 'var(--text-muted)' }}>Rating</p>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }} onClick={() => setView('add_product')}>Sell New Item</button>
          <button className="btn btn-ghost" style={{ padding: '0.8rem 2rem', color: '#ef4444', borderColor: '#ef4444' }} onClick={() => { localStorage.removeItem('user'); setUser(null); alert('Logged out!'); setView('home'); }}>Log Out</button>
        </div>
      </div>
    </div>
  );
}


