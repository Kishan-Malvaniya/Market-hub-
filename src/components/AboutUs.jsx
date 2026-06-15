import React from 'react';

export default function AboutUs({ setView }) {
  return (
    <div className="about-page" style={{ padding: '8rem 5% 4rem', minHeight: '100vh', color: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', background: 'var(--bg-card)', border: '1px solid var(--glass-border)', padding: '4rem', borderRadius: '20px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>About <span className="gradient-text">Market Hub</span></h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
          Welcome to Market Hub! We are the leading platform for buying and selling premium products seamlessly.
          Our goal is to provide a transparent, safe, and lightning-fast marketplace built for the modern generation.
          Whether you are looking for vintage furniture or the latest tech, Market Hub connects you with reliable sellers in your area.
        </p>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)', marginTop: '2rem' }}>
          This project was designed with passion as a premium college project, showcasing modern Web Design, React.js logic, and a dynamic intuitive User Interface using Glassmorphism and futuristic aesthetics.
        </p>
        <button className="btn btn-primary" style={{ marginTop: '3rem', padding: '1rem 2.5rem', fontSize: '1.1rem' }} onClick={() => setView('home')}>Start Shopping</button>
      </div>
    </div>
  );
}
