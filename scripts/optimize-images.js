import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');
const SOCIAL_IMG_DIR = path.join(DIST_DIR, 'img', 'social');

async function optimizeImages() {
    console.log('🖼️  Optimizing images for social media...');

    // Ensure output dir exists
    if (!fs.existsSync(SOCIAL_IMG_DIR)) {
        fs.mkdirSync(SOCIAL_IMG_DIR, { recursive: true });
    }

    // Function to recursively find images
    function getImages(dir) {
        let results = [];
        const list = fs.readdirSync(dir);
        list.forEach(file => {
            file = path.join(dir, file);
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(getImages(file));
            } else {
                if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
                    results.push(file);
                }
            }
        });
        return results;
    }

    const images = getImages(PUBLIC_DIR);

    for (const imagePath of images) {
        const relativePath = path.relative(PUBLIC_DIR, imagePath);
        const fileName = path.basename(imagePath);
        // Only flatten structure for now or replicate?
        // Let's flatten for simplicity in this implementation since we likely link /img/social/foo.jpg
        // But if we have subfolders in public/img, we should respect that or handle it.
        // For RicetteVegane structure is mostly public/img -> foo.jpg

        // Let's assume we output to dist/img/social/[relativePath]
        const outputDir = path.dirname(path.join(SOCIAL_IMG_DIR, relativePath));
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(SOCIAL_IMG_DIR, relativePath);

        try {
            await sharp(imagePath)
                .resize({
                    width: 1200,
                    height: 630,
                    fit: 'inside', // resize to max 1200x630, preserving aspect ratio, no crop
                    withoutEnlargement: true // don't upscale small images
                })
                .jpeg({ quality: 80, mozjpeg: true }) // Convert to JPEG common format for best compatibility
                .toFile(outputPath);

            console.log(`✅ Optimized: ${relativePath}`);
        } catch (err) {
            console.error(`❌ Error optimizing ${relativePath}:`, err.message);
        }
    }

    console.log('✨ Image optimization complete.');
}

optimizeImages().catch(console.error);
