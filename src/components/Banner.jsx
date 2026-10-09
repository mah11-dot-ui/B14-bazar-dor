'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const Banner = () => {
    const [date, setDate] = useState('');

    useEffect(() => {
        setDate(new Date().toLocaleDateString('bn-BD', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }));
    }, []);

    return (
        <div className='max-w-6xl mx-auto border border-base-300 mt-20 p-8  rounded-lg flex justify-between items-center gap-8 flex-col md:flex-row mb-20'>
            <div className='flex-1'>
                <div className='bg-[#05893e42] px-6 py-2 rounded-[200px] inline-block text-[#05893E]'>{date}</div>
                <h1 className='text-[45px] font-bold mt-4'>আজকের বাজারের দাম এক নজরে</h1>
                <p className='max-w-xl mb-4 text-gray-400'>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                <button className='btn bg-[#05893E] text-white hover:bg-[#05893F]'>বিস্তারিত দেখুন</button>
            </div>
            <div className='w-full md:w-[400px]'>
                <Image src={"/bazar-hero.png"} width={400} height={400} alt='Hero Image' />
            </div>
        </div>
    );
};

export default Banner;