# Site Structure Analysis

## Current Navigation Structure

Based on the analysis of `sitemap.json`, the current website has the following navigation structure:

### Main Navigation
- Home (`/`)
- Neon Nights (`/neon-nights`)
- Laser Light Show (`/laser-light-show`)
- LED Cubes (`/led-cubes`)
- Foam Parties (`/foam-parties`)
- More Services
  - Dripping In Confidence (`/dripping-in-confidence`)
  - Gunge (`/gunge`) 
  - Party Entertainment (`/party-entertainment`)
  - Water Games (`/water-games`)
  - Do It Now (`/do-it-now`)
  - Sensory Friendly Experiences (`/sensory-friendly-experiences`)
- America's 250th (`/americas-250th-anniversary`)
- Blog (`/blog`)
- About Us
  - Our Story (`/our-story`)
  - Meet The Team (`/meet-the-team`)
- Contact Us (`/contact-us`)

### Additional Pages (Not in Main Navigation)
- Homepage (`/homepage`)
- Benefits for Hosting a Laser Show (`/benefits-for-hosting-a-laser-show`)
- Various blog posts and category pages

## Proposed URL Structure

For the Next.js implementation, we'll maintain a similar URL structure for consistency and SEO:

```
/                           # Home page
/neon-nights                # Neon Nights service
/laser-light-show           # Laser Light Show service
/led-cubes                  # LED Cubes service
/foam-parties               # Foam Parties service
/dripping-in-confidence     # Dripping In Confidence service
/gunge                      # Gunge service
/party-entertainment        # Party Entertainment service
/water-games                # Water Games service
/do-it-now                  # Do It Now service
/sensory-friendly-experiences # Sensory Friendly Experiences
/americas-250th-anniversary # America's 250th Anniversary
/blog                       # Blog index
/blog/[category]            # Blog category pages
/blog/[category]/[post]     # Individual blog posts
/our-story                  # Our Story page
/meet-the-team              # Meet The Team page
/contact-us                 # Contact Us page
/privacy-policy             # Privacy Policy page
/terms-of-use               # Terms of Use page
/sitemap                    # HTML Sitemap page
```

## Navigation Structure

The navigation structure for the Next.js implementation will include:

1. **Header Navigation**
   - Main menu items (as listed above)
   - Dropdown for "More Services" and "About Us" sections

2. **Footer Navigation**
   - Primary links (Home, Services, Blog, Contact)
   - Secondary links (Privacy Policy, Terms of Use, Sitemap)
   - Social media links

3. **Mobile Navigation**
   - Hamburger menu with expandable sections
   - Contact information always visible

## Next Steps

1. Implement the navigation component based on this structure
2. Set up dynamic routes in Next.js for all page types
3. Create reusable layout components that incorporate the navigation structure 