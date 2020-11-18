import React from 'react'
import styled from 'styled-components'

import Progress from 'reactstrap/lib/Progress'
import {
  getPercentageToNextLevelByXp,
  getCurrentLevelEndByLevel,
} from '../../helpers/levelAndXp.helper'

const StyledCaption = styled.div`
  display: flex;
  justify-content: space-between;
`
const StyledProgress = styled(Progress)`
  height: 4px;
`

type Props = {
  xp: number
  level: number
}
type State = {
  xp: number
  level: number
  processToNextLevel: number
  currentLevelEndXp: number
}
class CharacterLevelAndXpProgress extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    const { xp, level } = props
    this.state = {
      xp,
      level,
      processToNextLevel: Math.floor(100 * getPercentageToNextLevelByXp(xp)),
      currentLevelEndXp: getCurrentLevelEndByLevel(level),
    }
  }

  render() {
    const { xp, level, processToNextLevel, currentLevelEndXp } = this.state
    return (
      <>
        <StyledCaption>
          <small className="text-muted">等級 {level}</small>
          <small className="text-muted">
            {xp}/{currentLevelEndXp}XP
          </small>
        </StyledCaption>
        <StyledProgress color="info" value={processToNextLevel} />
      </>
    )
  }
}

export default CharacterLevelAndXpProgress
