'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/database";
import {Roles} from "@/generated/prisma"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache";

export async function updateArtist(artistId: string, formData: FormData){
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return;

    if(session.user.role !== Roles.admin) return;

    const artistName = formData.get("artist-name") as string;

    if(!artistName || !artistId) return;

    try {
        const updatedArtist = await prisma.artist.update({
            where: {
                id: artistId,
            },
            data: {
                name: artistName,
            }
        });
        revalidatePath('/artists')
        revalidatePath(`/artists/${artistId}`)
    } catch (error) {
        console.error(error);
    }
}

