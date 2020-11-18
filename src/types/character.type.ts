import { City } from './city.type'
import { Cls } from './class.type'
import { Race } from './race.type'
import { StrapiImage } from './strapi/strapiImage.type'
import { User } from './user.type'

export type Character = {
  type: 'PC' | 'NPC'
  id: string
  name: string
  description: string
  race: Race
  raceConfig: {
    race: Race
    mutations: any
  }
  classes: Cls[]
  classConfigs: {
    class: Cls
    level: number
    mutations: any
  }[]
  portrait: StrapiImage
  coverImage: StrapiImage
  player: User
  characterId: string
  motto: string
  city: City
  level: number
  xp: number
}
