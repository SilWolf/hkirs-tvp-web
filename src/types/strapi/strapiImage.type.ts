export interface StrapiImageThumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  path?: any
  url: string
}

export interface StrapiImageFormats {
  thumbnail: StrapiImageThumbnail
}

export interface StrapiImage {
  _id: string
  name: string
  alternativeText: string
  caption: string
  hash: string
  ext: string
  mime: string
  size: number
  width: number
  height: number
  url: string
  formats: StrapiImageFormats
  provider: string
  related: string[]
  createdAt: Date
  updatedAt: Date
  __v: number
  created_by: string
  updated_by: string
  id: string
}
