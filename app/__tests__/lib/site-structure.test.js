const siteStructure = require('../../lib/site-structure');
const contentAnalysis = require('../../lib/content-analysis');

jest.mock('../../lib/content-analysis');

describe('site-structure.js utility functions', () => {
  beforeAll(() => {
    contentAnalysis.getContentFileNames.mockReturnValue(['homepage.json']);
    contentAnalysis.getContentData.mockImplementation((filename) => {
      if (filename === 'homepage.json') {
        return {
          title: 'Homepage',
          content: { main_text: 'Our Experiences Blog Contact Us Our Story Our Team' },
        };
      }
      return { title: filename.replace('.json', ''), route: '/' + filename.replace('.json', '') };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('mapSiteNavigation returns an object with expected keys', () => {
    const nav = siteStructure.mapSiteNavigation();
    expect(nav).toHaveProperty('primary');
    expect(nav).toHaveProperty('footer');
    expect(nav).toHaveProperty('services');
    expect(nav).toHaveProperty('events');
    expect(nav).toHaveProperty('blog');
    expect(nav).toHaveProperty('legal');
  });
}); 