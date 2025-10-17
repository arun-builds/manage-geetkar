'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/database";
import {Roles, Status} from "@/generated/prisma"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache";

export async function createSong(artistId: string, formData: FormData){
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) return;

    if(session.user.role !== Roles.admin) return;

     const songName = formData.get("song-name") as string;
    const statusFromForm = formData.get("status") as string;
    const status = statusFromForm as Status

    try {
        await prisma.song.create({
            data: {
                name: songName,
                status,
                artistId
            }
        });
        revalidatePath(`/artists/${artistId}`)
    } catch (error) {
        console.error(error);
    }
}