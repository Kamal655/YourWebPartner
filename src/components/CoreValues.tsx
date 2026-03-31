import React, { useRef } from 'react';
import { Sparkles, Star, Zap, ShieldCheck, TrendingUp, Target } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoreValues = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        ScrollTrigger.refresh();

        gsap.fromTo(".value-card",
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: containerRef });

    const values = [
        {
            icon: <Sparkles className="w-12 h-12" />,
            title: "Pioneering Innovation",
            description: "Leveraging emerging technologies to create future-proof digital solutions that position your brand at the forefront of your industry.",
            gradient: "from-yellow-400 via-orange-500 to-red-500"
        },
        {
            icon: <Star className="w-12 h-12" />,
            title: "Uncompromising Excellence",
            description: "Delivering precision-engineered digital products where every detail is meticulously crafted to meet global standards of perfection.",
            gradient: "from-blue-400 via-purple-500 to-pink-500"
        },
        {
            icon: <Zap className="w-12 h-12" />,
            title: "Agile Efficiency",
            description: "Streamlined workflows and agile methodologies ensure rapid deployment without ever sacrificing the integrity or quality of your solution.",
            gradient: "from-green-400 via-blue-500 to-purple-500"
        },
        {
            icon: <ShieldCheck className="w-12 h-12" />,
            title: "Absolute Integrity",
            description: "Fostering long-term partnerships through complete clarity in pricing, processes, and communication. No hidden clauses, just honest collaboration.",
            gradient: "from-cyan-400 via-blue-500 to-indigo-500"
        },
        {
            icon: <Target className="w-12 h-12" />,
            title: "Strategic Impact",
            description: "Aligning our technical expertise with your business objectives to deliver measurable ROI and sustainable market growth.",
            gradient: "from-pink-400 via-rose-500 to-red-500"
        },
        {
            icon: <TrendingUp className="w-12 h-12" />,
            title: "Enduring Success",
            description: "Providing ongoing optimization and scalability support to ensure your digital presence evolves alongside your business ambitions.",
            gradient: "from-violet-400 via-purple-500 to-fuchsia-500"
        }
    ];

    // Note: For icons that were in About.tsx (ShieldCheck, Target, TrendingUp), we need to import them.
    // I will assume imports need to be added. 
    // Wait, I can't change imports easily with replace_file_content if I only replace the body.
    // I should use write_to_file for a clean rewrite or include imports in the chunk if possible.
    // Actually, replace_file_content works on a range. I should check imports first.

    return (
        <section ref={containerRef} className="py-24 bg-background relative overflow-hidden">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-white mb-4">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Core Values</span>
                </h2>
                <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                    The guiding principles that drive our innovation and ensure your success.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {values.map((value, index) => (
                    <div
                        key={index}
                        className="value-card group relative bg-white/5 backdrop-blur-lg rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 border border-white/10 hover:border-white/20 overflow-hidden"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>

                        <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${value.gradient} text-white rounded-full mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl relative z-10`}>
                            {value.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 transition-all duration-300 relative z-10">
                            {value.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                            {value.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoreValues;
