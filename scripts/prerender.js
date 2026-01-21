import fs from 'node:fs';
import path from 'node:path';
import fm from 'front-matter';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const NOTES_DIR = path.join(ROOT, 'src/notes');
const DIST_DIR = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

async function main() {
    console.log('🚀 Starting Pre-rendering for Social Previews...');

    if (!fs.existsSync(DIST_DIR)) {
        console.error('❌ dist folder not found. Run build first.');
        process.exit(1);
    }

    // Read the template (built SPA)
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

    // Get all recipes
    const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md'));
    const recipes = [];

    for (const file of files) {
        const content = fs.readFileSync(path.join(NOTES_DIR, file), 'utf-8');
        try {
            const parsed = fm(content);
            const slug = file.replace('.md', '');
            recipes.push({
                slug,
                attributes: parsed.attributes,
                body: parsed.body
            });
        } catch (e) {
            console.error(`⚠️ Error parsing ${file}:`, e.message);
        }
    }

    console.log(`📦 Found ${recipes.length} recipes.`);

    // Helper for absolute URLs
    const BASE_URL = 'https://ricette.simoneloru.com';
    const resolveUrl = (p) => {
        if (!p) return BASE_URL + '/leaf.svg'; // Default image fallback
        if (p.startsWith('http')) return p;
        return `${BASE_URL}${p.startsWith('/') ? '' : '/'}${p}`;
    };

    // 1. Process each recipe
    for (const recipe of recipes) {
        const { slug, attributes } = recipe;
        const recipeDir = path.join(DIST_DIR, 'recipe', slug);

        // Ensure dir exists
        fs.mkdirSync(recipeDir, { recursive: true });

        // Metadata
        const title = `${attributes.title} | Ricette Vegane`;
        const description = attributes.description || 'Una deliziosa ricetta vegana da provare.';

        // Use optimized social image if available
        // Original: /img/brownies.jpg -> Social: /img/social/brownies.jpg
        let imagePath = attributes.image;
        if (imagePath && !imagePath.startsWith('http')) {
            // Basic replacement logic, assuming images are in public/img or similar
            // If path is "img/brownies.jpg", we want "img/social/brownies.jpg"
            // But our optimizer outputs to dist/img/social/[relativePath]
            // So if original is /img/brownies.jpg, optimizer makes dist/img/social/brownies.jpg
            // Web path should be /img/social/brownies.jpg

            // Simplest approach: inject 'social/' before filename
            const dir = path.dirname(imagePath);
            const ext = path.extname(imagePath);
            const name = path.basename(imagePath, ext);
            // We force .jpg extension because optimize-images.js converts everything to jpeg
            imagePath = path.join(dir, 'social', `${name}.jpg`);
        }

        const image = resolveUrl(imagePath);
        const url = `${BASE_URL}/recipe/${slug}`;

        // Inject Meta Tags
        // We replace the <head> closing tag with our meta tags + closing tag
        const metaTags = `
            <title>${title}</title>
            <meta name="description" content="${description}">
            
            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="article" />
            <meta property="og:url" content="${url}" />
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${description}" />
            <meta property="og:image" content="${image}" />

            <!-- Twitter -->
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="${url}" />
            <meta property="twitter:title" content="${title}" />
            <meta property="twitter:description" content="${description}" />
            <meta property="twitter:image" content="${image}" />
        `;

        // Naive injection: replace existing <title>... with nothing (to avoid dupes) then inject before </head>
        // Ideally we regex replace specific tags, but full replacement is safer for generic template
        let html = template;

        // Remove default title if present
        html = html.replace(/<title>.*?<\/title>/, '');

        // Inject new tags before </head>
        html = html.replace('</head>', `${metaTags}\n</head>`);

        // Write index.html for this route
        fs.writeFileSync(path.join(recipeDir, 'index.html'), html);
        console.log(`✅ Generated: /recipe/${slug}`);
    }

    // 2. Handle 404 for GitHub Pages (SPA Fallback)
    // Copy index.html to 404.html so GH pages serves the app on unknown routes
    fs.copyFileSync(TEMPLATE_PATH, path.join(DIST_DIR, '404.html'));
    console.log('✅ Generated: 404.html (SPA Fallback)');

    console.log('🎉 Pre-rendering complete!');
}

main().catch(console.error);
