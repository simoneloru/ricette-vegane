import React from 'react';
import { resolveImage } from '../lib/recipes';
import { parseDuration } from '../lib/recipeUtils';

export default function SEOMetadata({ recipe }) {
    if (!recipe) return null;

    // Helper to get full URL
    const getFullUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;

        // Use production domain for SEO to satisfy Google validation even locally
        // This ensures that when testing on localhost, the image URL is valid (https://...)
        const baseUrl = 'https://ricette.simoneloru.com';

        // Remove potential leading slash duplication or handle clean path
        // resolveImage usually returns something like '/img/foo.jpg' or 'img/foo.jpg'
        // If it starts with '/', slice it.
        // We want baseUrl + /img/... - wait, resolveImage might return /img...
        // Let's be safe.
        const cleanPath = path.startsWith('/') ? path : `/${path}`;

        // Actually, if resolveImage returns /img/foo.jpg, and baseUrl is no slash...
        return `${baseUrl}${cleanPath}`;
    };

    const imageUrl = getFullUrl(resolveImage(recipe.image));
    const isoTime = parseDuration(recipe.time);

    const schema = {
        "@context": "https://schema.org/",
        "@type": "Recipe",
        "name": recipe.title,
        "image": [imageUrl],
        "author": {
            "@type": "Person",
            "name": "Simone Loru"
        },
        "datePublished": recipe.date,
        "description": recipe.description,
        "prepTime": isoTime,
        // We assume 'time' in frontmatter is total prep time. 
        "totalTime": isoTime,
        "recipeYield": recipe.servings ? `${recipe.servings} porzioni` : undefined,
        "recipeCategory": recipe.tags ? recipe.tags[0] : "Vegano",
        "recipeCuisine": "Vegana",
        "keywords": recipe.tags ? recipe.tags.join(', ') : "Ricette Vegane",
        "recipeIngredient": recipe.ingredients,
        // Passing body as single text step for simplicity
        "recipeInstructions": [
            {
                "@type": "HowToStep",
                "text": recipe.body
            }
        ]
    };

    // Clean undefined values
    Object.keys(schema).forEach(key => schema[key] === undefined && delete schema[key]);

    return (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    );
}
