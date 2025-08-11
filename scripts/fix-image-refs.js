#!/usr/bin/env node

/**
 * Fix image references in migrated blog posts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = './src/content/blog';

// Image reference mappings
const imageMap = {
    'codelaunch_dfw.png': '~/assets/images/blog/codelaunch_dfw.png',
    'codelaunch.png': '~/assets/images/blog/codelaunch.png',
    'comments.png': '~/assets/images/blog/comments.png',
    'b-n-b.jpg': '~/assets/images/blog/b-n-b.jpg',
    'evolving-with-ai.png': '~/assets/images/blog/evolving-with-ai.png',
    'markus-spiske-code.jpeg': '~/assets/images/blog/markus-spiske-code.jpeg',
    'rock-climbing.jpeg': '~/assets/images/blog/rock-climbing.jpeg',
    'kaushik-panchal-clouds.jpeg': '~/assets/images/blog/kaushik-panchal-clouds.jpeg',
    'CodeLaunch Signup.jpeg': '~/assets/images/blog/CodeLaunch Signup.jpeg'
};

function fixImageReferences() {
    const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

    for (const file of blogFiles) {
        const filePath = path.join(BLOG_DIR, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Fix image references
        for (const [imageName, newPath] of Object.entries(imageMap)) {
            // Pattern to match various image reference formats
            const patterns = [
                `./Bits-and-Bytes-2022-11/${imageName}`,
                `./Bits-and-Bytes-2022-12/${imageName}`,
                `./Bits-and-Bytes-2022-13/${imageName}`,
                `./Bits-and-Bytes-2022-5/${imageName}`,
                `./Bits-and-Bytes-2022-6/${imageName}`,
                `./Bits-and-Bytes-2022-7/${imageName}`,
                `./Bits-and-Bytes-2022-9/${imageName}`,
                `./serverless-blogs-revisited/${imageName}`,
                `./a-new-beginning/${imageName}`,
                `./evolving-with-agentic-ai/${imageName}`,
                `./rock-climbing-career/${imageName}`
            ];

            for (const pattern of patterns) {
                if (content.includes(pattern)) {
                    content = content.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPath);
                    modified = true;
                    console.log(`Fixed ${pattern} -> ${newPath} in ${file}`);
                }
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content);
        }
    }
}

fixImageReferences();
console.log('Image reference fixing completed!');
