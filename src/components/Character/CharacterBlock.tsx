import React from 'react'
import styled from 'styled-components'
import { Character } from '../../types/character.type'

const Wrapper = styled.div`
  display: fiex;
  align-items: center;
`
const MainContent = styled.div`
  fiex: 1;
`
const Portrait = styled.img`
  width: 4em;
  height: 4em;
  margin-right: 5px;
`
const Name = styled.div`
  font-size: 1.7em;
  font-weight: 600;
`
const Sub = styled.div`
  font-size: 0.8em;
  color: grey;
`
type Props = {
  character: Character
}

const CharacterBlock = ({ character }: Props) => {
  const classesString = character.classConfigs
    .map((classConfig) => `${classConfig.class.render.zh} ${classConfig.level}`)
    .join(' / ')

  return (
    <Wrapper>
      <div>
        <Portrait src={character.portrait?.url || ''} />
      </div>
      <MainContent>
        <Name>{character.name}</Name>
        <Sub>
          {character.race?.render.zh} {classesString}
        </Sub>
      </MainContent>
    </Wrapper>
  )
}

export default CharacterBlock
