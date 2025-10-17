"use client"
import { deleteTransaction } from "@/app/actions/deleteTransaction";
import { Transaction } from "@/generated/prisma";
import { TrendingUp, TrendingDown, Calendar, Tag, X } from "lucide-react";

export default function TransactionBar({ transaction }: { transaction: Transaction }) {
    const finalTransactionNumber = transaction.in == 0 ? transaction.out : transaction.in;
    const finalTransactionColor = transaction.in == 0 ? "text-red-500" : "text-green-500";
    const isIncome = transaction.in != 0;

    function handleDelete(){
        const deleteTransactionWithTransactionId = deleteTransaction(transaction.id, transaction.songId);
    }

    return (
        <div className="group p-4 md:p-6 border border-border w-full mx-auto rounded-xl bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 relative">
            
            {/* Amount Section */}
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <div className={`${isIncome ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'} p-1.5 md:p-2 rounded-lg flex-shrink-0`}>
                    {isIncome ? <TrendingUp size={18} className="md:w-5 md:h-5" /> : <TrendingDown size={18} className="md:w-5 md:h-5" />}
                </div>
                <div className="min-w-0">
                    <p className={`text-xl md:text-2xl font-bold ${finalTransactionColor} truncate`}>
                        {isIncome ? '+' : '-'}₹{finalTransactionNumber.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {isIncome ? 'Income' : 'Expense'}
                    </p>
                </div>
            </div>

            {/* Date Section */}
            <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-muted/50 border border-border flex-shrink-0 self-start sm:self-center">
                <Calendar size={14} className="md:w-4 md:h-4 text-muted-foreground flex-shrink-0" />
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">
                    {transaction.createdAt.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                    })}
                </span>
            </div>

            {/* Purpose Section */}
            <div className="flex items-center gap-1.5 md:gap-2 flex-1 justify-start sm:justify-end min-w-0 w-full sm:w-auto">
                <Tag size={14} className="md:w-4 md:h-4 text-muted-foreground flex-shrink-0" />
                <span className="font-medium text-sm md:text-base truncate max-w-full sm:max-w-[200px]">
                    {transaction.purpose}
                </span>
            </div>

            {/* Delete Button */}
            <button 
                className="absolute -top-2 -right-2 bg-destructive/90 hover:bg-destructive text-destructive-foreground p-1.5 rounded-full opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg touch-manipulation z-10"
                onClick={handleDelete}
                aria-label="Delete transaction"
            >
                <X size={14} className="md:w-4 md:h-4" />
            </button>
        </div>
    )
}