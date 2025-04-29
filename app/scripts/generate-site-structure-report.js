#!/usr/bin/env node

/**
 * Script to generate a comprehensive site structure report
 * 
 * This script utilizes the site-structure.js and content-analysis.js utilities
 * to analyze the current site structure and generate a report documenting
 * the navigation structure, URL patterns, and routing for the React implementation.
 */

const fs = require('fs');
const path = require('path');
const siteStructure = require('../lib/site-structure');
const contentAnalysis = require('../lib/content-analysis');

// Ensure output directory exists
const OUTPUT_DIR = path.join(process.cwd(), 'app/docs');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate the report
async function generateReport() {
  console.log('Generating Site Structure Report...');

  // Get the primary navigation structure
  const navigationStructure = siteStructure.mapSiteNavigation();
  
  // Generate the site map
  const siteMap = siteStructure.generateSiteMap();
  
  // Define route structure
  const routeStructure = siteStructure.defineRouteStructure();
  
  // Generate the comprehensive report
  const report = siteStructure.generateSiteStructureReport(
    navigationStructure,
    siteMap,
    routeStructure
  );
  
  // Write the report to a markdown file
  const reportPath = path.join(OUTPUT_DIR, 'site-structure-report.md');
  fs.writeFileSync(reportPath, report, 'utf8');
  
  console.log(`✅ Site Structure Report generated successfully at: ${reportPath}`);
  
  // Also generate a content inventory if it's needed
  if (process.argv.includes('--with-content-inventory')) {
    console.log('Generating Content Inventory...');
    
    const contentInventory = contentAnalysis.generateContentInventory();
    const inventoryPath = path.join(OUTPUT_DIR, 'content-inventory.md');
    fs.writeFileSync(inventoryPath, contentInventory, 'utf8');
    
    console.log(`✅ Content Inventory generated successfully at: ${inventoryPath}`);
  }
}

// Execute the report generation
generateReport().catch(error => {
  console.error('Error generating site structure report:', error);
  process.exit(1);
}); 