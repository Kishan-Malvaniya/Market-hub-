import React, { useState } from 'react';

export default function Cart({ setView, cartItems, setCartItems, setOrders, onOrderPlaced }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); 
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const initiatePayment = () => {
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    setPaymentStatus('processing');
    
    setTimeout(() => {
      setPaymentStatus('success');
      
   
      setTimeout(() => {
        completeCheckout();
      }, 2000);
    }, 2000);
  };

  const completeCheckout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          total: calculateTotal(),
          items: cartItems.map(i => i.title)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save order.');
      }

      alert('Payment Successful & Order Placed! ');
      if (onOrderPlaced) onOrderPlaced();
      setCartItems([]);
      setShowPaymentModal(false);
      setPaymentStatus('idle');
      setView('orders');
    } catch (err) {
      alert(err.message);
    }
  };

  const removeProduct = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      total += parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    });
    return total.toLocaleString('en-IN');
  };

  return (
    <div className="cart-page" style={{ padding: '8rem 5% 4rem', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <button className="btn btn-ghost" style={{ marginBottom: '2rem' }} onClick={() => setView('home')}>← Back to Home</button>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem', textAlign: 'center', marginTop: '-3rem' }}>Your Shopping Cart</h2>
      
      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--glass-border)', maxWidth: '800px', margin: '0 auto', backdropFilter: 'blur(10px)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <img src={item.img} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.2rem' }}>{item.price}</p>
                </div>
              </div>
              <button className="btn btn-ghost" style={{ padding: '0.6rem 1.2rem', color: '#ef4444', borderColor: '#ef4444' }} onClick={() => removeProduct(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
             <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}> Your cart is completely empty.</h3>
             <button className="btn btn-primary" onClick={() => setView('home')}>Start Shopping</button>
          </div>
        )}

        {cartItems.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Total Amount: <span className="gradient-text" style={{ fontSize: '2rem' }}>₹{calculateTotal()}</span></h3>
            <button 
               className="btn btn-primary" 
               style={{ padding: '1rem 2rem', fontSize: '1.1rem' }} 
               onClick={initiatePayment}>
               Proceed to Checkout
            </button>
          </div>
        )}
      </div>

    
      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', zIndex: 1000 }}>
          <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '20px', width: '100%', maxWidth: '450px', border: '1px solid var(--glass-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center' }}>
             
             {paymentStatus === 'idle' && (
                <>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Select Payment Method</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    {['UPI (GPay, PhonePe)', 'Credit / Debit Card', 'Net Banking', 'Cash on Delivery'].map(method => (
                      <div 
                        key={method} 
                        onClick={() => setPaymentMethod(method)}
                        style={{ padding: '1rem', borderRadius: '10px', border: paymentMethod === method ? '2px solid var(--primary)' : '1px solid var(--glass-border)', background: paymentMethod === method ? 'rgba(99, 102, 241, 0.1)' : 'transparent', cursor: 'pointer', transition: 'all 0.3s', fontWeight: paymentMethod === method ? 'bold' : 'normal' }}
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                     <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowPaymentModal(false)}>Cancel</button>
                     <button className="btn btn-primary" style={{ flex: 1 }} onClick={processPayment}>Pay ₹{calculateTotal()}</button>
                  </div>
                </>
             )}

             {paymentStatus === 'processing' && (
                <div style={{ padding: '2rem 0' }}>
                   <div style={{ width: '60px', height: '60px', border: '5px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', margin: '0 auto 1.5rem', animation: 'spin 1s linear infinite' }}></div>
                   <h2 style={{ fontSize: '1.5rem' }}>Processing Payment...</h2>
                   <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Please do not close this window.</p>
                   <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
             )}

             {paymentStatus === 'success' && (
                <div style={{ padding: '2rem 0' }}>
                   <div style={{ width: '80px', height: '80px', background: '#10b981', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', margin: '0 auto 1.5rem', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
                     ✓
                   </div>
                   <h2 style={{ fontSize: '1.8rem', color: '#10b981' }}>Payment Successful!</h2>
                   <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Redirecting to your orders...</p>
                </div>
             )}

          </div>
        </div>
      )}
    </div>
  );
}
