'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createPost } from '@/app/actions/postActions';

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await createPost(title, author, content);
      alert('게시글이 등록되었습니다.');
      router.push('/community');
    } catch (error) {
      alert('등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <main className="section-container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <span className="section-tag">WRITE</span>
          <h1 className="section-title">글쓰기</h1>
        </div>

        <form className="glass" style={{ padding: '2.5rem' }} onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: '600' }}>제목</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }}
              className="focus-gold"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: '600' }}>작성자</label>
            <input 
              type="text" 
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="닉네임을 입력하세요"
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none' }}
              className="focus-gold"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: '600' }}>내용</label>
            <textarea 
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="자유롭게 내용을 작성해주세요"
              style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '1rem', outline: 'none', height: '300px', resize: 'vertical' }}
              className="focus-gold"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => router.back()} className="btn-secondary" style={{ padding: '0.8rem 2rem' }}>취소</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ padding: '0.8rem 3rem' }}>
              {isSubmitting ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </main>

      <style jsx>{`
        .focus-gold:focus {
          border-color: var(--accent-gold) !important;
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.2);
        }
      `}</style>
    </div>
  );
}
