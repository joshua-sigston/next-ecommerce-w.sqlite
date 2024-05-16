'use client';
import Image from 'next/image';

const categoriesList = [
  { title: 'Classic', src: '/categoriesImgs/classicImg.jpg' },
  { title: 'Modern', src: '/categoriesImgs/modernImg.jpg' },
  { title: 'Set', src: '/categoriesImgs/setImg.jpg' },
  { title: 'Accessories', src: '/categoriesImgs/accessoriesImg.jpg' },
];

export default function CategoriesSection() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:max-w-[1200px] lg:m-auto">
      {categoriesList.map((item, index) => (
        <CategoryCard key={index} {...item} />
      ))}
    </section>
  );
}

interface CategoriesProps {
  title: string;
  src: string;
}

function CategoryCard({ title, src }: CategoriesProps) {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-md overflow-hidden shadow-lg lg:first:col-span-2 lg:last:col-span-2">
      <div className="w-full h-[300px] aspect-auto">
        <Image
          src={`${src}`}
          height={300}
          width={300}
          className="w-full h-full object-cover"
          alt={title}
        />
      </div>
      <div className="absolute top-0 left-0 h-full w-full bg-gray-900/40 flex items-center justify-center">
        <h3 className="text-3xl text-white">{title}</h3>
      </div>
    </div>
  );
}
