"use client"
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Users, Cog, Music, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Appbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigationItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: Home,
        },
        {
            title: "Artists",
            href: "/artists",
            icon: Users,
        }, 
        {
            title: "Settings",
            href: "/settings",
            icon: Cog,
        }, 
    ]

    return (
        <div className="w-full mb-4 md:mb-6 sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
            <div className="flex items-center justify-between p-3 md:p-4 max-w-7xl mx-auto">
                {/* Logo/Brand */}
                <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        <span className="hidden sm:inline">Manage Geetkar</span>
                        <span className="sm:hidden">Geetkar</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-2">
                    {navigationItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={cn(
                                    "group flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2.5 rounded-full transition-all duration-300",
                                    isActive 
                                        ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg" 
                                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                                )}>
                                    <Icon className={cn("w-5 h-5 transition-transform", isActive && "animate-pulse")} />
                                    <span className="font-medium text-sm lg:text-base">{item.title}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
                    <nav className="flex flex-col p-3 space-y-1">
                        {navigationItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            const Icon = item.icon;
                            return (
                                <Link 
                                    key={item.href} 
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                                        isActive 
                                            ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-md" 
                                            : "hover:bg-accent text-muted-foreground hover:text-foreground active:scale-95"
                                    )}>
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.title}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            )}
        </div>
    )
}