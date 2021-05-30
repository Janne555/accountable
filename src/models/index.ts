import { DateGenerationStrategy } from "../types"
import * as dateFns from 'date-fns'

const DateGenerationStrategies = (<T extends Record<string, DateGenerationStrategy>>(arg: T): T => arg)({
  daily: (start, end, _) => {
    try {
      return dateFns.eachDayOfInterval({ end, start })
    } catch (error) {
      if (!(error instanceof RangeError)) {
        throw error
      } else {
        return []
      }
    }
  },
  weekly: (start, end, dayOf) => {
    if (!isDay(dayOf)) {
      throw Error(`Invalid day of. Must be between 0 and 6. Was ${dayOf}`)
    }

    const nextDay = dateFns.getDay(start) === dayOf ? start : dateFns.nextDay(start, dayOf)

    try {
      return dateFns.eachWeekOfInterval({ end, start: nextDay }, { weekStartsOn: dayOf })
    } catch (error) {
      if (!(error instanceof RangeError)) {
        throw error
      } else {
        return []
      }
    }
  },
  monthly: (start, end, dayOf) => {
    const fromEnd = dayOf < 0
    const actualDayOf = Math.abs(dayOf)

    if (actualDayOf === 0 || actualDayOf > 28) {
      throw Error(`Invalid day of. Must be between 1 and 28`)
    }

    try {
      return dateFns.eachMonthOfInterval({ end, start })
        .map(date => fromEnd ? dateFns.lastDayOfMonth(date) : date)
        .map(date => fromEnd ? dateFns.subDays(date, actualDayOf - 1) : dateFns.addDays(date, actualDayOf - 1))
        .filter(date => dateFns.isWithinInterval(date, { end, start }))
    } catch (error) {
      if (!(error instanceof RangeError)) {
        throw error
      } else {
        return []
      }
    }
  },
  quarterly: (start, end, dayOf) => {
    return []
  },
  yearly: (start, end, dayOf) => {
    return []
  }
})

function isDay(dayOf: number): dayOf is Day {
  return dayOf >= 0 && dayOf < 7
}


export {
  DateGenerationStrategies
}