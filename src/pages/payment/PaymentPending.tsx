
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Home, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentPending = () => {

    // Optional: Add polling logic here to check status from backend

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30">
            <Header />

            <div className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>

                <div className="max-w-xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 relative z-10 text-center animate-fade-in">
                    <div className="w-24 h-24 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8 animate-spin-slow">
                        <Loader2 className="w-12 h-12" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-600">
                        Payment Processing...
                    </h1>

                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        We are currently verifying your transaction. This usually takes less than a minute.
                    </p>

                    <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-4 mb-8 text-left flex gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-yellow-200/80">
                            Please do not close this window or press back. You will be redirected automatically once confirmed.
                            If nothing happens for 2 minutes, please check your email for confirmation.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/#contact">
                            <Button variant="outline" className="h-12 border-white/20 hover:bg-white/10 gap-2 w-full sm:w-auto">
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5">
                        <Link to="/" className="text-gray-500 hover:text-white flex items-center justify-center gap-2 text-sm transition-colors">
                            <Home className="w-4 h-4" /> Return to Home
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PaymentPending;
