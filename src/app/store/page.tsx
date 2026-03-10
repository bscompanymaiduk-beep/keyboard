import React from 'react';
import Navbar from '@/components/common/Navbar';

const products = [
  { id: 1, name: 'KILLSHOT Pro-75', category: 'Professional', price: '₩289,000', icon: '🖋️', desc: 'Silence & Precision' },
  { id: 2, name: 'KILLSHOT Creator-80', category: 'Creator', price: '₩349,000', icon: '🎨', desc: 'CNC Aluminum Masterpiece' },
  { id: 3, name: 'KILLSHOT Strike-65', category: 'Gamer', price: '₩259,000', icon: '⚡', desc: '8KHz Hall Effect Response' },
  { id: 4, name: 'KILLSHOT Classic-104', category: 'Professional', price: '₩319,000', icon: '🎹', desc: 'Full-size Elegance' },
];

export default function StorePage() {
  return (
    <div className="page-container">
      <Navbar />

      <section style={{ padding: '8rem 2rem 4rem' }}>
        <div className="section-container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">STORE</span>
            <h1 className="section-title">
              KILLSHOT <span className="text-gradient">라인업</span>
            </h1>
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '4rem' }}>
            {['All', 'Professional', 'Creator', 'Gamer'].map(cat => (
              <button key={cat} className="glass" style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '30px',
                fontSize: '0.85rem',
                border: cat === 'All' ? '1px solid var(--accent-gold)' : '1px solid var(--card-border)',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                background: cat === 'All' ? 'rgba(197, 160, 89, 0.08)' : 'var(--card-bg)',
              }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="segment-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {products.map(p => (
              <div key={p.id} className="glass segment-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{p.icon}</div>
                <span className="segment-label">{p.category.toUpperCase()}</span>
                <h3 style={{ margin: '0.5rem 0', fontFamily: 'var(--font-heading)' }}>{p.name}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{p.desc}</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--accent-gold)' }}>{p.price}</p>
                <button className="btn-primary" style={{ width: '100%', background: 'var(--accent-slate)', borderRadius: '10px', boxShadow: 'none' }}>자세히 보기</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer" style={{ marginTop: '4rem' }}>
        <div className="section-container">
          <div className="footer-bottom">
            <p>© 2026 KILLSHOT Keyboard. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
