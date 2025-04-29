import * as data from '../../lib/data';
import fs from 'fs';
import path from 'path';

jest.mock('fs');
jest.mock('path');

describe('data.ts utility functions', () => {
  beforeAll(() => {
    // Mock the data directory path
    (path.join as jest.Mock).mockReturnValue('/mocked/path');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getContentFileNames returns an array of .json files', () => {
    (fs.readdirSync as jest.Mock).mockReturnValue(['a.json', 'b.txt', 'c.json']);
    const result = data.getContentFileNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(['a.json', 'c.json']);
  });

  it('getCanonicalUrl returns correct URL for a slug', () => {
    const slug = 'test-page';
    const url = data.getCanonicalUrl(slug);
    expect(url).toMatch(/test-page$/);
    expect(url.startsWith('http')).toBe(true);
  });
}); 