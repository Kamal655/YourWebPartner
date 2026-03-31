import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from '@/hooks/use-toast';
import { Trash2, Plus, RefreshCw, Copy } from 'lucide-react';

const PromoManager = () => {
    const [codes, setCodes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Form State
    const [newCode, setNewCode] = useState("");
    const [type, setType] = useState<"flat" | "percent">("flat");
    const [value, setValue] = useState("");
    const [minOrder, setMinOrder] = useState("0");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchCodes = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('promo_codes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error(error);
            toast({ title: "Error fetching codes", variant: "destructive" });
        } else {
            setCodes(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCodes();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCode || !value) return;

        setIsSubmitting(true);
        const { error } = await supabase.from('promo_codes').insert({
            code: newCode.toUpperCase().trim(),
            discount_type: type,
            discount_value: Number(value),
            min_order_value: Number(minOrder),
            is_active: true
        });

        if (error) {
            toast({ title: "Error creating code", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Success!", description: `Code ${newCode} created.` });
            setNewCode("");
            setValue("");
            fetchCodes();
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (id: string, code: string) => {
        if (!confirm(`Are you sure you want to delete ${code}?`)) return;

        const { error } = await supabase.from('promo_codes').delete().eq('id', id);
        if (error) {
            toast({ title: "Error deleting", variant: "destructive" });
        } else {
            toast({ title: "Deleted", description: `${code} removed.` });
            fetchCodes();
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: text });
    };

    return (
        <div className="p-8 max-w-7xl mx-auto text-white">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Promo Code Manager</h1>
                    <p className="text-gray-400">Create custom discount codes for your clients.</p>
                </div>
                <Button onClick={fetchCodes} variant="outline" className="border-white/10 text-white hover:bg-white/10">
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CREATE FORM */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 h-fit">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-purple-400" /> Create New Code
                    </h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="space-y-2">
                            <Label>Code Name</Label>
                            <Input
                                value={newCode}
                                onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                                placeholder="e.g. VIPCLIENT2024"
                                className="bg-black/20 border-white/10 font-mono uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <select
                                    className="w-full bg-black/20 border border-white/10 rounded-md p-2 text-sm"
                                    value={type}
                                    onChange={(e) => setType(e.target.value as "flat" | "percent")}
                                >
                                    <option value="flat">Flat Amount (₹)</option>
                                    <option value="percent">Percentage (%)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Value</Label>
                                <Input
                                    type="number"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder={type === 'flat' ? "5000" : "10"}
                                    className="bg-black/20 border-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Min Order Value (Optional)</Label>
                            <Input
                                type="number"
                                value={minOrder}
                                onChange={(e) => setMinOrder(e.target.value)}
                                placeholder="0"
                                className="bg-black/20 border-white/10"
                            />
                        </div>

                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Create Promo Code"}
                        </Button>
                    </form>
                </div>

                {/* LIST TABLE */}
                <div className="lg:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10 overflow-hidden">
                    <h2 className="text-xl font-semibold mb-4">Active Coupons</h2>
                    {loading ? (
                        <p className="text-gray-400">Loading codes...</p>
                    ) : codes.length === 0 ? (
                        <p className="text-gray-400">No active codes found. Create one to get started.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/10 hover:bg-transparent">
                                        <TableHead className="text-gray-300">Code</TableHead>
                                        <TableHead className="text-gray-300">Discount</TableHead>
                                        <TableHead className="text-gray-300">Min Order</TableHead>
                                        <TableHead className="text-gray-300">Status</TableHead>
                                        <TableHead className="text-right text-gray-300">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {codes.map((code) => (
                                        <TableRow key={code.id} className="border-white/10 hover:bg-white/5">
                                            <TableCell className="font-mono font-bold text-lg text-purple-300 flex items-center gap-2">
                                                {code.code}
                                                <Copy
                                                    className="w-3 h-3 cursor-pointer text-gray-500 hover:text-white"
                                                    onClick={() => copyToClipboard(code.code)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {code.discount_type === 'flat' ? `₹${Number(code.discount_value).toLocaleString()}` : `${code.discount_value}% OFF`}
                                            </TableCell>
                                            <TableCell>
                                                ₹{Number(code.min_order_value).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={code.is_active ? "default" : "destructive"}>
                                                    {code.is_active ? "Active" : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                                    onClick={() => handleDelete(code.id, code.code)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromoManager;
