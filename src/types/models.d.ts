interface IDateGenerationStrategy {
  (start: Date, end: Date, dayOf: number): Date[]
}

interface ISchedule {
  dayOf: number
  type: ScheduleType
  generateDatesBetween(start: Date, end: Date): Date[]
}

interface IEvent {
  id?: number
  amount: number
  date: Date
  type: EventType
  categories: string[]
}

interface IRecurringEvent {
  id?: number
  schedules: ISchedule[]
  archetype: IEvent
  generateEventsBetween(start: Date, end: Date): IEvent[]
}

type ScheduleType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
type EventType = 'historical' | 'generated' | 'archetype'

export {
  IDateGenerationStrategy,
  ISchedule,
  ScheduleType,
  IEvent,
  EventType,
  IRecurringEvent,
  ICategory
}