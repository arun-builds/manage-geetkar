import SongBar from "@/components/SongBar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/database";
import { Artist, Status, Song, Transaction } from "@/generated/prisma"
import { ArrowDownWideNarrow, ArrowUpRight, Plus, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { revalidatePath } from "next/cache";
import TransactionBar from "@/components/TransactionBar";
import Link from "next/link";
import { createTransaction } from "@/app/actions/createTransaction";

export default async function ({ params }: { params: { songId: string[] } }) {
    const param = await params;
    const songId = parseInt(param.songId[0]);
    console.log(songId);



    type SongWithTransactions = Song & {
        transactions: Transaction[]
    }

    let songWithTransaction: SongWithTransactions | null = null;
    let totalTransaction = {
        "total": 0,
        "color": ""
    };

    try {
        const response = await prisma.song.findUnique({
            where: {
                id: songId
            },
            include: {
                transactions: {
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                
            },
            
        }
    
    )

        songWithTransaction = response as SongWithTransactions | null;

        const songTotal = await prisma.transaction.aggregate({
            where: {
                songId
            },
            _sum: {
                in: true,
                out: true
            }
        })

        totalTransaction.total = (songTotal._sum.in || 0) - (songTotal._sum.out || 0);
        totalTransaction.color = (songTotal._sum.in || 0) > (songTotal._sum.out || 0) ? "text-green-400" : "text-red-400"



    } catch (e) {

        console.error(e);
    }
    if (!songWithTransaction) {
        return (
            <div>Song Not Found</div>
        )
    }

    const addTransactionWithSongId = createTransaction.bind(null, songId);

    


    return (
        <div>
            <div className="flex items-center justify-between w-full ">
                <div className="flex  items-end jus gap-10">
                    <h1 className="text-4xl italic ">{songWithTransaction.name}</h1>
                    <span className={`${totalTransaction.color} text-2xl text-end w-full`}>${totalTransaction.total}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="flex"><ArrowDownWideNarrow /></span>
                    <Link href={"export"} className="flex"><ArrowUpRight /></Link>
                    <Dialog>
                        <DialogTrigger className="flex items-center gap-1 p-1.5 px-6 bg-white text-black rounded-full" >Transaction
                            <Plus className="text-sm font-extralight" size={16}/>
                        </DialogTrigger>
                        <DialogContent className="">
                            <DialogHeader>
                                <DialogTitle>Create a Transaction</DialogTitle>
                                {/* <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription> */}
                            </DialogHeader>
                            <form action={addTransactionWithSongId} className="flex flex-col gap-2">
                                
                                
                                <Select name="type">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="in">In</SelectItem>
                                        <SelectItem value="out">Out</SelectItem>
                                    </SelectContent>
                                </Select>

                                <label htmlFor="amount" >Amount</label>
                                <Input name="amount" type="number"/>
                                <label htmlFor="purpose" >Purpose</label>
                                <Input name="purpose" type="text"/>
                                <DialogFooter>

                                    <Button type="submit" className="mt-2">
                                        Create
                                    </Button>
                                </DialogFooter>
                            </form>

                        </DialogContent>


                    </Dialog>
                    
                </div>
            </div>
            <div className="w-full flex flex-col items-center gap-8 pt-12">
                {songWithTransaction.transactions.map((transaction) => (
                    <div key={transaction.id} className="w-full">
                        <TransactionBar transaction={transaction} />
                        
                    </div>
                ))}
            </div>
        </div>
    );
}