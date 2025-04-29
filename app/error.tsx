'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error.message || 'An unexpected error occurred. Please try again.'}
          </p>
          <button
            onClick={reset}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
} 