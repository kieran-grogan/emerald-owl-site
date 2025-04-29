import * as dyn from '../../lib/dynamic-import';

jest.mock('next/dynamic', () => jest.fn(() => 'DynamicComponent'));

describe('dynamic-import.ts utility functions', () => {
  it('createDynamicComponent returns a dynamic component', () => {
    const compImport = jest.fn();
    const result = dyn.createDynamicComponent(compImport);
    expect(result).toBe('DynamicComponent');
  });

  it('createDynamicComponents returns object with same keys', () => {
    const imports = {
      CompA: jest.fn(),
      CompB: jest.fn(),
    };
    const result = dyn.createDynamicComponents(imports);
    expect(Object.keys(result)).toEqual(['CompA', 'CompB']);
    expect(result.CompA).toBe('DynamicComponent');
    expect(result.CompB).toBe('DynamicComponent');
  });
}); 