import React, { useState } from 'react';
import Navbar from './Navbar';

export default function Signup({ setView, setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed.');
      }

      // Automatically log in user on successful sign up
      const userObj = { name, email };
      localStorage.setItem('user', JSON.stringify(userObj));
      setUser(userObj);

      alert('Account created successfully!');
      setView('home');
    } catch (err) {
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar view="signup" setView={setView} />
      <div className="auth-container">
        <div className="orb orb-2"></div>
        <div className="auth-card">
          <h2>Create Account</h2>
          <p>Join the best marketplace today</p>
          {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up Free'}
            </button>
          </form>
          <div className="auth-footer">
            Already have an account? <span className="cursor-pointer" style={{ color: 'var(--primary)' }} onClick={() => setView('login')}>Login</span>
          </div>
        </div>
      </div>
    </div>
  );
}

