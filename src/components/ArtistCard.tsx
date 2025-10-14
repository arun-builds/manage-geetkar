export default function ArtistCard({name}:{name:string}) {
    return(
        <div className="h-72 w-64 p-4 rounded-md shadow-sm  shadow-card border relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-card p-2">
            <h2 className="text-lg  italic">{name}</h2>
            </div>
        </div>
    )
}