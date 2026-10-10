import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex min-h-[50vh] flex-1 items-center justify-center px-4 py-12">
            <section className="w-full max-w-lg rounded-2xl border border-[#dce5dd] bg-[#f9fbf9] p-6 text-center shadow-sm sm:p-10">
                <p className="text-sm font-semibold text-[#05893E]">ত্রুটি ৪০৪</p>
                <h1 className="mt-2 text-3xl font-bold text-[#263329]">
                    পেজটি খুঁজে পাওয়া যায়নি
                </h1>
                <p className="mt-3 text-gray-600">
                    আপনি যে পেজটি খুঁজছেন সেটি নেই, অথবা ঠিকানাটি ভুল।
                </p>
                <Link
                    href="/"
                    className="btn btn-sm mt-6 border-0 bg-[#05893E] text-white hover:bg-[#047536] sm:btn-md"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </section>
        </main>
    );
}
