import { resolveImage } from '../lib/recipes';

export default function RecipeCard({ recipe }) {
    return (
        <Link to={`/recipe/${recipe.slug}`} className="recipe-card">
            <div className="card-image-wrapper">
                <img src={resolveImage(recipe.image)} alt={recipe.title} loading="lazy" />
                <div className="card-overlay" />
            </div>
            <div className="card-content">
                <div className="card-meta">
                    <span className="difficulty">
                        <ChefHat size={14} /> {recipe.difficulty}
                    </span>
                    <span className="time">
                        <Clock size={14} /> {recipe.time}
                    </span>
                </div>
                <h3 className="card-title">{recipe.title}</h3>
                <div className="card-tags">
                    {recipe.tags && recipe.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag-mini">#{tag}</span>
                    ))}
                </div>
            </div>

            <style>{`
        .recipe-card {
           display: block;
           background: white;
           border-radius: var(--radius-lg);
           overflow: hidden;
           box-shadow: var(--shadow-card);
           transition: transform 0.3s ease, box-shadow 0.3s ease;
           height: 100%;
           display: flex;
           flex-direction: column;
        }
        .recipe-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }
        .card-image-wrapper {
            position: relative;
            height: 200px;
            overflow: hidden;
        }
        .card-image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
        }
        .recipe-card:hover .card-image-wrapper img {
            transform: scale(1.05);
        }
        .card-content {
            padding: 20px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        .card-meta {
            display: flex;
            gap: 12px;
            color: #888;
            font-size: 0.85rem;
            margin-bottom: 8px;
            font-weight: 500;
        }
        .card-meta span {
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .card-title {
            font-size: 1.25rem;
            margin-bottom: 12px;
            color: var(--color-text);
        }
        .card-tags {
            margin-top: auto;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        .tag-mini {
            font-size: 0.75rem;
            color: var(--color-primary);
            background: #e8f5e9;
            padding: 2px 8px;
            border-radius: 4px;
            font-weight: 500;
        }
      `}</style>
        </Link>
    );
}
