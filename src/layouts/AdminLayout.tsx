
import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, ExternalLink, BarChart3, Briefcase, Users, MessageSquare, Ticket } from 'lucide-react';
// ...
const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: FileText, label: 'Blog Posts', path: '/admin/posts' },
        { icon: BarChart3, label: 'Stats Manager', path: '/admin/stats' }, // Statistics
        { icon: Briefcase, label: 'Projects', path: '/admin/projects' }, // Projects
        { icon: Ticket, label: 'Promo Codes', path: '/admin/promos' }, // NEW
        { icon: Settings, label: 'Testimonials', path: '/admin/testimonials' }, // New
        { icon: MessageSquare, label: 'Inbox', path: '/admin/inbox' }, // Contact Form
        { icon: Users, label: 'Subscribers', path: '/admin/subscribers' }, // Newsletter
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar - Desktop */}
            <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl hidden md:flex flex-col fixed inset-y-0 left-0 z-50">
                <div className="p-6 border-b border-white/10">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
                            YW
                        </div>
                        <span className="font-bold text-lg group-hover:text-purple-400 transition-colors">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                            <ExternalLink className="w-5 h-5" />
                            <span className="font-medium">View Live Site</span>
                        </a>
                    </div>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 bg-black min-h-screen">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
