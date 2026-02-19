'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Achievement {
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

const achievementsData: YearGroup[] = [
    {
        year: '2025',
        achievements: [
            {
                title: "WRO Best Design Innovation",
                winner: "Winner: Syed Mohammad Mohiuddin Sami",
                description: "Earned the Best Design Innovation Award in the Future Engineers category at the World Robot Olympiad 2025 held in Manila, Philippines.",
                image: ""
            },
            {
                title: "IOAI Bronze Medals",
                winner: "Achiever: Md. Riasat Islam",
                description: "Secured two Bronze Medals at the International Olympiad in Artificial Intelligence 2025 in Beijing, China, representing Bangladesh.",
                image: ""
            },
            {
                title: "IPa – IUMF 2025",
                winner: "Achiever: Nahian Parin Ifa",
                description: "Achieved an outstanding tally of 4 Gold, 6 Silver, and 8 Bronze medals at the IUMF 2025 held in Bangkok City, Thailand.",
                image: ""
            },
            {
                title: "66th IMO Participation",
                winner: "Participant: M. Zamiul Hossain",
                description: "Participated in the 66th International Mathematics Olympiad held in Sunshine Coast, Australia, competing against 600 mathematicians.",

                image: ""
            },
            {
                title: "EGMO 2025 Representation",
                winner: "Representatives: Nahian Parin Ifa & Saaji Sehnai",
                description: "Represented RCSC at the European Girls’ Mathematical Olympiad (EGMO) 2025, marking a notable international presence.",
                image: ""
            },
            {
                title: "BDAIO National Winner",
                winner: "Winner: [Student Name]",
                description: "Became a National Round Winner of BDAIO 2025, showcasing excellence in algorithmic thinking and applied AI skills.",
                image: ""
            },
            {
                title: "BDMO National Round",
                winner: "26 Qualifiers",
                description: "A total of 26 participants from RCSC qualified for the BDMO 2025 National Round, reflecting strong nationwide performance.",
                image: ""
            },
            {
                title: "APICTA Awards 2nd Runner Up",
                winner: "Winner: Ayon Sarker (XI-EMMS, Joint Secretary IT)",
                description: "Achieved distinguished recognition at the Asia Pacific ICT Alliance Awards for innovative technological solutions.",
                image: "/Media/achievements/2025/apicta-25.webp"
            },
            {
                title: "WRO Bronze Medal",
                winner: "Winner: Muammar Daiyan Aritro (XI-EMDS, Vice President)",
                description: "Secured the Bronze Medal at the World Robot Olympiad, demonstrating exceptional engineering skills on the global stage.",
                image: "/images/wro-bronze.jpg"
            },
            {
                title: "WRO Asia Pacific Silver",
                winner: "Winner: S M Mohiuddin Sami",
                description: "Achieved the Silver Medal at the World Robot Olympiad Asia Pacific Open Championship, excelling in autonomous robotics challenges.",
                image: "/images/wro-silver.jpg"
            },
            {
                title: "WMI Bronze Medal",
                winner: "Winner: Nahian Parin Ifa (XII-BMMS, Joint Secretary of Maths)",
                description: "Earned the Bronze Medal at the World Mathematics Invitational through remarkable problem-solving abilities.",
                image: "/images/wmi.jpg"
            },
            {
                title: "Sakura Science Exchange",
                winner: "Selected: Alim Nur Rahman Rakan & Nafisa Nawal Prionty",
                description: "Selected for the prestigious Sakura Science Exchange Program in Japan, fostering international scientific collaboration.",
                image: "/images/sakura.jpg"
            }
        ]
    },
    {
        year: '2024',
        achievements: [
            {
                title: "WRO 2024 Top 20",
                winner: "Winner: Syed Mohammad Mohiuddin Sami",
                description: "Secured a spot in the Top 20 teams at the World Robot Olympiad 2024 held in Turkey, a significant international achievement.",
                image: "/images/wro-2024.jpg"
            },
            {
                title: "Space Olympiad Winners",
                winner: "13 Winners Total",
                description: "Achieved notable success with 13 winners in total: 1 Junior, 8 Secondary, and 4 Senior category winners.",
                image: ""
            },
            {
                title: "DRMC Math Summit",
                winner: "Participants",
                description: "Participated in the 1st DRMC Math Summit 2024, engaging in mathematical discussions and problem-solving sessions.",
                image: ""
            },
            {
                title: "AIUB CS Fest 2024",
                winner: "Participants",
                description: "Gained exposure to computer science competitions, workshops, and academic networking opportunities.",
                image: ""
            },
            {
                title: "BDMO National Winners",
                winner: "Winners: Rafif Abrar (Champion) & Saaji Sehnai (2nd Runner Up)",
                description: "Dominated the National Round of the Bangladesh Mathematical Olympiad with exceptional analytical skills.",
                image: "/images/bdmo.jpg"
            }
        ]
    },
    {
        year: '2023',
        achievements: [
            {
                title: "BSMO 2023 Participation",
                winner: "Participants",
                description: "Participated in the Bangladesh Secondary Mathematical Olympiad 2023, developing experience in structured problem-solving.",
                image: ""
            },
            {
                title: "Beyond the Metrics",
                winner: "Participants",
                description: "Participated in an academic event focused on analytical thinking and non-traditional evaluation approaches.",
                image: ""
            },
            {
                title: "BCSIR 2023",
                winner: "Participants",
                description: "Gained exposure to scientific research environments and applied science initiatives at BCSIR 2023.",
                image: ""
            },
            {
                title: "HCSC 2023",
                winner: "Participants",
                description: "Reflected continued engagement in science-based academic competitions through participation in HCSC 2023.",
                image: ""
            }
        ]
    },
    {
        year: '2022',
        achievements: [
            {
                title: "APMO 2022",
                winner: "Participants",
                description: "Participated in APMO 2022, marking early involvement in national and international mathematics Olympiads.",
                image: ""
            }
        ]
    }
];

const AchievementCard = ({ data }: { data: Achievement }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
        group relative flex flex-col overflow-hidden rounded-4xl border border-white/10 
        bg-white/5 backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer
        ${isExpanded
                    ? 'z-10 border-cyan-400 bg-[#0f1932]/95 shadow-[0_0_40px_rgba(0,210,255,0.25)]'
                    : 'hover:-translate-y-1 hover:border-cyan-400 hover:shadow-2xl'
                }
      `}
        >
            <div className="relative bg-[#1a1a2e] border-white/10 border-b w-full aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gray-800">
                    <img
                        src={data.image || "https://placehold.co/1080x1080/1a1a2e/00d2ff?text=Achievement"}
                        alt={data.title}
                        className={`h-full w-full object-cover transition-all duration-500 opacity-80 ${isExpanded ? 'opacity-100 scale-105' : 'group-hover:scale-105 group-hover:opacity-100'}`}
                    />
                </div>
            </div>

            <div className="z-2 relative p-6 text-center">
                <h3 className="mb-1 font-extrabold text-[1.3rem] text-white leading-tight">
                    {data.title}
                </h3>

                <div className={`mt-2 text-xs font-bold uppercase tracking-widest text-cyan-400 opacity-70 transition-all duration-300 ${isExpanded ? 'h-0 opacity-0 m-0 overflow-hidden' : 'h-auto'}`}>
                    View Details
                </div>

                <div className={`transition-[max-height,opacity,margin] duration-500 ease-in-out overflow-hidden text-left
                             ${isExpanded
                        ? 'max-h-125 opacity-100 mt-5 pt-5 border-t border-white/10'
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
        <div className="flex justify-center items-center bg-[#0b1121] p-4 pt-30 pb-10 w-full min-h-screen text-slate-200">

            <div className="top-[-10%] left-[-10%] z-0 fixed bg-cyan-500/10 blur-[100px] rounded-full w-125 h-125" />
            <div className="right-[-10%] bottom-[-10%] z-0 fixed bg-blue-600/10 blur-[100px] rounded-full w-125 h-125" />

            <div className="z-10 relative w-full max-w-7xl">
                <div className="text-center animate-[slideUp_0.8s_ease_forwards]">
                    <h1 className="drop-shadow-[0_0_15px_rgba(0,210,255,0.6)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white text-center uppercase tracking-tighter">
                        Hall of Fame
                    </h1>
                    <p className="text-[#8899ac] text-xl text-center">
                        Celebrating Excellence Beyond Infinity
                    </p>
                </div>

                <main className="mx-auto max-w-7xl">
                    {achievementsData.map((section) => (
                        <section key={section.year} className="mb-20 animate-fade-in-up">

                            <h2 className="inline-block mb-8 pb-2 border-cyan-400/20 border-b-2 font-extrabold text-cyan-400 text-3xl">
                                {section.year}
                            </h2>

                            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {section.achievements.map((item, idx) => (
                                    <AchievementCard key={idx} data={item} />
                                ))}
                            </div>
                        </section>
                    ))}
                </main>
            </div>
        </div>
    );
}