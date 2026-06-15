import React, { useState } from 'react';
import Navbar from './Navbar';

export default function Login({ setView, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check credentials.');
      }

      // Success
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      alert('Logged in successfully!');
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
      <Navbar view="login" setView={setView} />
      <div className="auth-container">
        <div className="orb orb-1"></div>
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p>Login to your account to continue</p>
          {error && <p style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Logging in...' : 'Login Now'}
            </button>
          </form>
          <div className="auth-footer">
            Don't have an account? <span className="cursor-pointer" style={{ color: 'var(--primary)' }} onClick={() => setView('signup')}>Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );
}


