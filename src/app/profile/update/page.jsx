import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import UpdateProfileForm from '@/components/UpdateProfileForm';
import { auth } from '@/lib/auth';

async function UpdateProfileContent() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect('/signIn');
    }

    return (
        <main className="mx-auto min-h-[50vh] max-w-4xl px-4 py-8 text-[#263329] sm:px-6">
            <header className="mb-5">
                <h1 className="text-2xl font-bold">তথ্য আপডেট</h1>
                <p className="mt-1 text-sm text-gray-500">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
            </header>
            <UpdateProfileForm initialName={session.user.name || ''} />
            <Link href="/profile" className="mt-4 inline-block text-sm text-[#05893E] hover:underline">
                প্রোফাইলে ফিরে যান
            </Link>
        </main>
    );
}

export default function UpdateProfilePage() {
    return (
        <Suspense fallback={<main className="mx-auto min-h-[50vh] max-w-4xl animate-pulse px-4 py-8 sm:px-6" />}>
            <UpdateProfileContent />
        </Suspense>
    );
}
