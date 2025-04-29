import {
  getButtonAttributes,
  getDialogAttributes,
  getFormFieldAttributes,
  getTabAttributes,
  getTabPanelAttributes,
  getListboxAttributes,
  getMenuAttributes,
  getGridAttributes,
  getGridCellAttributes,
  getLiveRegionAttributes,
  getSliderAttributes,
  getProgressBarAttributes,
  getCheckboxAttributes,
  getRadioAttributes,
  getComboboxAttributes
} from '../../lib/aria';

describe('ARIA utility functions', () => {
  describe('getButtonAttributes', () => {
    it('returns correct button attributes', () => {
      const props = {
        label: 'Submit',
        pressed: true,
        disabled: false,
        expanded: true,
        controls: 'content-1'
      };

      expect(getButtonAttributes(props)).toEqual({
        role: 'button',
        'aria-label': 'Submit',
        'aria-pressed': true,
        'aria-disabled': false,
        'aria-expanded': true,
        'aria-controls': 'content-1'
      });
    });
  });

  describe('getDialogAttributes', () => {
    it('returns correct dialog attributes', () => {
      const props = {
        label: 'Settings',
        describedBy: 'dialog-description',
        modal: true
      };

      expect(getDialogAttributes(props)).toEqual({
        role: 'dialog',
        'aria-label': 'Settings',
        'aria-describedby': 'dialog-description',
        'aria-modal': true
      });
    });
  });

  describe('getFormFieldAttributes', () => {
    it('returns correct form field attributes', () => {
      const props = {
        label: 'Email',
        required: true,
        invalid: true,
        errorMessage: 'Invalid email format'
      };

      expect(getFormFieldAttributes(props)).toEqual({
        'aria-label': 'Email',
        'aria-required': true,
        'aria-invalid': true,
        'aria-errormessage': 'Invalid email format'
      });
    });
  });

  describe('getTabAttributes', () => {
    it('returns correct tab attributes', () => {
      const props = {
        selected: true,
        controls: 'panel-1'
      };

      expect(getTabAttributes(props)).toEqual({
        role: 'tab',
        'aria-selected': true,
        'aria-controls': 'panel-1'
      });
    });
  });

  describe('getTabPanelAttributes', () => {
    it('returns correct tabpanel attributes', () => {
      const props = {
        labelledBy: 'tab-1'
      };

      expect(getTabPanelAttributes(props)).toEqual({
        role: 'tabpanel',
        'aria-labelledby': 'tab-1'
      });
    });
  });

  describe('getListboxAttributes', () => {
    it('returns correct listbox attributes', () => {
      const props = {
        label: 'Select option',
        multiselectable: true,
        orientation: 'vertical' as const
      };

      expect(getListboxAttributes(props)).toEqual({
        role: 'listbox',
        'aria-label': 'Select option',
        'aria-multiselectable': true,
        'aria-orientation': 'vertical'
      });
    });
  });

  describe('getMenuAttributes', () => {
    it('returns correct menu attributes', () => {
      const props = {
        label: 'Main menu',
        expanded: true,
        orientation: 'horizontal' as const
      };

      expect(getMenuAttributes(props)).toEqual({
        role: 'menu',
        'aria-label': 'Main menu',
        'aria-expanded': true,
        'aria-orientation': 'horizontal'
      });
    });
  });

  describe('getGridAttributes', () => {
    it('returns correct grid attributes', () => {
      const props = {
        label: 'Data grid',
        rowCount: 5,
        colCount: 3
      };

      expect(getGridAttributes(props)).toEqual({
        role: 'grid',
        'aria-label': 'Data grid',
        'aria-rowcount': 5,
        'aria-colcount': 3
      });
    });
  });

  describe('getGridCellAttributes', () => {
    it('returns correct grid cell attributes', () => {
      const props = {
        rowIndex: 2,
        colIndex: 3,
        selected: true
      };

      expect(getGridCellAttributes(props)).toEqual({
        role: 'gridcell',
        'aria-rowindex': 2,
        'aria-colindex': 3,
        'aria-selected': true
      });
    });
  });

  describe('getLiveRegionAttributes', () => {
    it('returns correct live region attributes', () => {
      const props = {
        politeness: 'assertive' as const,
        atomic: true,
        relevant: 'additions' as const
      };

      expect(getLiveRegionAttributes(props)).toEqual({
        'aria-live': 'assertive',
        'aria-atomic': true,
        'aria-relevant': 'additions'
      });
    });

    it('defaults to polite politeness level', () => {
      expect(getLiveRegionAttributes({})).toEqual({
        'aria-live': 'polite'
      });
    });
  });

  describe('getSliderAttributes', () => {
    it('returns correct slider attributes', () => {
      const props = {
        label: 'Volume',
        valueMin: 0,
        valueMax: 100,
        valueNow: 50,
        valueText: '50%',
        orientation: 'horizontal' as const
      };

      expect(getSliderAttributes(props)).toEqual({
        role: 'slider',
        'aria-label': 'Volume',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': 50,
        'aria-valuetext': '50%',
        'aria-orientation': 'horizontal'
      });
    });
  });

  describe('getProgressBarAttributes', () => {
    it('returns correct progress bar attributes', () => {
      const props = {
        label: 'Loading',
        valueMin: 0,
        valueMax: 100,
        valueNow: 75,
        valueText: '75% complete'
      };

      expect(getProgressBarAttributes(props)).toEqual({
        role: 'progressbar',
        'aria-label': 'Loading',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': 75,
        'aria-valuetext': '75% complete'
      });
    });
  });

  describe('getCheckboxAttributes', () => {
    it('returns correct checkbox attributes', () => {
      const props = {
        label: 'Accept terms',
        checked: true,
        required: true,
        disabled: false
      };

      expect(getCheckboxAttributes(props)).toEqual({
        role: 'checkbox',
        'aria-label': 'Accept terms',
        'aria-checked': true,
        'aria-required': true,
        'aria-disabled': false
      });
    });

    it('handles mixed state', () => {
      expect(getCheckboxAttributes({ checked: 'mixed' })).toEqual({
        role: 'checkbox',
        'aria-checked': 'mixed'
      });
    });
  });

  describe('getRadioAttributes', () => {
    it('returns correct radio attributes', () => {
      const props = {
        label: 'Option 1',
        checked: true,
        required: true,
        disabled: false
      };

      expect(getRadioAttributes(props)).toEqual({
        role: 'radio',
        'aria-label': 'Option 1',
        'aria-checked': true,
        'aria-required': true,
        'aria-disabled': false
      });
    });
  });

  describe('getComboboxAttributes', () => {
    it('returns correct combobox attributes', () => {
      const props = {
        label: 'Search',
        expanded: true,
        controls: 'listbox-1',
        activedescendant: 'option-1',
        autocomplete: 'list' as const
      };

      expect(getComboboxAttributes(props)).toEqual({
        role: 'combobox',
        'aria-label': 'Search',
        'aria-expanded': true,
        'aria-controls': 'listbox-1',
        'aria-activedescendant': 'option-1',
        'aria-autocomplete': 'list'
      });
    });
  });
}); 