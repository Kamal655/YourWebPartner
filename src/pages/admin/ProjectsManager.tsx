import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Save, X, Image as ImageIcon, ExternalLink, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Project {
    id: number;
    title: string;
    category: string;
    image_url: string;
    description: string;
    tech: string[];
    client: string;
    duration: string;
    year: string;
    color: string;
    link: string;
}

const ProjectsManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({
        tech: [],
        color: 'blue'
    });
    const { toast } = useToast();

    const DEFAULT_PROJECTS = [
        { title: 'LuxeFashion Global', category: 'E-Commerce', image_url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Premium fashion marketplace with AI-driven style recommendations and AR virtual try-on.', tech: ['Next.js', 'Shopify Plus', 'TensorFlow.js'], client: 'Luxe Brands Ltd', duration: '5 months', year: '2024', color: 'pink' },
        { title: 'UrbanPicks Store', category: 'E-Commerce', image_url: 'https://images.unsplash.com/photo-1472851294608-415522f97817?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Multi-vendor marketplace for streetwear enthusiasts with real-time auction functionality.', tech: ['React', 'Node.js', 'Socket.io'], client: 'Urban Retail', duration: '4 months', year: '2024', color: 'blue' },
        { title: 'EcoGrocery Direct', category: 'E-Commerce', image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Sustainable grocery delivery app with route optimization and carbon footprint tracking.', tech: ['Vue.js', 'Firebase', 'Google Maps API'], client: 'Green Earth', duration: '3 months', year: '2023', color: 'green' },
        { title: 'TechGear Pro', category: 'E-Commerce', image_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'B2B electronics component sourcing platform with bulk ordering and ERP integration.', tech: ['Angular', '.NET Core', 'Azure'], client: 'TG Industries', duration: '6 months', year: '2023', color: 'blue' },
        { title: 'Skyline Realty', category: 'Real Estate', image_url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Luxury property portal featuring 360-degree virtual tours and mortgage calculators.', tech: ['React', 'Matterport API', 'AWS'], client: 'Skyline Group', duration: '4 months', year: '2024', color: 'purple' },
        { title: 'UrbanNest Rentals', category: 'Real Estate', image_url: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Short-term rental platform for digital nomads with automated booking management.', tech: ['Next.js', 'Supabase', 'Stripe Connect'], client: 'UrbanNest', duration: '3 months', year: '2024', color: 'orange' },
        { title: 'Commercial Hub', category: 'Real Estate', image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Investment analysis tool for commercial real estate portfolios.', tech: ['Python', 'Django', 'D3.js'], client: 'Hub Invest', duration: '5 months', year: '2023', color: 'gray' },
        { title: 'NovaBank Mobile', category: 'Fintech', image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Neobank mobile application interface with spending analytics and goal tracking.', tech: ['React Native', 'Node.js', 'Plaid'], client: 'Nova Financial', duration: '6 months', year: '2024', color: 'emerald' },
        { title: 'CryptoVault', category: 'Fintech', image_url: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Secure non-custodial wallet dashboard for managing multi-chain assets.', tech: ['Web3.js', 'Solidity', 'Rust'], client: 'BlockSecure', duration: '4 months', year: '2024', color: 'indigo' },
        { title: 'InsureTech Dash', category: 'Fintech', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'AI-powered claim processing dashboard for insurance agents.', tech: ['Vue.js', 'Python ML', 'PostgreSQL'], client: 'InsureOne', duration: '5 months', 'year': '2023', color: 'cyan' },
        { title: 'VitalCheck Teleheatlh', category: 'Healthcare', image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'HIPAA-compliant telemedicine platform connecting patients with specialists worldwide.', tech: ['WebRTC', 'React', 'Node.js'], client: 'Vital Health', duration: '7 months', year: '2024', color: 'red' },
        { title: 'Mindful Space', category: 'Healthcare', image_url: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Meditation and wellness app with personalized daily routines and mood tracking.', tech: ['Flutter', 'Firebase', 'Sanity CMS'], client: 'Mindful Corp', duration: '3 months', year: '2023', color: 'teal' },
        { title: 'PharmaSupply B2B', category: 'Healthcare', image_url: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Supply chain management system for pharmaceutical distributors.', tech: ['Java', 'Spring Boot', 'React'], client: 'PharmaLink', duration: '8 months', year: '2023', color: 'blue' },
        { title: 'Wanderlust Travels', category: 'Travel', image_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Immersive travel booking platform with customized itinerary planning features.', tech: ['Next.js', 'Mapbox', 'Amadeus API'], client: 'Wanderlust Inc', duration: '4 months', year: '2024', color: 'orange' },
        { title: 'DineEasy Reserve', category: 'Travel', image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Restaurant table reservation system with dynamic floor plan management.', tech: ['Vue.js', 'Laravel', 'Twilio'], client: 'Dine Group', duration: '3 months', year: '2024', color: 'red' },
        { title: 'Hotelier Pro', category: 'Travel', image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Property management system for independent boutique hotels.', tech: ['React', 'Go', 'PostgreSQL'], client: 'Hotelier Systems', duration: '6 months', year: '2023', color: 'purple' },
        { title: 'LearnWave Academy', category: 'Education', image_url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Interactive learning management system with video courses and live quizzes.', tech: ['MERN Stack', 'AWS S3', 'Vimeo API'], client: 'LearnWave', duration: '5 months', year: '2024', color: 'yellow' },
        { title: 'KidCode Jr', category: 'Education', image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Gamified coding platform for children ages 6-12.', tech: ['React', 'Phaser.js', 'Node.js'], client: 'KidCode', duration: '4 months', year: '2023', color: 'green' },
        { title: 'UniConnect', category: 'Education', image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Networking and mentorship portal for university alumni and students.', tech: ['Django', 'PostgreSQL', 'Redis'], client: 'Global University', duration: '3 months', year: '2023', color: 'blue' },
        { title: 'InnovateTech Corp', category: 'Corporate', image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'High-performance corporate website with investor relations portal.', tech: ['Next.js', 'Strapi', 'Vercel'], client: 'InnovateTech', duration: '2 months', year: '2024', color: 'indigo' },
        { title: 'LogiStream CMS', category: 'Corporate', image_url: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Internal content management system for global logistics documentation.', tech: ['Angular', 'SharePoint', 'Azure'], client: 'Logi Worldwide', duration: '5 months', year: '2024', color: 'blue' },
        { title: 'LegalFlow Pro', category: 'Corporate', image_url: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Case management software for mid-sized law firms.', tech: ['React', '.NET', 'SQL Server'], client: 'Legal Partners', duration: '6 months', year: '2023', color: 'slate' },
        { title: 'HR Pulse', category: 'Corporate', image_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Employee engagement and performance review platform.', tech: ['Vue.js', 'Ruby on Rails', 'PostgreSQL'], client: 'PeopleFirst', duration: '4 months', year: '2023', color: 'rose' },
        { title: 'Studio Noir Portfolio', category: 'Creative', image_url: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Minimalist 3D portfolio for an award-winning design agency.', tech: ['Three.js', 'React', 'WebGL'], client: 'Studio Noir', duration: '2 months', year: '2024', color: 'black' },
        { title: 'PhotoLens Gallery', category: 'Creative', image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'High-resolution photography archive with smart tagging and licensing.', tech: ['Next.js', 'Cloudinary', 'Stripe'], client: 'Lens Media', duration: '3 months', 'year': '2023', color: 'violet' },
        { title: 'MusicStream App', category: 'Creative', image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Indie music streaming platform for unsigned artists.', tech: ['Flutter Web', 'Firebase', 'FFmpeg'], client: 'IndieSound', duration: '5 months', year: '2024', color: 'purple' },
        { title: 'Bistro Reserve', category: 'Food', image_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Online ordering and table booking system for a restaurant chain.', tech: ['React', 'Express', 'MongoDB'], client: 'Bistro Chain', duration: '3 months', year: '2024', color: 'orange' },
        { title: 'Coffee Culture', category: 'Food', image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Subscription management platform for specialty coffee beans.', tech: ['Shopify Liquid', 'Js', 'Recharge'], client: 'Coffee Culture', duration: '2 months', 'year': '2023', color: 'brown' },
        { title: 'FarmToTable', category: 'Food', image_url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Marketplace connecting local organic farmers directly with consumers.', tech: ['Next.js', 'Stripe', 'PostgreSQL'], client: 'Local Farms', duration: '4 months', year: '2023', color: 'green' },
        { title: 'CleanOcean Initiative', category: 'Non-Profit', image_url: 'https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Donation and awareness platform for ocean conservation efforts.', tech: ['WordPress', 'React', 'Donation API'], client: 'Ocean NGO', 'duration': '2 months', 'year': '2024', color: 'cyan' },
        { title: 'EduForAll', category: 'Non-Profit', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', description: 'Volunteer management system for rural education programs.', tech: ['React', 'Firebase', 'Google Maps'], client: 'Edu Foundation', duration: '3 months', 'year': '2023', color: 'yellow' }
    ];

    const handleSeed = async () => {
        if (!confirm('This will insert 30+ projects. Continue?')) return;
        try {
            const { error } = await supabase.from('projects').insert(DEFAULT_PROJECTS);
            if (error) throw error;
            toast({ title: "Success", description: "All projects seeded successfully!" });
            fetchProjects();
        } catch (error: any) {
            console.error('Seed error:', error);
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects((data || []) as Project[]);
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast({
                title: "Error",
                description: "Failed to load projects",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!currentProject.title || !currentProject.category || !currentProject.image_url) {
            toast({
                title: "Missing fields",
                description: "Please fill in all required fields (Title, Category, Image URL)",
                variant: "destructive"
            });
            return;
        }

        try {
            const projectData = {
                title: currentProject.title,
                category: currentProject.category,
                image_url: currentProject.image_url,
                description: currentProject.description || '',
                tech: currentProject.tech || [],
                client: currentProject.client || '',
                duration: currentProject.duration || '',
                year: currentProject.year || new Date().getFullYear().toString(),
                color: currentProject.color || 'blue',
                link: currentProject.link || ''
            };

            if (currentProject.id) {
                const { error } = await supabase
                    .from('projects')
                    .update(projectData)
                    .eq('id', currentProject.id);
                if (error) throw error;
                toast({ title: "Success", description: "Project updated successfully" });
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([projectData]);
                if (error) throw error;
                toast({ title: "Success", description: "Project created successfully" });
            }

            setIsEditing(false);
            setCurrentProject({ tech: [], color: 'blue' });
            fetchProjects();
        } catch (error: any) {
            console.error('Error saving project:', error);
            toast({
                title: "Error",
                description: error.message || "Failed to save project",
                variant: "destructive"
            });
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);
            if (error) throw error;
            toast({ title: "Success", description: "Project deleted" });
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            toast({
                title: "Error",
                description: "Failed to delete project",
                variant: "destructive"
            });
        }
    };

    const addTech = (tag: string) => {
        if (tag && !currentProject.tech?.includes(tag)) {
            setCurrentProject({
                ...currentProject,
                tech: [...(currentProject.tech || []), tag]
            });
        }
    };

    const removeTech = (tagToRemove: string) => {
        setCurrentProject({
            ...currentProject,
            tech: currentProject.tech?.filter(tag => tag !== tagToRemove)
        });
    };

    return (
        <div className="p-6 text-white space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Projects Manager
                </h2>
                <button
                    onClick={handleSeed}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors mr-2"
                >
                    <Plus className="w-4 h-4" />
                    <span>Seed DB</span>
                </button>
                <button
                    onClick={() => {
                        setCurrentProject({ tech: [], color: 'blue' });
                        setIsEditing(true);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                </button>
            </div>

            {isEditing && (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Project Title *</label>
                            <input
                                type="text"
                                value={currentProject.title || ''}
                                onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-purple-500 outline-none"
                                placeholder="E-commerce Store"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Category *</label>
                            <input
                                type="text"
                                value={currentProject.category || ''}
                                onChange={e => setCurrentProject({ ...currentProject, category: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-purple-500 outline-none"
                                placeholder="Online Retail"
                            />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <label className="text-sm text-gray-400">Description</label>
                            <textarea
                                value={currentProject.description || ''}
                                onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-purple-500 outline-none h-24"
                                placeholder="Project description..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Image URL *</label>
                            <div className="flex gap-2">
                                <ImageIcon className="w-5 h-5 text-gray-400 self-center" />
                                <input
                                    type="text"
                                    value={currentProject.image_url || ''}
                                    onChange={e => setCurrentProject({ ...currentProject, image_url: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-purple-500 outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Project Link</label>
                            <div className="flex gap-2">
                                <ExternalLink className="w-5 h-5 text-gray-400 self-center" />
                                <input
                                    type="text"
                                    value={currentProject.link || ''}
                                    onChange={e => setCurrentProject({ ...currentProject, link: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-purple-500 outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Client</label>
                            <input
                                type="text"
                                value={currentProject.client || ''}
                                onChange={e => setCurrentProject({ ...currentProject, client: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-purple-500 outline-none"
                                placeholder="TechMart"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Tech Stack (Press Enter)</label>
                            <input
                                type="text"
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTech(e.currentTarget.value);
                                        e.currentTarget.value = '';
                                    }
                                }}
                                className="w-full bg-black/20 border border-white/10 rounded-lg p-2 focus:border-purple-500 outline-none"
                                placeholder="React, Node.js..."
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {currentProject.tech?.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs flex items-center gap-1">
                                        {tag}
                                        <button onClick={() => removeTech(tag)}><X className="w-3 h-3 hover:text-white" /></button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400">Duration</label>
                                <input
                                    type="text"
                                    value={currentProject.duration || ''}
                                    onChange={e => setCurrentProject({ ...currentProject, duration: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2"
                                    placeholder="3 months"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Theme Color</label>
                                <select
                                    value={currentProject.color || 'blue'}
                                    onChange={e => setCurrentProject({ ...currentProject, color: e.target.value })}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white"
                                >
                                    <option value="blue">Blue</option>
                                    <option value="purple">Purple</option>
                                    <option value="green">Green</option>
                                    <option value="red">Red</option>
                                    <option value="pink">Pink</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="cyan">Cyan</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t border-white/10">
                        <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            <span>Save Project</span>
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Projects Found</h3>
                    <p className="text-gray-400">Start by adding your first project to the portfolio.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all">
                            <div className="aspect-video overflow-hidden">
                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 bg-${project.color}-500/10 text-${project.color}-400 border border-${project.color}-500/20`}>
                                            {project.category}
                                        </span>
                                        <h3 className="text-lg font-bold">{project.title}</h3>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleDelete(project.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCurrentProject(project);
                                                setIsEditing(true);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {project.tech?.slice(0, 3).map(t => (
                                        <span key={t} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
