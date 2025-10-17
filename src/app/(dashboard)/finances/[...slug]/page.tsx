import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/database";
import {  Song, Transaction } from "@/generated/prisma"
import {  Plus, Lock } from "lucide-react";
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
import TransactionBar from "@/components/TransactionBar";
import { createTransaction } from "@/actions/createTransaction";
import { checkRole } from "@/actions/checkRole";

export default async function FinancePage ({params}: {params: Promise<{ slug: string }>}) {

    const {slug} = await params;
    const songId = parseInt(slug);

    
    const userIsAdmin = await checkRole();
    
    
    if (!userIsAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Lock size={64} className="text-muted-foreground" />
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="text-muted-foreground">You need admin privileges to view financial information.</p>
            </div>
        );
    }



    type SongWithTransactions = Song & {
        transactions: Transaction[]
    }

    let songWithTransaction: SongWithTransactions | null = null;
    const totalTransaction = {
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
        <div className="space-y-8">
            {/* Header Section */}
            <div className=" rounded-xl md:p-4 shadow-sm">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    {/* Song Info */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2">{songWithTransaction.name}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">Financial Overview</span>
                            <div className={`${totalTransaction.color} text-3xl font-bold flex items-center gap-2`}>
                                
                                ₹{Math.abs(totalTransaction.total).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* <button className="p-2 px-4 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
                            <ArrowDownWideNarrow size={18} />
                            <span className="hidden sm:inline">Sort</span>
                        </button> */}
                        {/* <Link href={"export"} className="p-2 px-4 border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2">
                            <ArrowUpRight size={18} />
                            <span className="hidden sm:inline">Export</span>
                        </Link> */}
                        
                        {/* Create Transaction Dialog */}
                        <Dialog>
                            <DialogTrigger className="flex items-center gap-2 p-2 px-6 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-md">
                                <Plus size={20} />
                                New Transaction
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create a Transaction</DialogTitle>
                                    <DialogDescription>
                                        Add income or expense for {songWithTransaction.name}
                                    </DialogDescription>
                                </DialogHeader>
                                <form action={addTransactionWithSongId} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="type" className="text-sm font-medium">Transaction Type</label>
                                        <Select name="type">
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="in">Income</SelectItem>
                                                <SelectItem value="out">Expense</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="amount" className="text-sm font-medium">Amount (₹)</label>
                                        <Input name="amount" type="number" step="0.01" placeholder="0.00" required />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="purpose" className="text-sm font-medium">Purpose</label>
                                        <Input name="purpose" type="text" placeholder="e.g., Studio recording" required />
                                    </div>

                                    <DialogFooter>
                                        <Button type="submit" className="w-full">
                                            Create Transaction
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            {songWithTransaction.transactions.length > 0 ? (
                <div className="w-full flex flex-col items-center gap-6">
                    <h2 className="text-2xl font-bold self-start">Transaction History</h2>
                    {songWithTransaction.transactions.map((transaction) => (
                        <div key={transaction.id} className="w-full">
                            <TransactionBar transaction={transaction} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
                    <p className="text-xl mb-2">No transactions yet</p>
                    <p className="text-sm">Create your first transaction to start tracking finances</p>
                </div>
            )}
        </div>
    );
}