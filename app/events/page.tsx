import React from 'react';
import { Calendar, MapPin, Clock, ArrowUpRight, ChevronRight, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"; // Ensure path matches your shadcn setup

/** --- TYPES --- **/
type EventStatus = 'upcoming' | 'past' | 'past-special';

interface Event {
    id: number;
    title: string;
    status: EventStatus;
    date: string;
    location: string;
    description: string;
    image: string;
    tag: string;
    time?: string;
    link?: string;
}

/** --- DATA --- **/
const events: Event[] = [
    {
        id: 1,
        title: "Rajuk National SciSpark 3.0",
        status: "past-special",
        date: "02-03 Oct, 2024",
        location: "RUMC Campus",
        description: "Where minds met, ideas sparked, and discoveries flourished—an unforgettable science fest held on 2nd and 3rd October “ Rajuk Nationals SciSpark 3.0” organised by Rajuk College Science Club! After a pause for years ,science takes center stage again with a spark in Rajuk in the heart of Uttara. Rajuk National SciSpark 3.0 is back to exploring the wonders of the universe with over 100 Institutions and more than 4000 students where each and everyone has shown their creativity and Innovations!",
        image: "https://placehold.co/800x600/00d2ff/050510?text=Science+Carnival",
        tag: "National",
        time: "08:00 AM - 05:00 PM"
    },
    {
        id: 2,
        title: "RCSC Present 1st Content Writing",
        status: "past",
        date: "30 Apr, 2023",
        location: "Online",
        description: "The first ever regional content writing screening test aimed at identifying top-tier literary talent within the student community. Participants were judged on creativity, structure, and technical accuracy.",
        image: "https://placehold.co/600x400/111/white?text=Math+Olympiad",
        tag: "Competition"
    },
    {
        id: 3,
        title: "Rajuk Intra Innovative Idea Hunt 2.0",
        status: "past",
        date: "06 Oct, 2024",
        location: "RUMC Premises",
        description: "An intra-college competition focusing on CRISPR, gene editing, and biotechnology solutions. Students presented innovative projects to solve modern biological challenges.",
        image: "https://placehold.co/600x400/111/white?text=Bio+Seminar",
        tag: "Competition"
    }
];

/** --- MODAL COMPONENT --- **/
const EventDetailModal = ({ event, children }: { event: Event; children: React.ReactNode }) => (
    <Dialog>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="z-1001 bg-[#050510]/95 backdrop-blur-2xl p-0 border-white/10 rounded-[2rem] sm:max-w-175 overflow-hidden text-white">
            <div className="relative w-full h-64">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-[#050510] to-transparent" />
            </div>
            <div className="relative p-8 pt-0 max-h-[calc(90dvh-16rem)] overflow-y-auto">
                <div className="flex items-center gap-3 mb-4 font-mono text-cyan-400 text-sm">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                </div>
                <DialogTitle className="mb-4 font-bold text-3xl leading-tight">{event.title}</DialogTitle>
                <div className="flex gap-4 mb-6 font-semibold text-white/50 text-xs uppercase tracking-widest">
                    <span className="bg-white/10 px-3 py-1 rounded-full">{event.tag}</span>
                    <span className="bg-white/10 px-3 py-1 rounded-full">{event.status}</span>
                </div>
                <p className="mb-8 text-white/70 leading-relaxed">{event.description}</p>
                <div className="gap-4 grid grid-cols-2 pt-6 border-white/10 border-t">
                    <div className="flex items-center gap-3 text-white/60">
                        <MapPin className="text-cyan-400" size={20} />
                        <div>
                            <p className="text-[10px] text-white/30 uppercase">Location</p>
                            <p className="text-sm">{event.location}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                        <Clock className="text-cyan-400" size={20} />
                        <div>
                            <p className="text-[10px] text-white/30 uppercase">Time</p>
                            <p className="text-sm">{event.time || "Full Day"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
);

/** --- SUB-COMPONENTS --- **/
const FeaturedEventCard = ({ event }: { event: Event }) => (
    <div className="group relative bg-white/5 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,210,255,0.15)] backdrop-blur-xl mb-12 border border-white/10 rounded-[2rem] w-full overflow-hidden transition-all duration-500">
        <div className="gap-0 grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
            </div>
            <div className="relative flex flex-col justify-center p-8 md:p-12">
                <span className="top-8 right-8 absolute px-3 py-1 border border-white/20 rounded-full font-medium text-[10px] text-white/70 uppercase tracking-wider">
                    {event.tag}
                </span>
                <div className="flex items-center gap-3 mb-4 font-mono text-cyan-400">
                    <Calendar size={18} />
                    <span>{event.date}</span>
                </div>
                <h3 className="mb-4 font-bold text-white text-3xl md:text-5xl leading-tight">
                    {event.title}
                </h3>
                <p className="mb-8 text-white/60 text-lg line-clamp-3 leading-relaxed">
                    {event.description}
                </p>

                <EventDetailModal event={event}>
                    <button className="flex items-center gap-3 bg-white hover:bg-cyan-400 px-8 py-4 rounded-full w-fit font-bold text-black active:scale-95 transition-all">
                        View Details <ArrowUpRight size={20} />
                    </button>
                </EventDetailModal>
            </div>
        </div>
    </div>
);

/** --- MAIN COMPONENT --- **/
export default function EventsPage() {
    const featured = events.filter(e => e.status === 'past-special');
    const upcoming = events.filter(e => e.status === 'upcoming');
    const past = events.filter(e => e.status === 'past');

    return (
        <div className="z-10 relative selection:bg-cyan-500/30 min-h-screen font-sans text-white">
            <div className="-z-10 fixed inset-0 overflow-hidden pointer-events-none">
                <div className="top-0 left-1/4 absolute bg-blue-600/20 blur-[120px] rounded-full w-96 h-96 animate-pulse" />
                <div className="right-1/4 bottom-0 absolute bg-cyan-500/10 blur-[120px] rounded-full w-96 h-96" />
            </div>

            <div className="mx-auto px-6 py-24 max-w-6xl container">
                <div className="mb-16">
                    <h1 className="mb-4 font-black text-white text-6xl md:text-8xl tracking-tighter">Events</h1>
                    <div className="bg-cyan-500 rounded-full w-20 h-1" />
                </div>

                {/* FEATURED */}
                {featured.length > 0 && (
                    <div className="mb-20">
                        <h2 className="flex items-center gap-2 mb-8 font-bold text-cyan-400 text-sm uppercase tracking-widest">
                            <span className="bg-cyan-400 rounded-full w-2 h-2 animate-ping" />
                            Featured Highlights
                        </h2>
                        {featured.map(event => <FeaturedEventCard key={event.id} event={event} />)}
                    </div>
                )}

                {/* UPCOMING */}
                {upcoming.length > 0 && (
                    <div className="z-10 relative gap-12 grid md:grid-cols-12 mb-20">
                        <div className="md:col-span-4">
                            <h2 className="mb-4 font-bold text-3xl">Upcoming</h2>
                            <p className="text-white/50">Experience the future of innovation.</p>
                        </div>
                        <div className="gap-4 grid md:col-span-8">
                            {upcoming.map((event) => (
                                <EventDetailModal key={event.id} event={event}>
                                    <div className="group flex md:flex-row flex-col items-start md:items-center gap-6 bg-white/5 hover:bg-white/10 p-6 border border-white/5 rounded-3xl transition-all cursor-pointer">
                                        <div className="flex md:flex-col justify-center items-center bg-white/5 border border-white/10 rounded-2xl w-16 md:w-20 h-16 md:h-20 shrink-0">
                                            <span className="block font-bold text-xl">{event.date.split(' ')[0]}</span>
                                            <span className="text-white/50 text-xs uppercase">{event.date.split(' ')[1]}</span>
                                        </div>
                                        <div className="grow">
                                            <h3 className="font-bold group-hover:text-cyan-400 text-xl transition-colors">{event.title}</h3>
                                            <p className="text-white/40 text-sm line-clamp-1">{event.location}</p>
                                        </div>
                                        <div className="group-hover:bg-white p-4 border border-white/10 rounded-full group-hover:text-black transition-all">
                                            <ArrowUpRight size={20} />
                                        </div>
                                    </div>
                                </EventDetailModal>
                            ))}
                        </div>
                    </div>
                )}

                {/* PAST */}
                {past.length > 0 && (
                    <div className="z-10 relative pt-10 border-white/10 border-t">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="font-bold text-white/80 text-2xl">Past Events</h2>
                        </div>
                        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {past.map((event) => (
                                <EventDetailModal key={event.id} event={event}>
                                    <div className="group bg-white/2 hover:bg-white/5 p-6 border border-white/5 rounded-3xl transition-all hover:-translate-y-1 cursor-pointer">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] text-white/40 uppercase">{event.tag}</span>
                                            <span className="font-mono text-white/30 text-sm">{event.date}</span>
                                        </div>
                                        <h3 className="font-bold text-white/80 group-hover:text-white text-lg leading-snug">{event.title}</h3>
                                    </div>
                                </EventDetailModal>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}