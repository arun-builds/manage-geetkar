"use client"
import { deleteTransaction } from "@/app/actions/deleteTransaction";
import { Status, Transaction } from "@/generated/prisma";
import { ArrowUpRight, CircleArrowOutUpRight, Trash2, X } from "lucide-react";
import Link from "next/link";

export default function TransactionBar({ transaction }: { transaction: Transaction }) {



    const finalTransactionNumber = transaction.in == 0 ? transaction.out : transaction.in;
    const finalTransactionColor = transaction.in == 0 ? "text-red-400" : "text-green-400";

    function handleDelete(){
        const deleteTransactionWithTransactionId = deleteTransaction(transaction.id, transaction.songId);
    }
    


    return (

        <div className="p-6 border w-2/3 mx-auto rounded-lg bg-card hover:bg-primary/10  flex items-center justify-between relative">

            <span className={` w-1/3  text-start ${finalTransactionColor}`}>${finalTransactionNumber}</span>


            <span className={`w-1/3   flex  justify-center  items-center gap-2 `}>

                {transaction.createdAt.toLocaleDateString()}
            </span>




            <span className="w-1/3  flex justify-end  ">

                {transaction.purpose}

            </span>

            <div className="absolute -right-5 -top-1  ">
                <X size={16} className="bg-red-400 p-0.5 rounded-full hover:cursor-pointer" onClick={handleDelete} />
                
            </div>

        </div>
    )
}



// 📄 SongBar.tsx
// status is the string key!

// Use it: <span className={metadata.color}>{metadata.text}</span>