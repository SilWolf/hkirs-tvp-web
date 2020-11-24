import React from 'react'
import { useAsync } from 'react-async'
import { Button, FormGroup } from 'reactstrap'
import randomNpcHelper, { Character_NPC } from '../helpers/randomNpc.helepr'

const randomNpcFn = () => {
  return randomNpcHelper.random()
}

const RandomNpc = () => {
  const npcAsync = useAsync<Character_NPC>({
    deferFn: randomNpcFn,
    onReject: () => {
      console.error('something wrong!')
    },
  })

  const run = () => {
    npcAsync.run()
  }

  return (
    <div className="content">
      <FormGroup>
        <Button color="primary" onClick={run}>
          Randomize
        </Button>
      </FormGroup>

      <code>
        {npcAsync.isResolved ? JSON.stringify(npcAsync.data, null, 2) : '{}'}
      </code>
    </div>
  )
}

export default RandomNpc
