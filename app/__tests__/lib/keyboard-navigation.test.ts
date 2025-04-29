import { KeyboardEvent } from 'react';
import * as keyNav from '../../lib/keyboard-navigation';

describe('keyboard-navigation.ts utility functions', () => {
  describe('handleKeyboardNavigation', () => {
    const mockEvent = {
      key: '',
      shiftKey: false,
      preventDefault: jest.fn()
    } as unknown as KeyboardEvent;

    const mockCallbacks = {
      onEscape: jest.fn(),
      onEnter: jest.fn(),
      onSpace: jest.fn(),
      onArrow: jest.fn(),
      onTab: jest.fn(),
      onHome: jest.fn(),
      onEnd: jest.fn(),
      onPageUp: jest.fn(),
      onPageDown: jest.fn()
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('handles Escape key', () => {
      mockEvent.key = 'Escape';
      keyNav.handleKeyboardNavigation(mockEvent, mockCallbacks);
      expect(mockCallbacks.onEscape).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles Enter key', () => {
      mockEvent.key = 'Enter';
      keyNav.handleKeyboardNavigation(mockEvent, mockCallbacks);
      expect(mockCallbacks.onEnter).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles Space key', () => {
      mockEvent.key = ' ';
      keyNav.handleKeyboardNavigation(mockEvent, mockCallbacks);
      expect(mockCallbacks.onSpace).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('handles arrow keys', () => {
      const directions = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
      };

      Object.entries(directions).forEach(([key, direction]) => {
        mockEvent.key = key;
        keyNav.handleKeyboardNavigation(mockEvent, mockCallbacks);
        expect(mockCallbacks.onArrow).toHaveBeenCalledWith(direction);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        jest.clearAllMocks();
      });
    });

    it('handles Tab key with and without shift', () => {
      mockEvent.key = 'Tab';
      
      mockEvent.shiftKey = false;
      keyNav.handleKeyboardNavigation(mockEvent, mockCallbacks);
      expect(mockCallbacks.onTab).toHaveBeenCalledWith(false);
      
      mockEvent.shiftKey = true;
      keyNav.handleKeyboardNavigation(mockEvent, mockCallbacks);
      expect(mockCallbacks.onTab).toHaveBeenCalledWith(true);
    });
  });

  describe('handleDropdownKeyboardNavigation', () => {
    const mockEvent = {
      key: '',
      preventDefault: jest.fn()
    } as unknown as KeyboardEvent;

    const mockHandlers = {
      isOpen: false,
      setIsOpen: jest.fn(),
      activeIndex: 0,
      setActiveIndex: jest.fn(),
      itemCount: 3,
      onSelect: jest.fn()
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('opens dropdown on Enter when closed', () => {
      mockEvent.key = 'Enter';
      keyNav.handleDropdownKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setIsOpen).toHaveBeenCalledWith(true);
    });

    it('selects item and closes dropdown on Enter when open', () => {
      mockHandlers.isOpen = true;
      mockEvent.key = 'Enter';
      keyNav.handleDropdownKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.onSelect).toHaveBeenCalledWith(mockHandlers.activeIndex);
      expect(mockHandlers.setIsOpen).toHaveBeenCalledWith(false);
    });

    it('closes dropdown on Escape when open', () => {
      mockHandlers.isOpen = true;
      mockEvent.key = 'Escape';
      keyNav.handleDropdownKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setIsOpen).toHaveBeenCalledWith(false);
    });

    it('navigates items with arrow keys when open', () => {
      mockHandlers.isOpen = true;
      
      mockEvent.key = 'ArrowDown';
      keyNav.handleDropdownKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setActiveIndex).toHaveBeenCalledWith(1);
      
      mockEvent.key = 'ArrowUp';
      keyNav.handleDropdownKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setActiveIndex).toHaveBeenCalledWith(2);
    });
  });

  describe('handleTabKeyboardNavigation', () => {
    const mockEvent = {
      key: '',
      preventDefault: jest.fn()
    } as unknown as KeyboardEvent;

    const mockHandlers = {
      activeTab: 1,
      setActiveTab: jest.fn(),
      tabCount: 3
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('handles horizontal navigation', () => {
      mockEvent.key = 'ArrowLeft';
      keyNav.handleTabKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setActiveTab).toHaveBeenCalledWith(0);

      mockEvent.key = 'ArrowRight';
      keyNav.handleTabKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setActiveTab).toHaveBeenCalledWith(2);
    });

    it('handles vertical navigation', () => {
      const verticalHandlers = { ...mockHandlers, orientation: 'vertical' as const };

      mockEvent.key = 'ArrowUp';
      keyNav.handleTabKeyboardNavigation(mockEvent, verticalHandlers);
      expect(mockHandlers.setActiveTab).toHaveBeenCalledWith(0);

      mockEvent.key = 'ArrowDown';
      keyNav.handleTabKeyboardNavigation(mockEvent, verticalHandlers);
      expect(mockHandlers.setActiveTab).toHaveBeenCalledWith(2);
    });

    it('handles Home and End keys', () => {
      mockEvent.key = 'Home';
      keyNav.handleTabKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setActiveTab).toHaveBeenCalledWith(0);

      mockEvent.key = 'End';
      keyNav.handleTabKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setActiveTab).toHaveBeenCalledWith(2);
    });
  });

  describe('handleSliderKeyboardNavigation', () => {
    const mockEvent = {
      key: '',
      preventDefault: jest.fn()
    } as unknown as KeyboardEvent;

    const mockHandlers = {
      currentIndex: 1,
      setCurrentIndex: jest.fn(),
      totalSlides: 3,
      onNext: jest.fn(),
      onPrev: jest.fn()
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('calls onNext/onPrev when provided', () => {
      mockEvent.key = 'ArrowRight';
      keyNav.handleSliderKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.onNext).toHaveBeenCalled();

      mockEvent.key = 'ArrowLeft';
      keyNav.handleSliderKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.onPrev).toHaveBeenCalled();
    });

    it('updates index directly when no onNext/onPrev provided', () => {
      const handlersWithoutCallbacks = {
        ...mockHandlers,
        onNext: undefined,
        onPrev: undefined
      };

      mockEvent.key = 'ArrowRight';
      keyNav.handleSliderKeyboardNavigation(mockEvent, handlersWithoutCallbacks);
      expect(mockHandlers.setCurrentIndex).toHaveBeenCalledWith(2);

      mockEvent.key = 'ArrowLeft';
      keyNav.handleSliderKeyboardNavigation(mockEvent, handlersWithoutCallbacks);
      expect(mockHandlers.setCurrentIndex).toHaveBeenCalledWith(0);
    });

    it('handles Home and End keys', () => {
      mockEvent.key = 'Home';
      keyNav.handleSliderKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setCurrentIndex).toHaveBeenCalledWith(0);

      mockEvent.key = 'End';
      keyNav.handleSliderKeyboardNavigation(mockEvent, mockHandlers);
      expect(mockHandlers.setCurrentIndex).toHaveBeenCalledWith(2);
    });
  });

  describe('createKeyboardShortcutHandler', () => {
    it('handles simple shortcuts', () => {
      const shortcuts = {
        'a': jest.fn(),
        'Ctrl+s': jest.fn(),
        'Ctrl+Shift+z': jest.fn()
      };

      const handler = keyNav.createKeyboardShortcutHandler(shortcuts);

      const mockEvent = {
        key: 'a',
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      } as unknown as KeyboardEvent;

      handler(mockEvent);
      expect(shortcuts['a']).toHaveBeenCalled();
      expect(mockEvent.preventDefault).toHaveBeenCalled();
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('handles modifier key combinations', () => {
      const shortcuts = {
        'Ctrl+s': jest.fn()
      };

      const handler = keyNav.createKeyboardShortcutHandler(shortcuts);

      const mockEvent = {
        key: 's',
        ctrlKey: true,
        altKey: false,
        shiftKey: false,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      } as unknown as KeyboardEvent;

      handler(mockEvent);
      expect(shortcuts['Ctrl+s']).toHaveBeenCalled();
    });

    it('respects preventDefault and stopPropagation options', () => {
      const shortcuts = {
        'a': jest.fn()
      };

      const handler = keyNav.createKeyboardShortcutHandler(shortcuts, {
        preventDefault: false,
        stopPropagation: false
      });

      const mockEvent = {
        key: 'a',
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
      } as unknown as KeyboardEvent;

      handler(mockEvent);
      expect(shortcuts['a']).toHaveBeenCalled();
      expect(mockEvent.preventDefault).not.toHaveBeenCalled();
      expect(mockEvent.stopPropagation).not.toHaveBeenCalled();
    });
  });
}); 