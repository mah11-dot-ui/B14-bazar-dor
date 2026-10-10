import React, { Suspense } from 'react';
import HeaderDate from './HeaderDate';
import Link from 'next/link';
import MarqueeText from 'react-marquee-text';
import { fetchBazarCollection } from '@/lib/bazar-api';
import NavbarUser from './NavbarUser';

const CategoryNavigation = async () => {
    const categories = await fetchBazarCollection('categories');
    if (!categories) {
        return <p role="status">বিভাগগুলো এখন লোড করা যাচ্ছে না।</p>;
    }

    return (
        <nav aria-label="পণ্যের বিভাগ" className="flex w-max items-center gap-1">
            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/category/${encodeURIComponent(category.id)}`}
                    className="btn btn-sm btn-ghost whitespace-nowrap sm:btn-md"
                >
                    <span className="mr-1">{category.icon}</span>
                    <span>{category.nameBn}</span>
                </Link>
            ))}
        </nav>
    );
};

const ProductMarquee = async () => {
    const products = await fetchBazarCollection('products');
    if (!products) {
        return <p className="py-3" role="status">পণ্যের তথ্য এখন লোড করা যাচ্ছে না।</p>;
    }

    return (
        <div className='overflow-hidden py-3'>
            <MarqueeText duration={12} direction='right'>
                {products.slice(0, 10).map(product =>
                    <div key={product.id} className='flex items-center gap-3 mr-5'>
                        <div>
                            {product.image}
                        </div>
                        <div>
                            <h2 className='font-semibold'>{product.nameBn}</h2>
                        </div>
                        <p>
                            {new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(product.today)} টাকা/কেজি{' '}
                            <span className={product.change.dir === 'up' ? 'text-red-500' : product.change.dir === 'down' ? 'text-green-500' : 'text-gray-500'}>
                                {product.change.dir === 'up' ? '▲' : product.change.dir === 'down' ? '▼' : '−'} {new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(product.change.pct))}%
                            </span>
                        </p>
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
            <div className="navbar relative z-20 mx-auto w-full max-w-6xl gap-2 px-3">
                <div className="flex-1">
                    <Link href={"/"} className="text-xl flex gap-2 items-center">
                        <div className='bg-[#05893E] p-3 rounded-xl'>
                            🛒
                        </div>
                        <div>
                            <p className='font-bold text-[25px]'>বাজার দর</p>
                            <HeaderDate />
                        </div>
                    </Link>
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
                    <NavbarUser />
                </div>
            </div>
            <div className='border-t border-b border-base-300'>
                 <div className='mx-auto w-full max-w-6xl overflow-x-auto px-2 py-1'>
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