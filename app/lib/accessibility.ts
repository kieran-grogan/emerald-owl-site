import { KeyboardEvent } from 'react';

// Types for ARIA attributes
type AriaRole = 'button' | 'dialog' | 'grid' | 'gridcell' | 'list' | 'listitem' | 'menu' | 'menuitem' | 'tab' | 'tabpanel' | 'region';

interface AriaOptions {
  labelledBy?: string;
  describedBy?: string;
  expanded?: boolean;
  selected?: boolean;
  checked?: boolean;
  modal?: boolean;
  hidden?: boolean;
  controls?: string;
  live?: 'off' | 'polite' | 'assertive';
}

/**
 * Returns appropriate ARIA attributes based on role and options
 */
export function getAriaAttributes(role: AriaRole, options: AriaOptions = {}) {
  const attrs: Record<string, any> = { role };

  // Add common attributes if provided
  if (options.labelledBy) attrs['aria-labelledby'] = options.labelledBy;
  if (options.describedBy) attrs['aria-describedby'] = options.describedBy;
  if (options.expanded !== undefined) attrs['aria-expanded'] = options.expanded;
  if (options.selected !== undefined) attrs['aria-selected'] = options.selected;
  if (options.checked !== undefined) attrs['aria-checked'] = options.checked;
  if (options.hidden !== undefined) attrs['aria-hidden'] = options.hidden;
  if (options.controls) attrs['aria-controls'] = options.controls;
  if (options.live) attrs['aria-live'] = options.live;

  // Role-specific attributes
  switch (role) {
    case 'button':
      attrs.tabIndex = 0;
      break;
    case 'dialog':
      attrs['aria-modal'] = options.modal ?? true;
      break;
    case 'grid':
    case 'list':
      attrs.tabIndex = 0;
      break;
    case 'tab':
      attrs.tabIndex = options.selected ? 0 : -1;
      break;
  }

  return attrs;
}

/**
 * Checks if color contrast meets WCAG 2.1 AA standards
 * Returns true if contrast ratio is at least 4.5:1 for normal text
 * or 3:1 for large text
 */
export function meetsContrastStandard(foreground: string, background: string, isLargeText: boolean = false): boolean {
  const contrast = getContrastRatio(foreground, background);
  return isLargeText ? contrast >= 3 : contrast >= 4.5;
}

/**
 * Calculates relative luminance of a color
 */
function getLuminance(color: string): number {
  // Remove # if present
  color = color.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16) / 255;
  const g = parseInt(color.substr(2, 2), 16) / 255;
  const b = parseInt(color.substr(4, 2), 16) / 255;

  // Convert to sRGB
  const rsRGB = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gsRGB = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bsRGB = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Calculate luminance
  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}

/**
 * Calculates contrast ratio between two colors
 */
function getContrastRatio(foreground: string, background: string): number {
  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Handles keyboard navigation for grid/list components
 */
export function handleGridKeyboardNavigation(
  event: KeyboardEvent,
  currentIndex: number,
  totalItems: number,
  columnsPerRow: number,
  onIndexChange: (newIndex: number) => void
) {
  const key = event.key;
  let newIndex = currentIndex;

  switch (key) {
    case 'ArrowRight':
      newIndex = Math.min(currentIndex + 1, totalItems - 1);
      break;
    case 'ArrowLeft':
      newIndex = Math.max(currentIndex - 1, 0);
      break;
    case 'ArrowDown':
      newIndex = Math.min(currentIndex + columnsPerRow, totalItems - 1);
      break;
    case 'ArrowUp':
      newIndex = Math.max(currentIndex - columnsPerRow, 0);
      break;
    case 'Home':
      newIndex = 0;
      break;
    case 'End':
      newIndex = totalItems - 1;
      break;
    default:
      return;
  }

  if (newIndex !== currentIndex) {
    event.preventDefault();
    onIndexChange(newIndex);
  }
}

/**
 * Creates a unique ID for ARIA attributes
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Manages focus trap within a modal/dialog
 */
export function trapFocus(containerRef: React.RefObject<HTMLElement>) {
  const focusableElements = containerRef.current?.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (!focusableElements?.length) return;

  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

  // Focus first element
  firstFocusable.focus();

  return (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    // Shift + Tab
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    }
    // Tab
    else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  };
}

/**
 * Checks if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  return !(
    element.hasAttribute('aria-hidden') ||
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    style.opacity === '0'
  );
}

/**
 * Announces a message to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.classList.add('sr-only');
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Validates HTML for accessibility issues
 */
export function validateAccessibility(element: HTMLElement): string[] {
  const issues: string[] = [];

  // Check for images without alt text
  const images = element.getElementsByTagName('img');
  Array.from(images).forEach(img => {
    if (!img.hasAttribute('alt')) {
      issues.push(`Image missing alt text: ${img.src}`);
    }
  });

  // Check for buttons without accessible names
  const buttons = element.getElementsByTagName('button');
  Array.from(buttons).forEach(button => {
    if (!button.textContent && !button.getAttribute('aria-label')) {
      issues.push('Button missing accessible name');
    }
  });

  // Check for proper heading hierarchy
  let lastHeadingLevel = 0;
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(heading => {
    const level = parseInt(heading.tagName[1]);
    if (level - lastHeadingLevel > 1) {
      issues.push(`Heading level skipped from h${lastHeadingLevel} to h${level}`);
    }
    lastHeadingLevel = level;
  });

  // Check for sufficient color contrast (simplified check)
  const elements = element.getElementsByTagName('*');
  Array.from(elements).forEach(el => {
    const style = window.getComputedStyle(el);
    if (style.color && style.backgroundColor) {
      if (!meetsContrastStandard(style.color, style.backgroundColor)) {
        issues.push(`Insufficient color contrast on element: ${el.tagName}`);
      }
    }
  });

  return issues;
} 