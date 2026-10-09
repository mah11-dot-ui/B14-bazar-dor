'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

const getDate = () => new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

const HeaderDate = () => {
    const date = useSyncExternalStore(subscribe, getDate, () => '');
    return <p className="text-[14px]">{date}</p>;
};

export default HeaderDate;
