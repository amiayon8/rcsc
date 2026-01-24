"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IconTriangleFilled, IconTriangleInvertedFilled } from "@tabler/icons-react";

const nav = [
    { label: "HOME", url: "/" },
    { label: "ACHIEVEMENTS", url: "/achievements" },
    {
        label: "PANEL",
        dropdown: [
            { label: "Executive Panel", url: "/panel/executive-panel" },
            { label: "Teachers’ Panel", url: "/panel/teachers-panel" },
            { label: "Advisor Panel", url: "/panel/advisor-panel" },
        ],
    },
    { label: "JOIN NOW", url: "/registration", className: "nav-btn" },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [mobilePanel, setMobilePanel] = useState<number | null>(null);
    const pathname = usePathname();

    const isDropdownActive = (dropdownItems: { url: string }[]) => {
        return dropdownItems.some((item) => pathname === item.url);
    };

    return (
        <>
            <header className="top-0 z-1000 fixed bg-[rgba(5,5,16,0.9)] backdrop-blur-xl border-cyan-500/20 border-b w-full">
                <div className="mx-auto px-5 max-w-6xl">
                    <nav className="flex justify-between items-center py-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/logo256x256.png" alt="Logo" width={48} height={48} />
                            <div className="flex flex-col gap-1 uppercase leading-none">
                                <span className="font-bold text-base leading-none tracking-wide">Rajuk College</span>
                                <span className="font-bold text-lg leading-none tracking-wide">Science Club</span>
                            </div>
                        </Link>

                        <ul className="hidden md:flex items-center gap-6 font-black tracking-wider">
                            {nav.map((item, i) => {
                                const isActive = item.dropdown
                                    ? isDropdownActive(item.dropdown)
                                    : pathname === item.url;

                                return item.dropdown ? (
                                    <li className="group relative px-2 py-2" key={i}>
                                        <span
                                            className={`
                                                text-[0.9rem] uppercase transition-colors duration-200 cursor-pointer
                                                ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}
                                            `}
                                        >
                                            {item.label}
                                        </span>

                                        <motion.ul
                                            initial={false}
                                            className="invisible group-hover:visible top-full left-0 absolute bg-[rgba(5,5,16,0.95)] opacity-0 group-hover:opacity-100 backdrop-blur border border-cyan-500/20 rounded-xl min-w-55 transition-all translate-y-2 group-hover:translate-y-0 duration-200 ease-out pointer-events-none group-hover:pointer-events-auto"
                                        >
                                            {item.dropdown.map((d, j) => {
                                                const isChildActive = pathname === d.url;
                                                return (
                                                    <li key={j}>
                                                        <Link
                                                            href={d.url}
                                                            className={`
                                                                block px-5 py-3 text-sm uppercase transition-colors duration-150
                                                                ${isChildActive
                                                                    ? "text-white bg-cyan-500/20"
                                                                    : "text-slate-400 hover:text-white hover:bg-cyan-500/10"
                                                                }
                                                            `}
                                                        >
                                                            {d.label}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </motion.ul>
                                    </li>
                                ) : (
                                    <li key={i}>
                                        <Link
                                            href={item.url}
                                            className={`
                                                text-[0.9rem] uppercase transition-all duration-200
                                                ${item.className ? item.className : isActive ? "text-white" : "text-slate-400 hover:text-white"}
                                            `}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <button onClick={() => setMenuOpen(true)} className="md:hidden flex flex-col gap-1">
                            <span className="bg-primary rounded w-7 h-0.75" />
                            <span className="bg-primary rounded w-7 h-0.75" />
                            <span className="bg-primary rounded w-7 h-0.75" />
                        </button>
                    </nav>
                </div>
            </header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4 }}
                        className="z-1050 fixed inset-0 flex flex-col justify-center items-center bg-[#050510]"
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="top-6 right-6 absolute font-black text-primary text-3xl"
                        >
                            ×
                        </button>

                        {nav.map((item, i) => {
                            const isActive = item.dropdown
                                ? isDropdownActive(item.dropdown)
                                : pathname === item.url;

                            return item.dropdown ? (
                                <div key={i} className="my-4 text-center">
                                    <button
                                        onClick={() => setMobilePanel(mobilePanel === i ? null : i)}
                                        className={`flex flex-row items-center gap-2 mx-auto font-black text-2xl uppercase ${isActive || mobilePanel === i ? "text-primary" : "text-white"
                                            }`}
                                    >
                                        {item.label} {mobilePanel === i ? (
                                            <IconTriangleFilled className="size-5" />
                                        ) : (
                                            <IconTriangleInvertedFilled className="size-5" />
                                        )}
                                    </button>

                                    <AnimatePresence>
                                        {mobilePanel === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                {item.dropdown.map((d, j) => (
                                                    <Link
                                                        key={j}
                                                        href={d.url}
                                                        onClick={() => setMenuOpen(false)}
                                                        className={`block my-3 font-black text-lg uppercase ${pathname === d.url ? "text-primary" : "text-white"
                                                            }`}
                                                    >
                                                        {d.label}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link
                                    key={i}
                                    href={item.url}
                                    onClick={() => setMenuOpen(false)}
                                    className={`my-4 font-black text-2xl ${isActive ? "text-primary" : "text-white"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}