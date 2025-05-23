# Emerald Owl Productions Website - Project Directory

This file serves as a map of the project structure and files for the Emerald Owl Productions website redevelopment project.

## Project Structure

```
emerald-owl/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   │   ├── ContentDisplay.tsx   # Content display component
│   │   ├── TestCounter.tsx      # Test counter component
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx       # Site header with navigation
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   └── Layout.tsx       # Main layout wrapper
│   │   ├── content/             # Content-specific components
│   │   │   ├── PageContent.tsx  # General page component
│   │   │   ├── ServiceContent.tsx # Service page component
│   │   │   ├── BlogPost.tsx     # Blog post component
│   │   │   ├── EventContent.tsx # Event page component
│   │   │   └── BlogContent.tsx  # Enhanced blog content component with animations
│   │   ├── forms/               # Form components
│   │   │   └── ContactForm.tsx  # Contact form with validation
│   │   ├── media/               # Media components
│   │   │   ├── ImageGallery.tsx # Image gallery/slider component
│   │   │   ├── VideoPlayer.tsx  # Video player for various video types
│   │   │   ├── ResponsiveImage.tsx # Advanced responsive image handling
│   │   │   └── IconSystem.tsx   # SVG icon system and icon buttons
│   │   ├── search/               # Search components
│   │   │   └── SearchBar.tsx     # Reusable search bar component with compact mode
│   │   └── react_content/       # JSON content files from legacy site
│   ├── lib/                # Utility functions and helpers
│   │   ├── content-analysis.js  # Content analysis utilities
│   │   ├── site-structure.js    # Site structure utilities
│   │   ├── data-standardization.ts  # Data standardization utilities
│   │   ├── blog-types.ts        # Blog type definitions
│   │   ├── data.ts              # Data fetching utilities
│   │   ├── route-mapping.ts     # Route mapping between legacy paths and Next.js routes
│   │   ├── link-utils.tsx       # Smart link utilities for consistent link handling
│   │   ├── blog-data.ts         # Blog data fetching and processing utilities
│   │   └── image-utils.ts       # Image path handling utilities
│   ├── blog/               # Blog system
│   │   ├── page.tsx        # Blog index page with filtering and pagination
│   │   ├── [slug]/         # Dynamic route for individual blog posts
│   │   │   └── page.tsx    # Blog post template
│   │   └── categories/     # Blog categories
│   │       └── [category]/ # Dynamic route for blog categories
│   │           └── page.tsx # Category page template
│   ├── legal/              # Legal pages directory
│   │   ├── page.tsx        # Legal landing page
│   │   ├── privacy-policy/ # Privacy Policy directory 
│   │   │   └── page.tsx    # Privacy Policy page
│   │   └── terms-of-service/ # Terms of Service directory
│   │       └── page.tsx    # Terms of Service page
│   ├── about/              # About page directory
│   │   └── page.tsx        # About page with company information
│   ├── services/          # Services directory
│   │   ├── page.tsx       # Services index page
│   │   ├── laser-light-shows/  # Laser Light Shows service page
│   │   │   └── page.tsx        # Laser Light Shows page component
│   │   ├── neon-nights/       # Neon Nights service page
│   │   │   └── page.tsx        # Neon Nights page component
│   │   ├── foam-parties/      # Foam Parties service page
│   │   │   └── page.tsx        # Foam Parties page component
│   │   ├── water-games/       # Water Games service page
│   │   │   └── page.tsx        # Water Games page component
│   │   ├── light-design/      # Light Design service page
│   │   │   └── page.tsx        # Light Design page component
│   │   ├── dripping-in-confidence/  # Dripping in Confidence service page
│   │   │   └── page.tsx           # Dripping in Confidence page component
│   │   ├── gunge/             # Gunge service page
│   │   │   └── page.tsx           # Gunge page component
│   │   ├── sensory-friendly-experiences/  # Sensory Friendly Experiences service page
│   │   │   └── page.tsx           # Sensory Friendly Experiences page component
│   │   ├── do-it-now/         # Do It Now service page
│   │   │   └── page.tsx           # Do It Now page component
│   │   └── ...
│   ├── events/            # Events directory
│   │   ├── page.tsx       # Events index page
│   │   ├── americas-250th/   # America's 250th Anniversary event page
│   │   │   └── page.tsx      # America's 250th page component
│   │   ├── holiday-events/   # Holiday Events event page
│   │   │   └── page.tsx      # Holiday Events page component
│   │   └── fundraisers/      # Fundraisers event page
│   │       └── page.tsx      # Fundraisers page component
│   ├── gallery/           # Gallery page for showcasing work portfolio
│   │   ├── page.tsx       # Gallery page with server component and metadata
│   │   └── GalleryContent.tsx # Client component with filters and gallery items
│   ├── sitemap/           # Sitemap page with site structure
│   │   └── page.tsx       # Sitemap page with organized links to all sections
│   ├── search/            # Search functionality 
│   │   ├── page.tsx       # Search results page (client component)
│   │   └── metadata.ts    # Search page metadata
│   │
│   ├── neon-nights/       # Redirect for legacy Neon Nights URL 
│   │   └── page.tsx       # Redirect to /services/neon-nights
│   │
│   ├── foam-parties/      # Redirect for legacy Foam Parties URL
│   │   └── page.tsx       # Redirect to /services/foam-parties
│   │
│   ├── water-games/       # Redirect for legacy Water Games URL
│   │   └── page.tsx       # Redirect to /services/water-games
│   │
│   ├── dripping-in-confidence/  # Redirect for legacy Dripping in Confidence URL
│   │   └── page.tsx           # Redirect to /services/dripping-in-confidence
│   │
│   ├── gunge/             # Redirect for legacy Gunge URL
│   │   └── page.tsx           # Redirect to /services/gunge
│   │
│   ├── sensory-friendly-experiences/  # Redirect for legacy Sensory Friendly Experiences URL
│   │   └── page.tsx           # Redirect to /services/sensory-friendly-experiences
│   │
│   ├── do-it-now/         # Redirect for legacy Do It Now URL
│   │   └── page.tsx           # Redirect to /services/do-it-now
│   │
│   ├── americas-250th/    # Redirect for legacy America's 250th Anniversary URL
│   │   └── page.tsx       # Redirect to /events/americas-250th
│   │
│   ├── americas-250th-anniversary/  # Redirect for alternate America's 250th Anniversary URL
│   │   └── page.tsx       # Redirect to /events/americas-250th
│   │
│   ├── holiday-events/    # Redirect for legacy Holiday Events URL
│   │   └── page.tsx       # Redirect to /events/holiday-events
│   │
│   ├── fundraisers/       # Redirect for legacy Fundraisers URL
│   │   └── page.tsx       # Redirect to /events/fundraisers
│   │
│   ├── contact-us/        # Contact page
│   │   └── page.tsx       # Contact page component
│   │
│   ├── content-test/      # Content test page
│   │   └── page.tsx       # Content test page component
│   │
│   ├── layout.tsx         # Root layout component
│   ├── globals.css        # Global CSS with Tailwind directives
│   └── page.tsx           # Homepage
├── pages/                 # Extracted JSON content files from legacy site
├── public/                # Static assets
│   └── images/            # Image assets
│       ├── hero-pattern.svg    # Background pattern for hero section
│       ├── placeholder.svg     # Placeholder image for development
│       ├── authors/            # Author profile images for blog posts
│       │   └── michael-chen.svg  # Author profile placeholder 
│       ├── blog/               # Blog post images
│       │   ├── laser-evolution.svg  # Laser technology evolution image
│       │   └── laser-tech.svg       # Laser technology advancements image
│       └── gallery/            # Gallery images
│           ├── laser-show-1.svg    # Laser show image placeholder
│           ├── foam-party-1.svg    # Foam party image placeholder
│           └── ...             # Additional gallery images
├── reports/               # Generated analysis reports
│   ├── content-inventory.md      # Content inventory report
│   ├── data-structure-analysis.md  # Data structure analysis
│   ├── data-standardization-report.md  # Standardization report
│   ├── site-structure-analysis.md  # Site structure and navigation analysis
│   └── service-migration-report.md  # Service migration report
│   └── blog-system-report.md  # Comprehensive documentation of the blog system implementation, including architecture, data management, and UI components
├── scripts/               # Utility scripts
│   ├── generate-content-report.js  # Generate content inventory
│   └── generate-data-analysis.js   # Generate data analysis
├── development-plan.md    # Development plan document
├── tailwind.config.js     # Tailwind CSS configuration
└── project-directory.md   # This file - project structure
```

## Key Files and Components

### Core Files

- **app/page.tsx**: Main homepage component
- **app/layout.tsx**: Root layout with design system setup
- **app/globals.css**: Global CSS with Tailwind directives
- **app/components/ContentDisplay.tsx**: Component for displaying content from JSON files
- **app/lib/data.ts**: Utilities for fetching and processing content data
- **app/lib/benefits-features.ts**: TypeScript interfaces for benefit and feature data structures
- **pages/**: Directory containing extracted JSON content files from the legacy website

### Layout Components

- **app/components/layout/Layout.tsx**: Main layout wrapper component that combines Header and Footer
- **app/components/layout/Header.tsx**: Header with responsive navigation menus, dropdown functionality, and mobile menu
- **app/components/layout/Footer.tsx**: Footer with site links, contact information, social media links, and copyright
- **app/components/layout/Breadcrumb.tsx**: Context-aware breadcrumb navigation with:
  - Dynamically generated path segments based on current URL
  - User-friendly display names for path segments
  - Interactive links to parent pages
  - Integrated into the main layout for consistent display across pages

### Content Components

- **app/components/content/PageContent.tsx**: Component for general page content
- **app/components/content/ServiceContent.tsx**: Component for service pages with:
  - Benefits and features display with standardized formatting
  - Dynamic section rendering
  - Hero banner with featured image
  - Call-to-action sections
  - Support for both standardized and legacy content structures
- **app/components/content/BlogPost.tsx**: Component for blog posts with author info
- **app/components/content/EventContent.tsx**: Component for event pages with event details display
- **app/components/content/BlogContent.tsx**: Enhanced blog content component with animations

### Form Components

- **app/components/forms/ContactForm.tsx**: Contact form with:
  - Client-side validation
  - Server-side validation integration
  - Error handling
  - Success/error states
  - Loading indicator
- **app/components/forms/EventInquiryForm.tsx**: Event inquiry form with:
  - More detailed event information collection
  - Date validation
  - Venue and budget information
  - Multiple field validation
- **app/components/forms/NewsletterSignup.tsx**: Newsletter signup with:
  - Email validation
  - Success/error states
  - Privacy notice

### Search Components

- **app/components/search/SearchBar.tsx**: Versatile search input component with:
  - Responsive design for desktop and mobile
  - Compact mode with expand/collapse functionality
  - Clear button for input
  - Support for dark mode
  - Customizable placeholder text
  - Direct search results handling or navigation

- **app/search/page.tsx**: Client-side search results page that:
  - Accepts query parameters from URL
  - Displays categorized search results (blog posts, services, events)
  - Shows loading states and error handling
  - Provides refined search capabilities

### Media Components

- **app/components/media/ImageGallery.tsx**: Gallery/slider component with multiple display modes and lightbox
- **app/components/media/VideoPlayer.tsx**: Video player supporting YouTube, Vimeo and MP4 with responsive design
- **app/components/media/ResponsiveImage.tsx**: Advanced image component with responsive sizes and loading states
- **app/components/media/IconSystem.tsx**: SVG icon system with standardized icons and icon buttons

### Content Analysis and Standardization

- **app/lib/content-analysis.js**: Utilities for analyzing and categorizing JSON content
- **app/lib/data-standardization.ts**: Utilities for standardizing data structures with support for benefits and features
- **app/lib/site-structure.js**: Utilities for analyzing site structure and navigation
- **app/lib/route-mapping.ts**: Comprehensive utilities for mapping legacy URLs to Next.js routes
- **app/lib/link-utils.tsx**: React components and utilities for consistent link handling across the site
- **app/lib/benefits-features.ts**: Standardized interfaces for benefits and features used in service pages

### Routing and Navigation

- **app/lib/route-mapping.ts**: Maps legacy URLs to the new Next.js structure
  - Converts old paths like `/laser-light-shows` to `/services/laser-light-shows`
  - Maintains compatibility with direct links to content
  - Handles special cases like blog posts, resources, and fragment links
  - Processes internal links in HTML content
  - Updates resource URLs to match the new structure

- **app/lib/link-utils.tsx**: Smart link components for improved navigation
  - `SmartLink`: Component that automatically determines whether to use Next.js Link or standard anchor tags
  - `ContentWithLinks`: Processes HTML content to update all internal links
  - `RichContent`: Enhanced HTML content display with proper link handling and styling
  - Helper functions for URL validation and formatting

## Main Pages

- **app/page.tsx**: The website homepage
- **app/about/page.tsx**: About page with company story, mission, values, and team section
- **app/services/page.tsx**: Services index page with cards for all service types
- **app/services/laser-light-shows/page.tsx**: Laser Light Shows service page using ServiceContent component
- **app/services/neon-nights/page.tsx**: Neon Nights service page using ServiceContent component
- **app/services/foam-parties/page.tsx**: Foam Parties service page using ServiceContent component
- **app/services/water-games/page.tsx**: Water Games service page using ServiceContent component
- **app/services/light-design/page.tsx**: Light Design service page using ServiceContent component
- **app/services/dripping-in-confidence/page.tsx**: Dripping in Confidence service page using ServiceContent component
- **app/services/gunge/page.tsx**: Gunge service page using ServiceContent component
- **app/services/sensory-friendly-experiences/page.tsx**: Sensory Friendly Experiences service page using ServiceContent component
- **app/services/do-it-now/page.tsx**: Do It Now service page using ServiceContent component
- **app/events/page.tsx**: Events index page with cards for all event types
- **app/events/americas-250th/page.tsx**: America's 250th Anniversary event page using EventContent component
- **app/events/holiday-events/page.tsx**: Holiday Events event page using EventContent component
- **app/events/fundraisers/page.tsx**: Fundraisers event page using EventContent component
- **app/blog/page.tsx**: Blog index page with filtering and category selection
- **app/blog/[slug]/page.tsx**: Dynamic blog post pages with content and related posts
- **app/blog/categories/[category]/page.tsx**: Dynamic category pages showing filtered blog posts
- **app/legal/page.tsx**: Legal information landing page with links to policies
- **app/legal/privacy-policy/page.tsx**: Privacy Policy page with detailed information on data handling
- **app/legal/terms-of-service/page.tsx**: Terms of Service page outlining usage terms and conditions
- **app/contact-us/page.tsx**: Contact page with contact form and company information
- **app/gallery/page.tsx**: Gallery page with image grid, filtering options, and portfolio showcase
- **app/sitemap/page.tsx**: Sitemap page with organized links to all site sections by category
- **app/content-test/page.tsx**: Test page for content rendering
- **app/search/page.tsx**: Search page with filtering across content types

### Redirects and Legacy URLs

- **app/neon-nights/page.tsx**: Redirects from legacy `/neon-nights` URL to the new location at `/services/neon-nights`
- **app/foam-parties/page.tsx**: Redirects from legacy `/foam-parties` URL to the new location at `/services/foam-parties`
- **app/water-games/page.tsx**: Redirects from legacy `/water-games` URL to the new location at `/services/water-games`
- **app/dripping-in-confidence/page.tsx**: Redirects from legacy `/dripping-in-confidence` URL to the new location at `/services/dripping-in-confidence`
- **app/gunge/page.tsx**: Redirects from legacy `/gunge` URL to the new location at `/services/gunge`
- **app/sensory-friendly-experiences/page.tsx**: Redirects from legacy `/sensory-friendly-experiences` URL to the new location at `/services/sensory-friendly-experiences`
- **app/do-it-now/page.tsx**: Redirects from legacy `/do-it-now` URL to the new location at `/services/do-it-now`
- **app/americas-250th/page.tsx**: Redirects from legacy `/americas-250th` URL to the new location at `/events/americas-250th`
- **app/americas-250th-anniversary/page.tsx**: Redirects from alternate `/americas-250th-anniversary` URL to the standard location at `/events/americas-250th`
- **app/holiday-events/page.tsx**: Redirects from legacy `/holiday-events` URL to the new location at `/events/holiday-events`
- **app/fundraisers/page.tsx**: Redirects from legacy `/fundraisers` URL to the new location at `/events/fundraisers`

## Reports

- **reports/content-inventory.md**: Detailed inventory of content files from the legacy site
- **reports/data-structure-analysis.md**: Analysis of JSON data structures
- **reports/data-standardization-report.md**: Report on data standardization process and results
- **reports/site-structure-analysis.md**: Analysis of the website's navigation structure and proposed URL structure for the Next.js implementation
- **reports/service-migration-report.md**: Documentation of the migration of service pages to standardized structure
- **reports/blog-system-report.md**: Comprehensive documentation of the blog system implementation, including architecture, data management, and UI components

## Content Model

### Content Types

We have identified the following content types in the legacy website:

- **Home** (1 file): The website homepage
- **Page** (1 file): Generic content pages
- **Service** (10 files): Services offered (laser shows, foam parties, etc.)
- **Event** (3 files): Event-specific pages
- **Blog Post** (6 files): Individual blog articles
- **Blog Category** (20 files): Blog category pages
- **Legal** (2 files): Legal pages (privacy policy, terms)
- **Utility** (3 files): Utility pages (sitemap, etc.)
- **Team** (2 files): Team-related pages
- **Contact** (1 file): Contact page
- **About** (1 file): About page

### Standardized Content Model

All content has been standardized with:

- Consistent section structure
- Featured image identification
- Content type classification
- Parent/child relationships

### Implemented Pages by Type

#### Event Pages
All event pages now use the **EventContent** component, which includes:
- Event details section with date, location, and pricing information
- Highlights section for bullet points and features
- Call-to-action for contacting or registration
- Optional media galleries

The following event pages have been implemented:
- America's 250th Anniversary (at `/events/americas-250th`)
- Holiday Events (at `/events/holiday-events`)
- Fundraisers (at `/events/fundraisers`)
- Legacy redirects for alternate URLs

#### Service Pages
All service pages now use the **ServiceContent** component, which includes:
- Service description and overview
- Benefits section with formatted cards and icons
- Features section with clean layout for highlighting capabilities
- Pricing information when applicable
- Call-to-action for inquiries or booking
- Optional media galleries and testimonials
- Support for both explicit benefits/features arrays and section extraction

The following service pages have been implemented:
- Laser Light Shows
- Neon Nights
- Foam Parties
- Water Games
- Light Design
- Dripping in Confidence
- Gunge
- Sensory Friendly Experiences
- Do It Now
- Sound Production
- Lighting Design
- Video Production
- Event Management
- Equipment Rental

#### Index Pages
- **Events Index Page**: A listing page that showcases all available event services with cards and CTAs
- **Services Index Page**: A comprehensive listing of all professional services offered with detailed descriptions and testimonials

### Navigation Structure

The site navigation has been implemented with the following components:

#### Header
- **app/components/layout/Header.tsx**: Responsive header with:
  - Logo and site name
  - Desktop navigation with dropdown menus
  - Mobile menu toggle and responsive mobile navigation
  - Active state highlighting for current page
  - Scroll-based styling for transparent to solid background
  - Links to main sections: Home, Services, Events, Gallery, Blog, About, Contact

#### Footer
- **app/components/layout/Footer.tsx**: Comprehensive footer with:
  - Site logo and tagline
  - Social media links
  - Organized site links by category (Services, Events, Company)
  - Blog link under the Company section
  - Contact information
  - Legal links and copyright notice
  - Utility links including Privacy Policy, Terms of Service, and Sitemap

#### Breadcrumb Navigation
- **app/components/layout/Breadcrumb.tsx**: Context-aware breadcrumb navigation with:
  - Dynamically generated path segments based on current URL
  - User-friendly display names for path segments
  - Interactive links to parent pages
  - Integrated into the main layout for consistent display across pages

#### Utility Pages
- **app/sitemap/page.tsx**: Complete sitemap organized by category (Main Pages, Services, Events, Blog, Legal)
  - Accessible via the Footer's Legal section
- **app/gallery/page.tsx**: Portfolio showcase with filterable project gallery
  - Accessible via the main navigation menu and Footer's Company section

### Blog System

- **app/blog/page.tsx**: Blog index page with filtering, categories, and pagination (client component)
- **app/blog/metadata.ts**: Metadata for the blog index page
- **app/blog/[slug]/page.tsx**: Individual blog post template with standardized content support and dynamic metadata generation
- **app/components/content/BlogContent.tsx**: Enhanced component that handles both standardized and legacy content formats
- **app/blog/categories/[category]/page.tsx**: Dynamic blog category page showing posts filtered by category
- **app/lib/blog-types.ts**: TypeScript interfaces for blog post and category data
- **app/lib/blog-data.ts**: Utilities for fetching and processing blog content data

#### Blog Pages
The blog system uses a combination of components and pages with consistent emerald-themed styling:
- **Blog Index**: Main listing page with filtering and pagination
  - Grid-based post layout with featured images
  - Category filtering via sidebar and tag buttons
  - Search functionality for finding specific content
  - Pagination for managing large numbers of posts
  - Newsletter signup section
  - Emerald gradients and enhanced card styling
- **Blog Post Template**: Dynamic template for individual articles
  - Support for both standardized and legacy content structures
  - Author information with optional profile image
  - Post metadata (date, category, tags)
  - Featured image display with standardized Resource format
  - Section-based content rendering with media integration
  - Related posts section with automatic content suggestions
  - Social sharing functionality
  - Responsive design with improved mobile layout
  - Interactive elements with subtle hover animations
- **Category Pages**: Dynamic pages for category filtering with responsive grid layout
  - Category-specific header with description
  - Filtered post display
  - Links to other categories
  - Empty state handling when no posts exist
  - Consistent emerald theming with index and post pages

#### Blog Content Structure
Blog posts follow a standardized data structure that includes:
- **Core Metadata**: id, title, excerpt, date, author, category, and slug
- **Content**: HTML content with properly formatted sections
- **StandardizedContentData Interface**: Consistent structure matching other content types
  - Standardized sections with title, content, and media
  - Featured image as a Resource with url, alt, width, and height
  - Content type classification
- **Taxonomy**: Categories and tags for organization and filtering
- **Relations**: Related posts for content discovery
- **Author Data**: Author information with optional bio and profile image

#### Blog Utilities
The system includes several utility functions for:
- **Content Management**: Loading and parsing blog post JSON files
- **Dynamic Routing**: Generating static and dynamic routes for posts and categories
- **Data Processing**: Category extraction and post organization
- **Content Enhancement**: Automatic excerpt generation and tag management
- **Related Content**: Algorithms for finding related posts by category or explicit relation

### Legal Pages

All legal pages follow a consistent design and include:
- Clear section headings and organization
- Readable typography with proper spacing
- Links between related legal documents
- Contact information for legal inquiries

The following legal pages have been implemented:
- **Legal Landing Page**: Central hub with links to all legal documents
- **Privacy Policy**: Detailed information on data collection and usage
- **Terms of Service**: Rules and conditions for website and service use

### Animation Components

- **app/components/animations/PageTransition.tsx**: Animation components using framer-motion:
  - `PageTransition`: Main wrapper for smooth page transitions
  - `SectionEntrance`: Animation for sections as they enter the viewport
  - `FadeIn`: Simple opacity animation for elements
  - `ScaleIn`: Scale animation for elements
  - `HoverScale`: Hover effects for interactive elements
- **app/components/animations/ScrollToTop.tsx**: Animated button that appears when scrolling down:
  - Uses Framer Motion for smooth animations and transitions
  - Customizable positioning, color, and size
  - Appears when user scrolls past a configurable threshold
  - Smooth scroll-to-top functionality
  - Fully responsive with adaptive sizing
- **app/components/animations/LoadingSpinner.tsx**: Versatile loading indicator:
  - Multiple spinner types (circle, dots, pulse)
  - Configurable sizes (sm, md, lg)
  - Customizable colors
  - Optional loading text
  - Uses Framer Motion for smooth animations

### Utility Libraries

- **app/lib/data.ts**: Core data types and interfaces
- **app/lib/data-standardization.ts**: Functions for standardizing content across different formats
- **app/lib/blog-data.ts**: Blog post data fetching and processing
- **app/lib/route-mapping.ts**: URL route generation and mapping
- **app/lib/link-utils.tsx**: Smart links and rich content components
- **app/lib/site-structure.js**: Site structure utilities for navigation
- **app/lib/benefits-features.ts**: Interfaces for benefits and features components
- **app/lib/image-utils.ts**: Image path handling utilities:
  - Path extension correction (.jpg to .svg)
  - Fallback image handling
  - Error handling for missing images

### API Routes

- **app/api/contact/route.ts**: API endpoint for contact form submissions:
  - Server-side validation
  - Error handling
  - Success response
- **app/api/inquiry/route.ts**: API endpoint for event inquiries:
  - Complex validation for event details
  - Date validation
  - Success response
