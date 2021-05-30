import { Schedule } from '../models'
import { EventType, IEvent, ISchedule, ScheduleType, ICategory } from '../types'

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

export {
  makeSchedule,
  makeEvent
}