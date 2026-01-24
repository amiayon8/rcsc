import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Send
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="z-10 relative bg-black border-t">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 container">
                <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
                    {/* Brand Section */}
                    <div className="mb-8 lg:mb-0">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image src="/logo256x256.png" alt="Logo" width={48} height={48} />
                            <div className="flex flex-col gap-1 uppercase leading-none">
                                <span className="font-bold text-lg leading-none tracking-wider">Rajuk College</span>
                                <span className="font-bold text-lg leading-none tracking-wider">Science Club</span>
                            </div>
                        </Link>
                        <p className="mb-6 max-w-xs text-muted-foreground text-sm">
                            Igniting minds, exploring the cosmos, and grabbing beyond the infinity.
                        </p>
                        <div className="flex space-x-4">
                            <Link target="_blank" href="https://www.facebook.com/science.rumc" className="rounded-full w-9 h-9">
                                <Facebook className="w-4 h-4" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link target="_blank" href="https://www.instagram.com/science.rumc" className="rounded-full w-9 h-9">
                                <Instagram className="w-4 h-4" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Links</h3>
                        <ul className="space-y-3 text-muted-foreground text-sm">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/executive-panel" className="hover:text-primary transition-colors">Executive Panel</Link></li>
                            <li><Link href="/teachers-panel" className="hover:text-primary transition-colors">Teachers' Panel</Link></li>
                            <li><Link href="/advisor-panel" className="hover:text-primary transition-colors">Advisor Panel</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Stay Updated</h3>
                        <p className="mb-4 text-muted-foreground text-sm">
                            Subscribe to our newsletter for the latest updates and offers.
                        </p>
                        <form className="flex flex-col gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-background"
                            />
                            <Button type="submit" className="w-full">
                                Subscribe <Send className="ml-2 w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex md:flex-row flex-col justify-between items-center gap-4 text-muted-foreground text-sm">
                    <p>© {new Date().getFullYear()} Rajuk College Science Club. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}