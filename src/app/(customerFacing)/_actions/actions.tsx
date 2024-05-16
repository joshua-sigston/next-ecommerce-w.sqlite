'use server';

import db from '@/db/db';

export async function getNewProducts() {
  const products = await db.product.findMany({
    where: {
      isAvailable: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 4,
  });
  return products;
}
