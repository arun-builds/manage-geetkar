import SongBar from "@/components/SongBar";
import { Button } from "@/components/ui/button";
import {  prisma } from "@/lib/database";
import {Artist, Status, Song, Transaction} from "@/generated/prisma"
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
import TransactionBar from "@/components/TransactionBar";

export default async function ({ params }: { params: { songId: string[] } }) {
    const param = await params;
    const songId = parseInt(param.songId[0]) ;
    console.log(songId);
    


    type SongWithTransactions = Song & {
        transactions: Transaction[]
    }

    let songWithTransaction: SongWithTransactions | null = null;

    try {
        const response = await prisma.song.findUnique({
            where: {
                id: songId
            },
            include: {
                transactions: true
            }
            
        })

        songWithTransaction = response as SongWithTransactions | null
        
        console.log(songWithTransaction?.transactions);



    } catch (e) {

        console.error(e);
    }
    if (!songWithTransaction) {
        return (
            <div>Song Not Found</div>
        )
    }

    async function handleForm(e: FormData) {

        // TODO: test authentication

        'use server'
        console.log(e);
        const songname = e.get("song-name") as string;
        const formStatus = e.get("status") as string;
        const status = formStatus as Status
        if(!songname && !status){
            console.error("missing fields")
            return;
        }
        if(!songId){
            console.error("no user found");
            return
        }

        console.log(songname, status);

        console.log("triggered");
        

        }
    

    return (
        <div>
            <div className="flex items-center justify-between w-full ">
                <h1 className="text-3xl italic ">{}</h1>
                <Dialog>
                    <DialogTrigger className="flex items-center gap-2 p-1.5 px-6 bg-white text-black rounded-full" >New Transaction
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
                        <form action={handleForm} className="flex flex-col gap-2">
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
            <div className="w-full flex flex-col items-center gap-8 pt-12">
                {/* {artist.songs.map((song) => (
                    <div key={song.id} className="w-full"> */}
                        <TransactionBar  />
                    {/* </div>
                ))} */}
            </div>
        </div>
    );
}