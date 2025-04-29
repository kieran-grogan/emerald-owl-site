import fs from 'fs';
import path from 'path';
import { getMediaByCategory, ensureImageDirectories, MediaResource } from '../app/lib/media-utils';

interface MediaByCategory {
  [category: string]: MediaResource[];
}

async function downloadImage(url: string, filepath: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    await fs.promises.writeFile(filepath, Buffer.from(buffer));
    console.log(`Downloaded: ${filepath}`);
  } catch (error) {
    console.error(`Error downloading ${url}:`, error);
  }
}

async function downloadAllMedia() {
  console.log('Starting media download...');
  ensureImageDirectories();

  const mediaByCategory = await getMediaByCategory() as MediaByCategory;
  const publicDir = path.join(process.cwd(), 'public');

  for (const [category, resources] of Object.entries(mediaByCategory)) {
    console.log(`\nProcessing category: ${category}`);
    const categoryDir = path.join(publicDir, 'images', 'content', category);

    for (const resource of resources) {
      if (resource.url) {
        const filename = resource.url.split('/').pop() || 'default.jpg';
        const filepath = path.join(categoryDir, filename);
        
        // Skip if file already exists
        if (fs.existsSync(filepath)) {
          console.log(`Skipping (already exists): ${filepath}`);
          continue;
        }

        await downloadImage(resource.url, filepath);
      }
    }
  }

  console.log('\nMedia download complete!');
}

// Run the download
downloadAllMedia().catch(console.error); 