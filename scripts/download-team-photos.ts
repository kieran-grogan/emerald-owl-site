const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Updated mappings based on the website screenshots
const teamPhotos = {
  'krista-strosnider.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67144dd476829a3a3d2c1651.jpeg',
  'michael-meyer.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67144ee3529e43260aa718de.jpeg',
  'ali-cheely.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/67144f7bf312d46538860eaa.jpeg',
  'genny-moore.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717b7e460398844e227b108.jpeg',
  'susan-kellum.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717b82fa3c865455809f845.jpeg',
  'hailey-downs.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717b94566be90aff5254396.jpeg',
  'michael-harris.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717b9bcea401bdb0e1a4157.jpeg',
  'rod-shuler.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717ba0df07441348bef13c2.jpeg',
  'carrie-jones.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673443ee17f51a11659a5d3b.jpeg',
  'jesse-mcdonald.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/673443d6353d38205ba403af.jpeg',
  'mark-disora.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717bc9db5adc613303fb794.png',
  'nisha-ramnath.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717bdf7b5adc6e2363fb7f4.jpeg',
  'roman-hines.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717be69892096247c74a8b3.jpeg',
  'jason-salt.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717bec0dae31b34d4869e5d.jpeg',
  'adam-burns.jpg': 'https://storage.googleapis.com/msgsndr/d2BYZGOF7ecSj21A0t4N/media/6717bb126326423f7c7846d6.jpeg'
};

async function downloadImage(url, targetPath) {
  try {
    // Remove the LeadConnector image proxy if present
    const actualUrl = url.replace(/^https:\/\/images\.leadconnectorhq\.com\/image\/.*?\/u_/, '');
    
    const response = await axios({
      method: 'GET',
      url: actualUrl,
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(targetPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Failed to download image from ${url}: ${error}`);
  }
}

async function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    await fs.promises.mkdir(dirPath, { recursive: true });
  }
}

async function clearDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = await fs.promises.readdir(dirPath);
    for (const file of files) {
      if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
        await fs.promises.unlink(path.join(dirPath, file));
      }
    }
  }
}

async function downloadTeamPhotos() {
  const targetDir = path.join(process.cwd(), 'public', 'images', 'content', 'team');
  
  try {
    // Ensure the team photos directory exists
    await ensureDirectoryExists(targetDir);
    
    // Clear existing photos
    await clearDirectory(targetDir);
    console.log('Cleared existing photos');
    
    // Download each team photo
    for (const [filename, url] of Object.entries(teamPhotos)) {
      const targetPath = path.join(targetDir, filename);
      
      try {
        // Download the image
        await downloadImage(url, targetPath);
        console.log(`Downloaded ${filename}`);
      } catch (error) {
        console.error(`Error downloading ${filename}:`, error);
      }
    }
    
    console.log('Team photo download complete!');
  } catch (error) {
    console.error('Error downloading team photos:', error);
    process.exit(1);
  }
}

// Run the download
downloadTeamPhotos(); 