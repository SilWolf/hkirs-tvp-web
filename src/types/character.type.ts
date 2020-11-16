import { City } from './city.type'
import { Race } from './race.type'
import { StrapiImage } from './strapi/strapiImage.type'
import { User } from './user.type'

export type Character = {
  type: 'PC' | 'NPC'
  id: string
  name: string
  description: string
  race: {
    mutation: any
    race: Race
  }
  portrait: StrapiImage
  coverImage: StrapiImage
  player: User
  characterId: string
  motto: string
  city: City
}
