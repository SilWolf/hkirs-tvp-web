import api from '../services/api.service'
import { Activity } from '../types/activity.type'
import { Character } from '../types/character.type'

export const getCharactersByUsername = (
  username: string
): Promise<Character[]> => {
  return api.get<Character[]>('/characters', {
    params: {
      'player.username': username,
    },
  })
}

export const getCharacterById = (characterId: string): Promise<Character> => {
  return api.get<Character>(`/characters/${characterId}`)
}

export const getActivitiesByCharacterId = (
  characterId: string
): Promise<Activity[]> => {
  return api.get<Activity[]>(`/activities`, {
    params: {
      'characters.id': characterId,
    },
  })
}
