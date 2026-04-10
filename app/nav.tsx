"use client"

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ShinyButton } from "@/components/shiny-button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconTriangleFilled, IconTriangleInvertedFilled } from "@tabler/icons-react";
import { AnimatePresence, motion as m } from "framer-motion";

const nav = [
    { label: "Home", url: "/" },
    { label: "Achievements", url: "/achievements" },
    {
        label: "Panel",
        dropdown: [
            { label: "Executive Panel", url: "/panel/executive-panel" },
            { label: "Teachers’ Panel", url: "/panel/teachers-panel" },
            { label: "Advisor Panel", url: "/panel/advisor-panel" },
            { label: "Founder Panel", url: "/panel/founder-panel" },
        ],
    },
    { label: "Events", url: "/events" },
    { label: "About", url: "/about" },
    { label: "Resources", url: "/resources" }
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobilePanel, setMobilePanel] = useState<number | null>(null);
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        return scrollY.onChange((y) => {
            setScrolled(y > 80);
        });
    }, [scrollY]);
    const pathname = usePathname();

    const isDropdownActive = (dropdownItems: { url: string }[]) => {
        return dropdownItems.some((item) => pathname === item.url);
    };

    return (
        <>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.25, ease: "easeInOut" }}
                className={`z-50 border transition-all duration-300
                    fixed left-1/2 -translate-x-1/2
                    ${scrolled
                        ? "top-4 w-[90%] max-w-6xl bg-black/50 backdrop-blur-md border-white/20 rounded-full shadow-lg"
                        : "backdrop-blur-xs border-b-white/5 bg-white/1 top-0 w-full border-transparent"
                    }`}
            >
                <div className="flex justify-between items-center mx-auto px-4 w-[90dvw] max-w-6xl">
                    <div className="flex items-center pl-2">
                        <Image src="/logo256x256.png" alt="Logo" width={54} height={54} />
                        <ul className={`hidden lg:flex items-center gap-6 ml-10 font-geist font-medium uppercase tracking-wider ${scrolled ? "py-3" : "py-5"}`}>
                            {nav.map((item, i) => {
                                const isActive = item.dropdown
                                    ? isDropdownActive(item.dropdown)
                                    : pathname === item.url;

                                return item.dropdown ? (
                                    <li className="group relative px-2 py-2" key={i}>
                                        <span
                                            className={`
                                                text-sm font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer
                                                ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}
                                            `}
                                        >
                                            {item.label}
                                        </span>

                                        <motion.ul
                                            initial={false}
                                            className="invisible group-hover:visible top-full left-0 absolute bg-black/50 opacity-0 group-hover:opacity-100 backdrop-blur-md border border-cyan-500/20 border-b-white/5 rounded-xl w-full min-w-55 overflow-hidden transition-all translate-y-2 group-hover:translate-y-0 duration-200 ease-out pointer-events-none group-hover:pointer-events-auto"
                                        >
                                            {item.dropdown.map((d, j) => {
                                                const isChildActive = pathname === d.url;
                                                return (
                                                    <li key={j} className="backdrop-blur-md">
                                                        <Link
                                                            href={d.url}
                                                            className={`
                                                                block px-5 py-3 text-sm font-medium uppercase tracking-widest  transition-colors duration-150
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
                                                text-sm font-medium uppercase tracking-widest  transition-all duration-200
                                                ${isActive ? "text-white" : "text-slate-400 hover:text-white"}
                                            `}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className={`flex items-center space-x-4 ${scrolled ? " py-3" : "py-5"}`}>
                        <Link href="/registration" className="hidden md:block">
                            <ShinyButton
                                className="bg-primary/5 hover:bg-primary/10 backdrop-blur-sm px-6! py-3! rounded-full text-sm! tracking-wide transition-colors"
                            >
                                Join Now
                            </ShinyButton>
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-md focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Mobile menu */}
            {
                mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden z-9999 fixed inset-0 bg-black/30 backdrop-blur-lg">



                        <div className="flex flex-col justify-center items-center space-y-6 h-full font-geist text-lg">
                            <button
                                className="top-6 right-6 absolute p-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            {nav.map((item, i) => {
                                const isActive = item.dropdown
                                    ? isDropdownActive(item.dropdown)
                                    : pathname === item.url;

                                return item.dropdown ? (
                                    <div key={i} className="my-4 text-center">
                                        <button
                                            onClick={() => setMobilePanel(mobilePanel === i ? null : i)}
                                            className={`flex flex-row items-center gap-2 mx-auto font-semibold text-xl ${isActive || mobilePanel === i ? "text-primary" : "text-white"
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
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className={`block my-2 font-medium text-md ${pathname === d.url ? "text-primary" : "text-white"
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
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`my-4 font-semibold text-xl ${isActive ? "text-primary" : "text-white"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )
            }
        </>
    )
}