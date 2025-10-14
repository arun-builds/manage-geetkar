import { Status } from "@/generated/prisma";
import { ArrowUpRight, CircleArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export default function TransactionBar() {

    

    


    return (
        <div className="p-6 border w-2/3 mx-auto rounded-lg bg-card hover:bg-primary/10  flex items-center justify-between">

            <span className="flex-1 text-start">{"name"}</span>


            <span className={`metadata.color flex-1  flex  items-center gap-2`}>
                <div className={`metadata.bgColor p-1.5 rounded-full`}></div>
                {"metadata.text"}
            </span>


            
                <span className=" flex justify-center  ">
                   
                    {"metadata.text"}
                     
                </span>
           
        </div>
    )
}



// 📄 SongBar.tsx
// status is the string key!

// Use it: <span className={metadata.color}>{metadata.text}</span>