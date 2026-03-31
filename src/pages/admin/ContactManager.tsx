import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, Calendar, Trash2, Search, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ContactSubmission {
    id: number;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    submitted_at: string;
}

const ContactManager = () => {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_submissions')
                .select('*')
                .order('submitted_at', { ascending: false });

            if (error) throw error;
            setSubmissions(data || []);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            toast({
                title: "Error",
                description: "Failed to load messages",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setSubmissions(submissions.filter(s => s.id !== id));
            toast({ title: "Success", description: "Message deleted" });
        } catch (error) {
            console.error('Error deleting submission:', error);
            toast({
                title: "Error",
                description: "Failed to delete message",
                variant: "destructive"
            });
        }
    };

    const filteredSubmissions = submissions.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.service?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 text-white space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                    <MessageSquare className="w-8 h-8 text-blue-400" />
                    Inbox
                </h2>

                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:border-blue-500 outline-none transition-colors"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading messages...</div>
            ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                    <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Messages Found</h3>
                    <p className="text-gray-400">Your inbox is empty (or no matches found).</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredSubmissions.map((submission) => (
                        <div
                            key={submission.id}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-all group relative"
                        >
                            <button
                                onClick={() => handleDelete(submission.id)}
                                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-400 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Meta Info */}
                                <div className="md:w-1/3 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-lg">
                                            {submission.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{submission.name}</h3>
                                            <p className="text-sm text-blue-400">{submission.service}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3 h-3" />
                                            <a href={`mailto:${submission.email}`} className="hover:text-white transition-colors">
                                                {submission.email}
                                            </a>
                                        </div>
                                        {submission.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-3 h-3" />
                                                <a href={`tel:${submission.phone}`} className="hover:text-white transition-colors">
                                                    {submission.phone}
                                                </a>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            <span>{format(new Date(submission.submitted_at), 'PPP p')}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="md:w-2/3 bg-black/20 rounded-lg p-4 border border-white/5">
                                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {submission.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactManager;
