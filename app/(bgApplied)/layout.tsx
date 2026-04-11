import StarfieldCanvas from "@/components/starFieldCanvas";
import { Component } from "@/components/grid-background";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative w-full h-full" >

            <Component />
            {children}
        </div>
    );
}