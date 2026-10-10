import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import ProfilePageContent from '@/components/ProfilePageContent';
import { auth } from '@/lib/auth';

async function ProfileContent() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect('/signIn');
    }

    return <ProfilePageContent user={session.user} />;
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<main className="mx-auto min-h-[50vh] max-w-4xl animate-pulse px-4 py-8 sm:px-6" />}>
            <ProfileContent />
        </Suspense>
    );
}
