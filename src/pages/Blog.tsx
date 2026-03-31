
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Tag, TrendingUp, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Define the Post interface matching our Supabase table
interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string; // mapped from published_date
  readTime: string; // mapped from read_time
  category: string;
  image: string; // mapped from image_url
  featured: boolean;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;

      if (data) {
        // Transform the data to match our component interface
        const transformedPosts: Post[] = data.map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          author: post.author || 'YourWebPartner Team',
          date: new Date(post.published_date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          }),
          readTime: post.read_time || '5 min read',
          category: post.category,
          image: post.image_url || 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          featured: post.featured
        }));
        setPosts(transformedPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error loading blog posts",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: "All Posts", count: posts.length },
    { name: "Design", count: posts.filter(p => p.category === 'Design').length },
    { name: "Business", count: posts.filter(p => p.category === 'Business').length },
    { name: "SEO", count: posts.filter(p => p.category === 'SEO').length },
    { name: "Development", count: posts.filter(p => p.category === 'Development').length },
    { name: "E-commerce", count: posts.filter(p => p.category === 'E-commerce').length },
    { name: "Performance", count: posts.filter(p => p.category === 'Performance').length }
  ];

  const featuredPost = posts.find(post => post.featured);
  // If there's a featured post, filter it out from the grid, otherwise show all
  const regularPosts = featuredPost
    ? posts.filter(post => post.id !== featuredPost.id)
    : posts;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
      <Header />

      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black via-gray-900/50 to-black pointer-events-none -z-10"></div>

      <div className="pt-32 pb-16 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-gray-300">Latest Insights</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Web Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Blog</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Expert insights, detailed tutorials, and the latest trends in web development, design, and digital growth.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-10">

          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24 space-y-8">

              {/* Categories */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center">
                  <Tag className="w-5 h-5 mr-3 text-purple-400" />
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    // Only show categories that have posts or "All Posts"
                    (category.count > 0 || category.name === "All Posts") && (
                      <li key={index}>
                        <button className="flex items-center justify-between w-full text-left px-4 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                          <span className="text-gray-400 group-hover:text-white transition-colors">{category.name}</span>
                          <span className="text-xs text-gray-500 bg-black/40 px-2 py-1 rounded-full border border-white/5 group-hover:border-white/20 transition-colors">
                            {category.count}
                          </span>
                        </button>
                      </li>
                    )
                  ))}
                </ul>
              </div>

              {/* Newsletter Signup and Popular Posts remains unchanged... */}
              <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-lg font-bold text-white">Stay Updated</h3>
                  </div>
                  <p className="text-sm text-gray-300 mb-5">
                    Get the latest tips delivered directly to your inbox. No spam, ever.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                    />
                    <button className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Popular Posts - Using the fetched posts for now */}
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-white mb-5 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-3 text-blue-400" />
                  Popular
                </h3>
                <div className="space-y-5">
                  {loading ? (
                    <p className="text-sm text-gray-500">Loading popular...</p>
                  ) : (
                    posts.slice(0, 3).map((post, index) => (
                      <div key={index} className="group cursor-pointer">
                        <h4 className="text-sm font-medium text-gray-300 mb-1 group-hover:text-white transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">

            {loading ? (
              // Loading Skeleton
              <div className="space-y-8 animate-pulse">
                <div className="h-[400px] bg-white/5 rounded-3xl border border-white/10"></div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-[400px] bg-white/5 rounded-3xl border border-white/10"></div>
                  <div className="h-[400px] bg-white/5 rounded-3xl border border-white/10"></div>
                </div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-2">No Posts Yet</h3>
                <p className="text-gray-400">Check back soon for new articles!</p>
              </div>
            ) : (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <div className="mb-12 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute top-6 left-6 z-20">
                        <span className="bg-purple-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                          Featured Post
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                        <div className="max-w-3xl">
                          <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
                            <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10">{featuredPost.category}</span>
                            <span>{featuredPost.date}</span>
                            <span>•</span>
                            <span>{featuredPost.readTime}</span>
                          </div>
                          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-lg text-gray-300 mb-6 line-clamp-2">
                            {featuredPost.excerpt}
                          </p>
                          <button className="flex items-center gap-2 text-white font-bold group/btn">
                            Read Full Article
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Blog Posts Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                  {regularPosts.map((post) => (
                    <article key={post.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col h-full">
                      <div className="aspect-video bg-gray-900 relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-black/60 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed text-sm line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white">
                              YW
                            </div>
                            <span className="text-xs text-gray-400">{post.author}</span>
                          </div>
                          <button className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors flex items-center gap-1 group/read">
                            Read
                            <ArrowRight className="w-3 h-3 group-hover/read:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}

            {/* Load More Button */}
            {!loading && posts.length > 6 && (
              <div className="text-center mt-16">
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Load More Articles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
