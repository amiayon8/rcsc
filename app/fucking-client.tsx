"use client"

import { ProgressLoader } from 'nextjs-progressloader';
import { useEffect } from 'react';
import { usePathname } from "next/navigation";

export default ProgressLoader;

export function ClientWorks() {
    const pathname = usePathname();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll(".reveal");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [pathname]);

    return <></>;
}
