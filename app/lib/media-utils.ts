import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface MediaResource {
  type: string;
  url: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

export interface MediaCategory {
  name: string;
  images: MediaResource[];
}

export const mediaCategories = {
  'america-250th': 'America 250th Anniversary',
  'laser-shows': 'Laser Light Shows',
  'neon-nights': 'Neon Nights',
  'dripping-confidence': 'Dripping in Confidence',
  'foam-party': 'Foam Party',
  'sensory-friendly': 'Sensory Friendly',
  'general': 'General'
};

export function categorizeMedia(alt: string): string {
  const lowerAlt = alt.toLowerCase();
  if (lowerAlt.includes('america') || lowerAlt.includes('250th')) return 'america-250th';
  if (lowerAlt.includes('laser')) return 'laser-shows';
  if (lowerAlt.includes('neon')) return 'neon-nights';
  if (lowerAlt.includes('dripping') || lowerAlt.includes('confidence')) return 'dripping-confidence';
  if (lowerAlt.includes('foam')) return 'foam-party';
  if (lowerAlt.includes('sensory')) return 'sensory-friendly';
  return 'general';
}

export async function getMediaByCategory(): Promise<Record<string, MediaResource[]>> {
  const contentDir = path.join(process.cwd(), 'app/components/react_content');
  const files = await fs.promises.readdir(contentDir);
  const mediaByCategory: Record<string, MediaResource[]> = {};

  // Initialize categories
  Object.keys(mediaCategories).forEach(category => {
    mediaByCategory[category] = [];
  });

  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = await fs.promises.readFile(path.join(contentDir, file), 'utf8');
      const data = JSON.parse(content);

      if (data.resources) {
        data.resources.forEach((resource: MediaResource) => {
          if (resource.type === 'image' && resource.url) {
            const category = categorizeMedia(resource.alt || '');
            mediaByCategory[category].push(resource);
          }
        });
      }
    }
  }

  return mediaByCategory;
}

export function getLocalImagePath(url: string): string {
  const filename = url.split('/').pop() || 'default.jpg';
  return `/images/content/${filename}`;
}

export function ensureImageDirectories(): void {
  const publicDir = path.join(process.cwd(), 'public');
  const contentDir = path.join(publicDir, 'images', 'content');
  
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  Object.keys(mediaCategories).forEach(category => {
    const categoryDir = path.join(contentDir, category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
  });
} 