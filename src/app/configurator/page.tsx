import React from 'react';
import Navbar from '@/components/common/Navbar';

export default function ConfiguratorPage() {
  return (
    <div className="page-container">
      <Navbar />

      <section style={{ padding: '8rem 2rem 4rem' }}>
        <div className="section-container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">CUSTOMIZE</span>
            <h1 className="section-title" style={{ fontFamily: 'var(--font-heading)' }}>
              지능형 3D <span className="text-gradient">구성기</span>
            </h1>
            <p className="section-desc">
              나만의 완벽한 키보드를 디자인하세요. 모든 변경 사항은 실시간으로 반영됩니다.
            </p>
          </div>

          <div className="glass config-preview-card">
            {/* Controls */}
            <div className="config-options">
              <h4>CUSTOMIZATION</h4>

              <div className="config-option-group">
                <label>CASE FINISH</label>
                <div className="color-swatch-group">
                  {['#1c1917', '#44403c', '#c5a059', '#78716c'].map(color => (
                    <div key={color} className="color-swatch" style={{ background: color }}></div>
                  ))}
                </div>
              </div>

              <div className="config-option-group">
                <label>PLATE MATERIAL</label>
                <select className="config-select">
                  <option>PC (Polycarbonate) - Soft</option>
                  <option>Aluminum - Medium</option>
                  <option>Brass - Heavy/Firm</option>
                  <option>FR4 - Balanced</option>
                </select>
              </div>

              <div className="config-option-group">
                <label>SWITCH TYPE</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button className="glass" style={{ padding: '0.6rem', fontSize: '0.8rem', textAlign: 'center' }}>Linear</button>
                  <button className="glass" style={{ padding: '0.6rem', fontSize: '0.8rem', textAlign: 'center' }}>Tactile</button>
                </div>
              </div>

              <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid rgba(197, 160, 89, 0.3)', borderRadius: '12px', background: 'rgba(197, 160, 89, 0.04)' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '0.5rem' }}>ESTIMATED PRICE</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 800 }}>₩349,000</p>
                <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', borderRadius: '8px' }}>장바구니 담기</button>
              </div>
            </div>

            {/* Viewport */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="config-viewport" style={{ flex: 1 }}>
                <div style={{ textAlign: 'center' }}>
                  <span className="viewport-label" style={{ display: 'block', marginBottom: '1rem' }}>Rendering KILLSHOT Engine...</span>
                  <div className="mock-terminal" style={{ width: '280px', textAlign: 'left' }}>
                    <div className="term-body" style={{ fontSize: '0.75rem' }}>
                      &gt; Loading GLB Assets...<br />
                      &gt; Initializing Shadows...<br />
                      &gt; Applying Materials: Brass, PBT
                    </div>
                  </div>
                </div>

                {/* Floating Controls */}
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <button className="glass" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Exploded View</button>
                  <button className="glass" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>Sound Test</button>
                </div>
              </div>

              <div className="glass" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>WEIGHT</p>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>2.4kg</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>MOUNTING</p>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>Gasket</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '1px' }}>LATENCY</p>
                  <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>0.125ms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="section-container">
          <div className="footer-bottom">
            <p>© 2026 AXIOM Custom Division. Built for enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
