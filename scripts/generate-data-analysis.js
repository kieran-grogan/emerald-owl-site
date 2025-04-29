/**
 * Script to generate data structure analysis and standardization reports
 * 
 * Usage:
 *   node scripts/generate-data-analysis.js
 */

const fs = require('fs');
const path = require('path');
const dataStandardization = require('../app/lib/data-standardization');

// Output directory
const outputDir = path.join(process.cwd(), '../reports');

// Ensure the directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate data structure analysis report
const structureReport = dataStandardization.analyzeDataStructures();
const structureReportFile = path.join(outputDir, 'data-structure-analysis.md');
fs.writeFileSync(structureReportFile, structureReport, 'utf8');
console.log(`Data structure analysis report generated at: ${structureReportFile}`);

// Generate data standardization report
const standardizationReport = dataStandardization.generateStandardizationReport();
const standardizationReportFile = path.join(outputDir, 'data-standardization-report.md');
fs.writeFileSync(standardizationReportFile, standardizationReport, 'utf8');
console.log(`Data standardization report generated at: ${standardizationReportFile}`); 