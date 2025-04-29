/**
 * Script to generate a content inventory report from JSON files
 * 
 * Usage:
 *   node scripts/generate-content-report.js
 */

const fs = require('fs');
const path = require('path');
const contentAnalysis = require('../app/lib/content-analysis');

// Generate the report
const report = contentAnalysis.generateContentReport();

// Output directory
const outputDir = path.join(process.cwd(), '../reports');

// Ensure the directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Output file path
const outputFile = path.join(outputDir, 'content-inventory.md');

// Write the report to the file
fs.writeFileSync(outputFile, report, 'utf8');

console.log(`Content inventory report generated at: ${outputFile}`); 