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
    return []
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