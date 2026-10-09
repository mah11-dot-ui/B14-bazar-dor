import Banner from '@/components/Banner';
import ProductsPriceHight from '@/components/ProductsPriceHight';
import { Suspense } from 'react';

const page = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={
        <div className='max-w-6xl mx-auto p-8'>
          <h1 className='text-2xl font-bold'>আজ দাম বেড়েছে ▲</h1>
          <div className='h-6 w-12 animate-pulse rounded bg-base-300' />
        </div>
      }>
        <ProductsPriceHight />
      </Suspense>
    </div>
  );
};

export default page;