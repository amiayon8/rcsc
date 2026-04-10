import React from 'react';
import { Facebook, Instagram, Linkedin, Github, Globe } from 'lucide-react';
import Image from 'next/image';

const panelMembers = [
    {
        name: 'Sheikh Farhan',
        role: 'President',
        image: 'https://placehold.co/400x400/png?text=Farhan',
        socials: { instagram: 'https://www.instagram.com/farhan_bored' }
    },
    {
        name: 'Fairuj Faija Dhara',
        role: 'General Secretary',
        image: 'https://placehold.co/400x400/png?text=Dhara',
        socials: { instagram: 'https://www.instagram.com/faija.dhara_' }
    },
    {
        name: 'Rushafi Islam Rushan',
        role: 'Vice President',
        image: 'https://placehold.co/400x400/png?text=Rushan',
        socials: { instagram: 'https://www.instagram.com/oofrushan' }
    },
    {
        name: 'Muammar Daiyan Aritro',
        role: 'Vice President',
        image: 'https://placehold.co/400x400/png?text=Aritro',
        socials: { instagram: 'https://www.instagram.com/daiyan_aritro/' }
    },
    {
        name: 'Mehrin Khondoker',
        role: 'Sr. Organizing Secretary',
        department: 'Organizing',
        image: 'https://placehold.co/400x400/png?text=Mehrin',
        socials: { facebook: '#' }
    },
    {
        name: 'Awwab Bin Omar',
        role: 'Asst. Organizing Secretary',
        department: 'Organizing',
        image: 'https://placehold.co/400x400/png?text=Awwab',
        socials: { facebook: '#' }
    },
    {
        name: 'Ridita Reja',
        role: 'Asst. Organizing Secretary',
        department: 'Organizing',
        image: 'https://placehold.co/400x400/png?text=Ridita',
        socials: { facebook: '#' }
    },
    {
        name: 'Sharika Tasnim',
        role: 'Asst. Organizing Secretary',
        department: 'Organizing',
        image: 'https://placehold.co/400x400/png?text=Sharika',
        socials: { facebook: '#' }
    },
    {
        name: 'Kamran Saif',
        role: 'Treasurer',
        department: 'Organizing',
        image: 'https://placehold.co/400x400/png?text=Saif',
        socials: { facebook: '#' }
    },
    {
        name: 'Nafisa Nawal Prionty',
        role: 'Asst. General Secretary',
        image: 'https://placehold.co/400x400/png?text=Prionty',
        socials: { facebook: '#' }
    },
    {
        name: 'Atia Afsara Arshi',
        role: 'Asst. General Secretary',
        image: 'https://placehold.co/400x400/png?text=Arshi',
        socials: { facebook: '#' }
    },
    {
        name: 'Abeera Ahsan',
        role: 'Organizing Secretary | Public Relations',
        department: 'Organizing',
        image: 'https://placehold.co/400x400/png?text=Abeera',
        socials: { facebook: '#' }
    },
    {
        name: 'Alim Nur Rahman Rakan',
        role: 'Organizing Secretary | Graphics',
        department: 'Organizing',
        image: 'https://placehold.co/400x400/png?text=Rakan',
        socials: { facebook: '#' }
    },
    {
        name: 'Rafif Abrar',
        role: 'Organizing Secretary | Olympiad',
        department: 'Organizing',
        image: 'https://placehold.co/400x400/png?text=Rafif',
        socials: { facebook: '#' }
    },
    {
        name: 'Saaji Sehnai',
        role: 'Olympiads | Math',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Saaji',
        socials: { facebook: '#' }
    },
    {
        name: 'Nahian Parin Ifa',
        role: 'Olympiads | Math',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Ifa',
        socials: { facebook: '#' }
    },
    {
        name: 'Abdul Majid',
        role: 'Olympiads | Physics',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Majid',
        socials: { facebook: '#' }
    },
    {
        name: 'Iyas Mahrus Khan',
        role: 'Olympiads | Biology',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Iyas',
        socials: { facebook: '#' }
    },
    {
        name: 'Dibyendhu Talukder',
        role: 'Joint Secretary | IT and Tech',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Dibyendhu',
        socials: { facebook: '#' }
    },
    {
        name: 'Ayon Sarker',
        role: 'Joint Secretary | IT and Tech',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Ayon',
        socials: {
            github: 'https://www.github.com/amiayon8/',
            instagram: 'https://www.instagram.com/amiayon8/',
            website: 'https://www.thenicedev.xyz'
        }
    },
    {
        name: 'Samin Yasar Siddiqui',
        role: 'Joint Secretary | IT and Tech',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Samin',
        socials: { facebook: '#' }
    },
    {
        name: 'Akib Hasan Dhrubo',
        role: 'Joint Secretary | Photography',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Dhrubo',
        socials: { facebook: '#' }
    },
    {
        name: 'Tasmid Islam',
        role: 'Joint Secretary | Photography',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Tasmid',
        socials: { facebook: '#' }
    },
    {
        name: 'Tasfia Rahman Labiba',
        role: 'Joint Secretary | Public Relations',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Labiba',
        socials: { facebook: '#' }
    },
    {
        name: 'Md. Montahinul Haque Bhuiyan',
        role: 'Joint Secretary | Content Management',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Montahinul',
        socials: { facebook: '#' }
    },
    {
        name: 'Zunairah Zaid',
        role: 'Joint Secretary | Content Management',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Zunairah',
        socials: { facebook: '#' }
    },
    {
        name: 'Arib Muhtasim',
        role: 'Joint Secretary | Graphics',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Arib',
        socials: { facebook: '#' }
    },
    {
        name: 'Sazzadul Fatin',
        role: 'Joint Secretary | Logistics',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Fatin',
        socials: { facebook: '#' }
    },
    {
        name: 'Mehrab Ahmed',
        role: 'Joint Secretary | Logistics',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Mehrab',
        socials: { facebook: '#' }
    },
    {
        name: 'Syed Muhammad Adib',
        role: 'Co-executive',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Adib',
        socials: { facebook: '#' }
    },
    {
        name: 'Misbahul Hasan',
        role: 'Co-executive',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Misbah',
        socials: { facebook: '#' }
    },
    {
        name: 'Nazifa Zaman',
        role: 'Co-executive',
        department: 'Joint Secretary',
        image: 'https://placehold.co/400x400/png?text=Nazifa',
        socials: { facebook: '#' }
    }
];


const getSocialStyle = (platform: string) => {
    const base = "flex justify-center items-center rounded-full w-9 h-9 transition duration-300 text-white shadow-lg hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]";
    switch (platform) {
        case 'facebook': return { className: `${base} bg-[#3b5998] hover:bg-[#2d4373]`, Icon: Facebook };
        case 'instagram': return { className: `${base} bg-[#E1306C] hover:bg-[#C13584]`, Icon: Instagram };
        case 'linkedin': return { className: `${base} bg-[#0077B5] hover:bg-[#005582]`, Icon: Linkedin };
        case 'github': return { className: `${base} bg-[#333] hover:bg-black`, Icon: Github };
        case 'website': return { className: `${base} bg-[#222] hover:bg-black`, Icon: Globe };
        default: return { className: `${base} bg-[#222] hover:bg-black`, Icon: Globe };
    }
};

const getRoleDisplay = (member: any) => {
    if (member.department === 'Olympiads') {
        return member.role;
    }
    return member.role.replace('Joint Secretary | ', '').replace('Organizing Secretary | ', '');
};

const MemberCard = ({ member, isSpecial = false, isImportant = false, className = '' }: { member: any, isSpecial?: boolean, isImportant?: boolean, className?: string }) => {
    return (
        <div className={`
            relative flex flex-col items-center text-center p-[25px_15px] rounded-2xl transition duration-300 w-full
            ${isImportant ? 'md:-mt-8 order-1 md:order-2' : 'order-2 md:order-[auto]'}
            ${className}
            group bg-white/5 backdrop-blur-[15px] border-2 border-white/10 hover:-translate-y-1.25 hover:border-primary hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]
            ${isSpecial
                ? `
                   after:content-[''] after:absolute after:top-0 after:right-0 after:-z-10 after:w-full after:h-full 
                   after:bg-linear-to-br after:from-white/5 after:via-transparent after:to-[#3a7bd5]/10 after:rounded-2xl`
                : ``
            }
        `}>
            <div
                className="relative bg-white/10 group-hover:bg-linear-to-tr group-hover:from-primary group-hover:to-secondary mb-4 p-0.5 rounded-full size-27 aspect-square transition duration-300"
            >
                <div className="bg-[#111] rounded-full size-26! aspect-square overflow-hidden">
                    <Image
                        width={104}
                        height={104}
                        src={member.image}
                        alt={member.role}
                        className="m-0 rounded-full size-26 object-cover aspect-square"
                    />
                </div>
            </div>


            <h3 className="mb-2 font-bold text-[1.1rem] text-white uppercase leading-tight tracking-wide">
                {member.name}
            </h3>

            <div className="inline-block bg-[rgba(0,210,255,0.08)] mb-4 px-3 py-1 rounded-[10px] font-semibold text-[0.75rem] text-primary uppercase tracking-wider">
                {getRoleDisplay(member)}
            </div>

            <div className="flex gap-2 mt-auto">
                {Object.entries(member.socials).map(([platform, url]) => {
                    const { className, Icon } = getSocialStyle(platform);
                    return (
                        <a key={platform} href={(url as string) || "#"} className={className} target="_blank" rel="noopener noreferrer">
                            <Icon size={16} strokeWidth={2} />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

const SectionHeader = ({ title }: { title: string }) => (
    <div className="mt-12 mb-8 w-full text-center">
        <h2 className="bg-clip-text bg-linear-to-r from-primary/80 to-primary drop-shadow-[0_0_10px_rgba(0,210,255,0.3)] font-handwriting font-black text-transparent text-3xl md:text-4xl uppercase tracking-widest">
            {title}
        </h2>
        <div className="bg-linear-to-r from-primary to-secondary mx-auto mt-4 rounded-full w-24 h-1"></div>
    </div>
);

export default function ExecutivePanel() {

    const president = panelMembers.find(m => m.role === 'President');
    const vps = panelMembers.filter(m => m.role === 'Vice President');
    const tier1Ordered = [vps[0], president, vps[1]];

    const gs = panelMembers.find(m => m.role === 'General Secretary');
    const agss = panelMembers.filter(m => m.role === 'Asst. General Secretary');
    const tier2Ordered = [agss[0], gs, agss[1]];

    const organizing = panelMembers.filter(m => m.department === 'Organizing');

    const olympiad = panelMembers.filter(m => m.department === 'Olympiads');

    const jointSecretaries = panelMembers.filter(m => m.department === 'Joint Secretary' && m.role !== 'Co-executive');

    const coExecutives = panelMembers.filter(m => m.role === 'Co-executive');

    return (
        <section className="relative flex flex-col items-center px-4 pt-24 pb-20 min-h-screen">
            <div className="relative flex flex-col items-center mx-auto w-full max-w-300">

                <div className="mb-16 text-center animate-[slideUp_0.8s_ease_forwards]">
                    <h1 className="drop-shadow-[0_0_15px_rgba(0,210,255,0.6)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white uppercase tracking-tighter">
                        Executive Panel <span className="text-primary">2026-27</span>
                    </h1>
                </div>

                <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-16 w-full max-w-5xl">
                    {tier1Ordered.map((member, idx) => (
                        <MemberCard
                            key={idx}
                            member={member}
                            isSpecial={true}
                            isImportant={member?.role === 'President'}
                        />
                    ))}
                </div>

                <div className="gap-8 grid grid-cols-1 md:grid-cols-3 mb-4 w-full max-w-5xl">
                    {tier2Ordered.map((member, idx) => (
                        <MemberCard
                            key={idx}
                            member={member}
                            isSpecial={true}
                            isImportant={member?.role === 'General Secretary'}
                        />
                    ))}
                </div>
                {organizing.length > 0 && (
                    <>
                        <SectionHeader title="Organizing Dept." />
                        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full animate-[fadeIn_0.5s_ease-out_forwards]">
                            {organizing.map((member, idx) => (
                                <MemberCard key={idx} member={member} />
                            ))}
                        </div>
                    </>
                )}

                {olympiad.length > 0 && (
                    <>
                        <SectionHeader title="Olympiad Dept." />
                        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full animate-[fadeIn_0.5s_ease-out_forwards_0.2s]">
                            {olympiad.map((member, idx) => (
                                <MemberCard key={idx} member={member} />
                            ))}
                        </div>
                    </>
                )}

                <SectionHeader title="Joint Secretary" />
                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full animate-[fadeIn_0.5s_ease-out_forwards_0.4s]">
                    {jointSecretaries.map((member, idx) => (
                        <MemberCard key={idx} member={member} />
                    ))}
                </div>

                <SectionHeader title="Co-Executives" />
                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-225 animate-[fadeIn_0.5s_ease-out_forwards_0.6s]">
                    {coExecutives.map((member, idx) => (
                        <MemberCard key={idx} member={member} />
                    ))}
                </div>

            </div>
        </section>
    );
}