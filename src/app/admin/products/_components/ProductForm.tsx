'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatCurrency } from '@/db/formatters';
import React, { useState } from 'react';
import { addProduct, updateProduct } from '../../_actions/products';
import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '@prisma/client';
import Image from 'next/image';

export default function ProductForm({ product }: { product?: Product | null }) {
  const [priceInCents, setPriceInCents] = useState<number | undefined>(
    product?.priceInCents,
  );
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {},
  );

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label className="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          defaultValue={product?.name || ''}
          required
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          name="priceInCents"
          id="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />
        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>
      <div className="text-muted-foreground">
        {formatCurrency(priceInCents || 0 / 100)}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Description"
          defaultValue={product?.description || ''}
          required
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
      </div>
      {/* <div className="space-y-2">
        <Label htmlFor='file'>File</Label>
        <Input type="file" name="file" id="file" required />
      </div> */}
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" name="image" id="image" required={product == null} />
        {product !== null && (
          <Image
            src={product?.imagePath || '/placeholder.jpeg'}
            height={400}
            width={400}
            alt="product image"
          />
        )}
        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </Button>
  );
}
