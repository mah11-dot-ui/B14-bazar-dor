import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { fetchBazarCollection } from '@/lib/bazar-api';

const ProductsPriceHight = async () => {
    const products = await fetchBazarCollection('products');
    if (!products) {
        return <p className="mx-auto max-w-6xl px-4 py-8 sm:px-6" role="status">পণ্যের তথ্য এখন লোড করা যাচ্ছে না।</p>;
    }
    const UpProducts = products.filter(product => product.change.dir === 'up');
    return (
        <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6'>
            <h1 className='text-2xl font-bold'>আজ দাম বেড়েছে ▲</h1>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {UpProducts.slice(0, 6).map(product => <Link href={`/product/${product.id}`} key={product.id}>
                    <div className="w-full rounded-2xl border border-[#dce5dd] bg-[#f9fbf9] p-4 text-[#263329] shadow-sm">

                        {/* Product Information */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef3ef]">
                                <div>
                                    {product.image}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-base font-bold">
                                    {product.nameBn}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    প্রতি কেজি
                                </p>
                            </div>
                        </div>

                        {/* Price Information */}
                        <div className="mt-4 flex items-end justify-between">
                            <div>
                                <p className="text-xs text-gray-600">
                                    আজকের দাম
                                </p>

                                <p className="mt-1 text-lg font-bold">
                                    {new Intl.NumberFormat("bn-BD").format(product.today)} <span className="text-sm font-medium">টাকা</span>
                                </p>
                            </div>

                            <span className="mb-1 rounded-full bg-[#f1f5f1] px-3 py-1 text-xs font-semibold text-red-500">
                                ▲ {new Intl.NumberFormat("bn-BD").format(product.today - product.yesterday)}%
                            </span>
                        </div>

                    </div>
                </Link>
                )}
            </div>

        </div>
    );
};

export default ProductsPriceHight;