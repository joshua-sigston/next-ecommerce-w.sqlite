"use server"

import db from '@/db/db'
import {z} from 'zod'
import fs from 'fs/promises'
import { notFound, redirect } from 'next/navigation'

const fileSchema = z.instanceof(File, {message: 'required'})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith('image/'))

const addScehma = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  image: imageSchema.refine(file => file.size > 0, 'Required')
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addScehma.safeParse(Object.fromEntries(formData.entries()))
  
  if(result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  await db.product.create({
    data: {
      isAvailable: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imagePath
    }
  })
  redirect('/admin/products')
}

export async function toggleProductAvailability(id: string, isAvailable: boolean) {

  await db.product.update({where: {id}, data: {isAvailable}})
}

export async function deleteProduct(id: string) {
  const product = await db.product.delete({where: {id}})

  if (product === null) return notFound()

  await fs.unlink(`public${product.imagePath}`)
}