'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    // Start scrolled for subpages
    setScrolled(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar scrolled`}>
      <div className="navbar-inner">
        <Link href="/" className="logo">KILLSHOT</Link>
        <div className="nav-links">
          <Link href="/store">스토어</Link>
          <Link href="/configurator">구성기</Link>
          <Link href="/technology">기술력</Link>
          <Link href="/contact">문의하기</Link>
          <button className="btn-primary-small">로그인</button>
        </div>
        <button className="mobile-menu-btn" aria-label="메뉴">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
}
