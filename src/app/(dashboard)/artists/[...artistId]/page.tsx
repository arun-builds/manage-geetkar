import SongBar from "@/components/SongBar";
import { Button } from "@/components/ui/button";
import {  prisma  } from "@/lib/database";
import {Artist, Status, Song} from "@/generated/prisma"
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { revalidatePath } from "next/cache";
import { createSong } from "@/app/actions/createSong";

export default async function ({ params }: { params: { artistId: string[] } }) {
    const param = await params;
    const artistId = param.artistId[0];


    type ArtistWithSongs = Artist & {
        songs: Song[]
    }

    let artist: ArtistWithSongs | null = null;

    try {
        const response = await prisma.artist.findUnique({
            where: {
                id: artistId
            },
            include: {
                songs: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })
        artist = response as ArtistWithSongs | null



    } catch (e) {

        console.error(e);
    }
    if (!artist) {
        return (
            <div>Artist Not Found</div>
        )
    }

   const addSongWithArtistId = createSong.bind(null, artistId) 
    return (
        <div>
            <div className="flex items-center justify-between w-full ">
                <h1 className="text-3xl italic ">{artist.name}</h1>
                <div className="flex">
                <div className="flex  "><input className="p-1 px-3 border rounded-full rounded-r-none" type="text" placeholder="Search..." /></div>
                <Dialog>
                    <DialogTrigger className="flex items-center gap-2 p-1.5 px-6 bg-white text-black rounded-full rounded-l-none" >New song
                        {/* <Plus className="text-sm"/> */}
                    </DialogTrigger>
                    <DialogContent className="">
                        <DialogHeader>
                            <DialogTitle>Add a Song</DialogTitle>
                            {/* <DialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </DialogDescription> */}
                        </DialogHeader>
                        <form action={addSongWithArtistId} className="flex flex-col gap-2">
                            <label htmlFor="song-name" >Song Name</label>
                            <Input name="song-name" />
                            <label htmlFor="">Status</label>
                            <Select name="status">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={Status.To_Be_Released}>To Be Released</SelectItem>
                                    <SelectItem value={Status.In_Process}>In Process</SelectItem>
                                    <SelectItem value={Status.Released}>Released</SelectItem>
                                </SelectContent>
                            </Select>
                            <DialogFooter>
                                
                                <Button type="submit">
                                    Add Song
                                </Button>
                            </DialogFooter>
                        </form>

                    </DialogContent>


                </Dialog>
                </div>

            </div>
            <div className="w-full flex flex-col items-center gap-8 pt-12">
                {artist.songs.map((song) => (
                    <div key={song.id} className="w-full">
                        <SongBar name={song.name} status={song.status} songId={song.id} />
                    </div>
                ))}
            </div>
        </div>
    );
}