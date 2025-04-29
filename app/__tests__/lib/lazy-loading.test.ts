import * as lazy from '../../lib/lazy-loading';

jest.mock('next/dynamic', () => jest.fn(() => 'DynamicComponent'));

describe('lazy-loading.ts utility functions', () => {
  it('lazyLoad returns a dynamic component', () => {
    const compImport = jest.fn();
    const result = lazy.lazyLoad(compImport);
    expect(result).toBe('DynamicComponent');
  });

  it('lazyLoadMedia resolves for non-image path', async () => {
    await expect(lazy.lazyLoadMedia('file.txt')).resolves.toBe('file.txt');
  });
}); 