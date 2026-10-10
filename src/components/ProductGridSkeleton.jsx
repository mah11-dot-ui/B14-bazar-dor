export default function ProductGridSkeleton({ title, count = 6, categoryHeader = false }) {
    return (
        <section
            className="mx-auto max-w-6xl animate-pulse px-4 py-6 sm:px-6"
            aria-label="পণ্যের তথ্য লোড হচ্ছে"
            aria-busy="true"
        >
            {categoryHeader && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl border border-base-300 p-5">
                    <div className="h-12 w-12 rounded-xl bg-base-300" />
                    <div className="space-y-2">
                        <div className="h-5 w-32 rounded bg-base-300" />
                        <div className="h-3 w-20 rounded bg-base-300" />
                    </div>
                </div>
            )}

            {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }, (_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-[#dce5dd] bg-[#f9fbf9] p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 shrink-0 rounded-2xl bg-base-300" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-3/4 rounded bg-base-300" />
                                <div className="h-3 w-1/3 rounded bg-base-300" />
                            </div>
                        </div>
                        <div className="mt-5 flex items-end justify-between">
                            <div className="space-y-2">
                                <div className="h-3 w-16 rounded bg-base-300" />
                                <div className="h-5 w-24 rounded bg-base-300" />
                            </div>
                            <div className="h-6 w-16 rounded-full bg-base-300" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
