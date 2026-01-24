'use client';

import Link from 'next/link';
import { Home, Radio } from 'lucide-react';

export default function NotFound() {
    return (
        <main className="relative flex flex-col justify-center items-center bg-black p-4 w-full min-h-screen overflow-hidden text-white">

            {/* 2. Content Container */}
            <div className="z-10 relative space-y-8 px-4 max-w-2xl text-center">

                {/* Glitchy 404 Header */}
                <div className="relative">
                    <h1 className="z-10 relative bg-clip-text bg-gradient-to-b from-white to-slate-800 font-black text-[9rem] text-transparent md:text-[12rem] leading-none tracking-tighter select-none">
                        404
                    </h1>
                    {/* Decorative blurred glow behind the number */}
                    <div className="absolute inset-0 bg-cyan-500 opacity-20 blur-3xl rounded-full" />
                </div>

                {/* Narrative Text */}
                <div className="space-y-4 bg-black/30 shadow-2xl backdrop-blur-md p-8 border border-white/5 rounded-2xl">
                    <div className="flex justify-center items-center gap-2 mb-2 text-cyan-400">
                        <Radio className="w-5 h-5 animate-pulse" />
                        <span className="font-mono text-sm uppercase tracking-widest">Signal Lost</span>
                    </div>

                    <h2 className="font-bold text-slate-100 text-3xl md:text-4xl">
                        Houston, we have a problem.
                    </h2>

                    <p className="mx-auto max-w-lg text-slate-400 text-lg md:text-xl leading-relaxed">
                        The coordinates you are looking for seem to have drifted into a black hole.
                        This sector of the galaxy is unexplored.
                    </p>
                </div>

                {/* Action Button */}
                <div className="flex justify-center pt-4">
                    <Link
                        href="/"
                        className="group inline-flex relative justify-center items-center gap-3 bg-white hover:bg-cyan-50 px-8 py-4 rounded-full font-bold text-black active:scale-95 transition-transform"
                    >
                        <Home className="w-5 h-5" />
                        <span>Return to Base</span>

                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-full ring-4 ring-white/30 group-hover:ring-cyan-400/50 transition-all duration-500" />

                        {/* Rocket Exhaust Particles (CSS Only decoration) */}
                        <div className="-bottom-2 left-1/2 absolute bg-cyan-400 opacity-0 group-hover:opacity-40 blur-xl w-3/4 h-10 transition-opacity -translate-x-1/2 duration-300" />
                    </Link>
                </div>

            </div>

            {/* 3. Decorative HUD Elements (Corner decorations) */}
            <div className="hidden md:block top-8 left-8 absolute font-mono text-white/20 text-xs">
                <div>SYS.STATUS: CRITICAL</div>
                <div>LOC: UNKNOWN SECTOR</div>
            </div>

            <div className="hidden md:block right-8 bottom-8 absolute font-mono text-white/20 text-xs text-right">
                <div>ERR_CODE: 0x404</div>
                <div>TRY_RECONNECT...</div>
            </div>

        </main>
    );
}