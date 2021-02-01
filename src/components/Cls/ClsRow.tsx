import React from 'react'
import styled from 'styled-components'

import { Cls } from '../../types/cls.type'

type Props = {
	cls: Cls
	onClick?: () => void
}

const ClsRow = ({ cls, onClick }: Props) => {
	return (
		<div>
			<div>
				<a href='#' onClick={onClick}>
					{cls.code}
				</a>
			</div>
			<div>
				<span className='text-mute'>
					{cls.startDate} - {cls.endDate}
				</span>
			</div>
			<div>
				<span className='text-mute'>{cls.course.name}</span>
			</div>
		</div>
	)
}

export default React.memo(ClsRow)
