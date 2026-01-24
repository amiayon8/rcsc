'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// --- Types ---
interface Achievement {
    id: string;
    title: string;
    winner: string;
    role?: string;
    description: string;
    image: string;
}

interface YearGroup {
    year: string;
    achievements: Achievement[];
}

// --- Data Object ---
const achievementsData: YearGroup[] = [
    {
        year: '2025',
        achievements: [
            {
                id: 'apicta-2025',
                title: 'APICTA Awards 2nd Runner Up',
                winner: 'Ayon Sarker',
                role: 'XI-EMMS, Joint Secretary (IT)',
                description:
                    'Achieved distinguished recognition at the Asia Pacific ICT Alliance Awards for innovative technological solutions.',
                image: '/images/apicta.jpg', // Replace with your actual image path
            },
            {
                id: 'wro-bronze-2025',
                title: 'WRO Bronze Medal',
                winner: 'Muammar Daiyan Aritro',
                role: 'XI-EMDS, Vice President',
                description:
                    'Secured the Bronze Medal at the World Robot Olympiad, demonstrating exceptional engineering skills on the global stage.',
                image: '/images/wro-bronze.jpg',
            },
            {
                id: 'wro-silver-2025',
                title: 'WRO Asia Pacific Silver',
                winner: 'S M Mohiuddin Sami',
                role: '',
                description:
                    'Achieved the Silver Medal at the World Robot Olympiad Asia Pacific Open Championship, excelling in autonomous robotics challenges.',
                image: '/images/wro-silver.jpg',
            },
            {
                id: 'wmi-bronze-2025',
                title: 'WMI Bronze Medal',
                winner: 'Nahian Parin Ifa',
                role: 'XII-BMMS, Joint Secretary of Maths',
                description:
                    'Earned the Bronze Medal at the World Mathematics Invitational through remarkable problem-solving abilities.',
                image: '/images/wmi.jpg',
            },
            {
                id: 'sakura-2025',
                title: 'Sakura Science Exchange',
                winner: 'Alim Nur Rahman Rakan & Nafisa Nawal Prionty',
                role: 'Organizing Secretary & Asst. General Secretary',
                description:
                    'Selected for the prestigious Sakura Science Exchange Program in Japan, fostering international scientific collaboration.',
                image: '/images/sakura.jpg',
            },
        ],
    },
    {
        year: '2024',
        achievements: [
            {
                id: 'wro-top20-2024',
                title: 'WRO Top 20 Finalist',
                winner: 'S M Mohiuddin Sami',
                description:
                    "Secured a distinguished spot in the top 20 at the World Robot Olympiad, competing against the world's best robotics teams.",
                image: '/images/wro-2024.jpg',
            },
            {
                id: 'bdmo-2024',
                title: 'BDMO National Winners',
                winner: 'Rafif Abrar (Champion) & Saaji Sehnai (2nd Runner Up)',
                role: 'Organizing Secretary & Joint Secretary of Math',
                description:
                    'Dominated the National Round of the Bangladesh Mathematical Olympiad with exceptional analytical skills.',
                image: '/images/bdmo.jpg',
            },
        ],
    },
];

// --- Components ---

const AchievementCard = ({ data }: { data: Achievement }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
        group relative flex flex-col overflow-hidden rounded-[20px] border border-white/10 
        bg-white/5 backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer
        ${isExpanded
                    ? 'z-10 border-cyan-400 bg-[#0f1932]/95 shadow-[0_0_40px_rgba(0,210,255,0.25)]'
                    : 'hover:-translate-y-1 hover:border-cyan-400 hover:shadow-2xl'
                }
      `}
        >
            {/* Image Section */}
            <div className="relative bg-[#1a1a2e] border-white/10 border-b w-full h-[200px] overflow-hidden">
                {/* Placeholder for Next/Image - remove bg-gray-700 when real images are added */}
                <div className="absolute inset-0 bg-gray-800">
                    {/* In a real app, use <Image /> here. 
              Using a standard img tag for immediate preview compatibility if you copy-paste without configuring next.config.js domains 
           */}
                    <img
                        src={data.image || "https://placehold.co/600x400/1a1a2e/00d2ff?text=Achievement"}
                        alt={data.title}
                        className={`h-full w-full object-cover transition-all duration-500 opacity-80 ${isExpanded ? 'opacity-100 scale-105' : 'group-hover:scale-105 group-hover:opacity-100'}`}
                    />
                </div>
            </div>

            {/* Content Section */}
            <div className="z-[2] relative p-6 text-center">
                <h3 className="mb-1 font-extrabold text-[1.3rem] text-white leading-tight">
                    {data.title}
                </h3>

                {/* Click Hint (Hidden when expanded) */}
                <div
                    className={`mt-2 text-xs font-bold uppercase tracking-widest text-cyan-400 opacity-70 transition-all duration-300 ${isExpanded ? 'h-0 opacity-0 m-0 overflow-hidden' : 'h-auto'
                        }`}
                >
                    View Details
                </div>

                {/* Expandable Description */}
                <div
                    className={`transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden text-left
            ${isExpanded
                            ? 'max-h-[500px] opacity-100 mt-5 pt-5 border-t border-white/10'
                            : 'max-h-0 opacity-0 mt-0 pt-0 border-transparent'
                        }
          `}
                >
                    <h4 className="mb-2 font-bold text-[1.1rem] text-cyan-400">
                        Winner: {data.winner}
                    </h4>
                    {data.role && (
                        <p className="mb-2 font-semibold text-gray-400 text-sm">{data.role}</p>
                    )}
                    <p className="text-gray-300 text-base leading-relaxed">
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function HallOfFame() {
    return (
        <div className="bg-[#0b1121] px-4 pb-20 min-h-screen text-slate-200">

            {/* Page Header */}
            <header className="pt-[150px] pb-[50px] text-center">
                <h1 className="drop-shadow-[0_0_20px_rgba(0,210,255,0.4)] mb-3 font-black text-white text-4xl md:text-6xl uppercase">
                    Hall of Fame
                </h1>
                <p className="text-[#8899ac] text-xl">
                    Celebrating Excellence Beyond Infinity
                </p>
            </header>

            {/* Main Container */}
            <main className="mx-auto max-w-7xl">
                {achievementsData.map((section) => (
                    <section key={section.year} className="mb-20 animate-fade-in-up">

                        {/* Year Title */}
                        <h2 className="inline-block mb-8 pb-2 border-cyan-400/20 border-b-2 font-extrabold text-cyan-400 text-3xl">
                            {section.year}
                        </h2>

                        {/* Grid */}
                        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {section.achievements.map((item) => (
                                <AchievementCard key={item.id} data={item} />
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}