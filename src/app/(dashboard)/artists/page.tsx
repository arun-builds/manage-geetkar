import ArtistCard from "@/components/ArtistCard";
import { prisma } from "@/lib/database"
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createArtist } from "@/actions/createArtist";

export default async function Artists( ) {
    

    const artists = await prisma.artist.findMany({
        include: {
            _count: {
                select: { songs: true }
            }
        },
        orderBy: {
            songs: {
                _count: 'desc'
            }
        }
    });

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            {/* Header with search and add button */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Artists</h1>
                
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    {/* Search bar */}
                    <form className="relative w-full sm:w-auto sm:min-w-[250px] lg:min-w-[300px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <input 
                            name="search"
                            className="w-full p-2.5 pl-10 pr-4 border border-border rounded-full bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm" 
                            type="text" 
                            placeholder="Search artists..." 
                            defaultValue={""}
                        />
                    </form>

                    {/* Create Artist Dialog */}
                    <Dialog>
                        <DialogTrigger className="flex items-center justify-center gap-2 p-2.5 px-6 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity whitespace-nowrap text-sm font-medium">
                            <Plus size={18} />
                            <span className="hidden xs:inline">New Artist</span>
                            <span className="xs:hidden">Add</span>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] max-w-md mx-auto">
                            <DialogHeader>
                                <DialogTitle className="text-lg sm:text-xl">Create New Artist</DialogTitle>
                            </DialogHeader>
                            <form action={createArtist} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="artist-name" className="text-sm font-medium">Artist Name</label>
                                    <Input 
                                        name="artist-name" 
                                        id="artist-name"
                                        placeholder="Enter artist name"
                                        required
                                        className="text-base"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="w-full">
                                        Create Artist
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Artist Grid */}
            {artists.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pt-4 md:pt-6 justify-items-center">
                    {artists.map((artist) => (
                        <Link key={artist.id} href={`/artists/${artist.id}`} className="w-full max-w-[280px]">
                            <ArtistCard 
                                name={artist.name} 
                                songCount={artist._count.songs}
                            />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-muted-foreground px-4">
                    <p className="text-lg sm:text-xl text-center">No artists found</p>
                    <p className="text-xs sm:text-sm mt-2 text-center">Create your first artist to get started</p>
                </div>
            )}
        </div>
    )
}