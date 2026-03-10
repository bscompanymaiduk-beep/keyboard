'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * HeroOverlay: 스크롤 진행률에 따라 텍스트가 단계별로 나타나고 사라지는 히어로 오버레이
 */
interface HeroOverlayProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroOverlay({ scrollContainerRef }: HeroOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ['start start', 'end end'],
  });

  // ─── Badge ───
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.04, 0.35, 0.5], [0, 1, 1, 0]);
  const badgeY = useTransform(scrollYProgress, [0, 0.04, 0.35, 0.5], [20, 0, 0, -30]);

  // ─── Title ───
  const titleOpacity = useTransform(scrollYProgress, [0.02, 0.08, 0.35, 0.5], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.02, 0.08, 0.35, 0.5], [40, 0, 0, -40]);
  const titleScale = useTransform(scrollYProgress, [0.35, 0.5], [1, 0.95]);

  // ─── Subtitle ───
  const subtitleOpacity = useTransform(scrollYProgress, [0.06, 0.14, 0.35, 0.5], [0, 1, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.06, 0.14, 0.35, 0.5], [30, 0, 0, -30]);

  // ─── CTA Buttons ───
  const ctaOpacity = useTransform(scrollYProgress, [0.1, 0.18, 0.35, 0.5], [0, 1, 1, 0]);
  const ctaY = useTransform(scrollYProgress, [0.1, 0.18, 0.35, 0.5], [25, 0, 0, -25]);

  // ─── Scroll Indicator ───
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.01, 0.04, 0.08], [1, 1, 0.3, 0]);

  // ─── Spec highlight (Phase 6) ───
  const specOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.85, 0.95], [0, 1, 1, 0]);
  const specY = useTransform(scrollYProgress, [0.45, 0.55, 0.85, 0.95], [40, 0, 0, -30]);

  // ─── Overall gradient overlay ───
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.5], [1, 0.85, 0.85, 0]);

  // 서버 사이드 렌더링 시에는 아무것도 렌더링하지 않아 하이드레이션 오류 방지
  if (!mounted) return null;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      {/* 텍스트 가독성을 위한 그라데이션 오버레이 */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,1) 100%)',
          opacity: overlayOpacity,
        }}
      />

      {/* 메인 히어로 텍스트 그룹 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="hero-content" style={{ pointerEvents: 'auto', textAlign: 'center' }}>
          <motion.span className="hero-badge" style={{ opacity: badgeOpacity, y: badgeY, display: 'inline-block' }}>
            DESIGNED FOR PERFECTION
          </motion.span>

          <motion.h1 className="hero-title" style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}>
            당신의 손끝에서<br />
            <span className="text-gradient">완벽</span>이 시작된다
          </motion.h1>

          <motion.p className="hero-subtitle" style={{ opacity: subtitleOpacity, y: subtitleY }}>
            모든 키 입력에 정밀함을 담았습니다.<br />
            KILLSHOT — 프리미엄 커스텀 기계식 키보드의 새로운 기준.
          </motion.p>

          <motion.div className="hero-cta" style={{ opacity: ctaOpacity, y: ctaY }}>
            <Link href="/configurator" className="btn-primary">제품 살펴보기</Link>
            <Link href="/technology" className="btn-secondary">더 알아보기</Link>
          </motion.div>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div className="hero-scroll-indicator" style={{ opacity: scrollIndicatorOpacity }}>
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </motion.div>

      {/* 중간 스크롤 구간: 스펙 하이라이트 텍스트 */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: specOpacity,
          y: specY,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)', display: 'block' }}>8KHz</span>
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)' }}>POLLING RATE</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)', display: 'block' }}>CNC</span>
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)' }}>ALUMINUM 6063</span>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, color: 'var(--accent-gold)', display: 'block' }}>Gasket</span>
            <span style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)' }}>MOUNT SYSTEM</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
