'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import postsData from '@/data/posts.json';

// 타입 정의
interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  views: number;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;
  
  // 페이징 그룹 (1-10, 11-20 등)
  const pageGroupSize = 10;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, Math.ceil(posts.length / postsPerPage));

  useEffect(() => {
    // 실제 환경에서는 API 호출을 하겠지만 여기서는 JSON 로드
    setPosts(postsData);
  }, []);

  // 현재 페이지의 포스트 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="page-container" style={{ background: '#0d0d0c', minHeight: '100vh', color: '#fff' }}>
      {/* Navbar (Static for subpages) */}
      <nav className="navbar scrolled">
        <div className="navbar-inner">
          <Link href="/" className="logo">KILLSHOT</Link>
          <div className="nav-links">
            <Link href="/community">커뮤니티</Link>
            <button className="btn-primary-small">로그인</button>
          </div>
        </div>
      </nav>

      <main className="section-container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <span className="section-tag">COMMUNITY</span>
          <h1 className="section-title">자유게시판</h1>
          <p className="section-desc" style={{ margin: '0' }}>익명으로 자유롭게 이야기를 나누세요.</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
          <Link href="/community/write" className="btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}>
            글쓰기
          </Link>
        </div>

        {/* 게시글 목록 테이블 스타일 */}
        <div className="glass" style={{ padding: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th style={{ padding: '1rem', color: 'var(--accent-gold)', fontWeight: '600', width: '80px' }}>번호</th>
                <th style={{ padding: '1rem', color: 'var(--accent-gold)', fontWeight: '600' }}>제목</th>
                <th style={{ padding: '1rem', color: 'var(--accent-gold)', fontWeight: '600', width: '120px' }}>작성자</th>
                <th style={{ padding: '1rem', color: 'var(--accent-gold)', fontWeight: '600', width: '120px' }}>날짜</th>
                <th style={{ padding: '1rem', color: 'var(--accent-gold)', fontWeight: '600', width: '80px' }}>조회수</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post, index) => (
                <tr key={post.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.3s' }} className="post-row">
                  <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>
                    {posts.length - (indexOfFirstPost + index)}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <Link href={`/community/${post.id}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: '500' }}>
                      {post.title}
                    </Link>
                  </td>
                  <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{post.author}</td>
                  <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                    {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td style={{ padding: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>{post.views}</td>
                </tr>
              ))}
              {currentPosts.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                    등록된 게시글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '3rem', gap: '0.5rem' }}>
          {startPage > 1 && (
            <button 
              onClick={() => paginate(startPage - 1)}
              className="glass" 
              style={{ padding: '0.5rem 1rem', background: 'none' }}
            >
              이전
            </button>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
            <button
              key={page}
              onClick={() => paginate(page)}
              className={`glass ${currentPage === page ? 'active' : ''}`}
              style={{ 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: currentPage === page ? 'var(--accent-gold)' : 'none',
                color: currentPage === page ? '#000' : '#fff',
                borderColor: currentPage === page ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'
              }}
            >
              {page}
            </button>
          ))}

          {endPage < Math.ceil(posts.length / postsPerPage) && (
            <button 
              onClick={() => paginate(endPage + 1)}
              className="glass" 
              style={{ padding: '0.5rem 1rem', background: 'none' }}
            >
              다음
            </button>
          )}
        </div>
      </main>

      <style jsx>{`
        .post-row:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .pagination-btn.active {
          background: var(--accent-gold) !important;
          color: #000 !important;
        }
      `}</style>
    </div>
  );
}
