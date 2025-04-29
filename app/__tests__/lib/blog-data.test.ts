import * as blogData from '../../lib/blog-data';
import fs from 'fs';
import path from 'path';

describe('blog-data.ts utility functions', () => {
  it('getAllBlogPosts returns an array (mocked)', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false); // Force fallback to mock
    const posts = await blogData.getAllBlogPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  // NOTE: Add more tests for blog-data.ts once real blog data and more public functions are available.
}); 