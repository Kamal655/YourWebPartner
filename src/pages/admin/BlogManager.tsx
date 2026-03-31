
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Eye, Search, Loader2, Save, X } from 'lucide-react';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    image_url: string;
    published_date: string;
    featured: boolean;
}

const BlogManager = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Design',
        image_url: '',
        featured: false
    });

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

            const mappedPosts: Post[] = (data || []).map((post: any) => ({
                id: post.id,
                title: post.title || '',
                slug: post.slug || '',
                excerpt: post.excerpt || '',
                content: post.content || '',
                category: post.category || 'Uncategorized',
                image_url: post.image_url || '',
                published_date: post.published_date || new Date().toISOString(),
                featured: post.featured || false
            }));

            setPosts(mappedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast({
                title: "Error",
                description: "Could not load posts.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            const { error } = await supabase.from('posts').delete().eq('id', id);
            if (error) throw error;

            setPosts(posts.filter(post => post.id !== id));
            toast({ title: "Success", description: "Post deleted successfully." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete post.", variant: "destructive" });
        }
    };

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            image_url: post.image_url || '',
            featured: post.featured
        });
        setIsModalOpen(true);
    };

    const handleCreateNew = () => {
        setEditingPost(null);
        setFormData({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            category: 'Design',
            image_url: '',
            featured: false
        });
        setIsModalOpen(true);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const postData = {
                ...formData,
                slug: formData.slug || generateSlug(formData.title),
                published_date: new Date().toISOString(), // Update date on edit? Maybe specific field later.
            };

            if (editingPost) {
                // Update
                const { error } = await supabase
                    .from('posts')
                    .update(postData)
                    .eq('id', editingPost.id);

                if (error) throw error;
                toast({ title: "Success", description: "Post updated successfully." });
            } else {
                // Create
                const { error } = await supabase
                    .from('posts')
                    .insert([postData]);

                if (error) throw error;
                toast({ title: "Success", description: "New post created successfully." });
            }

            setIsModalOpen(false);
            fetchPosts();
        } catch (error: any) {
            console.error("Save error:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to save post.",
                variant: "destructive"
            });
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
                    <p className="text-gray-400">Manage your articles and content.</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                    <Plus className="w-5 h-5" />
                    Create New Post
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search posts..."
                    className="bg-transparent border-none focus:outline-none text-white w-full placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Posts Table */}
            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-gray-400">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                        Loading posts...
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        No posts found. Create one to get started!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-300 text-sm uppercase">
                                <tr>
                                    <th className="p-6 font-medium">Title</th>
                                    <th className="p-6 font-medium">Category</th>
                                    <th className="p-6 font-medium">Date</th>
                                    <th className="p-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredPosts.map((post) => (
                                    <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-6">
                                            <div className="font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{post.title}</div>
                                            <div className="text-xs text-gray-500">{post.slug}</div>
                                        </td>
                                        <td className="p-6">
                                            <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs border border-white/10">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="p-6 text-gray-400 text-sm">
                                            {new Date(post.published_date).toLocaleDateString()}
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors" title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors" title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit/Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6 flex items-center justify-between z-10">
                            <h2 className="text-2xl font-bold text-white">
                                {editingPost ? 'Edit Post' : 'Create New Post'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Title</label>
                                    <input
                                        required
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 transition-colors"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Slug (URL)</label>
                                    <input
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-gray-400 focus:border-purple-500 transition-colors"
                                        placeholder="Auto-generated if empty"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Category</label>
                                    <select
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 transition-colors"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Design">Design</option>
                                        <option value="Development">Development</option>
                                        <option value="Business">Business</option>
                                        <option value="SEO">SEO</option>
                                        <option value="E-commerce">E-commerce</option>
                                        <option value="Performance">Performance</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Image URL</label>
                                    <input
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 transition-colors"
                                        placeholder="https://..."
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Excerpt (Short Summary)</label>
                                <textarea
                                    required
                                    rows={3}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 transition-colors"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Full Content (HTML Supported)</label>
                                <textarea
                                    required
                                    rows={10}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 transition-colors font-mono text-sm"
                                    placeholder="<p>Write your article content here...</p>"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                                <p className="text-xs text-gray-500">HTML tags are supported for formatting.</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-black/50"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                />
                                <label htmlFor="featured" className="text-white font-medium">Featured Post (Shows at top)</label>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 rounded-xl text-gray-400 hover:text-white font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-purple-900/20"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogManager;
