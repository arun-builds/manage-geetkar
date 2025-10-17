export default function Loading() {
    return (
        <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="bg-muted animate-pulse rounded-xl h-40" />

            {/* Transactions Skeleton */}
            <div className="w-full flex flex-col items-center gap-6">
                <div className="h-8 w-48 bg-muted animate-pulse rounded-lg self-start" />
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-24 w-2/3 bg-muted animate-pulse rounded-xl" />
                ))}
            </div>
        </div>
    );
}