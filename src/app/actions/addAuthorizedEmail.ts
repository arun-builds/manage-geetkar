'use server'

import { Roles } from "@/generated/prisma";
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"

export async function addAuthorizedEmail(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session) return;

    if(session.user.role !== Roles.admin) return;

    const email = formData.get("email") as string;

    try{
        await prisma.authorizedEmails.create({
            data: {
                email
            }
        });
        revalidatePath("/settings")
    }catch(e){
        console.error(e);
    }
}