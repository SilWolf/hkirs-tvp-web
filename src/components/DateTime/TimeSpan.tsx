import React from 'react'
import { DateTime } from 'luxon'

type Props = {
  date: string
}
const DateSpan = ({ date }: Props) => {
  return (
    <span>
      {DateTime.fromISO(date)
        .toLocal()
        .setLocale('zh-TW')
        .toLocaleString(DateTime.TIME_24_SIMPLE)}
    </span>
  )
}

export default React.memo(DateSpan)
