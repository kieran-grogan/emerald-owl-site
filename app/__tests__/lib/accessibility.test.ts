import * as a11y from '../../lib/accessibility';
import { KeyboardEvent } from 'react';

describe('accessibility.ts utility functions', () => {
  describe('getAriaAttributes', () => {
    it('returns correct role for button', () => {
      const attrs = a11y.getAriaAttributes('button');
      expect(attrs.role).toBe('button');
      expect(attrs.tabIndex).toBe(0);
    });

    it('returns correct attributes for dialog', () => {
      const attrs = a11y.getAriaAttributes('dialog', { 
        labelledBy: 'label',
        describedBy: 'desc',
        modal: true
      });
      expect(attrs.role).toBe('dialog');
      expect(attrs['aria-modal']).toBe(true);
      expect(attrs['aria-labelledby']).toBe('label');
      expect(attrs['aria-describedby']).toBe('desc');
    });

    it('handles optional attributes correctly', () => {
      const attrs = a11y.getAriaAttributes('button', {
        expanded: true,
        selected: true,
        checked: false,
        hidden: true,
        controls: 'target',
        live: 'polite'
      });
      expect(attrs['aria-expanded']).toBe(true);
      expect(attrs['aria-selected']).toBe(true);
      expect(attrs['aria-checked']).toBe(false);
      expect(attrs['aria-hidden']).toBe(true);
      expect(attrs['aria-controls']).toBe('target');
      expect(attrs['aria-live']).toBe('polite');
    });
  });

  describe('meetsContrastStandard', () => {
    it('returns true for high contrast colors', () => {
      expect(a11y.meetsContrastStandard('#000000', '#FFFFFF')).toBe(true);
      expect(a11y.meetsContrastStandard('#FFFFFF', '#000000')).toBe(true);
    });

    it('returns false for low contrast colors', () => {
      expect(a11y.meetsContrastStandard('#777777', '#888888')).toBe(false);
    });

    it('handles large text requirement correctly', () => {
      // A color combination that passes for large text but fails for normal text
      expect(a11y.meetsContrastStandard('#808080', '#FFFFFF', true)).toBe(true);
      expect(a11y.meetsContrastStandard('#808080', '#FFFFFF', false)).toBe(false);
    });
  });

  describe('handleGridKeyboardNavigation', () => {
    const mockEvent = {
      key: '',
      preventDefault: jest.fn()
    } as unknown as KeyboardEvent;
    const onIndexChange = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('handles ArrowRight navigation', () => {
      mockEvent.key = 'ArrowRight';
      a11y.handleGridKeyboardNavigation(mockEvent, 0, 3, 3, onIndexChange);
      expect(onIndexChange).toHaveBeenCalledWith(1);
    });

    it('handles ArrowLeft navigation', () => {
      mockEvent.key = 'ArrowLeft';
      a11y.handleGridKeyboardNavigation(mockEvent, 1, 3, 3, onIndexChange);
      expect(onIndexChange).toHaveBeenCalledWith(0);
    });

    it('handles ArrowDown navigation', () => {
      mockEvent.key = 'ArrowDown';
      a11y.handleGridKeyboardNavigation(mockEvent, 0, 6, 3, onIndexChange);
      expect(onIndexChange).toHaveBeenCalledWith(3);
    });

    it('handles ArrowUp navigation', () => {
      mockEvent.key = 'ArrowUp';
      a11y.handleGridKeyboardNavigation(mockEvent, 3, 6, 3, onIndexChange);
      expect(onIndexChange).toHaveBeenCalledWith(0);
    });

    it('handles Home key', () => {
      mockEvent.key = 'Home';
      a11y.handleGridKeyboardNavigation(mockEvent, 3, 6, 3, onIndexChange);
      expect(onIndexChange).toHaveBeenCalledWith(0);
    });

    it('handles End key', () => {
      mockEvent.key = 'End';
      a11y.handleGridKeyboardNavigation(mockEvent, 0, 6, 3, onIndexChange);
      expect(onIndexChange).toHaveBeenCalledWith(5);
    });
  });

  describe('generateAriaId', () => {
    it('generates unique IDs with correct prefix', () => {
      const id1 = a11y.generateAriaId('test');
      const id2 = a11y.generateAriaId('test');
      
      expect(id1).toMatch(/^test-[a-z0-9]{9}$/);
      expect(id2).toMatch(/^test-[a-z0-9]{9}$/);
      expect(id1).not.toBe(id2);
    });
  });

  describe('isVisibleToScreenReader', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      document.body.removeChild(element);
    });

    it('returns false for elements with aria-hidden', () => {
      element.setAttribute('aria-hidden', 'true');
      expect(a11y.isVisibleToScreenReader(element)).toBe(false);
    });

    it('returns false for elements with display: none', () => {
      element.style.display = 'none';
      expect(a11y.isVisibleToScreenReader(element)).toBe(false);
    });

    it('returns false for elements with visibility: hidden', () => {
      element.style.visibility = 'hidden';
      expect(a11y.isVisibleToScreenReader(element)).toBe(false);
    });

    it('returns false for elements with opacity: 0', () => {
      element.style.opacity = '0';
      expect(a11y.isVisibleToScreenReader(element)).toBe(false);
    });

    it('returns true for visible elements', () => {
      expect(a11y.isVisibleToScreenReader(element)).toBe(true);
    });
  });

  describe('validateAccessibility', () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    it('detects images without alt text', () => {
      container.innerHTML = '<img src="test.jpg">';
      const issues = a11y.validateAccessibility(container);
      expect(issues).toContain('Image missing alt text: test.jpg');
    });

    it('detects buttons without accessible names', () => {
      container.innerHTML = '<button></button>';
      const issues = a11y.validateAccessibility(container);
      expect(issues).toContain('Button missing accessible name');
    });

    it('detects skipped heading levels', () => {
      container.innerHTML = '<h1>Title</h1><h3>Subtitle</h3>';
      const issues = a11y.validateAccessibility(container);
      expect(issues).toContain('Heading level skipped from h1 to h3');
    });

    it('accepts valid heading hierarchy', () => {
      container.innerHTML = '<h1>Title</h1><h2>Subtitle</h2>';
      const issues = a11y.validateAccessibility(container);
      expect(issues).not.toContain('Heading level skipped');
    });
  });
}); 