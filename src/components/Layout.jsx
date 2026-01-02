import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';

export default function Layout() {
    return (
        <div className="app-wrapper">
            <header className="site-header">
                <div className="container header-content">
                    <Link to="/" className="branding">
                        <div className="icon-box">
                            <Leaf size={24} strokeWidth={2.5} />
                        </div>
                        <span className="logo-text">Ricette<span className="highlight">Vegane</span></span>
                    </Link>
                    <nav>
                        {/* Future nav links */}
                    </nav>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="site-footer">
                <div className="container">
                    <p>© {new Date().getFullYear()} Ricette Vegane. Fatto con <Heart size={14} fill="currentColor" className="heart-icon" /> per il pianeta.</p>
                </div>
            </footer>

            <style>{`
        .site-header {
          padding: 20px 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .branding {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--color-primary);
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
        }
        .icon-box {
          background: var(--color-accent-pop);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
        }
        .highlight {
          color: var(--color-accent);
        }
        .site-footer {
          margin-top: 60px;
          padding: 40px 0;
          text-align: center;
          color: #888;
          font-size: 0.9rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        .heart-icon {
          color: #e74c3c;
          vertical-align: middle;
        }
      `}</style>
        </div>
    );
}
