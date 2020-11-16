import { Character } from './character.type'

export type Activity = {
  id: string
  title: string
  description: string
  inGameStartAt: string
  inGameEndAt: string
  characterRewards: {
    character: Character
    gp: number
    xp: number
    remark: string
    rewards: {
      name: string
      description: string
    }[]
  }[]
}
