import AllProducts from '@/components/AllProducts';
import Banner from '@/components/Banner';
import ProductsPriceHight from '@/components/ProductsPriceHight';
import ProductsPriceLow from '@/components/ProductsPriceLow';
import ProductGridSkeleton from '@/components/ProductGridSkeleton';
import { Suspense } from 'react';

const page = () => {
  return (
    <div>
      <Banner />
      <Suspense fallback={<ProductGridSkeleton title="আজ দাম বেড়েছে ▲" count={3} />}>
        <ProductsPriceHight />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton title="▼ আজ দাম কমেছে" count={3} />}>
        <ProductsPriceLow />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton title="সব পণ্য" />}>
        <AllProducts />
      </Suspense>
    </div>
  );
};

export default page;