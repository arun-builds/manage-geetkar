'use server'

import { auth } from "@/lib/auth"
import { Roles } from "@/generated/prisma";
import {prisma} from "@/lib/database"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache";

export async function createArtist(formData: FormData){
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return;

    if(session.user.role !== Roles.admin) return;

    const artistName = formData.get("artist-name") as string;

    if(!artistName) return;

    try {
        await prisma.artist.create({
            data: {
                name: artistName,
            }
        });
        revalidatePath('/artists')
    } catch (error) {
        console.error(error);
    }
}

