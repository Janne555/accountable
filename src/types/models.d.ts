interface IDateGenerationStrategy {
  (start: Date, end: Date, dayOf: number): Date[]
}

interface ISchedule {
  dayOf: number
  generateDatesBetween(start: Date, end: Date): Date[]
}

interface ICategory {
  id: number
  name: string
}

interface IEvent {
  id: number
  amount: number
  date: Date
  type: EventType
  categories: ICategory[]
}

interface IRecurringEvent {
  schedules: ISchedule[]
  archetype: IEvent
  generateDatesBetween(start: Date, end: Date): Date[]
}

type ScheduleType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
type EventType = 'historical' | 'generated'

export {
  IDateGenerationStrategy,
  ISchedule,
  ScheduleType,
  IEvent,
  EventType
}