
import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, Home, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentFailed = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as {
        error?: string;
        planName?: string;
    } || {};

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30">
            <Header />

            <div className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative z-10 text-center animate-fade-in">
                    <div className="w-24 h-24 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-shake">
                        <XCircle className="w-12 h-12" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-600">
                        Payment Failed
                    </h1>

                    <p className="text-xl text-gray-300 mb-2 leading-relaxed">
                        We couldn't process your payment for <span className="text-white font-bold">{state.planName}</span>.
                    </p>
                    <p className="text-red-400 text-sm mb-8 bg-red-950/30 p-2 rounded-lg inline-block border border-red-900/50">
                        Error: {state.error || 'Transaction was declined by the bank or cancelled.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={() => navigate('/#pricing')}
                            className="h-12 bg-white text-black hover:bg-gray-200 gap-2 w-full sm:w-auto font-bold px-8"
                        >
                            <RefreshCw className="w-4 h-4" /> Try Again
                        </Button>
                        <Link to="/#contact">
                            <Button variant="outline" className="h-12 border-white/20 hover:bg-white/10 gap-2 w-full sm:w-auto">
                                <HelpCircle className="w-4 h-4" /> Contact Support
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

export default PaymentFailed;
