'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"

export async function deleteTransaction(transactionId: string, songId: number){
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if(!session) return;

    if(!transactionId) return;

    try {
        const deleteTransaction = await prisma.transaction.delete({
            where: {
                id: transactionId,
            }
        })
        revalidatePath(`/finances/${songId}`)
    }catch(e){
        console.error(e)
    }
}