export default function Loading() {
    return (
        <div className="flex flex-col gap-6">
            {/* Back button skeleton */}
            <div className="h-6 w-32 bg-muted animate-pulse rounded-lg" />

            {/* Header Skeleton */}
            <div className="flex items-center justify-between w-full flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-48 bg-muted animate-pulse rounded-lg" />
                    <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
                </div>
                <div className="flex gap-3 items-center">
                    <div className="h-10 w-20 bg-muted animate-pulse rounded-full" />
                    <div className="h-10 w-24 bg-muted animate-pulse rounded-full" />
                    <div className="h-10 w-32 bg-muted animate-pulse rounded-full" />
                </div>
            </div>

            {/* Songs List Skeleton */}
            <div className="w-full flex flex-col items-center gap-6 pt-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 w-2/3 bg-muted animate-pulse rounded-xl" />
                ))}
            </div>
        </div>
    );
}