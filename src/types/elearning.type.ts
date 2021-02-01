import { StrapiFile } from './strapi/StrapiFile.type'

export type ELearning = {
	files: StrapiFile[]
	e_learning_posts: ELearningPost[]
}

export type ELearningPost = {
	id: string
	title?: string
	content: string
	createdAt: string
	updatedAt: string
}
