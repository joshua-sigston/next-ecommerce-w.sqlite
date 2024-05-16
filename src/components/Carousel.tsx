'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

const imgs = [
  { src: '/carouselImgs/imgOne.jpg' },
  { src: '/carouselImgs/imgTwo.jpg' },
  { src: '/carouselImgs/imgThree.jpg' },
  { src: '/carouselImgs/imgFour.jpg' },
];

export default function CarouselSection() {
  return (
    <Carousel className="w-[80%] relative">
      <CarouselContent className="">
        {imgs.map((item, index) => (
          <CarouselItem key={index}>
            <div>
              <Card className="h-[400px] bg-sky-500">
                <CardContent className="aspect-square p-0">
                  <Image
                    src={item.src}
                    height={300}
                    width={300}
                    className="w-[1200px] h-[400px] object-cover aspect-auto"
                    alt="carouselImg"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
