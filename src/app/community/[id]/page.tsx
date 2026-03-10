'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import postsData from '@/data/posts.json';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
}

export default function DetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const found = postsData.find(p => p.id === id);
    if (found) {
      setPost(found);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="page-container" style={{ background: '#0d0d0c', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>게시글을 찾을 수 없습니다.</p>
        <Link href="/community" style={{ marginLeft: '1rem', color: 'var(--accent-gold)' }}>목록으로</Link>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ background: '#0d0d0c', minHeight: '100vh', color: '#fff' }}>
      <nav className="navbar scrolled">
        <div className="navbar-inner">
          <Link href="/" className="logo">KILLSHOT</Link>
          <div className="nav-links">
            <Link href="/community">커뮤니티</Link>
            <button className="btn-primary-small">로그인</button>
          </div>
        </div>
      </nav>

      <main className="section-container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '900px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ← 뒤로가기
          </button>
        </div>

        <article className="glass" style={{ padding: '3rem' }}>
          <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>{post.title}</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span>작성자: <b style={{ color: 'rgba(255,255,255,0.8)' }}>{post.author}</b></span>
                <span>일시: {new Date(post.createdAt).toLocaleString('ko-KR')}</span>
              </div>
              <span>조회수: {post.views}</span>
            </div>
          </header>

          <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', minHeight: '300px', whiteSpace: 'pre-wrap' }}>
            {post.content}
          </div>

          <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center' }}>
            <Link href="/community" className="btn-secondary" style={{ padding: '0.8rem 3rem' }}>목록으로 돌아가기</Link>
          </footer>
        </article>
      </main>
    </div>
  );
}
