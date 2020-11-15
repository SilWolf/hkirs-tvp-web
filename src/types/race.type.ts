import { StrapiImage } from './strapi/strapiImage.type'

export type Race = {
  id: string
  name: string
  raceId: string
  render: {
    en: string
    zh: string
  }
}