interface DateGenerationStrategy {
  (start: Date, end: Date, dayOf: number): Date[]
}

interface Schedule {
  generateDatesBetween(start: Date, end: Date): Date[]
}

type ScheduleType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'

export {
  DateGenerationStrategy,
  Schedule,
  ScheduleType
}