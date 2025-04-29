const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * @typedef {Object} AssetManifest
 * @property {Object.<string, {paths: string[], widths: number[], format: string}>} images
 * @property {Object.<string, {path: string, format: string}>} videos
 * @property {Object.<string, {path: string, format: string}>} audio
 */

const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');
const MANIFEST_PATH = path.join(process.cwd(), 'scripts', 'manifest.json');

async function generateManifest() {
  /** @type {AssetManifest} */
  const manifest = {
    images: {},
    videos: {},
    audio: {}
  };

  // Process images
  const imagesDir = path.join(MEDIA_DIR, 'images');
  if (fs.existsSync(imagesDir)) {
    const imageFiles = fs.readdirSync(imagesDir);
    for (const file of imageFiles) {
      if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const filePath = path.join(imagesDir, file);
        const image = sharp(filePath);
        const metadata = await image.metadata();
        
        const baseName = path.basename(file, path.extname(file));
        manifest.images[baseName] = {
          paths: [`/media/images/${file}`],
          widths: [metadata.width || 0],
          format: metadata.format || 'unknown'
        };
      }
    }
  }

  // Process videos
  const videosDir = path.join(MEDIA_DIR, 'videos');
  if (fs.existsSync(videosDir)) {
    const videoFiles = fs.readdirSync(videosDir);
    for (const file of videoFiles) {
      if (file.match(/\.(mp4|webm|mov)$/i)) {
        const baseName = path.basename(file, path.extname(file));
        manifest.videos[baseName] = {
          path: `/media/videos/${file}`,
          format: path.extname(file).slice(1)
        };
      }
    }
  }

  // Process audio
  const audioDir = path.join(MEDIA_DIR, 'audio');
  if (fs.existsSync(audioDir)) {
    const audioFiles = fs.readdirSync(audioDir);
    for (const file of audioFiles) {
      if (file.match(/\.(mp3|wav|ogg)$/i)) {
        const baseName = path.basename(file, path.extname(file));
        manifest.audio[baseName] = {
          path: `/media/audio/${file}`,
          format: path.extname(file).slice(1)
        };
      }
    }
  }

  // Write manifest to file
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log('Asset manifest generated successfully!');
}

generateManifest().catch(console.error); 