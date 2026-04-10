import React from 'react';
import { Facebook, Instagram, Linkedin, Github, Globe } from 'lucide-react';
import Image from 'next/image';

const panelMembers = [
    {
        name: 'MD. Safayat Hossain Jim',
        role: 'RUET [EEE] | HSC 21\'',
        image: 'https://placehold.co/400x400/111/fff?text=Safayat',
        socials: { facebook: 'https://www.facebook.com/safayet.hossainjim.9' }
    },
    {
        name: 'Md. Samin Imran Talukder (Imon)',
        role: 'BUET [EEE] | HSC 21\'',
        image: 'https://placehold.co/400x400/111/fff?text=Samin',
        socials: { facebook: 'https://www.facebook.com/samin.abidullah' }
    },
    {
        name: 'Nafis Imtiaz Imam',
        role: 'Gettysburg College | HSC 21\'',
        image: 'https://placehold.co/400x400/111/fff?text=Nafis',
        socials: { facebook: 'https://www.facebook.com/imami.nafiz.7/' }
    },
    {
        name: 'Mohammad Saeed',
        role: 'IUT [Software Engineering] | HSC 22\'',
        image: 'https://placehold.co/400x400/111/fff?text=Saeed',
        socials: { facebook: 'https://www.facebook.com/saeflobor' }
    },
    {
        name: 'Sazzadur Rahman',
        role: 'Mymensingh Medical College | MBBS | HSC 24\'',
        image: 'https://placehold.co/400x400/111/fff?text=Sazzadur',
        socials: { facebook: 'https://www.facebook.com/sazzadur71' }
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

const MemberCard = ({ member, className = '' }: { member: any, className?: string }) => {
    return (
        <div className={`
            relative flex flex-col items-center text-center p-[25px_15px] rounded-2xl transition duration-300 w-full
            ${className}
            group bg-white/5 backdrop-blur-[15px] border border-white/10 hover:-translate-y-1.25 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]
        `}>
            <div
                className="relative bg-white/10 group-hover:bg-linear-to-tr group-hover:from-primary group-hover:to-secondary mb-4 p-1 rounded-full size-28 aspect-square transition duration-300"
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

            <div className="inline-block bg-[rgba(0,210,255,0.08)] mb-4 px-3 py-1 rounded-[10px] font-semibold text-[0.7rem] text-cyan-300 uppercase tracking-wider">
                {member.role}
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

export default function AdvisorPanel() {
    return (
        <section className="relative flex flex-col items-center px-4 pt-24 pb-20 min-h-screen">
            <div className="relative flex flex-col items-center mx-auto w-full max-w-7xl">

                <div className="mb-16 text-center animate-[slideUp_0.8s_ease_forwards]">
                    <h1 className="drop-shadow-[0_0_15px_rgba(0,210,255,0.6)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white uppercase tracking-tighter">
                        <span className="text-primary">Founder</span> Panel
                    </h1>
                </div>

                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full animate-[fadeIn_0.5s_ease-out_forwards]">
                    {panelMembers.map((member, idx) => (
                        <MemberCard key={idx} member={member} />
                    ))}
                </div>

            </div>
        </section>
    );
}