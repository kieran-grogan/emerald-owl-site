import { KeyboardEvent } from 'react';

interface KeyboardNavigationOptions {
  onEscape?: () => void;
  onEnter?: () => void;
  onSpace?: () => void;
  onArrow?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onTab?: (shift: boolean) => void;
  onHome?: () => void;
  onEnd?: () => void;
  onPageUp?: () => void;
  onPageDown?: () => void;
  preventDefault?: boolean;
}

/**
 * Handles common keyboard interactions for navigation
 */
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  options: KeyboardNavigationOptions = {}
): void {
  const { key, shiftKey } = event;
  const {
    onEscape,
    onEnter,
    onSpace,
    onArrow,
    onTab,
    onHome,
    onEnd,
    onPageUp,
    onPageDown,
    preventDefault = true
  } = options;

  let handled = true;

  switch (key) {
    case 'Escape':
      onEscape?.();
      break;
    case 'Enter':
      onEnter?.();
      break;
    case ' ':
      onSpace?.();
      break;
    case 'ArrowUp':
      onArrow?.('up');
      break;
    case 'ArrowDown':
      onArrow?.('down');
      break;
    case 'ArrowLeft':
      onArrow?.('left');
      break;
    case 'ArrowRight':
      onArrow?.('right');
      break;
    case 'Tab':
      onTab?.(shiftKey);
      break;
    case 'Home':
      onHome?.();
      break;
    case 'End':
      onEnd?.();
      break;
    case 'PageUp':
      onPageUp?.();
      break;
    case 'PageDown':
      onPageDown?.();
      break;
    default:
      handled = false;
  }

  if (preventDefault && handled) {
    event.preventDefault();
  }
}

/**
 * Handles keyboard navigation for dropdown menus
 */
export function handleDropdownKeyboardNavigation(
  event: KeyboardEvent,
  {
    isOpen,
    setIsOpen,
    activeIndex,
    setActiveIndex,
    itemCount,
    onSelect
  }: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    itemCount: number;
    onSelect?: (index: number) => void;
  }
): void {
  const { key } = event;

  switch (key) {
    case 'Enter':
    case ' ':
      if (!isOpen) {
        setIsOpen(true);
      } else if (activeIndex >= 0) {
        onSelect?.(activeIndex);
        setIsOpen(false);
      }
      event.preventDefault();
      break;

    case 'Escape':
      if (isOpen) {
        setIsOpen(false);
        event.preventDefault();
      }
      break;

    case 'ArrowDown':
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex((activeIndex + 1) % itemCount);
      }
      event.preventDefault();
      break;

    case 'ArrowUp':
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setActiveIndex((activeIndex - 1 + itemCount) % itemCount);
      }
      event.preventDefault();
      break;

    case 'Home':
      if (isOpen) {
        setActiveIndex(0);
        event.preventDefault();
      }
      break;

    case 'End':
      if (isOpen) {
        setActiveIndex(itemCount - 1);
        event.preventDefault();
      }
      break;
  }
}

/**
 * Handles keyboard navigation for tabs
 */
export function handleTabKeyboardNavigation(
  event: KeyboardEvent,
  {
    activeTab,
    setActiveTab,
    tabCount,
    orientation = 'horizontal'
  }: {
    activeTab: number;
    setActiveTab: (index: number) => void;
    tabCount: number;
    orientation?: 'horizontal' | 'vertical';
  }
): void {
  const { key } = event;

  let handled = true;
  let newIndex = activeTab;

  switch (key) {
    case orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp':
      newIndex = (activeTab - 1 + tabCount) % tabCount;
      break;
    case orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown':
      newIndex = (activeTab + 1) % tabCount;
      break;
    case 'Home':
      newIndex = 0;
      break;
    case 'End':
      newIndex = tabCount - 1;
      break;
    default:
      handled = false;
  }

  if (handled) {
    event.preventDefault();
    setActiveTab(newIndex);
  }
}

/**
 * Handles keyboard navigation for slider/carousel components
 */
export function handleSliderKeyboardNavigation(
  event: KeyboardEvent,
  {
    currentIndex,
    setCurrentIndex,
    totalSlides,
    onNext,
    onPrev
  }: {
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    totalSlides: number;
    onNext?: () => void;
    onPrev?: () => void;
  }
): void {
  const { key } = event;

  switch (key) {
    case 'ArrowLeft':
      if (onPrev) {
        onPrev();
      } else {
        setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides);
      }
      event.preventDefault();
      break;

    case 'ArrowRight':
      if (onNext) {
        onNext();
      } else {
        setCurrentIndex((currentIndex + 1) % totalSlides);
      }
      event.preventDefault();
      break;

    case 'Home':
      setCurrentIndex(0);
      event.preventDefault();
      break;

    case 'End':
      setCurrentIndex(totalSlides - 1);
      event.preventDefault();
      break;
  }
}

/**
 * Creates a keyboard shortcut handler
 */
export function createKeyboardShortcutHandler(
  shortcuts: Record<string, () => void>,
  options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
) {
  const { preventDefault = true, stopPropagation = true } = options;

  return (event: KeyboardEvent) => {
    const key = [
      event.ctrlKey ? 'Ctrl' : '',
      event.altKey ? 'Alt' : '',
      event.shiftKey ? 'Shift' : '',
      event.key
    ]
      .filter(Boolean)
      .join('+');

    if (shortcuts[key]) {
      if (preventDefault) event.preventDefault();
      if (stopPropagation) event.stopPropagation();
      shortcuts[key]();
    }
  };
} 