import { link } from 'fs';
import {
    Lightbulb, Rocket,
    Beaker, FlaskConical,
    Dna, Microscope,
    Sigma, Calculator,
    Baby,
    Brain, Bot,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const resourcesData = [
    {
        bgIcon: Lightbulb,
        fgIcon: Rocket,
        title: "Physics",
        description: "Explore the fundamental laws of nature, from the tiniest particles to the vastness of space.",
        actionText: "Explore",
        link: "/resources/physics"
    },
    {
        bgIcon: Beaker,
        fgIcon: FlaskConical,
        title: "Chemistry",
        description: "Dive into the building blocks of matter, chemical reactions, and the elements that shape our world.",
        actionText: "View Resources",
        //link: "/resources/chemistry"
    },
    {
        bgIcon: Dna,
        fgIcon: Microscope,
        title: "Biology",
        description: "Discover the wonders of life, exploring everything from cellular structures to complex ecosystems.",
        actionText: "Explore",
        //link: "/resources/biology"
    },
    {
        bgIcon: Sigma,
        fgIcon: Calculator,
        title: "Math",
        description: "Master the language of numbers, building skills from foundational algebra to advanced problem-solving.",
        actionText: "View Resources",
        link: "/resources/math"
    },
    {
        bgIcon: Baby,
        fgIcon: Lightbulb,
        title: "Junior Science",
        description: "Fun, hands-on experiments and easy-to-understand lessons designed specifically for curious young minds.",
        actionText: "Explore",
        //link: "/resources/junior-science"
    },
    {
        bgIcon: Brain,
        fgIcon: Bot,
        title: "AI",
        description: "Learn how machines think, uncovering the basics of algorithms, neural networks, and artificial intelligence.",
        actionText: "View Resources",
        //link: "/resources/ai"
    }
];

export default function Resources() {
    return (
        <main className="relative mx-auto px-6 pt-10 pb-24 max-w-7xl">
            {/* Translated .hero-glow to Tailwind arbitrary values */}
            <div className="top-0 left-1/2 -z-10 absolute bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.15)_0%,transparent_70%)] w-full h-full -translate-x-1/2 pointer-events-none"></div>

            <section className="text-center">
                <div className="inline-block bg-primary/5 mb-6 px-4 py-1 border border-primary/20 rounded-full">
                    <span className="font-label text-[10px] text-primary uppercase tracking-[0.3em]">Orbital Telemetry Active</span>
                </div>
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
                                    {resource.actionText} <ArrowRight size={16} />
                                </button>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}