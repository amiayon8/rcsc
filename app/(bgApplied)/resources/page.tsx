import {
    Sigma, Calculator,
    Atom, Lightbulb,
    Dna, Microscope,
    Baby, Beaker,
    Orbit, Rocket,
    Code, Terminal,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const resourcesData = [
    {
        bgIcon: Sigma,
        fgIcon: Calculator,
        title: "Math Olympiad",
        description: "Master the language of numbers, building skills from foundational algebra to advanced problem-solving.",
        link: "/resources/math/math-olympiad-guidelines"
    },
    {
        bgIcon: Atom,
        fgIcon: Lightbulb,
        title: "Physics Olympiad",
        description: "Explore the fundamental laws of nature, from the tiniest subatomic particles to the physical forces shaping our reality.",
        link: "/resources/physics/physics-olympiad-guidelines"
    },
    {
        bgIcon: Dna,
        fgIcon: Microscope,
        title: "Biology Olympiad",
        description: "Discover the wonders of life, exploring everything from cellular structures to complex ecosystems.",
        link: "/resources/biology/biology-olympiad-guidelines"
    },
    {
        bgIcon: Baby,
        fgIcon: Beaker,
        title: "Junior Science Olympiad",
        description: "Fun, hands-on experiments and easy-to-understand lessons designed specifically for curious young minds.",
        link: "/resources/bdjso/bdjso-guidelines"
    },
    {
        bgIcon: Orbit,
        fgIcon: Rocket,
        title: "Space Olympiad",
        description: "Journey through the cosmos, studying planets, stars, orbital mechanics, and the mysteries of the universe.",
        //link: "/resources/space"
    },
    {
        bgIcon: Code,
        fgIcon: Terminal,
        title: "Informatics Olympiad",
        description: "Delve into computer science, programming algorithms, data structures, and the logic behind software development.",
        //link: "/resources/informatics"
    }
];

export default function Resources() {
    return (
        <main className="relative mx-auto px-6 pt-10 pb-24 max-w-7xl">
            {/* Translated .hero-glow to Tailwind arbitrary values */}


            <section className="text-center">
                {/* Translated .text-glow to Tailwind arbitrary values */}
                <div className="mb-4 text-center animate-[slideUp_0.8s_ease_forwards]">
                    <h1 className="drop-shadow-[0_0_15px_rgba(0,210,255,0.6)] font-black text-[clamp(2rem,5vw,3.5rem)] text-white uppercase tracking-tighter">
                        Resources: <span className="text-primary">Olympiad Guidelines</span>
                    </h1>
                </div>
                <p className="mx-auto max-w-2xl font-body font-light text-on-surface-variant text-lg leading-relaxed">
                    Access a curated collection of olympiad preparations, research papers, and technical guides designed to empower the scientists of tomorrow.
                </p>
            </section>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {resourcesData.map((resource, index) => {
                    const BgIcon = resource.bgIcon;
                    const FgIcon = resource.fgIcon;

                    return (
                        <Link
                            href={resource.link || "#"}
                            key={index}
                            className="group relative flex flex-col justify-between bg-[rgba(26,26,39,0.6)] hover:bg-[rgba(41,41,54,0.8)] backdrop-blur-md p-8 border rounded-xl border-outline-variant/15 h-80 transition-all hover:-translate-y-1 duration-300 ease-in-out"
                        >
                            <div className="top-0 right-0 absolute opacity-10 group-hover:opacity-20 p-4 transition-opacity">
                                <BgIcon size={96} strokeWidth={1} />
                            </div>

                            <div>
                                <div className="flex justify-center items-center bg-primary/10 mb-6 border border-primary/20 rounded-lg w-12 h-12">
                                    <FgIcon size={24} className="text-primary" />
                                </div>
                                <h3 className="mb-2 font-headline font-bold text-white text-2xl uppercase tracking-wide">
                                    {resource.title}
                                </h3>
                                <p className="font-light text-on-surface-variant text-sm leading-snug">
                                    {resource.description}
                                </p>
                            </div>

                            <div className="flex justify-between items-center">
                                <div className="hidden items-center gap-2 //flex">
                                    <div className="bg-primary rounded-full w-1.5 h-1.5 animate-pulse"></div>
                                    <span className="font-label text-[10px] text-primary/70 uppercase tracking-widest">

                                    </span>
                                </div>
                                <button className="flex items-center gap-2 group-hover:gap-4 font-label font-bold text-primary text-xs uppercase tracking-widest transition-all">
                                    View Resources <ArrowRight size={16} />
                                </button>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}