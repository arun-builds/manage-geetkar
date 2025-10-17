"use client"
import { Music, Mic2, Radio } from "lucide-react";
import { useState } from "react";

export default function ArtistCard({name, songCount}:{name:string, songCount?: number}) {
    const [isHovered, setIsHovered] = useState(false);

    // Random gradient for each artist card
    const gradients = [
        "from-purple-500/20 to-pink-500/20",
        "from-blue-500/20 to-cyan-500/20",
        "from-green-500/20 to-emerald-500/20",
        "from-orange-500/20 to-red-500/20",
        "from-indigo-500/20 to-purple-500/20",
        "from-yellow-500/20 to-orange-500/20",
    ];
    
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

    return(
        <div 
            className={`h-64 sm:h-72 w-full p-4 sm:p-6 rounded-2xl shadow-lg border border-border relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br ${randomGradient} backdrop-blur-sm touch-manipulation`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Decorative music icon */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-20">
                <Mic2 size={40} className="text-foreground sm:w-12 sm:h-12" />
            </div>

            {/* Album art placeholder */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center backdrop-blur-md border-2 border-border">
                <Music size={40} className={`sm:w-12 sm:h-12 text-foreground transition-transform duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`} />
            </div>

            {/* Artist info */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-card/95 via-card/80 to-transparent p-3 sm:p-4 flex flex-col justify-end">
                <h2 className="text-lg sm:text-xl font-bold mb-1 truncate">{name}</h2>
                {songCount !== undefined && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                        <Radio size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span>{songCount} {songCount === 1 ? 'song' : 'songs'}</span>
                    </div>
                )}
            </div>

            {/* Hover effect overlay */}
            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
            )}
        </div>
    )
}