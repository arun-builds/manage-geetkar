'use server'

import { auth } from "@/lib/auth"
import { prisma, Roles } from "@/lib/database";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers"

export async function deleteArtist(artistId: string){
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if(!session) return;

    if(session.user.role !== Roles.admin) return;

    if(!artistId) return;

    try {
        const deletedArtist = await prisma.artist.delete({
            where: {
                id: artistId,
            }
        })
        revalidatePath('/artists')
    }catch(e){
        console.error(e)

    }
}

