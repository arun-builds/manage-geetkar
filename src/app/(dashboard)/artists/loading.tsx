export default function Loading() {
    return (
        <div className="flex flex-col gap-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center gap-4">
                <div className="h-10 w-32 bg-muted animate-pulse rounded-lg" />
                <div className="flex gap-3 items-center">
                    <div className="h-10 w-64 bg-muted animate-pulse rounded-full" />
                    <div className="h-10 w-32 bg-muted animate-pulse rounded-full" />
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-72 w-64 bg-muted animate-pulse rounded-2xl" />
                ))}
            </div>
        </div>
    );
}