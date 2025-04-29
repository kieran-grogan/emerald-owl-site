/**
 * Interface for a blog post
 */
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
  content: string;
}

/**
 * Interface for a blog category
 */
export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}

/**
 * Interface for pagination metadata
 */
export interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Interface for paginated blog posts response
 */
export interface PaginatedBlogPosts {
  posts: BlogPost[];
  pagination: PaginationMetadata;
} 