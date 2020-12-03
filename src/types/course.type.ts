import { Cls } from './class.type'
import { StrapiImage } from './strapi/strapiImage.type'

export type Course = {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
  coverImage: StrapiImage
  classes: Cls[]

  rating: number
  ratingCount: number

  priceMin: number
  priceMax: number
}
