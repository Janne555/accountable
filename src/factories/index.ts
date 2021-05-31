import { RecurringEvent, Schedule } from '../models'
import { EventType, IEvent, ISchedule, ScheduleType, ICategory, IRecurringEvent } from '../types'

function makeSchedule(dayOf: number, type: ScheduleType): ISchedule {
  return new Schedule(dayOf, type)
}

function makeEvent(amount: number, date: Date, categories: ICategory[], type: EventType, description: string, id?: number): IEvent {
  return {
    amount,
    date,
    categories,
    type,
    id,
    description
  }
}

function makeRecurringEvent(schedules: ISchedule[], archetype: IEvent): IRecurringEvent {
  return new RecurringEvent(schedules, archetype)
}

export {
  makeSchedule,
  makeEvent,
  makeRecurringEvent
}