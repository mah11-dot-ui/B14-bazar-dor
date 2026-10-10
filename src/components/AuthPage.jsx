'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '@/lib/auth-client';

const fieldClassName = 'mt-1 w-full rounded-lg border border-[#e1e9e2] bg-transparent px-3 py-2 text-sm outline-none placeholder:text-gray-400 focus:border-[#078a43]';

export default function AuthPage({ mode, socialProviders }) {
    const isSignUp = mode === 'signUp';
    const title = isSignUp ? 'অ্যাকাউন্ট তৈরি করুন' : 'সাইন ইন';
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function showError(message) {
        setErrorMessage(message);
        toast.error(message);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage('');

        const formData = new FormData(event.currentTarget);
        const name = isSignUp ? formData.get('name').toString().trim() : undefined;
        const email = formData.get('email').toString().trim();
        const password = formData.get('password').toString();

        if (isSignUp && password !== formData.get('confirmPassword').toString()) {
            showError('দুটি পাসওয়ার্ড মিলছে না।');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = isSignUp
                ? await authClient.signUp.email({ name, email, password })
                : await authClient.signIn.email({ email, password });

            if (result.error) {
                showError(result.error.message || 'অনুরোধটি সম্পন্ন করা যায়নি।');
                return;
            }

            router.push('/');
            router.refresh();
        } catch (error) {
            showError(error instanceof Error ? error.message : 'সার্ভারের সঙ্গে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।');
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleSocialSignIn(provider) {
        setErrorMessage('');
        setIsSubmitting(true);

        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: '/',
            });

            if (result.error) {
                showError(result.error.message || 'সোশ্যাল সাইন ইন করা যায়নি।');
                setIsSubmitting(false);
            }
        } catch (error) {
            showError(error instanceof Error ? error.message : 'সোশ্যাল সাইন ইন করা যায়নি। আবার চেষ্টা করুন।');
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-[calc(100vh-5rem)] bg-[#f2f7f3] px-4 py-8 text-[#263329]">
            <div className="mx-auto max-w-md">
                <header className="mb-5 text-center">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {isSignUp
                            ? 'দৈনিক বাজার দর দেখতে একটি অ্যাকাউন্ট তৈরি করুন'
                            : 'বাজার দর দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন'}
                    </p>
                </header>

                <section className="rounded-2xl border border-[#e4ebe5] bg-white p-5 shadow-sm sm:p-6">
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        {isSignUp && (
                            <label className="block text-sm font-medium">
                                নাম
                                <input className={fieldClassName} name="name" type="text" autoComplete="name" required placeholder="আপনার সম্পূর্ণ নাম" />
                            </label>
                        )}

                        <label className="block text-sm font-medium">
                            ইমেইল
                            <input className={fieldClassName} name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
                        </label>

                        <label className="block text-sm font-medium">
                            পাসওয়ার্ড
                            <input className={fieldClassName} name="password" type="password" autoComplete={isSignUp ? 'new-password' : 'current-password'} minLength={8} required placeholder="কমপক্ষে ৮ অক্ষর" />
                        </label>

                        {isSignUp && (
                            <label className="block text-sm font-medium">
                                পাসওয়ার্ড নিশ্চিত করুন
                                <input className={fieldClassName} name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required placeholder="আবার লিখুন" />
                            </label>
                        )}

                        {errorMessage && (
                            <p className="text-sm text-red-600" role="alert">{errorMessage}</p>
                        )}

                        <button disabled={isSubmitting} className="mt-1 w-full rounded-lg bg-[#078a43] px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
                            {isSubmitting ? 'অপেক্ষা করুন...' : title}
                        </button>
                    </form>

                    <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
                        <span className="h-px flex-1 bg-[#e4ebe5]" />
                        অথবা
                        <span className="h-px flex-1 bg-[#e4ebe5]" />
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <button type="button" disabled={isSubmitting || !socialProviders.google} onClick={() => handleSocialSignIn('google')} className="btn flex items-center gap-2 rounded-lg border border-[#e4ebe5] px-2 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50">
                            <p className='text-xl'><FcGoogle /></p>
                            Google দিয়ে চালিয়ে যান
                        </button>
                        <button type="button" disabled={isSubmitting || !socialProviders.github} onClick={() => handleSocialSignIn('github')} className="btn rounded-lg border border-[#e4ebe5] px-2 py-2 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50">
                            <span className="mr-1"><FaGithub className='text-xl' /></span>
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        {isSignUp ? 'আগে থেকেই অ্যাকাউন্ট আছে? ' : 'অ্যাকাউন্ট নেই? '}
                        <Link
                            className="font-semibold text-[#078a43]"
                            href={isSignUp ? '/signIn' : '/signUp'}
                        >
                            {isSignUp ? 'সাইন ইন করুন' : 'সাইন আপ করুন'}
                        </Link>
                    </p>
                </section>
            </div>
        </main>
    );
}
