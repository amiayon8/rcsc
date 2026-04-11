import {
    ArrowLeft,
    ArrowRight,
    Target,
    Clock,
    Sigma
} from 'lucide-react';
import Link from 'next/link';

const mathResourcesData = [
    {
        title: "Junior Science Olympiad Guidelines",
        description: "Comprehensive strategies, syllabus breakdowns, and recommended problem-solving materials to prepare for competitive math olympiads.",
        category: "Preparation Guide",
        readTime: "10 min read",
        icon: Target,
        href: "/resources/bdjso/bdjso-guidelines"
    }
    // You can add more math content here later!
];

export default function MathResources() {
    return (
        <main className="relative mx-auto px-6 pt-32 pb-24 max-w-7xl overflow-hidden">
            {/* Background Glow */}


            {/* Navigation & Header */}
            <div className="mb-10">
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 mb-12 font-label text-primary/70 hover:text-primary text-sm transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Resources
                </Link>

                <div className="flex items-center gap-6 mb-6">
                    <div className="flex justify-center items-center bg-primary/10 border border-primary/20 rounded-2xl w-20 h-20">
                        <Sigma size={40} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="font-headline font-bold text-primary text-5xl md:text-5xl tracking-tight [text-shadow:0_0_20px_rgba(165,231,255,0.4)]">
                            Math
                        </h1>
                        <p className="mt-2 font-body font-light text-on-surface-variant text-lg">
                            Explore the fundamental laws of nature, from the tiniest particles to the vastness of space.
                        </p>
                    </div>
                </div>

                <div className="bg-linear-to-r to-transparent mt-8 from-outline-variant/30 via-outline-variant/10 w-full h-px"></div>
            </div>

            {/* Content Grid */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {mathResourcesData.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={index}
                            href={item.href}
                            className="group relative flex flex-col justify-between bg-[rgba(26,26,39,0.6)] hover:bg-[rgba(41,41,54,0.8)] backdrop-blur-md p-8 border rounded-xl border-outline-variant/15 h-72 transition-all hover:-translate-y-1 duration-300 ease-in-out"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex justify-center items-center bg-primary/10 border border-primary/20 rounded-lg w-10 h-10">
                                        <Icon size={20} className="text-primary" />
                                    </div>
                                    <span className="bg-primary/5 px-3 py-1 border border-primary/10 rounded-full font-label text-[10px] text-primary/70 uppercase tracking-widest">
                                        {item.category}
                                    </span>
                                </div>

                                <h3 className="mb-3 font-headline font-bold text-white text-xl leading-tight">
                                    {item.title}
                                </h3>
                                <p className="font-light text-on-surface-variant text-sm line-clamp-3 leading-snug">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline-variant/10">
                                <div className="flex items-center gap-2 font-light text-on-surface-variant/70 text-xs">
                                    <Clock size={14} />
                                    {item.readTime}
                                </div>
                                <div className="flex items-center gap-2 group-hover:gap-3 font-label font-bold text-primary text-xs uppercase tracking-widest transition-all">
                                    Read <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </main>
    );
}