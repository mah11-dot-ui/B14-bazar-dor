import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { Suspense } from 'react';
import { auth } from '@/lib/auth';

const numberFormat = new Intl.NumberFormat('bn-BD', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function PriceComparison({ label, price, comparisonPrice }) {
    const difference = price - comparisonPrice;
    const percentage = comparisonPrice === 0
        ? 0
        : (difference / comparisonPrice) * 100;
    const direction = difference > 0 ? 'up' : difference < 0 ? 'down' : 'flat';
    const color = direction === 'up'
        ? 'text-red-600'
        : direction === 'down'
            ? 'text-green-700'
            : 'text-gray-500';
    const icon = direction === 'up' ? '▲' : direction === 'down' ? '▼' : '−';

    return (
        <div className="rounded-xl border border-[#e5ece6] bg-white p-4">
            <p className="text-sm font-semibold text-gray-700">{label}</p>
            <p className={`mt-2 font-bold ${color}`}>
                {icon} {numberFormat.format(Math.abs(percentage))}%
            </p>
            <p className="mt-1 text-xs text-gray-500">
                {numberFormat.format(comparisonPrice)} টাকা থেকে
            </p>
        </div>
    );
}

async function ProductDetailsContent({ params }) {
    const { id } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect('/signIn');
    }

    const res = await fetch(
        `https://api.api-store.workers.dev/api/bazardor/products/${encodeURIComponent(id)}`
    );

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        throw new Error(`Failed to load product ${id}: ${res.status}`);
    }

    if (!res.headers.get('content-type')?.includes('application/json')) {
        throw new Error(`Product ${id} API returned a non-JSON response.`);
    }

    const product = await res.json();

    if (!product || product.error) {
        notFound();
    }

    const changeColor = product.change.dir === 'up'
        ? 'text-red-600'
        : product.change.dir === 'down'
            ? 'text-green-700'
            : 'text-gray-500';
    const changeIcon = product.change.dir === 'up'
        ? '▲'
        : product.change.dir === 'down'
            ? '▼'
            : '−';

    return (
        <main className="mx-4 my-6 w-auto max-w-5xl rounded-2xl bg-[#f2f7f3] p-4 sm:mx-6 sm:p-6 lg:mx-auto">
            <section className="flex flex-col items-start justify-between gap-4 rounded-xl border border-[#e5ece6] bg-white p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f2f7f3] text-2xl">
                        {product.image}
                    </div>
                    <div className="min-w-0">
                        <h1 className="font-bold text-[#263329]">{product.nameBn}</h1>
                        <p className="text-xs text-gray-500">
                            {product.categoryNameBn} · প্রতি {product.unit === 'kg' ? 'কেজি' : product.unit}
                        </p>
                    </div>
                </div>
                <div className="w-full rounded-lg bg-[#f2f7f3] px-3 py-2 text-left sm:w-auto sm:text-right">
                    <p className="text-xs text-gray-500">আজকের দাম</p>
                    <p className="font-bold text-[#263329]">
                        {numberFormat.format(product.today)} টাকা
                    </p>
                </div>
            </section>

            <section className="mt-5">
                <h2 className="mb-3 text-sm font-bold text-[#263329]">দামের পরিবর্তন</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-[#e5ece6] bg-white p-4">
                        <p className="text-sm font-semibold text-gray-700">গতকালের তুলনায়</p>
                        <p className={`mt-2 font-bold ${changeColor}`}>
                            {changeIcon} {numberFormat.format(Math.abs(product.change.pct))}%
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                            গতকাল {numberFormat.format(product.yesterday)} টাকা
                        </p>
                    </div>
                    <PriceComparison
                        label="গত সপ্তাহের তুলনায়"
                        price={product.today}
                        comparisonPrice={product.lastWeek}
                    />
                    <PriceComparison
                        label="গত মাসের তুলনায়"
                        price={product.today}
                        comparisonPrice={product.lastMonth}
                    />
                </div>
            </section>

            <section className="mt-5">
                <h2 className="mb-3 text-sm font-bold text-[#263329]">বাজারভিত্তিক দামের তালিকা</h2>
                <div className="overflow-x-auto rounded-xl border border-[#e5ece6] bg-white">
                    <table className="w-full min-w-[560px] border-collapse text-left text-xs text-[#263329]">
                        <thead className="bg-[#f6f9f6] text-gray-600">
                            <tr>
                                <th className="px-3 py-2.5 font-semibold">বাজার</th>
                                <th className="px-3 py-2.5 font-semibold">বিভাগ</th>
                                <th className="px-3 py-2.5 text-right font-semibold">সর্বনিম্ন</th>
                                <th className="px-3 py-2.5 text-right font-semibold">সর্বোচ্চ</th>
                                <th className="px-3 py-2.5 text-right font-semibold">আজকের দাম</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product.markets.map((market) => (
                                <tr
                                    key={`${market.market}-${market.division}`}
                                    className="border-t border-[#e5ece6]"
                                >
                                    <td className="px-3 py-2.5">{market.market}</td>
                                    <td className="px-3 py-2.5">{market.division}</td>
                                    <td className="px-3 py-2.5 text-right">{numberFormat.format(market.min)} টাকা</td>
                                    <td className="px-3 py-2.5 text-right">{numberFormat.format(market.max)} টাকা</td>
                                    <td className="px-3 py-2.5 text-right font-semibold">{numberFormat.format(product.today)} টাকা</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

function ProductDetailsFallback() {
    return (
        <main className="mx-auto my-6 w-full max-w-5xl animate-pulse rounded-2xl bg-[#f2f7f3] p-4 sm:p-6">
            <div className="h-16 rounded-xl bg-white" />
            <div className="mt-5 h-24 rounded-xl bg-white" />
            <div className="mt-5 h-56 rounded-xl bg-white" />
        </main>
    );
}

export default function ProductDetailsPage({ params }) {
    return (
        <Suspense fallback={<ProductDetailsFallback />}>
            <ProductDetailsContent params={params} />
        </Suspense>
    );
}
