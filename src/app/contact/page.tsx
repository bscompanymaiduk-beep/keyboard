import React from 'react';
import Navbar from '@/components/common/Navbar';

export default function ContactPage() {
  return (
    <div className="page-container">
      <Navbar />

      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', maxWidth: '800px', margin: '0 auto', padding: '8rem 2rem 4rem' }}>
        <h1 className="section-title text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          Contact <span className="text-gradient">KILLSHOT</span>
        </h1>
        <p className="text-center" style={{ color: 'var(--text-secondary)', marginBottom: '4rem' }}>
          일반 문의부터 전용 커스텀, B2B 대량 구매까지 최상의 상담을 제공합니다.
        </p>

        <div className="glass" style={{ padding: '3rem' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', letterSpacing: '1px' }}>NAME</label>
                <input type="text" className="config-select" placeholder="이름" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', letterSpacing: '1px' }}>EMAIL</label>
                <input type="email" className="config-select" placeholder="email@example.com" />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', letterSpacing: '1px' }}>INQUIRY TYPE</label>
              <select className="config-select">
                <option>일반 문의</option>
                <option>B2B / 대량 구매</option>
                <option>협업 제안</option>
                <option>커스텀 빌드 문의</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', letterSpacing: '1px' }}>MESSAGE</label>
              <textarea rows={6} className="config-select" style={{ resize: 'vertical' }} placeholder="문의 내용을 입력하세요"></textarea>
            </div>

            <button className="btn-primary" style={{ marginTop: '1rem' }}>메시지 보내기</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="section-container">
          <div className="footer-bottom">
            <p>© 2026 KILLSHOT Keyboard. Dedicated Support Team.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
