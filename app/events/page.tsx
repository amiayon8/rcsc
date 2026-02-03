import React from 'react';
import { Calendar, MapPin, Clock, ArrowUpRight, ChevronRight } from 'lucide-react';

const events = [
    {
        id: 1,
        title: "National Science Carnival 2026",
        status: "upcoming",
        date: "15-17 Mar '26",
        time: "08:00 AM",
        location: "RUMC Campus",
        description: "The biggest science gathering of the year. Project displays, robotics, and the mega quiz.",
        image: "https://placehold.co/800x600/00d2ff/050510?text=Science+Carnival",
        tag: "Flagship"
    },
    {
        id: 2,
        title: "Astro-Physics Workshop",
        status: "upcoming",
        date: "28 Feb '26",
        time: "02:00 PM",
        location: "Physics Lab",
        description: "Deep dive into black holes and relativity.",
        image: "https://placehold.co/600x400/0055ff/white?text=Workshop",
        tag: "Workshop"
    },
    {
        id: 3,
        title: "Math Olympiad Selection",
        status: "past",
        date: "10 Jan '26",
        location: "Auditorium",
        description: "Screening test for the regional team.",
        image: "https://placehold.co/600x400/111/white?text=Math+Olympiad",
        tag: "Selection"
    },
    {
        id: 4,
        title: "Bio-Genetics Seminar",
        status: "past",
        date: "05 Dec '25",
        location: "Bio Lab",
        description: "Understanding CRISPR and gene editing.",
        image: "https://placehold.co/600x400/111/white?text=Bio+Seminar",
        tag: "Seminar"
    }
];

export default function EventsPage() {
    const featured = events[0]; // Assuming the first one is the big one
    const upcoming = events.slice(1).filter(e => e.status === 'upcoming');
    const past = events.filter(e => e.status === 'past');

    return (
        <div className="bg-[#050510] selection:bg-cyan-500/30 min-h-screen text-white">

            {/* Background Gradients for Glass Effect */}
            <div className="-z-10 fixed inset-0 overflow-hidden pointer-events-none">
                <div className="top-0 left-1/4 absolute bg-blue-600/20 blur-[120px] rounded-full w-125 h-125 animate-pulse mix-blend-screen"></div>
                <div className="right-1/4 bottom-0 absolute bg-cyan-500/10 blur-[120px] rounded-full w-125 h-125 mix-blend-screen"></div>
            </div>

            <div className="mx-auto px-6 py-24 max-w-6xl container">

                {/* --- PAGE HEADER --- */}
                <div className="mb-16">
                    <h1 className="mb-4 font-black text-white text-6xl md:text-8xl tracking-tighter">
                        Events
                    </h1>
                    <div className="bg-cyan-500 rounded-full w-20 h-1"></div>
                </div>

                {/* --- FEATURED EVENT (The Big Glass Card) --- */}
                <div className="mb-20">
                    <h2 className="flex items-center gap-2 mb-6 font-bold text-cyan-400 text-sm uppercase tracking-widest">
                        <span className="bg-cyan-400 rounded-full w-2 h-2 animate-ping"></span>
                        Next Big Event
                    </h2>

                    <div className="group relative bg-white/5 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,210,255,0.15)] backdrop-blur-xl border border-white/10 rounded-[2rem] w-full overflow-hidden transition-all duration-500">
                        <div className="gap-0 grid md:grid-cols-2">
                            {/* Image Side */}
                            <div className="relative h-64 md:h-auto overflow-hidden">
                                <div className="md:hidden z-10 absolute inset-0 bg-linear-to-t from-[#050510] via-transparent to-transparent"></div>
                                <img
                                    src={featured.image}
                                    alt={featured.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Content Side */}
                            <div className="relative flex flex-col justify-center p-8 md:p-12">
                                <span className="top-8 right-8 absolute px-3 py-1 border border-white/20 rounded-full font-medium text-white/70 text-xs uppercase tracking-wider">
                                    {featured.tag}
                                </span>

                                <div className="flex items-center gap-3 mb-4 font-mono text-cyan-400">
                                    <Calendar size={18} />
                                    <span>{featured.date}</span>
                                </div>

                                <h3 className="mb-4 font-bold text-white text-3xl md:text-5xl leading-tight">
                                    {featured.title}
                                </h3>

                                <p className="mb-8 text-white/60 text-lg leading-relaxed">
                                    {featured.description}
                                </p>

                                <div className="flex items-center gap-6 mb-8 font-medium text-white/50 text-sm">
                                    <div className="flex items-center gap-2"><Clock size={16} /> {featured.time}</div>
                                    <div className="flex items-center gap-2"><MapPin size={16} /> {featured.location}</div>
                                </div>

                                <button className="flex items-center gap-3 bg-white hover:bg-cyan-400 px-8 py-4 rounded-full w-fit font-bold text-black transition-colors">
                                    Register Now <ArrowUpRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- UPCOMING LIST --- */}
                <div className="gap-12 grid md:grid-cols-12 mb-20">
                    <div className="md:col-span-4">
                        <h2 className="mb-4 font-bold text-3xl">Upcoming Events</h2>
                        <p className="text-white/50">Don't miss out on what's coming next.</p>
                    </div>

                    <div className="gap-4 grid md:col-span-8">
                        {upcoming.map((event) => (
                            <div key={event.id} className="group flex md:flex-row flex-col items-start md:items-center gap-6 bg-white/5 hover:bg-white/10 backdrop-blur-md p-6 border border-white/5 rounded-3xl transition-all">

                                {/* Date Badge */}
                                <div className="flex md:flex-col justify-center items-center bg-white/5 border border-white/10 rounded-2xl w-16 md:w-20 h-16 md:h-20 text-center shrink-0">
                                    <span className="block font-bold text-white text-xl">{event.date.split(' ')[0]}</span>
                                    <span className="text-white/50 text-xs uppercase">{event.date.split(' ')[1]}</span>
                                </div>

                                <div className="grow">
                                    <h3 className="mb-1 font-bold group-hover:text-cyan-400 text-xl transition-colors">{event.title}</h3>
                                    <p className="mb-2 text-white/50 text-sm line-clamp-1">{event.description}</p>
                                    <div className="flex gap-4 font-mono text-white/40 text-xs">
                                        <span>{event.time}</span>
                                        <span>•</span>
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <button className="hover:bg-cyan-500 p-4 border border-white/10 hover:border-cyan-500 rounded-full hover:text-black transition-all shrink-0">
                                    <ArrowUpRight size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- PAST EVENTS --- */}
                <div className="z-10 relative pt-10 border-white/10 border-t">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="font-bold text-white/80 text-2xl">Past Events</h2>
                        <button className="flex items-center gap-2 text-cyan-400 text-sm hover:underline">View Full Archive <ChevronRight size={16} /></button>
                    </div>

                    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {past.map((event) => (
                            <div key={event.id} className="group bg-white/2 hover:bg-white/5 p-6 border border-white/5 rounded-3xl transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-white/40 uppercase tracking-wider">
                                        {event.tag}
                                    </span>
                                    <span className="font-mono text-white/30 text-sm">{event.date}</span>
                                </div>
                                <h3 className="mb-2 font-bold text-white/80 group-hover:text-white text-lg">{event.title}</h3>
                                <p className="text-white/40 text-sm">{event.location}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}