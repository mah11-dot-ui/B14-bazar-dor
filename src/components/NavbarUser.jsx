'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { authClient } from '@/lib/auth-client';
import { useUser } from '@/context/UserContext';

export default function NavbarUser() {
    const { user, isPending } = useUser();
    const [errorMessage, setErrorMessage] = useState('');
    const [menu, setMenu] = useState(null);
    const triggerRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!menu) {
            return undefined;
        }

        function handlePointerDown(event) {
            if (
                !triggerRef.current?.contains(event.target) &&
                !menuRef.current?.contains(event.target)
            ) {
                setMenu(null);
            }
        }

        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                setMenu(null);
            }
        }

        function closeOnViewportChange() {
            setMenu(null);
        }

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', closeOnViewportChange);
        window.addEventListener('scroll', closeOnViewportChange, true);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', closeOnViewportChange);
            window.removeEventListener('scroll', closeOnViewportChange, true);
        };
    }, [menu]);

    async function handleSignOut() {
        setErrorMessage('');
        const result = await authClient.signOut();

        if (result.error) {
            setErrorMessage(result.error.message || 'সাইন আউট করা যায়নি।');
        }
    }

    function toggleMenu() {
        if (menu) {
            setMenu(null);
            return;
        }

        const rect = triggerRef.current.getBoundingClientRect();
        setMenu({
            top: rect.bottom + 8,
            right: Math.max(8, window.innerWidth - rect.right),
        });
    }

    if (isPending) {
        return <span className="text-sm" aria-label="লোড হচ্ছে">লোড হচ্ছে...</span>;
    }

    if (!user) {
        return (
            <div className="flex items-center">
                <Link href="/signIn" className="font-semibold mr-2">সাইন ইন</Link>
                <Link href="/signUp" className="btn bg-[#05893E] text-white">সাইন আপ</Link>
            </div>
        );
    }

    return (
        <div className="relative z-50 flex flex-col items-end">
            <button
                ref={triggerRef}
                type="button"
                onClick={toggleMenu}
                aria-expanded={Boolean(menu)}
                aria-haspopup="menu"
                className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-base-200"
            >
                <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-cover bg-center bg-no-repeat text-sm font-semibold text-[#263329]"
                    style={user.image ? { backgroundImage: `url("${user.image}")` } : undefined}
                    aria-hidden="true"
                >
                    {!user.image && (user.name || user.email).charAt(0).toUpperCase()}
                </span>
                <span className="max-w-28 truncate text-sm font-medium">{user.name || user.email}</span>
                <span className="text-xs text-gray-500" aria-hidden="true">▾</span>
            </button>
            {menu && createPortal(
                <div
                    ref={menuRef}
                    role="menu"
                    className="fixed z-[1000] w-52 rounded-lg border border-gray-200 bg-white p-2 text-gray-800 shadow-lg"
                    style={{ top: menu.top, right: menu.right }}
                >
                    <p className="truncate px-3 py-2 text-sm text-gray-500">{user.email}</p>
                    <Link
                        href="/profile"
                        role="menuitem"
                        onClick={() => setMenu(null)}
                        className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                        আমার প্রোফাইল
                    </Link>
                    <button
                        type="button"
                        role="menuitem"
                        onClick={handleSignOut}
                        className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                    >
                        সাইন আউট
                    </button>
                </div>,
                document.body
            )}
            {errorMessage && <span className="mt-1 text-xs text-red-600" role="alert">{errorMessage}</span>}
        </div>
    );
}
