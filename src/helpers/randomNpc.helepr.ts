import { Character } from '../types/character.type'

export type Character_NPC = Partial<Character> & {
  _seed?: string
}

const CATEGORY_KEYS = [
  'firstName',
  'lastName'
] as const
type CategoryKeyType = typeof CATEGORY_KEYS[number];
type RandomResult = {
  category: CategoryKeyType
  _seed: string
  value: string | number
}
type RawNPC = { [x in CategoryKeyType]: string | number }

export const random = async (): Promise<Character_NPC> => {
  const results = CATEGORY_KEYS.map((category: CategoryKeyType) => randomByCategory(category))

  const { _seed, _rawNpc } = results.reduce<{ _seed: string, _rawNpc: Partial<RawNPC> }>((prev, result) => {
    prev._seed += result._seed
    prev._rawNpc[result.category] = result.value
    return prev
  }, { _seed: '', _rawNpc: {} })

  const npc: Character_NPC = {}
  npc._seed = _seed
  npc.name =`${_rawNpc.firstName}．${_rawNpc.lastName}`

  return npc
}

const randomByCategory = (category: CategoryKeyType): RandomResult => {
  const source = require(`../constants/randomNpc/${category}.json`)
  if (source && source.length > 0) {
    let items = source[0].items
    const rndN = Math.floor(Math.random() * items.length)
    return {
      category,
      _seed: rndN.toString(),
      value: items[rndN]
    }
  } else {
    throw 'NOT_FOUND'
  }
}

const fns = {
  random,
}

export default {
  random
}