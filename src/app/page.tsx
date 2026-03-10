import React from 'react';

export default function Home() {
  return (
    <main className="main-container">
      <div className="bg-glow"></div>
      
      {/* Navbar Minimal */}
      <nav className="navbar fade-in-up">
        <div className="logo">Antigravity</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <button className="btn-primary-small">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title fade-in-up delay-100">
          The Future of <br/><span className="text-gradient">Agentic Coding</span>
        </h1>
        <p className="hero-subtitle fade-in-up delay-200">
          Supercharge your development workflow with Antigravity.<br/>
          Developed by Google Deepmind to solve complex software engineering tasks autonomously.
        </p>
        <div className="hero-cta fade-in-up delay-300">
          <button className="btn-primary">Deploy Your First Agent</button>
          <button className="btn-secondary">Read the Documentation</button>
        </div>
      </section>

      {/* Features Bento Box */}
      <section id="features" className="features-section fade-in-up delay-300">
        <div className="features-grid">
          
          <div className="glass feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Autonomous Agents</h3>
            <p>From planning to execution, Antigravity plans and completes multi-step tasks without hand-holding.</p>
          </div>
          
          <div className="glass feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Deep Knowledge Interface</h3>
            <p>Understands your entire codebase structure intuitively, pulling context exactly when needed.</p>
          </div>

          <div className="glass feature-card col-span-2 highlight-card">
            <div className="feature-content">
              <h3>Multi-Tool Proficiency</h3>
              <p>Terminal. Browser. Filesystem. Antigravity navigates between tools like a seasoned Senior Engineer.</p>
            </div>
            <div className="feature-visual">
               <div className="mock-terminal">
                 <div className="term-header"><span></span><span></span><span></span></div>
                 <div className="term-body">
                   <p>&gt; Antigravity initiating...</p>
                   <p className="text-teal">&gt; Analyzing dependencies...</p>
                   <p>&gt; Committing 12 optimized files.</p>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </section>

      <footer className="footer fade-in-up delay-300">
        <p>© 2026 Google Deepmind / Antigravity Team. All rights reserved.</p>
      </footer>
    </main>
  );
}
