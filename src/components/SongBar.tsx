import { Status } from "@/generated/prisma";
import { ArrowUpRight, CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function SongBar({ name, status, songId }: { name: string, status: Status, songId: number }) {

    const StatusMetadata: any = {
        [Status.To_Be_Released]: { text: "To Be Released", color: "text-red-400", bgColor: "bg-red-400" },
        [Status.In_Process]: { text: "In Process", color: "text-yellow-400", bgColor: "bg-yellow-400" },
        [Status.Released]: { text: "Released", color: "text-green-500", bgColor: "bg-green-400" },
        // ...
    }

    const metadata = StatusMetadata[status];


    return (
        <div className="p-6 border w-2/3 mx-auto rounded-lg bg-card hover:bg-primary/10  flex items-center justify-between">

            <span className="w-1/3  text-start">{name}</span>


            <span className={`${metadata.color} w-1/3  flex  items-center justify-start  gap-2 pl-12`}>
                <div className={`${metadata.bgColor} p-1.5 rounded-full `}></div>
                {metadata.text}
            </span>


             <Link href={`/finances/${songId}`} className="w-1/3">
                <span className=" flex justify-end  ">
                   
                    <span className={` flex items-center gap-2 p-0.5 px-4 bg-white text-black rounded-full hover:cursor-pointer hover:bg-white/90`}>
                        Transactions
                        <CircleArrowOutUpRight className="text-center" size={12} />
                    </span>
                     
                </span>
           </Link>
        </div>
    )
}



// 📄 SongBar.tsx
// status is the string key!

// Use it: <span className={metadata.color}>{metadata.text}</span>