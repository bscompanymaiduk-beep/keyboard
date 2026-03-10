'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import ScrollCanvas from '@/components/ScrollCanvas';
import HeroOverlay from '@/components/HeroOverlay';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hydration mismatches caused by browser extensions are common on the first render.
  // Using a 'mounted' check for the entire page container can help suppress these 
  // if the environment is particularly aggressive with element injection.
  if (!mounted) {
    return <div className="page-container" style={{ background: '#0d0d0c', minHeight: '100vh' }} />;
  }

  return (
    <div className="page-container">
      {/* ===== NAVBAR (overlaid on hero) ===== */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link href="/" className="logo">KILLSHOT</Link>
          <div className="nav-links">
            <Link href="/community">커뮤니티</Link>
            <button className="btn-primary-small">로그인</button>
          </div>
          <button className="mobile-menu-btn" aria-label="메뉴">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* ===== HERO + SCROLL CANVAS ===== */}
      <div ref={heroContainerRef} style={{ position: 'relative' }}>
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: -1,
          overflow: 'hidden'
        }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* 스크롤 연동 텍스트 오버레이 */}
        <HeroOverlay scrollContainerRef={heroContainerRef} />
      </div>

      {/* ===== STATS BAR ===== */}
      <div className="stats-bar fade-in-up">
        <div className="stat-item">
          <span className="stat-number">8KHz</span>
          <span className="stat-label">폴링 레이트</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">0.1ms</span>
          <span className="stat-label">입력 지연</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">6063</span>
          <span className="stat-label">알루미늄 합금</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">3-Layer</span>
          <span className="stat-label">사운드 댐프닝</span>
        </div>
      </div>

      {/* ===== SEGMENTS SECTION ===== */}
      <section className="content-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">FOR EVERY CREATOR</span>
            <h2 className="section-title">
              전문가를 위한 <span className="text-gradient">맞춤형 솔루션</span>
            </h2>
            <p className="section-desc">
              전문가, 크리에이터, 게이머 — 각자의 니즈에 최적화된 경험을 제공합니다.
            </p>
          </div>

          <div className="segment-grid">
            <div className="glass segment-card fade-in-up delay-100">
              <span className="segment-icon">🖋️</span>
              <span className="segment-label">PROFESSIONAL</span>
              <h3>Professional</h3>
              <p>장시간 타이핑에도 피로 없는 인체공학적 설계. 조용하고 안정적인 키감으로 업무 효율을 극대화합니다.</p>
            </div>
            <div className="glass segment-card fade-in-up delay-200">
              <span className="segment-icon">🎨</span>
              <span className="segment-label">CREATOR</span>
              <h3>Creator</h3>
              <p>CNC 알루미늄으로 깎아낸 정교한 바디와 감각적인 컬러. 데스크 위의 작품이 됩니다.</p>
            </div>
            <div className="glass segment-card fade-in-up delay-300">
              <span className="segment-icon">⚡</span>
              <span className="segment-label">GAMER</span>
              <h3>Gamer</h3>
              <p>0.1ms의 차이를 만드는 8KHz 폴링 레이트와 홀 이펙트 스위치. 승리를 위한 궁극의 반응속도를 경험하세요.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONFIGURATOR PREVIEW ===== */}
      <section className="content-section config-preview-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">CUSTOMIZE</span>
            <h2 className="section-title">무한한 <span className="text-gradient">구성기</span></h2>
            <p className="section-desc">
              케이스, 스위치, 키캡을 자유롭게 조합하고 실시간 3D로 미리 확인하세요.
            </p>
          </div>

          <div className="glass config-preview-card">
            <div className="config-options">
              <h4>CUSTOMIZATION</h4>
              <div className="config-option-group">
                <label>CASE FINISH</label>
                <div className="color-swatch-group">
                  <div className="color-swatch active" style={{ background: '#1c1917' }}></div>
                  <div className="color-swatch" style={{ background: '#44403c' }}></div>
                  <div className="color-swatch" style={{ background: '#c5a059' }}></div>
                  <div className="color-swatch" style={{ background: '#78716c' }}></div>
                </div>
              </div>
              <div className="config-option-group">
                <label>PLATE MATERIAL</label>
                <select className="config-select">
                  <option>Polycarbonate — Soft</option>
                  <option>Aluminum — Medium</option>
                  <option>Brass — Heavy / Firm</option>
                  <option>FR4 — Balanced</option>
                </select>
              </div>
              <div className="config-option-group">
                <label>SWITCH TYPE</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <button className="glass" style={{ padding: '0.6rem', fontSize: '0.8rem', textAlign: 'center' }}>Linear</button>
                  <button className="glass" style={{ padding: '0.6rem', fontSize: '0.8rem', textAlign: 'center' }}>Tactile</button>
                </div>
              </div>

              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '12px',
                background: 'rgba(197, 160, 89, 0.04)'
              }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '0.5rem' }}>ESTIMATED PRICE</p>
                <p style={{ fontSize: '1.6rem', fontWeight: 800 }}>₩349,000</p>
                <Link href="/configurator" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', borderRadius: '10px', display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                  구성기 열기 →
                </Link>
              </div>
            </div>

            <div className="config-viewport">
              <div style={{ textAlign: 'center' }}>
                <span className="viewport-label">[ Real-time 3D Viewport ]</span>
                <div className="mock-terminal" style={{ width: '280px', textAlign: 'left', marginTop: '1.5rem' }}>
                  <div className="term-body" style={{ fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--accent-gold)' }}>READY:</span> SYSTEM_CORE_STABLE<br />
                    <span style={{ color: 'var(--accent-gold)' }}>LOAD:</span> 3D_SKELETON_MESH... OK<br />
                    <span style={{ color: 'var(--accent-gold)' }}>DATA:</span> MATERIAL_SHADERS_APPLIED<br />
                    <br />
                    {">"} WAITING FOR INPUT...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY HIGHLIGHTS ===== */}
      <section className="content-section">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">TECHNOLOGY</span>
            <h2 className="section-title">기술의 <span className="text-gradient">정점</span></h2>
          </div>

          <div className="tech-grid">
            <div className="glass tech-card">
              <h3>Web HID 기술</h3>
              <p>별도의 소프트웨어 설치 없이 웹 브라우저에서 직접 키 매핑과 RGB 설정을 변경하세요. 크롬 기반 브라우저에서 즉시 사용 가능합니다.</p>
            </div>
            <div className="glass tech-card highlight-card" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div className="feature-content">
                <h3>가스켓 마운트 구조</h3>
                <p>유연한 키 입력과 불필요한 진동을 제거한 KILLSHOT만의 독자적인 내부 구조를 경험하세요.</p>
              </div>
              <div className="feature-visual">
                <div className="mock-terminal">
                  <div className="term-body">
                    <p style={{ color: 'var(--accent-gold)' }}>// Internal Structure Analysis</p>
                    <p>{"> Gasket: Poron LE-20"}</p>
                    <p>{"> Plate: PC / FR4 / Brass"}</p>
                    <p>{"> Sound Dampening: 3-Layer Foam"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner">
        <h2 className="fade-in-up">당신만의 <span className="text-gradient">KILLSHOT</span>을 완성하세요</h2>
        <p className="fade-in-up delay-100">당신에게 딱 맞는 키보드, 여기서 시작됩니다.</p>
        <div className="hero-cta fade-in-up delay-200">
          <Link href="/store" className="btn-primary">스토어 둘러보기</Link>
          <Link href="/contact" className="btn-secondary">문의하기</Link>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="section-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="logo">KILLSHOT</span>
              <p>완벽한 키 입력을 추구하는 프리미엄 커스텀 키보드 브랜드.</p>
            </div>
            <div className="footer-col">
              <h4>PRODUCT</h4>
              <ul>
                <li><Link href="/store">스토어</Link></li>
                <li><Link href="/configurator">3D 구성기</Link></li>
                <li><a href="#">액세서리</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>COMPANY</h4>
              <ul>
                <li><Link href="/technology">기술력</Link></li>
                <li><a href="#">브랜드 스토리</a></li>
                <li><Link href="/contact">문의하기</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>SUPPORT</h4>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">보증 정책</a></li>
                <li><a href="#">배송 안내</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 KILLSHOT. All Rights Reserved.</p>
            <p>Designed for professionals who value every keystroke.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
