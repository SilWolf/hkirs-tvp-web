import React from 'react'
import { useAsync } from 'react-async'
import CharacterBlock from '../components/Character/CharacterBlock'
import { Character } from '../types/character.type'
import { getCharactersByUsername } from '../helpers/api.helper'
import { Button } from 'reactstrap'

const getCharactersByUsernameFn = async ({ username }: any) => {
  return getCharactersByUsername(username)
}
const Characters = () => {
  const charactersAsync = useAsync<Character[]>({
    promiseFn: getCharactersByUsernameFn,
    username: 'foo',
  })

  return (
    <>
      <div className="content">
        <div style={{ textAlign: 'right' }}>
          <Button color="primary">創建一個新角色</Button>
        </div>
        {charactersAsync.data &&
          charactersAsync.data.map((character) => (
            <CharacterBlock key={character.characterId} character={character} />
          ))}
      </div>
    </>
  )
}

export default Characters
