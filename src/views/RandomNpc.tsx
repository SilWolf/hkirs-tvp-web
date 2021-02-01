import React from 'react'
import { useAsync } from 'react-async'

import randomNpcHelper, { Character_NPC } from '../helpers/randomNpc.helepr'

import { Button, FormGroup } from 'reactstrap'

const randomNpcFn = () => {
	return randomNpcHelper.random()
}

const RandomNpc = () => {
	const npcAsync = useAsync<Character_NPC>({
		deferFn: randomNpcFn,
		onReject: (e) => {
			console.error('something wrong!', e)
		},
	})

	const run = () => {
		npcAsync.run()
	}

	return (
		<div className='content'>
			<FormGroup>
				<Button color='primary' onClick={run}>
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
