const contentAnalysis = require('../../lib/content-analysis');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

describe('content-analysis.js utility functions', () => {
  beforeAll(() => {
    path.join.mockReturnValue('/mocked/path');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getContentFileNames returns an array of .json files', () => {
    fs.readdirSync.mockReturnValue(['a.json', 'b.txt', 'c.json']);
    const result = contentAnalysis.getContentFileNames();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(['a.json', 'c.json']);
  });

  it('analyzeContentTypes returns an object with expected keys', () => {
    fs.readdirSync.mockReturnValue(['homepage.json', 'blog_b_1.json', 'blog_c_1.json']);
    const result = contentAnalysis.analyzeContentTypes();
    expect(result).toHaveProperty('service');
    expect(result).toHaveProperty('event');
    expect(result).toHaveProperty('blog_post');
    expect(result).toHaveProperty('blog_category');
  });
}); 