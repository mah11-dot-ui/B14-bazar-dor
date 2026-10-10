'use client';

import Image from 'next/image';
import { useSyncExternalStore } from 'react';

const Banner = () => {
    const date = useSyncExternalStore(
        () => () => {},
        () => new Date().toLocaleDateString('bn-BD', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        () => ''
    );

    return (
        <div className='mx-4 mt-8 mb-10 flex flex-col items-center justify-between gap-6 rounded-lg border border-base-300 p-5 sm:mx-6 sm:mt-12 sm:mb-14 sm:p-8 md:mx-auto md:max-w-6xl md:flex-row md:gap-8'>
            <div className='flex-1'>
                <div className='inline-block rounded-[200px] bg-[#05893e42] px-4 py-2 text-sm text-[#05893E] sm:px-6'>{date}</div>
                <h1 className='mt-4 text-3xl font-bold sm:text-4xl lg:text-[45px]'>আজকের বাজারের দাম এক নজরে</h1>
                <p className='max-w-xl mb-4 text-gray-400'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button className='btn btn-sm bg-[#05893E] text-white hover:bg-[#05893F] sm:btn-md'>বিস্তারিত দেখুন</button>
            </div>
            <div className='w-full max-w-[400px] md:w-[40%]'>
                <Image className="h-auto w-full" src={"/bazar-hero.png"} width={400} height={400} alt='বাজারের পণ্যের ছবি' priority />
            </div>
        </div>
    );
};

export default Banner;