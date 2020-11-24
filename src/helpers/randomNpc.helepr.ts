import { Character } from '../types/character.type'

export type Character_NPC = Partial<Character> & {
  _seed?: string
}

export const random = async (): Promise<Character_NPC> => {
  const npc: any = {}
  let seed: string = ''
  const keys = ['firstName', 'lastName']
  
  keys.forEach((category: string) => {
    const source = require(`../constants/randomNpc/${category}.json`)
    if (source && source.length > 0) {
      let items = source[0].items
      const rndN = Math.floor(Math.random() * items.length)
      npc[category] = items[rndN]
      seed += rndN.toString()
    }
  })

  return {
    _seed: seed,
    name: `${npc.firstName}．${npc.lastName}`
  }
}

export default {
  random
}