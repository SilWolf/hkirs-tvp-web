import { CategoryKeyType, RandomResult, RawNPC } from '../randomNpc.helepr'
import source from './sources/firstName.json'

export default (npc: Partial<RawNPC>): RandomResult | undefined => {
  if (source.dependencies) {
    for (const dependency of source.dependencies) {
      if (!npc[dependency as CategoryKeyType]) {
        return undefined
      }
    }
  }
}