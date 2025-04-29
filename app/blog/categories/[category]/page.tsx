import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPosts, getBlogCategories, BlogCategory } from '@/app/lib/blog-data';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  // Convert category slug back to display name format
  const categorySlug = params.category;
  const categories = getBlogCategories();
  
  // Find the matching category (case insensitive)
  const category = categories.find(
    cat => cat.slug === categorySlug
  );
  
  if (!category) {
    return {
      title: 'Category Not Found | Emerald Owl Productions',
      description: 'The requested blog category could not be found.'
    };
  }
  
  return {
    title: `${category.name} Articles | Emerald Owl Productions Blog`,
    description: `Browse our collection of articles about ${category.name}, insights, and industry expertise.`
  };
}

export async function generateStaticParams() {
  const categories = getBlogCategories();
  
  return categories.map(category => ({
    category: category.slug
  }));
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categorySlug = params.category;
  const allCategories = getBlogCategories();
  
  // Find the matching category (case insensitive)
  const category = allCategories.find(
    cat => cat.slug === categorySlug
  );
  
  if (!category) {
    notFound();
  }
  
  // Get posts for this category
  const allPosts = getBlogPosts();
  const categoryPosts = allPosts.filter(
    post => post.category === category.name
  );
  
  if (categoryPosts.length === 0) {
    // No posts in this category
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-800">{category.name}</h1>
            <p className="text-lg text-gray-600 mb-8">
              We don't have any articles in this category yet. Check back soon!
            </p>
            <Link 
              href="/blog" 
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md transition-colors"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Category header */}
          <div className="mb-12 text-center">
            <Link 
              href="/blog" 
              className="inline-block mb-4 text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              ← Back to All Articles
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-emerald-800">{category.name} Articles</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our collection of articles about {category.name}, insights, and industry expertise.
            </p>
          </div>
          
          {/* Category posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map(post => (
              <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || '/placeholder.svg'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-sm text-emerald-600">{post.category}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 hover:text-emerald-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center">
                    {post.author_image ? (
                      <Image 
                        src={post.author_image} 
                        alt={post.author} 
                        width={32} 
                        height={32} 
                        className="rounded-full mr-3"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-emerald-700 font-medium">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                    )}
                    <span className="text-sm text-gray-700">{post.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* All categories */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-emerald-800">All Categories</h2>
            <div className="flex flex-wrap gap-3">
              {allCategories.map(cat => (
                <Link 
                  key={cat.slug}
                  href={`/blog/categories/${cat.slug}`} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    cat.slug === categorySlug 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-emerald-100 hover:text-emerald-800'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 