'use server'
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"
import { Roles } from "@/generated/prisma";

export async function createTransaction(songId: number, formData: FormData) {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return;


    if (session.user.role !== Roles.admin) return;

    const transactionType = formData.get("type") as string;
    const formAmount = formData.get("amount") as string;
    const purpose = formData.get("purpose") as string;
    const amount = parseInt(formAmount);

    if (!amount && !transactionType && !purpose) return;

    let inAmount = 0;
    let outAmount = 0;



    if (transactionType === "in") {
        inAmount = amount;
    } else {
        outAmount = amount;
    }

    try {
        await prisma.transaction.create({
            data: {
                in: inAmount,
                out: outAmount,
                purpose,
                songId
            }
        })
        revalidatePath(`/finances/${songId}`)
    } catch (e) {
        console.error(e);

    }



}