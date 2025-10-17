import { Status } from "@/generated/prisma";
import { CircleArrowOutUpRight, Lock, Music } from "lucide-react";
import Link from "next/link";

interface StatusDetail {
    text: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

export default function SongBar({ name, status, songId, isAdmin }: { name: string, status: Status, songId: number, isAdmin?: boolean }) {

    

    const StatusMetadata: Record<Status, StatusDetail> = {
        [Status.To_Be_Released]: { 
            text: "To Be Released", 
            color: "text-red-400", 
            bgColor: "bg-red-400",
            borderColor: "border-red-400/20"
        },
        [Status.In_Process]: { 
            text: "In Process", 
            color: "text-yellow-400", 
            bgColor: "bg-yellow-400",
            borderColor: "border-yellow-400/20"
        },
        [Status.Released]: { 
            text: "Released", 
            color: "text-green-500", 
            bgColor: "bg-green-400",
            borderColor: "border-green-400/20"
        },
    }

    const metadata = StatusMetadata[status];


    return (
        <div className="group p-4 md:p-6 border border-border w-full mx-auto rounded-xl bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
            {/* Song Name */}
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0 w-full sm:w-auto">
                <div className="bg-primary/10 text-primary p-1.5 md:p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                    <Music size={18} className="md:w-5 md:h-5" />
                </div>
                <span className="text-base md:text-lg font-semibold truncate">{name}</span>
            </div>

            {/* Status Badge */}
            <div className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border ${metadata.borderColor} ${metadata.color} bg-gradient-to-r ${metadata.bgColor}/10 backdrop-blur-sm flex-shrink-0`}>
                <div className={`${metadata.bgColor} p-1 md:p-1.5 rounded-full animate-pulse`}></div>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">{metadata.text}</span>
            </div>

            {/* Action Button */}
            {isAdmin ? (
                <Link href={`/finances/${songId}`} className="w-full sm:w-auto flex-shrink-0">
                    <div className="flex justify-end">
                        <span className="flex items-center gap-1.5 md:gap-2 p-2 px-4 md:px-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center text-sm md:text-base touch-manipulation">
                            <span className="font-medium">Transactions</span>
                            <CircleArrowOutUpRight className="text-center w-4 h-4 md:w-4 md:h-4" />
                        </span>
                    </div>
                </Link>
            ) : (
                <div className="w-full sm:w-auto flex justify-end flex-shrink-0">
                    <span className="flex items-center gap-1.5 md:gap-2 p-2 px-4 md:px-5 bg-muted/50 text-muted-foreground rounded-full cursor-not-allowed border border-border w-full sm:w-auto justify-center text-xs md:text-sm">
                        <Lock size={12} className="md:w-3.5 md:h-3.5" />
                        <span>Admin Only</span>
                    </span>
                </div>
            )}
        </div>
    )
}