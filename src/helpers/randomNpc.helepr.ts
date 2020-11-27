import { Character } from '../types/character.type'

export type Character_NPC = Partial<Character> & {
  _seed?: string
}

const CATEGORY_KEYS = [
  'firstName',
  'lastName'
] as const
export type CategoryKeyType = typeof CATEGORY_KEYS[number];
export type RandomResult = {
  category: CategoryKeyType
  _condition: { [x in CategoryKeyType]?: string | number }
  _seed: string
  _index: number
  value: string | number
}
export type RawNPC = { [x in CategoryKeyType]: string | number | undefined }

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
  const source = require(`./randomNpc/sources/${category}.json`)
  if (source && source.groups && source.groups.length > 0) {
    const group = source.groups.find(() => true)
    const {condition, items} = group
    const rndN = Math.floor(Math.random() * items.length)

    return {
      category,
      _index: rndN,
      _seed: rndN.toString(),
      _condition: condition,
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