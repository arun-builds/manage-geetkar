
import { prisma } from "@/lib/database";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { TrendingUp, TrendingDown,  Music, IndianRupee } from "lucide-react";



export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session) return;

    
    const totalTransactions = await prisma.transaction.aggregate({
            _sum: {
                in: true,
                out: true
            }
        })

        const totalOut = totalTransactions._sum.out || 0;
        const totalIn = totalTransactions._sum.in || 0;
        const netTotal = (totalTransactions._sum.in || 0) - (totalTransactions._sum.out || 0);
    
    const totalArtists = await prisma.artist.count();
    const totalSongs = await prisma.song.count();
    
    const recentTransactions = await prisma.transaction.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
            song: {
                include: {
                    artist: true
                }
            }
        }
    });
    
    const stats = [
        {
            title: "Total Income",
            value: `₹${totalIn.toFixed(2)}`,
            icon: TrendingUp,
            color: "text-green-500",
            bgColor: "bg-green-500/10"
        },
        {
            title: "Total Expenses",
            value: `₹${totalOut.toFixed(2)}`,
            icon: TrendingDown,
            color: "text-red-500",
            bgColor: "bg-red-500/10"
        },
        {
            title: "Net Total",
            value: `₹${netTotal.toFixed(2)}`,
            icon: IndianRupee,
            color: netTotal >= 0 ? "text-green-500" : "text-red-500",
            bgColor: netTotal >= 0 ? "bg-green-500/10" : "bg-red-500/10"
        },
        {
            title: "Active Projects",
            value: `${totalSongs}`,
            icon: Music,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
         {
            title: "Total Artists",
            value: `${totalArtists}`,
            icon: Music,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        }
    ];
    
    return (
        <div className="space-y-4 sm:space-y-6">
           
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 sm:gap-5">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{stat.title}</p>
                                    <p className={`text-xl sm:text-2xl font-bold ${stat.color} truncate`}>{stat.value}</p>
                                </div>
                                <div className={`${stat.bgColor} ${stat.color} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                                    <Icon size={20} className="sm:w-6 sm:h-6" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            
            <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm   ">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Recent Transactions</h3>
                {recentTransactions.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8 text-sm sm:text-base">No transactions yet</p>
                ) : (
                    <div className="space-y-2 sm:space-y-3">
                        {recentTransactions.map((transaction) => {
                            const isIncome = transaction.in > 0;
                            const amount = isIncome ? transaction.in : transaction.out;
                            return (
                                <div key={transaction.id} className="flex flex-col sm:flex-row  items-start sm:items-center justify-between gap-2 sm:gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                                        <p className="font-medium text-sm sm:text-base truncate">{transaction.song.name}</p>
                                        <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                            {transaction.song.artist.name} · {transaction.purpose}
                                        </p>
                                    </div>
                                    <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0 self-end sm:self-auto">
                                        <p className={`font-bold text-base sm:text-lg ${isIncome ? 'text-green-500' : 'text-red-500'}`}>
                                            {isIncome ? '+' : '-'}₹{amount.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(transaction.createdAt).toLocaleDateString('en-US', { 
                                                month: 'short', 
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    
                                </div>
                                
                            );
                            
                        })}
                         
                    </div>
                    
                )}
                
                
            </div>
           
            
        </div>
    );
}