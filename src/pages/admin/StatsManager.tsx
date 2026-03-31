import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, RefreshCcw } from 'lucide-react';

interface Stat {
    id: number;
    label: string;
    value: string;
    icon_name: string;
}

const StatsManager = () => {
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { toast } = useToast();

    const fetchStats = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('stats')
                .select('*')
                .order('sort_order', { ascending: true });

            if (error) throw error;
            setStats(data || []);
        } catch (error: any) {
            toast({
                title: 'Error loading stats',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleUpdate = async (id: number, field: keyof Stat, cleanValue: string) => {
        const updatedStats = stats.map(s => s.id === id ? { ...s, [field]: cleanValue } : s);
        setStats(updatedStats);
    };

    const saveChanges = async () => {
        try {
            setSaving(true);

            // Upsert all modified stats


            const updates = stats.map(s => ({
                id: s.id,
                label: s.label,
                value: s.value,
                icon_name: s.icon_name, // Include this to avoid constraint errors if any, though not editing it yet.
            }));

            const { error: upsertError } = await supabase.from('stats').upsert(updates);
            if (upsertError) throw upsertError;

            toast({
                title: 'Success',
                description: 'Stats updated successfully',
            });
        } catch (error: any) {
            toast({
                title: 'Error saving changes',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Manage Stats</h2>
                <button
                    onClick={saveChanges}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                                {stat.icon_name.charAt(0)}
                            </div>
                            <span className="text-gray-400 text-sm font-mono">{stat.icon_name}</span>
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Value</label>
                            <input
                                type="text"
                                value={stat.value}
                                onChange={(e) => handleUpdate(stat.id, 'value', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white font-bold focus:outline-none focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wider">Label</label>
                            <input
                                type="text"
                                value={stat.label}
                                onChange={(e) => handleUpdate(stat.id, 'label', e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsManager;
