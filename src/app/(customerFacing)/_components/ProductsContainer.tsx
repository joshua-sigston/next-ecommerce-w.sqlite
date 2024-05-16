import ProductCard, { ProductCardSkeleton } from '@/components/ProductCard';
import { Product } from '@prisma/client';
import { Suspense } from 'react';

type ProductsContainerProps = {
  productsFetcher: () => Promise<Product[]>;
};

export default async function ProductsContainer({
  productsFetcher,
}: ProductsContainerProps) {
  const products = await productsFetcher();

  return (
    <section className="md:px-5 lg:max-w-[1200px] lg:m-auto space-y-12">
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold text-center">New Products</h3>
      </div>
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
          {}
        </Suspense>
      </div>
    </section>
  );
}

export async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product, index) => (
    <ProductCard key={index} {...product} />
  ));
}
