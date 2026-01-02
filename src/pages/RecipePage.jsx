import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getRecipeBySlug, resolveImage } from '../lib/recipes';
import IngredientList from '../components/IngredientList';
import { Clock, ChefHat, ArrowLeft } from 'lucide-react';

export default function RecipePage() {
    const { slug } = useParams();
    const recipe = useMemo(() => getRecipeBySlug(slug), [slug]);

    if (!recipe) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Ricetta non trovata 😔</h2>
                <Link to="/" className="btn">Torna alla Home</Link>
            </div>
        );
    }

    return (
        <div className="recipe-page">
            <div className="recipe-hero-image">
                <img src={resolveImage(recipe.image)} alt={recipe.title} />
                <div className="overlay"></div>
                <div className="hero-text container">
                    <Link to="/" className="back-link"><ArrowLeft size={16} /> Tutte le Ricette</Link>
                    <h1 className="title">{recipe.title}</h1>
                    <div className="meta">
                        <span><Clock size={16} /> {recipe.time}</span>
                        <span><ChefHat size={16} /> {recipe.difficulty}</span>
                    </div>
                </div>
            </div>

            <div className="container recipe-content-grid">
                <aside className="recipe-sidebar">
                    <div className="sticky-sidebar">
                        <h3>Ingredienti</h3>
                        <IngredientList
                            ingredients={recipe.ingredients || []}
                            defaultServings={recipe.servings || 2}
                        />
                    </div>
                </aside>

                <div className="recipe-body">
                    <div className="markdown-content">
                        <p className="description">{recipe.description}</p>
                        <hr />
                        <ReactMarkdown>{recipe.body}</ReactMarkdown>
                    </div>
                </div>
            </div>

            <style>{`
        .recipe-hero-image {
            height: 60vh;
            min-height: 400px;
            position: relative;
            background: #eee;
        }
        .recipe-hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .recipe-hero-image .overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6));
        }
        .hero-text {
            position: absolute;
            bottom: 40px;
            left: 0;
            right: 0;
            color: white;
            z-index: 2;
        }
        .back-link {
            color: rgba(255,255,255,0.8);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
            font-weight: 500;
        }
        .back-link:hover { color: white; }
        .hero-text .title {
            font-size: 3.5rem;
            margin-bottom: 16px;
            text-shadow: 0 4px 10px rgba(0,0,0,0.2);
            color: white;
        }
        .hero-text .meta {
            display: flex;
            gap: 20px;
            font-size: 1.1rem;
            font-weight: 500;
        }
        .hero-text .meta span {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            padding: 6px 16px;
            border-radius: 30px;
        }
        .recipe-content-grid {
            display: grid;
            grid-template-columns: 320px 1fr; /* Sidebar Left, Content Right */
            gap: 40px; /* Reduced gap */
            margin-top: 60px;
            margin-bottom: 100px;
            position: relative;
        }
        .recipe-body {
            grid-column: 2; /* Content on right */
        }
        .recipe-sidebar {
            grid-column: 1; /* Sidebar on left */
        }
        @media (max-width: 900px) {
            .recipe-content-grid {
                grid-template-columns: 1fr;
            }
            .recipe-body {
                grid-column: 1;
            }
            .recipe-sidebar {
                grid-column: 1;
                order: -1; /* Sidebar on top on mobile */
            }
        }
        
        .description {
            font-size: 1.2rem;
            color: #555;
            font-style: italic;
            margin-bottom: 24px;
        }
        
        .markdown-content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #333;
        }
        .markdown-content h2 {
            font-size: 2rem;
            margin-top: 40px;
            margin-bottom: 24px;
            color: var(--color-primary);
        }
        .markdown-content h3 {
             font-size: 1.5rem;
             margin-top: 30px;
             margin-bottom: 16px;
        }
        .markdown-content p {
            margin-bottom: 20px;
        }
        .markdown-content strong {
            color: var(--color-primary);
        }
        .markdown-content ul, .markdown-content ol {
            margin-bottom: 20px;
            padding-left: 24px;
        }
        .markdown-content ul {
            list-style-type: disc;
        }
        .markdown-content ol {
            list-style-type: decimal;
        }
        .markdown-content li {
            margin-bottom: 8px;
            padding-left: 4px;
        }
        .markdown-content blockquote {
            border-left: 4px solid var(--color-accent-pop);
            padding-left: 20px;
            margin: 30px 0;
            color: #666;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 0 12px 12px 0;
        }
        .sticky-sidebar {
            position: sticky;
            top: 100px;
        }
        .sticky-sidebar h3 {
            margin-bottom: 16px;
        }
      `}</style>
        </div>
    );
}
