import api from '../services/api.service'
import { Character } from '../types/character.type'

export const getCharactersByUsername = (username: string): Promise<Character[]> => {
  return api.get<Character[]>('/characters', {
    params: {
      'player.username': username
    }
  }).then((response) => {
    console.log(response)
    return response
  })
}

export const getCharacterById = (characterId: string): Promise<Character[]> => {
  return api.get<Character[]>(`/characters/${characterId}`).then((response) => {
    console.log(response)
    return response
  })
}