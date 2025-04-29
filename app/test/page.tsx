import Link from 'next/link';
import TestCounter from '../components/TestCounter';

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      <h1 className="text-3xl font-bold mb-8 text-blue-600 dark:text-blue-400">Emerald Owl Test Page</h1>
      
      <TestCounter />
      
      <div className="mt-12">
        <Link 
          href="/"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 