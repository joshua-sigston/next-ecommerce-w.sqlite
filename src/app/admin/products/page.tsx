import { Button } from '@/components/ui/button';
import PageHeader from '../_components/PageHeader';
import Link from 'next/link';
import db from '@/db/db';
import ProductsTable from './_components/ProductsTable';

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    select: {
      id: true,
      category: true,
      name: true,
      priceInCents: true,
      isAvailable: true,
      _count: { select: { orders: true } },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products Page</PageHeader>
        <Button>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </>
  );
}
