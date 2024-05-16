import { Suspense } from 'react';
import { getProducts } from '../_actions/actions';
import { ProductCardSkeleton } from '@/components/ProductCard';
import { ProductSuspense } from '../_components/ProductsContainer';

export default async function ProductsPage() {
  // const products = await getProducts();
  // console.log(products);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-3 gap-4">
      <Suspense
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductSuspense productsFetcher={getProducts} />
      </Suspense>
    </div>
  );
}
