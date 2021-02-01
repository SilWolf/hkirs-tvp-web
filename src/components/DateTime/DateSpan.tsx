import React from 'react'
import lightFormat from 'date-fns/lightFormat'

type Props = {
	dateOrDateString: string
}
const DateSpan = ({ dateOrDateString }: Props) => {
	return <span>{lightFormat(new Date(dateOrDateString), 'yyyy-MM-dd')}</span>
}

export default React.memo(DateSpan)
