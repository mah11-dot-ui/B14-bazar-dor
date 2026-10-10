'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';

export default function UpdateProfileForm({ initialName }) {
    const router = useRouter();
    const [name, setName] = useState(initialName);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage('');

        const updatedName = name.trim();
        if (!updatedName) {
            const message = 'নাম লিখুন।';
            setErrorMessage(message);
            toast.error(message);
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await authClient.updateUser({ name: updatedName });
            if (result.error) {
                const message = result.error.message || 'তথ্য আপডেট করা যায়নি।';
                setErrorMessage(message);
                toast.error(message);
                return;
            }

            toast.success('আপনার নাম আপডেট হয়েছে।');
            router.push('/profile');
            router.refresh();
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : 'সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।';
            setErrorMessage(message);
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-[#dce5dd] bg-[#f9fbf9] p-5 sm:p-6">
            <h2 className="font-semibold">তথ্য</h2>
            <label htmlFor="profile-name" className="mt-5 block text-sm font-medium">
                নাম
            </label>
            <input
                id="profile-name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={100}
                required
                className="mt-2 w-full rounded-lg border border-[#dce5dd] bg-white px-3 py-2 outline-none focus:border-[#05893E]"
            />

            {errorMessage && (
                <p className="mt-2 text-sm text-red-600" role="alert">{errorMessage}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-sm mt-3 w-full border-0 bg-[#05893E] text-white hover:bg-[#047536] disabled:opacity-60 sm:btn-md"
            >
                {isSubmitting ? 'আপডেট হচ্ছে...' : 'আপডেট ইনফরমেশন'}
            </button>
        </form>
    );
}
