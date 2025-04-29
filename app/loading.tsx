export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
} 