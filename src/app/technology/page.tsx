import React from 'react';
import Navbar from '@/components/common/Navbar';

export default function TechnologyPage() {
  return (
    <div className="page-container">
      <Navbar />

      <section style={{ padding: '8rem 2rem 4rem', textAlign: 'center' }}>
        <span className="section-tag">ENGINEERING</span>
        <h1 className="section-title" style={{ fontFamily: 'var(--font-heading)' }}>
          타협 없는 <span className="text-gradient">장인정신</span>
        </h1>
        <p className="section-desc">
          KILLSHOT은 단순한 조립을 넘어 재질의 물성과 소리의 공명까지 공학적으로 설계합니다.
        </p>
      </section>

      {/* Tech Details */}
      <section className="content-section" style={{ paddingTop: '2rem' }}>
        <div className="section-container">
          <div className="tech-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="glass tech-card" style={{ minHeight: '380px' }}>
              <h2 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Gasket Mount 2.0</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Poron 소재의 고밀도 가스켓을 사용하여 타건 시 발생하는 진동을 효과적으로 흡수하고, 균일한 타건감을 제공합니다.
              </p>
              <div style={{ marginTop: '2rem', height: '180px', background: 'rgba(0,0,0,0.2)', border: '1px dashed rgba(197, 160, 89, 0.3)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                [ Gasket Structure Cross-section ]
              </div>
            </div>

            <div className="glass tech-card">
              <h2 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>8KHz Polling Technology</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                기존 1KHz의 8배에 달하는 스캔율로 0.125ms의 입력 지연 시간을 달성했습니다. 프로게이머를 위한 궁극의 반응속도를 경험하세요.
              </p>
              <div className="mock-terminal" style={{ marginTop: '2rem' }}>
                <div className="term-body">
                  &gt; Benchmarking Latency...<br />
                  &gt; Result: 0.125ms (Top Tier)<br />
                  &gt; Stability: 99.99%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CNC Manufacturing */}
      <section className="content-section">
        <div className="section-container">
          <div className="glass highlight-card" style={{ padding: '4rem', display: 'flex', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h2 className="section-title" style={{ fontSize: '2.2rem' }}>정밀 CNC 가공</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                KILLSHOT의 모든 케이스는 6063 알루미늄 블록을 8시간 이상 정밀 가공하여 제작됩니다. 단 1미크론의 오차도 허용하지 않는 완벽함을 추구합니다.
              </p>
            </div>
            <div style={{ flex: 1, height: '280px', background: 'rgba(0,0,0,0.4)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '4rem' }}>🛠️</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="section-container">
          <div className="footer-bottom">
            <p>© 2026 AXIOM Keyboard. Technical Authority & Innovation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
