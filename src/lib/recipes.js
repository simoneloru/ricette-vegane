import fm from 'front-matter';

// Buffer polyfill not strictly needed for basic string parsing with gray-matter in some versions,
// but if it is, we should rely on a proper polyfill package.
// For now, trying without explicit node import which breaks Vite build.

// Load all markdown files from ../notes as raw text
const recipeFiles = import.meta.glob('../notes/*.md', { query: '?raw', eager: true, import: 'default' });

export function getAllRecipes() {
    const recipes = Object.entries(recipeFiles).map(([path, content]) => {
        let attributes = {};
        let body = '';

        try {
            // Handle ESM/CommonJS interop for front-matter
            const parse = typeof fm === 'function' ? fm : fm.default;
            if (typeof parse !== 'function') {
                console.error('front-matter library not loaded correctly', fm);
                throw new Error('front-matter load failed');
            }

            const parsed = parse(content);
            attributes = parsed.attributes;
            body = parsed.body;
        } catch (e) {
            console.error(`Error parsing recipe: ${path}`, e);
            return null; // Skip invalid recipes
        }

        // Create slug from filename
        // path is usually "../notes/filename.md"
        const slug = path.split('/').pop().replace('.md', '');

        return {
            slug,
            ...attributes, // attributes maps to the YAML frontmatter
            body, // The markdown content
        };
    }).filter(Boolean); // Remove nulls

    return recipes.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function resolveImage(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Handle local paths
    // Remove leading slash to join cleanly with BASE_URL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export function getRecipeBySlug(slug) {
    const recipes = getAllRecipes();
    return recipes.find(r => r.slug === slug);
}
