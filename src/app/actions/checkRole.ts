'use server'

import { Roles } from "@/generated/prisma";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function checkRole(){

    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if(!session) return false;

    if(session.user.role === Roles.admin) return true;

}