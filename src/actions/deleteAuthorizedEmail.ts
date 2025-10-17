'use server'

import { Roles } from "@/generated/prisma";
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"

export async function deleteAuthorizedEmail(email: string) {

    if(!email) return;
    
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session) return;

    if(session.user.role !== Roles.admin) return;

    if(session.user.email === email) return;


    try{
        await prisma.authorizedEmails.delete({
            where: {
                email
            }
        });
        revalidatePath("/settings")
    }catch(e){
        console.error(e);
    }
}