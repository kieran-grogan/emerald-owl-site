'use client';

import { useState, FormEvent } from 'react';
import LoadingSpinner from '@/app/components/animations/LoadingSpinner';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validateEmail = (email: string) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Success!
      setIsSuccess(true);
      setEmail('');
    } catch (error) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Stay Updated</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Subscribe to our newsletter for the latest event inspiration and exclusive offers.
      </p>
      
      {isSuccess ? (
        <div className="bg-emerald-100 dark:bg-emerald-800/40 text-emerald-700 dark:text-emerald-300 p-4 rounded-md flex items-center">
          <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Thank you for subscribing to our newsletter!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 pr-12 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  error ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" color="text-white" type="circle" />
                <span className="ml-2">Subscribing...</span>
              </>
            ) : (
              'Subscribe'
            )}
          </button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      )}
    </div>
  );
} 