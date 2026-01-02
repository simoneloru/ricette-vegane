import React, { useMemo } from 'react';
import { getAllRecipes } from '../lib/recipes';
import RecipeCard from '../components/RecipeCard';
import { ArrowDown } from 'lucide-react';

export default function Home() {
    const recipes = useMemo(() => getAllRecipes(), []);

    return (
        <div className="home-page">
            <section className="hero">
                <div className="container hero-content">
                    <span className="hero-badge">100% Vegetale</span>
                    <h1 className="hero-title">Cucina Vegana <br /> <span className="highlight-text">Semplice & Gustosa</span></h1>
                    <p className="hero-subtitle">
                        Scopri ricette che fanno bene a te e al pianeta. Senza rinunciare al gusto.
                    </p>
                    <a href="#recipes" className="btn btn-hero">
                        Scopri le Ricette <ArrowDown size={18} />
                    </a>
                </div>
            </section>

            <section id="recipes" className="recipes-section container">
                <h2 className="section-title">Ultime Ricette</h2>
                <div className="recipes-grid">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.slug} recipe={recipe} />
                    ))}
                </div>
            </section>

            <style>{`
        .hero {
          background-color: #f7f3e8;
          padding: 80px 0;
          text-align: center;
          margin-bottom: 60px;
          border-bottom-left-radius: 40px;
          border-bottom-right-radius: 40px;
        }
        .hero-content {
          max-width: 800px;
        }
        .hero-badge {
            display: inline-block;
            background: var(--color-primary);
            color: white;
            padding: 6px 16px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 20px;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .hero-title {
          font-size: 4rem;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }
        .highlight-text {
            color: var(--color-primary);
            font-style: italic;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: #666;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        .btn-hero {
            padding: 14px 28px;
            font-size: 1.1rem;
        }
        .section-title {
            text-align: center;
            margin-bottom: 40px;
            font-size: 2.5rem;
        }
        .recipes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            padding-bottom: 60px;
        }
        @media (max-width: 768px) {
            .hero-title { font-size: 2.5rem; }
        }
      `}</style>
        </div>
    );
}
