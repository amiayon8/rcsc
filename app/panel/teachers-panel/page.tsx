import React from 'react';
import { Facebook, Instagram, Linkedin, Github, Globe } from 'lucide-react';
import Image from 'next/image';

const teachersPanel = [
    {
        name: 'Akhter Sir',
        role: 'FOUNDER',
        image: 'https://placehold.co/400x400/png?text=Shahajalal',
        dept: 'Assoc. Prof. of Physics',
        socials: {}
    },
    {
        name: 'Mr. Md. Shahjalal',
        role: 'OIC',
        image: 'https://placehold.co/400x400/png?text=Akhter',
        dept: 'Assoc. Prof. of Zoology',
        socials: {}
    },
    {
        name: 'Mr. Md. Shahjahan',
        role: 'Moderator',
        department: 'Moderators',
        image: 'https://placehold.co/400x400/png?text=Sohel',
        dept: 'Asst. Prof. of Chemistry',
        socials: {}
    },
    {
        name: 'Dr. Lovely Aktar',
        role: 'Moderator',
        department: 'Moderators',
        image: 'https://placehold.co/400x400/png?text=Sohel',
        dept: 'Asst. Prof. of Botany',
        socials: {}
    },
    {
        name: 'Mr.Narayan Chanra Mazumdar',
        role: 'Moderator',
        department: 'Moderators',
        image: 'https://placehold.co/400x400/png?text=Sohel',
        dept: 'Asst. Prof. of Physics',
        socials: {}
    },
    {
        name: 'Mr. Shohel Rana',
        role: 'Moderator',
        department: 'Moderators',
        image: 'https://placehold.co/400x400/png?text=Sohel',
        dept: 'Lecturer in Physics',
        socials: {}
    },
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

const MemberCard = ({ member, isSpecial = false, isImportant = false, className = '', isLarge = false }: { member: any, isSpecial?: boolean, isImportant?: boolean, className?: string, isLarge?: boolean }) => {
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
            ${isLarge ? 'py-12' : ''}
        `}>
            <div
                className={`relative bg-white/10 group-hover:bg-linear-to-tr group-hover:from-primary group-hover:to-secondary p-0.5 rounded-full ${isLarge ? 'mb-8 size-33' : 'mb-4 size-27'} aspect-square transition duration-300`}
            >
                <div className={`bg-[#111] rounded-full ${isLarge ? 'size-32' : 'size-26'}! aspect-square overflow-hidden`}>
                    <Image
                        width={104}
                        height={104}
                        src={member.image}
                        alt={member.role}
                        className={`m-0 rounded-full ${isLarge ? 'size-32' : 'size-26'} object-cover aspect-square`}
                    />
                </div>
            </div>


            <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} mb-3 font-bold text-white uppercase leading-tight`}>
                {member.name}
            </h3>
            <h4 className={`text-sm mb-4 text-white leading-tight`}>{member.dept}</h4>
            <div className="inline-block bg-[rgba(0,210,255,0.1)] mb-4 px-4 py-1.25 rounded-full font-semibold text-[1rem] text-primary uppercase tracking-wider">
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

export default function TeachersPanel() {
    const founder = teachersPanel.find(m => m.role === 'FOUNDER');
    const oic = teachersPanel.find(m => m.role === 'OIC' && !m.name.includes('Assistant'));

    const topTier = [founder, oic].filter(Boolean);

    const moderators = teachersPanel.filter(m => m.department === 'Moderators');
    const assistantModerators = teachersPanel.filter(m => m.department === 'Assistant Moderators');

    return (
        <section className="relative flex flex-col items-center px-4 pt-24 pb-20 min-h-screen">
            <div className="relative flex flex-col items-center mx-auto w-full max-w-300">

                <div className="mb-16 text-center">
                    <h1 className="drop-shadow-[0_0_15px_rgba(0,210,255,0.6)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white uppercase tracking-tighter">
                        <span className="text-primary">Teachers'</span> Panel
                    </h1>
                </div>

                <div className="gap-8 grid grid-cols-1 md:grid-cols-2 mb-16 w-full max-w-2xl">
                    {topTier.map((member, idx) => (
                        <MemberCard
                            key={idx}
                            member={member}
                            isLarge={true}
                            isSpecial={true}
                            isImportant={true}
                        />
                    ))}
                </div>

                {moderators.length > 0 && (
                    <>
                        <SectionHeader title="Moderators" />
                        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
                            {moderators.map((member, idx) => (
                                <MemberCard key={idx} member={member} />
                            ))}
                        </div>
                    </>
                )}

                {assistantModerators.length > 0 && (
                    <>
                        <SectionHeader title="Assistant Moderators" />
                        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
                            {assistantModerators.map((member, idx) => (
                                <MemberCard key={idx} member={member} />
                            ))}
                        </div>
                    </>
                )}

            </div>
        </section>
    );
}