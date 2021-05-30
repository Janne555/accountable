import { IDateGenerationStrategy, ISchedule, ScheduleType, IRecurringEvent, IEvent } from "../types"
import * as dateFns from 'date-fns'
import { isDay } from "../utils"

const DateGenerationStrategies: Record<ScheduleType, IDateGenerationStrategy> = {
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
    const fromEnd = dayOf < 0
    const actualDayOf = Math.abs(dayOf)

    if (actualDayOf === 0 || actualDayOf > 89) {
      throw Error(`Invalid day of. Must be between 1 and 89`)
    }

    try {
      return dateFns.eachQuarterOfInterval({ end, start })
        .map(date => fromEnd ? dateFns.lastDayOfQuarter(date) : date)
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
  yearly: (start, end, dayOf) => {
    const fromEnd = dayOf < 0
    const actualDayOf = Math.abs(dayOf)

    if (actualDayOf === 0 || actualDayOf > 89) {
      throw Error(`Invalid day of. Must be between 1 and 365`)
    }

    try {
      return dateFns.eachYearOfInterval({ end, start })
        .map(date => fromEnd ? dateFns.lastDayOfYear(date) : date)
        .map(date => fromEnd ? dateFns.subDays(date, actualDayOf - 1) : dateFns.addDays(date, actualDayOf - 1))
        .filter(date => dateFns.isWithinInterval(date, { end, start }))
    } catch (error) {
      if (!(error instanceof RangeError)) {
        throw error
      } else {
        return []
      }
    }
  }
}

class Schedule implements ISchedule {
  dayOf: number
  type: ScheduleType

  constructor(dayOf: number, type: ScheduleType) {
    this.dayOf = dayOf
    this.type = type
  }

  generateDatesBetween = (start: Date, end: Date): Date[] => {
    return DateGenerationStrategies[this.type](start, end, this.dayOf)
  }
}

class RecurringEvent implements IRecurringEvent {
  schedules: ISchedule[]
  archetype: IEvent
  id: number

  constructor(schedules: ISchedule[], archetype: IEvent, id: number) {
    this.schedules = schedules
    this.archetype = archetype
    this.id = id
  }

  generateEventsBetween(start: Date, end: Date): IEvent[] {
    throw new Error("Method not implemented.")
  }

}

export {
  DateGenerationStrategies,
  Schedule,
  RecurringEvent
}