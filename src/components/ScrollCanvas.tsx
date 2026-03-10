'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface ScrollCanvasProps {
  frameCount: number;       // 총 프레임 수 (예: 160)
  framePath: string;        // 프레임 경로 패턴 (예: '/frames/frame_')
  frameExtension?: string;  // 확장자 (기본: 'webp')
  scrollHeight?: number;    // 스크롤 높이 배수 (기본: 5 = 500vh)
  fallbackImage?: string;   // 프레임이 없을 때 보여줄 이미지
}

/**
 * ScrollCanvas: Sticky HTML Canvas에 스크롤 기반 이미지 시퀀스를 렌더링
 */
export default function ScrollCanvas({
  frameCount = 160,
  framePath = '/frames/frame_',
  frameExtension = 'webp',
  scrollHeight = 5,
  fallbackImage = '/hero.jpg', 
}: ScrollCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const fallbackImgRef = useRef<HTMLImageElement | null>(null);
  
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [useFallback, setUseFallback] = useState(false);
  
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // 프레임 번호를 3자리 문자열로 변환 (001, 002, ..., 160)
  const getFrameSrc = useCallback((index: number): string => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `${framePath}${frameNum}.${frameExtension}`;
  }, [framePath, frameExtension]);

  // 프레임 렌더링 함수
  const renderFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // 디바이스 픽셀 비율 반영
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      drawX = (canvasWidth - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      drawX = 0;
      drawY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // 특정 인덱스의 프레임 렌더링
  const renderFrameByIndex = useCallback((index: number) => {
    if (!useFallback && imagesRef.current.length > 0) {
      const images = imagesRef.current;
      const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
      currentFrameRef.current = clampedIndex;
      renderFrame(images[clampedIndex]);
    } else if (useFallback && fallbackImgRef.current) {
      renderFrame(fallbackImgRef.current);
    }
  }, [useFallback, renderFrame]);

  // 모든 이미지 프리로드
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let failedCount = 0;

    const checkComplete = () => {
      if (loadedCount === frameCount) {
        if (failedCount > frameCount * 0.5) {
          console.warn("Too many frames failed to load, switching to fallback.");
          setUseFallback(true);
        } else {
          imagesRef.current = images;
          setImagesLoaded(true);
          renderFrameByIndex(0);
        }
      }
    };

    // 만약 frameCount가 0이면 바로 폴백
    if (frameCount <= 0) {
      setUseFallback(true);
      return;
    }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / frameCount) * 100));
        checkComplete();
      };
      img.onerror = () => {
        loadedCount++;
        failedCount++;
        checkComplete();
      };
      images.push(img);
    }

    return () => {
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [frameCount, getFrameSrc, renderFrameByIndex]);

  // 폴백 이미지 로딩
  useEffect(() => {
    if (useFallback && fallbackImage) {
      const img = new Image();
      img.src = fallbackImage;
      img.onload = () => {
        fallbackImgRef.current = img;
        renderFrame(img);
        setImagesLoaded(true);
      };
      img.onerror = () => {
        console.error("Fallback image failed to load:", fallbackImage);
        // 폴백마저 실패하면 검은 화면이라도 보여줌 (로딩은 해제)
        setImagesLoaded(true);
      };
    }
  }, [useFallback, fallbackImage, renderFrame]);

  // Resize 대응
  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded) {
        renderFrameByIndex(currentFrameRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded, renderFrameByIndex]);

  // 스크롤 트래킹
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      renderFrameByIndex(Math.round(latest));
    });
  });

  return (
    <div ref={containerRef} style={{ height: `${scrollHeight * 100}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        
        {!imagesLoaded && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0d0d0c', zIndex: 1 }}>
            <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ width: `${loadProgress}%`, height: '100%', background: '#c5a059', transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontSize: '0.75rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)' }}>
              LOADING {loadProgress}%
            </span>
          </div>
        )}

        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '8%', background: 'linear-gradient(to bottom, transparent, #0d0d0c)', pointerEvents: 'none' }} />
      </div>
    </div>
  );
}
