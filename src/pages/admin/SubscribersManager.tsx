import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Calendar, Trash2, Search, Users, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Subscriber {
    id: number;
    email: string;
    subscribed_at: string;
}

const SubscribersManager = () => {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const { data, error } = await supabase
                .from('subscribers')
                .select('*')
                .order('subscribed_at', { ascending: false });

            if (error) throw error;
            setSubscribers(data || []);
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            toast({
                title: "Error",
                description: "Failed to load subscribers",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to remove this subscriber?')) return;

        try {
            const { error } = await supabase
                .from('subscribers')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setSubscribers(subscribers.filter(s => s.id !== id));
            toast({ title: "Success", description: "Subscriber removed" });
        } catch (error) {
            console.error('Error deleting subscriber:', error);
            toast({
                title: "Error",
                description: "Failed to remove subscriber",
                variant: "destructive"
            });
        }
    };

    const exportCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "Email,Date Subscribed\n"
            + subscribers.map(s => `${s.email},${new Date(s.subscribed_at).toISOString()}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "subscribers_list.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredSubscribers = subscribers.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 text-white space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent flex items-center gap-2">
                        <Users className="w-8 h-8 text-green-400" />
                        Subscribers
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">Total: {subscribers.length} active subscribers</p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search emails..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:border-green-500 outline-none transition-colors"
                        />
                    </div>
                    <button
                        onClick={exportCSV}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
                        title="Export CSV"
                    >
                        <Download className="w-5 h-5 text-gray-300" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading list...</div>
            ) : filteredSubscribers.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Subscribers Found</h3>
                    <p className="text-gray-400">Your list is empty.</p>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-black/20 text-gray-400 text-sm">
                            <tr>
                                <th className="p-4 font-medium">Email Address</th>
                                <th className="p-4 font-medium">Subscribed Date</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredSubscribers.map((sub) => (
                                <tr key={sub.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-green-400" />
                                            </div>
                                            <span className="font-medium text-gray-200">{sub.email}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {format(new Date(sub.subscribed_at), 'PPP')}
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(sub.id)}
                                            className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2"
                                            title="Remove Subscriber"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default SubscribersManager;
