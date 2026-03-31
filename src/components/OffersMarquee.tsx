import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Sparkles, Tag, Zap, Star } from 'lucide-react';

const OffersMarquee = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    const offers = [
        { text: "Launch Special: Get 20% OFF your first Project!", icon: <Tag className="w-4 h-4 text-yellow-400" /> },
        { text: "Free SEO Audit with every Web Development package", icon: <SearchIcon /> },
        { text: "Premium 3D Assets included in Ultimate Plan", icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
        { text: "24/7 Priority Support for Enterprise Clients", icon: <Zap className="w-4 h-4 text-blue-400" /> },
        { text: "Limited Time: Free Logo Design with Full Branding Kit", icon: <Star className="w-4 h-4 text-pink-400" /> },
    ];

    // Helper for SearchIcon since it wasn't imported above due to simplistic icon choices
    function SearchIcon() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-400"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
            </svg>
        );
    }

    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useGSAP(() => {
        if (!marqueeRef.current) return;

        // Clone content for seamless loop
        const content = marqueeRef.current.innerHTML;
        marqueeRef.current.innerHTML = content + content;

        const width = marqueeRef.current.scrollWidth / 2;

        tweenRef.current = gsap.to(marqueeRef.current, {
            x: -width,
            duration: 30,
            ease: "none",
            repeat: -1,
        });

        // Hover effect to pause (animate the timeScale of the tween)
        const onEnter = () => gsap.to(tweenRef.current, { timeScale: 0, duration: 0.5 });
        const onLeave = () => gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });

        containerRef.current?.addEventListener('mouseenter', onEnter);
        containerRef.current?.addEventListener('mouseleave', onLeave);

        return () => {
            containerRef.current?.removeEventListener('mouseenter', onEnter);
            containerRef.current?.removeEventListener('mouseleave', onLeave);
            tweenRef.current?.kill(); // Cleanup
        };

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden bg-background/50 backdrop-blur-md border-y border-white/5 py-3 z-40"
        >
            {/* Searchlight/Gradient overlay for depth */}
            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <div ref={marqueeRef} className="flex gap-12 whitespace-nowrap pl-4 items-center">
                {offers.map((offer, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-300">
                        {offer.icon}
                        <span className="tracking-wide">
                            {offer.text}
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 ml-8"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OffersMarquee;
