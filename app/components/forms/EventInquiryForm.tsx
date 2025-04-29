'use client';

import { useState, FormEvent } from 'react';
import LoadingSpinner from '@/app/components/animations/LoadingSpinner';

export default function EventInquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    estimatedGuests: '',
    venueName: '',
    venueAddress: '',
    budget: '',
    requirements: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.eventType) {
      newErrors.eventType = 'Event type is required';
    }
    
    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    } else {
      // Check if date is in the future
      const eventDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (eventDate < today) {
        newErrors.eventDate = 'Event date must be in the future';
      }
    }
    
    if (!formData.estimatedGuests) {
      newErrors.estimatedGuests = 'Estimated number of guests is required';
    } else if (isNaN(Number(formData.estimatedGuests)) || Number(formData.estimatedGuests) <= 0) {
      newErrors.estimatedGuests = 'Please enter a valid number';
    }
    
    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !/^[0-9+\-() ]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      // Simulate API call during development
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, simulate success
      const data = { success: true, message: 'Thank you for your inquiry. Our team will contact you shortly to discuss the details of your event.' };
      
      setSubmitSuccess(true);
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        estimatedGuests: '',
        venueName: '',
        venueAddress: '',
        budget: '',
        requirements: '',
      });
    } catch (error: any) {
      setSubmitError(error.message || 'There was an error submitting your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
      {submitSuccess ? (
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-6">
            <svg className="w-10 h-10 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Inquiry Sent!</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Thank you for your inquiry. Our team will contact you shortly to discuss the details of your event.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md"
          >
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                }`}
                placeholder="johndoe@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                }`}
                placeholder="(123) 456-7890"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>
            
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.eventType ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select an event type</option>
                <option value="corporate">Corporate Event</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday Party</option>
                <option value="festival">Festival</option>
                <option value="concert">Concert</option>
                <option value="holiday">Holiday Celebration</option>
                <option value="fundraiser">Fundraiser</option>
                <option value="other">Other</option>
              </select>
              {errors.eventType && <p className="mt-1 text-sm text-red-500">{errors.eventType}</p>}
            </div>
            
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.eventDate ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.eventDate && <p className="mt-1 text-sm text-red-500">{errors.eventDate}</p>}
            </div>
            
            <div>
              <label htmlFor="estimatedGuests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estimated Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="estimatedGuests"
                name="estimatedGuests"
                value={formData.estimatedGuests}
                onChange={handleChange}
                min="1"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.estimatedGuests ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                }`}
                placeholder="100"
              />
              {errors.estimatedGuests && <p className="mt-1 text-sm text-red-500">{errors.estimatedGuests}</p>}
            </div>
            
            <div>
              <label htmlFor="venueName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Venue Name
              </label>
              <input
                type="text"
                id="venueName"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Grand Ballroom"
              />
            </div>
            
            <div>
              <label htmlFor="venueAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Venue Address
              </label>
              <input
                type="text"
                id="venueAddress"
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="123 Event St, City"
              />
            </div>
            
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select budget range</option>
                <option value="under-1000">Under $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500-5000">$2,500 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="over-10000">Over $10,000</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Special Requirements or Questions
            </label>
            <textarea
              id="requirements"
              name="requirements"
              rows={4}
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Tell us about any special requirements for your event..."
            />
          </div>
          
          {submitError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
              {submitError}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" color="text-white" type="circle" />
                  <span className="ml-2">Submitting...</span>
                </>
              ) : (
                'Submit Inquiry'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 