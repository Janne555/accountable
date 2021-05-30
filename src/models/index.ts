import { DateGenerationStrategy } from "../types"

const DateGenerationStrategies = (<T extends Record<string, DateGenerationStrategy>>(arg: T): T => arg)({
  daily: (start, end, dayOf) => {
    return []
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