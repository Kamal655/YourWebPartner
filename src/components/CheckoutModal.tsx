import React, { useState } from 'react';
import { Check, X, Loader2, CreditCard, Download, MessageCircle, Building2, User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from '@/hooks/useRazorpay';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { jsPDF } from 'jspdf';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// PLACEHOLDER: Replace with real key
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: {
        name: string;
        monthlyPrice?: number;
        yearlyPrice?: number;
        price?: number; // fallback for one-time
        color?: string;
    };
    billingCycle?: 'monthly' | 'yearly' | 'one-time';
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, plan, billingCycle = 'monthly' }) => {
    const { loadRazorpay } = useRazorpay();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'details' | 'success'>('details');

    // Order State
    const [promoCode, setPromoCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isValidatingPromo, setIsValidatingPromo] = useState(false);
    const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Client Details
    const [clientName, setClientName] = useState("");
    const [clientEmail, setClientEmail] = useState("");
    const [clientPhone, setClientPhone] = useState("");
    const [companyName, setCompanyName] = useState("");

    // Calculate Price
    const getOriginalPrice = () => {
        if (billingCycle === 'monthly') return plan.monthlyPrice || 0;
        if (billingCycle === 'yearly') return plan.yearlyPrice || 0;
        return plan.price || 0; // One-time plans
    };

    const finalPrice = Math.max(0, getOriginalPrice() - discountAmount);

    // 1. Validate Promo Code
    const verifyPromoCode = async () => {
        if (!promoCode.trim()) return;
        setIsValidatingPromo(true);
        setPromoMessage(null);

        try {
            const { data, error } = await supabase
                .from('promo_codes')
                .select('*')
                .eq('code', promoCode.trim())
                .eq('is_active', true)
                .maybeSingle();

            if (error) {
                console.warn("Supabase error:", error);
                setPromoMessage({ type: 'error', text: "Invalid code." });
                setDiscountAmount(0);
                return;
            }

            if (!data) {
                setPromoMessage({ type: 'error', text: "Invalid or expired code." });
                setDiscountAmount(0);
            } else {
                // Calculate Discount
                let calculatedDiscount = 0;
                const price = getOriginalPrice();

                if (data.discount_type === 'flat') {
                    calculatedDiscount = Number(data.discount_value);
                } else if (data.discount_type === 'percent') {
                    calculatedDiscount = (price * Number(data.discount_value)) / 100;
                }

                // Check Min Order
                if (data.min_order_value && price < data.min_order_value) {
                    setPromoMessage({ type: 'error', text: `Minimum order value of ₹${data.min_order_value} required.` });
                    setDiscountAmount(0);
                    return;
                }

                setDiscountAmount(calculatedDiscount);
                setPromoMessage({ type: 'success', text: `Coupon applied! Saved ₹${calculatedDiscount.toLocaleString()}` });
            }
        } catch (err) {
            setPromoMessage({ type: 'error', text: "Error verifying code." });
        } finally {
            setIsValidatingPromo(false);
        }
    };

    // 2. Generate PDF Invoice
    const generateInvoice = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.setTextColor(147, 51, 234); // Purple
        doc.text("YourWebPartner", 20, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Invoice / Receipt", 20, 30);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);

        // Client Details
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("Bill To:", 20, 50);
        doc.setFontSize(10);
        doc.text(companyName, 20, 56);
        doc.text(clientName, 20, 61);
        doc.text(clientEmail, 20, 66);
        doc.text(clientPhone, 20, 71);

        // Order Details
        doc.line(20, 80, 190, 80);
        doc.text("Description", 20, 86);
        doc.text("Amount", 160, 86);
        doc.line(20, 90, 190, 90);

        doc.text(`${plan.name} Plan (${billingCycle})`, 20, 100);
        doc.text(`Rs. ${getOriginalPrice().toLocaleString()}`, 160, 100);

        if (discountAmount > 0) {
            doc.setTextColor(22, 163, 74); // Green
            doc.text(`Discount (${promoCode})`, 20, 110);
            doc.text(`- Rs. ${discountAmount.toLocaleString()}`, 160, 110);
            doc.setTextColor(0);
        }

        doc.line(20, 120, 190, 120);
        doc.setFontSize(12);
        doc.text("Total Paid", 120, 130);
        doc.text(`Rs. ${finalPrice.toLocaleString()}`, 160, 130);

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text("Thank you for your business. For support, contact admin@yourwebpartner.com", 20, 280);

        doc.save(`Invoice_${companyName.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`);
    };

    // 3. WhatsApp Link
    const openWhatsApp = () => {
        const message = `Hi, I just purchased the ${plan.name} Plan for ${companyName}. I'd like to confirm the next steps.`;
        const url = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`; // Replace with real support number
        window.open(url, '_blank');
    };

    // 4. Payment Trigger
    const handlePayment = async () => {
        if (!clientName || !clientEmail || !clientPhone || !companyName) {
            toast({ title: "Start Up Error", description: "All fields including Company Name are required.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        const isLoaded = await loadRazorpay();
        if (!isLoaded) {
            toast({ title: "Error", description: "Payment gateway failed to load.", variant: "destructive" });
            setIsLoading(false);
            return;
        }

        try {
            // 1. Create Secure Order on Backend
            // We pass the plan details, and backend calculates the price securely.
            const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
                body: {
                    plan_name: plan.name,
                    cycle: billingCycle,
                    promo_code: promoCode // Optional: Backends logic needs to support this if we want server-side discount
                }
            });

            if (orderError) throw orderError;
            if (orderData.error) throw new Error(orderData.error);

            const { id: order_id, amount: order_amount, currency: order_currency } = orderData;

            // 2. Open Razorpay with the Order ID
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: order_amount, // Amount from server
                currency: order_currency,
                name: "YourWebPartner",
                description: `Payment for ${plan.name}`,
                image: "https://yourwebpartner.com/logo.png", // Use valid URL or placeholder
                order_id: order_id, // CRITICAL: This enables correct signature generation
                prefill: { name: clientName, email: clientEmail, contact: clientPhone },
                notes: {
                    plan: plan.name,
                    company: companyName,
                    promo_code: promoCode
                },
                handler: async function (response: RazorpayPaymentResponse) {
                    try {
                        // Backend Verification
                        const { data, error } = await supabase.functions.invoke('verify-payment', {
                            body: {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id, // Now this will definitely exist
                                razorpay_signature: response.razorpay_signature,
                                plan_name: plan.name,
                                amount: order_amount / 100, // Convert back to main unit for DB storage if needed, or store in paisa and adjust schema
                                currency: order_currency,
                                promo_code: promoCode,
                                customer_email: clientEmail,
                                customer_name: clientName,
                                customer_phone: clientPhone,
                                company_name: companyName
                            }
                        });

                        if (error) throw error;
                        if (data && data.error) throw new Error(data.error);

                        // Redirect to Success Page
                        onClose();
                        navigate('/payment-success', {
                            state: {
                                paymentId: response.razorpay_payment_id,
                                orderId: response.razorpay_order_id,
                                amount: order_amount / 100,
                                planName: plan.name,
                                companyName: companyName,
                                date: new Date().toLocaleDateString()
                            }
                        });

                    } catch (err: unknown) {
                        const errorMessage = err instanceof Error ? err.message : "Payment verification failed";
                        console.error("Backend Verification Failed:", err);
                        onClose();
                        navigate('/payment-failed', {
                            state: {
                                error: errorMessage,
                                planName: plan.name
                            }
                        });
                    }
                },
                theme: { color: "#9333ea" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (err: any) {
            console.error("Order Creation Failed:", err);
            toast({ title: "Order Error", description: err.message || "Failed to initiate payment.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-xl bg-[#0a0a0a] border-white/10 text-white p-0 overflow-hidden">
                {step === 'details' ? (
                    <>
                        <DialogHeader className="p-6 pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <DialogTitle className="text-2xl font-bold">Secure Checkout</DialogTitle>
                                    <DialogDescription className="text-gray-400 mt-1">
                                        Complete your purchase for {plan.name}
                                    </DialogDescription>
                                </div>
                                <div className="bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 text-xs font-medium text-purple-400 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Secure SSL
                                </div>
                            </div>
                        </DialogHeader>

                        <div className="p-6 py-2 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {/* Plan Summary */}
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex justify-between items-center">
                                <div className="flex gap-3 items-center">
                                    <div className={`w-10 h-10 rounded-lg bg-${plan.color || 'blue'}-500/20 flex items-center justify-center text-${plan.color || 'blue'}-400`}>
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{plan.name}</h4>
                                        <p className="text-xs text-gray-400 capitalize">{billingCycle}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">₹{finalPrice.toLocaleString()}</p>
                                    {discountAmount > 0 && <p className="text-xs text-green-400 line-through">₹{getOriginalPrice().toLocaleString()}</p>}
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label className="text-xs font-semibold text-gray-500">FULL NAME <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                            <Input placeholder="John Doe" className="pl-9 bg-white/5 border-white/10" value={clientName} onChange={e => setClientName(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs font-semibold text-gray-500">COMPANY NAME <span className="text-red-500">*</span></Label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                            <Input placeholder="Acme Inc." className="pl-9 bg-white/5 border-white/10" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs font-semibold text-gray-500">EMAIL ADDRESS <span className="text-red-500">*</span></Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                        <Input type="email" placeholder="john@company.com" className="pl-9 bg-white/5 border-white/10" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label className="text-xs font-semibold text-gray-500">PHONE NUMBER <span className="text-red-500">*</span></Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                                        <Input type="tel" placeholder="+91 98765 43210" className="pl-9 bg-white/5 border-white/10" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="pt-2">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Have a promo code?"
                                        className="bg-white/5 border-white/10 focus:ring-purple-500/50"
                                        value={promoCode}
                                        onChange={e => setPromoCode(e.target.value.toUpperCase())}
                                    />
                                    <Button variant="outline" className="border-white/20 hover:bg-white/10" onClick={verifyPromoCode} disabled={!promoCode || isValidatingPromo}>
                                        {isValidatingPromo ? <Loader2 className="animate-spin w-4 h-4" /> : "Apply"}
                                    </Button>
                                </div>
                                {promoMessage && (
                                    <p className={`text-xs mt-1 flex items-center gap-1 ${promoMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {promoMessage.type === 'success' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                        {promoMessage.text}
                                    </p>
                                )}
                            </div>

                            {/* Terms */}
                            <div className="flex items-start space-x-2 pt-2">
                                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(c) => setAgreedToTerms(c as boolean)} className="data-[state=checked]:bg-purple-600 border-white/20 mt-1" />
                                <Label htmlFor="terms" className="text-xs text-gray-400 leading-snug">
                                    I agree to the <a href="/terms" target="_blank" className="text-purple-400 underline">Terms</a> & <a href="/privacy" target="_blank" className="text-purple-400 underline">Privacy Policy</a>.
                                    Invoice will be sent to your email.
                                </Label>
                            </div>
                        </div>

                        <DialogFooter className="p-6 pt-2">
                            <Button
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:brightness-110 transition-all font-bold text-lg shadow-lg shadow-purple-900/20"
                                onClick={handlePayment}
                                disabled={isLoading || !agreedToTerms}
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : "Complete Payment"}
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-300">
                            <Check className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                        <p className="text-gray-400 mb-8 max-w-sm">
                            Thank you for your purchase. A confirmation email has been sent to {clientEmail}.
                        </p>

                        <div className="w-full space-y-3">
                            <Button onClick={generateInvoice} variant="outline" className="w-full h-12 border-white/20 hover:bg-white/10 gap-2">
                                <Download className="w-5 h-5 text-blue-400" /> Download Invoice
                            </Button>

                            <Button onClick={openWhatsApp} className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 font-bold">
                                <MessageCircle className="w-5 h-5" /> Confirm on WhatsApp
                            </Button>

                            <Button onClick={onClose} variant="ghost" className="text-gray-500 hover:text-white mt-2">
                                Close Window
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutModal;
