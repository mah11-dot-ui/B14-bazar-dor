'use client';

import { createContext, useContext } from 'react';
import { authClient } from '@/lib/auth-client';

const UserContext = createContext({ user: null, isPending: true });

export function UserProvider({ children }) {
    const { data: session, isPending } = authClient.useSession();

    return (
        <UserContext.Provider value={{ user: session?.user ?? null, isPending }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
