import { RecurringEvent, Schedule } from '../models'
import { EventType, IEvent, ISchedule, ScheduleType, ICategory, IRecurringEvent } from '../types'

function makeSchedule(dayOf: number, type: ScheduleType): ISchedule {
  return new Schedule(dayOf, type)
}

function makeEvent(id: number, amount: number, date: Date, categories: ICategory[], type: EventType): IEvent {
  return {
    id,
    amount,
    date,
    categories,
    type
  }
}

function makeRecurringEvent(schedules: ISchedule[], archetype: IEvent, id: number): IRecurringEvent {
  return new RecurringEvent(schedules, archetype, id)
}

export {
  makeSchedule,
  makeEvent,
  makeRecurringEvent
}