'use client';

import { useState } from 'react';

export default function TestCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col items-center space-y-4 dark:bg-gray-800">
      <h2 className="text-xl font-bold text-purple-500">React Test Component</h2>
      <p className="text-gray-700 dark:text-gray-300">Count: {count}</p>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
      </div>
    </div>
  );
} 