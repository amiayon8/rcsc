import StarfieldCanvas from "@/components/starFieldCanvas";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <StarfieldCanvas />
            {children}
        </>
    );
}