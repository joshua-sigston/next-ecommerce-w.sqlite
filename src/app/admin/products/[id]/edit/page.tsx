import PageHeader from '@/app/admin/_components/PageHeader';
import React from 'react';
import ProductForm from '../../_components/ProductForm';
import db from '@/db/db';

export default async function EditProductsPage({
  params: id,
}: {
  params: { id: string };
}) {
  const productId = id.id;

  const product = await db.product.findUnique({ where: { id: productId } });

  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </>
  );
}
