import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ProductGridSkeleton from '@/components/ProductGridSkeleton';
import { fetchBazarCollection } from '@/lib/bazar-api';

const numberFormat = new Intl.NumberFormat('bn-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

async function CategoryPageContent({ params }) {
    const { id } = await params;
    const [categories, products] = await Promise.all([
        fetchBazarCollection('categories'),
        fetchBazarCollection('products'),
    ]);

    if (!categories || !products) {
        return (
            <main className="mx-auto min-h-64 max-w-6xl px-4 py-10 sm:px-6" role="status">
                এই মুহূর্তে বিভাগের পণ্য লোড করা যাচ্ছে না। পরে আবার চেষ্টা করুন।
            </main>
        );
    }

    const category = categories.find((item) => String(item.id) === id);
    if (!category) {
        notFound();
    }

    const categoryProducts = products.filter((product) =>
        String(product.categoryId) === String(category.id) ||
        product.categoryNameBn === category.nameBn
    );

    return (
        <main className="mx-auto min-h-64 max-w-6xl px-4 py-8 sm:px-6">
            <header className="mb-6 rounded-2xl border border-[#dce5dd] bg-[#f9fbf9] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef3ef] text-2xl">
                        {category.icon}
                    </span>
                    <div>
                        <h1 className="text-2xl font-bold text-[#263329]">{category.nameBn}</h1>
                        <p className="text-sm text-gray-600">
                            {new Intl.NumberFormat('bn-BD').format(categoryProducts.length)}টি পণ্য
                        </p>
                    </div>
                </div>
            </header>

            {categoryProducts.length === 0 ? (
                <p className="rounded-xl border border-base-300 p-5 text-gray-600">
                    এই বিভাগে এখন কোনো পণ্য পাওয়া যায়নি।
                </p>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryProducts.map((product) => (
                        <Link href={`/product/${product.id}`} key={product.id}>
                            <article className="h-full w-full rounded-2xl border border-[#dce5dd] bg-[#f9fbf9] p-4 text-[#263329] shadow-sm transition-shadow hover:shadow-md">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef3ef] text-xl">
                                        {product.image}
                                    </span>
                                    <div className="min-w-0">
                                        <h2 className="truncate font-bold">{product.nameBn}</h2>
                                        <p className="text-sm text-gray-600">
                                            প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-end justify-between gap-3">
                                    <div>
                                        <p className="text-xs text-gray-600">আজকের দাম</p>
                                        <p className="mt-1 font-bold">
                                            {numberFormat.format(product.today)} টাকা
                                        </p>
                                    </div>
                                    <span className={`rounded-full bg-[#f1f5f1] px-3 py-1 text-xs font-semibold ${
                                        product.change.dir === 'up'
                                            ? 'text-red-500'
                                            : product.change.dir === 'down'
                                                ? 'text-green-500'
                                                : 'text-gray-500'
                                    }`}>
                                        {product.change.dir === 'up' ? '▲' : product.change.dir === 'down' ? '▼' : '−'}{' '}
                                        {numberFormat.format(Math.abs(product.change.pct))}%
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}

function CategoryPageFallback() {
    return <ProductGridSkeleton count={6} categoryHeader />;
}

export default function CategoryPage({ params }) {
    return (
        <Suspense fallback={<CategoryPageFallback />}>
            <CategoryPageContent params={params} />
        </Suspense>
    );
}
