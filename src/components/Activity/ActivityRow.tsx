import React from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  inGameStartAt: string
  gp: number | null
  xp: number | null
  rewards: {
    name: string
  }[]
}

const RewardSpan = styled.span`
  font-weight: bold;
`

class ActivityRow extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    const { title, inGameStartAt, gp, xp, rewards } = this.props
    return (
      <div>
        <div>{title}</div>
        <div>
          <strong className="text-info">{xp || '--'}XP</strong>{' '}
          <strong className="text-info">{gp || '--'}GP</strong>
        </div>
      </div>
    )
  }
}

export default ActivityRow
