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
    return []
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


export {
  DateGenerationStrategies
}