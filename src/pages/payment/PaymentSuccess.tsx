
import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight, Home, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as {
        paymentId?: string;
        orderId?: string;
        amount?: number;
        planName?: string;
        companyName?: string;
        date?: string;
    } || {};

    useEffect(() => {
        if (!state.paymentId) {
            // If accessed directly without state, redirect to home after 5s or show generic message
            // navigate('/'); 
        }
    }, [state, navigate]);

    const generateReceipt = () => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.setTextColor(147, 51, 234); // Purple
        doc.text("YourWebPartner", 20, 20);

        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Payment Receipt", 20, 35);

        doc.setFontSize(12);
        doc.text(`Date: ${state.date || new Date().toLocaleDateString()}`, 20, 45);
        doc.text(`Order ID: ${state.orderId || 'N/A'}`, 20, 52);
        doc.text(`Payment ID: ${state.paymentId || 'N/A'}`, 20, 59);

        doc.line(20, 65, 190, 65);

        doc.text("Item", 20, 75);
        doc.text("Cost", 160, 75);

        doc.line(20, 80, 190, 80);

        doc.text(`${state.planName || 'Service Plan'}`, 20, 90);
        doc.text(`Rs. ${(state.amount || 0).toLocaleString()}`, 160, 90);

        doc.line(20, 100, 190, 100);

        doc.setFontSize(14);
        doc.text(`Total Paid: Rs. ${(state.amount || 0).toLocaleString()}`, 120, 115);

        doc.save("receipt.pdf");
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500/30">
            <Header />

            <div className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

                <div className="max-w-2xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative z-10 text-center animate-fade-in">
                    <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <CheckCircle className="w-12 h-12" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                        Payment Successful!
                    </h1>

                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        Thank you for partnering with us. Your transaction for <span className="text-white font-bold">{state.planName}</span> has been verified.
                    </p>

                    <div className="bg-black/30 rounded-2xl p-6 mb-8 text-left space-y-3 border border-white/5">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Payment ID</span>
                            <span className="font-mono text-white">{state.paymentId}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Amount Paid</span>
                            <span className="font-bold text-green-400">₹{(state.amount || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Status</span>
                            <span className="flex items-center gap-1 text-green-400"><ShieldCheck className="w-3 h-3" /> Verified</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={generateReceipt} variant="outline" className="h-12 border-white/20 hover:bg-white/10 gap-2">
                            <Download className="w-4 h-4" /> Download Receipt
                        </Button>
                        <Link to="/admin">
                            <Button className="h-12 bg-white text-black hover:bg-gray-200 gap-2 w-full sm:w-auto font-bold px-8">
                                Go to Dashboard <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <Link to="/" className="text-gray-500 hover:text-white flex items-center justify-center gap-2 text-sm transition-colors">
                            <Home className="w-4 h-4" /> Back to Home
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PaymentSuccess;
