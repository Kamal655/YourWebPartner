
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = () => {
    const [session, setSession] = useState<boolean | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log("ProtectedRoute: Initial Session check:", !!session);
            setSession(!!session);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("ProtectedRoute: Auth State Change:", _event, !!session);
            setSession(!!session);
        });

        // Safety Timeout: If Supabase doesn't respond in 5 seconds, redirect to login
        const timeoutId = setTimeout(() => {
            setSession((prev) => {
                if (prev === null) {
                    console.warn("ProtectedRoute: Auth check timed out. Redirecting to login.");
                    return false;
                }
                return prev;
            });
        }, 5000);

        return () => {
            subscription.unsubscribe();
            clearTimeout(timeoutId);
        };
    }, []);

    if (session === null) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
