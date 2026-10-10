import Link from 'next/link';

export default function ProfilePageContent({ user }) {
    return (
        <main className="mx-auto min-h-[50vh] max-w-4xl px-4 py-8 text-[#263329] sm:px-6">
            <header className="mb-5">
                <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
                <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য দেখুন।</p>
            </header>

            <section className="flex flex-col gap-4 rounded-2xl border border-[#dce5dd] bg-[#f9fbf9] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e8eee9] bg-cover bg-center text-lg font-semibold"
                        style={user.image ? { backgroundImage: `url("${user.image}")` } : undefined}
                        aria-hidden="true"
                    >
                        {!user.image && (user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                        <h2 className="truncate font-semibold">{user.name || 'নাম দেওয়া হয়নি'}</h2>
                        <p className="truncate text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                <Link
                    href="/profile/update"
                    className="btn btn-sm border-[#05893E] text-[#05893E] hover:bg-[#05893E] hover:text-white sm:btn-md"
                >
                    তথ্য আপডেট
                </Link>
            </section>
        </main>
    );
}
