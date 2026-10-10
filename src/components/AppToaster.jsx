'use client';

import { Toaster } from 'react-hot-toast';

export default function AppToaster() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#263329',
                    color: '#fff',
                },
            }}
        />
    );
}
