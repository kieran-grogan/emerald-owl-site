import { ReactNode } from 'react';

/**
 * Common ARIA roles
 */
export type AriaRole =
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'button'
  | 'cell'
  | 'checkbox'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

/**
 * Common ARIA properties
 */
export interface AriaAttributes {
  role?: AriaRole;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-details'?: string;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-relevant'?: 'additions' | 'removals' | 'text' | 'all';
  'aria-hidden'?: boolean;
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-pressed'?: boolean | 'mixed';
  'aria-selected'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-disabled'?: boolean;
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-errormessage'?: string;
  'aria-modal'?: boolean;
  'aria-busy'?: boolean;
  'aria-valuemin'?: number;
  'aria-valuemax'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
  'aria-colcount'?: number;
  'aria-colindex'?: number;
  'aria-colspan'?: number;
  'aria-rowcount'?: number;
  'aria-rowindex'?: number;
  'aria-rowspan'?: number;
  'aria-posinset'?: number;
  'aria-setsize'?: number;
  'aria-level'?: number;
}

/**
 * Returns ARIA attributes for a button
 */
export function getButtonAttributes(props: {
  label?: string;
  labelledBy?: string;
  pressed?: boolean;
  disabled?: boolean;
  expanded?: boolean;
  controls?: string;
}): AriaAttributes {
  return {
    role: 'button',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-pressed': props.pressed,
    'aria-disabled': props.disabled,
    'aria-expanded': props.expanded,
    'aria-controls': props.controls
  };
}

/**
 * Returns ARIA attributes for a dialog
 */
export function getDialogAttributes(props: {
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  modal?: boolean;
}): AriaAttributes {
  return {
    role: 'dialog',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-describedby': props.describedBy,
    'aria-modal': props.modal
  };
}

/**
 * Returns ARIA attributes for a form field
 */
export function getFormFieldAttributes(props: {
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  required?: boolean;
  invalid?: boolean;
  errorMessage?: string;
}): AriaAttributes {
  return {
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-describedby': props.describedBy,
    'aria-required': props.required,
    'aria-invalid': props.invalid,
    'aria-errormessage': props.errorMessage
  };
}

/**
 * Returns ARIA attributes for a tab
 */
export function getTabAttributes(props: {
  selected?: boolean;
  controls: string;
}): AriaAttributes {
  return {
    role: 'tab',
    'aria-selected': props.selected,
    'aria-controls': props.controls
  };
}

/**
 * Returns ARIA attributes for a tabpanel
 */
export function getTabPanelAttributes(props: {
  labelledBy: string;
}): AriaAttributes {
  return {
    role: 'tabpanel',
    'aria-labelledby': props.labelledBy
  };
}

/**
 * Returns ARIA attributes for a listbox
 */
export function getListboxAttributes(props: {
  label?: string;
  labelledBy?: string;
  multiselectable?: boolean;
  orientation?: 'horizontal' | 'vertical';
}): AriaAttributes {
  return {
    role: 'listbox',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-multiselectable': props.multiselectable,
    'aria-orientation': props.orientation
  };
}

/**
 * Returns ARIA attributes for a menu
 */
export function getMenuAttributes(props: {
  label?: string;
  labelledBy?: string;
  expanded?: boolean;
  orientation?: 'horizontal' | 'vertical';
}): AriaAttributes {
  return {
    role: 'menu',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-expanded': props.expanded,
    'aria-orientation': props.orientation
  };
}

/**
 * Returns ARIA attributes for a grid
 */
export function getGridAttributes(props: {
  label?: string;
  labelledBy?: string;
  rowCount: number;
  colCount: number;
}): AriaAttributes {
  return {
    role: 'grid',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-rowcount': props.rowCount,
    'aria-colcount': props.colCount
  };
}

/**
 * Returns ARIA attributes for a grid cell
 */
export function getGridCellAttributes(props: {
  rowIndex: number;
  colIndex: number;
  selected?: boolean;
}): AriaAttributes {
  return {
    role: 'gridcell',
    'aria-rowindex': props.rowIndex,
    'aria-colindex': props.colIndex,
    'aria-selected': props.selected
  };
}

/**
 * Returns ARIA attributes for a live region
 */
export function getLiveRegionAttributes(props: {
  politeness?: 'off' | 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
}): AriaAttributes {
  return {
    'aria-live': props.politeness || 'polite',
    'aria-atomic': props.atomic,
    'aria-relevant': props.relevant
  };
}

/**
 * Returns ARIA attributes for a slider
 */
export function getSliderAttributes(props: {
  label?: string;
  labelledBy?: string;
  valueMin: number;
  valueMax: number;
  valueNow: number;
  valueText?: string;
  orientation?: 'horizontal' | 'vertical';
}): AriaAttributes {
  return {
    role: 'slider',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-valuemin': props.valueMin,
    'aria-valuemax': props.valueMax,
    'aria-valuenow': props.valueNow,
    'aria-valuetext': props.valueText,
    'aria-orientation': props.orientation
  };
}

/**
 * Returns ARIA attributes for a progress bar
 */
export function getProgressBarAttributes(props: {
  label?: string;
  labelledBy?: string;
  valueMin?: number;
  valueMax?: number;
  valueNow?: number;
  valueText?: string;
}): AriaAttributes {
  return {
    role: 'progressbar',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-valuemin': props.valueMin,
    'aria-valuemax': props.valueMax,
    'aria-valuenow': props.valueNow,
    'aria-valuetext': props.valueText
  };
}

/**
 * Returns ARIA attributes for a checkbox
 */
export function getCheckboxAttributes(props: {
  label?: string;
  labelledBy?: string;
  checked?: boolean | 'mixed';
  disabled?: boolean;
  required?: boolean;
}): AriaAttributes {
  return {
    role: 'checkbox',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-checked': props.checked,
    'aria-disabled': props.disabled,
    'aria-required': props.required
  };
}

/**
 * Returns ARIA attributes for a radio button
 */
export function getRadioAttributes(props: {
  label?: string;
  labelledBy?: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
}): AriaAttributes {
  return {
    role: 'radio',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-checked': props.checked,
    'aria-disabled': props.disabled,
    'aria-required': props.required
  };
}

/**
 * Returns ARIA attributes for a combobox
 */
export function getComboboxAttributes(props: {
  label?: string;
  labelledBy?: string;
  expanded?: boolean;
  controls?: string;
  activedescendant?: string;
  autocomplete?: 'none' | 'inline' | 'list' | 'both';
}): AriaAttributes {
  return {
    role: 'combobox',
    'aria-label': props.label,
    'aria-labelledby': props.labelledBy,
    'aria-expanded': props.expanded,
    'aria-controls': props.controls,
    'aria-activedescendant': props.activedescendant,
    'aria-autocomplete': props.autocomplete
  };
} 