export interface StrapiFileThumbnail {
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

export interface StrapiFileFormats {
	thumbnail: StrapiFileThumbnail
}

export interface StrapiFile {
	_id: string
	name: string
	alternativeText: string
	caption: string
	hash: string
	ext: string
	mime: string
	size: number
	width?: number
	height?: number
	url: string
	formats?: StrapiFileFormats
	provider: string
	related: string[]
	createdAt: Date
	updatedAt: Date
	__v: number
	created_by: string
	updated_by: string
	id: string
}
