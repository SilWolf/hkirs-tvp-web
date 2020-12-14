import React from 'react'
import {
  Calendar as ReactBigCalendar,
  CalendarProps,
  DateRangeFormatFunction,
  DateLocalizer,
  Event as ReactBigCalendarEvent,
} from 'react-big-calendar'
import { DateTime } from 'luxon'

const dateRangeFormat: DateRangeFormatFunction = (
  { start, end },
  culture,
  local
) => {
  if (local && start && end && culture) {
    return `${local.format(start, 'D', culture)} — ${local.format(
      end,
      'D',
      culture
    )}`
  }
  return ''
}

const timeRangeFormat: DateRangeFormatFunction = (
  { start, end },
  culture,
  local
) => {
  if (local && start && end && culture) {
    return `${local.format(start, 't', culture)} — ${local.format(
      end,
      't',
      culture
    )}`
  }
  return ''
}

const timeRangeStartFormat: DateRangeFormatFunction = (
  { start },
  culture,
  local
) => {
  if (local && start && culture) {
    return `${local.format(start, 't', culture)} — `
  }
  return ''
}

const timeRangeEndFormat: DateRangeFormatFunction = (
  { end },
  culture,
  local
) => {
  if (local && end && culture) {
    return ` — ${local.format(end, 't', culture)}`
  }
  return ''
}

const weekRangeFormat: DateRangeFormatFunction = (
  { start, end },
  culture,
  local
) => {
  if (local && start && end && culture) {
    return `${local.format(start, 'MMMM dd', culture)} — ${local.format(
      end,
      'MMMM dd',
      culture
    )}`
  }
  return ''
}

export const formats = {
  dateFormat: 'dd',
  dayFormat: 'dd EEE',
  weekdayFormat: 'ccc',

  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,

  timeGutterFormat: 't',

  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'cccc MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,

  agendaDateFormat: 'ccc MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat,
}

const LuxonLocalizer = () => {
  return new DateLocalizer({
    formats,
    firstOfWeek() {
      return 0
    },

    format(value, format) {
      return DateTime.fromJSDate(value as Date).toFormat(format)
    },
  })
}

const localizer: DateLocalizer = LuxonLocalizer()

type Props = Omit<CalendarProps, 'localizer'>

const BigCalendar: React.FC<Props> = (props) => (
  <div style={{ height: 600, maxHeight: '80vw' }}>
    <ReactBigCalendar localizer={localizer} {...props} />
  </div>
)

export default BigCalendar

export type BigCalendarEvent = ReactBigCalendarEvent
