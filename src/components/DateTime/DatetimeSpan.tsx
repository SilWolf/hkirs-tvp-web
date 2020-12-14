import React from 'react'
import { DateTime } from 'luxon'

type Props = {
  date: string
}
const DatetimeSpan = ({ date }: Props) => {
  return (
    <span>
      {DateTime.fromISO(date)
        .toLocal()
        .setLocale('zh-TW')
        .toLocaleString(DateTime.DATETIME_MED)}
    </span>
  )
}

export default React.memo(DatetimeSpan)
