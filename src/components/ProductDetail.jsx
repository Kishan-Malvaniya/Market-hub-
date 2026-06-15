import React, { useState } from 'react';

export default function ProductDetail({ product, setView, addToCart }) {
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([
    { id: 1, user: 'Rahul P.', rating: 5, date: '2 days ago', text: 'Amazing product! Exactly as described. Very happy with the purchase.' },
    { id: 2, user: 'Priya K.', rating: 4, date: '1 week ago', text: 'Good condition, but the delivery was a bit late. Overall satisfied.' }
  ]);

  if (!product) return null;

  const rating = 4 + (product.id % 10) / 10;
  const reviewCount = 12 + (product.id * 3);
  const locationText = "Ahmedabad, Gujarat";

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() === '') return;
    setReviews([{ id: Date.now(), user: 'You', rating: 5, date: 'Just now', text: newReview }, ...reviews]);
    setNewReview('');
    alert('Review Submitted Successfully!');
  }

  return (
    <div className="detail-page" style={{ padding: '8rem 5% 4rem', minHeight: '100vh', color: 'white' }}>
      <button className="btn btn-ghost" style={{ marginBottom: '2rem' }} onClick={() => setView('home')}>← Back to Home</button>

     
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem', background: 'var(--bg-card)', padding: '3rem', borderRadius: '20px', border: '1px solid var(--glass-border)', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', marginBottom: '3rem' }}>
        <div>
          <img src={product.img} alt={product.title} style={{ width: '100%', height: '450px', objectFit: 'cover', borderRadius: '15px' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ background: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '1rem' }}>{product.category}</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', lineHeight: '1.1' }}>{product.title}</h1>

         
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ color: '#fbbf24', fontSize: '1.2rem' }}>{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</span>
            <span style={{ fontWeight: 'bold', color: 'white' }}>{rating.toFixed(1)}</span>
            <span style={{ color: 'var(--text-muted)' }}>({reviewCount} Reviews)</span>
          </div>

          <h2 style={{ fontSize: '2.5rem', color: 'white', fontWeight: '800', marginBottom: '1.5rem' }}>{product.price}</h2>

          <p style={{ lineHeight: '1.8', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            This is a premium <strong>{product.title}</strong> in excellent condition. Verified seller and secure transaction via Market Hub. Don't miss out on this incredible deal.
          </p>

          <div style={{ padding: '1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sold By</p>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>{product.seller}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Location</p>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#60a5fa' }}>{locationText}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" style={{ padding: '1rem', flex: 1, fontSize: '1.1rem' }} onClick={(e) => addToCart(product, e)}>Add to Cart </button>
            <button className="btn btn-ghost" style={{ padding: '1rem', flex: 1, fontSize: '1.1rem' }} onClick={() => alert('Message Sent to Seller!')}>Contact Seller </button>
          </div>
        </div>
      </div>

      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>

      
        <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Reviews & Ratings</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '1rem', marginBottom: '2rem' }}>
            {reviews.map(review => (
              <div key={review.id} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'white' }}>{review.user}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{review.date}</span>
                </div>
                <div style={{ color: '#fbbf24', marginBottom: '0.8rem', fontSize: '0.9rem' }}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                <p style={{ color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>"{review.text}"</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <textarea
              placeholder="Write your review here..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="search-input"
              style={{ width: '100%', minHeight: '100px', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)', color: 'white', fontFamily: 'inherit' }}
            />
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.8rem 1.5rem' }}>Submit Review</button>
          </form>
        </div>

       
        <div style={{ background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>📍 Location</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>This item is available near <strong>{locationText}</strong>. You can arrange a pickup by contacting the seller directly.</p>

          <div style={{ width: '100%', height: '350px', borderRadius: '15px', overflow: 'hidden', border: '1px solid var(--glass-border)', position: 'relative' }}>
            <iframe
              title="map"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=72.4%2C22.9%2C72.7%2C23.1&amp;layer=mapnik&amp;marker=23.0225%2C72.5714"
              style={{ filter: 'invert(90%) hue-rotate(180deg)', border: 'none', width: '100%', height: '100%' }}
            ></iframe>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
            <a href="https://www.openstreetmap.org/?mlat=23.0225&mlon=72.5714#map=12/23.0225/72.5714" target="_blank" rel="noreferrer" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold' }}>View Larger Map ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}
