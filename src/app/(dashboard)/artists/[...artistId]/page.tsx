import SongBar from "@/components/SongBar";
import { Button } from "@/components/ui/button";
import {  prisma  } from "@/lib/database";
import {Artist, Status, Song} from "@/generated/prisma"
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
} from "@/components/ui/select";
import { createSong } from "@/actions/createSong";
import { deleteArtist } from "@/actions/deleteArtist";
import { updateArtist } from "@/actions/updateArtist";
import {  Plus, Trash2, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { checkRole } from "@/actions/checkRole";

export default async function ArtistId ({ params }: { params: { artistId: string[] } }) {
    // const param =  params;
    const artistId = params.artistId[0];
    
    // Check if user is admin
    const userIsAdmin = await checkRole();


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

    //TODO: Error handling with forms
   const addSongWithArtistId = createSong.bind(null, artistId);
   const deleteArtistWithId = deleteArtist.bind(null, artistId);
   const updateArtistWithId = updateArtist.bind(null, artistId);
    
    return (
        <div className="flex flex-col gap-6">
            {/* Back button */}
            <Link href="/artists" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit">
                <ArrowLeft size={20} />
                <span>Back to Artists</span>
            </Link>

            {/* Header with artist info and actions */}
            <div className="flex items-center justify-between w-full flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">{artist.name}</h1>
                    <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {artist.songs.length} {artist.songs.length === 1 ? 'song' : 'songs'}
                    </span>
                </div>
                
                <div className="flex gap-3 items-center">
                    {/* Edit Artist Dialog */}
                    <Dialog>
                        <DialogTrigger className="flex items-center gap-2 p-2 px-4 border border-border rounded-full hover:bg-accent transition-colors">
                            <Edit size={16} />
                            Edit
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Artist</DialogTitle>
                            </DialogHeader>
                            <form action={updateArtistWithId} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="artist-name" className="text-sm font-medium">Artist Name</label>
                                    <Input 
                                        name="artist-name" 
                                        id="artist-name"
                                        defaultValue={artist.name}
                                        required
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="w-full">
                                        Update Artist
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Artist Dialog */}
                    <Dialog>
                        <DialogTrigger className="flex items-center gap-2 p-2 px-4 bg-destructive/10 text-destructive rounded-full hover:bg-destructive/20 transition-colors">
                            <Trash2 size={16} />
                            Delete
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Artist</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete {artist.name}? This will also delete all associated songs and transactions. This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <form action={deleteArtistWithId}>
                                <DialogFooter>
                                    <Button type="submit" variant="destructive" className="w-full">
                                        Delete Artist
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Add Song Dialog */}
                    <Dialog>
                        <DialogTrigger className="flex items-center gap-2 p-2 px-6 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
                            <Plus size={20} />
                            New Song
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add a Song</DialogTitle>
                            </DialogHeader>
                            <form action={addSongWithArtistId} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="song-name" className="text-sm font-medium">Song Name</label>
                                    <Input 
                                        name="song-name" 
                                        id="song-name"
                                        placeholder="Enter song name"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                                    <Select name="status">
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Status.To_Be_Released}>To Be Released</SelectItem>
                                            <SelectItem value={Status.In_Process}>In Process</SelectItem>
                                            <SelectItem value={Status.Released}>Released</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="w-full">
                                        Add Song
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Songs List */}
            {artist.songs.length > 0 ? (
                <div className="w-full flex flex-col items-center gap-6 pt-6">
                    {artist.songs.map((song) => (
                        <div key={song.id} className="w-full">
                            <SongBar name={song.name} status={song.status} songId={song.id} isAdmin={userIsAdmin} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                    <p className="text-xl">No songs yet</p>
                    <p className="text-sm mt-2">Add your first song to get started</p>
                </div>
            )}
        </div>
    );
}