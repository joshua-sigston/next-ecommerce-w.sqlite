import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="flex flex-col items-start justify-center md:items-center">
        <div className="h-full w-full relative flex justify-end">
          <Image
            src="/heroImg.jpg"
            height={300}
            width={300}
            className="w-full h-[500px] object-cover md:w-[475px] md:h-full aspect-auto"
            alt="hero"
          />
          <div className="absolute right-[-15px] bottom-0 w-[250px] h-[300px] bg-gray-900/40 md:hidden"></div>
          <div className="absolute hidden left-5 top-5 w-[400px] h-[350px] bg-gray-900/40 md:block"></div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 md:justify-center md:px-5">
        <h1 className="text-4xl font-semibold md:text-6xl">ViewFinder</h1>
        <p className="text-2xl md:text-3xl">Lorem ipsum dolor sit amet.</p>
        <p className="md:max-w-[300px]">
          Nisl vel pretium lectus quam id leo in vitae. Viverra tellus in hac
          habitasse platea dictumst vestibulum rhoncus est.
        </p>
        <Button variant="outline" className="w-[150px]" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
