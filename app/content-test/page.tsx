import ContentDisplay from '../components/ContentDisplay';
import { getStandardizedContentData } from '../lib/data';
import Link from 'next/link';

export default function ContentTestPage() {
  // Get the homepage content as an example
  const homepageContent = getStandardizedContentData('homepage.json');
  
  // Get a service page content
  const serviceContent = getStandardizedContentData('laser-light-show.json');
  
  // Get a blog post
  const blogContent = getStandardizedContentData('blog_b_experience-the-magic-of-neon-nights-with-emerald-owl-productions.json');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="mb-8 flex gap-4">
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Home
          </Link>
          
          <Link 
            href="/test"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Go to Test Page
          </Link>
        </div>
        
        <div className="mb-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-center">Content Test Page</h1>
          <p className="mb-8 text-center text-gray-600 dark:text-gray-300">
            This page demonstrates loading content from the JSON files in the data directory
            using different layout styles for the ContentDisplay component.
          </p>
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Hero Layout</h2>
          <ContentDisplay content={homepageContent} layoutStyle="hero" />
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Feature Layout</h2>
          <ContentDisplay content={serviceContent} layoutStyle="feature" />
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Default Layout</h2>
          <ContentDisplay content={blogContent} />
        </div>
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Card Layout</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContentDisplay content={homepageContent} layoutStyle="card" />
            <ContentDisplay content={serviceContent} layoutStyle="card" />
            <ContentDisplay content={blogContent} layoutStyle="card" />
          </div>
        </div>
      </div>
    </div>
  );
} 