"use client"
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Home, User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Appbar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigationItems = [
        {
            title: "Dashbooard",
            href: "/dashboard",
            icon: Home,
        },
        {
            title: "Artists",
            href: "/artists",
            icon: User,
        },
        {
            title: "Finances",
            href: "/finances",
            icon: MessageSquare,
        },
    ]

    return (
        <div className="w-full  p-2 flex items-center justify-center">

            <nav className="flex items-center justify-center gap-10 ">
                {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={cn("flex items-center justify-center gap-3 w-40 h-10", isActive?"p-2 rounded-lg bg-yellow-500":"")}>
                                <Icon className={cn("w-5 h-5", isActive ? "text-black" : "text-gray-500 group-hover:text-gray-700")} />
                                {!isCollapsed && <span className="font-medium hover:scale-105 transition-all duration-300">{item.title}</span>}
                            </div>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}