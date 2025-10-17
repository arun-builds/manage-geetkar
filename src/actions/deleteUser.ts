'use server'

import { Roles } from "@/generated/prisma";
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"

export async function deleteUser(userId: string) {

    if(!userId) return;

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) return;

    if (session.user.role !== Roles.admin) return;

    if(session.user.id === userId) return;



    try {
        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        revalidatePath("/settings")
    } catch (error) {
        console.error(error);
    }

}