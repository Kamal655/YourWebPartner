import { useState } from 'react';

export const useRazorpay = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const loadRazorpay = async (): Promise<boolean> => {
        return new Promise((resolve) => {
            // Check if already loaded
            if (window.Razorpay) {
                setIsLoaded(true);
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                setIsLoaded(true);
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    return { isLoaded, loadRazorpay };
};
