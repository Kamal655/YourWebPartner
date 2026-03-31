import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Save, Star, Loader2, Undo } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    rating: number;
    image: string;
}

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // New/Edit State
    const [editingId, setEditingId] = useState<number | 'new' | null>(null);
    const [formData, setFormData] = useState<Partial<Testimonial>>({});

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (error) throw error;
            // Map DB fields back to form fields
            const mapped = (data || []).map((t) => {
                const [role, company] = (t.role || '').split(' @ ');
                return {
                    ...t,
                    role: role || t.role,
                    company: company || '',
                    image: t.image_url // Map image_url to image
                };
            });
            setTestimonials(mapped);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            toast({
                title: "Error",
                description: "Failed to load testimonials.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (t: Testimonial) => {
        setEditingId(t.id);
        setFormData(t);
    };

    const handleCreate = () => {
        setEditingId('new');
        setFormData({
            name: '',
            role: '',
            company: '',
            content: '',
            rating: 5,
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=150&q=80'
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({});
    };

    const handleSave = async () => {
        try {
            if (!formData.name || !formData.content) {
                toast({ title: "Validation Error", description: "Name and Content are required.", variant: "destructive" });
                return;
            }

            const payload = {
                name: formData.name,
                role: `${formData.role || ''} @ ${formData.company || ''}`, // Combine role and company
                content: formData.content,
                rating: formData.rating,
                image_url: formData.image // Map image to image_url
            };

            if (editingId === 'new') {
                const { error } = await supabase.from('testimonials').insert([payload]);
                if (error) throw error;
                toast({ title: "Success", description: "Testimonial created!" });
            } else {
                const { error } = await supabase
                    .from('testimonials')
                    .update(payload)
                    .eq('id', editingId);
                if (error) throw error;
                toast({ title: "Success", description: "Testimonial updated!" });
            }

            setEditingId(null);
            fetchTestimonials();

        } catch (error) {
            console.error('Error saving testimonial:', error);
            toast({ title: "Error", description: "Failed to save.", variant: "destructive" });
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const { error } = await supabase.from('testimonials').delete().eq('id', id);
            if (error) throw error;
            toast({ title: "Deleted", description: "Testimonial removed." });
            fetchTestimonials();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Testimonials Manager
                    </h2>
                    <p className="text-gray-400">Manage client reviews and feedback.</p>
                </div>
                {!editingId && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Testimonial
                    </button>
                )}
            </div>

            {(editingId) ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 max-w-2xl">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Client Name</label>
                            <input
                                className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                value={formData.name || ''}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Role / Position</label>
                            <input
                                className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                value={formData.role || ''}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Company</label>
                            <input
                                className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                value={formData.company || ''}
                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Rating (1-5)</label>
                            <select
                                className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                                value={formData.rating || 5}
                                onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                            >
                                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Avatar Image URL</label>
                        <input
                            className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"
                            value={formData.image || ''}
                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-400 mb-1">Content / Review</label>
                        <textarea
                            className="w-full bg-black/50 border border-white/10 rounded p-2 text-white h-32"
                            value={formData.content || ''}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    <div className="flex gap-2 justify-end pt-4">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2"
                        >
                            <Undo className="w-4 h-4" /> Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Save Testimonial
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 group hover:border-purple-500/30 transition-all">
                            <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-white">{t.name}</h3>
                                        <p className="text-sm text-purple-400">{t.role} @ {t.company}</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(t)} className="p-1.5 hover:bg-blue-500/20 rounded text-blue-400"><Save className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(t.id)} className="p-1.5 hover:bg-red-500/20 rounded text-red-400"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 my-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-300 line-clamp-2">"{t.content}"</p>
                            </div>
                        </div>
                    ))}
                    {testimonials.length === 0 && (
                        <div className="col-span-2 text-center py-20 text-gray-500 italic">No testimonials found. Create one!</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestimonialsManager;
