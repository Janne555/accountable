interface IDateGenerationStrategy {
  (start: Date, end: Date, dayOf: number): Date[]
}

interface ISchedule {
  generateDatesBetween(start: Date, end: Date): Date[]
}

type ScheduleType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'

export {
  IDateGenerationStrategy,
  ISchedule,
  ScheduleType
}