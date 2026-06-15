import React from 'react';

export default function ContactUs({ setView }) {
  return (
    <div className="contact-page" style={{ padding: '8rem 5% 4rem', minHeight: '100vh', color: 'white' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--bg-card)', padding: '3rem', borderRadius: '15px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Contact Us</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>We'd love to hear from you. Send us a message!</p>
        <form onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); setView('home'); }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label>Email ID</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" required style={{ width: '100%', background: 'rgba(255, 255, 255, 0.05)', color: 'white', padding: '0.8rem 1rem', border: '1px solid var(--glass-border)', borderRadius: '10px', outline: 'none' }} placeholder="How can we help you?"></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100" style={{ marginTop: '1rem' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
} 
