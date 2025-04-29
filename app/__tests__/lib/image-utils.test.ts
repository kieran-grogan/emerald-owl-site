import { getImagePath, getFallbackImagePath, handleImageError } from '../../lib/image-utils';
import React from 'react';

describe('Image Utility Functions', () => {
  describe('getImagePath', () => {
    test('returns fallback for null or undefined inputs', () => {
      // @ts-ignore - Testing null input
      expect(getImagePath(null)).toBe('/placeholder.svg');
      // @ts-ignore - Testing undefined input
      expect(getImagePath(undefined)).toBe('/placeholder.svg');
      expect(getImagePath('')).toBe('/placeholder.svg');
    });

    test('returns SVG paths unmodified', () => {
      const svgPath = '/images/test.svg';
      expect(getImagePath(svgPath)).toBe(svgPath);
    });

    test('converts JPG paths to SVG', () => {
      expect(getImagePath('/images/test.jpg')).toBe('/images/test.svg');
      expect(getImagePath('/images/test.jpeg')).toBe('/images/test.svg');
    });

    test('handles paths without extensions in the images directory', () => {
      expect(getImagePath('/images/test')).toBe('/images/test.svg');
    });

    test('converts other extensions to SVG in the images directory', () => {
      expect(getImagePath('/images/test.png')).toBe('/images/test.svg');
      expect(getImagePath('/images/test.gif')).toBe('/images/test.svg');
    });

    test('handles placeholder images', () => {
      expect(getImagePath('placeholder')).toBe('/placeholder.svg');
      expect(getImagePath('/placeholder')).toBe('/placeholder.svg');
      expect(getImagePath('/placeholder.jpg')).toBe('/placeholder.svg');
    });

    test('returns non-image paths unmodified', () => {
      const nonImagePath = '/some/other/path.pdf';
      expect(getImagePath(nonImagePath)).toBe(nonImagePath);
    });
  });

  describe('getFallbackImagePath', () => {
    test('returns the correct fallback path for each type', () => {
      expect(getFallbackImagePath('blog')).toBe('/placeholder.svg');
      expect(getFallbackImagePath('event')).toBe('/placeholder.svg');
      expect(getFallbackImagePath('service')).toBe('/placeholder.svg');
      expect(getFallbackImagePath('team')).toBe('/placeholder.svg');
      expect(getFallbackImagePath('general')).toBe('/placeholder.svg');
    });

    test('uses general as the default type', () => {
      expect(getFallbackImagePath()).toBe('/placeholder.svg');
    });
  });

  describe('handleImageError', () => {
    test('sets the src attribute to fallback image on error', () => {
      // Create a mock image element
      const mockImg = document.createElement('img');
      mockImg.src = '/original-image.jpg';

      // Create a synthetic event with proper type conversion
      const mockEvent = {
        target: mockImg,
        // Add minimal required properties for SyntheticEvent
        nativeEvent: new Event('error'),
        currentTarget: mockImg,
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        preventDefault: jest.fn(),
        isDefaultPrevented: jest.fn(() => false),
        stopPropagation: jest.fn(),
        isPropagationStopped: jest.fn(() => false),
        persist: jest.fn(),
        timeStamp: Date.now(),
        type: 'error'
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;

      // Call the handler
      handleImageError(mockEvent);

      // Check that the src was changed to the fallback
      expect(mockImg.src).toContain('/placeholder.svg');
    });

    test('uses the specified type for fallback', () => {
      // Create a mock image element
      const mockImg = document.createElement('img');
      mockImg.src = '/original-image.jpg';

      // Create a synthetic event with proper type conversion
      const mockEvent = {
        target: mockImg,
        // Add minimal required properties for SyntheticEvent
        nativeEvent: new Event('error'),
        currentTarget: mockImg,
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        preventDefault: jest.fn(),
        isDefaultPrevented: jest.fn(() => false),
        stopPropagation: jest.fn(),
        isPropagationStopped: jest.fn(() => false),
        persist: jest.fn(),
        timeStamp: Date.now(),
        type: 'error'
      } as unknown as React.SyntheticEvent<HTMLImageElement, Event>;

      // Call the handler with a specific type
      handleImageError(mockEvent, 'blog');

      // Check that the src was changed to the blog fallback
      expect(mockImg.src).toContain('/placeholder.svg');
    });
  });
}); 