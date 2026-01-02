import fm from 'front-matter';

// Buffer polyfill not strictly needed for basic string parsing with gray-matter in some versions,
// but if it is, we should rely on a proper polyfill package.
// For now, trying without explicit node import which breaks Vite build.

// Load all markdown files from ../notes as raw text
const recipeFiles = import.meta.glob('../notes/*.md', { query: '?raw', eager: true, import: 'default' });

export function getAllRecipes() {
    const recipes = Object.entries(recipeFiles).map(([path, content]) => {
        const { attributes, body } = fm(content);

        // Create slug from filename
        // path is usually "../notes/filename.md"
        const slug = path.split('/').pop().replace('.md', '');

        return {
            slug,
            ...attributes, // attributes maps to the YAML frontmatter
            body, // The markdown content
        };
    });

    return recipes.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getRecipeBySlug(slug) {
    const recipes = getAllRecipes();
    return recipes.find(r => r.slug === slug);
}
