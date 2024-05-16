import { getNewProducts } from './_actions/actions';
import CarouselSection from '@/components/Carousel';
import { Hero, NewProducts, Categories } from './_components';
import ProductsContainer from './_components/ProductsContainer';

export default async function HomePage() {
  return (
    <main className="space-y-12">
      <Hero />
      {/* <ProductsContainer productsFetcher={getNewProducts} /> */}
      <div className="w-full flex justify-center">
        <CarouselSection />
      </div>
      <Categories />
      <div className="h-[200px] w-full bg-gray-400">{/* footer */}</div>
    </main>
  );
}
