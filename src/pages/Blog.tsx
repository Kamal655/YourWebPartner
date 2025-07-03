
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, User, ArrowRight, Tag, TrendingUp } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Web Design Trends for 2025",
      excerpt: "Stay ahead of the curve with these cutting-edge design trends that will dominate the web in 2025. From AI-powered interfaces to sustainable design practices.",
      author: "YourWebPartner Team",
      date: "June 10, 2025",
      readTime: "5 min read",
      category: "Design",
      image: "/placeholder.svg",
      featured: true
    },
    {
      id: 2,
      title: "Why Every Small Business Needs a Professional Website",
      excerpt: "Discover how a professional website can transform your small business, increase credibility, and drive more customers to your door.",
      author: "YourWebPartner Team",
      date: "June 8, 2025",
      readTime: "7 min read",
      category: "Business",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 3,
      title: "Complete Guide to Website SEO for Beginners",
      excerpt: "Learn the fundamentals of SEO and how to optimize your website to rank higher in search engines and attract more organic traffic.",
      author: "YourWebPartner Team",
      date: "June 5, 2025",
      readTime: "10 min read",
      category: "SEO",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 4,
      title: "Mobile-First Design: Why It Matters More Than Ever",
      excerpt: "With mobile traffic surpassing desktop, learn why mobile-first design is crucial for your website's success and user experience.",
      author: "YourWebPartner Team",
      date: "June 3, 2025",
      readTime: "6 min read",
      category: "Development",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 5,
      title: "E-commerce Website Essentials: From Setup to Success",
      excerpt: "Everything you need to know about creating a successful e-commerce website, from choosing the right platform to optimizing for conversions.",
      author: "YourWebPartner Team",
      date: "May 30, 2025",
      readTime: "12 min read",
      category: "E-commerce",
      image: "/placeholder.svg",
      featured: false
    },
    {
      id: 6,
      title: "Website Speed Optimization: Boost Your Performance",
      excerpt: "Learn proven techniques to make your website lightning fast, improve user experience, and boost your search engine rankings.",
      author: "YourWebPartner Team",
      date: "May 28, 2025",
      readTime: "8 min read",
      category: "Performance",
      image: "/placeholder.svg",
      featured: false
    }
  ];

  const categories = [
    { name: "All Posts", count: 6 },
    { name: "Design", count: 1 },
    { name: "Business", count: 1 },
    { name: "SEO", count: 1 },
    { name: "Development", count: 1 },
    { name: "E-commerce", count: 1 },
    { name: "Performance", count: 1 }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Web Development <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, tips, and trends in web development, design, and digital marketing to help your business succeed online.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              
              {/* Categories */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <button className="flex items-center justify-between w-full text-left px-3 py-2 rounded hover:bg-purple-100 transition-colors duration-200">
                        <span className="text-gray-700">{category.name}</span>
                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-lg text-white">
                <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get the latest web development tips and trends delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 rounded text-gray-900 placeholder-gray-500"
                  />
                  <button className="w-full bg-white text-purple-600 py-2 rounded font-semibold hover:shadow-lg transition-all duration-300">
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Popular Posts */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Popular Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <div key={index} className="pb-4 border-b border-gray-200 last:border-b-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      Featured Post
                    </span>
                  </div>
                  <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-lg opacity-90 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center space-x-4 text-sm opacity-80 mb-6">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>
                    <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {regularPosts.map((post) => (
                <article key={post.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <button className="text-purple-600 font-semibold hover:text-purple-800 transition-colors duration-200 flex items-center space-x-1 group">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Load More Posts
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
