import React from 'react'
import lightFormat from 'date-fns/lightFormat'

type Props = {
	dateOrDateString: string
}
const DateSpan = ({ dateOrDateString }: Props) => {
	return <span>{lightFormat(new Date(dateOrDateString), 'HH:mm')}</span>
}

export default React.memo(DateSpan)
