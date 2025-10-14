import ArtistCard from "@/components/ArtistCard";
import { prisma } from "@/lib/database"
import Link from "next/link";
export default async function Artists() {
    const artists = await prisma.artist.findMany();
    console.log(artists);

    return (
        <div className=" flex flex-col">
            <div className="flex justify-end "><input className="p-1 px-3 border rounded-full" type="text" placeholder="Search Artist..." /></div>
            <div className="flex items-center gap-20  flex-wrap">
                {artists.map((artist, idx) => (

                    <Link key={idx} href={`/artists/${artist.id}`}>
                        <ArtistCard name={artist.name} />
                    </Link>

                ))}
            </div>
        </div>
    )
}