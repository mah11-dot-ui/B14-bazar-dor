import React, { Suspense } from 'react';
import HeaderDate from './HeaderDate';
import Link from 'next/link';
import MarqueeText from 'react-marquee-text';

const CategoryNavigation = async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories', {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error(`Failed to load categories: ${res.status}`);
    }

    const categories = await res.json();
    if (!Array.isArray(categories)) {
        throw new Error('The categories API returned an invalid response.');
    }

    return categories.map((category) => (
        <a key={category.id} className="btn btn-ghost mr-3">
            <div className='mr-3'>{category.icon}</div>
            <p>{category.nameBn}</p>
        </a>
    ));
};

const ProductMarquee = async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
        cache: 'no-store',
    });
    const products = await res.json();

    return (
        <div className='py-3'>
            <MarqueeText duration={12} direction='right'>
                {products.slice(0, 10).map(product =>
                    <div key={product.id} className='flex items-center gap-3 mr-5'>
                        <div>
                            {product.image}
                        </div>
                        <div>
                            <h2 className='font-semibold'>{product.nameBn}</h2>
                        </div>
                        <p>{product.today} টাকা/কেজি  {product.today > product.yesterday ? `▲ ${product.today - product.yesterday}% ` : `▼ ${product.yesterday - product.today}%`}</p>
                        •
                    </div>
                )}
                <br />
            </MarqueeText>
        </div>
    );
};

const Header = () => {
    return (
        <div className='border-b border-base-300 py-2'>
            <div className="navbar w-full max-w-5xl mx-auto">
                <div className="flex-1">
                    <a className="text-xl flex gap-2 items-center">
                        <div className='bg-[#05893E] p-3 rounded-xl'>
                            🛒
                        </div>
                        <div>
                            <p className='font-bold text-[25px]'>বাজার দর</p>
                            <HeaderDate />
                        </div>
                    </a>
                </div>
                <div>
                    {/* <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div> */}
                    <Link href={"/signIn"} className='font-semibold mr-2'>সাইন ইন</Link>
                    <button className='btn bg-[#05893E] text-white'>সাইন আপ</button>
                </div>
            </div>
            <div className='border-t border-b border-base-300'>
                 <div className='w-full p-[8px] max-w-5xl mx-auto'>
                    <Suspense fallback={<div>Loading....</div>}>
                        <CategoryNavigation />
                    </Suspense>
            </div>
            </div>
            <Suspense fallback={<div className='py-3' />}>
                <ProductMarquee />
            </Suspense>
        </div>
    );
};

export default Header;