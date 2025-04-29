const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const config = {
  sourceDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../public/images/optimized'),
  sizes: {
    thumbnail: { width: 200, height: 200 },
    small: { width: 400, height: 300 },
    medium: { width: 800, height: 600 },
    large: { width: 1200, height: 675 }
  },
  quality: {
    thumbnail: 60,
    small: 75,
    medium: 80,
    large: 90
  }
};

// Ensure output directory exists
if (!fs.existsSync(config.outputDir)) {
  fs.mkdirSync(config.outputDir, { recursive: true });
}

// Process a single image
async function processImage(filePath, outputPath, size, quality) {
  try {
    await sharp(filePath)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality })
      .toFile(outputPath);
    
    console.log(`✓ Processed: ${path.basename(filePath)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error);
  }
}

// Process all images in a directory
async function processDirectory(dirPath, relativePath = '') {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      // Create corresponding output directory
      const outputDir = path.join(config.outputDir, relativePath, item);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      // Process subdirectory
      await processDirectory(itemPath, path.join(relativePath, item));
    } else if (stats.isFile() && /\.(jpg|jpeg|png|gif|svg)$/i.test(item)) {
      // Process image file
      const outputBasePath = path.join(config.outputDir, relativePath, path.parse(item).name);
      
      // Generate different sizes
      for (const [sizeName, size] of Object.entries(config.sizes)) {
        const outputPath = `${outputBasePath}-${sizeName}.webp`;
        await processImage(itemPath, outputPath, size, config.quality[sizeName]);
      }
    }
  }
}

// Main function
async function main() {
  console.log('Starting media optimization...');
  console.log('Source directory:', config.sourceDir);
  console.log('Output directory:', config.outputDir);
  
  try {
    await processDirectory(config.sourceDir);
    console.log('\nMedia optimization completed successfully!');
  } catch (error) {
    console.error('\nError during media optimization:', error);
    process.exit(1);
  }
}

main(); 