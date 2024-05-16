"use server"

import db from '@/db/db'
import {z} from 'zod'
import fs from 'fs/promises'
import { notFound, redirect } from 'next/navigation'

const fileSchema = z.instanceof(File, {message: 'required'})
const imageSchema = fileSchema.refine(file => file.size === 0 || file.type.startsWith('image/'))

const addSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  image: imageSchema.refine(file => file.size > 0, 'Required')
})

export async function addProduct(prevState: unknown, formData: FormData) {
  // console.log(formData)
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
  console.log('results:')
  console.log(result)

  if(result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  console.log("data: ")
  console.log(data)

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  )

  await db.product.create({
    data: {
      isAvailable: false,
      category: data.category,
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

const editSchema = addSchema.extend ({
  iamge: imageSchema.optional()
})

export async function updateProduct(id: string, prevState: unknown, formData: FormData) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
  
  if(result.success === false) {
    return result.error.formErrors.fieldErrors
  }

  const data = result.data
  const product = await db.product.findUnique({
    where: {
      id
    }
  })
  
  let imagePath = product?.imagePath
  if (data.image != null && data.image.size > 0) {
    await fs.unlink( `product${product?.imagePath}`)
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer())
    )
  }


  await db.product.update({
    where: {id},
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      imagePath
    }
  })
  redirect('/admin/products')
}