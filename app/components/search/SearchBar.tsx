'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  searchPath?: string;
  compact?: boolean;
  darkMode?: boolean;
  onSearch?: (query: string) => void;
}

export default function SearchBar({ 
  placeholder = "Search...", 
  searchPath = "/search",
  compact = false,
  darkMode = false,
  onSearch
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(!compact);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Add event listener to handle clicks outside of expanded compact search
    if (compact && isExpanded) {
      const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setIsExpanded(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [compact, isExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim());
      } else {
        // Navigate to search results page
        router.push(`${searchPath}?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };

  const expandSearchBar = () => {
    if (compact && !isExpanded) {
      setIsExpanded(true);
      // Focus the input after expanding
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  // Base styles
  const baseInputClasses = `
    ${darkMode 
      ? 'bg-gray-800 text-white placeholder:text-gray-400 border-gray-700 focus:border-emerald-500' 
      : 'bg-white text-gray-800 placeholder:text-gray-500 border-gray-200 focus:border-emerald-400'
    }
    border rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-500
    transition-all duration-300 ease-in-out
  `;

  // Compact mode styling
  const compactClasses = compact 
    ? `${isExpanded ? 'w-48 md:w-64 pl-10 pr-4' : 'w-10 px-2 cursor-pointer'}`
    : 'w-full pl-10 pr-4';

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isExpanded ? placeholder : ''}
          className={`${baseInputClasses} ${compactClasses} py-2`}
          onClick={expandSearchBar}
          aria-label="Search"
        />
        
        <button 
          type="submit"
          aria-label="Submit search"
          className={`
            absolute left-3 top-1/2 transform -translate-y-1/2
            ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-emerald-600'}
            transition-colors
          `}
          onClick={compact && !isExpanded ? expandSearchBar : undefined}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>

        {/* Clear button - visible when there's text and the search is expanded */}
        {searchQuery && isExpanded && (
          <button
            type="button"
            aria-label="Clear search"
            className={`
              absolute right-3 top-1/2 transform -translate-y-1/2
              ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-emerald-600'}
              transition-colors
            `}
            onClick={() => setSearchQuery('')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
} 