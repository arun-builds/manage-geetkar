import { Status } from "@/generated/prisma";
import { ArrowUpRight, CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function SongBar({ name, status, songId }: { name: string, status: Status, songId: number }) {

    const StatusMetadata: any = {
        [Status.To_Be_Released]: { text: "To Be Released", color: "text-blue-400", bgColor: "bg-blue-400" },
        [Status.In_Process]: { text: "In Process", color: "text-yellow-400", bgColor: "bg-yellow-400" },
        [Status.Released]: { text: "Released", color: "text-green-500", bgColor: "bg-green-400" },
        // ...
    }

    const metadata = StatusMetadata[status];
    console.log(metadata.text);


    return (
        <div className="p-6 border w-2/3 mx-auto rounded-lg bg-card hover:bg-primary/10  flex items-center justify-between">

            <span className="flex-1 text-start">{name}</span>


            <span className={`${metadata.color} flex-1  flex  items-center gap-2`}>
                <div className={`${metadata.bgColor} p-1.5 rounded-full`}></div>
                {metadata.text}
            </span>


             <Link href={`/finances/${songId}`}>
                <span className=" flex justify-center  ">
                   
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